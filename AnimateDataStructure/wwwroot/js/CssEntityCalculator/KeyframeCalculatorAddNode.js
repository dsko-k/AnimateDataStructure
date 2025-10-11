import { AbstractCssEntityCalculator } from './AbstractCssEntityCalculator.js';
import { KeyframeTextHandler } from '../CssHandlers/KeyframeTextHandler.js';

export class KeyframeCalculatorAddNode extends AbstractCssEntityCalculator // ConcreteStrategyC
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
        let stepName = this.refactoredStepAnimation.nodesInfoStepAnimation.patternStepName;

        if (stepName.includes("own position") || stepName.includes("draw left link to parent") || stepName.includes("draw right link to parent"))
        {
            return this.keyframePrototypeName + "_" + super.nodeIdentifierName(true) /* + "_" + super.stepNameToCamelCase */;
        }

        return this.keyframePrototypeName + "_" + super.nodeIdentifierName(false) /* + "_" + super.stepNameToCamelCase */;
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
}