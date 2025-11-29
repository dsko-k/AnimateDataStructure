import { HtmlTableDomUpdater } from '../HtmlDomElementHandler/HtmlTableDomUpdater.js';
import { HtmlConfigurationAttributesReader } from '../HtmlConfigurationAttributes/HtmlConfigurationAttributesReader.js';

// Store current states of table: is sorted, is ascend sorted, last clicked sorting button
export class TableStateSorting
{
    constructor(tableId)
    {
        this.htmlTableDomUpdater = new HtmlTableDomUpdater();
        this.htmlConfigurationAttributesReader = new HtmlConfigurationAttributesReader();
        this.attributesForHtmlTable = this.htmlConfigurationAttributesReader.getHtmlTableConfigurationsForElements();
        this.tableId = tableId;
        this.thDomElementClassName = this.htmlConfigurationAttributesReader.getClassFromAttributesWithDot(this.attributesForHtmlTable.thAttributes.defaultAttributes); // ".headerColumn"
        this.styleNameForSortAscendingButton = this.htmlConfigurationAttributesReader.getClassFromAttributesWithDot(this.attributesForHtmlTable.sortAscendingButtonAttributes.defaultAttributes); // ".sortAscendingButton"
        this.styleNameForSortDescendingButton = this.htmlConfigurationAttributesReader.getClassFromAttributesWithDot(this.attributesForHtmlTable.sortDescendingButtonAttributes.defaultAttributes); // ".sortDescendingButton"
        // added attributes inside tag table
        this.attributeNameDataIsTableSorted = this.htmlConfigurationAttributesReader.getValueFromAttributes(this.attributesForHtmlTable.tableAttributes.dataAttributes.isTableSorted); // "data-isTableSorted";
        this.attributeNameDataIsTableSortedAscend = this.htmlConfigurationAttributesReader.getValueFromAttributes(this.attributesForHtmlTable.tableAttributes.dataAttributes.isTableSortedAscend); // "data-isTableSortedAscend";
        this.attributeNameDataLastSortedColumnNumber = this.htmlConfigurationAttributesReader.getValueFromAttributes(this.attributesForHtmlTable.tableAttributes.dataAttributes.lastSortedColumnNumber); // "data-lastSortedColumnNumber";
        this.isTableSorted = this.htmlTableDomUpdater.parseAttributeAboutTableSorting(tableId, this.attributeNameDataIsTableSorted, true);
        this.isTableSortedAscend = this.htmlTableDomUpdater.parseAttributeAboutTableSorting(tableId, this.attributeNameDataIsTableSortedAscend, true);
        this.lastClickedSortingButton = this.getLastClickedSortingButtonFromAttribute(this.styleNameForSortAscendingButton, this.styleNameForSortDescendingButton);
        this.penultimateClickedSortingButton = null; // pre-last clicked sorting button
    }


    setFlagIsTableSorted(isTableSorted)
    {
        this.isTableSorted = isTableSorted;
    }


    setFlagIsTableSortedAscend(isTableSortedAscend)
    {
        this.isTableSortedAscend = isTableSortedAscend;
    }


    // update attributes in tag table
    setAttributesAboutTableSorting(columnIndexToSortBy)
    {
        this.htmlTableDomUpdater.setAttributeAboutTableSorting(this.tableId, this.attributeNameDataIsTableSorted, `${this.isTableSorted}`);
        this.htmlTableDomUpdater.setAttributeAboutTableSorting(this.tableId, this.attributeNameDataIsTableSortedAscend, `${this.isTableSortedAscend}`);
        this.htmlTableDomUpdater.setAttributeAboutTableSorting(this.tableId, this.attributeNameDataLastSortedColumnNumber, `${columnIndexToSortBy}`);
    }


    getLastClickedSortingButtonFromAttribute(styleNameForSortAscendingButton, styleNameForSortDescendingButton)
    {
        let columnIndexUnparsed = this.htmlTableDomUpdater.getAttributeAboutTableSorting(this.tableId, this.attributeNameDataLastSortedColumnNumber);
        let columnIndex = parseInt(columnIndexUnparsed, 10);
        if (isNaN(columnIndex))
        {
            return null;
        }
        let isLastClickedAscendSortingButton = this.htmlTableDomUpdater.parseAttributeAboutTableSorting(this.tableId, this.attributeNameDataIsTableSortedAscend, true);
        let selectedClassNameOfSortingButton = this.htmlTableDomUpdater.selectStyleNameForSortingButton(isLastClickedAscendSortingButton, styleNameForSortAscendingButton, styleNameForSortDescendingButton);
        let sortingButtonsByColumnIndex = this.htmlTableDomUpdater.getSortingButtonsByColumnIndex(this.tableId, columnIndex, selectedClassNameOfSortingButton);
        return sortingButtonsByColumnIndex[0];
    }


    setTableSortingFlags(isAscendSortingButton)
    {
        this.isTableSorted = !this.isTableSorted;
        this.isTableSortedAscend = this.isTableSorted ? isAscendSortingButton : null;
    }


    setLastPenultimateClickedSortingButtons(lastClickedSortingButton)
    {
        this.penultimateClickedSortingButton = this.lastClickedSortingButton;
        this.lastClickedSortingButton = lastClickedSortingButton;
    }
}