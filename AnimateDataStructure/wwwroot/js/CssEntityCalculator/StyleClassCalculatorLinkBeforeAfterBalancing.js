import { AbstractCssEntityCalculator } from './AbstractCssEntityCalculator.js';
import { StyleClassTextHandler } from '../CssHandlers/StyleClassTextHandler.js';

export class StyleClassCalculatorLinkBeforeAfterBalancing extends AbstractCssEntityCalculator
{
    constructor(tree, refactoredStepAnimation, allStepAnimation)
    {
        super(tree, refactoredStepAnimation, allStepAnimation);
        this.tree = tree;
        this.styleClassPrototypeName = refactoredStepAnimation.styleClassPrototypeStepAnimation.styleClassPrototypeName;
        this.styleClassTextHandler = new StyleClassTextHandler();
    }


    calculateEntityName(isForNodeToAnimate)
    {
        return this.styleClassPrototypeName + "_" + super.nodeIdentifierName(isForNodeToAnimate);
    }


    getCurrentValue(cssEntityPrototypeName, keyName)
    {
        return this.styleClassTextHandler.getStyleValue(cssEntityPrototypeName, keyName).styleValue; // do not change value from prototype style
    }


    calculateAnimationDelayMovingLine(keyName)
    {
        if (keyName === "--animationDelayMovingLine")
        {
            return `${parseFloat(this.refactoredStepAnimation.timeStepAnimation.timeDelayStep)}s`;
        }
    }


    calculateAnimationDurationSuperContainer(keyName)
    {
        if (keyName === "--animationDurationSuperContainer")
        {
            return `${parseFloat(this.refactoredStepAnimation.timeStepAnimation.timeDurationStep)}s`;
        }
    }


    calculateAnimationSvgLineLink(keyName)
    {
        if (keyName === "--animationSvgLineLink")
        {
            let keyframeNamePrefix = this.chooseKeyframeNamePrefix("_BeforeBalancing_", "_AfterBalancing_");

            return this.refactoredStepAnimation["keyframesPrototypeSvgLineLink"].keyframePrototypeName + keyframeNamePrefix + this.tree.balancedTimes + "_" + super.nodeIdentifierName(true);
        }
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