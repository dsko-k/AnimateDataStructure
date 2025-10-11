import { HtmlConfigurationAttributesReader } from '../HtmlConfigurationAttributes/HtmlConfigurationAttributesReader.js';
import { HtmlPageDomUpdater } from '../HtmlDomElementHandler/HtmlPageDomUpdater.js';
import { HtmlAbstractDomElementPart } from '../HtmlDomElementHandler/HtmlAbstractDomElementPart.js';
import { AbstractRippleEffect } from './AbstractRippleEffect.js';

export class AbstractControlButtonEffects
{
	constructor()
	{
		this.htmlConfigurationAttributesReader = new HtmlConfigurationAttributesReader();
		this.htmlPageDomUpdater = new HtmlPageDomUpdater();
		this.htmlAbstractDomElementPart = new HtmlAbstractDomElementPart();
		this.abstractRippleEffect = new AbstractRippleEffect();
	}


	getDomElement(idButton)
	{
		return this.htmlPageDomUpdater.getDomElementOnPageById(idButton);
	}


	getInputContainerDomElement()
	{
		let inputForNodeContainerConfigurations = this.htmlConfigurationAttributesReader.getHtmlInputNodeConfigurations();
		let idInputContainer = inputForNodeContainerConfigurations.divInputContainerAttributes.defaultAttributes.id;

		return this.htmlPageDomUpdater.getDomElementOnPageById(idInputContainer);
	}


	getAdditionalClassOnMouseDown(divButtonControlNodeAttributes)
	{
		return divButtonControlNodeAttributes.onMouseDownAttributes.class;
	}


	onAbstractMouseDown(idButton, buttonContainerDomElement, additionalClassOnMouseDown, context)
	{
		// ???
		if (!buttonContainerDomElement)
        {
			throw new Error("Container for buttons is not specified");
		}


		let buttonNodeDomElement = context.getDomElement(idButton);

		buttonNodeDomElement.addEventListener("mousedown", function (evn)
		{
			//let inputContainerDomElement = context.getInputContainerDomElement();

			//inputContainerDomElement.classList.toggle(additionalClassOnMouseDown);

			// ???
			buttonContainerDomElement.classList.toggle(additionalClassOnMouseDown);

		}.bind(context));
	}


	onAbstractMouseUp(idButton, buttonContainerDomElement, context)
	{
		// ???
		if (!buttonContainerDomElement)
		{
			throw new Error("Container for buttons is not specified");
		}

		let buttonDomElement = context.getDomElement(idButton);

		buttonDomElement.addEventListener("mouseup", function (evn)
		{
			//let inputContainerDomElement = context.getInputContainerDomElement();

			//this.htmlPageDomUpdater.removeLastAdditionalStyleName(inputContainerDomElement);

			// ???
			this.htmlPageDomUpdater.removeLastAdditionalStyleName(buttonContainerDomElement);

		}.bind(context));
	}


	// Ripple Effect
	onAbstractClick(idButton, context, callBackOnAfterRippleEffectEnded)
	{
		let buttonDomElement = context.getDomElement(idButton);

		buttonDomElement.addEventListener("click", function (evn)
		{
			let containerSpanRippleEffectDomElement = this.abstractRippleEffect.nestRippleEffectContainerToElementToBeWithRippleEffect(buttonDomElement, evn);

			containerSpanRippleEffectDomElement.addEventListener('animationend', () =>
			{
				containerSpanRippleEffectDomElement.remove();

				if (callBackOnAfterRippleEffectEnded)
				{
					callBackOnAfterRippleEffectEnded(evn);
				}
			});

		}.bind(context));
	}

}