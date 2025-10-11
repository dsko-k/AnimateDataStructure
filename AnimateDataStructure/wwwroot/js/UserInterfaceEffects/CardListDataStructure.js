import { AbstractControlButtonEffects } from './AbstractControlButtonEffects.js';

export class CardListDataStructure extends AbstractControlButtonEffects
{

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
}