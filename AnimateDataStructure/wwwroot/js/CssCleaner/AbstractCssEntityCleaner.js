import { DomUpdater } from '../HtmlDomElementHandler/DomUpdater.js';

export class AbstractCssEntityCleaner
{
    constructor()
    {
        this.domUpdater = new DomUpdater();
    }
}