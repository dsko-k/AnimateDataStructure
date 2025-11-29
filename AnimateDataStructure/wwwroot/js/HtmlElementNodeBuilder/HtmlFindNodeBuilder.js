import { HtmlNodeBuilder } from './HtmlNodeBuilder.js';

export class HtmlFindNodeBuilder extends HtmlNodeBuilder
{
    constructor(stepAnimation, patternStepAnimationArrayAddingNode)
    {
        super(stepAnimation, patternStepAnimationArrayAddingNode);
    }


    buildHtmlContainer(htmlContainerObj)
    {
        if (!htmlContainerObj)
        {
            return;
        }
        let htmlContainerName = Object.keys(htmlContainerObj)[0];
        let htmlContainer = htmlContainerObj[htmlContainerName];
        if (!htmlContainer)
        {
            return;
        }
        htmlContainer.forEach(htmlContainerPart =>
        {
            let tag = htmlContainerPart.tag;
            let styleClassToApply = !htmlContainerPart.parentElementNumber ? this.getClassNameSuperContainer() : htmlContainerPart.styleClassToApply.substring(1);
            let idValue = this.generateIdValue(htmlContainerPart);
            let elementNumber = htmlContainerPart.elementNumber;
            let elementName = htmlContainerPart.elementName;
            let parentElementNumber = htmlContainerPart.parentElementNumber;
            let attributes = htmlContainerPart?.attributes ? htmlContainerPart.attributes : null;
            let htmlPart = this.buildHtmlElementPart(tag, idValue, styleClassToApply, elementName, attributes);
            if (htmlPart)
            {
                this.htmlElementContainerParts.addNodeHtmlPart(elementNumber, elementName, htmlPart, parentElementNumber, htmlContainerName);
            }
        });

        return htmlContainer;
    }


    generateIdValue(htmlContainerPart)
    {
        return super.generateIdValue(htmlContainerPart) + "_Finder";
    }


    getClassNameSuperContainer()
    {
        let value = this.stepAnimation.nodesInfoStepAnimation.relativeNodeToAnimateAccross.nodeId;
        let styleClassPrototypeNameWithoutDot = this.stepAnimation.styleClassPrototypeStepAnimation.styleClassPrototypeName.substring(1);
        return styleClassPrototypeNameWithoutDot + "_" + value;
    }


    getNodeHtmlParts()
    {
        return this.htmlElementContainerParts;
    }
}