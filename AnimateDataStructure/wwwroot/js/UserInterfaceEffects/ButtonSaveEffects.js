import { AbstractControlButtonEffects } from './AbstractControlButtonEffects.js';
import { ContextInputValuesFormFieldsHelper } from '../DataStructureFormInputValues/ContextInputValuesFormFieldsHelper.js';
import { InputValuesFormFieldsHelper } from '../DataStructureFormInputValues/InputValuesFormFieldsHelper.js';
import { InputValuesFormSender } from '../DataStructureFormInputValues/InputValuesFormSender.js';
import { EventDispatcher } from '../CustomEventHandler/EventDispatcher.js';

export class ButtonSaveEffects extends AbstractControlButtonEffects
{
	constructor()
	{
		super();
		this.buttonSaveConfigurations = this.htmlConfigurationAttributesReader.getHtmlControlButtonSaveConfigurations();
		this.idButton = this.buttonSaveConfigurations.buttonSaveAttributes.defaultAttributes.id;
		this.inputValuesFormSender = new InputValuesFormSender();
	}


	onMouseDown()
	{
		//let additionalClassOnMouseDown = this.getAdditionalClassOnMouseDown(this.buttonSaveConfigurations.buttonSaveAttributes);
		//this.onAbstractMouseDown(this.idButton, additionalClassOnMouseDown, this);

		let inputContainerDomElement = this.getInputContainerDomElement(); // DO NOT DELETE: from Base class
		let additionalClassOnMouseDown = this.getAdditionalClassOnMouseDown(this.buttonSaveConfigurations.buttonSaveAttributes);
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
	//	this.onAbstractClick(this.idButton, this, null); // method onAfterRippleEffectEnded should be implemented here instead null
	//}


	onMouseClick()
	{
		let methodAfterRippleEffectEnded = (evn) => this.onAfterRippleEffectEnded();

		this.onAbstractClick(this.idButton, this, methodAfterRippleEffectEnded); // method onAfterRippleEffectEnded should be implemented here instead null
	}


	onAfterRippleEffectEnded(evn)
	{
		if (!this.isUserAuthenticated())
		{
			let buttonAuthenticateDomElement = this.getButtonAuthenticateDomElement();

			this.immitateClickOnButtonAuthenticate(buttonAuthenticateDomElement);

			return;
        }

		// fire event about Submit inputValuesForm

		let inputValuesFormFieldsHelper = new InputValuesFormFieldsHelper();
		let contextInputValuesFormFieldsHelper = new ContextInputValuesFormFieldsHelper(inputValuesFormFieldsHelper);

		let formInputValuesDomElements = contextInputValuesFormFieldsHelper.obtainFormDomElements();

		let eventNameToFire = "submitSaveNodes";

		this.inputValuesFormSender.onClickButtonSubmitForm(formInputValuesDomElements, contextInputValuesFormFieldsHelper, eventNameToFire);
	}


	// ???
	// Run authoentication after click on the button Save (if user was not authenticated)

	isUserAuthenticated()
	{
		let inputUserAuthenticationStatusDomElement = this.getInputUserAuthenticationStatusDomElement();

		return inputUserAuthenticationStatusDomElement && inputUserAuthenticationStatusDomElement.value === `${true}`;
	}


	getInputUserAuthenticationStatusDomElement()
	{
		let buttonAuthenticateConfigurations = this.htmlConfigurationAttributesReader.getHtmlControlButtonAuthenticateConfigurations();

		let inputUserAuthenticationStatusAttributes = buttonAuthenticateConfigurations.inputUserAuthenticationStatusAttributes;

		let idInputUserAuthenticationStatus = inputUserAuthenticationStatusAttributes.defaultAttributes.id;

		const inputUserAuthenticationStatus = this.htmlPageDomUpdater.getDomElementOnPageById(idInputUserAuthenticationStatus);

		return inputUserAuthenticationStatus;
	}


	getButtonAuthenticateDomElement()
	{
		let buttonAuthenticateConfigurations = this.htmlConfigurationAttributesReader.getHtmlControlButtonAuthenticateConfigurations();
		let idButtonAuthenticate = buttonAuthenticateConfigurations.buttonAuthenticateAttributes.defaultAttributes.id;

		return this.htmlPageDomUpdater.getDomElementOnPageById(idButtonAuthenticate);
	}


	immitateClickOnButtonAuthenticate(buttonAuthenticateDomElement)
	{
		let eventDispatcher = new EventDispatcher();
		// DO NOT DELETE:
		// dispatch MouseEvent about to trigger ending ripple effect event on the button Authenticate (not simply "click")
		eventDispatcher.dispatchMouseEvent(buttonAuthenticateDomElement, "mousedown");
		eventDispatcher.dispatchMouseEvent(buttonAuthenticateDomElement, "click");
		eventDispatcher.dispatchMouseEvent(buttonAuthenticateDomElement, "mouseup");
	}

	
}