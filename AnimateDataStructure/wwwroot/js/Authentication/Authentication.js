import { HtmlPageDomUpdater } from '../HtmlDomElementHandler/HtmlPageDomUpdater.js';
import { HtmlConfigurationAttributesReader } from '../HtmlConfigurationAttributes/HtmlConfigurationAttributesReader.js';
import { ContextFormValidation } from './ContextFormValidation.js';
import { SignUpFormValidation } from './SignUpFormValidation.js';
import { LogInFormValidation } from './LogInFormValidation.js';
import { ContextFormFieldsHelper } from './ContextFormFieldsHelper.js';
import { SignUpFormFieldsHelper } from './SignUpFormFieldsHelper.js';
import { LogInFormFieldsHelper } from './LogInFormFieldsHelper.js';
import { ContextControlEffects } from '../UserInterfaceEffects/ContextControlEffects.js';
import { ButtonSignUpFormEffects } from '../UserInterfaceEffects/ButtonSignUpFormEffects.js';
import { ButtonLogInFormEffects } from '../UserInterfaceEffects/ButtonLogInFormEffects.js';
import { EventDispatcher } from '../CustomEventHandler/EventDispatcher.js';
import { AfterAuthentication } from '../Authentication/AfterAuthentication.js';
import { ConverterConfigirationsToDomElement } from '../HtmlDomElementHandler/ConverterConfigirationsToDomElement.js';
import { AuthenticationFormsProgressBarHelper } from '../DomElementHelpers/AuthenticationFormsProgressBarHelper.js';

export class Authentication
{
    constructor()
    {
        this.htmlPageDomUpdater = new HtmlPageDomUpdater();
        this.htmlConfigurationAttributesReader = new HtmlConfigurationAttributesReader();
        this.buttonAuthenticateConfigurations = this.htmlConfigurationAttributesReader.getHtmlControlButtonAuthenticateConfigurations();
        this.signUpFormFieldsHelper = new SignUpFormFieldsHelper();
        this.contextFormFieldsHelperSignUp = new ContextFormFieldsHelper(this.signUpFormFieldsHelper);
        this.logInFormFieldsHelper = new LogInFormFieldsHelper();        
        this.contextFormFieldsHelperLogIn = new ContextFormFieldsHelper(this.logInFormFieldsHelper);
        this.eventDispatcher = new EventDispatcher();
        this.afterAuthentication = new AfterAuthentication();
        this.converterConfigirationsToDomElement = new ConverterConfigirationsToDomElement();
        this.authenticationFormsProgressBarHelper = new AuthenticationFormsProgressBarHelper();
    }


    addAuthenticationHandlers()
    {
        this.onClickLinkToggleForms();
        this.onClickButtonCloseForm();

        this.onSubmitSignUpForm();
        this.onSubmitLogInForm();

        this.addSubmitSignUpFormButtonEffects();
        this.addSubmitLogInFormButtonEffects();
    }


    onClickLinkToggleForms()
    {
        let loginLinkFromSignUpForm = this.contextFormFieldsHelperSignUp.obtainFormDomElements().loginLinkFromSignUpForm;
        this.handlerClickFormLink(loginLinkFromSignUpForm, this.contextFormFieldsHelperSignUp);

        let registerLinkFromLoginForm = this.contextFormFieldsHelperLogIn.obtainFormDomElements().registerLinkFromLoginForm;
        this.handlerClickFormLink(registerLinkFromLoginForm, this.contextFormFieldsHelperLogIn);
    }

    // Handler on click by link below form to switch on other form
    handlerClickFormLink(linkDomElement, contextFormFieldsHelper)
    {
        if (!linkDomElement)
        {
            throw new Error("Link dom element is an empty");
        }

        linkDomElement.addEventListener("click", function (evn)
        {
            let formContainerDomElements = contextFormFieldsHelper.obtainFormContainerDomElements();
            let wrapper = formContainerDomElements.wrapper;
            wrapper.classList.toggle('active');

        }.bind(this));
    }


    onClickButtonCloseForm()
    {
        let formContainerDomElements = this.contextFormFieldsHelperSignUp.obtainFormContainerDomElements();
        let closeFormButton = formContainerDomElements.closeFormButton;
        let wrapper = formContainerDomElements.wrapper;

        closeFormButton.addEventListener("click", function (evn)
        {
            evn.stopPropagation();
            wrapper.remove();

        }.bind(this));
    }


    addSubmitSignUpFormButtonEffects()
    {
        let contextControlEffects = new ContextControlEffects(new ButtonSignUpFormEffects());
        contextControlEffects.addEffectsToControlButton();
    }


    addSubmitLogInFormButtonEffects()
    {
        let contextControlEffects = new ContextControlEffects(new ButtonLogInFormEffects());
        contextControlEffects.addEffectsToControlButton();
    }

    // Handler after ripple effectEnded after click on button Sign Up or Log In
    onClickButtonSubmitForm(formDomElements, idForm, contextFormFieldsHelper)
    {
        if (!contextFormFieldsHelper)
        {
            throw Error("Unspecified context");
        }
        this.updateSubmitButtonActivity(contextFormFieldsHelper, true);
        let errorFieldsWithErrorList = contextFormFieldsHelper.getFormFieldsWithErrorList(formDomElements);

        if (errorFieldsWithErrorList.length === 0)
        {
            this.eventDispatcher.dispatchEventSubmitForm(idForm, "submit");
            return;
        }
        contextFormFieldsHelper.clearAllErrorsInForm(formDomElements);
    }


    onSubmitSignUpForm()
    {
        let contextFormFieldsHelper = new ContextFormFieldsHelper(new SignUpFormFieldsHelper());
        let contextFormValidation = new ContextFormValidation(new SignUpFormValidation());
        this.onSubmitForm(contextFormFieldsHelper, contextFormValidation, '/Authentication/Register');
    }


    onSubmitLogInForm()
    {
        let contextFormFieldsHelper = new ContextFormFieldsHelper(new LogInFormFieldsHelper());
        let contextFormValidation = new ContextFormValidation(new LogInFormValidation());
        this.onSubmitForm(contextFormFieldsHelper, contextFormValidation, '/Authentication/Login');
    }


    onSubmitForm(contextFormFieldsHelper, contextFormValidation, relativeUrlToSubmitForm)
    {
        let idFormSignUp = contextFormFieldsHelper.findFormId();
        let form = this.htmlPageDomUpdater.getDomElementOnPageById(idFormSignUp);

        form.addEventListener("submit", async function (submitEvent)
        {
            await this.handlerFormSubmit(submitEvent, relativeUrlToSubmitForm, contextFormFieldsHelper, contextFormValidation);

        }.bind(this));
    }


    async loadAuthenticationForm(domElementToPasteAuthenticationForm)
    {
        if (!domElementToPasteAuthenticationForm)
        {
            throw new Error("Tag to paste authentication form is not specified");
        }
        try
        {
            const response = await fetch('/Authentication/Authenticate');
            if (response.ok)
            {
                const html = await response.text();
                domElementToPasteAuthenticationForm.innerHTML = html;
                // Dynamically import the login modal module AFTER the HTML is loaded
                const { initFormsModal } = await import('/js/mainAuthentication.js');
                initFormsModal(); // Call the initialization function from the module
            }
            else
            {
                domElementToPasteAuthenticationForm.innerHTML = '<p>Error loading login form</p>';
            }
        }
        catch (error)
        {
            this.wrapper.innerHTML = '<p>An unexpected error occurred while loading the login form.</p>';            
        }       
    }


    async handlerFormSubmit(submitEvent, urlToSubmitForm, contextFormFieldsHelper, contextFormValidation)
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
        submitEvent.preventDefault();

        if (contextFormValidation.checkFormValidity(formDomElements))
        {
            this.authenticationFormsProgressBarHelper.toggleFormProgressBarStyle();
            await this.submitFormData(formDomElements, urlToSubmitForm, contextFormFieldsHelper, contextFormValidation);
        }
        else
        {
            this.updateSubmitButtonActivity(contextFormFieldsHelper, false); // Enables button related to Submit form
        }
    }


    async submitFormData(formDomElements, urlToSubmitForm, contextFormFieldsHelper, contextFormValidation)
    {
        const formData = contextFormFieldsHelper.obtainMappedFormFields(formDomElements);
        try
        {
            let idForm = contextFormFieldsHelper.findFormId();
            const antiForgeryToken = contextFormValidation.getAntiForgeryToken(idForm);
            const response = await fetch(urlToSubmitForm, {
                                                                    method: 'POST',
                                                                    headers: {
                                                                        'Content-Type': 'application/json',
                                                                        'RequestVerificationToken': antiForgeryToken
                                                                    },
                                                                    body: JSON.stringify(formData)
                                                                });
            if (response.ok)
            {
                contextFormFieldsHelper.resetFields(formDomElements);
                this.updateSubmitButtonActivity(contextFormFieldsHelper, false); // enables button related to Submit form
                this.authenticationFormsProgressBarHelper.toggleFormProgressBarStyle();
                this.closeFormContainer(contextFormFieldsHelper);
                let buttonAuthenticateDomElement = this.converterConfigirationsToDomElement.getDomElementFromConfigurations(this.buttonAuthenticateConfigurations.buttonAuthenticateAttributes);
                this.eventDispatcher.dispatchCustomEvent(buttonAuthenticateDomElement, "userLoggedIn", {});
            }
            else
            {
                this.updateSubmitButtonActivity(contextFormFieldsHelper, false); // enables button related to Submit form
                this.authenticationFormsProgressBarHelper.toggleFormProgressBarStyle();
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
        // Map form field names to their corresponding error display elements
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
        else if (errorData.message) // Fallback for simple error messages
        {
            alert(errorData.message);
        }
        else // Catch all for unexpected error formats
        {
            alert('An unknown error occurred during registration');
        }
    }


    // disables or enables button related to Submit form
    updateSubmitButtonActivity(contextFormFieldsHelper, isButtonDisabled)
    {
        let buttonSubmitForm = contextFormFieldsHelper.obtainFormDomElements().buttonSubmitForm;
        buttonSubmitForm.disabled = isButtonDisabled;
    }


    closeFormContainer(contextFormFieldsHelper)
    {
        let closeFormButton = contextFormFieldsHelper.obtainFormContainerDomElements().closeFormButton;
        closeFormButton.click();
    }
}