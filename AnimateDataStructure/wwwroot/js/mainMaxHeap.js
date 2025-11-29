import { Heap } from './DatastructuresModels/Heap.js';
import { ControlHandlersHeap } from './ControlHandlers/ControlHandlersHeap.js';
import { TraversingContext } from './DatastructureTraversingTypes/TraversingContext.js';
import { DataStructurePageFunctionality } from './PageFunctionality/DataStructurePageFunctionality.js';

(async function ()
{
    let isMaxHeap = true;
    let newTree = new Heap(isMaxHeap);
    let controlHandlers = new ControlHandlersHeap(isMaxHeap, newTree);
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