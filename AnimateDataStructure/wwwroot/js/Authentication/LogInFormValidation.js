import { AbstractFormValidation } from './AbstractFormValidation.js';


export class LogInFormValidation extends AbstractFormValidation
{
    constructor()
    {
        super();
    }


    isValidFormFields(logInFormDomElements)
    {
        this.abstractFormFieldsHelper.throwIfEmptyFormDomElements(logInFormDomElements);
        let isValidEmailIfSpecified = this.validateEmail(logInFormDomElements.emailLogInInput, logInFormDomElements.emailLogInError);
        let isValidPassword = this.validatePassword(logInFormDomElements.passwordLogInInput, logInFormDomElements.passwordLogInError);

        return isValidEmailIfSpecified && isValidPassword;
    }
}