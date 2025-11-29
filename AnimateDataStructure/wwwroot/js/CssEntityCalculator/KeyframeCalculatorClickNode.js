import { AbstractCssEntityCalculator } from './AbstractCssEntityCalculator.js';
import { KeyframeTextHandler } from '../CssHandlers/KeyframeTextHandler.js';

export class KeyframeCalculatorClickNode extends AbstractCssEntityCalculator
{
    constructor(tree, refactoredStepAnimation, keyframePrototypePropertyName)
    {
        super(tree, refactoredStepAnimation);
        this.tree = tree;
        this.keyframePrototypeName = this.refactoredStepAnimation[keyframePrototypePropertyName].keyframePrototypeName;
        this.keyframeTextHandler = new KeyframeTextHandler();
    }


    calculateEntityName(isForNodeToAnimate)
    {
        return this.keyframePrototypeName + this.tree.treeViewState.getClickedTimes();
    }


    isValueToCalculate(keyName)
    {
        this.checkKeyNameCorrectness(keyName);
        return keyName.length > 1 && keyName[0] === "-" && keyName[1] === "-";
    }

}