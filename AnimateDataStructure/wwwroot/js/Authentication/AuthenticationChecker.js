import { HtmlConfigurationAttributesReader } from '../HtmlConfigurationAttributes/HtmlConfigurationAttributesReader.js';
import { HtmlPageDomUpdater } from '../HtmlDomElementHandler/HtmlPageDomUpdater.js';
import { ConverterConfigirationsToDomElement } from '../HtmlDomElementHandler/ConverterConfigirationsToDomElement.js';


export class AuthenticationChecker
{
	constructor()
	{
		this.htmlPageDomUpdater = new HtmlPageDomUpdater();
		this.htmlConfigurationAttributesReader = new HtmlConfigurationAttributesReader();
		this.converterConfigirationsToDomElement = new ConverterConfigirationsToDomElement();				
		this.buttonAuthenticateConfigurations = this.htmlConfigurationAttributesReader.getHtmlControlButtonAuthenticateConfigurations();
	}


	isUserAuthenticated()
	{
		let inputUserAuthenticationStatusDomElement = this.converterConfigirationsToDomElement.getDomElementFromConfigurations(this.buttonAuthenticateConfigurations.inputUserAuthenticationStatusAttributes);
		
		return inputUserAuthenticationStatusDomElement && inputUserAuthenticationStatusDomElement.value === `${true}`;
	}


	//?????
	//getInputUserAuthenticationStatusDomElement()
	//{
	//	let buttonAuthenticateConfigurations = this.htmlConfigurationAttributesReader.getHtmlControlButtonAuthenticateConfigurations();

	//	let inputUserAuthenticationStatusAttributes = buttonAuthenticateConfigurations.inputUserAuthenticationStatusAttributes;

	//	let idInputUserAuthenticationStatus = inputUserAuthenticationStatusAttributes.defaultAttributes.id;

	//	const inputUserAuthenticationStatus = this.htmlPageDomUpdater.getDomElementOnPageById(idInputUserAuthenticationStatus);

	//	return inputUserAuthenticationStatus;
	//}


	// ????
	//getButtonAuthenticateDomElement()
	//{
	//	let buttonAuthenticateConfigurations = this.htmlConfigurationAttributesReader.getHtmlControlButtonAuthenticateConfigurations();
	//	let idButtonAuthenticate = buttonAuthenticateConfigurations.buttonAuthenticateAttributes.defaultAttributes.id;

	//	return this.htmlPageDomUpdater.getDomElementOnPageById(idButtonAuthenticate);
	//}


}