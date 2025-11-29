import { HtmlConfigurationAttributesReader } from '../HtmlConfigurationAttributes/HtmlConfigurationAttributesReader.js';
import { HtmlPageDomUpdater } from '../HtmlDomElementHandler/HtmlPageDomUpdater.js';
import { HtmlAbstractDomElementPart } from '../HtmlDomElementHandler/HtmlAbstractDomElementPart.js';

export class AbstractRippleEffect
{
	constructor()
	{
		this.htmlConfigurationAttributesReader = new HtmlConfigurationAttributesReader();
		this.rippleEffectOnButtonClickConfigurations = this.htmlConfigurationAttributesReader.getHtmlRippleEffectOnControlButtonConfigurations();
		this.htmlPageDomUpdater = new HtmlPageDomUpdater();
		this.htmlAbstractDomElementPart = new HtmlAbstractDomElementPart();
	}


	createDomElementEmulatesRippleEffect(buttonDomElementToBeWithRippleEffect, evn)
	{
		let spanRippleEffectDomElement = this.buildDomElementRippleEffect();
		let buttonRect = buttonDomElementToBeWithRippleEffect.getBoundingClientRect();
		let buttonWidth = buttonRect.width;
		let buttonHeight = buttonRect.height;

		let diametrOfRippleEffect = Math.max(buttonWidth, buttonHeight);
		let radiusOfRippleEffect = diametrOfRippleEffect / 2;

		let xClickPositionRelativeToButton = evn.clientX - buttonRect.left;
		let yClickPositionRelativeToButton = evn.clientY - buttonRect.top;

		spanRippleEffectDomElement.style.width = `${diametrOfRippleEffect}px`;
		spanRippleEffectDomElement.style.height = `${diametrOfRippleEffect}px`;
		spanRippleEffectDomElement.style.left = `${xClickPositionRelativeToButton - radiusOfRippleEffect}px`;
		spanRippleEffectDomElement.style.top = `${yClickPositionRelativeToButton - radiusOfRippleEffect}px`;

		return spanRippleEffectDomElement;
	}


	nestRippleEffectContainerToElementToBeWithRippleEffect(buttonDomElementToBeWithRippleEffect, evn)
	{
		let containerSpanRippleEffectDomElement = this.buildDomElementContainerRippleEffect();
		let spanRippleEffectDomElement = this.createDomElementEmulatesRippleEffect(buttonDomElementToBeWithRippleEffect, evn);
		containerSpanRippleEffectDomElement.appendChild(spanRippleEffectDomElement);
		buttonDomElementToBeWithRippleEffect.appendChild(containerSpanRippleEffectDomElement);

		return containerSpanRippleEffectDomElement;
	}


	onAfterRippleEffectEndedDefault(rippleEffectDomElement, context, evn)
	{
		rippleEffectDomElement.addEventListener('animationend', () => 
		{
			rippleEffectDomElement.remove();
		});
	}


	buildDomElementRippleEffect()
	{
		let rippleEffectAttributes = this.rippleEffectOnButtonClickConfigurations.rippleEffectOnButtonClickAttributes;
		let spanRippleEffect = this.htmlAbstractDomElementPart.createHtmlTag(rippleEffectAttributes);
		return spanRippleEffect.getCreatedDomElement();
	}


	buildDomElementContainerRippleEffect()
	{
		let containerRippleEffectAttributes = this.rippleEffectOnButtonClickConfigurations.containerRippleEffectOnButtonClickAttributes;
		let containerSpanRippleEffect = this.htmlAbstractDomElementPart.createHtmlTag(containerRippleEffectAttributes);
		return containerSpanRippleEffect.getCreatedDomElement();
	}
}