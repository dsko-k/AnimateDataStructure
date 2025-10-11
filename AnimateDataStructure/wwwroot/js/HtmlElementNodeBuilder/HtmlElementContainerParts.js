export class HtmlElementContainerParts // House
{
    constructor()
    {
        this.nodeHtmlParts = [];
    }

    addNodeHtmlPart(elementNumber, elementName, htmlPart, parentElementNumber, htmlContainer) // htmlContainer is name of variable:  htmlNodeContainer or htmlLinkContainer or htmlGlowingMovingUpLineContainer or htmlGlowingMovingDownLineContainer
    {
        this.nodeHtmlParts.push({
            elementNumber: elementNumber,
            elementName: elementName,
            htmlPart: htmlPart,
            parentElementNumber: parentElementNumber,
            htmlContainerName: htmlContainer,
        });
    }


    getParentElement(nodeHtmlPart)
    {
        return this.htmlElementContainerParts.nodeHtmlParts.filter(containerHtmlPart =>
        {
            return containerHtmlPart.elementNumber === nodeHtmlPart.parentElementNumber;
        })[0];
    }

}