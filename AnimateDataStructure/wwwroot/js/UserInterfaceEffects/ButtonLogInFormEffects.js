import { AbstractControlButtonEffects } from './AbstractControlButtonEffects.js';
import { Authentication } from '../Authentication/Authentication.js';
import { LogInFormFieldsHelper } from '../Authentication/LogInFormFieldsHelper.js';
import { ContextFormFieldsHelper } from '../Authentication/ContextFormFieldsHelper.js';

export class ButtonLogInFormEffects extends AbstractControlButtonEffects
{
	constructor()
	{
		super();
		this.buttonSubmitLogInFormConfigurations = this.htmlConfigurationAttributesReader.getAuthenticationFormsDatastructuresConfigurations();
		this.idButton = this.buttonSubmitLogInFormConfigurations.buttonSubmitLogInFormAttributes.defaultAttributes.id;
		this.authentication = new Authentication();
	}


	// reimplementing
	getInputContainerDomElement()
	{
		let authenticationFormsConfigurations = this.htmlConfigurationAttributesReader.getAuthenticationFormsDatastructuresConfigurations();
		let idLogInFormContainer = authenticationFormsConfigurations.divSubmitLogInContainerAttributes.defaultAttributes.id;

		return this.htmlPageDomUpdater.getDomElementOnPageById(idLogInFormContainer);
	}


	onMouseDown()
	{
		//let additionalClassOnMouseDown = this.getAdditionalClassOnMouseDown(this.buttonSubmitLogInFormConfigurations.buttonSubmitLogInFormAttributes);
		//this.onAbstractMouseDown(this.idButton, additionalClassOnMouseDown, this);

		let inputContainerDomElement = this.getInputContainerDomElement();
		let additionalClassOnMouseDown = this.getAdditionalClassOnMouseDown(this.buttonSubmitLogInFormConfigurations.buttonSubmitLogInFormAttributes);
		this.onAbstractMouseDown(this.idButton, inputContainerDomElement, additionalClassOnMouseDown, this);
	}


	onMouseUp()
	{
		//this.onAbstractMouseUp(this.idButton, this);

		let inputContainerDomElement = this.getInputContainerDomElement();
		this.onAbstractMouseUp(this.idButton, inputContainerDomElement, this);
	}


	onMouseClick()
	{
		let methodAfterRippleEffectEnded = (evn) => this.onAfterRippleEffectEnded();

		this.onAbstractClick(this.idButton, this, methodAfterRippleEffectEnded); // method onAfterRippleEffectEnded should be implemented here instead null
	}


	onAfterRippleEffectEnded(evn)
	{
		//this.authentication.onClickButtonLogInForm();

		let logInFormFieldsHelper = new LogInFormFieldsHelper();

		let contextFormFieldsHelper = new ContextFormFieldsHelper(logInFormFieldsHelper);

		let logInFormDomElements = contextFormFieldsHelper.obtainFormDomElements();

		let idFormLogIn = logInFormFieldsHelper.idForm;

		this.authentication.onClickButtonSubmitForm(logInFormDomElements, idFormLogIn, contextFormFieldsHelper);
	}

}