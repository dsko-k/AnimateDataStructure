
// update create DOM-elements
export class DomUpdater
{
    applyAdditionalStyleClasses(node, additionalStyleClasses, operation)
    {
        if (!additionalStyleClasses)
        {
            throw new Error(`Additional styles to apply is ${additionalStyleClasses}`);
        }
        if (!node)
        {
            throw new Error(`Node is ${node}`);
        }
        additionalStyleClasses.forEach(additionalStyleClass =>
        {
            let elementNameToApplyStyle = additionalStyleClass.elementNameToApplyStyle;
            let newStyleClassName = additionalStyleClass.styleClassToApply;

            this.updateStyleClass(node, elementNameToApplyStyle, newStyleClassName);
        });

        node.appliedNodeStyles.addAppliedNodeStyles(node, operation); // write applied changes in styles
    }


    // get value of styleToApply in additionalStyleClasses by clauses
    getStyleToApplyOfAdditionalStyleClasses(additionalStyleClasses, elementNameToApplyStyle, additionalStyleClassKeyName, valueOfAdditionalStyleClassKeyName)
    {
        let elementsOfAdditionalStyleClasses = additionalStyleClasses
            .filter(additionalStyleClassElement => additionalStyleClassElement.elementNameToApplyStyle === elementNameToApplyStyle &&
                additionalStyleClassElement[additionalStyleClassKeyName] === valueOfAdditionalStyleClassKeyName);
        if (elementsOfAdditionalStyleClasses.length !== 1)
        {
            throw new Error(`Elements of additionalStyleClasses for ${elementNameToApplyStyle} is {elementsOfAdditionalStyleClasses.length}`);
        }
        let styleOfGlowingBorderPreviouslyFoundNode = elementsOfAdditionalStyleClasses[0].styleClassToApply;

        return styleOfGlowingBorderPreviouslyFoundNode;
    }


    updateStyleClass(node, elementNameToApplyStyle, newStyleClassName)
    {
        let domElement = this.getDomElement(node, elementNameToApplyStyle);
        if (!domElement)
        {
            throw new Error(`For node with nodeId=${node.nodeId} was not found element name = '${elementNameToApplyStyle}'`);
        }
        domElement.setAttribute("class", newStyleClassName);
    }


    isExistDomElement(node, elementName)
    {
        if (!node)
        {
            return false;
        }
        if (!elementName || elementName === "")
        {
            throw new Error(`Element name '${elementName}' is incorrect`);
        }
        let domElements = document.querySelectorAll(`[data-element-name='${elementName}'`);
        if (!domElements)
        {
            throw new Error(`'${elementName}' was not found in document`);
        }
        let foundDomElement = [...domElements].filter(element =>
        {
            if (element.id == `id_${elementName}_${node.nodeId}`)
            {
                return element;
            }
            if (element.id.includes(`${node.nodeId}_Finder`))
            {
                return element;
            }
            if (element.id.includes(`${node.nodeId}_Visitor`))
            {
                return element;
            }
        });
        if (foundDomElement.length > 1)
        {
            throw new Error(`Node with id = ${node.nodeId} contains ${foundDomElement.length} duplicates of element with name '${elementName}'`);
        }

        return foundDomElement.length != 0
    }


    getDomElement(node, elementName) // elementName - is value of attribute data-element-name in html
    {
        if (!node)
        {
            throw new Error(`node is null or undefined`);
        }
        if (!elementName || elementName === "")
        {
            throw new Error(`Element name '${elementName}' is incorrect`);
        }
        let domElements = document.querySelectorAll(`[data-element-name='${elementName}'`);
        if (!domElements)
        {
            throw new Error(`'${elementName}' was not found in document`);
        }
        let foundDomElement = [...domElements].filter(element =>
        {
            if (element.id == `id_${elementName}_${node.nodeId}`)
            {
                return element;
            }
            if (element.id.includes(`${node.nodeId}_Finder`))
            {
                return element;
            }
            if (element.id.includes(`${node.nodeId}_Visitor`))
            {
                return element;
            }
        });
        if (foundDomElement.length == 0)
        {
            throw new Error(`Node with id = ${node.nodeId} does not contain element with name '${elementName}'`);
        }
        if (foundDomElement.length > 1)
        {
            throw new Error(`Node with id = ${node.nodeId} contains ${foundDomElement.length} duplicates of element with name '${elementName}'`);
        }

        return foundDomElement[0];
    }


    getAttributeDomElement(node, elementName, attributeName)
    {
        let domElement = this.getDomElement(node, elementName);
        let attributeValue = domElement.getAttribute(attributeName);
        if (attributeValue === null || attributeValue === undefined)
        {
            throw new Error(`{Attribute '${attributeName}' was not found in ${node.nodeId} with elementName = "${elementName}"}`);
        }

        return attributeValue;
    }


    removeDomElement(node, elementName)
    {
        let domElement = this.getDomElement(node, elementName);
        domElement.remove();
    }


    getAnimationNames(node, elementName)
    {
        if (!this.isExistDomElement(node, elementName))
        {
            return [];
        }
        let foundDomElement = this.getDomElement(node, elementName);
        let animationNames = window.getComputedStyle(foundDomElement).animationName.split(", ");
        if (animationNames.length === 0)
        {
            throw new Error(`Element name ${elementName} does not contain animations`);
        }

        return animationNames;
    }


    getLastAnimationName(node, elementName)
    {
        let animationNames = this.getAnimationNames(node, elementName);

        return animationNames[animationNames.length - 1];
    }


    getKeyframesByKeyName(node, elementName, keyName)
    {
        if (!this.isExistDomElement(node, elementName))
        {
            throw new Error(`Unable to find Keyframes names in key ${keyName} of elementName '${elementName}' of node ${node.nodeId}`);
        }
        let domElementNodeToAnimate = this.getDomElement(node, elementName);
        let previousKeyframeNames = window.getComputedStyle(domElementNodeToAnimate).getPropertyValue(keyName).split(", "); // list of keyframes names by keyName in CSS class before this CSS class will be changed
        if (previousKeyframeNames === "" || !previousKeyframeNames)
        {
            throw new Error($`Incorrect parsing the value of a key "--insideBorderAnimationNames". Keyframes names are empty`);
        }

        return previousKeyframeNames;
    }


    isExistAnimationName(animationNameToFind, node, elementName)
    {
        let animationNames = this.getAnimationNames(node, elementName);
        let foundAnimationNames = animationNames.filter(name => name === animationNameToFind);

        return foundAnimationNames.length > 0;
    }


    // It needs to place successor under node nodeToDelete. This method is invoked as a part of alignment by height (before starting moving successor during animation of alignment by height )
    changeZIndexForNodeElement(node, elementName, newValue) // newValue - any negative (or lower) value of z-index than have successor
    {
        if (!newValue)
        {
            throw new Error("Incorrect value for z-index");
        }
        let foundDomElementOfNode = this.getDomElement(node, elementName);
        foundDomElementOfNode.style["z-index"] = newValue;
    }


    // get computed value of CSS style property
    getValueComputedCss(node, elementName, propertyName)
    {
        if (!propertyName || propertyName === "")
        {
            throw new Error(`node ${node.nodeId} with elementName = '${elementName}': Incorrect specified CSS property '${propertyName}'`);
        }
        if (this.isExistDomElement(node, elementName))
        {
            let domElement = this.getDomElement(node, elementName);
            let computedValue = window.getComputedStyle(domElement).getPropertyValue(propertyName);
            return computedValue;
        }
    }


    getControl(idControl)
    {
        if (!idControl || idControl == "")
        {
            throw new Error(`Incorrect specified element id=${idControl}`);
        }
        let control = document.getElementById(idControl);
        if (!control)
        {
            throw new Error(`Html element with id=${idControl} was not found`);
        }

        return control;
    }
}