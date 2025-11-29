import { AbstractOperationFormValidation } from './AbstractOperationFormValidation.js';
import { InputValuesFormFieldsHelper } from './InputValuesFormFieldsHelper.js';

export class TraverseNodesFormValidation
{
    constructor()
    {
        this.abstractOperationFormValidation = new AbstractOperationFormValidation();
        this.inputValuesFormFieldsHelper = new InputValuesFormFieldsHelper();
    }


    // The name should be the same for classes about OperationFormValidation (OperationFormValidation is related with control button)
    isValidFormFields(inputValuesFormDomElements, controlHandler)
    {
        this.inputValuesFormFieldsHelper.throwIfEmptyFormDomElements(inputValuesFormDomElements);
        let inputValueDomElement = inputValuesFormDomElements.inputForNodeValueDomElement;
        let errorInputValueDomElement = inputValuesFormDomElements.errorInputValueDomElement;
        let isDataStructureHaveNodes = this.abstractOperationFormValidation.validateDatastructureNonEmpty(controlHandler, errorInputValueDomElement);

        if (!isDataStructureHaveNodes)
        {
            return false;
        }
        if (inputValueDomElement.value === "") // Empty string in input field is acceptable
        {
            return true;
        }

        let isInputNumberWithoutComma = this.abstractOperationFormValidation.validateInputNumberComma(inputValueDomElement, errorInputValueDomElement);
        let isInputNumberWithoutSpace = this.abstractOperationFormValidation.validateInputNumberSpace(inputValueDomElement, errorInputValueDomElement);
        let isInputNumberWithoutLetter = this.abstractOperationFormValidation.validateInputWithoutLetter(inputValueDomElement, errorInputValueDomElement);
                
        return isInputNumberWithoutComma && isInputNumberWithoutSpace && isInputNumberWithoutLetter; // NO NEED checking input value on uniqueness
    }
}