import { HtmlPageDomUpdater } from '../HtmlDomElementHandler/HtmlPageDomUpdater.js';
import { DataStructureSidebarViewState } from './DataStructureSidebarViewState.js';
import { HtmlConfigurationAttributesReader } from '../HtmlConfigurationAttributes/HtmlConfigurationAttributesReader.js';
import { HtmlTableCreator } from '../HtmlTableBuilder/HtmlTableCreator.js';
import { HtmlTableBuilder } from '../HtmlTableBuilder/HtmlTableBuilder.js';
import { ContextTableEffect } from '../HtmlTableOperations/ContextTableEffect.js';
import { TableHovering } from '../HtmlTableOperations/TableHovering.js';
import { TableSearching } from '../HtmlTableOperations/TableSearching.js';
import { TableSorting } from '../HtmlTableOperations/TableSorting.js';
import { HtmlTableHandler } from '../HtmlTableHandler/HtmlTableHandler.js';
import { ResizerHtmlElement } from '../HtmlDomElementHandler/ResizerHtmlElement.js';
import { ContextSidebarButtons } from './ContextSidebarButtons.js';

export class ControlHandlersDataStructureSidebar
{
    constructor()
    {
        this.htmlPageDomUpdater = new HtmlPageDomUpdater();
        this.dataStructureSidebarViewState = new DataStructureSidebarViewState();

        //?????????
        this.htmlConfigurationAttributesReader = new HtmlConfigurationAttributesReader();

        this.attributesForSidebar = this.htmlConfigurationAttributesReader.getHtmlSidebarConfigurations();

        this.attributesForButtonMenu = this.htmlConfigurationAttributesReader.getHtmlSidebarButtonMenuConfigurations();
        this.attributesForButtonSecond = this.htmlConfigurationAttributesReader.getHtmlSidebarButtonSecondConfigurations();
        this.attributesForButtonThird = this.htmlConfigurationAttributesReader.getHtmlSidebarButtonThirdConfigurations();
        this.attributesForButtonFourth = this.htmlConfigurationAttributesReader.getHtmlSidebarButtonFourthConfigurations();
        this.attributesForButtonFifth = this.htmlConfigurationAttributesReader.getHtmlSidebarButtonFifthConfigurations();


        this.additionalClassNameSidebarExpand = this.htmlConfigurationAttributesReader.getClassFromAttributesWithDot(this.attributesForSidebar.divSidebarContainerAttributes.sidebarContainerExpandAttributes); // ".sidebarContainerExpand";
        this.additionalClassNameSidebarNarrow = this.htmlConfigurationAttributesReader.getClassFromAttributesWithDot(this.attributesForSidebar.divSidebarContainerAttributes.sidebarContainerNarrowAttributes); // ".sidebarContainerNarrow";
        this.idOfPreLastClickedSidebarIcon = null;
        this.idOfLastClickedSidebarIcon = null;
        this.idOfOpenedContainerByClickingSidebarIcon = null;


        this.idSidebarContainer = this.htmlConfigurationAttributesReader.getValueFromAttributes(this.attributesForSidebar.divSidebarContainerAttributes.defaultAttributes.id); // "idSidebarContainer";
        this.idSidebar = this.htmlConfigurationAttributesReader.getValueFromAttributes(this.attributesForSidebar.divSidebarAttributes.defaultAttributes.id); // "idSidebar";

        this.idButtonSidebarMenu = this.htmlConfigurationAttributesReader.getValueFromAttributes(this.attributesForButtonMenu.divButtonWithGlowingRadialBorderAttributes.defaultAttributes.id); // "idButtonSidebarMenu";
        this.idButtonSidebarSecond = this.htmlConfigurationAttributesReader.getValueFromAttributes(this.attributesForButtonSecond.divButtonWithGlowingRadialBorderAttributes.defaultAttributes.id); // "idButtonSidebarSecond";
        this.idButtonSidebarThird = this.htmlConfigurationAttributesReader.getValueFromAttributes(this.attributesForButtonThird.divButtonWithGlowingRadialBorderAttributes.defaultAttributes.id); // "idButtonSidebarThird";
        this.idButtonSidebarFourth = this.htmlConfigurationAttributesReader.getValueFromAttributes(this.attributesForButtonFourth.divButtonWithGlowingRadialBorderAttributes.defaultAttributes.id); // "idButtonSidebarFourth";
        this.idButtonSidebarFifth = this.htmlConfigurationAttributesReader.getValueFromAttributes(this.attributesForButtonFifth.divButtonWithGlowingRadialBorderAttributes.defaultAttributes.id); // "idButtonSidebarFifth";

        // ?????
        this.htmlTableCreator = new HtmlTableCreator(new HtmlTableBuilder());
        //this.dataToHtmlTableConfigurations = this.htmlTableCreator.dataToHtmlTableConfigurationAttributesReader.getDataTableToHtmlTableConfigurationsForTreeCharacteristics();

        //this.sidebarButtonsToHtmlTableConfigurations = new SidebarButtonsToHtmlTableConfigurations();

        // ???? is needed???
        this.idButtonSidebarSecondSvgTextContainer = "idButtonSidebarSecondSvgTextContainer"; // text of menu item
        this.idButtonSidebarThirdSvgTextContainer = "idButtonSidebarThirdSvgTextContainer"; // text of menu item
        this.idButtonSidebarFourthSvgTextContainer = "idButtonSidebarFourthSvgTextContainer"; // text of menu item
        this.idButtonSidebarFifthSvgTextContainer = "idButtonSidebarFifthSvgTextContainer"; // text of menu item

    }


    /*
        If sidebar is not expanded:
        1. Click by icons expands sidebar.
        2. Color of icon, text of menu items is not changed

        If sidebar is expanded:
        1. Click by icon Menu narrows sidebar
        2. Click by rest icons (except icon Menu) is changed color of icon and text of menu items and:
        2.1. Invokes related entity
        2.2. Click on any icon when related entity is opened changes nothing ????
        2.3. Closing related entity restores colors of icon and text of the menu items,
    */

    // click on button menue to expand (narrow) sidebar
    onClickSidebarIcons(dataStructure)
    {
        this.onClickSidebarIcon(this.idButtonSidebarMenu, false, this.attributesForButtonMenu, dataStructure);
        this.onClickSidebarIcon(this.idButtonSidebarSecond, true, this.attributesForButtonSecond, dataStructure);
        this.onClickSidebarIcon(this.idButtonSidebarThird, true, this.attributesForButtonThird, dataStructure);
        this.onClickSidebarIcon(this.idButtonSidebarFourth, true, this.attributesForButtonFourth, dataStructure);
        this.onClickSidebarIcon(this.idButtonSidebarFifth, true, this.attributesForButtonFifth, dataStructure);
    }


    // click on buttons in sidebar to expand (narrow) sidebar
    onClickSidebarIcon(idSidebarIcon, isToAccountSidebarExpanding, htmlSidebarButtonConfigurations, dataStructure)
    {
        let buttonSidebarIconDomElement = this.htmlPageDomUpdater.getDomElementOnPageById(idSidebarIcon);

        buttonSidebarIconDomElement.addEventListener("click", (evn) =>
        {
            this.setIdToLastAndPrelastClickedIcon(idSidebarIcon);

            // when container with table (that was created by clicking on sidebar button) is opened and has been clicked other sidebar button
            if (this.idOfOpenedContainerByClickingSidebarIcon && this.idOfLastClickedSidebarIcon === this.idButtonSidebarMenu)
            {
                let buttonCloseTableDomElement = this.getButtonCloseTableContainer(this.idOfOpenedContainerByClickingSidebarIcon);

                buttonCloseTableDomElement.click();

                return;
            }
            else if (this.idOfOpenedContainerByClickingSidebarIcon && this.idOfLastClickedSidebarIcon !== this.idOfPreLastClickedSidebarIcon &&
                this.idOfLastClickedSidebarIcon !== this.idButtonSidebarMenu)
            {
                let openedContainerByClickingSidebarIconDomElement = this.htmlPageDomUpdater.getDomElementOnPageById(this.idOfOpenedContainerByClickingSidebarIcon);

                openedContainerByClickingSidebarIconDomElement.remove();
            }
            else if (this.idOfOpenedContainerByClickingSidebarIcon && this.idOfLastClickedSidebarIcon === this.idOfPreLastClickedSidebarIcon || this.idOfOpenedContainerByClickingSidebarIcon && this.idOfLastClickedSidebarIcon !== this.idButtonSidebarMenu)
            {
                return;
            }


            let isExpanded = this.dataStructureSidebarViewState.checkIsSidebarExpanded(this.idSidebarContainer, this.additionalClassNameSidebarExpand);

            if (!isExpanded)
            {
                this.updateAdditionalStyle(this.idSidebarContainer, this.additionalClassNameSidebarExpand, this.additionalClassNameSidebarNarrow);

                return;
            }

            if (isToAccountSidebarExpanding)
            {
                // icon should change color after clicking sidebar menu item and after closing the entity that was invoked by clicking sidebar menu item

                if (isExpanded)
                {
                    this.onChangeColorSidebarMenuItem(htmlSidebarButtonConfigurations);

                    this.createHtmlTableOnClickSidebarButton(idSidebarIcon, dataStructure, htmlSidebarButtonConfigurations);

                    this.addEffectsToHtmlTable(idSidebarIcon, dataStructure);
                }
            }
            else
            {
                this.updateAdditionalStyle(this.idSidebarContainer, this.additionalClassNameSidebarExpand, this.additionalClassNameSidebarNarrow);
            }

        });
    }


    onChangeColorSidebarMenuItem(htmlSidebarButtonConfigurations)
    {
        // style to change color of icon and text on click
        let additionalStyleNameOnClickIcon = htmlSidebarButtonConfigurations.divButtonWithGlowingRadialBorderAttributes.additionalAttributesOnClick.class;

        if (this.idOfLastClickedSidebarIcon === this.idOfPreLastClickedSidebarIcon || this.idOfPreLastClickedSidebarIcon === null)
        {
            this.changeSidebarIconStyle(this.idOfLastClickedSidebarIcon, additionalStyleNameOnClickIcon);

            return;
        }

        this.changeSidebarIconStyle(this.idOfLastClickedSidebarIcon, additionalStyleNameOnClickIcon);

        if (this.htmlPageDomUpdater.isClassContainsStyleName(this.idOfPreLastClickedSidebarIcon, additionalStyleNameOnClickIcon))
        {
            this.changeSidebarIconStyle(this.idOfPreLastClickedSidebarIcon, additionalStyleNameOnClickIcon);
        }
    }


    changeSidebarIconStyle(idOfClickedSidebarIcon, additionalStyleName)
    {
        let domElement = this.htmlPageDomUpdater.getDomElementOnPageById(idOfClickedSidebarIcon);

        let additionalStyleNameWithoutDot = this.htmlPageDomUpdater.trimSymbolAtStart(additionalStyleName, ".");

        domElement.classList.toggle(additionalStyleNameWithoutDot);
    }


    setIdToLastAndPrelastClickedIcon(idLastClickedSidebarIcon)
    {
        this.idOfPreLastClickedSidebarIcon = this.idOfLastClickedSidebarIcon;

        this.idOfLastClickedSidebarIcon = idLastClickedSidebarIcon;
    }


    // privates

    selectStyleName(currentStyleNameOfSidebarContainer, additionalClassNameSidebarExpand, additionalClassNameSidebarNarrow)
    {
        let firstStyleNameOfSidebarContainer = currentStyleNameOfSidebarContainer.split(" ")[0];

        let additionalClassNameSidebarExpandWithoutDot = this.htmlPageDomUpdater.trimSymbolAtStart(additionalClassNameSidebarExpand, ".");
        let additionalClassNameSidebarNarrowWithoutDot = this.htmlPageDomUpdater.trimSymbolAtStart(additionalClassNameSidebarNarrow, ".");

        let newStyleNameToExpandSidebarContainer = `${firstStyleNameOfSidebarContainer} ${additionalClassNameSidebarExpandWithoutDot}`;
        let newStyleNameToNarrowSidebarContainer = `${firstStyleNameOfSidebarContainer} ${additionalClassNameSidebarNarrowWithoutDot}`;


        if (currentStyleNameOfSidebarContainer === firstStyleNameOfSidebarContainer ||
            currentStyleNameOfSidebarContainer === newStyleNameToNarrowSidebarContainer)
        {
            return newStyleNameToExpandSidebarContainer;
        }

        if (currentStyleNameOfSidebarContainer === newStyleNameToExpandSidebarContainer)
        {
            return newStyleNameToNarrowSidebarContainer;
        }
    }


    updateAdditionalStyle(idOfHtmlElement, additionalStyle, additionalOppositeStyle)
    {
        let currentStyleNameOfHtmlElement = this.htmlPageDomUpdater.getAttributeOfHtmlElementById(idOfHtmlElement, 'class');

        let selectedStyleNameToApplyToHtmlElement = this.selectStyleName(currentStyleNameOfHtmlElement, additionalStyle, additionalOppositeStyle);

        this.htmlPageDomUpdater.setAttributeOfHtmlElementById(idOfHtmlElement, 'class', selectedStyleNameToApplyToHtmlElement);
    }


    getAttachedDetachedAdditionalStyleName(isToAttachAdditionalStyleName, basicStyleName, additionalStyleName)
    {
        if (isToAttachAdditionalStyleName)
        {
            let additionalStyleNameWithoutDot = this.htmlPageDomUpdater.trimSymbolAtStart(additionalStyleName, ".");

            return `${basicStyleName} ${additionalStyleNameWithoutDot}`;
        }

        return basicStyleName;
    }


    addAdditionalStyleName(idOfHtmlElement, basicStyleName, additionalStyleName)
    {
        let newStyleName = this.getAttachedDetachedAdditionalStyleName(true, basicStyleName, additionalStyleName);

        this.htmlPageDomUpdater.setAttributeOfHtmlElementById(idOfHtmlElement, 'class', newStyleName);
    }


    removeAdditionalStyleName(idOfHtmlElement, basicStyleName, additionalStyleName)
    {
        let newStyleName = this.getAttachedDetachedAdditionalStyleName(false, basicStyleName, additionalStyleName);

        this.htmlPageDomUpdater.setAttributeOfHtmlElementById(idOfHtmlElement, 'class', newStyleName);
    }


    // Build table by clicking the sidebar button
    createHtmlTableOnClickSidebarButton(idClickedSidebarButton, dataStructure, htmlSidebarButtonConfigurations)
    {
        // computing dataTableToHtmlTableConfigurations depend on id sidebar button
        let dataTableToHtmlTableConfigurations = this.findDataTableToHtmlTableConfigurations(idClickedSidebarButton, dataStructure);

        let tableContainerDomElement = this.htmlTableCreator.constructTableContainer(dataStructure, dataTableToHtmlTableConfigurations);

        this.idOfOpenedContainerByClickingSidebarIcon = tableContainerDomElement.getAttribute("id");

        this.onClickButtonCloseTableContainer(this.idOfOpenedContainerByClickingSidebarIcon, htmlSidebarButtonConfigurations);
    }


    // add htmlTable effects
    // !!!! REPLACE HARDCODE !!!!
    addEffectsToHtmlTable(idClickedSidebarButton, dataStructure)
    {
        let dataTableToHtmlTableConfigurations = this.findDataTableToHtmlTableConfigurations(idClickedSidebarButton, dataStructure);
        let idTable = dataTableToHtmlTableConfigurations.idTable;

        let contextTableEffect = new ContextTableEffect(new TableHovering(idTable));
        contextTableEffect.appendTableOperation();

        contextTableEffect = new ContextTableEffect(new TableSearching(idTable, dataTableToHtmlTableConfigurations.idTableSearchInput));
        contextTableEffect.appendTableOperation();

        contextTableEffect = new ContextTableEffect(new TableSorting(idTable));
        contextTableEffect.appendTableOperation();


        // DO NOT REMOVE:
        //let resizerVerticalHtmlElement = new ResizerHtmlElement("idTableResizerVerticalContainer", "idTableContainer");
        let resizerVerticalHtmlElement = new ResizerHtmlElement(dataTableToHtmlTableConfigurations.idTableResizerVerticalContainer, dataTableToHtmlTableConfigurations.idTableContainer);
        resizerVerticalHtmlElement.onResize(true);

        //let resizerBottomHorizontalHtmlElement = new ResizerHtmlElement("idTableResizerBottomHorizontalContainer", "idTableContainer");
        let resizerBottomHorizontalHtmlElement = new ResizerHtmlElement(dataTableToHtmlTableConfigurations.idTableResizerBottomHorizontalContainer, dataTableToHtmlTableConfigurations.idTableContainer);
        resizerBottomHorizontalHtmlElement.onResize(false);


        // Handler for updating HtmlTable
        // ????
        let htmlTableHandler = new HtmlTableHandler();
        htmlTableHandler.onUpdateHtmlTable(idTable);
    }


    findDataTableToHtmlTableConfigurations(idClickedSidebarButton, dataStructure)
    {
        let contextSidebarButtons = new ContextSidebarButtons(idClickedSidebarButton, dataStructure);
        let dataTableToHtmlTableConfigurations = contextSidebarButtons.retrieveDataTableToHtmlTableConfigurations();

        return dataTableToHtmlTableConfigurations;
    }


    // Close container contained a table
    onClickButtonCloseTableContainer(idOfOpenedContainerByClickingSidebarIcon, htmlSidebarButtonConfigurations)
    {
        let buttonCloseTableDomElement = this.getButtonCloseTableContainer(idOfOpenedContainerByClickingSidebarIcon);

        buttonCloseTableDomElement.addEventListener("click", function (evn)
        {
            // restore color of sidebar icon that corresponds to html table
            this.onChangeColorSidebarMenuItem(htmlSidebarButtonConfigurations);

            let tableContainerDomElement = this.htmlPageDomUpdater.getDomElementOnPageById(this.idOfOpenedContainerByClickingSidebarIcon);

            tableContainerDomElement.remove();

            this.idOfOpenedContainerByClickingSidebarIcon = null;

        }.bind(this));
    }


    getButtonCloseTableContainer(idOfOpenedContainerByClickingSidebarIcon)
    {
        //let htmlConfigurationAttributesReader = new HtmlConfigurationAttributesReader();
        let attributesForHtmlTable = this.htmlConfigurationAttributesReader.getHtmlTableConfigurationsForElements();
        let idDivTableButtonClose = this.htmlConfigurationAttributesReader.getValueFromAttributes(attributesForHtmlTable.divTableButtonCloseAttributes.defaultAttributes.id);
        let tableContainerDomElement = this.htmlPageDomUpdater.getDomElementOnPageById(idOfOpenedContainerByClickingSidebarIcon);
        let buttonCloseTableDomElement = this.htmlPageDomUpdater.getDomElementsInsideParentByAttributeNameValue(tableContainerDomElement, "id", idDivTableButtonClose)[0];

        return buttonCloseTableDomElement;
    }
}