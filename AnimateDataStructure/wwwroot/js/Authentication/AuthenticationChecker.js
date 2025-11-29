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
}