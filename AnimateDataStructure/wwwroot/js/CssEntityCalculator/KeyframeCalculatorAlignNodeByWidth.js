import { AbstractCssEntityCalculator } from './AbstractCssEntityCalculator.js';
import { KeyframeTextHandler } from '../CssHandlers/KeyframeTextHandler.js';

export class KeyframeCalculatorAlignNodeByWidth extends AbstractCssEntityCalculator
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
        if (this.refactoredStepAnimation.nodesInfoStepAnimation.relativeNodeToAnimateAccross)
        {
            return this.keyframePrototypeName + "_Align_By_Width_" + this.tree.alignedTimes + "_" + super.nodeIdentifierName(false); // return this.getKeyframePrototypeName() + "_" + super.nodeIdentifierName(false);
        }

        return this.keyframePrototypeName + "_Align_By_Width_" + this.tree.alignedTimes + "_" + super.nodeIdentifierName(true); // return this.getKeyframePrototypeName() + "_" + super.nodeIdentifierName(true);
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
            let nodeToAnimate = this.refactoredStepAnimation.nodesInfoStepAnimation.nodeToAnimate;

            let xCoordinatePrevious = nodeToAnimate.xCoordinatePrevious;
            let xCoordinate = nodeToAnimate.xCoordinate;

            return `translateX(${xCoordinate - xCoordinatePrevious}px) translateY(0px)`;
        }
    }
}