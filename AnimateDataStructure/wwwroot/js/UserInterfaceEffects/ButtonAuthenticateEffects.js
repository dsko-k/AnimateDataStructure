import { AbstractControlButtonEffects } from './AbstractControlButtonEffects.js';
import { Authentication } from '../Authentication/Authentication.js';
import { EventDispatcher } from '../CustomEventHandler/EventDispatcher.js';
import { AfterAuthentication } from '../Authentication/AfterAuthentication.js';
import { AuthenticationChecker } from '../Authentication/AuthenticationChecker.js';

// button Authorize to invoke Sign Up and Login forms
export class ButtonAuthenticateEffects extends AbstractControlButtonEffects
{
	constructor()
	{
		super();
		this.buttonAuthenticateConfigurations = this.htmlConfigurationAttributesReader.getHtmlControlButtonAuthenticateConfigurations();
		this.idButton = this.buttonAuthenticateConfigurations.buttonAuthenticateAttributes.defaultAttributes.id;
		this.eventDispatcher = new EventDispatcher();
		this.authentication = new Authentication();
		this.authenticationChecker = new AuthenticationChecker();
		this.afterAuthentication = new AfterAuthentication();		
	}


	onMouseDown()
	{
		let inputContainerDomElement = this.getInputContainerDomElement(); // from Base class
		let additionalClassOnMouseDown = this.getAdditionalClassOnMouseDown(this.buttonAuthenticateConfigurations.buttonAuthenticateAttributes);
		this.onAbstractMouseDown(this.idButton, inputContainerDomElement, additionalClassOnMouseDown, this);
	}


	onMouseUp()
	{
		let inputContainerDomElement = this.getInputContainerDomElement();
		this.onAbstractMouseUp(this.idButton, inputContainerDomElement, this);
	}


	onMouseClick()
	{
		this.onAbstractClick(this.idButton, this, this.onAfterRippleEffectEnded.bind(this));
	}


	async onAfterRippleEffectEnded(evn)
	{
		let isAuthenticated = this.authenticationChecker.isUserAuthenticated();
		if (!isAuthenticated)
        {
			let authenticationConfigs = this.htmlConfigurationAttributesReader.getAuthenticationFormsDatastructuresConfigurations();
			let idAuthorizationSuperContainer = authenticationConfigs.divAuthorizationSuperContainerAttributes.defaultAttributes.id;
			let domElementToPasteAuthenticationForm = this.htmlPageDomUpdater.getDomElementOnPageById(idAuthorizationSuperContainer);
			await this.authentication.loadAuthenticationForm(domElementToPasteAuthenticationForm);
		}
        else
		{
			const logoutForm = this.getFormForLogOutButton();
			logoutForm.submit();
        }
	}

	// Add handlers related to behavior of Authorization button after user Authentication or Log out
	// It not includes ripple efect behavior (it is distinct method on Context)
	addAuthorizationButtonBehaviorHandlers()
	{
		this.onPageLoadButtonAuthenticate();
		this.onAfterSuccessAuthentication();
		this.onAfterLogOut();
		this.onSubmitHiddenLogoutForm();		
	}


	onPageLoadButtonAuthenticate()
	{
		document.addEventListener("DOMContentLoaded", function (evn)
		{
			let buttonAuthenticateDomElement = this.converterConfigirationsToDomElement.getDomElementFromConfigurations(this.buttonAuthenticateConfigurations.buttonAuthenticateAttributes);
			if (this.authenticationChecker.isUserAuthenticated())
			{
				this.eventDispatcher.dispatchCustomEvent(buttonAuthenticateDomElement, "userLoggedIn", {});
			}
		}.bind(this));
	}


	// Change inscription on the button Authenticate and modify this button to log out
	onAfterSuccessAuthentication()
	{
		let buttonAuthenticateDomElement = this.converterConfigirationsToDomElement.getDomElementFromConfigurations(this.buttonAuthenticateConfigurations.buttonAuthenticateAttributes);

		buttonAuthenticateDomElement.addEventListener("userLoggedIn", function (evn)
		{
			buttonAuthenticateDomElement.textContent = this.buttonAuthenticateConfigurations.buttonAuthenticateAttributes.textWhenAuthenticated; // 'Log out'
			this.setAuthenticationInputStatus(true);			
			this.createFormForLogOutButton(); // add form tag
			// Authomatically click button with id that specified in attribute data-idButtonToClickAfterAuthentication on tag
			// <button id="idButtonAuthenticate" class="neonButtonSignIn" type="button" data-id-button-to-click-after-authentication="">Authenticate</button>
			this.afterAuthentication.emulateClickButtonAfterAuthentication();
		}.bind(this));
	}


	onAfterLogOut()
	{
		let buttonAuthenticateDomElement = this.converterConfigirationsToDomElement.getDomElementFromConfigurations(this.buttonAuthenticateConfigurations.buttonAuthenticateAttributes);

		buttonAuthenticateDomElement.addEventListener("userLoggedOut", function (evn)
		{
			const formForLogOutButton = this.getFormForLogOutButton();			
			this.setAuthenticationInputStatus(false);			
			buttonAuthenticateDomElement.textContent = this.buttonAuthenticateConfigurations.buttonAuthenticateAttributes.textWhenUnauthenticated; // 'Authenticate'			
			formForLogOutButton.remove(); // remove form tag after LogOut
			// Remove id of the button (that automatically clicked after authorization) that specified in attribute data-idButtonToClickAfterAuthentication on tag
			// <button id="idButtonAuthenticate" class="neonButtonSignIn" type="button" data-id-button-to-click-after-authentication="">Authenticate</button>
			this.afterAuthentication.clearIdButtonToBeClicked();
		}.bind(this));
	}


	setAuthenticationInputStatus(isAuthenticatedFlag)
	{
		if (!isAuthenticated || (typeof isAuthenticatedFlag !== 'boolean'))
		{
			throw new Error("Incorrect flag value");
        }
		let inputUserAuthenticationStatusDomElement = this.converterConfigirationsToDomElement.getDomElementFromConfigurations(this.buttonAuthenticateConfigurations.inputUserAuthenticationStatusAttributes);
		inputUserAuthenticationStatusDomElement.value = `${isAuthenticatedFlag}`;
	}


	createFormForLogOutButton()
	{
		const requestToken = this.getValueOfRequestVerificationToken();		
		const form = this.constructFormDomElement(); // Dynamically create a form
		const tokenInput = this.constructAntiForgeryInputDomElement(requestToken); // Create and append the hidden input for the anti-forgery token

		form.appendChild(tokenInput); // Append the form to the container for buttons
		let inpuntContainer =this.getInputContainerDomElement();
		inpuntContainer.appendChild(form);
	}


	// Dynamically create a form
	constructFormDomElement()
	{
		let formAttributes = this.buttonAuthenticateConfigurations.dynamicFormToSubmitLogOutAttributes;
		const form = document.createElement(formAttributes.tag);
		form.id = formAttributes.defaultAttributes.id; // "idFormForLogOutButton"
		form.method = formAttributes.defaultAttributes.method; // 'POST'
		form.action = formAttributes.defaultAttributes.action; // '/Authentication/Logout'
		return form;
	}


	constructAntiForgeryInputDomElement(valueAntiForgery)
	{
		let dynamicInputAttributes = this.buttonAuthenticateConfigurations.dynamicInputInsideFormToSubmitLogOutAttributes;
		const input = document.createElement(dynamicInputAttributes.tag);
		input.type = dynamicInputAttributes.defaultAttributes.type;
		input.name = dynamicInputAttributes.defaultAttributes.name;
		input.value = valueAntiForgery;
		return input;
	}


	// get value from // <input type="hidden" id="RequestVerificationToken" name="@tokens.FormFieldName" value="@tokens.RequestToken" />
	getValueOfRequestVerificationToken()
	{	
		let idInputRequestVerificationToken = this.buttonAuthenticateConfigurations.inputAuthenticateAntiForgeryTokenAttributes.defaultAttributes.id;
		const requestToken = this.htmlPageDomUpdater.getDomElementOnPageById(idInputRequestVerificationToken);
		return requestToken.value;
	}


	getFormForLogOutButton()
	{
		let idFormForLogOutButton = this.buttonAuthenticateConfigurations.dynamicFormToSubmitLogOutAttributes.defaultAttributes.id; // 'idFormForLogOutButton'
		const logoutForm = this.htmlPageDomUpdater.getDomElementOnPageById(idFormForLogOutButton);
		return logoutForm;
	}


	onSubmitHiddenLogoutForm()
	{
		const logoutForm = this.getFormForLogOutButton();
		if (logoutForm)
		{
			logoutForm.addEventListener('submit', async function (event)
			{
				event.preventDefault(); // Prevent the default form submission (page reload)
				const requestToken = this.getValueOfRequestVerificationToken();
				try
				{
					// Send the logout request using the fetch API
					const response = await fetch(logoutForm.action, {
						method: logoutForm.method,
						headers: {
							'RequestVerificationToken': requestToken,
							'Content-Type': 'application/json'
						}
					});
					if (response.ok)
					{
						let buttonAuthenticateDomElement = this.converterConfigirationsToDomElement.getDomElementFromConfigurations(this.buttonAuthenticateConfigurations.buttonAuthenticateAttributes);
						this.eventDispatcher.dispatchCustomEvent(buttonAuthenticateDomElement, "userLoggedOut", {});
					}
					else
					{
						console.error('Logout failed:', response.statusText);
					}
				}
				catch (error)
				{
					console.error('Error during logout:', error);
				}
			});
		}
	}
}