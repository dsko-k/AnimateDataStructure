import { StyleClassTextHandler } from '../CssHandlers/StyleClassTextHandler.js';

export class StyleClassPrototypeStepAnimation
{
    constructor(styleClassPrototypeName, styleKeysToUpdate)
    {
        this.styleClassPrototypeName = styleClassPrototypeName;
        this.styleKeysToUpdate = styleKeysToUpdate;
        this.styleClassTextHandler = new StyleClassTextHandler();
        this.styleClassPrototype = this.getStyleClassPrototype();
        this.styleClassPrototypeKeyValues = this.getKeyValues();        
    }

    getKeyValues()
    {
        return this.styleClassTextHandler.getStyleEntries(this.styleClassPrototypeName);
    }

    getStyleClassPrototype()
    {
        return this.styleClassTextHandler.getStyleClass(this.styleClassPrototypeName)[0];
    }
}