import { HtmlPageDomUpdater } from '../HtmlDomElementHandler/HtmlPageDomUpdater.js';
import { HtmlConfigurationAttributesReader } from '../HtmlConfigurationAttributes/HtmlConfigurationAttributesReader.js';

export class ContextInputValuesFormFieldsHelper
{
    constructor(formFieldsHelper)
    {
        this.formFieldsHelper = formFieldsHelper;
        this.htmlPageDomUpdater = new HtmlPageDomUpdater();
        this.htmlConfigurationAttributesReader = new HtmlConfigurationAttributesReader();
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
        ulDomElement.remove();
    }


    // get form fields that contain ul tag with error list
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


    obtainFetchFormObject(inputValue, tempGuid, isUserAuthenticated, antiForgeryToken)
    {
        return this.formFieldsHelper.getFetchFormObject(inputValue, tempGuid, isUserAuthenticated, antiForgeryToken)
    }


    obtainFormMapErrorDomElements(formDomElements)
    {
        return this.formFieldsHelper.getFormMapErrorDomElements(formDomElements);
    }
}