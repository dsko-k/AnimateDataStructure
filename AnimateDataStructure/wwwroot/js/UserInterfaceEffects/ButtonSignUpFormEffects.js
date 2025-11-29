import { AbstractControlButtonEffects } from './AbstractControlButtonEffects.js';
import { Authentication } from '../Authentication/Authentication.js';
import { SignUpFormFieldsHelper } from '../Authentication/SignUpFormFieldsHelper.js';
import { ContextFormFieldsHelper } from '../Authentication/ContextFormFieldsHelper.js';

export class ButtonSignUpFormEffects extends AbstractControlButtonEffects
{
	constructor()
	{
		super();
		this.buttonSubmitSignUpFormConfigurations = this.htmlConfigurationAttributesReader.getAuthenticationFormsDatastructuresConfigurations();
		this.idButton = this.buttonSubmitSignUpFormConfigurations.buttonSubmitSignUpFormAttributes.defaultAttributes.id;
		this.authentication = new Authentication();
	}


	// reimplementing
	getInputContainerDomElement()
	{
		let authenticationFormsConfigurations = this.htmlConfigurationAttributesReader.getAuthenticationFormsDatastructuresConfigurations();
		let idSignUpFormContainer = authenticationFormsConfigurations.divSubmitSignUpContainerAttributes.defaultAttributes.id;
		return this.htmlPageDomUpdater.getDomElementOnPageById(idSignUpFormContainer);
	}


	onMouseDown()
	{
		let inputContainerDomElement = this.getInputContainerDomElement();
		let additionalClassOnMouseDown = this.getAdditionalClassOnMouseDown(this.buttonSubmitSignUpFormConfigurations.buttonSubmitSignUpFormAttributes);
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
		let signUpFormFieldsHelper = new SignUpFormFieldsHelper();
		let contextFormFieldsHelper = new ContextFormFieldsHelper(signUpFormFieldsHelper);
		let signUpFormDomElements = contextFormFieldsHelper.obtainFormDomElements();
		let idFormSignUp = signUpFormFieldsHelper.idForm;
		this.authentication.onClickButtonSubmitForm(signUpFormDomElements, idFormSignUp, contextFormFieldsHelper);
	}
}