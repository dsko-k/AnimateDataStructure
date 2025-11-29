import { AbstractControlButtonEffects } from './AbstractControlButtonEffects.js';
import { ContextInputValuesFormFieldsHelper } from '../DataStructureFormInputValues/ContextInputValuesFormFieldsHelper.js';
import { InputValuesFormFieldsHelper } from '../DataStructureFormInputValues/InputValuesFormFieldsHelper.js';
import { InputValuesFormSender } from '../DataStructureFormInputValues/InputValuesFormSender.js';

export class ButtonAddNodeEffects extends AbstractControlButtonEffects
{
    constructor()
    {
        super();
        this.buttonAddNodeConfigurations = this.htmlConfigurationAttributesReader.getHtmlControlButtonAddNodeConfigurations();
        this.idButton = this.buttonAddNodeConfigurations.buttonAddNodeAttributes.defaultAttributes.id;
        this.inputValuesFormSender = new InputValuesFormSender();
    }


    onMouseDown()
    {
        let inputContainerDomElement = this.getInputContainerDomElement(); // from Base class
        let additionalClassOnMouseDown = this.getAdditionalClassOnMouseDown(this.buttonAddNodeConfigurations.buttonAddNodeAttributes);
        this.onAbstractMouseDown(this.idButton, inputContainerDomElement, additionalClassOnMouseDown, this);
    }


    onMouseUp()
    {
        let inputContainerDomElement = this.getInputContainerDomElement();
        this.onAbstractMouseUp(this.idButton, inputContainerDomElement, this);
    }


    onMouseClick()
    {
        let methodAfterRippleEffectEnded = (evn) => this.onAfterRippleEffectEnded();
        this.onAbstractClick(this.idButton, this, methodAfterRippleEffectEnded);
    }


    onAfterRippleEffectEnded(evn)
    {
        let inputValuesFormFieldsHelper = new InputValuesFormFieldsHelper();
        let contextInputValuesFormFieldsHelper = new ContextInputValuesFormFieldsHelper(inputValuesFormFieldsHelper);

        let formInputValuesDomElements = contextInputValuesFormFieldsHelper.obtainFormDomElements();
        let eventNameToFire = "submitAddNode"; // fire event about Submit inputValuesForm
        this.inputValuesFormSender.onClickButtonSubmitForm(formInputValuesDomElements, contextInputValuesFormFieldsHelper, eventNameToFire);
    }
}