
export class ContexCleaningCssEntity
{
    constructor(cleanerInstance)
    {
        this.cleanerInstance = cleanerInstance;
    }


    cleanCss(node, elementName)
    {
        this.cleanerInstance.removeCssEntities(node, elementName);
    }
}