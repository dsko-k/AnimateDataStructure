import { HtmlPageDomUpdater } from '../HtmlDomElementHandler/HtmlPageDomUpdater.js';

export class ContextFormValidation
{
    constructor(typeOfFormValidation)
    {
        this.typeOfFormValidation = typeOfFormValidation;
        this.htmlPageDomUpdater = new HtmlPageDomUpdater();
    }


    checkFormValidity(formDomElements)
    {
        return this.typeOfFormValidation.isValidFormFields(formDomElements);
    }


    getAntiForgeryToken(idForm)
    {
        if (!idForm || idForm === '')
        {
            throw new Error("Incorrect form id");
        }

        let formDomElement = this.htmlPageDomUpdater.getDomElementOnPageById(idForm);

        if (!formDomElement)
        {
            throw new Error("Incorrect form element");
        }

        return formDomElement.querySelector('input[name="__RequestVerificationToken"]').value;
    }

}