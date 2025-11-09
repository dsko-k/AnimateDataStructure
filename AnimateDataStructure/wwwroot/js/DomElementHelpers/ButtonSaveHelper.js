import { HtmlPageDomUpdater } from '../HtmlDomElementHandler/HtmlPageDomUpdater.js';
import { HtmlConfigurationAttributesReader } from '../HtmlConfigurationAttributes/HtmlConfigurationAttributesReader.js';
import { ButtonHelper } from './ButtonHelper.js';
import { ConverterConfigirationsToDomElement } from '../HtmlDomElementHandler/ConverterConfigirationsToDomElement.js';

export class ButtonSaveHelper
{
    constructor()
    {
        this.htmlPageDomUpdater = new HtmlPageDomUpdater();    
        this.buttonHelper = new ButtonHelper();
        this.converterConfigirationsToDomElement = new ConverterConfigirationsToDomElement();
        this.htmlConfigurationAttributesReader = new HtmlConfigurationAttributesReader();
        this.buttonSaveConfigs = this.htmlConfigurationAttributesReader.getHtmlControlButtonSaveConfigurations();
    }


    // DO NOT DELETE: Set inscription Saved for button Save
    setInscriptionSavedForButtonSave()
    {
        let buttonSaveDomElement = this.converterConfigirationsToDomElement.getDomElementFromConfigurations(this.buttonSaveConfigs.buttonSaveAttributes);
        let inscriptionSaved = this.getInscriptionWhenSavedDatastructure();
        this.buttonHelper.updateButtonInscription(buttonSaveDomElement, inscriptionSaved);
    }


    // DO NOT DELETE: Set inscription Save for button Save
    setInscriptionSaveForButtonSave(urlToSubmitForm)
    {
        if (urlToSubmitForm && (urlToSubmitForm.includes("Add") || urlToSubmitForm.includes("Delete")))
        {
            let buttonSaveDomElement = this.converterConfigirationsToDomElement.getDomElementFromConfigurations(this.buttonSaveConfigs.buttonSaveAttributes);
            let saveInscription = this.getInscriptionWhenNotSavedDatastructure();
            this.buttonHelper.updateButtonInscription(buttonSaveDomElement, saveInscription);
        }
    }


    getInscriptionWhenSavedDatastructure()
    {
        return this.buttonSaveConfigs.buttonSaveAttributes.textWhenSavedDatastructure; // "Saved"
    }


    getInscriptionWhenNotSavedDatastructure()
    {
        return this.buttonSaveConfigs.buttonSaveAttributes.textWhenNotSavedDatastructure; // "Save"
    }
}