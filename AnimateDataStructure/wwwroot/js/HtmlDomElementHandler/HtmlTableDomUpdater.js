import { HtmlPageDomUpdater } from './HtmlPageDomUpdater.js';

export class HtmlTableDomUpdater
{
    constructor()
    {
        this.htmlPageDomUpdater = new HtmlPageDomUpdater();
    }


    // split toggleClassNameDivByColumnTds()
    getEvenOddTdsOfTableColumn(tdDomElementsByColumnInViewOrder, isApplyForEvenTds)
    {
        let tds = [];

        for (let i = 0; i < tdDomElementsByColumnInViewOrder.length; i++)
        {
            // add only even or only odd tds relying only on isApplyForEvenTds
            if ((isApplyForEvenTds && i % 2 === 0) || (!isApplyForEvenTds && i % 2 !== 0))
            {
                tds.push(tdDomElementsByColumnInViewOrder[i]);
            }
        }

        return tds;
    }


    // get td dom elements by specified columnIndex
    getDisplayedColumnTdsInViewOrder(tableId, columnIndex, attributeNameDataIsTableRowToBeHidden, attributeNameDataTableRowViewOrderNumber)
    {
        this.htmlPageDomUpdater.throwExceptionIfAttributeNameIsIncorrect(attributeNameDataIsTableRowToBeHidden);
        this.htmlPageDomUpdater.throwExceptionIfAttributeNameIsIncorrect(attributeNameDataTableRowViewOrderNumber);

        let tableDom = this.htmlPageDomUpdater.getHtmlPageDomElement(tableId);

        let totalRowsInTable = tableDom.rows.length;

        if (columnIndex < 0)
        {
            throw new Error(`Specified negative Column index for table ${tableId}`);
        }

        let tdByColumnIndex = [];

        for (let i = 1; i < totalRowsInTable; i++) // i = 1 to skip tr of header
        {
            let trDomElement = tableDom.rows[i];

            // excluding hidden rows
            if (this.getTableDomElementAttribute(trDomElement, attributeNameDataIsTableRowToBeHidden) === "true")
            {
                continue;
            }

            let parsedRowViewOrderNumber = this.getParsedRowViewOrderNumber(trDomElement, attributeNameDataTableRowViewOrderNumber);

            if (parsedRowViewOrderNumber !== null && columnIndex < trDomElement.cells.length)
            {
                tdByColumnIndex[parsedRowViewOrderNumber] = trDomElement.cells[columnIndex];
            }
        }

        return tdByColumnIndex;
    }


    // get table rows that should be displayed, excluding rows that should not be displayed. Table is not sorted
    getTableRowsToBeDisplayed(tableRows, attributeNameDataIsTableRowToBeHidden)
    {
        let tableObject = [];

        tableRows.forEach(row =>
        {
            if (!this.isRowToBeHiddenAfterSorting(row, attributeNameDataIsTableRowToBeHidden))
            {
                tableObject.push(row);
            }
        });

        return tableObject;
    }


    // get number of rows in html-table
    getNumberOfRowsHtmlTableIncludingHeader(tableId)
    {
        let tableDom = this.htmlPageDomUpdater.getHtmlPageDomElement(tableId);

        return tableDom.rows.length;
    }


    // get number of columns in html-table, includingHeader
    getNumberOfColumnsInHtmlTable(tableId)
    {
        let tableDom = this.htmlPageDomUpdater.getHtmlPageDomElement(tableId);

        let trDomElement = this.getTableRow(tableId, 0);

        return trDomElement.cells.length;
    }


    toggleClassNameOfRootDivInsideTds(tdDomElements, additionalStyleNameWithoutDot, styleNameOfDivInsideTd)
    {
        tdDomElements.forEach(tdDomElement =>
        {
            let rootDivInsideTd = this.htmlPageDomUpdater.getDomElementsInsideParent(tdDomElement, styleNameOfDivInsideTd)[0];
            rootDivInsideTd.classList.toggle(additionalStyleNameWithoutDot);
        });
    }


    getRowsInTable(tableId, startingRowIndex)
    {
        let tableDom = this.htmlPageDomUpdater.getHtmlPageDomElement(tableId);
        let totalRowsInTable = tableDom.rows.length;

        let trDomElements = [];

        for (let i = startingRowIndex; i < totalRowsInTable; i++)
        {
            trDomElements.push(tableDom.rows[i]);
        }

        return trDomElements;
    }


    getTdFromTableRow(trDomElement, columnIndex)
    {
        if (!trDomElement)
        {
            throw new Error(`Dom element is incorrect`);
        }

        let foundTd = trDomElement.children[columnIndex];

        if (!foundTd)
        {
            throw new Error(`Incorrect column index = ${columnIndex}. It is out of range of the table columns`);
        }

        return foundTd;
    }


    getTrDomElementByTd(tdDomElement)
    {
        return this.htmlPageDomUpdater.getParentDomElement(tdDomElement);
    }


    getTableRow(tableId, rowIndex)
    {
        let tableDom = this.htmlPageDomUpdater.getHtmlPageDomElement(tableId);

        let totalRowsInTable = tableDom.rows.length;

        if (rowIndex < 0 || rowIndex >= totalRowsInTable)
        {
            throw new Error(`Specified row index ${rowIndex} is out of range for table ${tableId}`);
        }

        return tableDom.rows[rowIndex];
    }


    isRowToBeHiddenAfterSearching(trDomElement, tableSearchInputDomElement)
    {
        let tableData = trDomElement.textContent.toLowerCase();

        //tableSearchInputDomElement.value.toLowerCase();
        let valueToSearch = this.getValueToSearchInTable(tableSearchInputDomElement, true);

        return tableData.indexOf(valueToSearch) < 0;
    }


    getValueToSearchInTable(tableSearchInputDomElement, isNormalizeToLowerCase)
    {
        return isNormalizeToLowerCase ? tableSearchInputDomElement.value.toLowerCase() : tableSearchInputDomElement.value.toUpperCase();
    }


    isRowToBeHiddenAfterSorting(trDomElement, attributeNameDataIsTableRowToBeHidden)
    {
        return this.getTableDomElementAttribute(trDomElement, attributeNameDataIsTableRowToBeHidden) === "true";
    }


    getCoordinateTrDomElement(trDomElement, isGetXCoordinate)
    {
        let cssKeyName = isGetXCoordinate ? "left" : "top";

        return trDomElement.getBoundingClientRect()[cssKeyName];
    }


    canColumnBeParsedToNumbers(tableId, columnIndex, styleNameForTextInsideTableCell, attributeNameDataIsTableRowToBeHidden)
    {
        let canAllBeParsedToNumbers = true;

        let tableRows = this.getRowsInTable(tableId, 1);

        let rows = this.getTableRowsToBeDisplayed(tableRows, attributeNameDataIsTableRowToBeHidden);

        rows.every(trDomElement =>
        {
            let textInsideCell = this.extractTextInsideTableCell(trDomElement, columnIndex, styleNameForTextInsideTableCell);

            if (isNaN(textInsideCell))
            {
                canAllBeParsedToNumbers = false;
                return false;
            }

            return true;
        });

        return canAllBeParsedToNumbers;
    }


    extractTextInsideTableCell(trDomElement, columnIndex, styleNameForTextInsideTableCell)
    {
        this.htmlPageDomUpdater.throwExceptionIfStyleNameIsIncorrect(styleNameForTextInsideTableCell);

        let tdDomElement = this.getTdFromTableRow(trDomElement, columnIndex);

        let rootDivInsideTd = this.htmlPageDomUpdater.getDomElementsInsideParent(tdDomElement, styleNameForTextInsideTableCell)[0];

        return rootDivInsideTd.textContent;
    }


    getSortingButtonsInTableHeadersByStyleName(styleNameForSortingButton, thDomElementClassName)
    {
        this.htmlPageDomUpdater.throwExceptionIfStyleNameIsIncorrect(styleNameForSortingButton);
        this.htmlPageDomUpdater.throwExceptionIfStyleNameIsIncorrect(thDomElementClassName);

        let foundThDomElements = this.htmlPageDomUpdater.getDomElementsOnPageByStyleName(thDomElementClassName);

        let foundSortingButtons = [...foundThDomElements].map(thDomElement =>
        {
            return this.getSortingButton(thDomElement, styleNameForSortingButton);
        });

        return foundSortingButtons;
    }


    selectStyleNameForSortingButton(isAscendSortingButton, styleNameForSortAscendingButton, styleNameForSortDescendingButton)
    {
        this.htmlPageDomUpdater.throwExceptionIfStyleNameIsIncorrect(styleNameForSortAscendingButton);
        this.htmlPageDomUpdater.throwExceptionIfStyleNameIsIncorrect(styleNameForSortDescendingButton);

        return isAscendSortingButton ? styleNameForSortAscendingButton : styleNameForSortDescendingButton;
    }


    getAllTableSortingButtons(thDomElementClassName, styleNameForSortAscendingButton, styleNameForSortDescendingButton)
    {
        let styleNameForSortingButtonAscend = this.selectStyleNameForSortingButton(true, styleNameForSortAscendingButton, styleNameForSortDescendingButton);
        let styleNameForSortingButtonDescend = this.selectStyleNameForSortingButton(false, styleNameForSortAscendingButton, styleNameForSortDescendingButton);

        let ascendingSortingButtons = this.getSortingButtonsInTableHeadersByStyleName(styleNameForSortingButtonAscend, thDomElementClassName);
        let descendingSortingButtons = this.getSortingButtonsInTableHeadersByStyleName(styleNameForSortingButtonDescend, thDomElementClassName)

        let allSortingButtons = [...ascendingSortingButtons, ...descendingSortingButtons];

        return allSortingButtons;
    }


    getSortingButton(thDomElement, classNameOfSortingButton)
    {
        let foundSortingButtons = this.htmlPageDomUpdater.getDomElementsInsideParent(thDomElement, classNameOfSortingButton);

        if (foundSortingButtons.length !== 1)
        {
            throw new Error(`${foundSortingButtons.length} is inconsistent amount of sorting buttons`);
        }

        return foundSortingButtons[0];
    }


    toggleBackgroundColorToSortingButton(sortingButtonDomElement, isAscendSortingButton, styleNameOnClickSortAscendingButton, styleNameOnClickSortDescendingButton)
    {
        let additionalStyleName = this.selectStyleNameForSortingButton(isAscendSortingButton, styleNameOnClickSortAscendingButton, styleNameOnClickSortDescendingButton);

        let additionalStyleNameWithoutDot = this.htmlPageDomUpdater.trimSymbolAtStart(additionalStyleName, ".");

        sortingButtonDomElement.classList.toggle(additionalStyleNameWithoutDot);
    }


    getSortingButtonsByColumnIndex(idTable, columnIndex, classNameOfSortingButton)
    {
        let thDomElement = this.getThDomElementsByColumnIndex(idTable, columnIndex)[0];

        let sortingButtonsByColumnIndex = [...this.htmlPageDomUpdater.getDomElementsInsideParent(thDomElement, classNameOfSortingButton)];

        return sortingButtonsByColumnIndex;
    }


    // ???
    getThDomElementsByColumnIndex(idTable, columnIndex)
    {
        let thDomElements = this.htmlPageDomUpdater.getChildrenDomElementsByParentIdAndChildrenTag(idTable, "th");

        let thDomElementsByColumn = [...thDomElements].filter(thDomElement => thDomElement.cellIndex === columnIndex);

        return thDomElementsByColumn;
    }


    toggleAdditionalStyleNameForSortingButton(isAscendSortingButton, sortingButtonDomElement, styleNameOnClickSortAscendingButton, styleNameOnClickSortDescendingButton)
    {
        if (!isTableSorted)
        {
            return;
        }

        let additionalStyleName = this.selectStyleNameForSortingButton(isAscendSortingButton, styleNameOnClickSortAscendingButton, styleNameOnClickSortDescendingButton)

        let additionalStyleNameWithoutDot = this.htmlPageDomUpdater.trimSymbolAtStart(additionalStyleName, ".");

        sortingButtonDomElement.classList.toggle(additionalStyleNameWithoutDot);
    }


    // hide all soretd buttons, except last clicked
    // show all soretd buttons, that were hidden
    hideShowUnusedSortingButtons(isTableSorted, lastClickedSortingButton, sortingButtons)
    {
        sortingButtons.forEach(sortingButtonDomElement =>
        {
            if (isTableSorted && lastClickedSortingButton !== sortingButtonDomElement)
            {
                sortingButtonDomElement.hidden = true;
            }

            if (!isTableSorted)
            {
                sortingButtonDomElement.hidden = false;
            }
        });
    }


    showHiddenSortingButtonsAfterSearch(isTableSorted, isTableSortedAscend, lastClickedSortingButton, sortingButtons)
    {
        if (isTableSortedAscend !== null)
        {
            this.hideShowUnusedSortingButtons(isTableSorted, lastClickedSortingButton, sortingButtons);
        }
    }


    changeTableRowColorForEvenRow(trDomElement, cssVariableNameRowColor, cssVariableValueColorForEvenRow)
    {
        this.htmlPageDomUpdater.throwExceptionIfCssVariableNameIsIncorrect(cssVariableNameRowColor);

        this.setTableRowInlineStyleProperty(trDomElement, cssVariableNameRowColor, cssVariableValueColorForEvenRow);
    }


    changeTableRowColorForOddRow(trDomElement, cssVariableNameRowColor, cssVariableValueColorForOddRow)
    {
        this.htmlPageDomUpdater.throwExceptionIfCssVariableNameIsIncorrect(cssVariableNameRowColor);

        this.setTableRowInlineStyleProperty(trDomElement, cssVariableNameRowColor, cssVariableValueColorForOddRow);
    }


    isEvenRowViewOrderNumber(trDomElement, attributeNameDataTableRowViewOrderNumber)
    {
        let parsedRowViewOrderNumber = this.getParsedRowViewOrderNumber(trDomElement, attributeNameDataTableRowViewOrderNumber);

        if (parsedRowViewOrderNumber === null)
        {
            throw new Error(`Table row should not be dispalyed`);
        }

        return parsedRowViewOrderNumber % 2 === 0;
    }


    getParsedRowViewOrderNumber(trDomElement, attributeNameDataTableRowViewOrderNumber)
    {
        let rowViewOrderNumber = this.getTableDomElementAttribute(trDomElement, attributeNameDataTableRowViewOrderNumber);

        if (rowViewOrderNumber === "null")
        {
            return null;
        }

        return parseInt(rowViewOrderNumber);
    }


    changeCellColorOnHoveringTableHeader(trDomElement, hoveredColumnIndex, newAdditionalStyleNameForTdOnHover)
    {
        let tdDomElement = this.getTdFromTableRow(trDomElement, hoveredColumnIndex);

        let rootDivInsideTd = tdDomElement.children[0];

        if (rootDivInsideTd.classList.length !== 2)
        {
            return;
        }

        this.htmlPageDomUpdater.updateLastAdditionalStyleName(rootDivInsideTd, newAdditionalStyleNameForTdOnHover);
    }


    selectAdditionalStyleNameOnHoveringTableHeader(isRowEvenAfterSorting, divCellEvenAdditionalStyleNameOnHoverColumn, divCellOddAdditionalStyleNameOnHoverColumn)
    {
        this.htmlPageDomUpdater.throwExceptionIfStyleNameIsIncorrect(divCellEvenAdditionalStyleNameOnHoverColumn);
        this.htmlPageDomUpdater.throwExceptionIfStyleNameIsIncorrect(divCellOddAdditionalStyleNameOnHoverColumn);

        let newAdditionalStyleName = !isRowEvenAfterSorting ? divCellEvenAdditionalStyleNameOnHoverColumn : divCellOddAdditionalStyleNameOnHoverColumn;

        return newAdditionalStyleName;
    }


    getTableDomElementAttribute(domElementOfTable, attributeName)
    {
        return this.htmlPageDomUpdater.getAttributeOfHtmlElement(domElementOfTable, attributeName);
    }


    setTableDomElementAttribute(domElementOfTable, attributeName, attributeValue)
    {
        this.htmlPageDomUpdater.setAttributeOfHtmlElementByDomElement(domElementOfTable, attributeName, attributeValue);
    }


    removeAttributeTableDomElement(domElementOfTable, attributeName)
    {
        if (this.getTableDomElementAttribute(domElementOfTable, attributeName))
        {
            domElementOfTable.removeAttribute(attributeName);
        }
    }


    // get attribute inside tag table
    getAttributeAboutTableSorting(tableId, attributeNameData)
    {
        this.htmlPageDomUpdater.throwExceptionIfAttributeNameIsIncorrect(attributeNameData);

        let tableDomElement = this.htmlPageDomUpdater.getDomElementOnPageById(tableId);

        let attributeValue = this.htmlPageDomUpdater.getAttributeOfHtmlElement(tableDomElement, attributeNameData);

        return attributeValue;
    }


    // set attribute inside tag table
    setAttributeAboutTableSorting(tableId, attributeNameData, newValueForAttributeNameData)
    {
        this.htmlPageDomUpdater.throwExceptionIfAttributeNameIsIncorrect(attributeNameData);

        let tableDomElement = this.htmlPageDomUpdater.getDomElementOnPageById(tableId);

        this.setTableDomElementAttribute(tableDomElement, attributeNameData, newValueForAttributeNameData);
    }


    parseTextToBooleanOrNull(textToParse)
    {
        if (textToParse === `${true}`)
        {
            return true;
        }
        else if (textToParse === `${false}`)
        {
            return false;
        }
        else if (textToParse === `${null}`)
        {
            return null;
        }
        else
        {
            throw new Error(`${textToParse} is unable to parse to boolean or null`);
        }
    }


    parseAttributeAboutTableSorting(tableId, attributeNameData, isParseAsNullBoolean)
    {
        let valueOfAttribute = this.getAttributeAboutTableSorting(tableId, attributeNameData);

        // to Parse as Boolean or Null
        if (isParseAsNullBoolean)
        {
            return this.parseTextToBooleanOrNull(valueOfAttribute);
        }

        //  Parse as integer
        return parseInt(valueOfAttribute, 10);
    }


    // Inline .style Property (css variable or css style key)
    getTableRowInlineStyleProperty(trDomElement, stylePropertyName)
    {
        return this.htmlPageDomUpdater.getUnparsedComputedStyle(trDomElement, stylePropertyName);
    }


    setTableRowInlineStyleProperty(trDomElement, stylePropertyName, valueToSetWithPrefix) // valueToSetWithPrefix 10px
    {
        trDomElement.style.setProperty(stylePropertyName, valueToSetWithPrefix);
    }


    removeTableRowInlineStyleProperty(trDomElement, stylePropertyName)
    {
        if (this.getTableRowInlineStyleProperty(trDomElement, stylePropertyName))
        {
            this.htmlPageDomUpdater.removeInlineStyleProperty(trDomElement, stylePropertyName);
        }
    }


    setDelayBeforeRowAnimation(trDomElement, attributeNameDataTableRowViewOrderNumberInInitialUnsortedTable, cssVariableNameToDelayRowAnimation)
    {
        this.htmlPageDomUpdater.throwExceptionIfCssVariableNameIsIncorrect(cssVariableNameToDelayRowAnimation);

        let initialTableUnsortedNumber = this.getTableDomElementAttribute(trDomElement, attributeNameDataTableRowViewOrderNumberInInitialUnsortedTable);

        let delayRowAnimation = `${initialTableUnsortedNumber / 25}s`

        this.setTableRowInlineStyleProperty(trDomElement, cssVariableNameToDelayRowAnimation, delayRowAnimation);
    }


    updateStyleAboutRowHiddenDisplayed(trDomElement, isRowToBeHidden, cssVariableNameRowDisplayState, styleNameToHideTableRow)
    {
        if (isRowToBeHidden)
        {
            this.updateStyleRowToBeHidden(trDomElement, cssVariableNameRowDisplayState, styleNameToHideTableRow);
        }
        else
        {
            this.updateStyleRowToBeDisplayed(trDomElement, cssVariableNameRowDisplayState);
        }
    }


    updateStyleRowToBeHidden(trDomElement, cssVariableNameRowDisplayState, styleNameToHideTableRow)
    {
        this.htmlPageDomUpdater.throwExceptionIfCssVariableNameIsIncorrect(cssVariableNameRowDisplayState);
        this.htmlPageDomUpdater.throwExceptionIfStyleNameIsIncorrect(styleNameToHideTableRow);

        this.setTableRowInlineStyleProperty(trDomElement, cssVariableNameRowDisplayState, "none");

        let styleNameToHideTableRowWithoutDot = this.htmlPageDomUpdater.trimSymbolAtStart(styleNameToHideTableRow, ".");

        this.setTableDomElementAttribute(trDomElement, "class", styleNameToHideTableRowWithoutDot);
    }


    updateStyleRowToBeDisplayed(trDomElement, cssVariableNameRowDisplayState)
    {
        this.htmlPageDomUpdater.throwExceptionIfCssVariableNameIsIncorrect(cssVariableNameRowDisplayState);

        this.setTableRowInlineStyleProperty(trDomElement, cssVariableNameRowDisplayState, "table-row");
        this.removeAttributeTableDomElement(trDomElement, "class");
    }


    updateRowStyleNameAfterSorting(trDomElement, isRowToBeHiddenAfterSort, styleNameToSortTableRow)
    {
        this.htmlPageDomUpdater.throwExceptionIfStyleNameIsIncorrect(styleNameToSortTableRow);

        let styleNameToSortTableRowWithoutDot = this.htmlPageDomUpdater.trimSymbolAtStart(styleNameToSortTableRow, ".");

        if (!isRowToBeHiddenAfterSort)
        {
            trDomElement.classList.toggle(styleNameToSortTableRowWithoutDot);
        }
    }


    updateRowCoordinateAfterSorting(trModelObj, cssVariableNameToPlaceRowAfterSorting, rowYCoordinateAfterSorting)
    {
        this.htmlPageDomUpdater.throwExceptionIfCssKeyNameIsIncorrect(cssVariableNameToPlaceRowAfterSorting);

        this.setTableRowInlineStyleProperty(trModelObj.trDomElement, cssVariableNameToPlaceRowAfterSorting, `${rowYCoordinateAfterSorting}px`);
    }


    getCellDomElementByAttributes(trDomElement, columnIndex, attributeNameOfElementWithTextToBeUpdated, attributeValueOfElementWithTextToBeUpdated)
    {
        let tdDomElement = this.getTdFromTableRow(trDomElement, columnIndex);

        let domElementWithTextToBeUpdated = this.htmlPageDomUpdater.getDomElementsInsideParentByAttributeNameAndPartOfValue(tdDomElement, attributeNameOfElementWithTextToBeUpdated, attributeValueOfElementWithTextToBeUpdated)[0];

        return domElementWithTextToBeUpdated;
    }


    // private use updateTextInsideTd
    updateTextInsideDomElement(domElementWithTextToBeUpdated, newText)
    {
        domElementWithTextToBeUpdated.textContent = newText;
    }


}