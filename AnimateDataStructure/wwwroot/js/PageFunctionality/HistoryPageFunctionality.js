import { ContextControlEffects } from '../UserInterfaceEffects/ContextControlEffects.js';
import { ButtonAuthenticateEffects } from '../UserInterfaceEffects/ButtonAuthenticateEffects.js';
import { HtmlConfigurationAttributesReader } from '../HtmlConfigurationAttributes/HtmlConfigurationAttributesReader.js';
import { HtmlTableFunctionality } from '../HtmlTableFunctionality/HtmlTableFunctionality.js'


export class HistoryPageFunctionality
{
	constructor()
	{
		this.htmlConfigurationAttributesReader = new HtmlConfigurationAttributesReader();
		this.attributesForHtmlTable = this.htmlConfigurationAttributesReader.getHtmlTableConfigurationsForElements();
		this.attributesForHtmlPage = this.htmlConfigurationAttributesReader.getHtmlPageConfigurations();
		this.attributesForHistoryTable = this.htmlConfigurationAttributesReader.getHistoryTableConfigurations();

		this.htmlTableFunctionality = new HtmlTableFunctionality();
		this.idTableHistory = this.attributesForHistoryTable.tableHistoryAttributes.defaultAttributes.id; // "idHistoryTable"
		this.idTableHistorySearchInput = this.attributesForHistoryTable.inputTableSearchAttributes.defaultAttributes.id; // "idTableHistorySearchInput"
		this.idHistoryTableResizerVerticalContainer = this.attributesForHistoryTable.divTableResizerVerticalAttributes.defaultAttributes.id; // "idHistoryTableResizerVerticalContainer"
		this.idHistoryTableResizerBottomHorizontalContainer = this.attributesForHistoryTable.divTableResizerHorizontalAttributes.defaultAttributes.id; // "idHistoryTableResizerBottomHorizontalContainer"
		this.idHistoryTableContainer = this.attributesForHistoryTable.divHistoryTableContainerAttributes.defaultAttributes.id; // "idHistoryTableContainer"
	}


	addEffectsToControlButtons()
	{
		let buttonAuthenticateEffects = new ButtonAuthenticateEffects();

		let contextControlButtonEffectsAuthenticate = new ContextControlEffects(buttonAuthenticateEffects);
		contextControlButtonEffectsAuthenticate.addEffectsToControlButton();
		buttonAuthenticateEffects.addAuthorizationButtonBehaviorHandlers();
	}


	addEffectsToHistoryTable()
	{
		this.htmlTableFunctionality.addMouseEffectsForTableCells(this.idTableHistory);

		this.htmlTableFunctionality.addHandlerOnTableHovering(this.idTableHistory);
		this.htmlTableFunctionality.addHandlerOnTableSearching(this.idTableHistory, this.idTableHistorySearchInput);
		this.htmlTableFunctionality.addHandlerOnTableSorting(this.idTableHistory);

		this.htmlTableFunctionality.addResizeEffectsToHtmlTable(this.idHistoryTableContainer, this.idHistoryTableResizerVerticalContainer, this.idHistoryTableResizerBottomHorizontalContainer);
		
		this.htmlTableFunctionality.addHandlerOnTableUpdate(this.idTableHistory);
	}

}