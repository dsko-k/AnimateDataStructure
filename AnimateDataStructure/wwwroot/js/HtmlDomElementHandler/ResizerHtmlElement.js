import { HtmlPageDomUpdater } from './HtmlPageDomUpdater.js';


export class ResizerHtmlElement // resize html-element by width or height
{
    constructor(idHtmlElementResizer, idHtmlElementToBeResized)
    {
        this.isResizing = false;
        this.htmlPageDomUpdater = new HtmlPageDomUpdater();
        this.idHtmlElementResizer = idHtmlElementResizer;
        this.idHtmlElementToBeResized = idHtmlElementToBeResized;
        this.xInitial = null;
        this.yInitial = null;
        this.widthInitial = null;
        this.heightInitial = null;
        this.moveHandler = null;
        this.upHandler = null;
        this.domElementResizer = this.htmlPageDomUpdater.getDomElementOnPageById(idHtmlElementResizer);
        this.domElementToBeResized = this.htmlPageDomUpdater.getDomElementOnPageById(idHtmlElementToBeResized);
    }


    onResize(isResizingHorizontal)
    {
        this.domElementResizer.addEventListener("mousedown", function (evn) // DOM resizer
        {
            this.mouseDownListener(evn, isResizingHorizontal);
        }.bind(this));
    }


    mouseDownListener(evn, isResizingHorizontal)
    {
        this.isResizing = true;
        this.assignInitialCoordinateToElementToBeResized(evn, isResizingHorizontal);
        this.assignInitialSizeOfElementToBeResized(isResizingHorizontal);
        this.moveHandler = function (evn)
        {
            this.mouseMoveListener(evn, isResizingHorizontal);
        }.bind(this);
        // DOM document (not resizer)
        document.addEventListener("mousemove", this.moveHandler);
        this.upHandler = this.mouseUpListener.bind(this, isResizingHorizontal);
        document.addEventListener("mouseup", this.upHandler);
    }


    mouseMoveListener(evn, isResizingHorizontal)
    {
        if (!this.isResizing)
        {
            return;
        }
        let newSize = this.computeNewSize(evn, isResizingHorizontal);
        this.assignNewSizeToElementToBeResized(isResizingHorizontal, newSize);
    }


    mouseUpListener(isResizingHorizontal)
    {
        this.isResizing = false;
        this.xInitial = null;
        this.yInitial = null;
        this.widthInitial = null;
        this.heightInitial = null;        
        document.removeEventListener("mousemove", this.moveHandler); // use DOM document. ... (not DOMresizer)
        document.removeEventListener("mouseup", this.upHandler);
    }


    assignInitialSizeOfElementToBeResized(isResizingHorizontal)
    {
        if (isResizingHorizontal)
        {
            this.widthInitial = this.htmlPageDomUpdater.parseComputedStyle(this.idHtmlElementToBeResized, "width", false);
        }
        else
        {
            this.heightInitial = this.htmlPageDomUpdater.parseComputedStyle(this.idHtmlElementToBeResized, "height", true);
        }
    }


    assignInitialCoordinateToElementToBeResized(evn, isResizingHorizontal)
    {
        isResizingHorizontal ? this.xInitial = evn.clientX : this.yInitial = evn.clientY;
    }


    computeNewSize(evn, isResizingHorizontal)
    {
        if (isResizingHorizontal)
        {
            let coordinateDifference = evn.clientX - this.xInitial;
            return this.widthInitial + coordinateDifference;
        }
        let coordinateDifference = evn.clientY - this.yInitial;
        return this.heightInitial + coordinateDifference;
    }


    assignNewSizeToElementToBeResized(isResizingHorizontal, newSize)
    {
        if (isResizingHorizontal)
        {
            this.domElementToBeResized.style.width = `${newSize}px`;
            return;
        }
        this.domElementToBeResized.style.height = `${newSize}px`;
    }
}