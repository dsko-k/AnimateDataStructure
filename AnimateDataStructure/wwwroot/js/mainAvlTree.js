import { AvlTree } from './DatastructuresModels/AvlTree.js';
import { ControlHandlersAVLTree } from './ControlHandlers/ControlHandlersAVLTree.js';
import { TraversingContext } from './DatastructureTraversingTypes/TraversingContext.js';
import { DataStructurePageFunctionality } from './PageFunctionality/DataStructurePageFunctionality.js';


(async function ()
{
    let newTree = new AvlTree();

    let controlHandlers = new ControlHandlersAVLTree(newTree);

    let traversingContext = new TraversingContext(controlHandlers, newTree);

    let dataStructurePageFunctionality = new DataStructurePageFunctionality();

    // DO NOT DELETE: Call here (as early as possible)
    // add effects to buttons Add node, Find node, Delete node, Traverse...
    dataStructurePageFunctionality.addEffectsToControlButtons();

    await dataStructurePageFunctionality.readPageStyles();

    dataStructurePageFunctionality.addHandlersToControlButtons(controlHandlers, traversingContext, newTree);

    dataStructurePageFunctionality.constructSidebar();

    dataStructurePageFunctionality.addAbstractMouseEffect();

    dataStructurePageFunctionality.addHandlerOnClickSidebarIcons(newTree);

    dataStructurePageFunctionality.addEffectsToInputField();

    controlHandlers.attachGroupControlActivityHandlers();

    // DO NOT DELETE: Run at the end of the script
    dataStructurePageFunctionality.onPageLoadClickOnButtonAddRange();

})();