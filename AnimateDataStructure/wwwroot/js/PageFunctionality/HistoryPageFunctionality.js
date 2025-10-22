import { ContextControlEffects } from '../UserInterfaceEffects/ContextControlEffects.js';
import { ButtonAuthenticateEffects } from '../UserInterfaceEffects/ButtonAuthenticateEffects.js'
import { ControlHandlersAbstractMouseEffect } from '../UserInterfaceEffects/ControlHandlersAbstractMouseEffect.js';
import { HtmlConfigurationAttributesReader } from '../HtmlConfigurationAttributes/HtmlConfigurationAttributesReader.js';
import { ContextTableEffect } from '../HtmlTableOperations/ContextTableEffect.js';
import { TableHovering } from '../HtmlTableOperations/TableHovering.js';
import { TableSearching } from '../HtmlTableOperations/TableSearching.js';
import { TableSorting } from '../HtmlTableOperations/TableSorting.js';
import { HtmlTableHandler } from '../HtmlTableHandler/HtmlTableHandler.js';
import { ResizerHtmlElement } from '../HtmlDomElementHandler/ResizerHtmlElement.js';


export class HistoryPageFunctionality
{
	constructor()
	{
		this.htmlConfigurations = new HtmlConfigurationAttributesReader();
		//this.cardsConfigurations = this.htmlConfigurations.getHtmlCardsOfListDatastructuresConfigurations();
	}

	addEffectsToControlButtons()
	{
		let buttonAuthenticateEffects = new ButtonAuthenticateEffects();

		let contextControlButtonEffectsAuthenticate = new ContextControlEffects(buttonAuthenticateEffects);
		contextControlButtonEffectsAuthenticate.addEffectsToControlButton();
		buttonAuthenticateEffects.addAuthorizationButtonBehaviorHandlers();
	}


	// ???
	addAbstractMouseEffect()
	{
		// Sidebar's buttons
		let controlHandlersAbstractMouseEffect = new ControlHandlersAbstractMouseEffect();

		// REPLACE HARDCODE !!!!!!
		controlHandlersAbstractMouseEffect.onMouseMoveOnElementOnParent("idBody", ".buttonWithGlowingRadialBorder", "--mouse-x", "--mouse-y");
		controlHandlersAbstractMouseEffect.onMouseMoveOnElementOnParent("idBody", ".borderOfCellWithGlowingRadialBorder", "--mouse-x", "--mouse-y");
		controlHandlersAbstractMouseEffect.onMouseMoveOnElementOnParent("idBody", ".textInsideCell", "--mouse-x", "--mouse-y");
	}


	// ???
	addEffectsToHtmlTable(idTable, idTableSearchInput)
	{
		//let dataTableToHtmlTableConfigurations = this.findDataTableToHtmlTableConfigurations(idClickedSidebarButton, dataStructure);
		//let idTable = dataTableToHtmlTableConfigurations.idTable;

		let contextTableEffect = new ContextTableEffect(new TableHovering(idTable));
		contextTableEffect.appendTableOperation();

		contextTableEffect = new ContextTableEffect(new TableSearching(idTable, idTableSearchInput));
		contextTableEffect.appendTableOperation();

		contextTableEffect = new ContextTableEffect(new TableSorting(idTable));
		contextTableEffect.appendTableOperation();


		// DO NOT REMOVE:
		let resizerVerticalHtmlElement = new ResizerHtmlElement("idTableHistoryResizerVerticalContainer", "idTableHistoryTableContainer");		
		resizerVerticalHtmlElement.onResize(true);

		let resizerBottomHorizontalHtmlElement = new ResizerHtmlElement("idTableHistoryResizerBottomHorizontalContainer", "idTableHistoryTableContainer");
		resizerBottomHorizontalHtmlElement.onResize(false);


		// Handler for updating HtmlTable
		// ????
		let htmlTableHandler = new HtmlTableHandler();
		htmlTableHandler.onUpdateHtmlTable(idTable);
	}

}