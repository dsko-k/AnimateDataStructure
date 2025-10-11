import { HtmlConfigurationAttributesReader } from '../HtmlConfigurationAttributes/HtmlConfigurationAttributesReader.js';
import { HtmlPageDomUpdater } from '../HtmlDomElementHandler/HtmlPageDomUpdater.js';
import { DataToHtmlTableCreator } from '../DataToHtmlTable/DataToHtmlTableCreator.js';
import { HtmlTableToDataTableConverter } from '../HtmlTableToDataTable/HtmlTableToDataTableConverter.js';
import { StateOfDataToHtmlTable } from './StateOfDataToHtmlTable.js';
import { HtmlTableUpdater } from '../HtmlTableUpdater/HtmlTableUpdater.js';

export class HtmlTableHandler
{
    constructor()
    {
        this.htmlConfigurationAttributesReader = new HtmlConfigurationAttributesReader();
        this.attributesOfHtmlTable = this.htmlConfigurationAttributesReader.getHtmlTableConfigurationsForElements();

        this.htmlPageDomUpdater = new HtmlPageDomUpdater();
        this.dataToHtmlTableCreator = new DataToHtmlTableCreator();
        this.htmlTableToDataTableConverter = new HtmlTableToDataTableConverter();

        this.onUpdateHtmlTableEventHandler = this.onUpdateHtmlTableEventHandler.bind(this);
    }


    onUpdateHtmlTable(idTable)
    {
        let htmlTableDomElement = this.htmlPageDomUpdater.getDomElementOnPageById(idTable);

        htmlTableDomElement.addEventListener("updateTableTreeCharacteristics", (evn) =>
        {
            this.onUpdateHtmlTableEventHandler(evn, idTable);
        });


        htmlTableDomElement.addEventListener("updateTableTreeOperations", (evn) =>
        {
            this.onUpdateHtmlTableEventHandler(evn, idTable);
        });


        htmlTableDomElement.addEventListener("updateTableTreeTraversing", (evn) =>
        {
            this.onUpdateHtmlTableEventHandler(evn, idTable);
        });


        htmlTableDomElement.addEventListener("updateTableNodeInfo", (evn) =>
        {
            this.onUpdateHtmlTableEventHandler(evn, idTable);
        });
    }


    // common handler for multiple events
    onUpdateHtmlTableEventHandler(evn, idTable)
    {
        let currentDataTable = this.dataToHtmlTableCreator.constructDataForHtmlTable(evn.detail.dataStructure, evn.detail.dataTableConfigurations);
        let previousDataTable = this.htmlTableToDataTableConverter.convertHtmlTableToDataTable(idTable);

        let stateOfDataToHtmlTable = new StateOfDataToHtmlTable();

        stateOfDataToHtmlTable.setPreviousCurrentDataTable(currentDataTable, previousDataTable);

        let htmlTableUpdater = new HtmlTableUpdater(idTable, stateOfDataToHtmlTable);

        let idTableSearchInput = evn.detail.dataTableConfigurations.idTableSearchInput;

        htmlTableUpdater.updateTable(idTable, idTableSearchInput);
    }
}