import { AbstractCssEntityCalculator } from './AbstractCssEntityCalculator.js';
import { KeyframeTextHandler } from '../CssHandlers/KeyframeTextHandler.js';

export class KeyframeCalculatorAlignNodeByHeight extends AbstractCssEntityCalculator // ConcreteStrategyC
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
        return this.keyframePrototypeName + "_Align_by_height_" + this.tree.alignedTimes + "_" + super.nodeIdentifierName(true);
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

            let yCoordinatePrevious = nodeToAnimate.yCoordinatePrevious;
            let yCoordinate = nodeToAnimate.yCoordinate;

            return `translateX(${xCoordinate - xCoordinatePrevious}px) translateY(${yCoordinate - yCoordinatePrevious}px)`;
        }
    }


    // Duplication the method from KeyframeCalculatorBalancing
    calculateGradientInsideBorderAngleStart(keyName, persentage)
    {
        if (keyName.includes("--gradientInsideBorderAngleStart") && persentage === "100%")
        {
            let updatedValue = this.refactoredStepAnimation
                .keyframesPrototypeRelatedWithPropertyEntityPrototype
                .filter(elem => keyName.includes(elem.propertyEntityPrototype))[0].valueOfKeyframesKey;

            return updatedValue;
        }
    }
}