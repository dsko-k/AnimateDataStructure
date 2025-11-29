import { AbstractFormFieldsHelper } from './AbstractFormFieldsHelper.js';


export class SignUpFormFieldsHelper extends AbstractFormFieldsHelper
{
    constructor()
    {
        super();
        this.authConfigs = this.htmlConfigurationAttributesReader.getAuthenticationFormsDatastructuresConfigurations();        
        // Forms Container Configurations
        this.closeFormButtonConfig = this.authConfigs.divCloseFormButtonAttributes;
        this.wrapperConfig = this.authConfigs.divWrapperFormsAttributes;
        // SignUp Configurations
        this.formSignUpConfig = this.authConfigs.formSignUpAttributes;
        this.idForm = this.formSignUpConfig.defaultAttributes.id;
        this.usernameSignUpInputConfig = this.authConfigs.inputUserNameSignUpFormAttributes;
        this.emailSignUpInputConfig = this.authConfigs.inputEmailSignUpFormAttributes;
        this.passwordSignUpInputConfig = this.authConfigs.inputPasswordSignUpFormAttributes;
        this.confirmPasswordSignUpInputConfig = this.authConfigs.inputConfirmPasswordSignUpFormAttributes;
        this.agreeCheckboxSignUpConfig = this.authConfigs.inputRememberCheckboxSignUpFormAttributes;
        this.usernameSignUpErrorConfig = this.authConfigs.spanErrorUserNameSignUpFormAttributes;
        this.emailSignUpErrorConfig = this.authConfigs.spanErrorEmailSignUpFormAttributes;
        this.passwordSignUpErrorConfig = this.authConfigs.spanErrorPasswordSignUpFormAttributes;
        this.confirmPasswordSignUpErrorConfig = this.authConfigs.spanErrorConfirmPasswordSignUpFormAttributes;
        this.buttonSubmitFormConfig = this.authConfigs.buttonSubmitSignUpFormAttributes;
        this.loginLinkConfig = this.authConfigs.aLoginLinkFromSignUpFormAttributes;
        this.registerLinkConfig = this.authConfigs.aLinkRegisterAttributes;
        // Login Fields
        this.registerLink = this.htmlPageDomUpdater.getDomElementOnPageById(this.registerLinkConfig.defaultAttributes.id);
    }


    getFormId()
    {
        return this.idForm;
    }
        

    getFormDomElements()
    {
        return {            
            formSignUp: this.htmlPageDomUpdater.getDomElementOnPageById(this.formSignUpConfig.defaultAttributes.id),
            usernameSignUpInput: this.htmlPageDomUpdater.getDomElementOnPageById(this.usernameSignUpInputConfig.defaultAttributes.id),
            emailSignUpInput: this.htmlPageDomUpdater.getDomElementOnPageById(this.emailSignUpInputConfig.defaultAttributes.id),
            passwordSignUpInput: this.htmlPageDomUpdater.getDomElementOnPageById(this.passwordSignUpInputConfig.defaultAttributes.id),
            confirmPasswordSignUpInput: this.htmlPageDomUpdater.getDomElementOnPageById(this.confirmPasswordSignUpInputConfig.defaultAttributes.id),
            agreeCheckboxSignUp: this.htmlPageDomUpdater.getDomElementOnPageById(this.agreeCheckboxSignUpConfig.defaultAttributes.id),
            usernameSignUpError: this.htmlPageDomUpdater.getDomElementOnPageById(this.usernameSignUpErrorConfig.defaultAttributes.id),
            emailSignUpError: this.htmlPageDomUpdater.getDomElementOnPageById(this.emailSignUpErrorConfig.defaultAttributes.id),
            passwordSignUpError: this.htmlPageDomUpdater.getDomElementOnPageById(this.passwordSignUpErrorConfig.defaultAttributes.id),
            confirmPasswordSignUpError: this.htmlPageDomUpdater.getDomElementOnPageById(this.confirmPasswordSignUpErrorConfig.defaultAttributes.id),
            buttonSubmitForm: this.htmlPageDomUpdater.getDomElementOnPageById(this.buttonSubmitFormConfig.defaultAttributes.id),
            loginLinkFromSignUpForm: this.htmlPageDomUpdater.getDomElementOnPageById(this.loginLinkConfig.defaultAttributes.id),
        };
    }


    getMappedFormFields(signUpFormDomElements)
    {
        const formData = {
            UserName: signUpFormDomElements.usernameSignUpInput.value.trim(),
            Email: signUpFormDomElements.emailSignUpInput.value.trim(),
            Password: signUpFormDomElements.passwordSignUpInput.value.trim(),
            ConfirmPassword: signUpFormDomElements.confirmPasswordSignUpInput.value.trim(),
            AgreeToTerms: signUpFormDomElements.agreeCheckboxSignUp.checked,
        };

        return formData;
    }


    getFormMapErrorDomElements(signUpFormDomElements)
    {
        const errorElementMap = {
            UserName: signUpFormDomElements.usernameSignUpError,
            Email: signUpFormDomElements.emailSignUpError,
            Password: signUpFormDomElements.passwordSignUpError,
            ConfirmPassword: signUpFormDomElements.confirmPasswordSignUpError,
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


    resetFormFields(signUpFormDomElements)
    {
        this.throwIfEmptyFormDomElements(signUpFormDomElements);
        signUpFormDomElements.usernameSignUpInput.value = '';
        signUpFormDomElements.emailSignUpInput.value = '';
        signUpFormDomElements.passwordSignUpInput.value = '';
        signUpFormDomElements.confirmPasswordSignUpInput.value = '';
        signUpFormDomElements.agreeCheckboxSignUp.checked = false;
    }
}