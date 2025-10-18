import { HtmlConfigurationAttributesReader } from '../HtmlConfigurationAttributes/HtmlConfigurationAttributesReader.js';
import { HtmlPageDomUpdater } from '../HtmlDomElementHandler/HtmlPageDomUpdater.js';
import { EventDispatcher } from '../CustomEventHandler/EventDispatcher.js';


export class AuthenticationChecker
{
	constructor()
	{
		this.htmlConfigurationAttributesReader = new HtmlConfigurationAttributesReader();
		this.htmlPageDomUpdater = new HtmlPageDomUpdater();
	}


	//?????
	isUserAuthenticated()
	{
		let inputUserAuthenticationStatusDomElement = this.getInputUserAuthenticationStatusDomElement();

		return inputUserAuthenticationStatusDomElement && inputUserAuthenticationStatusDomElement.value === `${true}`;
	}

	//?????
	getInputUserAuthenticationStatusDomElement()
	{
		let buttonAuthenticateConfigurations = this.htmlConfigurationAttributesReader.getHtmlControlButtonAuthenticateConfigurations();

		let inputUserAuthenticationStatusAttributes = buttonAuthenticateConfigurations.inputUserAuthenticationStatusAttributes;

		let idInputUserAuthenticationStatus = inputUserAuthenticationStatusAttributes.defaultAttributes.id;

		const inputUserAuthenticationStatus = this.htmlPageDomUpdater.getDomElementOnPageById(idInputUserAuthenticationStatus);

		return inputUserAuthenticationStatus;
	}


	// ????
	getButtonAuthenticateDomElement()
	{
		let buttonAuthenticateConfigurations = this.htmlConfigurationAttributesReader.getHtmlControlButtonAuthenticateConfigurations();
		let idButtonAuthenticate = buttonAuthenticateConfigurations.buttonAuthenticateAttributes.defaultAttributes.id;

		return this.htmlPageDomUpdater.getDomElementOnPageById(idButtonAuthenticate);
	}


	// ????
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