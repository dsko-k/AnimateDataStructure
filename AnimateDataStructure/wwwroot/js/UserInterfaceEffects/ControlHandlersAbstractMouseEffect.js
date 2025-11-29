import { HtmlPageDomUpdater } from '../HtmlDomElementHandler/HtmlPageDomUpdater.js';

export class ControlHandlersAbstractMouseEffect
{
    constructor()
    {
        this.htmlPageDomUpdater = new HtmlPageDomUpdater();
    }


    onMouseMoveOnElement(styleNameWithDot, firstCssVariableName, secondCssVariableName)
    {
        this.htmlPageDomUpdater.throwExceptionIfCssVariableNameIsIncorrect(firstCssVariableName);
        this.htmlPageDomUpdater.throwExceptionIfCssVariableNameIsIncorrect(secondCssVariableName);

        let foundDomElements = this.htmlPageDomUpdater.getDomElementsOnPageByStyleName(styleNameWithDot);

        foundDomElements.forEach(domElement =>
        {
            domElement.addEventListener('mousemove', evn =>
            {
                let rect = evn.target.getBoundingClientRect();
                let x = evn.clientX - rect.left;
                let y = evn.clientY - rect.top;
                domElement.style.setProperty(firstCssVariableName, `${x}px`);
                domElement.style.setProperty(secondCssVariableName, `${y}px`);
            });
        });
    }


    // effect of border glowing using radial gradient
    onMouseMoveOnElementOnParent(parentId, childStyleNameWithDot, firstCssVariableName, secondCssVariableName)
    {
        let parentDomElement = document.getElementById(parentId);
        if (parentDomElement == null)
        {
            throw new Error(`Incorrect id='${parentId}'of html-element`);
        }
        parentDomElement.addEventListener('mousemove', evn =>
        {
            this.htmlPageDomUpdater.throwExceptionIfCssVariableNameIsIncorrect(firstCssVariableName);
            this.htmlPageDomUpdater.throwExceptionIfCssVariableNameIsIncorrect(secondCssVariableName);
            let foundDomElements = this.htmlPageDomUpdater.getDomElementsOnPageByStyleName(childStyleNameWithDot);

            foundDomElements.forEach(domElement =>
            {
                let rect = domElement.getBoundingClientRect();
                let x = evn.clientX - rect.left;
                let y = evn.clientY - rect.top;

                domElement.style.setProperty(firstCssVariableName, `${x}px`);
                domElement.style.setProperty(secondCssVariableName, `${y}px`);
            });
        });
    }
}