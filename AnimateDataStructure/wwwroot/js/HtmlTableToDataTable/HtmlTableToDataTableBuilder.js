import { HtmlTableDomUpdater } from '../HtmlDomElementHandler/HtmlTableDomUpdater.js';
import { HtmlConfigurationAttributesReader } from '../HtmlConfigurationAttributes/HtmlConfigurationAttributesReader.js';


// Build converter from HtmlTable to Data table before updating HtmlTable
export class HtmlTableToDataTableBuilder // Builder
{
    constructor()
    {
        this.htmlTableDomUpdater = new HtmlTableDomUpdater();
        this.htmlConfigurationAttributesReader = new HtmlConfigurationAttributesReader();
        this.attributesOfHtmlTable = this.htmlConfigurationAttributesReader.getHtmlTableConfigurationsForElements();
    }


    buildDataTableRow(tableId, rowIndex)
    {
        let trDomElement = this.htmlTableDomUpdater.getTableRow(tableId, rowIndex);
        let styleNameForTextInsideTableCell = this.htmlConfigurationAttributesReader.getClassFromAttributesWithDot(this.attributesOfHtmlTable.pTextInsideCellAttributes.defaultAttributes); // ".textInsideCell"

        let columnsNumber = this.htmlTableDomUpdater.getNumberOfColumnsInHtmlTable(tableId);

        let parsedRow = [];

        for (let columnIndex = 0; columnIndex < columnsNumber; columnIndex++)
        {
            let textInCell = this.htmlTableDomUpdater.extractTextInsideTableCell(trDomElement, columnIndex, styleNameForTextInsideTableCell);

            parsedRow.push(textInCell);
        }

        return parsedRow;
    }


    //getHtmlTableTextInsideCell(rowIndex, columnIndex)
    //{
    //    let trDomElement = this.htmlTableDomUpdater.getTableRow(this.tableId, rowIndex);
    //    let styleNameForTextInsideTableCell = this.attributesOfHtmlTable.pTextInsideCellAttributes;

    //    let textInCell = this.htmlTableDomUpdater.extractTextInsideTableCell(trDomElement, columnIndex, styleNameForTextInsideTableCell);

    //    return textInCell;
    //}




}