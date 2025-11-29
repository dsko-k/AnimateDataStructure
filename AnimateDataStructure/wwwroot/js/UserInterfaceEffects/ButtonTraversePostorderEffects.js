import { AbstractControlButtonEffects } from './AbstractControlButtonEffects.js';
import { ContextInputValuesFormFieldsHelper } from '../DataStructureFormInputValues/ContextInputValuesFormFieldsHelper.js';
import { InputValuesFormFieldsHelper } from '../DataStructureFormInputValues/InputValuesFormFieldsHelper.js';
import { InputValuesFormSender } from '../DataStructureFormInputValues/InputValuesFormSender.js';

export class ButtonTraversePostorderEffects extends AbstractControlButtonEffects
{
	constructor()
	{
		super();
		this.buttonTraversePostorderConfigurations = this.htmlConfigurationAttributesReader.getHtmlControlButtonTraversePostorderConfigurations();
		this.idButton = this.buttonTraversePostorderConfigurations.buttonTraversePostorderAttributes.defaultAttributes.id;
		this.inputValuesFormSender = new InputValuesFormSender();
	}


	onMouseDown()
	{
		let inputContainerDomElement = this.getInputContainerDomElement();
		let additionalClassOnMouseDown = this.getAdditionalClassOnMouseDown(this.buttonTraversePostorderConfigurations.buttonTraversePostorderAttributes);
		this.onAbstractMouseDown(this.idButton, inputContainerDomElement, additionalClassOnMouseDown, this);
	}


	onMouseUp()
	{
		let inputContainerDomElement = this.getInputContainerDomElement();
		this.onAbstractMouseUp(this.idButton, inputContainerDomElement, this);
	}


	onMouseClick()
	{
		let methodAfterRippleEffectEnded = (evn) => this.onAfterRippleEffectEnded(evn);
		this.onAbstractClick(this.idButton, this, methodAfterRippleEffectEnded);
	}


	onAfterRippleEffectEnded(evn)
	{
		this.toggleContainerOfTraverseTypes();
		this.setTextOfTypeTraversalInsideButtonTraverseMenu(evn);		
		let inputValuesFormFieldsHelper = new InputValuesFormFieldsHelper();
		let contextInputValuesFormFieldsHelper = new ContextInputValuesFormFieldsHelper(inputValuesFormFieldsHelper);
		let formInputValuesDomElements = contextInputValuesFormFieldsHelper.obtainFormDomElements();
		let eventNameToFire = "submitTraversePostorder";
		this.inputValuesFormSender.onClickButtonSubmitForm(formInputValuesDomElements, contextInputValuesFormFieldsHelper, eventNameToFire);
	}

	// For Buttons of traverse type

	// close list of traverse types
	toggleContainerOfTraverseTypes()
	{		
		let listOfTraverseMenuConfigurations = this.htmlConfigurationAttributesReader.getHtmlControlListOfTraverseMenuConfigurations();
		let idlistOfTraverseMenu = listOfTraverseMenuConfigurations.listOfTraverseMenuAttributes.defaultAttributes.id;
		let listOfTraverseMenuDomElement = this.getDomElement(idlistOfTraverseMenu);
		let additionalClassForListOfTraverseMenu = this.getAdditionalClassOnMouseDown(listOfTraverseMenuConfigurations.listOfTraverseMenuAttributes);
		listOfTraverseMenuDomElement.classList.toggle(additionalClassForListOfTraverseMenu);
	}


	setTextOfTypeTraversalInsideButtonTraverseMenu(evn)
	{
		let buttonTraverseMenuConfigurations = this.htmlConfigurationAttributesReader.getHtmlControlButtonTraverseMenuConfigurations();
		let idButtonTraverseMenu = buttonTraverseMenuConfigurations.buttonTraverseMenuAttributes.defaultAttributes.id;
		let buttonTraverseMenuDomElement = this.getDomElement(idButtonTraverseMenu);
		buttonTraverseMenuDomElement.textContent = evn.target.textContent;
	}
}