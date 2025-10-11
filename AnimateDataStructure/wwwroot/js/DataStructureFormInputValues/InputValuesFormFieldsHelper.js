import { HtmlConfigurationAttributesReader } from '../HtmlConfigurationAttributes/HtmlConfigurationAttributesReader.js';
import { HtmlPageDomUpdater } from '../HtmlDomElementHandler/HtmlPageDomUpdater.js';


export class InputValuesFormFieldsHelper
{
    constructor()
    {
        this.htmlPageDomUpdater = new HtmlPageDomUpdater();
        this.htmlConfigurationAttributesReader = new HtmlConfigurationAttributesReader();
        this.formConfigs = this.htmlConfigurationAttributesReader.getHtmlFormInputValuesDataStructureConfigurations();
        this.inputNodeValueConfigs = this.htmlConfigurationAttributesReader.getHtmlInputNodeConfigurations();
        this.spanErrorInputConfigs = this.htmlConfigurationAttributesReader.getFormInputValuesDataStructureSpanErrorConfigurations();

        this.buttonAddNodeConfigs = this.htmlConfigurationAttributesReader.getHtmlControlButtonAddNodeConfigurations();
        this.buttonFindNodeConfigs = this.htmlConfigurationAttributesReader.getHtmlControlButtonFindNodeConfigurations();
        this.buttonDeleteNodeConfigs = this.htmlConfigurationAttributesReader.getHtmlControlButtonDeleteNodeConfigurations();
        this.buttonTraverseMenuConfigs = this.htmlConfigurationAttributesReader.getHtmlControlButtonTraverseMenuConfigurations();
        this.listOfTraverseMenuConfigs = this.htmlConfigurationAttributesReader.getHtmlControlListOfTraverseMenuConfigurations();
        this.buttonTraverseInorderConfigs = this.htmlConfigurationAttributesReader.getHtmlControlButtonTraverseInorderConfigurations();
        this.buttonTraversePreorderConfigs = this.htmlConfigurationAttributesReader.getHtmlControlButtonTraversePreorderConfigurations();
        this.buttonTraversePostorderConfigs = this.htmlConfigurationAttributesReader.getHtmlControlButtonTraversePostorderConfigurations();
        this.buttonSaveConfigs = this.htmlConfigurationAttributesReader.getHtmlControlButtonSaveConfigurations();
        this.buttonAuthenticateConfigs = this.htmlConfigurationAttributesReader.getHtmlControlButtonAuthenticateConfigurations();
        this.buttonAddRangeOfNodesConfigs = this.htmlConfigurationAttributesReader.getHtmlControlButtonAddRangeOfNodesConfigurations();
    }


    getFormId()
    {
        return this.formConfigs.formInputValuesDataStructureAttributes.defaultAttributes.id;
    }


    getFormDomElements()
    {
        return {
            formDomElement: this.htmlPageDomUpdater.getDomElementOnPageById(this.formConfigs.formInputValuesDataStructureAttributes.defaultAttributes.id),
            divInputContainerDomElement: this.htmlPageDomUpdater.getDomElementOnPageById(this.inputNodeValueConfigs.divInputContainerAttributes.defaultAttributes.id),
            divInputEffectSubContainerDomElement: this.htmlPageDomUpdater.getDomElementOnPageById(this.inputNodeValueConfigs.divInputEffectSubContainerAttributes.defaultAttributes.id),
            inputForNodeValueDomElement: this.htmlPageDomUpdater.getDomElementOnPageById(this.inputNodeValueConfigs.inputAttributes.defaultAttributes.id),
            labelInputValuesDomElement: this.htmlPageDomUpdater.getDomElementOnPageById(this.inputNodeValueConfigs.labelInputValuesDataStructureAttributes.defaultAttributes.id),
            divInputProgressBarDomElement: this.htmlPageDomUpdater.getDomElementOnPageById(this.inputNodeValueConfigs.divInputProgressBarAttributes.defaultAttributes.id),

            errorInputValueDomElement: this.htmlPageDomUpdater.getDomElementOnPageById(this.spanErrorInputConfigs.spanErrorMessageDataStructureInputValueAttributes.defaultAttributes.id),
            buttonAddNodeDomElement: this.htmlPageDomUpdater.getDomElementOnPageById(this.buttonAddNodeConfigs.buttonAddNodeAttributes.defaultAttributes.id),
            buttonFindNodeDomElement: this.htmlPageDomUpdater.getDomElementOnPageById(this.buttonFindNodeConfigs.buttonFindNodeAttributes.defaultAttributes.id),
            buttonDeleteNodeDomElement: this.htmlPageDomUpdater.getDomElementOnPageById(this.buttonDeleteNodeConfigs.buttonDeleteNodeAttributes.defaultAttributes.id),
            listOfTraverseMenuConfigsDomElement: this.htmlPageDomUpdater.getDomElementOnPageById(this.listOfTraverseMenuConfigs.listOfTraverseMenuAttributes.defaultAttributes.id),
            buttonTraverseMenuDomElement: this.htmlPageDomUpdater.getDomElementOnPageById(this.buttonTraverseMenuConfigs.buttonTraverseMenuAttributes.defaultAttributes.id),
            buttonTraverseInorderDomElement: this.htmlPageDomUpdater.getDomElementOnPageById(this.buttonTraverseInorderConfigs.buttonTraverseInorderAttributes.defaultAttributes.id),
            buttonTraversePreorderDomElement: this.htmlPageDomUpdater.getDomElementOnPageById(this.buttonTraversePreorderConfigs.buttonTraversePreorderAttributes.defaultAttributes.id),
            buttonTraversePostorderDomElement: this.htmlPageDomUpdater.getDomElementOnPageById(this.buttonTraversePostorderConfigs.buttonTraversePostorderAttributes.defaultAttributes.id),
            buttonSaveDomElement: this.htmlPageDomUpdater.getDomElementOnPageById(this.buttonSaveConfigs.buttonSaveAttributes.defaultAttributes.id),
            buttonAuthenticateDomElement: this.htmlPageDomUpdater.getDomElementOnPageById(this.buttonAuthenticateConfigs.buttonAuthenticateAttributes.defaultAttributes.id),
            inputUserAuthenticationDomElement: this.htmlPageDomUpdater.getDomElementOnPageById(this.buttonAuthenticateConfigs.inputUserAuthenticationStatusAttributes.defaultAttributes.id),
            buttonAddRangeDomElement: this.htmlPageDomUpdater.getDomElementOnPageById(this.buttonAddRangeOfNodesConfigs.buttonAddRangeAttributes.defaultAttributes.id),
        };
    }


    getMappedFormFields(formDomElements)
    {
        const formData = {
            InputValue: formDomElements.inputForNodeValueDomElement.value,
            TempGuid: formDomElements.formDomElement.dataset.tempGuid,
            IsAuthenticated: formDomElements.inputUserAuthenticationDomElement.value,
        };

        return formData;
    }


    getFormMapErrorDomElements(formDomElements)
    {
        const errorElementMap = {
            InputValue: formDomElements.errorInputValueDomElement,
        };

        return errorElementMap;
    }


    getFetchFormObject(inputValue, tempGuid, isUserAuthenticated, antiForgeryToken)
    {
        const formData = new FormData();

        formData.append('InputValue', inputValue);
        formData.append('TempGuid', tempGuid);
        formData.append('IsAuthenticated', isUserAuthenticated);
        formData.append('__RequestVerificationToken', antiForgeryToken);

        return formData;
    }


    showError(errorDomElement, messages)
    {
        if (errorDomElement)
        {
            const errorMessages = Array.isArray(messages) ? messages : [messages]; // Ensure messages is an array, even if a single string is passed

            let ulErrorListStyleName = this.getUlErrorListAttributes().defaultAttributes.class;
           
            let ulDomElements = this.htmlPageDomUpdater.getChildrenDomElementsByParentIdAndChildrenTag(errorDomElement.id, "ul");

            if (ulDomElements.length > 1)
            {
                throw new Error("Multiple ul tags inside dom error tag are not allowed");
            }            

            let ulToAppendLiTags = ulDomElements.length === 0 ? this.createUlTag(ulErrorListStyleName) : ulDomElements[0];
            
            // rework this method, it should only append li to ul
            this.appendErrorMessagesToLiTags(errorMessages, ulToAppendLiTags);

            // DO NOT DELETE: ul should be the first child. It is necessary for css visibility in style with ~ of the button that closes error list
            // Do not use appendChild(...) here
            errorDomElement.prepend(ulToAppendLiTags); 
        }
    }

    
    getUlErrorListAttributes()
    {
        let errorInputValuesConfigs = this.htmlConfigurationAttributesReader.getFormInputValuesDataStructureSpanErrorConfigurations();
        let ulErrorListSpanFormAttributes = errorInputValuesConfigs.ulErrorListErrorMessageDataStructureInputValueAttributes;

        return ulErrorListSpanFormAttributes;
    }
    

    createUlTag(ulTagClassNameWithoutDot)
    {
        const ul = document.createElement('ul');
        ul.classList.add(ulTagClassNameWithoutDot);

        return ul;
    }


    appendErrorMessagesToLiTags(errorMessages, ulToAppendLiTags)
    {
        if (!errorMessages)
        {
            throw new Error("Unable to append error message");
        }

        if (!ulToAppendLiTags)
        {
            throw new Error("Tag does not exist");
        }

        errorMessages.forEach(message =>
        {
            const li = document.createElement('li');
            li.textContent = message;
            ulToAppendLiTags.appendChild(li);
        });

        return ulToAppendLiTags;
    }


    throwIfInputEmpty(inputDomElement, objectErrorRelatedToInput)
    {
        if (!inputDomElement)
        {
            throw new Error("Input field DOM-element is an empty");
        }

        if (!objectErrorRelatedToInput)
        {
            throw new Error("Object error related to input is an empty");
        }
    }


    throwIfEmptyFormDomElements(formDomElements)
    {
        if (!formDomElements)
        {
            throw new Error("Form dom elements are empty");
        }
    }


    throwIfEmptyId(id)
    {
        if (!id || id === '')
        {
            throw new Error("Id is an empty");
        }
    }


    throwIfNotArray(valuesOfNodesInDataStructure)
    {
        if (!Array.isArray(valuesOfNodesInDataStructure))
        {
            throw new Error("Values should be in array");
        }
    }

}