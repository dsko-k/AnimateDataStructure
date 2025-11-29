import { BinarySearchTree } from './DatastructuresModels/BinarySearchTree.js';
import { ControlHandlersBinarySearchTree } from './ControlHandlers/ControlHandlersBinarySearchTree.js';
import { TraversingContext } from './DatastructureTraversingTypes/TraversingContext.js';
import { DataStructurePageFunctionality } from './PageFunctionality/DataStructurePageFunctionality.js';

(async function ()
{
    let newTree = new BinarySearchTree();
    let controlHandlers = new ControlHandlersBinarySearchTree(newTree);
    let traversingContext = new TraversingContext(controlHandlers, newTree);
    let dataStructurePageFunctionality = new DataStructurePageFunctionality();
    dataStructurePageFunctionality.removeLoadingMask(); // use before await dataStructurePageFunctionality.readPageStyles();
    dataStructurePageFunctionality.addEffectsToControlButtons();
    await dataStructurePageFunctionality.readPageStyles();
    dataStructurePageFunctionality.addHandlersToControlButtons(controlHandlers, traversingContext, newTree);
    dataStructurePageFunctionality.constructSidebar();
    dataStructurePageFunctionality.addAbstractMouseEffect();
    dataStructurePageFunctionality.addHandlerOnClickSidebarIcons(newTree);
    dataStructurePageFunctionality.addEffectsToInputField();
    controlHandlers.attachGroupControlActivityHandlers();    
    dataStructurePageFunctionality.onPageLoadClickOnButtonAddRange(); // Run at the end of the script
})();