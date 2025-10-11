import { AbstractCssEntityCalculator } from './AbstractCssEntityCalculator.js';
import { KeyframeTextHandler } from '../CssHandlers/KeyframeTextHandler.js';

export class KeyframeCalculatorSwapNode extends AbstractCssEntityCalculator // ConcreteStrategyC
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
        let nodeToAnimate = this.refactoredStepAnimation.nodesInfoStepAnimation.nodeToAnimate;
        let relativeNodeToAnimateAccross = this.refactoredStepAnimation.nodesInfoStepAnimation.relativeNodeToAnimateAccross;

        return `${this.keyframePrototypeName}_Swap_${nodeToAnimate.nodeId}_with_${relativeNodeToAnimateAccross.nodeId}_Swapped_${this.tree.swappedTimes}_times`;
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