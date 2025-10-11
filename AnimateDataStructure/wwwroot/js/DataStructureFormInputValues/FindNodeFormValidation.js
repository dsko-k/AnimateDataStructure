import { AbstractOperationFormValidation } from './AbstractOperationFormValidation.js';
import { InputValuesFormFieldsHelper } from './InputValuesFormFieldsHelper.js';


export class FindNodeFormValidation
{
    constructor()
    {
        this.abstractOperationFormValidation = new AbstractOperationFormValidation();
        this.inputValuesFormFieldsHelper = new InputValuesFormFieldsHelper();
    }


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

        let isValidInputNumber = this.abstractOperationFormValidation.validateInputNumber(inputValueDomElement, errorInputValueDomElement);
        let isInputNumberWithoutComma = this.abstractOperationFormValidation.validateInputNumberComma(inputValueDomElement, errorInputValueDomElement);
        let isInputNumberWithoutSpace = this.abstractOperationFormValidation.validateInputNumberSpace(inputValueDomElement, errorInputValueDomElement);
        let isInputNumberWithoutLetter = this.abstractOperationFormValidation.validateInputWithoutLetter(inputValueDomElement, errorInputValueDomElement);
        let isInputNumberNonEmpty = this.abstractOperationFormValidation.validateInputNumberNonEmptiness(inputValueDomElement, errorInputValueDomElement);
        
        // DO NOT DELETE: NO NEED checking input value on uniqueness
        return isValidInputNumber && isInputNumberWithoutComma && isInputNumberWithoutSpace && isInputNumberWithoutLetter &&
            isInputNumberNonEmpty;
    }
}