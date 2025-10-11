import { HtmlPageDomUpdater } from '../HtmlDomElementHandler/HtmlPageDomUpdater.js';
import { HtmlConfigurationAttributesReader } from '../HtmlConfigurationAttributes/HtmlConfigurationAttributesReader.js';
import { EventDispatcher } from '../CustomEventHandler/EventDispatcher.js';


export class InputValuesFormSender
{
    constructor()
    {
        this.htmlPageDomUpdater = new HtmlPageDomUpdater();
        this.htmlConfigurationAttributesReader = new HtmlConfigurationAttributesReader();
        this.eventDispatcher = new EventDispatcher();
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
            this.toggleFormProgressBarStyle();

            await this.submitFormData(formDomElements, urlToSubmitForm, contextFormFieldsHelper, contextFormValidation, callbackAnimation);
        }
    }


    //Submits input value and auxiliary information as form data to the server
    async submitFormData(formDomElements, urlToSubmitForm, contextFormFieldsHelper, contextFormValidation, callbackAnimation)
    {
        try
        {
            let inputValue = formDomElements.inputForNodeValueDomElement.value;
            const formData = await this.getFormData(formDomElements, contextFormValidation, contextFormFieldsHelper, inputValue, urlToSubmitForm);

            const response = await fetch(urlToSubmitForm, {
                method: 'POST',
                headers: {},
                body: formData
            });

            if (response.ok)
            {
                this.toggleFormProgressBarStyle();

                if (callbackAnimation)
                {
                    callbackAnimation();
                }
            }
            else
            {
                this.toggleFormProgressBarStyle();

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
        // DO NOT DELETE
        // errorData is the direct JSON response containing field errors from BadRequest(ModelState)
        // It will be an object like: { "FieldName": ["Error1", "Error2"], "": ["General Error"] }
        if (typeof errorData === 'object' && errorData !== null)
        {
            for (const [key, messages] of Object.entries(errorData))
            {
                const errorElement = errorElementMap[key];
                if (errorElement)
                {
                    // Pass the array of messages to displayError
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


    toggleFormProgressBarStyle()
    {
        let formProgressBarDomElement = this.getFormProgressBarDomElement();

        let inputNodeConfigs = this.htmlConfigurationAttributesReader.getHtmlInputNodeConfigurations();

        let styleNameToShowProgressBar = inputNodeConfigs.divInputProgressBarAttributes.additionalStyleToShowProgressBar.class;

        formProgressBarDomElement.classList.toggle(styleNameToShowProgressBar);
    }


    getFormProgressBarDomElement()
    {
        let inputNodeConfigs = this.htmlConfigurationAttributesReader.getHtmlInputNodeConfigurations();

        let idProgressBar = inputNodeConfigs.divInputProgressBarAttributes.defaultAttributes.id;

        let progressBarDomElement = this.htmlPageDomUpdater.getDomElementOnPageById(idProgressBar);

        return progressBarDomElement;
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
            this.toggleFormProgressBarStyle();

            await this.submitFormSaveCurrentTree(formDomElements, urlToSubmitForm, contextFormFieldsHelper, contextFormValidation, nodesAsString);
        }
    }


    async submitFormSaveCurrentTree(formDomElements, urlToSubmitForm, contextFormFieldsHelper, contextFormValidation, dataStructureNodesAsString)
    {
        try
        {
            // DO NOT DELETE: dataStructureNodesAsString is string representation of current datastructure as it is seen in UI at the moment of save

            const formData = await this.getFormData(formDomElements, contextFormValidation, contextFormFieldsHelper, dataStructureNodesAsString, urlToSubmitForm);

            const response = await fetch(urlToSubmitForm, {
                method: 'POST',
                headers: {},
                body: formData
            });


            if (response.ok)
            {
                this.toggleFormProgressBarStyle();
            }
            else
            {
                this.toggleFormProgressBarStyle();

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


    async getFormData(formDomElements, contextFormValidation, contextFormFieldsHelper, inputValue, urlToSubmitForm)
    {
        let tempGuid = formDomElements.formDomElement.dataset.tempGuid;
        let isUserAuthenticated = contextFormValidation.isUserAuthenticated();
        const freshAntiForgeryToken = await this.getFreshAntiForgeryToken(urlToSubmitForm);

        // DO NOT DELETE: dataStructureNodesAsString is string representation of current datastructure as it is seen in UI at the moment of save
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

            const data = await response.json();

            // The server should return the new token in a JSON object: { "token": "..." }
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
            // Re-throw the error so the calling function can handle it
            throw error;
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