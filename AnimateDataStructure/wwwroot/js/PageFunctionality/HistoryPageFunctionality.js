import { ContextControlEffects } from '../UserInterfaceEffects/ContextControlEffects.js';
import { ButtonAuthenticateEffects } from '../UserInterfaceEffects/ButtonAuthenticateEffects.js'
import { ControlHandlersAbstractMouseEffect } from '../UserInterfaceEffects/ControlHandlersAbstractMouseEffect.js';
import { HtmlConfigurationAttributesReader } from '../HtmlConfigurationAttributes/HtmlConfigurationAttributesReader.js';



export class HistoryPageFunctionality
{
	constructor()
	{
		this.htmlConfigurations = new HtmlConfigurationAttributesReader();
		this.cardsConfigurations = this.htmlConfigurations.getHtmlCardsOfListDatastructuresConfigurations();
	}

	addEffectsToControlButtons()
	{
		let buttonAuthenticateEffects = new ButtonAuthenticateEffects();

		let contextControlButtonEffectsAuthenticate = new ContextControlEffects(buttonAuthenticateEffects);
		contextControlButtonEffectsAuthenticate.addEffectsToControlButton();

		//buttonAuthenticateEffects.onAfterSuccessAuthentication();
		//buttonAuthenticateEffects.onAfterLogOut();
		//buttonAuthenticateEffects.onSubmitHiddenLogoutForm();
		//buttonAuthenticateEffects.onPageLoadButtonAuthenticate();
		buttonAuthenticateEffects.addAuthorizationButtonBehaviorHandlers();
	}

}