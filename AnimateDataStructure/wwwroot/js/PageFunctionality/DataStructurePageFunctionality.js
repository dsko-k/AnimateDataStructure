import { TraversingTreeInorder } from '../DatastructureTraversingTypes/TraversingTreeInorder.js';
import { TraversingTreePreorder } from '../DatastructureTraversingTypes/TraversingTreePreorder.js';
import { TraversingTreePostorder } from '../DatastructureTraversingTypes/TraversingTreePostorder.js';
import { HtmlSidebarCreator } from '../HtmlSidebar/HtmlSidebarCreator.js';
import { HtmlSidebarBuilder } from '../HtmlSidebar/HtmlSidebarBuilder.js';
import { ControlHandlersDataStructureSidebar } from '../Sidebar/ControlHandlersDataStructureSidebar.js';
import { ContextControlEffects } from '../UserInterfaceEffects/ContextControlEffects.js';
import { InputNodeEffects } from '../UserInterfaceEffects/InputNodeEffects.js';
import { ButtonAddNodeEffects } from '../UserInterfaceEffects/ButtonAddNodeEffects.js';
import { ButtonFindNodeEffects } from '../UserInterfaceEffects/ButtonFindNodeEffects.js';
import { ButtonDeleteNodeEffects } from '../UserInterfaceEffects/ButtonDeleteNodeEffects.js';
import { ButtonTraverseMenuEffects } from '../UserInterfaceEffects/ButtonTraverseMenuEffects.js';
import { ButtonTraverseInorderEffects } from '../UserInterfaceEffects/ButtonTraverseInorderEffects.js';
import { ButtonTraversePreorderEffects } from '../UserInterfaceEffects/ButtonTraversePreorderEffects.js';
import { ButtonTraversePostorderEffects } from '../UserInterfaceEffects/ButtonTraversePostorderEffects.js';
import { ButtonSaveEffects } from '../UserInterfaceEffects/ButtonSaveEffects.js';
import { CssFileReaderWriter } from '../CssHandlers/CssFileReaderWriter.js';
import { ButtonAuthenticateEffects } from '../UserInterfaceEffects/ButtonAuthenticateEffects.js';
import { InputValuesFormSender } from '../DataStructureFormInputValues/InputValuesFormSender.js';
import { ContextInputValuesFormFieldsHelper } from '../DataStructureFormInputValues/ContextInputValuesFormFieldsHelper.js';
import { InputValuesFormFieldsHelper } from '../DataStructureFormInputValues/InputValuesFormFieldsHelper.js';
import { AddNodeFormValidation } from '../DataStructureFormInputValues/AddNodeFormValidation.js';
import { FindNodeFormValidation } from '../DataStructureFormInputValues/FindNodeFormValidation.js';
import { DeleteNodeFormValidation } from '../DataStructureFormInputValues/DeleteNodeFormValidation.js';
import { TraverseNodesFormValidation } from '../DataStructureFormInputValues/TraverseNodesFormValidation.js';
import { ContextOperationFormValidation } from '../DataStructureFormInputValues/ContextOperationFormValidation.js';
import { HtmlConfigurationAttributesReader } from '../HtmlConfigurationAttributes/HtmlConfigurationAttributesReader.js';
import { SaveNodesFormValidation } from '../DataStructureFormInputValues/SaveNodesFormValidation.js';
import { HtmlTableFunctionality } from '../HtmlTableFunctionality/HtmlTableFunctionality.js';
import { ConverterConfigirationsToDomElement } from '../HtmlDomElementHandler/ConverterConfigirationsToDomElement.js';
import { ButtonHelper } from '../DomElementHelpers/ButtonHelper.js';
import { ButtonSaveHelper } from '../DomElementHelpers/ButtonSaveHelper.js';

// Wrapper to connect all implemented functionality to the page with data structure animation
export class DataStructurePageFunctionality
{
	constructor()
	{
		this.htmlConfigurationAttributesReader = new HtmlConfigurationAttributesReader();
		this.htmlTableFunctionality = new HtmlTableFunctionality();
		this.buttonHelper = new ButtonHelper();
		this.buttonSaveHelper = new ButtonSaveHelper();
		this.converterConfigirationsToDomElement = new ConverterConfigirationsToDomElement();
		this.attributesForHtmlPage = this.htmlConfigurationAttributesReader.getHtmlPageConfigurations();
		this.buttonAddRangeOfNodesConfigs = this.htmlConfigurationAttributesReader.getHtmlControlButtonAddRangeOfNodesConfigurations();
		this.inputNodeConfigs = this.htmlConfigurationAttributesReader.getHtmlInputNodeConfigurations();
	}

	async readPageStyles()
	{
		let cssFileReaderWriter = new CssFileReaderWriter();
		let pathsToCssFiles = cssFileReaderWriter.getPathsToCssFiles();
		let idStyleTag = cssFileReaderWriter.getIdStyleTag(); // 'idDataStructurePageStyles'
		await cssFileReaderWriter.writeCssIntoStyleTag(idStyleTag, pathsToCssFiles);
	}


	addHandlersToControlButtons(controlHandlers, traversingContext, dataStructure)
	{
		this.registerInputValuesFormHandlerToButtonAddNode(controlHandlers);
		this.registerInputValuesFormHandlerToButtonFindNode(controlHandlers)
		this.registerInputValuesFormHandlerToButtonDeleteNode(controlHandlers);
		this.registerInputValuesFormHandlerToButtonSave(controlHandlers);
		this.registerInputValuesFormHandlerToButtonTraverseInorder(traversingContext, controlHandlers, dataStructure);
		this.registerInputValuesFormHandlerToButtonTraversePreorder(traversingContext, controlHandlers, dataStructure);
		this.registerInputValuesFormHandlerToButtonTraversePostorder(traversingContext, controlHandlers, dataStructure);
		this.addHandlersToButtonAddRange(controlHandlers);
	}


	// 1. Handles sending form by clicking on button
	registerInputValuesFormHandlerToButtonAddNode(controlHandlers)
	{
		let callbackAnimation = controlHandlers.onClickButtonAddNode.bind(controlHandlers);
		let addNodeButtonConfigs = this.htmlConfigurationAttributesReader.getHtmlControlButtonAddNodeConfigurations();
		let idButtonAdd = addNodeButtonConfigs.buttonAddNodeAttributes.defaultAttributes.id; // 'idButtonAdd'
		this.registerInputValuesFormButtonHandler(new AddNodeFormValidation(), callbackAnimation, idButtonAdd, "submitAddNode", controlHandlers);
	}


	registerInputValuesFormHandlerToButtonFindNode(controlHandlers)
	{
		let callbackAnimation = controlHandlers.onClickButtonFindNode.bind(controlHandlers, false, false);
		let findNodeButtonConfigs = this.htmlConfigurationAttributesReader.getHtmlControlButtonFindNodeConfigurations();
		let idButtonAdd = findNodeButtonConfigs.buttonFindNodeAttributes.defaultAttributes.id; // 'idButtonFind'
		this.registerInputValuesFormButtonHandler(new FindNodeFormValidation(), callbackAnimation, idButtonAdd, "submitFindNode", controlHandlers);
	}


	registerInputValuesFormHandlerToButtonDeleteNode(controlHandlers)
	{
		let callbackAnimation = controlHandlers.onClickButtonDeleteNode.bind(controlHandlers);
		let deleteNodeButtonConfigs = this.htmlConfigurationAttributesReader.getHtmlControlButtonDeleteNodeConfigurations();
		let idButtonDelete = deleteNodeButtonConfigs.buttonDeleteNodeAttributes.defaultAttributes.id; // 'idButtonDelete'
		this.registerInputValuesFormButtonHandler(new DeleteNodeFormValidation(), callbackAnimation, idButtonDelete, "submitDeleteNode", controlHandlers);
	}


	registerInputValuesFormHandlerToButtonTraverseInorder(traversingContext, controlHandlers, dataStructure)
	{
		let callbackAnimation = () =>
		{
			traversingContext.onTraversingTree(dataStructure.root, new TraversingTreeInorder(dataStructure));
		};
		let traverseInorderButtonConfigs = this.htmlConfigurationAttributesReader.getHtmlControlButtonTraverseInorderConfigurations();
		let idButtonTraverseInorder = traverseInorderButtonConfigs.buttonTraverseInorderAttributes.defaultAttributes.id; // 'idButtonTraversingInorder'
		this.registerInputValuesFormButtonHandler(new TraverseNodesFormValidation(), callbackAnimation, idButtonTraverseInorder, "submitTraverseInorder", controlHandlers);
	}


	registerInputValuesFormHandlerToButtonTraversePreorder(traversingContext, controlHandlers, dataStructure)
	{
		let callbackAnimation = () =>
		{
			traversingContext.onTraversingTree(dataStructure.root, new TraversingTreePreorder(dataStructure));
		};
		let traversePreorderButtonConfigs = this.htmlConfigurationAttributesReader.getHtmlControlButtonTraversePreorderConfigurations();
		let idButtonTraversePreorder = traversePreorderButtonConfigs.buttonTraversePreorderAttributes.defaultAttributes.id; // 'idButtonTraversingPreorder'
		this.registerInputValuesFormButtonHandler(new TraverseNodesFormValidation(), callbackAnimation, idButtonTraversePreorder, "submitTraversePreorder", controlHandlers);
	}


	registerInputValuesFormHandlerToButtonTraversePostorder(traversingContext, controlHandlers, dataStructure)
	{
		let callbackAnimation = () =>
		{
			traversingContext.onTraversingTree(dataStructure.root, new TraversingTreePostorder(dataStructure));
		};
		let traversePostorderButtonConfigs = this.htmlConfigurationAttributesReader.getHtmlControlButtonTraversePostorderConfigurations();
		let idButtonTraversePostorder = traversePostorderButtonConfigs.buttonTraversePostorderAttributes.defaultAttributes.id; // 'idButtonTraversingPostorder'
		this.registerInputValuesFormButtonHandler(new TraverseNodesFormValidation(), callbackAnimation, idButtonTraversePostorder, "submitTraversePostorder", controlHandlers);
	}

	
	registerInputValuesFormButtonHandler(buttonFormValidation, callbackAnimation, idButton, submitEventNameToHandle, controlHandlers)
	{
		let contextInputValuesFormFieldsHelper = new ContextInputValuesFormFieldsHelper(new InputValuesFormFieldsHelper());
		let contextFormValidation = new ContextOperationFormValidation(buttonFormValidation);
		let inputValuesFormSender = new InputValuesFormSender();
		let buttonInput = document.getElementById(idButton);
		let relativeUrlToSubmitForm = inputValuesFormSender.getRelativeUrlToSubmitForm(buttonInput);
		inputValuesFormSender.onSubmitFormInputNodeValue(contextInputValuesFormFieldsHelper, contextFormValidation, relativeUrlToSubmitForm,
			callbackAnimation, submitEventNameToHandle, controlHandlers);
	}

		
	registerInputValuesFormHandlerToButtonSave(controlHandlers)
	{
		let contextInputValuesFormFieldsHelper = new ContextInputValuesFormFieldsHelper(new InputValuesFormFieldsHelper());
		let contextFormValidation = new ContextOperationFormValidation(new SaveNodesFormValidation());
		let inputValuesFormSender = new InputValuesFormSender();
		let saveButtonConfigs = this.htmlConfigurationAttributesReader.getHtmlControlButtonSaveConfigurations();
		let idButtonSave = saveButtonConfigs.buttonSaveAttributes.defaultAttributes.id; // 'idButtonSave'
		let buttonSave = document.getElementById(idButtonSave);
		let relativeUrlToSubmitForm = inputValuesFormSender.getRelativeUrlToSubmitForm(buttonSave);
		inputValuesFormSender.onSubmitFormSaveCurrentTree(contextInputValuesFormFieldsHelper, contextFormValidation, relativeUrlToSubmitForm,
			controlHandlers, "submitSaveNodes");
	}


	addHandlersToButtonAddRange(controlHandlers)
	{
		let buttonAddRangeNodes = this.converterConfigirationsToDomElement.getDomElementFromConfigurations(this.buttonAddRangeOfNodesConfigs.buttonAddRangeAttributes);
		buttonAddRangeNodes.addEventListener('click', controlHandlers.onAddRangeOfNodes.bind(controlHandlers));
	}


	// Sidebar creation
	constructSidebar()
	{		
		let htmlSidebarCreator = new HtmlSidebarCreator(new HtmlSidebarBuilder());
		htmlSidebarCreator.constructSidebar();
	}


	addAbstractMouseEffect()
	{
		let idBody = this.attributesForHtmlPage.bodyPageAttributes.defaultAttributes.id; // "idBody"
		this.htmlTableFunctionality.addMouseEffectForSidebarButtons(idBody);
		this.htmlTableFunctionality.addMouseEffectsForTableCells(idBody);
	}


	addHandlerOnClickSidebarIcons(dataStructure)
	{
		let controlHandlersDataStructureSidebar = new ControlHandlersDataStructureSidebar();
		controlHandlersDataStructureSidebar.onClickSidebarIcons(dataStructure);
	}


	// This method should be called as early as possible due event 'DOMContentLoaded'
	addEffectsToControlButtons()
	{
		let contextControlButtonEffectsAddNode = new ContextControlEffects(new ButtonAddNodeEffects());
		contextControlButtonEffectsAddNode.addEffectsToControlButton();
		let contextControlButtonEffectsFindNode = new ContextControlEffects(new ButtonFindNodeEffects());
		contextControlButtonEffectsFindNode.addEffectsToControlButton();
		let contextControlButtonEffectsDeleteNode = new ContextControlEffects(new ButtonDeleteNodeEffects());
		contextControlButtonEffectsDeleteNode.addEffectsToControlButton();
		let contextControlButtonEffectsTraverseMenu = new ContextControlEffects(new ButtonTraverseMenuEffects());
		contextControlButtonEffectsTraverseMenu.addEffectsToControlButton();
		let contextControlButtonEffectsTraverseInorder = new ContextControlEffects(new ButtonTraverseInorderEffects());
		contextControlButtonEffectsTraverseInorder.addEffectsToControlButton();
		let contextControlButtonEffectsTraversePreorder = new ContextControlEffects(new ButtonTraversePreorderEffects());
		contextControlButtonEffectsTraversePreorder.addEffectsToControlButton();
		let contextControlButtonEffectsTraversePostorder = new ContextControlEffects(new ButtonTraversePostorderEffects());
		contextControlButtonEffectsTraversePostorder.addEffectsToControlButton();
		let contextControlButtonEffectsSave = new ContextControlEffects(new ButtonSaveEffects());
		contextControlButtonEffectsSave.addEffectsToControlButton();		
		let buttonAuthenticateEffects = new ButtonAuthenticateEffects();
		let contextControlButtonEffectsAuthenticate = new ContextControlEffects(buttonAuthenticateEffects);
		contextControlButtonEffectsAuthenticate.addEffectsToControlButton();
		buttonAuthenticateEffects.addAuthorizationButtonBehaviorHandlers();
	}


	addEffectsToInputField()
	{
		let contextInputNodeEffects = new ContextControlEffects(new InputNodeEffects());
		contextInputNodeEffects.addEffectsToInputField();
	}


	// method must be invoked after all scripts loaded
	onPageLoadClickOnButtonAddRange()
	{
		// Do not use event listenter here. Instead inwoke this method at the end of script main....js
		// It guaranties that method will be invoked after all scripts loaded
		this.clickOnButtonAddRange();
	}


	clickOnButtonAddRange()
	{
		// Do not use event listenter here. Instead inwoke this method at the end of script main....js
		// It guaranties that method will be invoked after all scripts loaded
		let inputForNodeValueDomElement = this.converterConfigirationsToDomElement.getDomElementFromConfigurations(this.inputNodeConfigs.inputAttributes);
		if (inputForNodeValueDomElement.value !== "")
		{
			this.buttonHelper.emulateClickOnButtonFromConfigurations(this.buttonAddRangeOfNodesConfigs.buttonAddRangeAttributes);
			this.buttonSaveHelper.setInscriptionSavedForButtonSave();
		}
	}


	removeLoadingMask()
	{
		let loadingMaskConfigs = this.htmlConfigurationAttributesReader.getHtmlPageLoadingMaskConfigurations();
		let loadingMaskContainer = this.converterConfigirationsToDomElement.getDomElementFromConfigurations(loadingMaskConfigs.divLoadingMaskAttributes);
		if (loadingMaskContainer)
        {
			loadingMaskContainer.remove();
        }
	}
}
