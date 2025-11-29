import { AbstractCssEntityCalculator } from './AbstractCssEntityCalculator.js';
import { KeyframeTextHandler } from '../CssHandlers/KeyframeTextHandler.js';

export class KeyframeCalculatorAddRangeOfNodes extends AbstractCssEntityCalculator
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
        return this.keyframePrototypeName + "_" + super.nodeIdentifierName(true);
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
            let xCoordinate = nodeToAnimate.xCoordinate;
            let yCoordinate = nodeToAnimate.yCoordinate;

            return `translateX(${xCoordinate - xCoordinate}px) translateY(${yCoordinate - yCoordinate}px)`;
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