import { HtmlElementContainerParts } from './HtmlElementContainerParts.js';

export class HtmlNodeBuilder // abstract builder
{
    constructor(stepAnimation, patternStepAnimationArrayAddingNode)
    {
        this.stepAnimation = stepAnimation;
        this.patternStepAnimationArrayAddingNode = patternStepAnimationArrayAddingNode;
        this.htmlElementContainerParts = new HtmlElementContainerParts();
    }


    buildHtmlElementPart(tag, idValue, styleClassToApply, elementName, attributes = null)
    {
        if (!this.isExistDomElement(idValue))
        {
            let createdDom = this.createDomElement(tag, idValue);

            if (tag !== "linearGradient" && tag !== "defs")
            {
                createdDom.setAttribute('class', styleClassToApply);
            }

            //if (tag === "line")
            //{
            //    let nodeId = this.stepAnimation.nodesInfoStepAnimation.relativeNodeToAnimateAccross.nodeId;

            //    createdDom.setAttribute("stroke", `url(#${nodeId})`);
            //}

            if (tag === "p" && styleClassToApply === "nodeValue")
            {
                createdDom.insertAdjacentText("afterbegin", this.stepAnimation.nodesInfoStepAnimation.nodeToAnimate.value);
            }

            createdDom.setAttribute('id', idValue);

            createdDom.dataset.elementName = elementName;

            if (attributes)
            {
                this.setDomAttributes(createdDom, attributes);
            }

            return createdDom;
        }
        else
        {
            this.updateDomElement(idValue, styleClassToApply, attributes);

            if (attributes)
            {
                this.updateDomAttributes(idValue, attributes);
            }
        }
    }


    generateIdValue(htmlContainerElement)
    {
        let nodeId = this.stepAnimation.nodesInfoStepAnimation.nodeToAnimate.nodeId;

        let tag = htmlContainerElement.tag;

        let elementNumber = htmlContainerElement.elementNumber;

        if (tag === "line")
        {
            return `id_${tag}_${elementNumber}_${nodeId}`;
        }

        if (tag === "linearGradient")
        {
            return `id_${tag}_${nodeId}`;
        }

        //let classNamePrototype = htmlContainerElement.styleClassPrototypeName;

        //let classNameWithoutDot = classNamePrototype.substring(1);

        //return `id_${classNameWithoutDot}_${nodeId}`;

        let elementName = htmlContainerElement.elementName;

        return `id_${elementName}_${nodeId}`;
    }


    getParentContainerId(htmlContainerElement)
    {
        if (!htmlContainerElement.parentElementNumber && htmlContainerElement.elementNumber === 1)
        {
            return "idInpuntContainer";
        }

        if (htmlContainerElement.htmlContainerName === "htmlLinkContainer")
        {
            let parentContainerElement = this.stepAnimation.htmlNodeContainer.filter(htmlNodeContainerElement =>
            {
                return htmlNodeContainerElement.elementNumber === htmlContainerElement.parentElementNumber;

            })[0];

            return this.generateIdValue(parentContainerElement);
        }

        if (htmlContainerElement.htmlContainerName === "htmlGlowingMovingUpLineContainer" ||
            htmlContainerElement.htmlContainerName === "htmlGlowingMovingDownLineContainer")
        {
            let parentContainerElement = this.stepAnimation.htmlLinkContainer.filter(htmlLinkContainerElement =>
            {
                return htmlLinkContainerElement.elementNumber === htmlContainerElement.parentElementNumber;

            })[0];

            return this.generateIdValue(parentContainerElement);
        }

        throw new Error(`Parent container for ${htmlContainerElement.htmlContainerName} was not found`);
    }


    getClassNameSuperContainer(isForNodeToAnimate = true)
    {
        let nodeId = this.stepAnimation.nodesInfoStepAnimation.nodeToAnimate.nodeId;

        if (!isForNodeToAnimate)
        {
            nodeId = this.refactoredStepAnimation.nodesInfoStepAnimation.relativeNodeToAnimateAccross.nodeId;
        }

        let styleClassPrototypeNameWithoutDot = this.stepAnimation.styleClassPrototypeStepAnimation.styleClassPrototypeName.substring(1);

        return styleClassPrototypeNameWithoutDot + "_" + nodeId;
    }


    //////
    // DOM
    // privates
    isExistDomElement(idValue)
    {
        let foundDomElement = document.getElementById(idValue);

        return foundDomElement !== null;
    }


    isExistAttribute(idValue, attributeName)
    {
        if (this.isExistDomElement(idValue))
        {
            return document.getElementById(idValue).getAttribute(attributeName) !== null;
        }

        return false;
    }


    getDomElement(idValue)
    {
        if (!this.isExistDomElement(idValue))
        {
            throw new Error(`Unable get element <${tag} id = ${idValue}>. It does not exist`);
        }

        return document.getElementById(idValue);
    }


    createDomElement(tag, idValue)
    {
        if (!tag || tag === "")
        {
            throw new Error("tag empty or undefined");
        }

        if (this.isExistDomElement(idValue))
        {
            throw new Error(`Element <${tag} id = ${idValue}> exists already`);
        }

        if (tag.toLowerCase() === "svg" || tag.toLowerCase().includes("line") || tag.toLowerCase() === "defs" || tag.toLowerCase() === "stop")
        {
            return document.createElementNS('http://www.w3.org/2000/svg', tag /*tag.toLowerCase()*/);
        }

        return document.createElement(tag);
    }


    updateDomElement(idValue, className, attributes = null)
    {
        if (!this.isExistDomElement(idValue))
        {
            throw new Error(`Unable to update element <${tag} id = ${idValue}>. It does not exist`);
        }

        let tag = this.getDomElement(idValue).tagName.toUpperCase();

        if (tag !== "line".toUpperCase() && tag !== "linearGradient".toUpperCase() && tag !== "defs".toUpperCase())
        {
            this.updateDomAttribute(idValue, "class", className);
        }


        if (attributes)
        {
            this.updateDomAttributes(idValue, attributes);
        }
    }


    setDomAttribute(domElement, attributeName, attributeValue)
    {
        domElement.setAttribute(attributeName, attributeValue);
    }


    setDomAttributes(domElement, attributes)
    {
        if (!attributes)
        {
            throw new Error(`Unable to set attributes for element <${tag} id = ${idValue}>. Attributes are empty or undefined`);
        }

        attributes.forEach(attribute =>
        {
            let attributeName = Object.keys(attribute)[0];
            let attributeValue = attribute[attributeName];

            this.setDomAttribute(domElement, attributeName, attributeValue);
        });
    }


    updateDomAttribute(idValue, attributeName, attributeValue)
    {
        if (!this.isExistDomElement(idValue))
        {
            throw new Error(`Unable to update attribute for element <${tag} id = ${idValue}>. The element does not exist`);
        }


        if (!this.isExistAttribute(idValue, attributeName))
        {
            throw new Error(`Unable to update attribute '${attributeName}' for element <${tag} id = ${idValue}>. The element does not have attribute '${attributeName}'`);
        }

        let domElement = this.getDomElement(idValue);

        this.setDomAttribute(domElement, attributeName, attributeValue);
    }


    updateDomAttributes(idValue, attributes)
    {
        if (!this.isExistDomElement(idValue))
        {
            throw new Error(`Unable to update attribute for element <${tag} id = ${idValue}>. The element does not exist`);
        }

        if (!attributes)
        {
            throw new Error(`Unable to set attributes for element <${tag} id = ${idValue}>. Attributes are empty or undefined`);
        }

        attributes.forEach(attribute =>
        {
            let attributeName = Object.keys(attribute)[0];
            let attributeValue = attribute[attributeName];

            this.updateDomAttribute(idValue, attributeName, attributeValue);
        });
    }
}