import { ContextControlEffects } from '../UserInterfaceEffects/ContextControlEffects.js';
import { ButtonAuthenticateEffects } from '../UserInterfaceEffects/ButtonAuthenticateEffects.js'
import { ControlHandlersAbstractMouseEffect } from '../UserInterfaceEffects/ControlHandlersAbstractMouseEffect.js';
import { CardListDataStructure } from '../UserInterfaceEffects/CardListDataStructure.js';
import { HtmlConfigurationAttributesReader } from '../HtmlConfigurationAttributes/HtmlConfigurationAttributesReader.js';
import { UserAgentHandler } from '../UserAgentOperations/UserAgentHandler.js';



export class ListDataStructuresPageFunctionality
{
	constructor()
	{
		this.htmlConfigurations = new HtmlConfigurationAttributesReader();
		this.cardsConfigurations = this.htmlConfigurations.getHtmlCardsOfListDatastructuresConfigurations();
		this.userAgentHandler = new UserAgentHandler();
	}

	addEffectsToControlButtons()
	{
		let buttonAuthenticateEffects = new ButtonAuthenticateEffects();

		let contextControlButtonEffectsAuthenticate = new ContextControlEffects(buttonAuthenticateEffects);
		contextControlButtonEffectsAuthenticate.addEffectsToControlButton();

		buttonAuthenticateEffects.addAuthorizationButtonBehaviorHandlers();
	}


	// Add glowing radial gradient when moving mouse above the cards
	addAbstractMouseEffect()
	{		
		let controlHandlersAbstractMouseEffect = new ControlHandlersAbstractMouseEffect();

		//controlHandlersAbstractMouseEffect.onMouseMoveOnElementOnParent("idCardsContainer", ".card", "--mouse-x", "--mouse-y");
		let idCardsContainer = this.cardsConfigurations.divCardsContainerAttributes.defaultAttributes.id;
		let styleCardWithDot = this.htmlConfigurations.getClassFromAttributesWithDot(this.cardsConfigurations.divCardBinarySearchTreeAttributes.defaultAttributes); // DO NOT DELETE: ".card"
		let cssVariableMouseX = this.cardsConfigurations.divCardsContainerAttributes.cssVariables.mouseX;
		let cssVariableMouseY = this.cardsConfigurations.divCardsContainerAttributes.cssVariables.mouseY;

		controlHandlersAbstractMouseEffect.onMouseMoveOnElementOnParent(idCardsContainer, styleCardWithDot, cssVariableMouseX, cssVariableMouseY);
	}


	addEffectOnClickCardOfListDataStructure()
	{
		this.addHandlerOnClickCardListDataStructure(this.cardsConfigurations.divCardBinarySearchTreeAttributes, false);
		this.addHandlerOnClickCardListDataStructure(this.cardsConfigurations.divCardAvlTreeAttributes, false);
		this.addHandlerOnClickCardListDataStructure(this.cardsConfigurations.divCardMinHeapAttributes, false);
		this.addHandlerOnClickCardListDataStructure(this.cardsConfigurations.divCardMaxHeapAttributes, false);
		this.addHandlerOnClickCardListDataStructure(this.cardsConfigurations.divCardRedBlackTreeAttributes, false);
		this.addHandlerOnClickCardHistory(this.cardsConfigurations.divCardHistoryAttributes, false);
	}


	addHandlerOnClickCardListDataStructure(attributesFromConfigurations, isOpenUrlInNewBrowserTab)
	{
		let idCard = attributesFromConfigurations.defaultAttributes.id;
		let urlToOpenAfterRippleEffect = attributesFromConfigurations.urlToOpen; // DO NOT REMOVE: URL should be relative (not include base URL)

		let contextControlButtonEffectsCardOfListDataStructure = new ContextControlEffects(new CardListDataStructure());
		contextControlButtonEffectsCardOfListDataStructure.addEffectsToCardOfListDataStructure(idCard, urlToOpenAfterRippleEffect, isOpenUrlInNewBrowserTab);
	}


	addHandlerOnClickCardHistory(attributesFromConfigurations, isOpenUrlInNewBrowserTab)
	{
		let idCard = attributesFromConfigurations.defaultAttributes.id;
		let urlToOpenAfterRippleEffect = attributesFromConfigurations.urlToOpen; // DO NOT REMOVE: URL should be relative (not include base URL)

		let contextControlButtonEffectsCardOfListDataStructure = new ContextControlEffects(new CardListDataStructure());
		contextControlButtonEffectsCardOfListDataStructure.addEffectsToCardHistory(idCard, urlToOpenAfterRippleEffect, isOpenUrlInNewBrowserTab);
	}


	// ????
	closeUserAgentNotification()
	{
		this.userAgentHandler.onClickButtonCloseUserAgentNotification();
	}


	onCheckUserAgent()
	{
		this.userAgentHandler.showUserAgentNotification();
	}

}