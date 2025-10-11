import { TraversingTreeInorder } from '../DatastructureTraversingTypes/TraversingTreeInorder.js';
import { TraversingTreePreorder } from '../DatastructureTraversingTypes/TraversingTreePreorder.js';
import { TraversingTreePostorder } from '../DatastructureTraversingTypes/TraversingTreePostorder.js';
import { HtmlSidebarCreator } from '../HtmlSidebar/HtmlSidebarCreator.js';
import { HtmlSidebarBuilder } from '../HtmlSidebar/HtmlSidebarBuilder.js';
import { ControlHandlersAbstractMouseEffect } from '../UserInterfaceEffects/ControlHandlersAbstractMouseEffect.js';
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
// ??????
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



// Wrapper to connect all implemented functionality to the page with data structure animation
export class DataStructurePageFunctionality
{
	constructor()
	{
		this.htmlConfigurationAttributesReader = new HtmlConfigurationAttributesReader();
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

		//this.addHandlersToButtonAdd(controlHandlers);
		//this.addHandlersToButtonFind(controlHandlers);
		//this.addHandlersToButtonDelete(controlHandlers);

		//this.addHandlersToButtonTraversingTreeInorder(traversingContext, controlHandlers, dataStructure);
		//this.addHandlersToButtonTraversingTreePreorder(traversingContext, controlHandlers, dataStructure);
		//this.addHandlersToButtonTraversingTreePostorder(traversingContext, controlHandlers, dataStructure);

		this.addHandlersToButtonAddRange(controlHandlers);
	}


	// 1. Add a method that handles sending form by clicking on button
	// 2. Send form by clicking on button (in buttonEffects handler)
	// 3. If response is ok then run animation controlHandlers.onClickButtonAddNode
	// 4. If validation failed or response is not ok then show errors


	// ????
	// 1. Handles sending form by clicking on button
	registerInputValuesFormHandlerToButtonAddNode(controlHandlers)
	{
		//let contextInputValuesFormFieldsHelper = new ContextInputValuesFormFieldsHelper(new InputValuesFormFieldsHelper());

		//let contextFormValidation = new ContextOperationFormValidation(new AddNodeFormValidation()); // Differ

		//let callbackAnimation = controlHandlers.onClickButtonAddNode.bind(controlHandlers); // Differ

		//let inputValuesFormSender = new InputValuesFormSender();

		//let buttonAddNode = document.getElementById('idButtonAdd'); // Differ
		//let relativeUrlToSubmitForm = inputValuesFormSender.getRelativeUrlToSubmitForm(buttonAddNode);

		//inputValuesFormSender.onSubmitForm(contextInputValuesFormFieldsHelper,
		//	contextFormValidation,
		//	relativeUrlToSubmitForm,
		//	callbackAnimation,
		//	"submitAddNode");

		let callbackAnimation = controlHandlers.onClickButtonAddNode.bind(controlHandlers); // Differ

		let addNodeButtonConfigs = this.htmlConfigurationAttributesReader.getHtmlControlButtonAddNodeConfigurations();
		let idButtonAdd = addNodeButtonConfigs.buttonAddNodeAttributes.defaultAttributes.id; // 'idButtonAdd'

		this.registerInputValuesFormButtonHandler(new AddNodeFormValidation(), callbackAnimation, idButtonAdd, "submitAddNode", controlHandlers);
	}


	registerInputValuesFormHandlerToButtonFindNode(controlHandlers)
	{
		let callbackAnimation = controlHandlers.onClickButtonFindNode.bind(controlHandlers, false, false); // Differ

		let findNodeButtonConfigs = this.htmlConfigurationAttributesReader.getHtmlControlButtonFindNodeConfigurations();
		let idButtonAdd = findNodeButtonConfigs.buttonFindNodeAttributes.defaultAttributes.id; // 'idButtonFind'

		this.registerInputValuesFormButtonHandler(new FindNodeFormValidation(), callbackAnimation, idButtonAdd, "submitFindNode", controlHandlers);
	}


	registerInputValuesFormHandlerToButtonDeleteNode(controlHandlers)
	{
		let callbackAnimation = controlHandlers.onClickButtonDeleteNode.bind(controlHandlers); // Differ

		let deleteNodeButtonConfigs = this.htmlConfigurationAttributesReader.getHtmlControlButtonDeleteNodeConfigurations();
		let idButtonDelete = deleteNodeButtonConfigs.buttonDeleteNodeAttributes.defaultAttributes.id; // 'idButtonDelete'

		this.registerInputValuesFormButtonHandler(new DeleteNodeFormValidation(), callbackAnimation, idButtonDelete, "submitDeleteNode", controlHandlers);
	}


	// ???
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


	// ???
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


	// ???
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

		let buttonInput = document.getElementById(idButton); // Differ
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

		let buttonSave = document.getElementById(idButtonSave); // Differ
		let relativeUrlToSubmitForm = inputValuesFormSender.getRelativeUrlToSubmitForm(buttonSave);

		inputValuesFormSender.onSubmitFormSaveCurrentTree(contextInputValuesFormFieldsHelper, contextFormValidation, relativeUrlToSubmitForm,
			controlHandlers, "submitSaveNodes");
	}


	//addHandlersToButtonAdd(controlHandlers)
	//{
	//	let buttonAdd = document.getElementById('idButtonAdd');

	//	buttonAdd.addEventListener('click', controlHandlers.onClickButtonAddNode.bind(controlHandlers));
	//}


	//addHandlersToButtonFind(controlHandlers)
	//{
	//	let buttonFind = document.getElementById('idButtonFind');

	//	buttonFind.addEventListener('click', controlHandlers.onClickButtonFindNode.bind(controlHandlers, false, false));
	//}


	//addHandlersToButtonDelete(controlHandlers)
	//{
	//	let buttonDelete = document.getElementById('idButtonDelete');

	//	buttonDelete.addEventListener('click', controlHandlers.onClickButtonDeleteNode.bind(controlHandlers));
	//}


	addHandlersToButtonAddRange(controlHandlers)
	{
		let buttonAddRangeNodes = document.getElementById('idButtonAddRange');

		buttonAddRangeNodes.addEventListener('click', controlHandlers.onAddRangeOfNodes.bind(controlHandlers));
	}


	//addHandlersToButtonTraversingTreeInorder(traversingContext, controlHandlers, dataStructure)
	//{
	//	//let traversingContext = new TraversingContext(controlHandlers, dataStructure);

	//	let buttonTraversingInorder = document.getElementById('idButtonTraversingInorder');

	//	buttonTraversingInorder.addEventListener('click', function (evn)
	//	{
	//		traversingContext.onTraversingTree(dataStructure.root, new TraversingTreeInorder(dataStructure));

	//	}.bind(controlHandlers));
	//}


	//addHandlersToButtonTraversingTreePreorder(traversingContext, controlHandlers, dataStructure)
	//{
	//	//let traversingContext = new TraversingContext(controlHandlers, dataStructure);

	//	let buttonTraversingPreorder = document.getElementById('idButtonTraversingPreorder');

	//	buttonTraversingPreorder.addEventListener('click', function (evn)
	//	{
	//		traversingContext.onTraversingTree(dataStructure.root, new TraversingTreePreorder(dataStructure));

	//	}.bind(controlHandlers));
	//}


	//addHandlersToButtonTraversingTreePostorder(traversingContext, controlHandlers, dataStructure)
	//{
	//	//let traversingContext = new TraversingContext(controlHandlers, dataStructure);

	//	let buttonTraversingPostorder = document.getElementById('idButtonTraversingPostorder');

	//	buttonTraversingPostorder.addEventListener('click', function (evn)
	//	{
	//		traversingContext.onTraversingTree(dataStructure.root, new TraversingTreePostorder(dataStructure));

	//	}.bind(controlHandlers));
	//}


	// Sidebar creation
	constructSidebar()
	{		
		let htmlSidebarCreator = new HtmlSidebarCreator(new HtmlSidebarBuilder());
		htmlSidebarCreator.constructSidebar();
	}


	addAbstractMouseEffect()
	{
		// Sidebar's buttons
		let controlHandlersAbstractMouseEffect = new ControlHandlersAbstractMouseEffect();

		// REPLACE HARDCODE !!!!!!
		controlHandlersAbstractMouseEffect.onMouseMoveOnElementOnParent("idBody", ".buttonWithGlowingRadialBorder", "--mouse-x", "--mouse-y");
		controlHandlersAbstractMouseEffect.onMouseMoveOnElementOnParent("idBody", ".borderOfCellWithGlowingRadialBorder", "--mouse-x", "--mouse-y");
		controlHandlersAbstractMouseEffect.onMouseMoveOnElementOnParent("idBody", ".textInsideCell", "--mouse-x", "--mouse-y");
	}


	addHandlerOnClickSidebarIcons(dataStructure)
	{
		let controlHandlersDataStructureSidebar = new ControlHandlersDataStructureSidebar();
		controlHandlersDataStructureSidebar.onClickSidebarIcons(dataStructure);
	}


	// DO NOT DELETE:
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

		//???
		let buttonAuthenticateEffects = new ButtonAuthenticateEffects();

		let contextControlButtonEffectsAuthenticate = new ContextControlEffects(buttonAuthenticateEffects);
		contextControlButtonEffectsAuthenticate.addEffectsToControlButton();

		buttonAuthenticateEffects.addAuthorizationButtonBehaviorHandlers(); // here handler for event 'DOMContentLoaded'
	}


	addEffectsToInputField()
	{
		let contextInputNodeEffects = new ContextControlEffects(new InputNodeEffects());
		contextInputNodeEffects.addEffectsToInputField();
	}

}
