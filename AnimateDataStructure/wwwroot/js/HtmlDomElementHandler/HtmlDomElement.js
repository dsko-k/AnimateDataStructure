import { HtmlPageDomUpdater } from './HtmlPageDomUpdater.js';

// RIGHT APPROACH TO BUILD HTML-ELEMENTS
export class HtmlDomElement
{
    constructor(tagName)
    {
        this.htmlPageDomUpdater = new HtmlPageDomUpdater();
        this.tagName = this.validateTagName(tagName);
        this.createdDomElement = this.htmlPageDomUpdater.createDomElement(this.tagName);
        this.childrenDomElements = [];
    }


    validateTagName(tagName)
    {
        if (!tagName || tagName === "")
        {
            throw new Error("Tag name is empty");
        }
        return tagName;
    }


    getCreatedDomElement()
    {
        return this.createdDomElement;
    }


    addChildDomElement(childDomElement)
    {
        this.childrenDomElements.push(childDomElement);
        this.createdDomElement.appendChild(childDomElement.getCreatedDomElement());
    }


    // Add an array of children to htmlDomElement
    addChildren(childrenOfHtmlDomElements) // childrenOfHtmlDomElement is an array
    {
        childrenOfHtmlDomElements.forEach(child =>
        {
            this.addChildDomElement(child);
        });
    }


    setAttribute(attibuteName, attibuteValue)
    {
        this.createdDomElement.setAttribute(attibuteName, attibuteValue);
        return this; // for chaining attributes
    }


    setAttributes(attributeNameValuesObject) // attributeNameValuesObject is an object whith properties nameOfAttribute: valueOfAttribute
    {
        if (!attributeNameValuesObject)
        {
            throw new Error(`Attribute is not specified`);
        }
        Object.keys(attributeNameValuesObject).forEach(attributeName =>
        {
            let attributeValue = attributeNameValuesObject[attributeName];

            this.getCreatedDomElement().setAttribute(attributeName, attributeValue);
        });
    }


    setTextContent(text)
    {
        this.createdDomElement.textContent = text;
        return this; // for chaining text content
    }
}