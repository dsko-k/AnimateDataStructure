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


    isUserAuthenticated()
    {
        let inputUserAuthenticationStatusDomElement = this.getInputUserAuthenticationStatusDomElement();

        return inputUserAuthenticationStatusDomElement && inputUserAuthenticationStatusDomElement.value === `${true}`;
    }


    getInputUserAuthenticationStatusDomElement()
    {
        let buttonAuthenticateConfigurations = this.htmlConfigurationAttributesReader.getHtmlControlButtonAuthenticateConfigurations();

        let inputUserAuthenticationStatusAttributes = buttonAuthenticateConfigurations.inputUserAuthenticationStatusAttributes;

        let idInputUserAuthenticationStatus = inputUserAuthenticationStatusAttributes.defaultAttributes.id;

        const inputUserAuthenticationStatus = this.htmlPageDomUpdater.getDomElementOnPageById(idInputUserAuthenticationStatus);

        return inputUserAuthenticationStatus;
    }
}