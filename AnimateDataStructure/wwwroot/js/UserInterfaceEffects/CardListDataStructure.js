import { AbstractControlButtonEffects } from './AbstractControlButtonEffects.js';
import { AuthenticationChecker } from './AuthenticationChecker.js';


export class CardListDataStructure extends AbstractControlButtonEffects
{
	constructor()
	{
		super();
		this.authenticationChecker = new AuthenticationChecker();
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


	//?????
	onClickCardHistory(idCardOfListDataStructure, urlToOpenAfterRippleEffectEnded, isOpenUrlInNewBrowserTab)
	{
		let methodAfterRippleEffectEnded = this.onAfterRippleEffectEndedOpenPageHistory.bind(this, urlToOpenAfterRippleEffectEnded, isOpenUrlInNewBrowserTab);
		this.onAbstractClick(idCardOfListDataStructure, this, methodAfterRippleEffectEnded);
	}


	// ????
	// Open page by url RELATIVE to base url after end of ripple effect
	onAfterRippleEffectEndedOpenPageHistory(relativeUrl, isOpenUrlInNewBrowserTab)
	{
		if (!this.authenticationChecker.isUserAuthenticated())
		{
			let buttonAuthenticateDomElement = this.authenticationChecker.getButtonAuthenticateDomElement();

			this.authenticationChecker.immitateClickOnButtonAuthenticate(buttonAuthenticateDomElement);

			return;
		}

		isOpenUrlInNewBrowserTab ? window.open(relativeUrl) : window.open(relativeUrl, "_self");
	}

}