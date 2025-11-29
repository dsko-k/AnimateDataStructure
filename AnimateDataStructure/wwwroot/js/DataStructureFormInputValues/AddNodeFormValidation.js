import { AbstractOperationFormValidation } from './AbstractOperationFormValidation.js';
import { InputValuesFormFieldsHelper } from './InputValuesFormFieldsHelper.js';

export class AddNodeFormValidation
{
    constructor()
    {
        this.abstractOperationFormValidation = new AbstractOperationFormValidation();
        this.inputValuesFormFieldsHelper = new InputValuesFormFieldsHelper();
    }


    isValidFormFields(inputValuesFormDomElements, controlHandler)
    {
        return this.abstractOperationFormValidation.isValidFormFields(inputValuesFormDomElements, controlHandler);
    }
}