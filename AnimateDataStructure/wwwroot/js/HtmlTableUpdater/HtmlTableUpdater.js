import { HtmlTableBuilderUpdater } from './HtmlTableBuilderUpdater.js';
import { HtmlPageDomUpdater } from '../HtmlDomElementHandler/HtmlPageDomUpdater.js';

// -------------------------------------------- Begin Updater html-table via pattern Builder  --------------------------------------------
export class HtmlTableUpdater // Foreman
{
    constructor(idTable, stateOfDataToHtmlTable)
    {
        this.idTable = idTable;
        this.stateOfDataToHtmlTable = stateOfDataToHtmlTable; // to get previousDataTable and currentDataTable
        this.htmlTableBuilderUpdater = new HtmlTableBuilderUpdater();
        this.htmlPageDomUpdater = new HtmlPageDomUpdater();
    }


    updateTable(idTable, idTableSearchInput)
    {
        let statusesForHtmlTable = this.stateOfDataToHtmlTable.getCellsStatuses();
        this.addNewRowsToTable(idTable, idTableSearchInput); // it does nothing if no new rows to be added in table
        for (let rowIndex = 0; rowIndex < statusesForHtmlTable.length; rowIndex++)
        {
            let isCellLoaderSequentially = statusesForHtmlTable[rowIndex][0].toBeAdded
            this.htmlTableBuilderUpdater.updateRowContentOfHtmlTable(idTable, statusesForHtmlTable, isCellLoaderSequentially, rowIndex);
        }
    }


    addNewRowsToTable(idTable, idTableSearchInput)
    {
        let rowsWithStatusToBeAdded = this.stateOfDataToHtmlTable.getRowsWithStatusToBeAdded();
        rowsWithStatusToBeAdded.forEach(rowStatusToBeAdded =>
        {
            this.htmlTableBuilderUpdater.addTableRow(idTable, idTableSearchInput, rowStatusToBeAdded);
        });
    }
}