import { DataToHtmlTableBuilder } from './DataToHtmlTableBuilder.js';
// -------------------------------------------- Begin Build data that will pass into html-table via pattern Builder  --------------
// Crate data to pass to html-table
export class DataToHtmlTableCreator // Foreman
{
    constructor()
    {
        this.dataToHtmlTableBuilder = new DataToHtmlTableBuilder();
    }


    constructDataForHtmlTable(dataStructure, dataTableConfigurations)
    {
        let tableRowsObject = dataTableConfigurations.configureTableRowsObject(dataStructure);
        let keysTableRowsObject = Object.keys(tableRowsObject).map(key => tableRowsObject[key]);
        let rows = [];
        keysTableRowsObject.forEach(rowObject =>
        {
            rows.push(this.dataToHtmlTableBuilder.buildRow(rowObject));
        });
        return rows;
    }


    constructTableHeaders(tableHeaderAttributes)
    {
        let headers = [];
        let tableHeadersKeys = Object.keys(tableHeaderAttributes);
        tableHeadersKeys.forEach(key =>
        {
            headers.push(tableHeaderAttributes[key]);
        });
        return headers;
    }
}