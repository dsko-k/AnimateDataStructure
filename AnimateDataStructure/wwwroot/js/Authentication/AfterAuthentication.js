import { HtmlPageDomUpdater } from '../HtmlDomElementHandler/HtmlPageDomUpdater.js';
import { HtmlConfigurationAttributesReader } from '../HtmlConfigurationAttributes/HtmlConfigurationAttributesReader.js';
import { ButtonHelper } from '../DomElementHelpers/ButtonHelper.js'
import { ConverterConfigirationsToDomElement } from '../HtmlDomElementHandler/ConverterConfigirationsToDomElement.js';
import { AuthenticationChecker } from './AuthenticationChecker.js';


// Define actions after successful Authentication (programmatically clicking button)
export class AfterAuthentication
{
    constructor()
    {
        this.htmlPageDomUpdater = new HtmlPageDomUpdater();
        this.buttonHelper = new ButtonHelper();
        this.authenticationChecker = new AuthenticationChecker();
        this.converterConfigirationsToDomElement = new ConverterConfigirationsToDomElement();
        this.htmlConfigurationAttributesReader = new HtmlConfigurationAttributesReader();
        this.buttonAuthenticateConfigs = this.htmlConfigurationAttributesReader.getHtmlControlButtonAuthenticateConfigurations();
    }


    emulateClickButtonAfterAuthentication()
    {
        let buttonToBeClickedDomElement = this.getButtonToBeClickedDomElement();

        if (!buttonToBeClickedDomElement || buttonToBeClickedDomElement === "")
        {
            return;
        }

        this.buttonHelper.emulateClickOnButton(buttonToBeClickedDomElement);
    }


    // DO NOT DELETE: convention: tag related to buttonAuthenticateDomElement should contains attribute
    // data-idButtonToClickAfterAuthentication
    getIdButtonToBeClickedAfterAuthentication(buttonAuthenticateDomElement)
    {
        if (!buttonAuthenticateDomElement)
        {
            throw new Error("Incorrect Authenticate button");
        }

        const dataAttributeNameWithIdButtonToBeClicked = this.getDataAttributeNameOfIdButtonToBeClicked(); // "idButtonToClickAfterAuthentication";

        if (!this.isExistDataAttribute(buttonAuthenticateDomElement, dataAttributeNameWithIdButtonToBeClicked))
        {
            throw new Error("Incorrect attribute in Authenticate button");
        }

        return buttonAuthenticateDomElement.dataset[dataAttributeNameWithIdButtonToBeClicked];
    }


    setIdButtonToBeClickedAfterAuthorization(buttonAuthenticateDomElement, newIdButtonToBeClickedAfterAuthentication)
    {
        let dataAttributeNameWithIdButtonToBeClicked = this.getDataAttributeNameOfIdButtonToBeClicked();

        if (!this.isExistDataAttribute(buttonAuthenticateDomElement, dataAttributeNameWithIdButtonToBeClicked))
        {
            throw new Error("Incorrect attribute in Authenticate button");
        }

        buttonAuthenticateDomElement.dataset[dataAttributeNameWithIdButtonToBeClicked] = newIdButtonToBeClickedAfterAuthentication;
    }


    clearIdButtonToBeClickedAfterAuthorization()
    {
        let buttonAuthenticateDomElement = this.converterConfigirationsToDomElement.getDomElementFromConfigurations(this.buttonAuthenticateConfigs.buttonAuthenticateAttributes);

        this.setIdButtonToBeClickedAfterAuthorization(buttonAuthenticateDomElement, "");
    }


    isExistDataAttribute(domElementOwnerOfDataAttribute, dataAttributeNameWithIdButtonToBeClicked)
    {
        return dataAttributeNameWithIdButtonToBeClicked in domElementOwnerOfDataAttribute.dataset;
    }


    getButtonToBeClickedDomElement()
    {
        let buttonAuthenticateDomElement = this.converterConfigirationsToDomElement.getDomElementFromConfigurations(this.buttonAuthenticateConfigs.buttonAuthenticateAttributes);

        let idButtonToBeClickedAfterAuthentication = this.getIdButtonToBeClickedAfterAuthentication(buttonAuthenticateDomElement);

        if (idButtonToBeClickedAfterAuthentication === "")
        {
            return null;
        }

        return this.htmlPageDomUpdater.getDomElementOnPageById(idButtonToBeClickedAfterAuthentication);
    }


    getDataAttributeNameOfIdButtonToBeClicked()
    {
        return this.buttonAuthenticateConfigs.buttonAuthenticateAttributes.dataAttributeNames.dataAttributeNameForIdButtonToClickAfterAuthentication;
    }
}