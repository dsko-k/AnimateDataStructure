import { Style } from './Style.js';

export class KeyframeTextHandler // regexps do not match if style properties have comment
{

    getAllKeyframes()
    {
        let patternText = / *@keyframes *(?<keyframeName>[A-Za-z0-9_]+) *\n*({ *((?<subBody>(\n*( *(?<persentage>\d+%+?|to|from)+? *(?<bodyPersentage>{\n*[^}]+})+?)))\n*)+ *})/gm;
        let styleInst = new Style();
        let styleText = styleInst.getStyleClassText();
        let result = styleText.match(patternText);

        return result;
    }


    getKeyframe(keyframeName)
    {
        let allKeyframes = this.getAllKeyframes();
        let regexp = new RegExp(` *@keyframes *${keyframeName} *\n*{`, "m");

        let foundKeyframe = allKeyframes.filter(keyframe =>
        {
            return keyframe.match(regexp);
        });

        if (foundKeyframe.length > 1)
        {
            throw new Error(`${keyframeName} has ${foundKeyframe.length - 1} duplicates`);
        }

        return foundKeyframe
    }


    getUnparsedKeyframeNameAndBody(keyframeName)
    {
        if (!this.isExistKeyframe(keyframeName))
        {
            throw new Error(`${keyframeName} was not found`);
        }

        let regexpKeyframe = new RegExp(`( *@keyframes *${keyframeName} *{\\n*)( *\\d+% *{\\n+[^}]+}\\n*)+\\n* *}`, "gm");
        let styleInst = new Style();
        let styleText = styleInst.getStyleClassText();
        let unparsedKeyframeBody = styleText.match(regexpKeyframe);

        return unparsedKeyframeBody[0];
    }


    getUnparsedKeyframeBody(keyframeName)
    {
        if (!this.isExistKeyframe(keyframeName))
        {
            throw new Error(`${keyframeName} was not found`);
        }

        let regexpKeyframe = new RegExp(`(?<=@keyframes *${keyframeName} *{\\n*)( *\\d+% *{\\n+[^}]+}\\n*)+(?=\\n* *})`, "gm");
        let styleInst = new Style();
        let styleText = styleInst.getStyleClassText();
        let unparsedKeyframeBody = styleText.match(regexpKeyframe);

        return unparsedKeyframeBody[0];
    }


    getUnparsedPersentage(keyframeName, persentage)
    {
        if (!this.isExistKeyframe(keyframeName))
        {
            throw new Error(`${keyframeName} was not found`);
        }

        if (!this.isExistKeyframePersentage(keyframeName, persentage))
        {
            throw new Error(`${keyframeName} does not have a persentage ${persentage}`);
        }

        let regexpKeyframePersentage = new RegExp(` *[^\\d+]${persentage} *{\\n*[^}]+}`, "gm");
        let unparsedKeyframeBody = this.getUnparsedKeyframeBody(keyframeName);
        let result = unparsedKeyframeBody.match(regexpKeyframePersentage);

        return result[0];
    }


    getKeyframeBody(keyframeName)
    {
        if (!this.isExistKeyframe(keyframeName))
        {
            throw new Error(`${keyframeName} was not found`);
        }

        let foundKeyframe = this.getKeyframe(keyframeName)[0];
        let regexp = new RegExp(` *((?<persentage>(\\d+%+?|to|from)) *{(?<bodyPersentage>([^}]+)) *}+?\\n*)+`, "gm");
        let result = foundKeyframe.match(regexp);

        return result;
    }


    getParsedKeyframe(keyframeName)
    {
        let foundKeyframe = this.getKeyframeBody(keyframeName);

        let result = foundKeyframe.map(subKeyframe =>
        {
            return this.parsePersentage(subKeyframe);
        })

        return result;
    }


    parsePersentage(persentageWithBody)
    {
        let regexp = new RegExp(`(?<persentageLine>(?<beforePersentage> *)(?<persentage>(\\d+%+?|to|from))(?<afterPersentage> *)){(?<body>[^}]+)`, "m");
        let result = persentageWithBody.match(regexp);

        return {
            persentageLine: result.groups.persentageLine,
            beforePersentage: result.groups.beforePersentage,
            persentage: result.groups.persentage,
            afterPersentage: result.groups.afterPersentage,

            body: result.groups.body,
            parsedBody: this.parseKeyframeEntry(result.groups.body),
        };
    }


    getPersentageBodyEntries(persentageBody)
    {
        let regexp = new RegExp(`(?<persentageEntry>(^ *[^;^{^\\n*]+;))`, "gm");
        let result = persentageBody.match(regexp);

        return result;
    }


    // necessary
    getKeysByPersentage(keyframeName, persentage)
    {
        if (!this.isExistKeyframe(keyframeName))
        {
            throw new Error(`${keyframeName} was not found`);
        }

        return this.getParsedKeyframe(keyframeName)
            .filter(persentageObj => persentageObj.persentage === persentage)
            .map(entry => entry.parsedBody.map(pb => pb.keyframeKey))[0];
    }


    getAllPersentages(keyframeName)
    {
        if (!this.isExistKeyframe(keyframeName))
        {
            throw new Error(`${keyframeName} was not found`);
        }
        let parsedKeyframe = this.getParsedKeyframe(keyframeName);

        return parsedKeyframe.map(entry => entry.persentage);
    }


    findPersentageBody(keyframeName, persentage)
    {
        let foundKeyframeBodies = this.getParsedKeyframe(keyframeName);
        let bodyOfPersentage = foundKeyframeBodies.filter(persentageEntry =>
        {
            return persentageEntry.persentage === persentage;
        });

        return bodyOfPersentage;
    }


    // Return Key:Value entry by keyframeName, persentage and keyName
    findKeyframeKeyValue(keyframeName, persentage, keyName)
    {
        let foundKeyframeBodies = this.getParsedKeyframe(keyframeName);
        let result;

        foundKeyframeBodies.filter(persentageEntry =>
        {
            return persentageEntry.persentage === persentage &&
                persentageEntry.parsedBody.filter(bodyEntries =>
                {
                    if (bodyEntries.keyframeKey === keyName)
                    {
                        result = bodyEntries;
                    }

                    return bodyEntries.keyframeKey === keyName;

                }).length > 0
        });

        return result;
    }


    // Return all persentages and Key:Value entries that occur in bodies of keyframeName
    findKeyframeAllKeyValues(keyframeName, keyName)
    {
        let foundKeyframeBodies = this.getParsedKeyframe(keyframeName);
        let result = [];

        foundKeyframeBodies.filter(persentageEntry =>
        {
            return persentageEntry.parsedBody.filter(bodyEntries =>
            {
                if (bodyEntries.keyframeKey === keyName)
                {
                    result.push(
                        {
                            persentage: persentageEntry.persentage,
                            bodyEntries: bodyEntries
                        });
                }

                return bodyEntries.keyframeKey === keyName;

            }).length > 0
        });

        return result;
    }


    // Return array with parsed entries, obtained from "sub" keyframe (persentage and its body). Every entry contains key, value, beforeKey, beforeValue,...
    parseKeyframeEntry(keyframeBody)
    {
        let regexp = new RegExp(`(?<beforeKey>(^ *))(?<keyframeKey>([^:^{]+?))(?<afterKey>( *)):(?<beforeValue>( *))(?<keyframeValue>([^;]+?))(?<afterValue>( *;))`, "m");
        let bodyEntries = this.getPersentageBodyEntries(keyframeBody);

        let result = bodyEntries.map(entry =>
        {
            let parsedEntry = entry.match(regexp, "m");

            return {
                initialEntry: parsedEntry.input,

                beforeKey: parsedEntry.groups.beforeKey,
                keyframeKey: parsedEntry.groups.keyframeKey,
                afterKey: parsedEntry.groups.afterKey,

                beforeValue: parsedEntry.groups.beforeValue,
                keyframeValue: parsedEntry.groups.keyframeValue,
                afterValue: parsedEntry.groups.afterValue
            };
        });


        return result;
    }


    isExistKeyframe(keyframeName)
    {
        let foundKeyframe = this.getKeyframe(keyframeName);
        return foundKeyframe.length === 1;
    }


    isExistKeyframePersentage(keyframeName, persentage)
    {
        if (!this.isExistKeyframe(keyframeName))
        {
            return false;
        }

        let bodyPersentage = this.getParsedKeyframe(keyframeName).filter(persentageEntry =>
        {
            return persentageEntry.persentage === persentage
        });

        if (bodyPersentage.length > 1)
        {
            throw new Error(`Keyframe ${keyframeName} has ${bodyPersentage.length - 1} duplicates of persentages ${persentage}`);
        }

        return bodyPersentage.length === 1;
    }


    isExistKeyframeKeyValues(keyframeName, persentage, keyName)
    {
        return this.findKeyframeKeyValue(keyframeName, persentage, keyName) ? true : false;
    }

    // not necessary
    isKeyframeKeyNameContainsSubstring(keyframeName, persentage, keyNameSubstring)
    {
        if (!this.isExistKeyframe(keyframeName) || !this.isExistKeyframePersentage(keyframeName, persentage))
        {
            return false;
        }

        let bodyPersentage = this.getParsedKeyframe(keyframeName).filter(persentageEntry =>
        {
            return persentageEntry.persentage === persentage
        });

        let keysContainsKeyName = bodyPersentage[0].parsedBody.filter(entry =>
        {
            return entry.keyframeKey.includes(keyNameSubstring); // case sensitive string comparison
        });

        return keysContainsKeyName.length > 0;
    }


    // CRUD

    createKeyframe(nameNewKeyframe, keyframeBody = "\n")
    {
        if (this.isExistKeyframe(nameNewKeyframe))
        {
            throw new Error(`Unable to create keyframe ${nameNewKeyframe}. It already exists`);
        }

        let newKeyframe = `\n\n    @keyframes ${nameNewKeyframe} {\n${keyframeBody}}\n`;
        let style = document.getElementsByTagName("style")[0];
        style.insertAdjacentText("beforeend", newKeyframe);
    }


    copyKeyframe(keyframeNameToCopy, nameNewKeyframe)
    {
        let bodyToCopy = this.getKeyframeBody(keyframeNameToCopy).join("");

        if (!this.isExistKeyframe(keyframeNameToCopy))
        {
            throw new Error(`Unable to copy keyframe ${keyframeNameToCopy}. It was not found`);
        }

        if (this.isExistKeyframe(nameNewKeyframe))
        {
            throw new Error(`Unable to copy keyframe ${keyframeNameToCopy}. Keyframe ${nameNewKeyframe} already exists`);
        }

        this.createKeyframe(nameNewKeyframe, bodyToCopy);
    }


    addKeyframeKeyValue(keyframeName, persentage, keyframeKeyName, keyframeValue)
    {
        if (!this.isExistKeyframe(keyframeName))
        {
            throw new Error(`Unable to add key ${keyframeKeyName}: Keyframe ${keyframeName} was not found`);
        }

        if (!this.isExistKeyframePersentage(keyframeName, persentage))
        {
            throw new Error(`Unable to add key ${keyframeKeyName}. Keyframe ${keyframeName} does not contain body with persentage ${persentage}`);
        }

        if (this.isExistKeyframeKeyValues(keyframeName, persentage, keyframeKeyName))
        {
            throw new Error(`Unable to add key ${keyframeKeyName}. Keyframe ${keyframeName} already contains key ${keyframeKeyName} in body with persentage ${persentage}`);
        }

        let foundPersentageBody = this.findPersentageBody(keyframeName, persentage);

        let currentPersentageBody = foundPersentageBody[0].body;
        let currentPersentageLine = foundPersentageBody[0].persentageLine;

        let newKeyValueLine = `    ${keyframeKeyName}: ${keyframeValue};\n`;
        let newPersentageBody = currentPersentageLine + `{` + currentPersentageBody + newKeyValueLine + `        }`;

        let currentKeyframeBody = this.getUnparsedKeyframeBody(keyframeName);

        let regexpPersentage = new RegExp(` *[^\\d+]${persentage} *{(?<bodyPersentage>([^}]+?))\\n* *}+?`, "gm"); // incorrect:  new RegExp(` *( ${persentage} *{(?<bodyPersentage>([^}]+)) *}+?\\n*)+`, "gm");

        let styleInst = new Style();
        let styleText = styleInst.getStyleClassText();

        let updatedKeyframeBody = currentKeyframeBody.replace(regexpPersentage, newPersentageBody);
        let regexpKeyframe = new RegExp(`(?<=@keyframes *${keyframeName} *{\\n*)( *\\d+% *{\\n+[^}]+}\\n*)+(?=\\n* *})`, "gm"); //

        let updatedStyle = styleText.replace(regexpKeyframe, updatedKeyframeBody);
        let styleElement = styleInst.getStyle();
        styleElement.innerHTML = updatedStyle;
    }


    // Update a value of the key
    updateValue(keyframeName, persentage, keyName, newValue)
    {
        this.updateKeyframeKeyAndValue(keyframeName, persentage, keyName, keyName, newValue);
    }


    // Update name of Key
    updateKeyName(keyframeName, persentage, keyNameToRename, newKeyName)
    {
        let foundKeyValueLine = this.findKeyframeKeyValue(keyframeName, persentage, keyNameToRename);
        let unchangedValue = foundKeyValueLine.keyframeValue;
        this.updateKeyframeKeyAndValue(keyframeName, persentage, keyNameToRename, newKeyName, unchangedValue);
    }

    // Update Key and Value
    updateKeyframeKeyAndValue(keyframeName, persentage, keyNameToRename, newKeyName, newValue)
    {
        if (!this.isExistKeyframe(keyframeName))
        {
            throw new Error(`Unable to update key '${keyframeKeyName}': Keyframe '${keyframeName}' was not found`);
        }

        if (!this.isExistKeyframePersentage(keyframeName, persentage))
        {
            throw new Error(`Unable to update key '${keyNameToRename}'. Keyframe '${keyframeName}' does not contain body with persentage '${persentage}'`);
        }

        if (!this.isExistKeyframeKeyValues(keyframeName, persentage, keyNameToRename))
        {
            throw new Error(`Unable to update key '${keyNameToRename}'. Keyframe '${keyframeName}' does not contain key '${keyNameToRename}' in body with persentage '${persentage}'`);
        }
                
        let unparsedKeyframegePersentage = this.getUnparsedPersentage(keyframeName, persentage);
        let regexpKeyValue = new RegExp(`(^ *${keyNameToRename} *: *(?<keyframeValue>([^;]+?)) *;)`, "gm");
        let foundKeyValueLine = this.findKeyframeKeyValue(keyframeName, persentage, keyNameToRename);
        let updatedKeyValue = foundKeyValueLine.beforeKey + newKeyName + foundKeyValueLine.afterKey + ':' + foundKeyValueLine.beforeValue + newValue + foundKeyValueLine.afterValue;
        let newPersentageBody = unparsedKeyframegePersentage.replace(regexpKeyValue, updatedKeyValue);
        let currentUnparsedKeyframe = this.getUnparsedKeyframeNameAndBody(keyframeName);
        let regexpKeyframePersentage = new RegExp(` *[^\\d+]${persentage} *{\\n*[^}]+}`, "gm");
        let updatedKeyframe = currentUnparsedKeyframe.replace(regexpKeyframePersentage, newPersentageBody);
        let regexpUnparsedKeyframe = new RegExp(`( *@keyframes *${keyframeName} *{\\n*)( *\\d+% *{\\n+[^}]+}\\n*)+\\n* *}`, "gm");
        let styleInst = new Style();
        let styleText = styleInst.getStyleClassText();
        let updatedStyle = styleText.replace(regexpUnparsedKeyframe, updatedKeyframe);
        let styleElement = styleInst.getStyle();
        styleElement.innerHTML = updatedStyle;
    }


    deleteKeyframe(keyframeName)
    {
        if (!this.isExistKeyframe(keyframeName))
        {
            throw new Error(`Unable to delete Keyframe '${keyframeName}'. It was not found`);
        }

        let currentUnparsedKeyframe = this.getUnparsedKeyframeNameAndBody(keyframeName);
        let regexpKeyframe = new RegExp(`( *@keyframes *${keyframeName} *{\\n*)( *\\d+% *{\\n+[^}]+}\\n*)+\\n* *}`, "gm");
        let styleInst = new Style();
        let styleText = styleInst.getStyleClassText();
        let updatedStyle = styleText.replace(regexpKeyframe, '');
        let styleElement = styleInst.getStyle();
        styleElement.innerHTML = updatedStyle;
    }
}