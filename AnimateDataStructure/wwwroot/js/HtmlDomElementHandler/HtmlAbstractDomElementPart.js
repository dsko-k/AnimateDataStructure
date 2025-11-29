import { HtmlDomElement } from '../HtmlDomElementHandler/HtmlDomElement.js';

// table part, sidebar part. To create any html-element and configure it with specified attributes
export class HtmlAbstractDomElementPart
{
    // Create and return any html-element and configure it with specified attributes
    // Returns instance of type HtmlDomElement
    // To add text content or other functionality, invoke method from class HtmlDomElement on returned instance
    createDomElement(tag, attributes)
    {
        let div = new HtmlDomElement(tag);
        div.setAttributes(attributes); // class="cell"

        return div;
    }


    // Add an array of children to htmlDomElement
    addChildren(htmlDomElement, childrenOfHtmlDomElement) // childrenOfHtmlDomElement is an array
    {
        childrenOfHtmlDomElement.forEach(child =>
        {
            htmlDomElement.addChildDomElement(child);
        });
    }


    // Create any html tag with defaultAttributes, but without nested element
    createHtmlTag(htmlTagConfigurationObject)
    {
        let configuredAttributes = htmlTagConfigurationObject.defaultAttributes;
        let htmlTag = this.createDomElement(htmlTagConfigurationObject.tag, configuredAttributes);
        return htmlTag;
    }


    // Create any html tag with CONFIGURED attributes, but without nested element
    createHtmlTagWithConfigurationParameter(htmlTagConfigurationObject, parmeterForConfigurationAttributes)
    {
        let configuredAttributes = htmlTagConfigurationObject.configureAttributes(parmeterForConfigurationAttributes);
        let htmlTag = this.createDomElement(htmlTagConfigurationObject.tag, configuredAttributes);
        return htmlTag;
    }


    // Insert tag into existed html tag
    createHtmlTagWithText(htmlTag, textInsideHtmlTag)
    {
        htmlTag.setTextContent(textInsideHtmlTag);
        return htmlTag;
    }
}