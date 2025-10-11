import { InputValuesFormFieldsHelper } from './InputValuesFormFieldsHelper.js';


export class AbstractOperationFormValidation
{
    constructor()
    {
        this.inputValuesFormFieldsHelper = new InputValuesFormFieldsHelper();
    }


    isValidFormFields(inputValuesFormDomElements, controlHandler)
    {
        this.inputValuesFormFieldsHelper.throwIfEmptyFormDomElements(inputValuesFormDomElements);

        let inputValueDomElement = inputValuesFormDomElements.inputForNodeValueDomElement;
        let errorInputValueDomElement = inputValuesFormDomElements.errorInputValueDomElement;

        let isValidInputNumber = this.validateInputNumber(inputValueDomElement, errorInputValueDomElement);
        let isInputNumberWithoutComma = this.validateInputNumberComma(inputValueDomElement, errorInputValueDomElement);
        let isInputNumberWithoutSpace = this.validateInputNumberSpace(inputValueDomElement, errorInputValueDomElement);
        let isInputNumberWithoutLetter = this.validateInputWithoutLetter(inputValueDomElement, errorInputValueDomElement);
        let isInputNumberNonEmpty = this.validateInputNumberNonEmptiness(inputValueDomElement, errorInputValueDomElement);

        let valuesOfNodesInDataStructure = this.getCurrentNodesInDataStructure(controlHandler);
        let isInputNumberUnique = this.validateUniquenessInputNumber(inputValueDomElement, errorInputValueDomElement, valuesOfNodesInDataStructure);

        return isValidInputNumber && isInputNumberWithoutComma && isInputNumberWithoutSpace && isInputNumberWithoutLetter &&
            isInputNumberNonEmpty && isInputNumberUnique;
    }


    validateInputNumber(inputValuesDomElement, errorInputValueDomElement)
    {
        this.inputValuesFormFieldsHelper.throwIfInputEmpty(inputValuesDomElement, errorInputValueDomElement);
        const inputValue = inputValuesDomElement.value;

        if (!this.isValidInputNumber(inputValue))
        {
            this.inputValuesFormFieldsHelper.showError(errorInputValueDomElement, 'The number is in the wrong format. Use an integer or float number');
            return false;
        }

        return true;
    }


    isValidInputNumber(inputValue)
    {
        //const regex = /^\d+(\.\d+)?$/;
        const regex = /^-?\d+(\.\d+)?$/; // accept one positive or negative integer or float number

        return regex.test(inputValue);
    }


    validateInputNumberComma(inputValuesDomElement, errorInputValueDomElement)
    {
        this.inputValuesFormFieldsHelper.throwIfInputEmpty(inputValuesDomElement, errorInputValueDomElement);
        const inputValue = inputValuesDomElement.value;

        if (!this.isInputNumberWithoutComma(inputValue))
        {
            this.inputValuesFormFieldsHelper.showError(errorInputValueDomElement, 'Use a dot . for the fractional part, if needed');
            return false;
        }

        return true;
    }


    isInputNumberWithoutComma(inputValue)
    {
        return !inputValue.includes(",");
    }

    
    validateInputNumberSpace(inputValuesDomElement, errorInputValueDomElement)
    {
        this.inputValuesFormFieldsHelper.throwIfInputEmpty(inputValuesDomElement, errorInputValueDomElement);
        const inputValue = inputValuesDomElement.value;

        if (!this.isInputNumberWithoutSpace(inputValue))
        {
            this.inputValuesFormFieldsHelper.showError(errorInputValueDomElement, 'Do not use spaces. Only one number is allowed in a field');
            return false;
        }

        return true;
    }


    isInputNumberWithoutSpace(inputValue)
    {
        return !inputValue.includes(" ");
    }


    validateInputWithoutLetter(inputValuesDomElement, errorInputValueDomElement)
    {
        this.inputValuesFormFieldsHelper.throwIfInputEmpty(inputValuesDomElement, errorInputValueDomElement);
        const inputValue = inputValuesDomElement.value;

        if (!this.isInputWithoutLetter(inputValue))
        {
            this.inputValuesFormFieldsHelper.showError(errorInputValueDomElement, 'Do not use letters for number field');
            return false;
        }

        return true;
    }


    isInputWithoutLetter(inputValue)
    {
        const regex = /[a-zA-Z]/;
        return !regex.test(inputValue);
    }


    validateInputNumberNonEmptiness(inputValuesDomElement, errorInputValueDomElement)
    {
        this.inputValuesFormFieldsHelper.throwIfInputEmpty(inputValuesDomElement, errorInputValueDomElement);
        const inputValue = inputValuesDomElement.value;

        if (!this.isInputNumberNonEmpty(inputValue))
        {
            this.inputValuesFormFieldsHelper.showError(errorInputValueDomElement, 'Number field is an empty');
            return false;
        }

        return true;
    }


    isInputNumberNonEmpty(inputValue)
    {
        return inputValue !== '';
    }


    validateUniquenessInputNumber(inputValuesDomElement, errorInputValueDomElement, valuesOfNodesInDataStructure)
    {
        this.inputValuesFormFieldsHelper.throwIfInputEmpty(inputValuesDomElement, errorInputValueDomElement);
        
        const inputValue = inputValuesDomElement.value;

        if (!this.isInputNumberUnique(inputValue, valuesOfNodesInDataStructure))
        {
            this.inputValuesFormFieldsHelper.showError(errorInputValueDomElement, `It is a duplicate number. Only unique number is allowed in the data structure`);
            return false;
        }

        return true;
    }


    isInputNumberUnique(inputValue, valuesOfNodesInDataStructure)
    {
        let newNodeValueWithExistedNodeValues = [inputValue, ...valuesOfNodesInDataStructure];

        return this.checkUniquenessExistedNodes(newNodeValueWithExistedNodeValues);
    }


    checkUniquenessExistedNodes(valuesOfNodesInDataStructure)
    {
        this.inputValuesFormFieldsHelper.throwIfNotArray(valuesOfNodesInDataStructure);

        if (valuesOfNodesInDataStructure.length === 0)
        {
            return true;
        }

        return new Set(valuesOfNodesInDataStructure).size === valuesOfNodesInDataStructure.length;
    }


    extractNumbers(stringOfNodesInDataStructure)
    {
        const numberRegex = /[0-9]+(?:\.[0-9]+)?/g; // universal for string with flags and without their
                
        const numbers = stringOfNodesInDataStructure.match(numberRegex);

        // Return an empty array if no matches are found, to avoid a null return
        return numbers || [];
    }


    validateDatastructureNonEmpty(controlHandler, errorInputValueDomElement)
    {
        if (this.isDataStructureEmpty(controlHandler))
        {
            this.inputValuesFormFieldsHelper.showError(errorInputValueDomElement, 'The data structure is empty. First, add some nodes');
            return false;
        }

        return true;
    }


    isDataStructureEmpty(controlHandler)
    {
        return this.getCurrentNodesInDataStructure(controlHandler).length === 0;
    }


    getCurrentNodesInDataStructure(controlHandler)
    {
        if (!controlHandler)
        {
            throw new Error($`Control handler is incorrect`);
        }

        let stringOfNodesInDataStructure = controlHandler.tree.getDataStructureNodesAsString();
        let valuesOfNodesInDataStructure = this.extractNumbers(stringOfNodesInDataStructure);

        return valuesOfNodesInDataStructure;
    }
}