import { AbstractCssEntityCalculator } from './AbstractCssEntityCalculator.js';
import { KeyframeTextHandler } from '../CssHandlers/KeyframeTextHandler.js';

export class KeyframeCalculatorLinkBeforeAfterBalancing extends AbstractCssEntityCalculator
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
        let keyframeNamePrefix = this.chooseKeyframeNamePrefix("_BeforeBalancing_", "_AfterBalancing_");
        return this.keyframePrototypeName + keyframeNamePrefix + this.tree.balancedTimes + "_" + super.nodeIdentifierName(true);
    }


    isValueToCalculate(keyName)
    {
        this.checkKeyNameCorrectness(keyName);
        return (keyName.length > 1 && keyName[0] === "-" && keyName[1] === "-");
    }


    getCurrentValue(cssEntityPrototypeName, keyName, persentage)
    {
        return this.keyframeTextHandler.findKeyframeKeyValue(cssEntityPrototypeName, persentage, keyName).keyframeValue;
    }


    chooseKeyframeNamePrefix(firstKeyframeNamePrefix, secondKeyframeNamePrefix) // firstKeyframeNamePrefix = "_BeforeBalancing_";  secondKeyframeNamePrefix = "_AfterBalancing_"
    {
        let patternStepName = this.refactoredStepAnimation.nodesInfoStepAnimation.patternStepName;

        if (patternStepName.includes("draw link"))
        {
            return secondKeyframeNamePrefix;
        }
        else if (patternStepName.includes("erase link"))
        {
            return firstKeyframeNamePrefix;
        }
        else
        {
            throw new Error(`Incorrect pattern step name '{patternStepName}'`);
        }
    }
}