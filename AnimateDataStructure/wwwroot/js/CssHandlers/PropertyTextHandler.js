import { Style } from './Style.js';

export class PropertyTextHandler
{
    isExistPropertyEntity(propertyName)
    {
        let styleInst = new Style();
        let styleText = styleInst.getStyleClassText();

        let regexProperty = new RegExp(` *@property *${propertyName} *{(?<propertyBody>[^}]+)+}`, "gm");

        let result = styleText.match(regexProperty);

        if (!result)
        {
            return false;
        }

        if (result.length > 1)
        {
            throw new Error(`@property '${propertyName}' has ${result.length - 1} duplicates`);
        }

        return result.length > 0;
    }


    isPropertyKeyExist(propertyName, keyName)
    {
        if (!this.isExistPropertyEntity(propertyName))
        {
            return false;
        }

        // get unparsed property body by propertyName
        let unparsedPropertyBody = this.getUnparsedPropertyEntityBody(propertyName);

        let regexpKeyValue = new RegExp(`(?<beforeKey>( *))(?<propertyKey>(${keyName}))(?<afterKey>( *)):(?<beforeValue>( *))(?<propertyValue>([^;]+?))(?<afterValue>( *;))`, "gm");

        // find line with keyName

        let result = unparsedPropertyBody.match(regexpKeyValue);


        if (result && result.length > 1)
        {
            throw new Error(`@property '${propertyName}' has ${result.length - 1} duplicates of key '${keyName}'`);
        }

        if (!result)
        {
            return false;
        }

        return result.length > 0;
    }


    getAllPropertyEntities()
    {
        let patternText = new RegExp(`( *@property +[-A-Za-z0-9_]+ *\\n*{[^}]+})`, "gm");

        let styleInst = new Style();

        let styleText = styleInst.getStyleClassText();

        let result = styleText.match(patternText);

        return result;
    }


    getUnparsedPropertyEntityBodyAndName(propertyName)
    {
        if (!this.isExistPropertyEntity(propertyName))
        {
            throw new Error(`@property '${propertyName}' was not found`);
        }

        let styleInst = new Style();
        let styleText = styleInst.getStyleClassText();

        let regexProperty = new RegExp(` *@property *${propertyName} *{(?<propertyBody>[^}]+)+}`, "gm");

        let result = styleText.match(regexProperty);

        return result[0];
    }


    getUnparsedPropertyEntityBody(propertyName)
    {
        if (!this.isExistPropertyEntity(propertyName))
        {
            throw new Error(`@property '${propertyName}' was not found`);
        }

        let regexpPropertyBody = new RegExp(`(?<=@property *${propertyName} *)(?<propertyBody>({\n* *[^}+]+?)})`, "m");

        let styleInst = new Style();
        let styleText = styleInst.getStyleClassText();

        let unparsedPropertyBody = styleText.match(regexpPropertyBody);

        let body = unparsedPropertyBody.groups.propertyBody;

        return body;
    }


    getParsedKeyValue(propertyName, keyName)
    {
        // get unparsed property body by propertyName
        let unparsedPropertyBody = this.getUnparsedPropertyEntityBody(propertyName);

        let regexpKeyValue = new RegExp(`(?<beforeKey>( *))(?<propertyKey>(${keyName}))(?<afterKey>( *)):(?<beforeValue>( *))(?<propertyValue>([^;]+?))(?<afterValue>( *;))`, "m");

        // find line with keyName

        let result = unparsedPropertyBody.match(regexpKeyValue);

        // parse line with keyName

        return result.groups;
    }


    getParsedKeyValueLines(propertyName)
    {
        let unparsedPropertyBody = this.getUnparsedPropertyEntityBody(propertyName);

        let regexpLineKeyValue = new RegExp(`(?<keyValueLine>(^ *[^\\n^;]+;\\n+))`, "gm");

        let keyValueLines = unparsedPropertyBody.match(regexpLineKeyValue);

        let regexpParsedKeyValue = new RegExp(`(?<beforeKey>(^ *))(?<propertyKey>([^:^\\n]+?))(?<afterKey>( *)):(?<beforeValue>( *))(?<propertyValue>([^;^\\n]+?))(?<afterValue>( *;\\n{0,1}))`, "m");

        let parsedKeyValueLines = [];

        if (keyValueLines)
        {
            keyValueLines.forEach(keyValueLine =>
            {
                let parsedLine = keyValueLine.match(regexpParsedKeyValue);

                parsedKeyValueLines.push({
                    parsedLine: parsedLine.groups,
                    initialLine: parsedLine.input
                });
            });
        }

        return parsedKeyValueLines;
    }


    // necessary

    getAllKeys(propertyName)
    {
        if (!this.isExistPropertyEntity(propertyName))
        {
            throw new Error(`@property '${propertyName}' was not found`);
        }

        return this.getParsedKeyValueLines(propertyName).map(propertyLine => propertyLine.parsedLine).map(line => line.propertyKey);
    }


    // CRUD

    createPropertyEntity(nameNewProperty, propertyBody = "\n")
    {
        if (this.isExistPropertyEntity(nameNewProperty))
        {
            throw new Error(`Unable to create @property ${nameNewProperty}. It already exists`);
        }

        let newProperty = `\n\n    @property ${nameNewProperty} {${propertyBody}    }`; // deleted \n and inner {} in \n${propertyBody}\n  in compare with createKeyframe(...)

        if (propertyBody !== "\n")
        {
            newProperty = `\n\n    @property ${nameNewProperty} ${propertyBody}`;
        }

        let style = document.getElementsByTagName("style")[0];

        style.insertAdjacentText("beforeend", newProperty);
    }


    copyPropertyEntity(propertyEntityNameToCopyFrom, newPropertyEntityName)
    {
        if (!this.isExistPropertyEntity(propertyEntityNameToCopyFrom))
        {
            throw new Error(`Unable to copy @property ${propertyEntityNameToCopyFrom}. It was not found`);
        }

        if (this.isExistPropertyEntity(newPropertyEntityName))
        {
            throw new Error(`Unable to copy @property ${propertyEntityNameToCopyFrom}. @property ${newPropertyEntityName} already exists`);
        }

        let bodyOfPropertyEntityToCopy = this.getUnparsedPropertyEntityBody(propertyEntityNameToCopyFrom);

        this.createPropertyEntity(newPropertyEntityName, bodyOfPropertyEntityToCopy);
    }


    addPropertyKeyValue(propertyEntityName, propertyKeyName, propertyValue)
    {
        // get unparsed property
        // get unparsed property body

        // get parsed property body

        //Simpler regexp:   (^ *[^;^\n]+;)

        //let regexpKeyValue = new RegExp(`((?<beforeKey>( *))(?<propertyKey>([^:^ ]+))(?<afterKey>( *)):(?<beforeValue>( *))(?<propertyValue>([^;]+?))(?<afterValue>( *;)))+`, "m");

        if (this.isPropertyKeyExist(propertyEntityName, propertyKeyName))
        {
            throw new Error(`Unable to add key '${propertyKeyName}' to the @property ${propertyEntityName}. Key '${propertyKeyName}' is already exist`);
        }

        let keyValueLineToInsert = `        ${propertyKeyName}: ${propertyValue};`

        let bodyProperty = this.getUnparsedPropertyEntityBodyAndName(propertyEntityName);

        let updatedProperty = this.insertTextInsideBody(bodyProperty, keyValueLineToInsert);


        let styleInst = new Style();
        let styleText = styleInst.getStyleClassText();

        let regexProperty = new RegExp(` *@property *${propertyEntityName} *{(?<propertyBody>[^}]+)+}`, "gm");

        let updatedStyle = styleText.replace(regexProperty, updatedProperty);


        let styleElement = styleInst.getStyle();

        styleElement.innerHTML = updatedStyle;
    }


    // private
    insertTextInsideBody(body, textToInsert)
    {
        if (!body && !body.includes(";"))
        {
            throw new Error(`Body is incorrect: it is does not have ';' or it is undefined`);
        }

        let regexpClosedCurlyBracet = new RegExp(`(?<untilLastLine>(^ *.+[^{]+?))(?<lastLine>( *}))`, "m");

        let splittedBody = body.match(regexpClosedCurlyBracet);

        let updatedProperty = splittedBody.groups.untilLastLine + textToInsert + "\n" + splittedBody.groups.lastLine;

        return updatedProperty;
    }


    updateValue(propertyEntityName, propertyKeyName, newValue)
    {
        if (!this.isExistPropertyEntity(propertyEntityName))
        {
            throw new Error(`Unable to update key '${propertyKeyName}': @property ${propertyEntityName} was not found`);
        }

        if (!this.isPropertyKeyExist(propertyEntityName, propertyKeyName))
        {
            throw new Error(`Unable to update key '${propertyKeyName}' of the @property ${propertyEntityName}. Key '${propertyKeyName}' was not found`);
        }

        // get unparsed property

        let unparsedPropertyEntityBodyAndName = this.getUnparsedPropertyEntityBodyAndName(propertyEntityName);


        // find parsed keyValue

        let regexpKeyValue = new RegExp(`(?<beforeKey>( *))(?<propertyKey>(${propertyKeyName}))(?<afterKey>( *)):(?<beforeValue>( *))(?<propertyValue>([^;]+?))(?<afterValue>( *;))`, "m");


        let parsedKeyValue = this.getParsedKeyValue(propertyEntityName, propertyKeyName);

        let newKeyValueLine = parsedKeyValue.beforeKey + parsedKeyValue.propertyKey + parsedKeyValue.afterKey + ":" + parsedKeyValue.beforeValue + newValue + parsedKeyValue.afterValue;

        // replace old value with a new value

        let updatedPropertyEntity = unparsedPropertyEntityBodyAndName.replace(regexpKeyValue, newKeyValueLine);

        // update style

        let styleInst = new Style();
        let styleText = styleInst.getStyleClassText();

        let regexProperty = new RegExp(` *@property *${propertyEntityName} *{(?<propertyBody>[^}]+)+}`, "gm");

        let updatedStyle = styleText.replace(regexProperty, updatedPropertyEntity);


        let styleElement = styleInst.getStyle();

        styleElement.innerHTML = updatedStyle;
    }


    deletePropertyEntity(propertyEntityName)
    {
        if (!this.isExistPropertyEntity(propertyEntityName))
        {
            throw new Error(`Unable to delete @property ${propertyEntityName}. It was not found`);
        }

        let styleInst = new Style();
        let styleText = styleInst.getStyleClassText();

        let regexProperty = new RegExp(` *@property *${propertyEntityName} *{(?<propertyBody>[^}]+)+}`, "gm");

        let updatedStyle = styleText.replace(regexProperty, "");

        let styleElement = styleInst.getStyle();

        styleElement.innerHTML = updatedStyle;
    }

}