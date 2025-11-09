import { HtmlConfigurationAttributesReader } from '../HtmlConfigurationAttributes/HtmlConfigurationAttributesReader.js';
import { ConverterConfigirationsToDomElement } from '../HtmlDomElementHandler/ConverterConfigirationsToDomElement.js';


export class InputProgressBarHelper
{
    constructor()
    {
        this.htmlConfigurationAttributesReader = new HtmlConfigurationAttributesReader();
        this.converterConfigirationsToDomElement = new ConverterConfigirationsToDomElement();
        this.inputNodeConfigs = this.htmlConfigurationAttributesReader.getHtmlInputNodeConfigurations();
    }


    toggleFormProgressBarStyle()
    {
        let formProgressBarDomElement = this.converterConfigirationsToDomElement.getDomElementFromConfigurations(this.inputNodeConfigs.divInputProgressBarAttributes);
        let styleNameToShowProgressBar = this.getStyleNameToShowProgressBar();
        formProgressBarDomElement.classList.toggle(styleNameToShowProgressBar);
    }


    getStyleNameToShowProgressBar()
    {
        return this.inputNodeConfigs.divInputProgressBarAttributes.additionalStyleToShowProgressBar.class;
    }

}