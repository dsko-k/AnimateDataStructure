import { AbstractCssEntityCalculator } from './AbstractCssEntityCalculator.js';
import { KeyframeTextHandler } from '../CssHandlers/KeyframeTextHandler.js';

export class KeyframeCalculatorTraversingNode extends AbstractCssEntityCalculator
{    
    constructor(tree, refactoredStepAnimation, keyframePrototypePropertyName, indexOfStepAnimation)
    {
        super(tree, refactoredStepAnimation);
        this.tree = tree;
        this.keyframePrototypeName = this.refactoredStepAnimation[keyframePrototypePropertyName].keyframePrototypeName;
        this.keyframeTextHandler = new KeyframeTextHandler();
        this.indexOfStepAnimation = indexOfStepAnimation;
    }


    calculateEntityName(isForNodeToAnimate)
    {
        let prefixIndexOfStepAnimation = "_IndexOfStepAnimation_" + this.indexOfStepAnimation;
        return this.keyframePrototypeName + "_Traversing_" + super.nodeIdentifierName(false) + prefixIndexOfStepAnimation;
    }


    isValueToCalculate(keyName)
    {
        this.checkKeyNameCorrectness(keyName);
        return keyName === "transform" || (keyName.length > 1 && keyName[0] === "-" && keyName[1] === "-");
    }


    getCurrentValue(cssEntityPrototypeName, keyName, persentage)
    {
        return this.keyframeTextHandler.findKeyframeKeyValue(cssEntityPrototypeName, persentage, keyName).keyframeValue;
    }


    calculateTransform(keyName, persentage)
    {
        if (keyName.includes("transform") && persentage === "100%")
        {
            let xCoordinate = this.refactoredStepAnimation.nodesInfoStepAnimation.relativeNodeToAnimateAccross.xCoordinate;
            let yCoordinate = this.refactoredStepAnimation.nodesInfoStepAnimation.relativeNodeToAnimateAccross.yCoordinate;
            let startPositionX = this.refactoredStepAnimation.nodesInfoStepAnimation.nodeToAnimate.startPositionX;
            let startPositionY = this.refactoredStepAnimation.nodesInfoStepAnimation.nodeToAnimate.startPositionY;

            return `translateX(${xCoordinate - startPositionX}px) translateY(${yCoordinate - startPositionY}px)`;
        }
    }
}