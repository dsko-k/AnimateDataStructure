import { AbstractControlButtonEffects } from './AbstractControlButtonEffects.js';
import { AuthenticationChecker } from '../Authentication/AuthenticationChecker.js';
import { AfterAuthentication } from '../Authentication/AfterAuthentication.js';
import { HtmlConfigurationAttributesReader } from '../HtmlConfigurationAttributes/HtmlConfigurationAttributesReader.js';
import { ConverterConfigirationsToDomElement } from '../HtmlDomElementHandler/ConverterConfigirationsToDomElement.js';
import { ButtonHelper } from '../DomElementHelpers/ButtonHelper.js';


export class CardListDataStructure extends AbstractControlButtonEffects
{
	constructor()
	{
		super();
		this.buttonHelper = new ButtonHelper();
		this.converterConfigirationsToDomElement = new ConverterConfigirationsToDomElement();
		this.authenticationChecker = new AuthenticationChecker();
		this.afterAuthentication = new AfterAuthentication();
		this.htmlConfigurationAttributesReader = new HtmlConfigurationAttributesReader();
		this.buttonAuthenticateConfigs = this.htmlConfigurationAttributesReader.getHtmlControlButtonAuthenticateConfigurations();
	}


	onClickCard(idCardOfListDataStructure, urlToOpenAfterRippleEffectEnded, isOpenUrlInNewBrowserTab)
	{
		//let methodAfterRippleEffectEnded = (url) => this.onAfterRippleEffectEndedOpenPage(url);
		let methodAfterRippleEffectEnded = this.onAfterRippleEffectEndedOpenPage.bind(this, urlToOpenAfterRippleEffectEnded, isOpenUrlInNewBrowserTab);
		this.onAbstractClick(idCardOfListDataStructure, this, methodAfterRippleEffectEnded);
	}


	// Open page by url RELATIVE to base url after end of ripple effect
	onAfterRippleEffectEndedOpenPage(relativeUrl, isOpenUrlInNewBrowserTab)
	{
		isOpenUrlInNewBrowserTab ? window.open(relativeUrl) : window.open(relativeUrl, "_self");
	}


	onClickCardHistory(idCardOfListDataStructure, urlToOpenAfterRippleEffectEnded, isOpenUrlInNewBrowserTab)
	{
		let methodAfterRippleEffectEnded = this.onAfterRippleEffectEndedOpenPageHistory.bind(this, urlToOpenAfterRippleEffectEnded, isOpenUrlInNewBrowserTab, /*???*/ idCardOfListDataStructure);
		this.onAbstractClick(idCardOfListDataStructure, this, methodAfterRippleEffectEnded);
	}


	// Open page by url RELATIVE to base url after end of ripple effect
	onAfterRippleEffectEndedOpenPageHistory(relativeUrl, isOpenUrlInNewBrowserTab, idCardOfListDataStructure)
	{
		if (!this.authenticationChecker.isUserAuthenticated())
		{
			let buttonAuthenticateDomElement = this.converterConfigirationsToDomElement.getDomElementFromConfigurations(this.buttonAuthenticateConfigs.buttonAuthenticateAttributes);

			this.buttonHelper.immitateClickOnButtonContainedRippleEffect(buttonAuthenticateDomElement);

			this.afterAuthentication.setIdButtonToBeClickedAfterAuthorization(buttonAuthenticateDomElement, idCardOfListDataStructure);

			return;
		}

		isOpenUrlInNewBrowserTab ? window.open(relativeUrl) : window.open(relativeUrl, "_self");
	}

}