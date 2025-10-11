import { HtmlConfigurationAttributesReader } from '../HtmlConfigurationAttributes/HtmlConfigurationAttributesReader.js';
import { HtmlPageDomUpdater } from '../HtmlDomElementHandler/HtmlPageDomUpdater.js';
import { HtmlTableDomUpdater } from '../HtmlDomElementHandler/HtmlTableDomUpdater.js';
import { HtmlTableCreator } from '../HtmlTableBuilder/HtmlTableCreator.js';
import { HtmlTableBuilder } from '../HtmlTableBuilder/HtmlTableBuilder.js';
import { TableSearching } from '../HtmlTableOperations/TableSearching.js';
import { TableStateSorting } from '../HtmlTableOperations/TableStateSorting.js';


export class HtmlTableBuilderUpdater // Builder
{
    constructor()
    {
        this.htmlConfigurationAttributesReader = new HtmlConfigurationAttributesReader();
        this.attributesOfHtmlTable = this.htmlConfigurationAttributesReader.getHtmlTableConfigurationsForElements();

        this.htmlPageDomUpdater = new HtmlPageDomUpdater();
        this.htmlTableDomUpdater = new HtmlTableDomUpdater();

        this.attributeNameRowViewOrderNumberInInitialUnsortedTable = this.htmlConfigurationAttributesReader.getValueFromAttributes(this.attributesOfHtmlTable.trForRowAttributes.dataAttributes.rowViewOrderNumberInInitialUnsortedTable); // "data-tableRowViewOrderNumberInInitialUnsortedTable"
        this.htmlTableCreator = new HtmlTableCreator(new HtmlTableBuilder());
    }


    updateCellContentOfHtmlTable(idTable, statusForCell, isCellLoaderSequentiallyOn)
    {
        // updating cell with text and text if text need to be updated
        this.updateStyleTextAndContentInCell(idTable, statusForCell);

        // updating cell loader
        this.updateStyleCellLoader(idTable, statusForCell, isCellLoaderSequentiallyOn);
    }


    // ?????
    // updateCellContentOfHtmlTable for every cell in row
    updateRowContentOfHtmlTable(idTable, statusesForHtmlTable, isCellLoaderSequentiallyOn, rowIndex)
    {
        let currentRow = statusesForHtmlTable[rowIndex];

        for (var columnIndex = 0; columnIndex < currentRow.length; columnIndex++)
        {
            let statusForCell = statusesForHtmlTable[rowIndex][columnIndex];
            this.updateCellContentOfHtmlTable(idTable, statusForCell, isCellLoaderSequentiallyOn);
        }
    }


    // update text and style of tag related to cell text
    updateStyleTextAndContentInCell(idTable, statusForCell)
    {
        let tableDomElement = this.htmlPageDomUpdater.getHtmlPageDomElement(idTable);
        let rowViewOrderNumberInInitialUnsortedTableAttributeName = `"${statusForCell.rowIndexStartedFromZeroInHtmlTable}"`; // rows in html-table start from 0
        let columnIndex = statusForCell.columnIndexStartedFromOneInHtmlTable; // columns in html-table start from 1

        let trDomElement = this.htmlPageDomUpdater.getDomElementsInsideParentByAttributeNameValue(tableDomElement, this.attributeNameRowViewOrderNumberInInitialUnsortedTable, rowViewOrderNumberInInitialUnsortedTableAttributeName)[0];

        // updating cell with text

        let classNameWithoutDotForPTag = this.htmlConfigurationAttributesReader.getClassFromAttributes(this.attributesOfHtmlTable.pTextInsideCellAttributes.defaultAttributes);

        let additionalClassNameWithoutDotForPTag = this.htmlConfigurationAttributesReader.getClassFromAttributes(this.attributesOfHtmlTable.pTextInsideCellAttributes.additionalStyleOnTextUpdated);

        let domElementWithTextToBeUpdated = this.htmlTableDomUpdater.getCellDomElementByAttributes(trDomElement, columnIndex, "class", classNameWithoutDotForPTag);

        this.updateCellStyleOfHtmlTable(domElementWithTextToBeUpdated, statusForCell, additionalClassNameWithoutDotForPTag);

        if (statusForCell.toBeUpdated)
        {
            let newText = statusForCell.cellValueInCurrentDataTable;
            this.htmlTableDomUpdater.updateTextInsideDomElement(domElementWithTextToBeUpdated, newText);
        }
    }


    // ?????
    // update style of tag related to cellLoader
    updateStyleCellLoader(idTable, statusForCell, isCellLoaderSequentiallyOn)
    {
        let tableDomElement = this.htmlPageDomUpdater.getHtmlPageDomElement(idTable);
        let rowViewOrderNumberInInitialUnsortedTableAttributeName = `"${statusForCell.rowIndexStartedFromZeroInHtmlTable}"`; // rows in html-table start from 0
        let columnIndex = statusForCell.columnIndexStartedFromOneInHtmlTable; // columns in html-table start from 1

        let trDomElement = this.htmlPageDomUpdater.getDomElementsInsideParentByAttributeNameValue(tableDomElement, this.attributeNameRowViewOrderNumberInInitialUnsortedTable, rowViewOrderNumberInInitialUnsortedTableAttributeName)[0];

        // updating cell loader
        let classNameWithoutDotForCellLoadingTag = this.htmlConfigurationAttributesReader.getClassFromAttributes(this.attributesOfHtmlTable.divCellLoaderAttributes.defaultAttributes);

        let additionalStyleOnCellLoader = isCellLoaderSequentiallyOn ? this.attributesOfHtmlTable.divCellLoaderAttributes.additionalStyleOnCellLoaderSequentiallyOn :
            this.attributesOfHtmlTable.divCellLoaderAttributes.additionalStyleOnCellLoaderIndividuallyOn
        let additionalClassNameWithoutDotForCellLoadingTag = this.htmlConfigurationAttributesReader.getClassFromAttributes(additionalStyleOnCellLoader);

        let domElementWithCellLoading = this.htmlTableDomUpdater.getCellDomElementByAttributes(trDomElement, columnIndex, "class", classNameWithoutDotForCellLoadingTag);

        // DO NOT DELETE: add handler to remove additional style in div related with cellLoader after ending animation of cellLoader
        // it need to prevent browser optimization that did not remove additional style for div cellLoader if additional style is removed and
        this.removeAdditionalStylesAfterEndAnimation(domElementWithCellLoading);

        this.updateCellStyleOfHtmlTable(domElementWithCellLoading, statusForCell, additionalClassNameWithoutDotForCellLoadingTag);
    }


    updateCellStyleOfHtmlTable(domElementWithTextToBeUpdated, statusForCell, newAdditionalStyleNameWithoutDot)
    {
        let lastStyleName = domElementWithTextToBeUpdated.classList[domElementWithTextToBeUpdated.classList.length - 1];

        if (statusForCell.unchanged && lastStyleName === newAdditionalStyleNameWithoutDot) // remove additional style
        {
            domElementWithTextToBeUpdated.classList.toggle(newAdditionalStyleNameWithoutDot);
        }

        if (statusForCell.toBeUpdated && lastStyleName !== newAdditionalStyleNameWithoutDot)
        {
            domElementWithTextToBeUpdated.classList.toggle(newAdditionalStyleNameWithoutDot);
        }

        // ?????
        if (statusForCell.toBeAdded && lastStyleName !== newAdditionalStyleNameWithoutDot)
        {
            domElementWithTextToBeUpdated.classList.toggle(newAdditionalStyleNameWithoutDot);
        }
    }


    // remove additional style in div related with cellLoader
    removeAdditionalStylesAfterEndAnimation(domElementToRemoveAdditionalStyles)
    {
        domElementToRemoveAdditionalStyles.addEventListener("animationend", function (evn)
        {
            let additionalStyleOnCellLoaderSequentiallyOn = this.attributesOfHtmlTable.divCellLoaderAttributes.additionalStyleOnCellLoaderSequentiallyOn;
            let additionalStyleOnCellLoaderIndividuallyOn = this.attributesOfHtmlTable.divCellLoaderAttributes.additionalStyleOnCellLoaderIndividuallyOn;

            let cellLoaderSequentiallyOn = this.htmlConfigurationAttributesReader.getClassFromAttributes(additionalStyleOnCellLoaderSequentiallyOn);
            let cellLoaderIndividuallyOn = this.htmlConfigurationAttributesReader.getClassFromAttributes(additionalStyleOnCellLoaderIndividuallyOn);

            // check is animation end source is related to styles cellLoaderSequentiallyOn cellLoaderIndividuallyOn
            if (this.htmlPageDomUpdater.isContainSpecifiedAdditionalStyle(domElementToRemoveAdditionalStyles, cellLoaderSequentiallyOn) ||
                this.htmlPageDomUpdater.isContainSpecifiedAdditionalStyle(domElementToRemoveAdditionalStyles, cellLoaderIndividuallyOn))
            {
                this.htmlPageDomUpdater.removeAllAdditionalStyleNames(domElementToRemoveAdditionalStyles);
            }

        }.bind(this),
            { once: true });
    }


    // Add a new row into html-table
    addTableRow(idTable, idTableSearchInput, rowStatusToBeAdded)
    {
        this.resetTableSortings(idTable);
        this.clearTableSearchInput(idTableSearchInput);

        let textRow = this.convertToTextArrayToBeUpdated(rowStatusToBeAdded);
        let tr = this.htmlTableCreator.constructTableRow(textRow, rowStatusToBeAdded[0].rowIndexStartedFromZeroInHtmlTable);

        this.addEventHandlersToAddedTableRow(idTable, tr.getCreatedDomElement());

        let tbodyTagName = this.attributesOfHtmlTable.tbodyAttributes.tag;
        let tbody = this.htmlPageDomUpdater.getChildrenDomElementsByParentIdAndChildrenTag(idTable, tbodyTagName)[0];
        tbody.insertAdjacentElement("beforeend", tr.getCreatedDomElement());
    }


    addEventHandlersToAddedTableRow(idTable, trDomElement)
    {
        let tableSearching = new TableSearching(idTable, null); // idTableSearchInput = null is no necessary here

        tableSearching.tableRowMouseEnterLeaveHandler(trDomElement, 'mouseenter');
        tableSearching.tableRowMouseEnterLeaveHandler(trDomElement, 'mouseleave');
    }

    // ????
    // If table is soreted before addintion a new row, then the table should be unsorted before new row will be added
    resetTableSortings(idTable)
    {
        let tableStateSorting = new TableStateSorting(idTable);

        if (tableStateSorting.isTableSorted)
        {
            tableStateSorting.lastClickedSortingButton.click();
        }
    }

    // ????
    // If table has already filtered (via table search input) before addintion a new row, then search input shold be cleaned and fired event "input"
    clearTableSearchInput(idTableSearchInput)
    {
        let tableSearchInputDomElement = this.htmlPageDomUpdater.getDomElementOnPageById(idTableSearchInput);

        if (tableSearchInputDomElement.value === "")
        {
            return;
        }

        tableSearchInputDomElement.value = "";

        let inputEvent = new Event("input", { bubbles: true, cancelable: true, });

        tableSearchInputDomElement.dispatchEvent(inputEvent);
    }


    // private
    convertToTextArrayToBeUpdated(rowsWithStatusesToBeAdded)
    {
        let textArrayToBeAdded = [];

        rowsWithStatusesToBeAdded.forEach(rowStatusesObject =>
        {
            let textOfRowFromStatuses = rowStatusesObject.cellValueInCurrentDataTable;

            textArrayToBeAdded.push(textOfRowFromStatuses);
        });

        return textArrayToBeAdded;
    }

}