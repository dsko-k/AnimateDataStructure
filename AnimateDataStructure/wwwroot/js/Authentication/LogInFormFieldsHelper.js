import { AbstractFormFieldsHelper } from './AbstractFormFieldsHelper.js';

export class LogInFormFieldsHelper extends AbstractFormFieldsHelper
{
    constructor()
    {
        super();
        this.authConfigs = this.htmlConfigurationAttributesReader.getAuthenticationFormsDatastructuresConfigurations();        
        // Forms Container Configurations
        this.closeFormButtonConfig = this.authConfigs.divCloseFormButtonAttributes;
        this.wrapperConfig = this.authConfigs.divWrapperFormsAttributes;
        // Login Configurations
        this.formLogInConfig = this.authConfigs.formLoginAttributes;
        this.idForm = this.formLogInConfig.defaultAttributes.id;
        this.emailLogInInputConfig = this.authConfigs.inputEmailLoginFormAttributes;
        this.passwordLogInInputConfig = this.authConfigs.inputPasswordLoginFormAttributes;
        this.rememberMeCheckboxLogInConfig = this.authConfigs.inputRememberCheckboxLoginFormAttributes;
        this.emailLogInErrorConfig = this.authConfigs.spanErrorEmailLoginFormAttributes;
        this.passwordLogInErrorConfig = this.authConfigs.spanErrorPasswordLoginFormAttributes;
        this.buttonSubmitFormConfig = this.authConfigs.buttonSubmitLogInFormAttributes;
        this.loginLinkConfig = this.authConfigs.aLoginLinkFromSignUpFormAttributes;
        this.registerLinkConfig = this.authConfigs.aLinkRegisterAttributes;
        this.registerLink = this.htmlPageDomUpdater.getDomElementOnPageById(this.registerLinkConfig.defaultAttributes.id);
    }


    getFormId()
    {
        return this.idForm;
    }


    getFormDomElements()
    {
        return {
            formLogIn: this.htmlPageDomUpdater.getDomElementOnPageById(this.formLogInConfig.defaultAttributes.id),            
            emailLogInInput: this.htmlPageDomUpdater.getDomElementOnPageById(this.emailLogInInputConfig.defaultAttributes.id),
            passwordLogInInput: this.htmlPageDomUpdater.getDomElementOnPageById(this.passwordLogInInputConfig.defaultAttributes.id),
            rememberMeCheckboxLogIn: this.htmlPageDomUpdater.getDomElementOnPageById(this.rememberMeCheckboxLogInConfig.defaultAttributes.id),                        
            emailLogInError: this.htmlPageDomUpdater.getDomElementOnPageById(this.emailLogInErrorConfig.defaultAttributes.id),
            passwordLogInError: this.htmlPageDomUpdater.getDomElementOnPageById(this.passwordLogInErrorConfig.defaultAttributes.id),            
            buttonSubmitForm: this.htmlPageDomUpdater.getDomElementOnPageById(this.buttonSubmitFormConfig.defaultAttributes.id),
            registerLinkFromLoginForm: this.htmlPageDomUpdater.getDomElementOnPageById(this.registerLinkConfig.defaultAttributes.id),
        };
    }


    getMappedFormFields(logInFormDomElements)
    {
        const formData = {
            Email: logInFormDomElements.emailLogInInput.value.trim(),
            Password: logInFormDomElements.passwordLogInInput.value.trim(),
            RememberMe: logInFormDomElements.rememberMeCheckboxLogIn.checked,
        };

        return formData;
    }


    getFormMapErrorDomElements(logInFormDomElements)
    {
        const errorElementMap = {
            Email: logInFormDomElements.emailLogInError,
            Password: logInFormDomElements.passwordLogInError,
        };

        return errorElementMap;
    }


    // Get forms Containers DOM elements (parents for Login Form and SignUp Form)
    getFormContainerDomElements()
    {
        let idCloseFormButton = this.closeFormButtonConfig.defaultAttributes.id;
        let idWrapper = this.wrapperConfig.defaultAttributes.id;
        return super.getFormContainerDomElements(idCloseFormButton, idWrapper);
    }


    resetFormFields(logInFormDomElements)
    {
        this.throwIfEmptyFormDomElements(logInFormDomElements);
        logInFormDomElements.emailLogInInput.value = '';
        logInFormDomElements.passwordLogInInput.value = '';
        logInFormDomElements.rememberMeCheckboxLogIn.checked = false;
    }
}