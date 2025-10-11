import { HtmlPageDomUpdater } from '../HtmlDomElementHandler/HtmlPageDomUpdater.js';

export class EventDispatcher
{
    constructor()
    {
        this.htmlPageDomUpdater = new HtmlPageDomUpdater();
    }


    // dispatch SubmitEventIfErrorFieldsHasNotMessages
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


    createCustomEvent(eventName, customEventInfo) // elementNameOfNode - is value of attribute data-element-name in html
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


    // dispatch SubmitEventIfErrorFieldsHasNotMessages
    //dispatchCustomEvent(idDomElementToFire, customEventName, customEventInfo)
    dispatchCustomEvent(domElementToFireEvent, customEventName, customEventInfo)
    {
        //let domElementToFireEvent = this.htmlPageDomUpdater.getDomElementOnPageById(idDomElementToFire);

        if (!domElementToFireEvent)
        {
            throw new Error(`Element was not found`);
        }

        let customEvent = this.createCustomEvent(customEventName, customEventInfo);

        domElementToFireEvent.dispatchEvent(customEvent);
    }


    dispatchMouseEvent(buttonDomElement, eventType)
    {
        // Create a new MouseEvent object.
        // The 'bubbles' and 'cancelable' properties are important.
        // - `bubbles: true` means the event will bubble up the DOM tree (e.g., from a button to its parent div).
        // - `cancelable: true` means the event can be cancelled if a listener calls `event.preventDefault()`.
        const event = new MouseEvent(eventType, {
            view: window,
            bubbles: true,
            cancelable: true,
            // The `buttons` property is useful for `mousedown` and `mouseup` events
            // to specify which mouse button was pressed (1 for left button).
            buttons: 1
        });

        // Dispatch the event on the element
        buttonDomElement.dispatchEvent(event);
    }

}