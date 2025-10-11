import { HtmlConfigurationAttributesReader } from '../HtmlConfigurationAttributes/HtmlConfigurationAttributesReader.js';
import { HtmlPageDomUpdater } from '../HtmlDomElementHandler/HtmlPageDomUpdater.js';


export class AbstractFormFieldsHelper
{
    constructor()
    {
        this.htmlPageDomUpdater = new HtmlPageDomUpdater();
        this.htmlConfigurationAttributesReader = new HtmlConfigurationAttributesReader();
    }


    getFormContainerDomElements(idCloseFormButton, idWrapper)
    {
        this.throwIfEmptyId(idCloseFormButton);
        this.throwIfEmptyId(idWrapper);

        return {
            closeFormButton: this.htmlPageDomUpdater.getDomElementOnPageById(idCloseFormButton),
            wrapper: this.htmlPageDomUpdater.getDomElementOnPageById(idWrapper),
        };
    }


    showError(errorDomElement, messages)
    {
        if (errorDomElement)
        {
            const errorMessages = Array.isArray(messages) ? messages : [messages]; // Ensure messages is an array, even if a single string is passed

            let ulErrorListStyleName = this.getUlErrorListAttributes().defaultAttributes.class;
            let ul = this.appendErrorMessagesToLiTags(errorMessages, ulErrorListStyleName);

            errorDomElement.innerHTML = ''; // Clear previous content
            errorDomElement.appendChild(ul); // Add the new list
        }
    }


    getUlErrorListAttributes()
    {
        let authenticationFormsConfigs = this.htmlConfigurationAttributesReader.getAuthenticationFormsDatastructuresConfigurations();
        let ulErrorListSpanFormAttributes = authenticationFormsConfigs.ulErrorListSpanFormAttributes;

        return ulErrorListSpanFormAttributes;
    }


    createUlTag(ulTagClassNameWithoutDot)
    {
        const ul = document.createElement('ul');
        ul.classList.add(ulTagClassNameWithoutDot);

        return ul;
    }


    appendErrorMessagesToLiTags(errorMessages, ulTagClassNameWithoutDot)
    {
        if (!errorMessages)
        {
            throw new Error("Unable to append error message");
        }

        let ulToAppendLiTags = this.createUlTag(ulTagClassNameWithoutDot);

        errorMessages.forEach(message =>
        {
            const li = document.createElement('li');
            li.textContent = message;
            ulToAppendLiTags.appendChild(li);
        });

        return ulToAppendLiTags;
    }


    throwIfInputEmpty(inputDomElement, objectErrorRelatedToInput)
    {
        if (!inputDomElement)
        {
            throw new Error("Input field DOM-element is an empty");
        }

        if (!objectErrorRelatedToInput)
        {
            throw new Error("Object error related to input is an empty");
        }
    }


    throwIfEmptyFormDomElements(formDomElements)
    {
        if (!formDomElements)
        {
            throw new Error("Form dom elements are empty");
        }
    }


    throwIfEmptyId(id)
    {
        if (!id || id === '')
        {
            throw new Error("Id is an empty");
        }
    }

}