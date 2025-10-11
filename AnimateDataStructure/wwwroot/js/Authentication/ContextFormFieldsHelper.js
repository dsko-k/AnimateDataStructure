import { HtmlPageDomUpdater } from '../HtmlDomElementHandler/HtmlPageDomUpdater.js';
import { EventDispatcher } from '../CustomEventHandler/EventDispatcher.js';

export class ContextFormFieldsHelper
{
    constructor(formFieldsHelper)
    {
        this.formFieldsHelper = formFieldsHelper;
        this.htmlPageDomUpdater = new HtmlPageDomUpdater();
        this.eventDispatcher = new EventDispatcher();
    }

    // Clear all errors based on element map
    clearAllErrorsInForm(formDomElements)
    {
        //const errorElementMap = {
        //    UserName: signUpFormDomElements.usernameSignUpError,
        //    Email: signUpFormDomElements.emailSignUpError,
        //    Password: signUpFormDomElements.passwordSignUpError,
        //    ConfirmPassword: signUpFormDomElements.confirmPasswordSignUpError,
        //    // Add any other error spans here, e.g., general errors
        //    //General: signUpFormDomElements.generalSignUpError // If you have a general error span
        //};

        const errorElementMap = this.obtainFormMapErrorDomElements(formDomElements);

        for (const key in errorElementMap)
        {
            this.clearErrorInFormField(errorElementMap[key]);
        }
    }

    
    clearErrorInFormField(errorDomElement)
    {
        // if errorDomElement contains ul tag,
        let idErrorDomElement = errorDomElement.id;
        let ulDomElementArray = this.htmlPageDomUpdater.getChildrenDomElementsByParentIdAndChildrenTag(idErrorDomElement, "ul");

        if (ulDomElementArray.length === 0)
        {
            return;
        }

        // then add to ul tag style ulErrorHide via toggle
        let ulDomElement = ulDomElementArray[0];
        //ulDomElement.classList.add("ulErrorHide");

        // after end transition of errorDomElement (i.e. shrinking height) remove ul tag
        errorDomElement.addEventListener('transitionend', function (evn)
        {
            if (evn.propertyName !== 'max-height')
            {
                return;
            }

            ulDomElement.remove();

            // Check is any error list present in Sign Up form

            let formDomElements = this.obtainFormDomElements();

            let errorFieldsWithErrorList = this.getFormFieldsWithErrorList(formDomElements);

            if (errorFieldsWithErrorList.length === 0)
            {
                let idForm = this.formFieldsHelper.idForm;

                this.eventDispatcher.dispatchEventSubmitForm(idForm, "submit");
            }

        }.bind(this),

            { once: true });

        ulDomElement.classList.add("ulErrorHide");

        // after all ul tags of all errorDomElement then submit form
    }


    // get Sign Up form fields that contain ul tag with error list
    getFormFieldsWithErrorList(formDomElements)
    {
        const errorElementMap = this.obtainFormMapErrorDomElements(formDomElements);

        let errorDomElements = Object.values(errorElementMap);

        let errorDomElementsWithUlTag = [];

        errorDomElements.forEach(errorDomElement =>
        {
            let idErrorDomElement = errorDomElement.id;

            let ulDomElementArray = this.htmlPageDomUpdater.getChildrenDomElementsByParentIdAndChildrenTag(idErrorDomElement, "ul");

            if (ulDomElementArray.length > 0)
            {
                errorDomElementsWithUlTag.push(errorDomElement); // add parent (errorDomElement) if it has child ul
            }
        });

        return errorDomElementsWithUlTag;
    }


    findFormId()
    {
        return this.formFieldsHelper.getFormId();
    }


    displayError(errorDomElement, messages)
    {
        this.formFieldsHelper.showError(errorDomElement, messages);
    }


    obtainFormDomElements()
    {
        return this.formFieldsHelper.getFormDomElements();
    }

    
    obtainMappedFormFields(formDomElements)
    {
        return this.formFieldsHelper.getMappedFormFields(formDomElements);
    }


    obtainFormMapErrorDomElements(formDomElements)
    {
        return this.formFieldsHelper.getFormMapErrorDomElements(formDomElements);
    }


    obtainFormContainerDomElements()
    {
        return this.formFieldsHelper.getFormContainerDomElements();
    }


    resetFields(formDomElements)
    {
        this.formFieldsHelper.resetFormFields(formDomElements);
    }



}