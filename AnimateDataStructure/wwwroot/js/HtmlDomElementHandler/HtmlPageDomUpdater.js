export class HtmlPageDomUpdater
{
    isExistHtmlPageDomElement(idHtmlElement)
    {
        return document.getElementById(idHtmlElement) !== null;
    }


    // Uses both in node and in table
    getHtmlPageDomElement(idHtmlElement)
    {
        if (!idHtmlElement || idHtmlElement == "")
        {
            throw new Error(`Incorrect specified element id=${idHtmlElement}`);
        }
        let domElement = document.getElementById(idHtmlElement);
        if (!domElement)
        {
            throw new Error(`Html element with id=${idHtmlElement} was not found`);
        }

        return domElement;
    }


    // Page DOM-elements

    getDomElementsOnPageByStyleName(styleNameWithDot)
    {
        this.throwExceptionIfStyleNameIsIncorrect(styleNameWithDot);
        return document.querySelectorAll(styleNameWithDot);
    }


    getDomElementOnPageById(idHtmlElement)
    {
        this.throwExceptionIfIdHtmlElementIsIncorrect(idHtmlElement);
        return document.getElementById(idHtmlElement);
    }


    getDomElementsInsideParent(domElementParent, classNameToFindInsideParent)
    {
        if (!domElementParent)
        {
            throw new Error(`Incorrect parent domElement`);
        }
        this.throwExceptionIfStyleNameIsIncorrect(classNameToFindInsideParent);
        let foundDomElements = domElementParent.querySelectorAll(`${classNameToFindInsideParent}`);
        return foundDomElements;
    }


    getParentDomElement(domElement)
    {
        if (!domElement)
        {
            throw new Error(`Incorrect domElement to find its parent`);
        }
        return domElement.parentElement;
    }


    getDomElementsByAttributeName(attributeName)
    {
        this.throwExceptionIfAttributeNameIsIncorrect(attributeName);
        let foundDomElements = document.querySelectorAll(`[${attributeName}]`);
        return Array.from(foundDomElements);
    }


    getDomElementsByAttributeNameValue(attributeName, attributeValue)
    {
        this.throwExceptionIfAttributeNameIsIncorrect(attributeName);
        let foundDomElements = document.querySelectorAll(`[${attributeName}=${attributeValue}]`);
        return Array.from(foundDomElements);
    }


    getDomElementsInsideParentByAttributeNameValue(parentDomElement, attributeNameOfChildrenToFind, attributeValueOfChildrenToFind)
    {
        let foundChildren = parentDomElement.querySelectorAll(`[${attributeNameOfChildrenToFind}=${attributeValueOfChildrenToFind}]`);
        return Array.from(foundChildren);
    }


    getDomElementsInsideParentByAttributeNameAndPartOfValue(parentDomElement, attributeNameOfChildrenToFind, partOfattributeValueOfChildrenToFind)
    {
        let foundChildren = parentDomElement.querySelectorAll(`[${attributeNameOfChildrenToFind}*=${partOfattributeValueOfChildrenToFind}]`);
        return Array.from(foundChildren);
    }


    getChildrenDomElementsByParentIdAndChildrenTag(parentId, childrenTagName)
    {
        let parentDomElement = this.getHtmlPageDomElement(parentId);
        let foundChildren = parentDomElement.getElementsByTagName(childrenTagName);
        return Array.from(foundChildren);
    }

    // create DomElement
    createDomElement(tag)
    {
        if (!tag || tag === "")
        {
            throw new Error("tag empty or undefined");
        }
        if (tag.toLowerCase() === "svg" || tag.toLowerCase().includes("line") || tag.toLowerCase() === "defs" ||
            tag.toLowerCase() === "stop" || tag.toLowerCase() === "path" || tag.toLowerCase() === "text")
        {
            return document.createElementNS('http://www.w3.org/2000/svg', tag);
        }

        return document.createElement(tag);
    }


    getAttributeOfHtmlElementById(idHtmlElement, attributeName)
    {
        this.throwExceptionIfAttributeNameIsIncorrect(attributeName);
        let domElement = this.getDomElementOnPageById(idHtmlElement);
        return this.getAttributeOfHtmlElement(domElement, attributeName);
    }


    // private
    getAttributeOfHtmlElement(domElement, attributeName)
    {
        if (!domElement)
        {
            throw new Error(`Html-element is incorrect or does not exist`);
        }
        let attributeValue = domElement.getAttribute(attributeName);
        return attributeValue;
    }


    setAttributeOfHtmlElementById(idHtmlElement, attributeName, newValueOfAttribute)
    {
        this.throwExceptionIfAttributeNameIsIncorrect(attributeName);
        let domElement = this.getDomElementOnPageById(idHtmlElement);
        this.setAttributeOfHtmlElement(domElement, attributeName, newValueOfAttribute);
    }


    setAttributeOfHtmlElementByDomElement(domElement, attributeName, newValueOfAttribute)
    {
        this.throwExceptionIfAttributeNameIsIncorrect(attributeName);
        return this.setAttributeOfHtmlElement(domElement, attributeName, newValueOfAttribute);
    }


    setAttributeOfHtmlElement(domElement, attributeName, newValueOfAttribute)
    {
        if (!domElement)
        {
            throw new Error(`Html-element is incorrect or does not exist`);
        }
        domElement.setAttribute(attributeName, newValueOfAttribute);
    }


    // set multiple attributes from array of objects
    setDomAttributes(domElement, attributes) // attributes - array of objects. Each object consists of attributeName: attributeValue
    {
        if (!attributes)
        {
            throw new Error(`Unable to set attributes for element <${tag}>. Attributes are empty or undefined`);
        }
        attributes.forEach(attribute =>
        {
            let attributeName = Object.keys(attribute)[0];
            let attributeValue = attribute[attributeName];
            this.setAttributeOfHtmlElement(domElement, attributeName, attributeValue);
        });
    }

    // Inline .style Property (css variable or css style key)

    removeInlineStyleProperty(domElement, inlineStylePropertyName)
    {
        if (!domElement)
        {
            throw new Error(`Html-element is incorrect or does not exist`);
        }
        domElement.style.removeProperty(inlineStylePropertyName);
    }


    getUnparsedComputedStyle(domElement, cssKeyName)
    {
        if (!domElement)
        {
            throw new Error(`Html-element is incorrect or does not exist`);
        }
        let computedStyleDomElement = window.getComputedStyle(domElement);
        let unparsedStyleValue = computedStyleDomElement.getPropertyValue(cssKeyName);

        return unparsedStyleValue;
    }


    parseComputedStyle(idDomElement, cssKeyName, isFloatParsing)
    {
        let domElement = this.getDomElementOnPageById(idDomElement);
        let unparsedComputedStyle = this.getUnparsedComputedStyle(domElement, cssKeyName);
        if (isFloatParsing)
        {
            return parseFloat(unparsedComputedStyle);
        }
        return parseInt(unparsedComputedStyle, 10);
    }


    // Updating last Additional style name
    updateLastAdditionalStyleName(domElement, newAdditionalStyleName)
    {
        if (!domElement)
        {
            throw new Error(`Html-element is incorrect or does not exist`);
        }
        if (!newAdditionalStyleName || newAdditionalStyleName === "")
        {
            throw new Error(`Incorrect new additional style name`);
        }
        if (domElement.classList.length === 0)
        {
            return;
        }
        let lastStyleName = domElement.classList[domElement.classList.length - 1];
        let newAdditionalStyleNameWithoutDot = this.trimSymbolAtStart(newAdditionalStyleName, ".");
        if (lastStyleName === newAdditionalStyleNameWithoutDot)
        {
            return;
        }
        this.removeLastAdditionalStyleName(domElement); // remove current last style
        domElement.classList.toggle(newAdditionalStyleNameWithoutDot); // add current last style
    }


    removeLastAdditionalStyleName(domElement)
    {
        let lastStyleName = domElement.classList[domElement.classList.length - 1];
        domElement.classList.toggle(lastStyleName);
    }


    // remove all additional style names except the basic (first) style names
    removeAllAdditionalStyleNames(domElement)
    {
        while (domElement.classList.length > 1)
        {
            this.removeLastAdditionalStyleName(domElement);
        }
    }


    // Check whether a class contains specified style among additional styles
    isContainSpecifiedAdditionalStyle(domElement, additionalStyleNameToFind)
    {
        if (domElement.classList.length <= 1)
        {
            return false;
        }
        let foundAdditionalStyleNames = Array.from(domElement.classList).filter((styleName, index) =>
        {
            return index > 0 && styleName === additionalStyleNameToFind;
        });
        return foundAdditionalStyleNames.length > 0;
    }


    // Correctnes of string arguments

    isCorrectStyleName(styleNameWithDot)
    {
        let isStyleNameCorrect = styleNameWithDot.includes(".") ||
            styleNameWithDot !== null ||
            styleNameWithDot !== '' ||
            styleNameWithDot !== undefined;

        return isStyleNameCorrect;
    }


    isCorrectCssVariableName(cssVariableName)
    {
        let isCssVariableNameCorrect = cssVariableName.includes("--") ||
            cssVariableName !== null ||
            cssVariableName !== '' ||
            cssVariableName !== undefined;

        return isCssVariableNameCorrect;
    }


    isCorrectIdHtmlElement(idHtmlElement)
    {
        let isidHtmlElementCorrect = !idHtmlElement.includes(".") ||
            idHtmlElement !== null ||
            idHtmlElement !== '' ||
            idHtmlElement !== undefined;

        return isidHtmlElementCorrect;
    }


    isCorrectAttributeName(attributeName)
    {
        let isAttributeNameCorrect = !attributeName.includes(".") ||
            attributeName !== null ||
            attributeName !== '' ||
            attributeName !== undefined;

        return isAttributeNameCorrect;
    }


    isCorrectCssKeyName(cssKeyName)
    {
        let isCssKeyNameCorrect = cssKeyName !== null ||
            cssKeyName !== '' ||
            cssKeyName !== undefined;

        return isCssKeyNameCorrect;
    }


    throwExceptionIfStyleNameIsIncorrect(styleNameWithoutDot)
    {
        if (!this.isCorrectStyleName(styleNameWithoutDot))
        {
            throw new Error("Incorrect name of style");
        }
    }


    throwExceptionIfCssVariableNameIsIncorrect(cssVariableName)
    {
        if (!this.isCorrectCssVariableName(cssVariableName))
        {
            throw new Error("Incorrect name of css variable name");
        }
    }


    throwExceptionIfIdHtmlElementIsIncorrect(idHtmlElement)
    {
        if (!this.isCorrectIdHtmlElement(idHtmlElement))
        {
            throw new Error("Incorrect id of html-element");
        }
    }


    throwExceptionIfAttributeNameIsIncorrect(attributeName)
    {
        if (!this.isCorrectAttributeName(attributeName))
        {
            throw new Error("Incorrect attribute name of html-element");
        }
    }


    throwExceptionIfCssKeyNameIsIncorrect(cssKeyName)
    {
        if (!this.isCorrectCssKeyName(cssKeyName))
        {
            throw new Error("Incorrect css key name of html-element");
        }
    }


    // Has class list specified styleName
    isClassContainsStyleName(idHtmlElement, styleNameToFind)
    {
        this.throwExceptionIfIdHtmlElementIsIncorrect(idHtmlElement);

        let domElement = this.getDomElementOnPageById(idHtmlElement);

        let styleNameToFindWithoutDot = this.trimSymbolAtStart(styleNameToFind, ".");

        return domElement && domElement.classList.contains(styleNameToFindWithoutDot);
    }


    trimSymbolAtStart(str, symbolToTrim)
    {
        if (str === "" || str === ".")
        {
            throw new Error("String is incorrect");

        }
        let strWithoutDot = str[0] === symbolToTrim ? str.substring(1) : str;

        return strWithoutDot;
    }
}