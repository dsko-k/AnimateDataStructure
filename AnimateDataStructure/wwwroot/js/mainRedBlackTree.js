import { RedBlackTree } from './DatastructuresModels/RedBlackTree.js';
import { ControlHandlersRedBlackTree } from './ControlHandlers/ControlHandlersRedBlackTree.js';
import { TraversingContext } from './DatastructureTraversingTypes/TraversingContext.js';
import { DataStructurePageFunctionality } from './PageFunctionality/DataStructurePageFunctionality.js';

(async function ()
{
    let newTree = new RedBlackTree();
    let controlHandlers = new ControlHandlersRedBlackTree(newTree);
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