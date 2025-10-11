import { Heap } from './DatastructuresModels/Heap.js';
import { ControlHandlersHeap } from './ControlHandlers/ControlHandlersHeap.js';
import { TraversingContext } from './DatastructureTraversingTypes/TraversingContext.js';
import { DataStructurePageFunctionality } from './PageFunctionality/DataStructurePageFunctionality.js';


//let isMaxHeap = false;
//let newTree = new Heap(isMaxHeap);
//let controlHandlers = new ControlHandlersHeap(isMaxHeap, newTree);

//let traversingContext = new TraversingContext(controlHandlers, newTree);

//let dataStructurePageFunctionality = new DataStructurePageFunctionality();

//await dataStructurePageFunctionality.readPageStyles();

//dataStructurePageFunctionality.addHandlersToAllButtons(controlHandlers, traversingContext, newTree);

//dataStructurePageFunctionality.constructSidebar();

//dataStructurePageFunctionality.addAbstractMouseEffect();

//dataStructurePageFunctionality.addHandlerOnClickSidebarIcons(newTree);

//// add effects to buttons Add node, Find node, Delete node, Traverse

//dataStructurePageFunctionality.addEffectsToControlButtons();
//dataStructurePageFunctionality.addEffectsToInputField();

//controlHandlers.attachGroupControlActivityHandlers();

(async function ()
{
    let isMaxHeap = false;
    let newTree = new Heap(isMaxHeap);
    let controlHandlers = new ControlHandlersHeap(isMaxHeap, newTree);

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
})();