export class HtmlElementCreator // Foreman
{
    constructor(stepAnimation, htmlNodeBuilder)
    {
        this.stepAnimation = stepAnimation;
        this.htmlNodeBuilder = htmlNodeBuilder;
    }


    constructHtmlElement(htmlGlowingMovingUpLineContainer = null, htmlGlowingMovingDownLineContainer = null)
    {
        if (htmlGlowingMovingUpLineContainer && htmlGlowingMovingDownLineContainer)
        {
            throw new Error(`Incorrect specified glowing moving line containers: specify only one of them`);
        }
        this.htmlNodeBuilder.buildHtmlContainer({ htmlNodeContainer: this.stepAnimation.htmlNodeContainer });
        this.htmlNodeBuilder.buildHtmlContainer({ htmlLinkContainer: this.stepAnimation?.htmlLinkContainer });
        this.htmlNodeBuilder.buildHtmlContainer({ htmlGlowingMovingUpLineContainer: this.stepAnimation?.htmlGlowingMovingUpLineContainer });
        this.htmlNodeBuilder.buildHtmlContainer({ htmlGlowingMovingDownLineContainer: this.stepAnimation?.htmlGlowingMovingDownLineContainer });
        this.insertHtmlElement(); // whereToAppend = "beforeend"
    }


    insertHtmlElement(whereToAppend = "beforeend")
    {
        let sortedHtmlContainer = this.htmlNodeBuilder.htmlElementContainerParts.nodeHtmlParts
            .sort((partFirst, partSecond) => partFirst.elementNumber - partSecond.elementNumber);
        if (sortedHtmlContainer.length === 0)
        {
            return;
        }
        while (sortedHtmlContainer.length > 1)
        {
            let lastElement = sortedHtmlContainer.pop();
            let parentElement = sortedHtmlContainer.filter(sortedHtml =>
            {
                return sortedHtml.elementNumber === lastElement.parentElementNumber;

            })[0];
            parentElement.htmlPart.insertAdjacentElement("afterbegin", lastElement.htmlPart);
        }
        let parentContainerId = this.htmlNodeBuilder.getParentContainerId(sortedHtmlContainer[0]);
        let elementToAppendHierarchy = document.getElementById(parentContainerId);
        let htmlContainerHeadStyle = sortedHtmlContainer[0].htmlPart.getAttribute("class");
        elementToAppendHierarchy.insertAdjacentElement(whereToAppend, sortedHtmlContainer[0].htmlPart);

        return sortedHtmlContainer[0].htmlPart;
    }


    getHtmlContainerHead()
    {
        return this.htmlNodeBuilder.htmlElementContainerParts.nodeHtmlParts[0].htmlPart;
    }
}