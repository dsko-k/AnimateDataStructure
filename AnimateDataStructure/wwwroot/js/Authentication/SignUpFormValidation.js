import { HtmlConfigurationAttributesReader } from '../HtmlConfigurationAttributes/HtmlConfigurationAttributesReader.js';
import { HtmlPageDomUpdater } from '../HtmlDomElementHandler/HtmlPageDomUpdater.js';
import { SignUpFormFieldsHelper } from './SignUpFormFieldsHelper.js'
//import { AbstractFormFieldsHelper } from './AbstractFormFieldsHelper.js'
import { AbstractFormValidation } from './AbstractFormValidation.js'


export class SignUpFormValidation extends AbstractFormValidation
{
    constructor()
    {
        super();
    }


    isValidFormFields(signUpFormDomElements)
    {
        this.abstractFormFieldsHelper.throwIfEmptyFormDomElements(signUpFormDomElements);

        let isValidUsername = this.validateUsername(signUpFormDomElements.usernameSignUpInput, signUpFormDomElements.usernameSignUpError);
        let isValidEmailIfSpecified = this.validateEmail(signUpFormDomElements.emailSignUpInput, signUpFormDomElements.emailSignUpError);
        let isValidPassword = this.validatePassword(signUpFormDomElements.passwordSignUpInput, signUpFormDomElements.passwordSignUpError);
        let isValidPasswordConfirmation = this.validateConfirmPassword(signUpFormDomElements.passwordSignUpInput, signUpFormDomElements.confirmPasswordSignUpInput, signUpFormDomElements.confirmPasswordSignUpError);

        return isValidUsername && isValidEmailIfSpecified && isValidPassword && isValidPasswordConfirmation;
    }
}