import { DomUpdater } from '../HtmlDomElementHandler/DomUpdater.js';
import { HtmlPageDomUpdater } from '../HtmlDomElementHandler/HtmlPageDomUpdater.js';
import { ContextDataToHtmlTableConfigurationAttributesReader } from '../HtmlConfigurationAttributes/ContextDataToHtmlTableConfigurationAttributesReader.js';


export class CustomEventHandlerHtmlTable
{
    constructor()
    {
        this.domUpdater = new DomUpdater();
        this.htmlPageDomUpdater = new HtmlPageDomUpdater();
    }


    createCustomEvent(eventName, dataStructure, dataTableConfigurations)
    {
        if (!eventName || eventName === "")
        {
            throw new Error(`Unable to create custom event. Name of event is incorrect`);
        }

        const eventDetails = {

            dataStructure: dataStructure,
            dataTableConfigurations: dataTableConfigurations,
        };

        const event = new CustomEvent(eventName, { detail: eventDetails });

        return event;
    }


    dispatchEventToHtmlTable(customEventName, idTable, dataStructure, dataTableConfigurations)
    {
        let customEvent = this.createCustomEvent(customEventName, dataStructure, dataTableConfigurations);

        if (this.htmlPageDomUpdater.isExistHtmlPageDomElement(idTable))
        {
            let htmlTableDomElement = this.htmlPageDomUpdater.getHtmlPageDomElement(idTable);

            htmlTableDomElement.dispatchEvent(customEvent);

            return;
        }
    }


    // Dispatch event to html-table if this html-table was created (currently opened on the page). Works only after enabling buttons
    dispatchUpdateTableTreeCharacteristics(isToDisableControl, dataStructure)
    {
        if (isToDisableControl)
        {
            return;
        }

        let contextDataToHtmlTableConfigurationAttributesReader = new ContextDataToHtmlTableConfigurationAttributesReader(dataStructure);
        // computing choosing methods depend on id SIDEBAR button
        let dataTableConfigurations = contextDataToHtmlTableConfigurationAttributesReader.createDataTableToHtmlTableConfigurationsForTreeCharacteristics(dataStructure);
        let idTable = dataTableConfigurations.idTable;

        if (!this.htmlPageDomUpdater.isExistHtmlPageDomElement(idTable))
        {
            return;
        }

        let customEventName = "updateTableTreeCharacteristics";        
        this.dispatchEventToHtmlTable(customEventName, idTable, dataStructure, dataTableConfigurations); // fire when node added or deleted (after buttons will be enabled)
    }


    // to update recently added entry in html-table about tree operations: add, delete, remove, ...
    dispatchUpdateTableTreeOperations(dataStructure)
    {
        let contextDataToHtmlTableConfigurationAttributesReader = new ContextDataToHtmlTableConfigurationAttributesReader(dataStructure);
        let dataTableConfigurations = contextDataToHtmlTableConfigurationAttributesReader.createDataTableToHtmlTableConfigurationsForTreeOperations(dataStructure);
        let customEventName = "updateTableTreeOperations";
        let idTable = dataTableConfigurations.idTable;
        this.dispatchEventToHtmlTable(customEventName, idTable, dataStructure, dataTableConfigurations); // fire when node added or deleted (after buttons will be enabled)
    }


    dispatchUpdateTableTreeTraversing(dataStructure)
    {
        let contextDataToHtmlTableConfigurationAttributesReader = new ContextDataToHtmlTableConfigurationAttributesReader(dataStructure);
        let dataTableConfigurations = contextDataToHtmlTableConfigurationAttributesReader.createDataTableToHtmlTableConfigurationsForTreeTraversing(dataStructure);
        let customEventName = "updateTableTreeTraversing";
        let idTable = dataTableConfigurations.idTable;        
        this.dispatchEventToHtmlTable(customEventName, idTable, dataStructure, dataTableConfigurations); // fire when node added or deleted (after buttons will be enabled)
    }


    dispatchUpdateTableNodeInfo(dataStructure)
    {
        let contextDataToHtmlTableConfigurationAttributesReader = new ContextDataToHtmlTableConfigurationAttributesReader(dataStructure);
        let dataTableConfigurations = contextDataToHtmlTableConfigurationAttributesReader.createDataTableToHtmlTableConfigurationsForNodeInfo(dataStructure);
        let customEventName = "updateTableNodeInfo";
        let idTable = dataTableConfigurations.idTable;        
        this.dispatchEventToHtmlTable(customEventName, idTable, dataStructure, dataTableConfigurations); // fire when node added or deleted (after buttons will be enabled)
    }
}