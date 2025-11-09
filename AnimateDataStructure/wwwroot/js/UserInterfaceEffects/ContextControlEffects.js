

// Context related to the buttons Add node, Find node, Delete node, ...
export class ContextControlEffects
{
    constructor(controlButtonEffects)
    {
        this.controlButtonEffects = controlButtonEffects;
    }

    // DO NOT DELETE: effects for buttons: Add node, Find node, Delete node
    addEffectsToControlButton()
    {
        this.controlButtonEffects.onMouseDown();
        this.controlButtonEffects.onMouseUp();
        this.controlButtonEffects.onMouseClick();
    }


    addEffectsToInputField()
    {
        this.controlButtonEffects.onMouseClick();
    }


    addEffectsToCardOfListDataStructure(idCardOfListDataStructure, urlToOpenAfterRippleEffectEnded, isOpenUrlInNewBrowserTab)
    {
        this.controlButtonEffects.onClickCard(idCardOfListDataStructure, urlToOpenAfterRippleEffectEnded, isOpenUrlInNewBrowserTab);
    }


    addEffectsToCardHistory(idCardOfListDataStructure, urlToOpenAfterRippleEffectEnded, isOpenUrlInNewBrowserTab)
    {
        this.controlButtonEffects.onClickCardHistory(idCardOfListDataStructure, urlToOpenAfterRippleEffectEnded, isOpenUrlInNewBrowserTab);
    }

}