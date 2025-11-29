import { HtmlPageDomUpdater } from '../HtmlDomElementHandler/HtmlPageDomUpdater.js';
import { HtmlConfigurationAttributesReader } from '../HtmlConfigurationAttributes/HtmlConfigurationAttributesReader.js';
import { EventDispatcher } from '../CustomEventHandler/EventDispatcher.js';
import { ButtonHelper } from '../DomElementHelpers/ButtonHelper.js';
import { ConverterConfigirationsToDomElement } from '../HtmlDomElementHandler/ConverterConfigirationsToDomElement.js';
import { ButtonSaveHelper } from '../DomElementHelpers/ButtonSaveHelper.js';
import { InputProgressBarHelper } from '../DomElementHelpers/InputProgressBarHelper.js';
import { AuthenticationChecker } from '../Authentication/AuthenticationChecker.js';

export class InputValuesFormSender
{
    constructor()
    {
        this.htmlPageDomUpdater = new HtmlPageDomUpdater();        
        this.eventDispatcher = new EventDispatcher();
        this.buttonHelper = new ButtonHelper();
        this.buttonSaveHelper = new ButtonSaveHelper();
        this.converterConfigirationsToDomElement = new ConverterConfigirationsToDomElement();
        this.inputProgressBarHelper = new InputProgressBarHelper();
        this.htmlConfigurationAttributesReader = new HtmlConfigurationAttributesReader();
        this.buttonSaveConfigs = this.htmlConfigurationAttributesReader.getHtmlControlButtonSaveConfigurations();
        this.authenticationChecker = new AuthenticationChecker();
    }


    // Handler after ripple effectEnded (after click on button)
    onClickButtonSubmitForm(formDomElements, contextFormFieldsHelper, eventNameToFire)
    {
        if (!contextFormFieldsHelper)
        {
            throw Error("Unspecified context");
        }

        let idForm = formDomElements.formDomElement.id;

        if (!idForm || idForm === '')
        {
            throw Error("Unspecified id form");
        }

        contextFormFieldsHelper.clearAllErrorsInForm(formDomElements);
        this.eventDispatcher.dispatchEventSubmitForm(idForm, eventNameToFire);
    }


    onSubmitFormInputNodeValue(contextFormFieldsHelper, contextFormValidation, relativeUrlToSubmitForm, callbackAnimation, eventNameToHandle, controlHandler)
    {
        let idFormSignUp = contextFormFieldsHelper.findFormId();
        let form = this.htmlPageDomUpdater.getDomElementOnPageById(idFormSignUp);

        form.addEventListener(eventNameToHandle, async function (submitEvent)
        {
            submitEvent.preventDefault();
            await this.handlerFormSubmitInputNodeValue(relativeUrlToSubmitForm, contextFormFieldsHelper, contextFormValidation, callbackAnimation, controlHandler);

        }.bind(this));

        this.preventReloadPageOnEnterKeyPressed(form);
    }


    // Prevents reload html-page if input is filled and then key Enter is pressed
    preventReloadPageOnEnterKeyPressed(formDomElement)
    {
        formDomElement.addEventListener('submit', async function (submitEvent)
        {
            submitEvent.preventDefault();

        }.bind(this));
    }


    async handlerFormSubmitInputNodeValue(urlToSubmitForm, contextFormFieldsHelper, contextFormValidation, callbackAnimation, controlHandler)
    {
        if (!contextFormValidation || !contextFormFieldsHelper)
        {
            throw new Error("Incorrect context");
        }
        if (!urlToSubmitForm || urlToSubmitForm === "")
        {
            throw new Error("Incorrect url");
        }

        let formDomElements = contextFormFieldsHelper.obtainFormDomElements();
                        
        if (contextFormValidation.checkFormValidity(formDomElements, controlHandler))
        {
            this.inputProgressBarHelper.toggleFormProgressBarStyle();
            await this.submitFormData(formDomElements, urlToSubmitForm, contextFormFieldsHelper, callbackAnimation);
        }
    }


    //Submits input value and auxiliary information as form data to the server
    async submitFormData(formDomElements, urlToSubmitForm, contextFormFieldsHelper, callbackAnimation)
    {
        try
        {
            let inputValue = formDomElements.inputForNodeValueDomElement.value;
            const formData = await this.getFormData(formDomElements, contextFormFieldsHelper, inputValue, urlToSubmitForm);
            const response = await fetch(urlToSubmitForm, {
                method: 'POST',
                headers: {},
                body: formData
            });

            if (response.ok)
            {
                this.inputProgressBarHelper.toggleFormProgressBarStyle();

                if (callbackAnimation)
                {
                    callbackAnimation();
                }

                this.buttonSaveHelper.setInscriptionSaveForButtonSave(urlToSubmitForm);
            }
            else
            {
                this.inputProgressBarHelper.toggleFormProgressBarStyle();
                const errorData = await response.json();
                this.handleResponseErrors(contextFormFieldsHelper, errorData);
            }
        }
        catch (error)
        {
            console.error('Error during registration:', error);
            alert('An error occurred. Please try again later');
        }
    }


    handleResponseErrors(contextFormFieldsHelper, errorData)
    {
        let formDomElements = contextFormFieldsHelper.obtainFormDomElements();
        const errorElementMap = contextFormFieldsHelper.obtainFormMapErrorDomElements(formDomElements);
        // errorData is the direct JSON response containing field errors from BadRequest(ModelState)
        // It will be an object like: { "FieldName": ["Error1", "Error2"], "": ["General Error"] }
        if (typeof errorData === 'object' && errorData !== null)
        {
            for (const [key, messages] of Object.entries(errorData))
            {
                const errorElement = errorElementMap[key];
                if (errorElement)
                {
                    contextFormFieldsHelper.displayError(errorElement, messages);
                }
                else
                {
                    console.warn(`No specific error element found for field "${key}". Errors: ${messages.join(', ')}`);
                }
            }
        }
        else if (errorData.message)
        {
            alert(errorData.message);
        }
        else
        {
            alert('An unknown error occurred during registration');
        }
    }


    getRelativeUrlToSubmitForm(buttonDomElement)
    {
        if (!buttonDomElement)
        {
            throw new Error("Incorrect button DOM-element");
        }

        let controller = buttonDomElement.dataset?.controller;
        let action = buttonDomElement.dataset?.action;

        if (!controller || controller === '' || !action || action === '')
        {
            throw new Error("Unspecified dom-attribute");
        }

        return `/${buttonDomElement.dataset.controller}/${buttonDomElement.dataset.action}`;
    }

        
    onSubmitFormSaveCurrentTree(contextFormFieldsHelper, contextFormValidation, relativeUrlToSubmitForm, controlHandler, eventNameToHandle)
    {
        let idFormSignUp = contextFormFieldsHelper.findFormId();
        let form = this.htmlPageDomUpdater.getDomElementOnPageById(idFormSignUp);

        form.addEventListener(eventNameToHandle, async function (submitEvent)
        {
            submitEvent.preventDefault();
            await this.handlerFormSubmitSaveCurrentTree(relativeUrlToSubmitForm, contextFormFieldsHelper, contextFormValidation, controlHandler);

        }.bind(this));
    }


    async handlerFormSubmitSaveCurrentTree(urlToSubmitForm, contextFormFieldsHelper, contextFormValidation, controlHandler)
    {
        if (!contextFormValidation || !contextFormFieldsHelper)
        {
            throw new Error("Incorrect context");
        }

        if (!urlToSubmitForm || urlToSubmitForm === "")
        {
            throw new Error("Incorrect url");
        }

        let formDomElements = contextFormFieldsHelper.obtainFormDomElements();
        let nodesAsString = controlHandler.tree.getDataStructureNodesAsString();

        if (contextFormValidation.checkValidityStringToSaveNodes(formDomElements, nodesAsString, controlHandler))
        {
            this.inputProgressBarHelper.toggleFormProgressBarStyle();
            await this.submitFormSaveCurrentTree(formDomElements, urlToSubmitForm, contextFormFieldsHelper, nodesAsString);
        }
    }


    async submitFormSaveCurrentTree(formDomElements, urlToSubmitForm, contextFormFieldsHelper, dataStructureNodesAsString)
    {
        try
        {
            // dataStructureNodesAsString is string representation of current datastructure as it is seen in UI at the moment of save
            const formData = await this.getFormData(formDomElements, contextFormFieldsHelper, dataStructureNodesAsString, urlToSubmitForm);
            const response = await fetch(urlToSubmitForm, {
                method: 'POST',
                headers: {},
                body: formData
            });

            if (response.ok)
            {
                this.inputProgressBarHelper.toggleFormProgressBarStyle();
                this.buttonSaveHelper.setInscriptionSavedForButtonSave();
            }
            else
            {
                this.inputProgressBarHelper.toggleFormProgressBarStyle();
                const errorData = await response.json();
                this.handleResponseErrors(contextFormFieldsHelper, errorData);
            }
        }
        catch (error)
        {
            console.error('Error during registration:', error);
            alert('An error occurred. Please try again later');
        }
    }


    async getFormData(formDomElements, contextFormFieldsHelper, inputValue, urlToSubmitForm)
    {
        let tempGuid = formDomElements.formDomElement.dataset.tempGuid;
        let isUserAuthenticated = this.authenticationChecker.isUserAuthenticated();
        const freshAntiForgeryToken = await this.getFreshAntiForgeryToken(urlToSubmitForm);
        
        return contextFormFieldsHelper.obtainFetchFormObject(inputValue, tempGuid, isUserAuthenticated, freshAntiForgeryToken);
    }


    async getFreshAntiForgeryToken(urlToSubmitForm)
    {
        try
        {
            let urlForAntiForgeryToken = this.createUrlToGetAntiForgeryToken(urlToSubmitForm, "GetAntiForgeryToken"); // '/controller/GetAntiForgeryToken'
            const response = await fetch(urlForAntiForgeryToken, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json'
                }
            });

            if (!response.ok)
            {
                throw new Error(`Server responded with status: ${response.status}`);
            }

            const data = await response.json();// The server should return the new token in a JSON object: { "token": "..." }            
            if (data && data.token)
            {
                return data.token;
            }
            else
            {
                throw new Error("Invalid response from server: Token not found.");
            }
        } 
        catch (error)
        {
            console.error('Failed to get a new anti-forgery token:', error);            
            throw error; // Re-throw the error so the calling function can handle it
        }
    }


    createUrlToGetAntiForgeryToken(urlToSubmitForm, antiForgeryActionMethodName)
    {
        const lastSlashIndex = urlToSubmitForm.lastIndexOf('/');

        if (lastSlashIndex === -1)
        {
            throw new Error("Unable to construct url for antiForgery action name");
        }

        let slashControllerNameSegment = urlToSubmitForm.substring(0, lastSlashIndex);

        return `${slashControllerNameSegment}/${antiForgeryActionMethodName}`;
    }
}