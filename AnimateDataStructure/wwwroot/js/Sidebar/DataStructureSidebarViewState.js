import { HtmlPageDomUpdater } from '../HtmlDomElementHandler/HtmlPageDomUpdater.js';

export class DataStructureSidebarViewState
{
    constructor()
    {
        this.htmlPageDomUpdater = new HtmlPageDomUpdater();
        this.isSidebarExpanded = false;
        this.isShownEntityReletedWithSidebarMenuItem = false;
        this.idOfLastOpenedEntityReletedWithSidebarMenuItem = null;
        this.idOfLastClosedEntityReletedWithSidebarMenuItem = null;
    }


    checkIsSidebarExpanded(idOfSidebar, styleNameForExpandingSidebar) // computed based on current sidebar's style
    {
        return this.htmlPageDomUpdater.isClassContainsStyleName(idOfSidebar, styleNameForExpandingSidebar);
    }
}