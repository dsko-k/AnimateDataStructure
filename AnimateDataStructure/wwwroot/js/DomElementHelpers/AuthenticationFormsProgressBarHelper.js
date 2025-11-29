import { HtmlConfigurationAttributesReader } from '../HtmlConfigurationAttributes/HtmlConfigurationAttributesReader.js';
import { ConverterConfigirationsToDomElement } from '../HtmlDomElementHandler/ConverterConfigirationsToDomElement.js';

export class AuthenticationFormsProgressBarHelper
{
    constructor()
    {
        this.htmlConfigurationAttributesReader = new HtmlConfigurationAttributesReader();
        this.authenticationFormsDatastructuresConfigs = this.htmlConfigurationAttributesReader.getAuthenticationFormsDatastructuresConfigurations();
        this.converterConfigirationsToDomElement = new ConverterConfigirationsToDomElement();
    }


    toggleFormProgressBarStyle()
    {
        let formProgressBarDomElement = this.getAuthenticationFormProgressBarDomElement();
        let styleNameToShowProgressBar = this.getStyleNameToShowProgressBar();
        formProgressBarDomElement.classList.toggle(styleNameToShowProgressBar);
    }


    getAuthenticationFormProgressBarDomElement()
    {
        return this.converterConfigirationsToDomElement.getDomElementFromConfigurations(this.authenticationFormsDatastructuresConfigs.divProgressBarAttributes);
    }


    getStyleNameToShowProgressBar()
    {
        return this.authenticationFormsDatastructuresConfigs.divProgressBarAttributes.additionalStyleToShowProgressBar.class;
    }
}