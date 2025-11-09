import { HtmlPageDomUpdater } from '../HtmlDomElementHandler/HtmlPageDomUpdater.js';
import { HtmlConfigurationAttributesReader } from '../HtmlConfigurationAttributes/HtmlConfigurationAttributesReader.js';

export class ContextOperationFormValidation
{
    constructor(operationFormValidation)
    {
        this.operationFormValidation = operationFormValidation;
        this.htmlPageDomUpdater = new HtmlPageDomUpdater();
        this.htmlConfigurationAttributesReader = new HtmlConfigurationAttributesReader();
    }


    checkFormValidity(formDomElements, controlHandler)
    {
        return this.operationFormValidation.isValidFormFields(formDomElements, controlHandler);
    }


    checkValidityStringToSaveNodes(formDomElements, stringOfNodesToSave, controlHandler)
    {
        return this.operationFormValidation.isValidStringOfNodesToBeSaved(formDomElements, stringOfNodesToSave, controlHandler);
    }


    // ???
    checkValidityNodeParentListToSaveNodes(formDomElements, nodeParentListToSave, controlHandler)
    {
        return this.operationFormValidation.isValidNodeParentListToBeSaved(formDomElements, nodeParentListToSave, controlHandler);
    }


}