import { HtmlConfigurationAttributesReader } from '../HtmlConfigurationAttributes/HtmlConfigurationAttributesReader.js';
import { HtmlAbstractDomElementPart } from '../HtmlDomElementHandler/HtmlAbstractDomElementPart.js';
import { DataToHtmlTableCreator } from '../DataToHtmlTable/DataToHtmlTableCreator.js';

// -------------------------------------------- Begin create html-table via pattern Builder  --------------------------------------------


// Contains methods that nesting html-elements with children (except text content)
export class HtmlTableCreator // Foreman
{
    constructor(htmlTableBuilder)
    {
        this.htmlTableBuilder = htmlTableBuilder;
        this.htmlConfigurationAttributesReader = new HtmlConfigurationAttributesReader();
        this.attributesOfHtmlTable = this.htmlConfigurationAttributesReader.getHtmlTableConfigurationsForElements();
        this.attributesForSidebar = this.htmlConfigurationAttributesReader.getHtmlSidebarConfigurations();
        this.htmlAbstractDomElementPart = new HtmlAbstractDomElementPart();
        this.dataToHtmlTableCreator = new DataToHtmlTableCreator();
    }


    constructTableContainer(dataStructure, dataTableToHtmlTableConfigurations)
    {
        this.dataToHtmlTableCreator = new DataToHtmlTableCreator();
        let idTableToConstruct = dataTableToHtmlTableConfigurations.idTable;
        let tableHeadersText = this.dataToHtmlTableCreator.constructTableHeaders(dataTableToHtmlTableConfigurations.tableHeaderAttributes);
        let tableTextDataArray = this.dataToHtmlTableCreator.constructDataForHtmlTable(dataStructure, dataTableToHtmlTableConfigurations);
        let idTableContainer = dataTableToHtmlTableConfigurations.idTableContainer;
        let divTableContainer = this.htmlAbstractDomElementPart.createHtmlTagWithConfigurationParameter(this.attributesOfHtmlTable.divTableContainerAttributes, idTableContainer);
        let tableTitle = dataTableToHtmlTableConfigurations.tableTitle;
        let divTableTitle = this.htmlTableBuilder.buildTableTitle(tableTitle);        
        let divTableButtonClose = this.htmlTableBuilder.buildTableButtonClose();
        let idTableSearchInput = dataTableToHtmlTableConfigurations.idTableSearchInput;
        let divTableSearchContainer = this.htmlTableBuilder.buildTableSearchContainer(idTableSearchInput);
        let divTableBody = this.htmlAbstractDomElementPart.createHtmlTag(this.attributesOfHtmlTable.divTableBodyAttributes);
        let tableTag = this.constructTable(idTableToConstruct, tableHeadersText, tableTextDataArray);        
        let idVerticalResizer = dataTableToHtmlTableConfigurations.idTableResizerVerticalContainer;
        let divVerticalResizer = this.htmlTableBuilder.buildVerticalResizer(idVerticalResizer);
        let idHorizontalResizer = dataTableToHtmlTableConfigurations.idTableResizerBottomHorizontalContainer;
        let divHorizontalResizer = this.htmlTableBuilder.buildHorizontalResizer(idHorizontalResizer);        
        divTableContainer.addChildDomElement(divTableTitle);
        divTableContainer.addChildDomElement(divTableButtonClose);
        divTableContainer.addChildDomElement(divTableSearchContainer);
        divTableContainer.addChildDomElement(divTableBody);
        divTableBody.addChildDomElement(tableTag);
        divTableContainer.addChildDomElement(divVerticalResizer);
        divTableContainer.addChildDomElement(divHorizontalResizer);
        let idSidebarContainer = this.attributesForSidebar.divSidebarContainerAttributes.defaultAttributes.id;
        let sidebarDomElement = document.getElementById(idSidebarContainer);
        let divTableContainerDomElement = divTableContainer.getCreatedDomElement();
        sidebarDomElement.insertAdjacentElement("afterend", divTableContainerDomElement);

        return divTableContainerDomElement;
    }


    constructTable(idTableToConstruct, tableHeadersText, tableTextDataArray)
    {
        let tableTag = this.htmlAbstractDomElementPart.createHtmlTagWithConfigurationParameter(this.attributesOfHtmlTable.tableAttributes, idTableToConstruct);
        let thead = this.htmlTableBuilder.buildTableThead(tableHeadersText);
        let tbody = this.htmlTableBuilder.buildTableTbody(tableTextDataArray);
        tableTag.addChildDomElement(thead);
        tableTag.addChildDomElement(tbody);
        return tableTag;
    }


    // Uses to create a new row that will be added to existing table
    constructTableRow(tableRowTextArray, rowViewOrderNumber)
    {
        let tr = this.htmlTableBuilder.buildTableTrForTds(tableRowTextArray, rowViewOrderNumber);
        return tr;
    }

}