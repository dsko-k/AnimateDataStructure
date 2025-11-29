import { StyleClassTextHandler } from '../CssHandlers/StyleClassTextHandler.js';
import { AbstractCssEntityCleaner } from './AbstractCssEntityCleaner.js';

export class StyleCleaner extends AbstractCssEntityCleaner
{
    constructor()
    {
        super();
        this.styleClassTextHandler = new StyleClassTextHandler();
    }

    // Removes CSS style class
    removeCssEntities(node, elementName)
    {
        if (!this.domUpdater.isExistDomElement(node, elementName))
        {
            throw new Error(`Unable to remove animation for node with nodeId = '${node.nodeId}' and elementName = '${elementName}'. It does not exist`);
        }

        let styleName = this.domUpdater.getAttributeDomElement(node, elementName, "class");

        this.styleClassTextHandler.deleteStyle(styleName);
    }
}