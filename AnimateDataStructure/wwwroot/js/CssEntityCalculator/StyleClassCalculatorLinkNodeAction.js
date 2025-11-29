import { AbstractCssEntityCalculator } from './AbstractCssEntityCalculator.js';
import { StyleClassTextHandler } from '../CssHandlers/StyleClassTextHandler.js';

export class StyleClassCalculatorLinkNodeAction extends AbstractCssEntityCalculator
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
            return this.refactoredStepAnimation["keyframesPrototypeSvgLineLink"].keyframePrototypeName + "_LinkNodeAction";
        }
    }
}