import { HistoryPageFunctionality } from './PageFunctionality/HistoryPageFunctionality.js';



(async function ()
{
    let historyPageFunctionality = new HistoryPageFunctionality();

    historyPageFunctionality.addEffectsToControlButtons();

    historyPageFunctionality.addAbstractMouseEffect();

    historyPageFunctionality.addEffectsToHtmlTable("idTableHistory", "idTableHistorySearchInput");

})();