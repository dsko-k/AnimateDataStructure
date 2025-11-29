import { ControlHandlersAbstractMouseEffect } from '../UserInterfaceEffects/ControlHandlersAbstractMouseEffect.js';
import { HtmlConfigurationAttributesReader } from '../HtmlConfigurationAttributes/HtmlConfigurationAttributesReader.js';
import { ContextTableEffect } from '../HtmlTableOperations/ContextTableEffect.js';
import { TableHovering } from '../HtmlTableOperations/TableHovering.js';
import { TableSearching } from '../HtmlTableOperations/TableSearching.js';
import { TableSorting } from '../HtmlTableOperations/TableSorting.js';
import { HtmlTableHandler } from '../HtmlTableHandler/HtmlTableHandler.js';
import { ResizerHtmlElement } from '../HtmlDomElementHandler/ResizerHtmlElement.js';

export class HtmlTableFunctionality
{
	constructor()
	{
		this.htmlConfigurationAttributesReader = new HtmlConfigurationAttributesReader();
		this.attributesForHtmlTable = this.htmlConfigurationAttributesReader.getHtmlTableConfigurationsForElements();
		this.attributesForSidebar = this.htmlConfigurationAttributesReader.getHtmlSidebarButtonSecondConfigurations();
		this.attributesForHtmlPage = this.htmlConfigurationAttributesReader.getHtmlPageConfigurations();
	}

	addMouseEffectForSidebarButtons(idBody)
	{
		let controlHandlersAbstractMouseEffect = new ControlHandlersAbstractMouseEffect(); // Sidebar's buttons		
		let classNameButtonWithGlowingRadialBorderWithDot = this.htmlConfigurationAttributesReader.getClassFromAttributesWithDot(this.attributesForSidebar.divButtonWithGlowingRadialBorderAttributes.defaultAttributes); // ".buttonWithGlowingRadialBorder"
		let cssVariablesDivButtonWithGlowingRadialBorderAttributes = this.htmlConfigurationAttributesReader.getCssVariablesFromAttributes(this.attributesForSidebar.divButtonWithGlowingRadialBorderAttributes);
		controlHandlersAbstractMouseEffect.onMouseMoveOnElementOnParent(idBody, classNameButtonWithGlowingRadialBorderWithDot, cssVariablesDivButtonWithGlowingRadialBorderAttributes.mouseX, cssVariablesDivButtonWithGlowingRadialBorderAttributes.mouseY);
	}


	addMouseEffectsForTableCells(idBody)
	{
		let controlHandlersAbstractMouseEffect = new ControlHandlersAbstractMouseEffect();		
		let classNameBorderOfCellWithGlowingRadialBorderWithDot = this.htmlConfigurationAttributesReader.getClassFromAttributesWithDot(this.attributesForHtmlTable.divBorderOfCellWithGlowingRadialBorderAttributes.defaultAttributes); // ".borderOfCellWithGlowingRadialBorder"		
		let cssVariablesBorderOfCellWithGlowingRadialBorderAttributes = this.htmlConfigurationAttributesReader.getCssVariablesFromAttributes(this.attributesForHtmlTable.divBorderOfCellWithGlowingRadialBorderAttributes);
		controlHandlersAbstractMouseEffect.onMouseMoveOnElementOnParent(idBody, classNameBorderOfCellWithGlowingRadialBorderWithDot, cssVariablesBorderOfCellWithGlowingRadialBorderAttributes.mouseX, cssVariablesBorderOfCellWithGlowingRadialBorderAttributes.mouseY);
		let classNameTextInsideCellWithDot = this.htmlConfigurationAttributesReader.getClassFromAttributesWithDot(this.attributesForHtmlTable.pTextInsideCellAttributes.defaultAttributes); // ".textInsideCell"
		let cssVariablesPTextInsideCellAttributesAttributes = this.htmlConfigurationAttributesReader.getCssVariablesFromAttributes(this.attributesForHtmlTable.pTextInsideCellAttributes);
		controlHandlersAbstractMouseEffect.onMouseMoveOnElementOnParent(idBody, classNameTextInsideCellWithDot, cssVariablesPTextInsideCellAttributesAttributes.mouseX, cssVariablesPTextInsideCellAttributesAttributes.mouseY);
	}


	addHandlerOnTableHovering(idTable)
	{
		let contextTableEffect = new ContextTableEffect(new TableHovering(idTable));
		contextTableEffect.appendTableOperation();
	}


	addHandlerOnTableSearching(idTable, idTableSearchInput)
	{
		let contextTableEffect = new ContextTableEffect(new TableSearching(idTable, idTableSearchInput));
		contextTableEffect.appendTableOperation();
	}


	addHandlerOnTableSorting(idTable)
	{
		let contextTableEffect = new ContextTableEffect(new TableSorting(idTable));
		contextTableEffect.appendTableOperation();
	}


	addHandlerOnTableUpdate(idTable)
	{
		let htmlTableHandler = new HtmlTableHandler();
		htmlTableHandler.onUpdateHtmlTable(idTable);
	}


	addResizeEffectsToHtmlTable(idTableContainer, idTableResizerVerticalContainer, idTableResizerBottomHorizontalContainer)
	{
		let resizerVerticalHtmlElement = new ResizerHtmlElement(idTableResizerVerticalContainer, idTableContainer);
		resizerVerticalHtmlElement.onResize(true);
		let resizerBottomHorizontalHtmlElement = new ResizerHtmlElement(idTableResizerBottomHorizontalContainer, idTableContainer);
		resizerBottomHorizontalHtmlElement.onResize(false);
	}
}