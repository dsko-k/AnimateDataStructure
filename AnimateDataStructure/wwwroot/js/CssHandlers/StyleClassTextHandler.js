import { Style } from './Style.js';

export class StyleClassTextHandler // regexps do not match if style properties have comment
{
    isExistRegex(textToFind, patternText, flagsString)
    {
        let regexp = new RegExp(patternText, flagsString);
        let result = regexp.test(textToFind);

        return result;
    }


    getAllStyleClasses()
    {
        let patternText = /(?<styleName>\.[A-Za-z0-9_:]+) *{(?<styleBody>[^}]+)+}/gm; // added : into pattern of styleName
        let styleInst = new Style();
        let styleText = styleInst.getStyleClassText();
        let result = styleText.match(patternText);

        return result;
    }


    getStyleClassBody(styleName)
    {
        if (!styleName || styleName === "")
        {
            throw new Error("Style name is not defined");
        }

        let foundClass = this.getStyleClass(styleName)[0];
        let regexp = new RegExp(`(?<={\\n* *)(?<styleBody>[^}+]+?)\\n* *}`, "m");
        let result = foundClass.match(regexp);

        return result.groups.styleBody;
    }


    getStyleClass(styleName)
    {
        if (!styleName || styleName === "")
        {
            throw new Error("Style name is not defined");
        }

        let regexp = new RegExp(`(?<styleName>${styleName}) *(?=\\n*{)`, "m");
        let allStyleClasses = this.getAllStyleClasses();

        let foundStyleClasses = allStyleClasses.filter(foundClass =>
        {
            return regexp.test(foundClass);
        });

        if (foundStyleClasses.length > 1)
        {
            throw new Error(`Style ${styleName} has ${foundClass.length - 1} duplicates`);
        }

        return foundStyleClasses;
    }


    isExistStyleClass(styleName)
    {
        let foundStyleClass = this.getStyleClass(styleName);

        return foundStyleClass.length === 1;
    }


    isExistStyleKey(styleName, styleKey)
    {
        let foundStyle = this.getStyleEntries(styleName);

        if (!foundStyle)
        {
            return false;
        }

        if (foundStyle.length == 0)
        {
            throw new Error(`Style ${styleName} was not found`);
        }

        let foundStyleKey = foundStyle.filter(styleEntry =>
        {
            return styleEntry.styleKey === styleKey
        });

        return foundStyleKey.length > 0;
    }


    getStyleValue(styleName, styleKey)
    {
        if (!this.isExistStyleClass(styleName))
        {
            throw new Error(`Style '${styleName}' was not found`);
        }

        if (!this.isExistStyleKey(styleName, styleKey))
        {
            throw new Error(`Style '${styleName}' does not contain key ${styleKey}`);
        }

        let foundStyleValue = [];

        if (this.isExistStyleKey(styleName, styleKey))
        {
            let foundEntries = this.getStyleEntries(styleName);

            foundStyleValue = foundEntries.filter(styleEntry =>
            {
                return styleEntry.styleKey === styleKey
            });
        }

        return {
            initialStyleLine: foundStyleValue[0].initialStyleLine,
            beforeStyleValue: foundStyleValue[0].beforeStyleValue,
            styleValue: foundStyleValue[0].styleValue,
            afterStyleValue: foundStyleValue[0].afterStyleValue
        };
    }


    getStyleEntries(styleName)
    {
        let regexp = new RegExp(`((?<styleKey>^[^\\n*][^:]+):+?(?<styleValue>.+?);)+?`, "gm");
        let styleBody = this.getStyleClassBody(styleName);
        let matches = styleBody.match(regexp);

        let result = matches.map(line =>
        {
            return this.parseStyleEntry(line);
        });

        return result;
    }


    parseStyleEntry(styleKeyValueLine)
    {
        let regexp = new RegExp(`(?<styleKeyLine>(?<beforeStyleKey> *)(?<styleKey>[^:]+?)(?<afterStyleKey> *)):(?<styleValueLine>(?<beforeStyleValue> *)(?<styleValue>[^;]+?)(?<afterStyleValue> *;))`, "m");
        let result = styleKeyValueLine.match(regexp);

        return {
            initialStyleLine: styleKeyValueLine,
            beforeStyleKey: result.groups.beforeStyleKey,
            styleKey: result.groups.styleKey,
            afterStyleKey: result.groups.afterStyleKey,
            beforeStyleValue: result.groups.beforeStyleValue,
            styleValue: result.groups.styleValue,
            afterStyleValue: result.groups.afterStyleValue
        };
    }


    getStyleEntry(styleName, styleKey)
    {
        let entries = this.getStyleEntries(styleName);
        return entries.filter(entry =>
        {
            return entry.styleKey === styleKey;
        });
    }


    getStyleKeysWithVariables(styleName)
    {
        let styleEntries = this.getStyleEntries(styleName);
        return styleEntries.filter(entry =>
        {
            return this.isStyleKeyVariable(entry.initialStyleLine);
        });
    }

    parseKeyValue(keyValue)
    {
        let patternText = /([^ ]+): *(.+)/;
        let result = keyValue.match(patternText);
        let obj = {
            styleKey: result[1],
            styleValue: result[2]
        };

        return obj;
    }


    getStyleKeys(styleName)
    {
        let styleEntries = this.getStyleEntries(styleName);
        return styleEntries.map(entry =>
        {
            return {
                beforeStyleKey: entry.beforeStyleKey,
                styleKey: entry.styleKey,
                afterStyleKey: entry.afterStyleKey,
                initialStyleLine: entry.initialStyleLine
            };
        });
    }


    getStyleValues(styleName)
    {
        let styleEntries = this.getStyleEntries(styleName);
        return styleEntries.map(entry =>
        {
            return {
                beforeStyleValue: entry.beforeStyleValue,
                styleValue: entry.styleValue,
                afterStyleValue: entry.afterStyleValue,
                initialStyleLine: entry.initialStyleLine
            };
        });
    }


    // Checks is styleValue contains variable var(--someVariable)
    isStyleValueVariable(styleValue)
    {
        let patternText = /var\(--.+\)/;
        return this.isExistRegex(styleValue, patternText, 'm');
    }


    // Check is styleValue contains variable --someVariable
    isStyleKeyVariable(styleKey)
    {
        let patternText = / *[^var(](--.+):/;
        return this.isExistRegex(styleKey, patternText, 'm');
    }


    // trim specified number of symbols in parsed value
    trimMeasure(valueToParse, lengthSymbolsToTrim)
    {
        if (!valueToParse || valueToParse === '')
        {
            throw Error(`Incorrect value to parse`);
        }

        if (lengthSymbolsToTrim < 0)
        {
            throw Error(`Quantity of symbols should be positive`);
        }

        return parseFloat(valueToParse.substring(0, valueToParse.length - lengthSymbolsToTrim));
    }


    addTextStyleKeys(styleName, styleKey, styleValue)
    {
        let isExistStyle = this.isExistStyleClass(styleName);
        let isExistStyleKey = this.isExistStyleKey(styleName, styleKey);

        if (!isExistStyle)
        {
            throw new Error(`Style ${styleName} was not found. Unable to add key ${styleKey}`);
        }

        if (isExistStyleKey)
        {
            throw new Error(`Style ${styleName} already contains key ${styleKey}. Unable to add this key`);
        }

        let currentStyleBody = this.getStyleClassBody(styleName);
        let newStyleKeyValueLine = `\n        ${styleKey}: ${styleValue};\n`;
        let newStyleBody = currentStyleBody + newStyleKeyValueLine;
        let regexpStyleBody = new RegExp(`(?<=${styleName} *{\\n* *)(?<styleBody>([^}]+))`, "m");

        let styleInst = new Style();
        let styleText = styleInst.getStyleClassText();
        let updatedStyles = styleText.replace(regexpStyleBody, newStyleBody);
        let styleElement = styleInst.getStyle();
        styleElement.innerHTML = updatedStyles;
    }


    updateValue(styleName, styleKey, newStyleValue)
    {
        let styleInst = new Style();
        let styleText = styleInst.getStyleClassText();
        let regexpStyleBody = new RegExp(`(?<=${styleName} *{\\n* *)(?<styleBody>([^}]+))`, "m");
        let currentStyleBody = this.getStyleClassBody(styleName);
        let regexpStyleKeyValue = new RegExp(`(?<beforeStyleKey> *)(?<styleKey>${styleKey})(?<afterStyleKey> *):(?<beforeStyleValue> *)(?<styleValue>[^;]+?)(?<afterStyleValue> *;)`, "m");
        let resultStyleKeyValue = currentStyleBody.match(regexpStyleKeyValue);
        let updatedLine = resultStyleKeyValue.groups.beforeStyleKey + resultStyleKeyValue.groups.styleKey + resultStyleKeyValue.groups.afterStyleKey + ':' +
            resultStyleKeyValue.groups.beforeStyleValue + `${newStyleValue}` + resultStyleKeyValue.groups.afterStyleValue;
        let updatedStyleText = currentStyleBody.replace(regexpStyleKeyValue, updatedLine);
        let updatedStyles = styleText.replace(regexpStyleBody, updatedStyleText);
        let styleElement = styleInst.getStyle();
        styleElement.innerHTML = updatedStyles;
    }


    createStyleClass(classNameWithDot, styleBody = "\n")
    {
        if (classNameWithDot == undefined || this.isExistStyleClass(classNameWithDot))
        {
            throw new Error(`Class with name ${classNameWithDot} is already exist`);
        }

        let styleClass = `\n\n    ${classNameWithDot} {${styleBody}    }`;
        let style = document.getElementsByTagName("style")[0];
        style.insertAdjacentText("beforeend", styleClass);
    }


    copyStyleClass(styleNameToCopy, newStyleName)
    {
        let isExistStyleToCopy = this.isExistStyleClass(styleNameToCopy);
        let isExistNewStyleNameClass = this.isExistStyleClass(newStyleName);

        if (!isExistStyleToCopy)
        {
            throw new Error(`Unable to copy from style ${styleNameToCopy} to style ${newStyleName}: style ${styleNameToCopy} does not exist`);
        }

        if (isExistNewStyleNameClass)
        {
            throw new Error(`Unable to copy from style ${styleNameToCopy} to style ${newStyleName}: style ${newStyleName} already exist`);
        }

        let bodyStyleToCopy = this.getStyleClassBody(styleNameToCopy);
        this.createStyleClass(newStyleName, bodyStyleToCopy);
    }


    deleteStyle(styleName)
    {
        let styleInst = new Style();
        let styleText = styleInst.getStyleClassText();
        let isExistStyle = this.isExistStyleClass(styleName);

        if (!isExistStyle)
        {
            throw new Error(`Style ${styleName} was not found. Unable to delete this style`);
        }

        let regexpStyleBody = new RegExp(`(?<style>\\n* *${styleName} *{\\n* *(?<styleBody>([^}]+}+?)))`, "m");
        let updatedStyleText = "";
        let updatedStyles = styleText.replace(regexpStyleBody, updatedStyleText);
        let styleElement = styleInst.getStyle();
        styleElement.innerHTML = updatedStyles;
    }
}