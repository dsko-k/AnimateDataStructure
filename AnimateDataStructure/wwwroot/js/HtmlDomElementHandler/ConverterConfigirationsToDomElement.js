import { HtmlPageDomUpdater } from './HtmlPageDomUpdater.js';


export class ConverterConfigirationsToDomElement
{
    constructor()
    {
        this.htmlPageDomUpdater = new HtmlPageDomUpdater();
    }


    getDomElementFromConfigurations(attributeObject)
    {
        this.throwIncorrectAttributes(attributeObject);

        let idDomElementFromAttributes = attributeObject.defaultAttributes.id;

        return this.htmlPageDomUpdater.getDomElementOnPageById(idDomElementFromAttributes);
    }


    throwIncorrectAttributes(attributeObject)
    {
        if (!attributeObject)
        {
            throw new Error("Incorrect attributes object");
        }
    }
}
