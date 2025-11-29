import { AbstractFormFieldsHelper } from './AbstractFormFieldsHelper.js';

export class AbstractFormValidation
{
    constructor()
    {
        this.abstractFormFieldsHelper = new AbstractFormFieldsHelper();
    }


    validateUsername(usernameInputDomElement, usernameError)
    {
        this.abstractFormFieldsHelper.throwIfInputEmpty(usernameInputDomElement, usernameError);

        const username = usernameInputDomElement.value.trim();
        
        if (username.length >= 50)
        {
            this.abstractFormFieldsHelper.showError(usernameError, 'Username is longer than 50 characters');
            return false;
        }

        return true;
    }


    validateEmail(emailInputDomElement, emailError)
    {
        this.abstractFormFieldsHelper.throwIfInputEmpty(emailInputDomElement, emailError);

        const emailText = emailInputDomElement.value.trim();

        if (!this.isValidEmail(emailText))
        {
            this.abstractFormFieldsHelper.showError(emailError, 'Invalid email format');
            return false;
        }

        return true;
    }


    // Validate email format
    isValidEmail(emailText)
    {
        // ^                       - Start of the string
        // (?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)* - User part (local-part)
        //   [a-z0-9!#$%&'*+/=?^_`{|}~-]+  - One or more valid characters
        //   (?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)* - Optional groups of dot followed by more valid characters
        // )
        // @                       - The "@" symbol
        // (?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+  - Domain part (first part of domain)
        //   [a-z0-9](?:[a-z0-9-]*[a-z0-9])?  - One or more valid characters, optionally followed by hyphens and more characters
        // )
        // \.                      - A literal dot
        // (?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?){1,63} - Top-level domain (TLD) - 1 to 63 characters
        // $                       - End of the string
        const emailRegex = new RegExp(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );

        return emailRegex.test(emailText);
    }


    validatePassword(passwordInputDomElement, passwordError)
    {
        this.abstractFormFieldsHelper.throwIfInputEmpty(passwordInputDomElement, passwordError);
        const password = passwordInputDomElement.value.trim();

        if (password === '')
        {
            this.abstractFormFieldsHelper.showError(passwordError, 'Password is required');
            return false;
        }
        else if (password.length < 8)
        {
            this.abstractFormFieldsHelper.showError(passwordError, 'Password must be at least 8 characters long');
            return false;
        }

        return true;
    }


    validateConfirmPassword(passwordSignUpInput, confirmPasswordSignUpInput, confirmPasswordSignUpError)
    {
        const confirmPassword = confirmPasswordSignUpInput.value.trim();
        const password = passwordSignUpInput.value.trim();

        if (confirmPassword === '')
        {
            this.abstractFormFieldsHelper.showError(confirmPasswordSignUpError, 'Confirm Password is required');
            return false;
        }
        else if (confirmPassword !== password)
        {
            this.abstractFormFieldsHelper.showError(confirmPasswordSignUpError, 'Passwords do not match');
            return false;
        }

        return true;
    }
}