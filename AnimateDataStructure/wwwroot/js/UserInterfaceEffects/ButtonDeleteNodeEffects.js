import { AbstractControlButtonEffects } from './AbstractControlButtonEffects.js';
import { ContextInputValuesFormFieldsHelper } from '../DataStructureFormInputValues/ContextInputValuesFormFieldsHelper.js';
import { InputValuesFormFieldsHelper } from '../DataStructureFormInputValues/InputValuesFormFieldsHelper.js';
import { InputValuesFormSender } from '../DataStructureFormInputValues/InputValuesFormSender.js';

export class ButtonDeleteNodeEffects extends AbstractControlButtonEffects
{
	constructor()
	{
		super();
		this.buttonDeleteNodeConfigurations = this.htmlConfigurationAttributesReader.getHtmlControlButtonDeleteNodeConfigurations();
		this.idButton = this.buttonDeleteNodeConfigurations.buttonDeleteNodeAttributes.defaultAttributes.id;
		this.inputValuesFormSender = new InputValuesFormSender();
	}


	onMouseDown()
	{
		//let additionalClassOnMouseDown = this.getAdditionalClassOnMouseDown(this.buttonDeleteNodeConfigurations.buttonDeleteNodeAttributes);
		//this.onAbstractMouseDown(this.idButton, additionalClassOnMouseDown, this);

		let inputContainerDomElement = this.getInputContainerDomElement(); // DO NOT DELETE: from Base class
		let additionalClassOnMouseDown = this.getAdditionalClassOnMouseDown(this.buttonDeleteNodeConfigurations.buttonDeleteNodeAttributes);
		this.onAbstractMouseDown(this.idButton, inputContainerDomElement, additionalClassOnMouseDown, this);
	}


	onMouseUp()
	{
		//this.onAbstractMouseUp(this.idButton, this);
		let inputContainerDomElement = this.getInputContainerDomElement(); // DO NOT DELETE: from Base class
		this.onAbstractMouseUp(this.idButton, inputContainerDomElement, this);
	}


	//onMouseClick()
	//{
	//	this.onAbstractClick(this.idButton, this, null);
	//}



	onMouseClick()
	{
		let methodAfterRippleEffectEnded = (evn) => this.onAfterRippleEffectEnded();

		this.onAbstractClick(this.idButton, this, methodAfterRippleEffectEnded); // method onAfterRippleEffectEnded should be implemented here instead null
	}


	onAfterRippleEffectEnded(evn)
	{
		// fire event about Submit inputValuesForm

		let inputValuesFormFieldsHelper = new InputValuesFormFieldsHelper();
		let contextInputValuesFormFieldsHelper = new ContextInputValuesFormFieldsHelper(inputValuesFormFieldsHelper);

		let formInputValuesDomElements = contextInputValuesFormFieldsHelper.obtainFormDomElements();

		let eventNameToFire = "submitDeleteNode";

		this.inputValuesFormSender.onClickButtonSubmitForm(formInputValuesDomElements, contextInputValuesFormFieldsHelper, eventNameToFire);
	}
}