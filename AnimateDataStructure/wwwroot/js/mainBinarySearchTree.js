import { BinarySearchTree } from './DatastructuresModels/BinarySearchTree.js';
import { ControlHandlersBinarySearchTree } from './ControlHandlers/ControlHandlersBinarySearchTree.js';
import { TraversingContext } from './DatastructureTraversingTypes/TraversingContext.js';
import { DataStructurePageFunctionality } from './PageFunctionality/DataStructurePageFunctionality.js';



//let newTree = new BinarySearchTree();

//let controlHandlers = new ControlHandlersBinarySearchTree(newTree);

//let traversingContext = new TraversingContext(controlHandlers, newTree);

//let dataStructurePageFunctionality = new DataStructurePageFunctionality();

//await dataStructurePageFunctionality.readPageStyles();

//dataStructurePageFunctionality.addHandlersToAllButtons(controlHandlers, traversingContext, newTree);

//dataStructurePageFunctionality.constructSidebar();

//dataStructurePageFunctionality.addAbstractMouseEffect();

//dataStructurePageFunctionality.addHandlerOnClickSidebarIcons(newTree);

//// add effects to buttons Add node, Find node, Delete node, Traverse...
//dataStructurePageFunctionality.addEffectsToControlButtons();
//dataStructurePageFunctionality.addEffectsToInputField();

//controlHandlers.attachGroupControlActivityHandlers();


// Wrap the code in an async function and call it immediately
(async function ()
{
    let newTree = new BinarySearchTree();

    let controlHandlers = new ControlHandlersBinarySearchTree(newTree);

    let traversingContext = new TraversingContext(controlHandlers, newTree);

    let dataStructurePageFunctionality = new DataStructurePageFunctionality();

    // DO NOT DELETE: Call here (as early as possible)
    // add effects to buttons Add node, Find node, Delete node, Traverse...
    dataStructurePageFunctionality.addEffectsToControlButtons();

    // Use await inside the function
    await dataStructurePageFunctionality.readPageStyles();

    dataStructurePageFunctionality.addHandlersToControlButtons(controlHandlers, traversingContext, newTree);

    dataStructurePageFunctionality.constructSidebar();

    dataStructurePageFunctionality.addAbstractMouseEffect();

    dataStructurePageFunctionality.addHandlerOnClickSidebarIcons(newTree);

    dataStructurePageFunctionality.addEffectsToInputField();

    controlHandlers.attachGroupControlActivityHandlers();
})();