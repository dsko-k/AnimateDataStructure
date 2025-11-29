import { AbstractTableEffect } from './AbstractTableEffect.js';
import { TableStateSorting } from './TableStateSorting.js';


export class TableSearching extends AbstractTableEffect
{
    constructor(tableId, idTableSearchInput)
    {
        super(tableId);
        this.idTableSearchInput = idTableSearchInput;
    }

    // method-wrapper to use in ContextTableEffect with the same name in all derived classes from AbstractTableEffec
    addHandlerForTableOperation()
    {
        this.onTableSearch(this.tableId);
    }

    // Search in table
    // After search - sorting buttons always shown.
    // If table is sorted and then search - previously clicked sorting button is reset to unsorted statr and always shown

    onTableSearch(tableId)
    {
        let tableSearchInputDomElement = this.htmlPageDomUpdater.getHtmlPageDomElement(this.idTableSearchInput);
        tableSearchInputDomElement.addEventListener("input", function (evn)
        {
            // If table header hovered during search, then before search dispatch event 'mouseleave' to correctly display hovered column
            this.onMouseAboveTableHeaderDuringSearchInTable(false, this.thDomElementClassName);
            this.searchInTable(tableId, tableSearchInputDomElement);
            // If table header hovered during search, then after search dispatch event 'mouseenter' to correctly display hovered column
            this.onMouseAboveTableHeaderDuringSearchInTable(true, this.thDomElementClassName);
        }.bind(this));
        this.onTableRowMouseEnterLeave(tableId);
    }


    // Table always is unsorted after search!!!!
    searchInTable(tableId, tableSearchInputDomElement)
    {
        this.tableState = new TableStateSorting(tableId);        
        if (this.tableState.isTableSorted)
        {
            //add background color To Sorting Button
            this.htmlTableDomUpdater.toggleBackgroundColorToSortingButton(this.tableState.lastClickedSortingButton, this.tableState.isTableSortedAscend, this.styleNameOnClickSortAscendingButton, this.styleNameOnClickSortDescendingButton);
        }
        // sorting flags should be only in this order
        this.tableState.setFlagIsTableSorted(false); //this.isTableSorted = false;
        let allSortingButtons = this.htmlTableDomUpdater.getAllTableSortingButtons(this.thDomElementClassName, this.styleNameForSortAscendingButton, this.styleNameForSortDescendingButton);
        this.htmlTableDomUpdater.showHiddenSortingButtonsAfterSearch(this.tableState.isTableSorted, this.tableState.isTableSortedAscend, this.tableState.lastClickedSortingButton, allSortingButtons);
        this.tableState.setFlagIsTableSortedAscend(null); //this.isTableSortedAscend = null;
        let tableTRs = this.htmlTableDomUpdater.getRowsInTable(tableId, 1);
        let counterForRowsToBeDisplayed = 0;
        this.updateRowsStylesAboutSearching(tableTRs, counterForRowsToBeDisplayed, tableSearchInputDomElement);        
        this.tableState.setAttributesAboutTableSorting(null); // update attributes in tag table
    }


    //private
    updateRowsStylesAboutSearching(tableTRs, intialValueForCounterForRowsToBeDisplayed, tableSearchInputDomElement) // intialCounterForRowsToBeDisplayed = 0
    {
        let counterForRowsToBeDisplayed = intialValueForCounterForRowsToBeDisplayed;
        tableTRs.forEach(trDomElement =>
        {
            let isRowToBeHidden = this.htmlTableDomUpdater.isRowToBeHiddenAfterSearching(trDomElement, tableSearchInputDomElement);
            let orderNumber = isRowToBeHidden ? `${null}` : counterForRowsToBeDisplayed;
            this.htmlTableDomUpdater.setTableDomElementAttribute(trDomElement, this.attributeNameDataTableRowViewOrderNumber, orderNumber); // rowViewOrderNumber = "null" if row has to be hidden
            this.htmlTableDomUpdater.setTableDomElementAttribute(trDomElement, this.attributeNameDataIsSortedTableRow, false); // false always after search (search always show unordered result)
            this.htmlTableDomUpdater.setTableDomElementAttribute(trDomElement, this.attributeNameDataIsTableRowToBeHidden, isRowToBeHidden);
            this.htmlTableDomUpdater.setDelayBeforeRowAnimation(trDomElement, this.attributeNameDataTableRowViewOrderNumberInInitialUnsortedTable, this.cssVariableNameToDelayRowAnimation);            
            this.htmlTableDomUpdater.updateStyleAboutRowHiddenDisplayed(trDomElement, isRowToBeHidden, this.cssVariableNameRowDisplayState, this.styleNameToHideTableRow);
            this.htmlTableDomUpdater.removeTableRowInlineStyleProperty(trDomElement, this.cssVariableNameToPlaceRowAfterSorting);
            if (!isRowToBeHidden)
            {
                counterForRowsToBeDisplayed++;
                let isRowEvenAfterSearch = counterForRowsToBeDisplayed % 2 === 0;
                if (isRowEvenAfterSearch)
                {
                    this.htmlTableDomUpdater.changeTableRowColorForEvenRow(trDomElement, this.cssVariableNameRowColor, this.cssVariableValueColorForEvenRow);
                }
                else
                {
                    this.htmlTableDomUpdater.changeTableRowColorForOddRow(trDomElement, this.cssVariableNameRowColor, this.cssVariableValueColorForOddRow);
                }
            }
        });
    }

    // When mouse hovered on table header and simultaniously commits live searching in the table, correct highlighting of hovered row should be done
    // If table header hovered during search, then after search dispatch event 'mouseenter'
    // If table header hovered during search, then before search dispatch event 'mouseleave'
    onMouseAboveTableHeaderDuringSearchInTable(isToDispatchMouseEnter, thDomElementClassName)
    {
        let foundThDomElements = this.htmlPageDomUpdater.getDomElementsOnPageByStyleName(thDomElementClassName);

        [...foundThDomElements].forEach(thDomElement =>
        {
            if (thDomElement.matches(':hover'))
            {
                let mouseEventToDispatch = isToDispatchMouseEnter ? new Event('mouseenter') : new Event('mouseleave');
                thDomElement.dispatchEvent(mouseEventToDispatch);
                return;
            }
        });
    }


    onTableRowMouseEnterLeave(tableId)
    {
        let tableRows = this.htmlTableDomUpdater.getRowsInTable(tableId, 1);
        let rows = this.htmlTableDomUpdater.getTableRowsToBeDisplayed(tableRows, this.attributeNameDataIsTableRowToBeHidden);
        rows.forEach(trDomElement =>
        {
            this.tableRowMouseEnterLeaveHandler(trDomElement, 'mouseenter');
            this.tableRowMouseEnterLeaveHandler(trDomElement, 'mouseleave');
        });
    }


    tableRowMouseEnterLeaveHandler(trDomElement, eventName)
    {
        if (!eventName || eventName === "")
        {
            throw new Error("Incorrect event name");
        }
        trDomElement.addEventListener(eventName, function (evn)
        {
            let trDomElement = evn.target;
            let isRowEven = !this.htmlTableDomUpdater.isEvenRowViewOrderNumber(trDomElement, this.attributeNameDataTableRowViewOrderNumber);
            this.setRowColorOnMouseEnter(trDomElement, isRowEven, eventName);
            this.setRowColorOnMouseLeave(trDomElement, isRowEven, eventName);
        }.bind(this));
    }


    setRowColorOnMouseEnter(trDomElement, isRowEven, eventName)
    {
        if (eventName !== 'mouseenter')
        {
            return;
        }
        if (isRowEven)
        {
            this.htmlTableDomUpdater.changeTableRowColorForEvenRow(trDomElement, this.cssVariableNameRowColor, this.cssVariableValueColorForEvenRowHover);
            return;
        }
        this.htmlTableDomUpdater.changeTableRowColorForOddRow(trDomElement, this.cssVariableNameRowColor, this.cssVariableValueColorForOddRowHover);
    }


    setRowColorOnMouseLeave(trDomElement, isRowEven, eventName)
    {
        if (eventName !== 'mouseleave')
        {
            return;
        }
        if (isRowEven)
        {
            this.htmlTableDomUpdater.changeTableRowColorForEvenRow(trDomElement, this.cssVariableNameRowColor, this.cssVariableValueColorForEvenRow);
            return;
        }
        this.htmlTableDomUpdater.changeTableRowColorForOddRow(trDomElement, this.cssVariableNameRowColor, this.cssVariableValueColorForOddRow);
    }
}