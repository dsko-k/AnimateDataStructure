import { HtmlPageDomUpdater } from '../HtmlDomElementHandler/HtmlPageDomUpdater.js';
import { HtmlTableDomUpdater } from '../HtmlDomElementHandler/HtmlTableDomUpdater.js';
import { HtmlConfigurationAttributesReader } from '../HtmlConfigurationAttributes/HtmlConfigurationAttributesReader.js';

export class AbstractTableEffect // Base abstract class
{
    constructor(tableId)
    {
        this.tableId = tableId;
        this.htmlPageDomUpdater = new HtmlPageDomUpdater();
        this.htmlTableDomUpdater = new HtmlTableDomUpdater();
        this.htmlConfigurationAttributesReader = new HtmlConfigurationAttributesReader();
        this.attributesForHtmlTable = this.htmlConfigurationAttributesReader.getHtmlTableConfigurationsForElements();
        this.thDomElementClassName = this.htmlConfigurationAttributesReader.getClassFromAttributesWithDot(this.attributesForHtmlTable.thAttributes.defaultAttributes); // ".headerColumn"
        this.divCellEvenAdditionalStyleNameOnHoverColumn = this.htmlConfigurationAttributesReader.getClassFromAttributesWithDot(this.attributesForHtmlTable.divCellAttributes.additionalStyleDivCellBelongedToEvenRow); // ".cellEvenOnMouseEnterTableColumn"
        this.divCellOddAdditionalStyleNameOnHoverColumn = this.htmlConfigurationAttributesReader.getClassFromAttributesWithDot(this.attributesForHtmlTable.divCellAttributes.additionalStyleDivCellBelongedToOddRow); // ".cellOddOnMouseEnterTableColumn"
        this.styleNameForDivCell = this.htmlConfigurationAttributesReader.getClassFromAttributesWithDot(this.attributesForHtmlTable.divCellAttributes.defaultAttributes); // ".cell"
        this.styleNameForTextInsideTableCell = this.htmlConfigurationAttributesReader.getClassFromAttributesWithDot(this.attributesForHtmlTable.pTextInsideCellAttributes.defaultAttributes); // ".textInsideCell"
        this.styleNameForSortAscendingButton = this.htmlConfigurationAttributesReader.getClassFromAttributesWithDot(this.attributesForHtmlTable.sortAscendingButtonAttributes.defaultAttributes); // ".sortAscendingButton"
        this.styleNameForSortDescendingButton = this.htmlConfigurationAttributesReader.getClassFromAttributesWithDot(this.attributesForHtmlTable.sortDescendingButtonAttributes.defaultAttributes); // ".sortDescendingButton"
        this.styleNameOnClickSortAscendingButton = this.htmlConfigurationAttributesReader.getClassFromAttributesWithDot(this.attributesForHtmlTable.sortAscendingButtonAttributes.onClickAttributes); // ".sortAscendingButtonOnClick"
        this.styleNameOnClickSortDescendingButton = this.htmlConfigurationAttributesReader.getClassFromAttributesWithDot(this.attributesForHtmlTable.sortDescendingButtonAttributes.onClickAttributes); // ".sortDescendingButtonOnClick"        
        this.styleNameToHideTableRow = this.htmlConfigurationAttributesReader.getClassFromAttributesWithDot(this.attributesForHtmlTable.trForRowAttributes.hideTableRowAttributes);// ".hideTableRow";
        this.styleNameToSortTableRow = this.htmlConfigurationAttributesReader.getClassFromAttributesWithDot(this.attributesForHtmlTable.trForRowAttributes.sortTableRowAttributes); // ".sortedRow";
        this.cssVariableNameToPlaceRowAfterSorting = this.htmlConfigurationAttributesReader.getValueFromAttributes(this.attributesForHtmlTable.trForRowAttributes.cssVariables.rowYCoordinateAfterSorting); // "--translateYForSorting";
        this.cssVariableNameToDelayRowAnimation = this.htmlConfigurationAttributesReader.getValueFromAttributes(this.attributesForHtmlTable.trForRowAttributes.cssVariables.rowDelayAnimation); // "--delayBeforeRemoveRow";
        this.cssVariableNameRowDisplayState = this.htmlConfigurationAttributesReader.getValueFromAttributes(this.attributesForHtmlTable.trForRowAttributes.cssVariables.rowDisplayState); // "--displayState";
        this.cssVariableNameRowColor = this.htmlConfigurationAttributesReader.getValueFromAttributes(this.attributesForHtmlTable.divContentOfCellWithGlowingRadialBorderAttributes.cssVariables.backgroundColor); // "--backgroundColorOfContentOfCellWithGlowingRadialBorder";
        this.cssVariableValueColorForEvenRow = this.htmlConfigurationAttributesReader.getValueFromAttributes(this.attributesForHtmlTable.divContentOfCellWithGlowingRadialBorderAttributes.backgroundColor.rowEven); // "rgba(25,25,25)"; // same as style tr:nth-child(even)
        this.cssVariableValueColorForOddRow = this.htmlConfigurationAttributesReader.getValueFromAttributes(this.attributesForHtmlTable.divContentOfCellWithGlowingRadialBorderAttributes.backgroundColor.rowOdd); // "#090a4e"; // same as style tr:nth-child(odd)
        this.cssVariableValueColorForEvenRowHover = this.htmlConfigurationAttributesReader.getValueFromAttributes(this.attributesForHtmlTable.divContentOfCellWithGlowingRadialBorderAttributes.backgroundColor.rowEvenOnHover); // "rgba(45,45,45)"; // same as style tr:nth-child(even)
        this.cssVariableValueColorForOddRowHover = this.htmlConfigurationAttributesReader.getValueFromAttributes(this.attributesForHtmlTable.divContentOfCellWithGlowingRadialBorderAttributes.backgroundColor.rowOddOnHover); // "#0b0d75"; // same as style tr:nth-child(odd)        
        this.attributeNameDataTableRowViewOrderNumber = this.htmlConfigurationAttributesReader.getValueFromAttributes(this.attributesForHtmlTable.trForRowAttributes.dataAttributes.rowViewOrderNumber); // "data-tableRowViewOrderNumber";
        this.attributeNameDataTableRowViewOrderNumberInInitialUnsortedTable = this.htmlConfigurationAttributesReader.getValueFromAttributes(this.attributesForHtmlTable.trForRowAttributes.dataAttributes.rowViewOrderNumberInInitialUnsortedTable); // "data-tableRowViewOrderNumberInInitialUnsortedTable";
        this.attributeNameDataIsSortedTableRow = this.htmlConfigurationAttributesReader.getValueFromAttributes(this.attributesForHtmlTable.trForRowAttributes.dataAttributes.isSortedTableRow); // "data-isSortedTableRow";
        this.attributeNameDataIsTableRowToBeHidden = this.htmlConfigurationAttributesReader.getValueFromAttributes(this.attributesForHtmlTable.trForRowAttributes.dataAttributes.isTableRowToBeHidden); // "data-isTableRowToBeHidden";
    }
}