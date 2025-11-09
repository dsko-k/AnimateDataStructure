import { RedBlackTree } from '../DatastructuresModels/RedBlackTree.js';
import { AbstractOperationFormValidation } from './AbstractOperationFormValidation.js';
import { InputValuesFormFieldsHelper } from './InputValuesFormFieldsHelper.js';

export class SaveNodesFormValidation
{
    constructor()
    {
        this.abstractOperationFormValidation = new AbstractOperationFormValidation();
        this.inputValuesFormFieldsHelper = new InputValuesFormFieldsHelper();
    }


    isValidStringOfNodesToBeSaved(formDomElements, stringOfNodesToSave, controlHandler)
    {
        if (!controlHandler)
        {
            throw new Error("Unspecified control handler");
        }

        let errorInputValueDomElement = formDomElements.errorInputValueDomElement;
        let isDataStructureHaveNodes = this.abstractOperationFormValidation.validateDatastructureNonEmpty(controlHandler, errorInputValueDomElement);

        if (!isDataStructureHaveNodes)
        {
            return false;
        }

        
        let isRedBlackTree = controlHandler.tree.constructor.name === new RedBlackTree().constructor.name

        let isValidStringFormat = isRedBlackTree ? this.isValidRedBlackTreeNodesStringFormatToBeSaved(stringOfNodesToSave) :
                                                   this.isValidAbstractTreeNodesStringFormatToBeSaved(stringOfNodesToSave);

        if (!isValidStringFormat)
        {
            return false;
        }

        let nodeValues = this.abstractOperationFormValidation.extractNumbers(stringOfNodesToSave);

        let isUniqueNodeValues = this.abstractOperationFormValidation.checkUniquenessExistedNodes(nodeValues);

        return isValidStringFormat && isUniqueNodeValues;
    }


    isValidAbstractTreeNodesStringFormatToBeSaved(stringOfNodesToSave)
    {
        const regexCommaSeparatedListOfNumbers = /^$|^-?[0-9]+(\.[0-9]+)?(,-?[0-9]+(\.[0-9]+)?)*$/;

        return regexCommaSeparatedListOfNumbers.test(stringOfNodesToSave);
    }


    isValidRedBlackTreeNodesStringFormatToBeSaved(stringOfNodesToSave)
    {
        const regexCommaSeparatedListOfNumbersFlags = /^$|^-?[0-9]+(\.[0-9]+)?,(true|false)(,-?[0-9]+(\.[0-9]+)?,(true|false))*$/;

        let result = regexCommaSeparatedListOfNumbersFlags.test(stringOfNodesToSave);

        return result;
    }
}