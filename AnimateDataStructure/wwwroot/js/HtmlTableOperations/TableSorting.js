import { AbstractTableEffect } from './AbstractTableEffect.js';
import { TableStateSorting } from './TableStateSorting.js';

export class TableSorting extends AbstractTableEffect
{
    constructor(tableId)
    {
        super(tableId);
    }

    // method-wrapper to use in ContextTableEffect with the same name in all derived classes from AbstractTableEffec
    addHandlerForTableOperation()
    {
        this.onClickButtonSortTable(this.tableId);
    }

    createTableModel(idTable, columnIndexToSortBy)
    {
        let tableObject = [];
        let rowsInTable = this.htmlTableDomUpdater.getRowsInTable(idTable, 1);
        let tableRowsToBeDisplayed = this.htmlTableDomUpdater.getTableRowsToBeDisplayed(rowsInTable, this.attributeNameDataIsTableRowToBeHidden);
        tableRowsToBeDisplayed.forEach((row, rowIndexBeforeSorting) =>
        {
            let rowInfo = this.initializeRowInfo(row, rowIndexBeforeSorting, null, columnIndexToSortBy, this.styleNameForTextInsideTableCell);
            tableObject.push(rowInfo);
        });
        return tableObject;
    }


    initializeRowInfo(trDomElement, rowIndexBeforeSorting, rowIndexAfterSorting, columnIndexToSortBy, styleNameForTextInsideTableCell)
    {
        return {
            trDomElement: trDomElement,
            rowIndexBeforeSorting: rowIndexBeforeSorting,
            xCoordinateBeforeSorting: this.htmlTableDomUpdater.getCoordinateTrDomElement(trDomElement, true),
            yCoordinateBeforeSorting: this.htmlTableDomUpdater.getCoordinateTrDomElement(trDomElement, false),
            valueToBeSorted: this.htmlTableDomUpdater.extractTextInsideTableCell(trDomElement, columnIndexToSortBy, styleNameForTextInsideTableCell),
            isRowEvenAfterSorting: null,
            rowIndexAfterSorting: rowIndexAfterSorting,
            xCoordinateAfterSorting: null,
            yCoordinateAfterSorting: null,
        };
    }


    findCoordinateAfterSorting(sortedTableObject, rowIndexAfterSorting, isGetXCoordinate)
    {
        let foundSortedTr = sortedTableObject.filter(trObj => trObj.rowIndexBeforeSorting === rowIndexAfterSorting);
        let indexBeforeSorting = foundSortedTr[0].rowIndexAfterSorting;
        return isGetXCoordinate ? sortedTableObject[indexBeforeSorting].xCoordinateBeforeSorting : sortedTableObject[indexBeforeSorting].yCoordinateBeforeSorting;
    }


    sortTable(tableObject, columnIndexToSortBy, isOredingByDecsending, isSortAsStrings)
    {
        return tableObject.sort((tableRowObjA, tableRowObjB) =>
        {
            let contentInCellA = this.htmlTableDomUpdater.extractTextInsideTableCell(tableRowObjA.trDomElement, columnIndexToSortBy, this.styleNameForTextInsideTableCell);
            let contentInCellB = this.htmlTableDomUpdater.extractTextInsideTableCell(tableRowObjB.trDomElement, columnIndexToSortBy, this.styleNameForTextInsideTableCell);
            if (isSortAsStrings)
            {
                return this.compareStrings(contentInCellA, contentInCellB, isOredingByDecsending);
            }
            return this.compareNumbers(contentInCellA, contentInCellB, isOredingByDecsending);
        });
    }


    compareNumbers(contentFirst, contentSecond, isOredingByDecsending)
    {
        let parsedNumberInCellA = parseFloat(contentFirst);
        let parsedNumberInCellB = parseFloat(contentSecond);
        return isOredingByDecsending ? parsedNumberInCellA - parsedNumberInCellB : parsedNumberInCellB - parsedNumberInCellA;
    }


    compareStrings(contentFirst, contentSecond, isOredingByDecsending)
    {
        let stringComparison = contentFirst < contentSecond ? 1 : (contentFirst === contentSecond ? 0 : -1);
        if (isOredingByDecsending)
        {
            stringComparison = contentFirst < contentSecond ? -1 : (contentFirst === contentSecond ? 0 : 1);
        }
        return stringComparison;
    }


    onClickButtonSortTable(tableId)
    {
        this.addHandlersForSortingButtons(tableId, true);
        this.addHandlersForSortingButtons(tableId, false);
    }


    addHandlersForSortingButtons(tableId, isAscendSortingButton)
    {
        let styleNameForSortingButton = this.htmlTableDomUpdater.selectStyleNameForSortingButton(isAscendSortingButton, this.styleNameForSortAscendingButton, this.styleNameForSortDescendingButton);
        let sortingButtons = this.htmlTableDomUpdater.getSortingButtonsInTableHeadersByStyleName(styleNameForSortingButton, this.thDomElementClassName);

        sortingButtons.forEach((sortingButton, columnIndexToSortBy) =>
        {
            sortingButton.addEventListener("click", function (evn)
            {
                this.tableState = new TableStateSorting(tableId);
                this.tableState.setLastPenultimateClickedSortingButtons(evn.target);
                this.tableState.setTableSortingFlags(isAscendSortingButton);
                if (!this.tableState.isTableSorted)
                {
                    this.htmlPageDomUpdater.removeLastAdditionalStyleName(evn.target);
                }
                else // add background color To Sorting Button
                {                    
                    this.htmlTableDomUpdater.toggleBackgroundColorToSortingButton(evn.target, this.tableState.isTableSortedAscend, this.styleNameOnClickSortAscendingButton, this.styleNameOnClickSortDescendingButton);
                }

                let allSortingButtons = this.htmlTableDomUpdater.getAllTableSortingButtons(this.thDomElementClassName, this.styleNameForSortAscendingButton, this.styleNameForSortDescendingButton);
                this.htmlTableDomUpdater.hideShowUnusedSortingButtons(this.tableState.isTableSorted, this.tableState.lastClickedSortingButton, allSortingButtons); // invoke AFTER setting sorting flags
                let tableObject = this.createTableModel(tableId, columnIndexToSortBy);
                let isSortAsStrings = !this.htmlTableDomUpdater.canColumnBeParsedToNumbers(tableId, columnIndexToSortBy, this.styleNameForTextInsideTableCell, this.attributeNameDataIsTableRowToBeHidden);
                let sortedTableObject = this.sortTable(tableObject, columnIndexToSortBy, this.tableState.isTableSortedAscend, isSortAsStrings);
                this.assignRowInfoAfterSorting(sortedTableObject);
                this.onAfterTableSorting(sortedTableObject, columnIndexToSortBy);                
                this.tableState.setAttributesAboutTableSorting(columnIndexToSortBy); // update sorting attributes in tag table
            }.bind(this));
        });
    }


    assignRowInfoAfterSorting(sortedTableObject)
    {
        sortedTableObject.forEach((sortedTr, index) =>
        {
            sortedTr.rowIndexAfterSorting = index;
            sortedTr.isRowEvenAfterSorting = index % 2 === 0;
        });
        sortedTableObject.forEach((sortedTr, index) =>
        {
            sortedTr.xCoordinateAfterSorting = this.findCoordinateAfterSorting(sortedTableObject, index, true);
            sortedTr.yCoordinateAfterSorting = this.findCoordinateAfterSorting(sortedTableObject, index, false);
        });
    }


    onAfterTableSorting(sortedTableObject, columnIndexToSortBy)
    {
        this.updateRowsDataAttributesAfterSorting(sortedTableObject);
        this.changeRowsPositionsAfterSortingTable(sortedTableObject);
        this.updateRowsColorAfterSortingTable(sortedTableObject);
        this.updateCellsColorsAfterSortingOnHoveringColumnHeader(sortedTableObject, columnIndexToSortBy, this.divCellEvenAdditionalStyleNameOnHoverColumn, this.divCellOddAdditionalStyleNameOnHoverColumn);
    }


    changeRowsPositionsAfterSortingTable(sortedTableObject)
    {
        sortedTableObject.forEach(trObj =>
        {
            let isRowToBeHiddenAfterSort = this.htmlTableDomUpdater.isRowToBeHiddenAfterSorting(trObj.trDomElement, this.attributeNameDataIsTableRowToBeHidden);
            this.htmlTableDomUpdater.updateRowStyleNameAfterSorting(trObj.trDomElement, isRowToBeHiddenAfterSort, this.styleNameToSortTableRow);
            let rowYCoordinateAfterSorting = this.calculateYCoordinateAfterSorting(trObj);
            this.htmlTableDomUpdater.updateRowCoordinateAfterSorting(trObj, this.cssVariableNameToPlaceRowAfterSorting, rowYCoordinateAfterSorting);
        });
    }


    calculateYCoordinateAfterSorting(trObj)
    {
        let yCoordinateAfterSorting = trObj.yCoordinateAfterSorting - trObj.yCoordinateBeforeSorting;
        return yCoordinateAfterSorting;
    }


    updateRowsColorAfterSortingTable(sortedTableObject)
    {
        sortedTableObject.forEach(sortedTableRowObject =>
        {
            let isRowEvenAfterSorting = !this.htmlTableDomUpdater.isEvenRowViewOrderNumber(sortedTableRowObject.trDomElement, this.attributeNameDataTableRowViewOrderNumber);
            if (isRowEvenAfterSorting)
            {
                this.htmlTableDomUpdater.changeTableRowColorForEvenRow(sortedTableRowObject.trDomElement, this.cssVariableNameRowColor, this.cssVariableValueColorForEvenRow);
            }
            else
            {
                this.htmlTableDomUpdater.changeTableRowColorForOddRow(sortedTableRowObject.trDomElement, this.cssVariableNameRowColor, this.cssVariableValueColorForOddRow);
            }
        });
    }


    updateRowsDataAttributesAfterSorting(sortedTableObject)
    {
        sortedTableObject.forEach(trObj =>
        {
            let isRowToBeHidden = this.htmlTableDomUpdater.isRowToBeHiddenAfterSorting(trObj.trDomElement, this.attributeNameDataIsTableRowToBeHidden);
            let newRowViewIndex = this.tableState.isTableSorted ? trObj.rowIndexAfterSorting : trObj.rowIndexBeforeSorting;
            let orderNumber = isRowToBeHidden ? "null" : newRowViewIndex;
            this.htmlTableDomUpdater.setTableDomElementAttribute(trObj.trDomElement, this.attributeNameDataTableRowViewOrderNumber, orderNumber); // rowViewOrderNumber = "null" if row has to be hidden
            this.htmlTableDomUpdater.setTableDomElementAttribute(trObj.trDomElement, this.attributeNameDataIsSortedTableRow, true); // false always after search (search always show unordered result)
            this.htmlTableDomUpdater.setTableDomElementAttribute(trObj.trDomElement, this.attributeNameDataIsTableRowToBeHidden, isRowToBeHidden);
        });
    }


    updateCellsColorsAfterSortingOnHoveringColumnHeader(sortedTableObject, hoveredColumnIndex, divCellEvenAdditionalStyleNameOnHoverColumn, divCellOddAdditionalStyleNameOnHoverColumn)
    {
        sortedTableObject.forEach(sortedTableRowObject =>
        {
            let isRowEvenAfterSorting = !this.htmlTableDomUpdater.isEvenRowViewOrderNumber(sortedTableRowObject.trDomElement, this.attributeNameDataTableRowViewOrderNumber);
            let newAdditionalStyleNameForTdOnHover = this.htmlTableDomUpdater.selectAdditionalStyleNameOnHoveringTableHeader(isRowEvenAfterSorting, divCellEvenAdditionalStyleNameOnHoverColumn, divCellOddAdditionalStyleNameOnHoverColumn);
            this.htmlTableDomUpdater.changeCellColorOnHoveringTableHeader(sortedTableRowObject.trDomElement, hoveredColumnIndex, newAdditionalStyleNameForTdOnHover);
        });
    }
}