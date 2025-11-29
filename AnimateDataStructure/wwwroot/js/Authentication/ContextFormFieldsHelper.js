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
        const errorElementMap = this.obtainFormMapErrorDomElements(formDomElements);
        for (const key in errorElementMap)
        {
            this.clearErrorInFormField(errorElementMap[key]);
        }
    }

    
    clearErrorInFormField(errorDomElement)
    {
        let idErrorDomElement = errorDomElement.id;
        let ulDomElementArray = this.htmlPageDomUpdater.getChildrenDomElementsByParentIdAndChildrenTag(idErrorDomElement, "ul");

        if (ulDomElementArray.length === 0)
        {
            return;
        }

        let ulDomElement = ulDomElementArray[0];

        errorDomElement.addEventListener('transitionend', function (evn)
        {
            if (evn.propertyName !== 'max-height')
            {
                return;
            }

            ulDomElement.remove();
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