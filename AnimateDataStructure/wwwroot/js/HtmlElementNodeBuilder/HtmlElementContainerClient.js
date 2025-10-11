import { HtmlElementCreator } from './HtmlElementCreator.js';

export class HtmlElementContainerClient // Client
{
    constructor(stepAnimation, htmlNodeBuilder)
    {
        this.stepAnimation = stepAnimation;
        this.htmlNodeBuilder = htmlNodeBuilder;
        this.htmlElementCreator = new HtmlElementCreator(this.stepAnimation, this.htmlNodeBuilder)
    }


    createHtmlElementContainer(htmlGlowingMovingUpLineContainer = null, htmlGlowingMovingDownLineContainer = null)
    {
        this.htmlElementCreator.constructHtmlElement(htmlGlowingMovingUpLineContainer, htmlGlowingMovingDownLineContainer);
    }


    getHtmlElementContainerParts()
    {
        return this.htmlNodeBuilder.getNodeHtmlParts();
    }
}