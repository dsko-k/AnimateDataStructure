import { PropertyTextHandler } from '../CssHandlers/PropertyTextHandler.js';

export class PropertyPrototypeStepAnimation
{
    constructor(propertyPrototypeEntityName)
    {
        this.propertyPrototypeEntityName = propertyPrototypeEntityName;
        this.propertyTextHandler = new PropertyTextHandler();
        this.propertyPrototype = this.getPropertyPrototype();
        this.propertyPrototypeKeyValues = this.getKeyValues();
    }

    getKeyValues()
    {
        return this.propertyTextHandler.getParsedKeyValueLines(this.propertyPrototypeEntityName)
    }

    getPropertyPrototype()
    {
        return this.propertyTextHandler.getUnparsedPropertyEntityBodyAndName(this.propertyPrototypeEntityName);
    }
}