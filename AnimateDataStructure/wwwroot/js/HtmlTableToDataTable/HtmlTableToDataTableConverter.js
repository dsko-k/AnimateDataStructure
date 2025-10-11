import { HtmlTableDomUpdater } from '../HtmlDomElementHandler/HtmlTableDomUpdater.js';
import { HtmlTableToDataTableBuilder } from './HtmlTableToDataTableBuilder.js';

// -------------  Begin Build converter from HtmlTable to Data table before updating HtmlTable

export class HtmlTableToDataTableConverter // Foreman
{
    constructor()
    {
        this.htmlTableDomUpdater = new HtmlTableDomUpdater();
        this.htmlTableToDataTableBuilder = new HtmlTableToDataTableBuilder();
    }


    convertHtmlTableToDataTable(idtable)
    {
        let dataTableFromParsedHtmlTable = [];

        let rowsHtmlTableIncludingHeader = this.htmlTableDomUpdater.getNumberOfRowsHtmlTableIncludingHeader(idtable);

        for (let rowIndex = 1; rowIndex < rowsHtmlTableIncludingHeader; rowIndex++) // rowIndex = 1 (header is skipped)
        {
            let dataRowParsedFromHtmlRow = this.htmlTableToDataTableBuilder.buildDataTableRow(idtable, rowIndex);

            dataTableFromParsedHtmlTable.push(dataRowParsedFromHtmlRow);
        }

        return dataTableFromParsedHtmlTable;
    }

}