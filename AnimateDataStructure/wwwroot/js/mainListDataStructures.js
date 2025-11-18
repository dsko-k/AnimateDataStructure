import { ListDataStructuresPageFunctionality } from './PageFunctionality/ListDataStructuresPageFunctionality.js';



(async function ()
{
    let listDataStructuresPageFunctionality = new ListDataStructuresPageFunctionality();

    listDataStructuresPageFunctionality.addEffectsToControlButtons();
    listDataStructuresPageFunctionality.addAbstractMouseEffect();
    listDataStructuresPageFunctionality.addEffectOnClickCardOfListDataStructure();

})();