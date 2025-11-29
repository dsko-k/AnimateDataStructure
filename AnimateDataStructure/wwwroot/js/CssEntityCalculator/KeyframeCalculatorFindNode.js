import { AbstractCssEntityCalculator } from './AbstractCssEntityCalculator.js';
import { KeyframeTextHandler } from '../CssHandlers/KeyframeTextHandler.js';

export class KeyframeCalculatorFindNode extends AbstractCssEntityCalculator
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
        return this.keyframePrototypeName + "_Find_" + super.nodeIdentifierName(false);
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
            let xCoordinateEndMovingStep = this.refactoredStepAnimation.coordinatesStepAnimation.xCoordinateEndMovingStep;
            let yCoordinateEndMovingStep = this.refactoredStepAnimation.coordinatesStepAnimation.yCoordinateEndMovingStep;
            let startPositionX = this.refactoredStepAnimation.nodesInfoStepAnimation.nodeToAnimate.startPositionX;
            let startPositionY = this.refactoredStepAnimation.nodesInfoStepAnimation.nodeToAnimate.startPositionY;

            return `translateX(${xCoordinateEndMovingStep - startPositionX}px) translateY(${yCoordinateEndMovingStep - startPositionY}px)`;
        }
    }


    calculateGradientInsideBorderAngleStart(keyName, persentage)
    {
        if (keyName.includes("--gradientInsideBorderAngleStart") && persentage === "100%")
        {
            return this.getCurrentValue(this.keyframePrototypeName, keyName, persentage);
        }
    }
}