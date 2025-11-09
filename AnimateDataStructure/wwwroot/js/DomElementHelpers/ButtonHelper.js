import { ConverterConfigirationsToDomElement } from '../HtmlDomElementHandler/ConverterConfigirationsToDomElement.js';
import { EventDispatcher } from '../CustomEventHandler/EventDispatcher.js';


export class ButtonHelper
{
    constructor()
    {
        this.converterConfigirationsToDomElement = new ConverterConfigirationsToDomElement();
    }


    // DO NOT DELETE: It is applicable only for the buttons WITHOUT ripple effect
    emulateClickOnButton(buttonDomElementToBeClicked)
    {
        this.throwIncorrectButtonDomElement(buttonDomElementToBeClicked);
        buttonDomElementToBeClicked.click();
    }


    // DO NOT DELETE: It is applicable only for the buttons WITHOUT ripple effect
    emulateClickOnButtonFromConfigurations(attributeObject)
    {
        let buttonDomElementToBeClicked = this.converterConfigirationsToDomElement.getDomElementFromConfigurations(attributeObject);
        this.emulateClickOnButton(buttonDomElementToBeClicked);
    }


    // ????
    // DO NOT DELETE: It is applicable only for the buttons WITH ripple effect
    immitateClickOnButtonContainedRippleEffect(buttonContainedRippleEffectDomElement)
    {
        let eventDispatcher = new EventDispatcher();
        // DO NOT DELETE:
        // dispatch MouseEvent about to trigger ending ripple effect event on the button Authenticate (not simply "click")
        eventDispatcher.dispatchMouseEvent(buttonContainedRippleEffectDomElement, "mousedown");
        eventDispatcher.dispatchMouseEvent(buttonContainedRippleEffectDomElement, "click");
        eventDispatcher.dispatchMouseEvent(buttonContainedRippleEffectDomElement, "mouseup");
    }


    // Update text inside button
    updateButtonInscription(buttonDomElement, newInscription)
    {
        this.throwIncorrectButtonDomElement(buttonDomElement);
        this.throwIncorrectButtonTextInscription(newInscription);

        buttonDomElement.textContent = newInscription;
    }


    throwIncorrectButtonDomElement(buttonDomElement)
    {
        if (!buttonDomElement)
        {
            throw new Error("Incorrect button DOM-element");
        }
    }


    throwIncorrectButtonTextInscription(inscription)
    {
        if (!inscription || inscription === '')
        {
            throw new Error("Incorrect text for the button inscription");
        }
    }

}