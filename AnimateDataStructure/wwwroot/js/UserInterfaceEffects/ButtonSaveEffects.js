import { AbstractControlButtonEffects } from './AbstractControlButtonEffects.js';
import { ContextInputValuesFormFieldsHelper } from '../DataStructureFormInputValues/ContextInputValuesFormFieldsHelper.js';
import { InputValuesFormFieldsHelper } from '../DataStructureFormInputValues/InputValuesFormFieldsHelper.js';
import { InputValuesFormSender } from '../DataStructureFormInputValues/InputValuesFormSender.js';
import { AuthenticationChecker } from '../Authentication/AuthenticationChecker.js';
import { AfterAuthentication } from '../Authentication/AfterAuthentication.js';
import { HtmlConfigurationAttributesReader } from '../HtmlConfigurationAttributes/HtmlConfigurationAttributesReader.js';
import { ConverterConfigirationsToDomElement } from '../HtmlDomElementHandler/ConverterConfigirationsToDomElement.js';
import { ButtonHelper } from '../DomElementHelpers/ButtonHelper.js';

export class ButtonSaveEffects extends AbstractControlButtonEffects
{
	constructor()
	{
		super();
		this.buttonSaveConfigurations = this.htmlConfigurationAttributesReader.getHtmlControlButtonSaveConfigurations();
		this.converterConfigirationsToDomElement = new ConverterConfigirationsToDomElement();
		this.idButton = this.buttonSaveConfigurations.buttonSaveAttributes.defaultAttributes.id;
		this.inputValuesFormSender = new InputValuesFormSender();
		this.authenticationChecker = new AuthenticationChecker();
		this.afterAuthentication = new AfterAuthentication();
		this.htmlConfigurationAttributesReader = new HtmlConfigurationAttributesReader();
		this.buttonAuthenticateConfigs = this.htmlConfigurationAttributesReader.getHtmlControlButtonAuthenticateConfigurations();
		this.buttonHelper = new ButtonHelper();
	}


	onMouseDown()
	{
		let inputContainerDomElement = this.getInputContainerDomElement(); // call from Base class
		let additionalClassOnMouseDown = this.getAdditionalClassOnMouseDown(this.buttonSaveConfigurations.buttonSaveAttributes);
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
		if (!this.authenticationChecker.isUserAuthenticated())
		{
			let buttonAuthenticateDomElement = this.converterConfigirationsToDomElement.getDomElementFromConfigurations(this.buttonAuthenticateConfigs.buttonAuthenticateAttributes);
			this.buttonHelper.immitateClickOnButtonContainedRippleEffect(buttonAuthenticateDomElement);
			this.afterAuthentication.setIdButtonToBeClickedAfterAuthorization(buttonAuthenticateDomElement, this.idButton);
			return;
        }

		let inputValuesFormFieldsHelper = new InputValuesFormFieldsHelper();
		let contextInputValuesFormFieldsHelper = new ContextInputValuesFormFieldsHelper(inputValuesFormFieldsHelper);
		let formInputValuesDomElements = contextInputValuesFormFieldsHelper.obtainFormDomElements();
		let eventNameToFire = "submitSaveNodes";
		this.inputValuesFormSender.onClickButtonSubmitForm(formInputValuesDomElements, contextInputValuesFormFieldsHelper, eventNameToFire);
	}
}