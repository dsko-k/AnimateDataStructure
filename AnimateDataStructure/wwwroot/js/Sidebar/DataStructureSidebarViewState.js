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

    // Compute based on current sidebar's style
    checkIsSidebarExpanded(idOfSidebar, styleNameForExpandingSidebar)
    {
        return this.htmlPageDomUpdater.isClassContainsStyleName(idOfSidebar, styleNameForExpandingSidebar);
    }
}