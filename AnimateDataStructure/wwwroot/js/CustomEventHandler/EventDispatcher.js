import { HtmlPageDomUpdater } from '../HtmlDomElementHandler/HtmlPageDomUpdater.js';

export class EventDispatcher
{
    constructor()
    {
        this.htmlPageDomUpdater = new HtmlPageDomUpdater();
    }


    dispatchEventSubmitForm(idForm, eventNameToFire)
    {
        let formDomElement = this.htmlPageDomUpdater.getDomElementOnPageById(idForm);

        if (!formDomElement)
        {
            throw new Error(`Form with id='${idForm}' was not found`);
        }

        const event = new Event(eventNameToFire);
        formDomElement.dispatchEvent(event);
    }


    createCustomEvent(eventName, customEventInfo)
    {
        if (!eventName || eventName === "")
        {
            throw new Error(`Unable to create custom event. Name of event is incorrect`);
        }

        const eventDetails = {

            customEventInfo: customEventInfo,
        };
        const event = new CustomEvent(eventName, { detail: eventDetails });

        return event;
    }


    dispatchCustomEvent(domElementToFireEvent, customEventName, customEventInfo)
    {
        if (!domElementToFireEvent)
        {
            throw new Error(`Element was not found`);
        }

        let customEvent = this.createCustomEvent(customEventName, customEventInfo);
        domElementToFireEvent.dispatchEvent(customEvent);
    }


    dispatchMouseEvent(buttonDomElement, eventType)
    {
        const event = new MouseEvent(eventType, {
            view: window,
            bubbles: true,
            cancelable: true, // the event can be cancelled if a listener calls event.preventDefault()
            buttons: 1, // useful for `mousedown` and `mouseup` events to specify which mouse button was pressed (1 for left button)
        });

        buttonDomElement.dispatchEvent(event);
    }
}