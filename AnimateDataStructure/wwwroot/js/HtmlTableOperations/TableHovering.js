import { AbstractTableEffect } from './AbstractTableEffect.js';

export class TableHovering extends AbstractTableEffect
{
    constructor(tableId)
    {
        super(tableId);
    }

    // method-wrapper to use in ContextTableEffect with the same name in all derived classes from AbstractTableEffec
    addHandlerForTableOperation()
    {
        this.onTableHeaderMouseEnterLeave(this.tableId);
    }


    // Highlight table column on hover header of table th
    onTableHeaderMouseEnterLeave(tableId)
    {
        let foundThDomElements = this.htmlPageDomUpdater.getDomElementsOnPageByStyleName(this.thDomElementClassName);
        foundThDomElements.forEach(thDomElement =>
        {
            this.tableHeaderMouseEnterLeaveHandler(tableId, thDomElement, 'mouseenter');
            this.tableHeaderMouseEnterLeaveHandler(tableId, thDomElement, 'mouseleave');
        });
    }


    tableHeaderMouseEnterLeaveHandler(tableId, thDomElement, eventName)
    {
        if (!eventName || eventName === "")
        {
            throw new Error("Incorrect event name");
        }
        thDomElement.addEventListener(eventName, function (evn)
        {
            let columnIndexOfHoveredTh = thDomElement.cellIndex;
            let tdDomElementsByColumnInViewOrder = this.htmlTableDomUpdater.getDisplayedColumnTdsInViewOrder(tableId, columnIndexOfHoveredTh, this.attributeNameDataIsTableRowToBeHidden, this.attributeNameDataTableRowViewOrderNumber);
            // toggle class name for even and odd tds (root div inside td) when mouse enter, mouse leave
            let evenTds = this.htmlTableDomUpdater.getEvenOddTdsOfTableColumn(tdDomElementsByColumnInViewOrder, true);
            let oddTds = this.htmlTableDomUpdater.getEvenOddTdsOfTableColumn(tdDomElementsByColumnInViewOrder, false);
            let divCellEvenAdditionalStyleNameOnHoverColumnWithoutDot = this.htmlPageDomUpdater.trimSymbolAtStart(this.divCellEvenAdditionalStyleNameOnHoverColumn, ".");
            let divCellOddAdditionalStyleNameOnHoverColumnWithoutDot = this.htmlPageDomUpdater.trimSymbolAtStart(this.divCellOddAdditionalStyleNameOnHoverColumn, ".");
            this.htmlTableDomUpdater.toggleClassNameOfRootDivInsideTds(evenTds, divCellEvenAdditionalStyleNameOnHoverColumnWithoutDot, this.styleNameForDivCell);
            this.htmlTableDomUpdater.toggleClassNameOfRootDivInsideTds(oddTds, divCellOddAdditionalStyleNameOnHoverColumnWithoutDot, this.styleNameForDivCell);
        }.bind(this));
    }
}