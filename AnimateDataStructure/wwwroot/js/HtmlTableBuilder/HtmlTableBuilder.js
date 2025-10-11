import { HtmlAbstractDomElementPart } from '../HtmlDomElementHandler/HtmlAbstractDomElementPart.js';
import { HtmlConfigurationAttributesReader } from '../HtmlConfigurationAttributes/HtmlConfigurationAttributesReader.js';


// Contains methods that create html-elements with attributes, but without any nesting children (except text content)
export class HtmlTableBuilder // abstract Builder
{
    constructor()
    {
        this.htmlAbstractDomElementPart = new HtmlAbstractDomElementPart();
        this.htmlConfigurationAttributesReader = new HtmlConfigurationAttributesReader();
        this.attributesOfHtmlTable = this.htmlConfigurationAttributesReader.getHtmlTableConfigurationsForElements();
    }


    // ------------- Nesting table parts -----------


    // <div class="tableTitle">   <h2>Some table title</h2>   </div>
    buildTableTitle(textOfTableTitle)
    {
        let divTableTitle = this.htmlAbstractDomElementPart.createHtmlTag(this.attributesOfHtmlTable.divTableTitleAttributes);

        let h2 = this.htmlAbstractDomElementPart.createHtmlTag(this.attributesOfHtmlTable.hTableTitleAttributes);
        this.htmlAbstractDomElementPart.createHtmlTagWithText(h2, textOfTableTitle);

        divTableTitle.addChildDomElement(h2);

        return divTableTitle;
    }


    // ????
    // <div class="tableButtonClose"> </div>
    buildTableButtonClose()
    {
        let divTableButtonClose = this.htmlAbstractDomElementPart.createHtmlTag(this.attributesOfHtmlTable.divTableButtonCloseAttributes);

        let p = this.htmlAbstractDomElementPart.createHtmlTag(this.attributesOfHtmlTable.pTextInTableButtonCloseAttributes);
        let textInsideButton = this.attributesOfHtmlTable.pTextInTableButtonCloseAttributes.textInsideButton;
        this.htmlAbstractDomElementPart.createHtmlTagWithText(p, textInsideButton);

        divTableButtonClose.addChildDomElement(p);

        return divTableButtonClose;
    }


    // <div class="tableSearchContainer">  <input...>  </div>
    buildTableSearchContainer(idValueOfSearchInput)
    {
        let divTableSearchContainer = this.htmlAbstractDomElementPart.createHtmlTag(this.attributesOfHtmlTable.divTableSearchContainerAttributes);

        let inputTableSearch = this.htmlAbstractDomElementPart.createHtmlTagWithConfigurationParameter(this.attributesOfHtmlTable.inputTableSearchAttributes, idValueOfSearchInput);

        divTableSearchContainer.addChildDomElement(inputTableSearch);

        return divTableSearchContainer;
    }


    // <thead> with children
    buildTableThead(tableHeaderTextArray)
    {
        let thead = this.htmlAbstractDomElementPart.createHtmlTag(this.attributesOfHtmlTable.theadAttributes);

        let tr = this.buildTableHeaderTr(tableHeaderTextArray);

        thead.addChildDomElement(tr);

        return thead;
    }


    // header <tr> with children
    buildTableHeaderTr(tableHeaderTextArray)
    {
        let tr = this.htmlAbstractDomElementPart.createHtmlTag(this.attributesOfHtmlTable.trForHeaderAttributes);

        // DO NOT DELETE COMMENT:
        // columnIndex starts from 1

        let columnIndex = 1;

        tableHeaderTextArray.forEach(columnTitle =>
        {
            let th = this.buildTableHeaderTh(columnTitle, columnIndex++);

            tr.addChildDomElement(th);
        });

        return tr;
    }


    // <th> with children
    buildTableHeaderTh(columnText, columnIndex)
    {
        /*
            <th data-tableColumnOrderNumber="1" class="headerColumn">

                Id Customer

                <button class="sortAscendingButton">↑</button>
                <button class="sortDescendingButton">↓</button>

            </th>
        */

        let th = this.htmlAbstractDomElementPart.createHtmlTagWithConfigurationParameter(this.attributesOfHtmlTable.thAttributes, columnIndex);
        this.htmlAbstractDomElementPart.createHtmlTagWithText(th, columnText);

        let buttonAscending = this.buildSortingButton(true);
        let buttonDescending = this.buildSortingButton(false);;

        th.addChildDomElement(buttonAscending);
        th.addChildDomElement(buttonDescending);

        return th;
    }


    // <button class="sortAscendingButton">↑</button>
    // <button class="sortDescendingButton">↓</button>
    buildSortingButton(isAscendingButton)
    {
        let configurationAttributes = isAscendingButton ? this.attributesOfHtmlTable.sortAscendingButtonAttributes :
            this.attributesOfHtmlTable.sortDescendingButtonAttributes;

        let button = this.htmlAbstractDomElementPart.createHtmlTag(configurationAttributes);
        this.htmlAbstractDomElementPart.createHtmlTagWithText(button, configurationAttributes.textInsideButton);

        return button;
    }


    // <tbody> with children
    buildTableTbody(tableTextDataArray)
    {
        let tbody = this.htmlAbstractDomElementPart.createHtmlTag(this.attributesOfHtmlTable.tbodyAttributes);

        let rowViewOrderNumber = 0; // DO NOT DELETE COMMENT: rows counting begins from 0

        tableTextDataArray.forEach(textInRow =>
        {
            let tr = this.buildTableTrForTds(textInRow, rowViewOrderNumber++);

            tbody.addChildDomElement(tr);
        });

        return tbody;
    }


    // <td> with children
    buildTableTdTag(textInTableCell, columnNumberStartsFromOne)
    {
        let td = this.htmlAbstractDomElementPart.createHtmlTag(this.attributesOfHtmlTable.tdAttributes);

        let divCell = this.htmlAbstractDomElementPart.createHtmlTag(this.attributesOfHtmlTable.divCellAttributes);

        let divCellWithGlowingRadialBorder = this.htmlAbstractDomElementPart.createHtmlTag(this.attributesOfHtmlTable.divCellWithGlowingRadialBorderAttributes);

        let divBorderOfCellWithGlowingRadialBorder = this.htmlAbstractDomElementPart.createHtmlTag(this.attributesOfHtmlTable.divBorderOfCellWithGlowingRadialBorderAttributes);

        let divContentOfCellWithGlowingRadialBorder = this.htmlAbstractDomElementPart.createHtmlTag(this.attributesOfHtmlTable.divContentOfCellWithGlowingRadialBorderAttributes);

        let divGlowingRadialGradientInsideCellContent = this.htmlAbstractDomElementPart.createHtmlTag(this.attributesOfHtmlTable.divGlowingRadialGradientInsideCellContentAttributes);

        let pTextInsideCell = this.htmlAbstractDomElementPart.createHtmlTag(this.attributesOfHtmlTable.pTextInsideCellAttributes);
        this.htmlAbstractDomElementPart.createHtmlTagWithText(pTextInsideCell, textInTableCell);

        // ????
        let divCellLoader = this.htmlAbstractDomElementPart.createHtmlTagWithConfigurationParameter(this.attributesOfHtmlTable.divCellLoaderAttributes, columnNumberStartsFromOne);


        divCell.addChildDomElement(divCellWithGlowingRadialBorder);

        divCellWithGlowingRadialBorder.addChildDomElement(divBorderOfCellWithGlowingRadialBorder);
        divCellWithGlowingRadialBorder.addChildDomElement(divContentOfCellWithGlowingRadialBorder);

        divContentOfCellWithGlowingRadialBorder.addChildDomElement(divGlowingRadialGradientInsideCellContent);
        divContentOfCellWithGlowingRadialBorder.addChildDomElement(pTextInsideCell);
        divContentOfCellWithGlowingRadialBorder.addChildDomElement(divCellLoader);

        td.addChildDomElement(divCell);

        return td;
    }


    // <td>...<td>...  with children
    buildTableTds(tableRowTextArray)
    {
        let columnCounter = 0;

        let tds = tableRowTextArray.map(textInCellOfRow =>
        {
            columnCounter++;

            return this.buildTableTdTag(textInCellOfRow, columnCounter);
        });

        return tds;
    }


    // <tr> <td>...<td>... </tr>  with children
    buildTableTrForTds(tableRowTextArray, rowViewOrderNumber)
    {
        let tr = this.htmlAbstractDomElementPart.createHtmlTagWithConfigurationParameter(this.attributesOfHtmlTable.trForRowAttributes, rowViewOrderNumber);

        let tds = this.buildTableTds(tableRowTextArray);

        let htmlAbstractDomElementPart = new HtmlAbstractDomElementPart();

        htmlAbstractDomElementPart.addChildren(tr, tds);

        return tr;
    }


    // <div id="idTableResizerBottomHorizontalContainer" class="resizerBottomHorizontalContainer"> </div>
    buildHorizontalResizer(idHorizontalResizer)
    {
        let resizerConfigurationObject = this.attributesOfHtmlTable.divTableResizerHorizontalAttributes;

        let divHorizontalResizer = this.htmlAbstractDomElementPart.createHtmlTagWithConfigurationParameter(resizerConfigurationObject, idHorizontalResizer);

        return divHorizontalResizer;
    }


    // <div id="idTableResizerVerticalContainer" class="resizerVerticalContainer"> </div>
    buildVerticalResizer(idVerticalResizer)
    {
        let resizerConfigurationObject = this.attributesOfHtmlTable.divTableResizerVerticalAttributes;

        let divVerticalResizer = this.htmlAbstractDomElementPart.createHtmlTagWithConfigurationParameter(resizerConfigurationObject, idVerticalResizer);

        return divVerticalResizer;
    }

}