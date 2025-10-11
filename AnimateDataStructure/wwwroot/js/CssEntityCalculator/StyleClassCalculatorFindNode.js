import { AbstractCssEntityCalculator } from './AbstractCssEntityCalculator.js';
import { StyleClassTextHandler } from '../CssHandlers/StyleClassTextHandler.js';

export class StyleClassCalculatorFindNode extends AbstractCssEntityCalculator // ConcreteStrategyA
{
    constructor(tree, refactoredStepAnimation, allStepAnimation)
    {
        super(tree, refactoredStepAnimation, allStepAnimation);
        this.tree = tree;
        this.styleClassPrototypeName = this.refactoredStepAnimation.styleClassPrototypeStepAnimation.styleClassPrototypeName;
        this.styleClassTextHandler = new StyleClassTextHandler();
    }


    calculateEntityName(isForNodeToAnimate)
    {
        let lastRelativeNodeToAnimateAccross = this.allStepAnimation[this.allStepAnimation.length - 1].stepAnimationObject.nodesInfoStepAnimation.relativeNodeToAnimateAccross;

        return this.styleClassPrototypeName + "_" + lastRelativeNodeToAnimateAccross.nodeId;
    }


    getCurrentValue(cssEntityPrototypeName, keyName)
    {
        return this.styleClassTextHandler.getStyleValue(cssEntityPrototypeName, keyName).styleValue;
    }



    // --------------------------- Calculation properties ---------------------------

    // Convention:
    // the name of a function-calculator should consisted of "calculate" and the name of property key to calculate.
    // The name of property key to calculate starts from Upper case, for example: calculateHeight(keyName)
    // If keyName starts with "--" (for example, key: "--propertyGradientName"), then symbols -- are trimmed and
    // the first letter of property key to calculate starts from Upper case
    // for example, style key: "--propertyGradientName" transforms into calculatePropertyGradientName(keyName)


    calculateTopSuperContainer(keyName)
    {
        if (keyName === "--topSuperContainer")
        {
            //return this.getCurrentValue(this.styleClassPrototypeName, keyName);
            return this.allStepAnimation[0].stepAnimationObject.nodesInfoStepAnimation.nodeToAnimate.startPositionY + "px";
        }
    }


    calculateLeftSuperContainer(keyName)
    {
        if (keyName === "--leftSuperContainer")
        {
            return this.allStepAnimation[0].stepAnimationObject.nodesInfoStepAnimation.nodeToAnimate.startPositionX + "px";
        }
    }


    calculateXCoordinate(keyName)
    {
        if (keyName === "--xCoordinate")
        {
            return this.getCoordinate(keyName);
        }
    }


    calculateYCoordinate(keyName)
    {
        if (keyName === "--yCoordinate")
        {
            return this.getCoordinate(keyName);
        }
    }


    // private
    getCoordinate(keyName)
    {
        let targetStepAnimation = this.allStepAnimation[this.allStepAnimation.length - 1];

        if (targetStepAnimation.length === 0)
        {
            throw new Error(`Unable to get coordinate: there is no any step with name, that includes 'own position'`);
        }

        if (keyName === "--xCoordinate")
        {
            return targetStepAnimation.stepAnimationObject.nodesInfoStepAnimation.relativeNodeToAnimateAccross.xCoordinate + "px";
        }
        else if (keyName === "--yCoordinate")
        {
            return targetStepAnimation.stepAnimationObject.nodesInfoStepAnimation.relativeNodeToAnimateAccross.yCoordinate + "px";
        }

        throw new Error(`Incorrect keyName '${keyName}' it should be '--xCoordinate' or '--yCoordinate'`);
    }


    calculateAnimationNameContainerSpectrumBorder(keyName)
    {
        if (keyName === "--animationNameContainerSpectrumBorder")
        {
            let arrayOfStepNames = [
                "above related node",
                "below to related node",
                "highlight left border of nodeToAnimate",
                "highlight right border of nodeToAnimate",
                "own position (left child)",
                "own position (right child)",
                "own position (root)",
            ];

            let keyframesNamesString = this.getKeyframesNamesString("keyframesPrototypeContainerSpectrumBorder", arrayOfStepNames, keyName);

            return keyframesNamesString;
        }
    }


    calculateAnimationNamesBorderRotatorContainerLeftRightTurn(keyName)
    {
        if (keyName === "--animationNamesBorderRotatorContainerLeftRightTurn")
        {

            let arrayOfStepNames = [
                "highlight left border of nodeToAnimate",
                "highlight right border of nodeToAnimate",
                "own position (left child)",
                "own position (right child)",
                "own position (root)",
            ];

            let keyframesNamesString = this.getKeyframesNamesString("keyframesPrototypeBorderRotatorContainer", arrayOfStepNames, keyName);

            return keyframesNamesString;
        }
    }


    calculateAnimationDelaysBorderRotatorContainer(keyName)
    {
        if (keyName === "--animationDelaysBorderRotatorContainer")
        {
            let arrayOfStepNames = [
                "highlight left border of nodeToAnimate",
                "highlight right border of nodeToAnimate",
                "own position (left child)",
                "own position (right child)",
                "own position (root)",
            ];

            let stringDelays = this.getDelaysString(arrayOfStepNames);

            return stringDelays;
        }
    }


    calculateAnimationNamesShadowBorderRotatorContainerLeftRightTurn(keyName)
    {
        if (keyName === "--animationNamesShadowBorderRotatorContainerLeftRightTurn")
        {
            let arrayOfStepNames = [
                "highlight left border of nodeToAnimate",
                "highlight right border of nodeToAnimate",
                "own position (left child)",
                "own position (right child)",
                "own position (root)",
            ];

            let keyframesNamesString = this.getKeyframesNamesString("keyframesPrototypeShadowBorderRotatorContainer", arrayOfStepNames, keyName);

            return keyframesNamesString;
        }
    }


    calculateInsideBorderAnimationNames(keyName)
    {
        if (keyName === "--insideBorderAnimationNames")
        {
            let arrayOfStepNames = [
                "above related node",
                "below to related node",
                "highlight left border of nodeToAnimate",
                "highlight right border of nodeToAnimate",
                "own position (left child)",
                "own position (right child)",
                "own position (root)",
            ];

            let keyframesNamesString = this.getKeyframesNamesString("keyframesPrototypeInsideBorder", arrayOfStepNames, keyName);

            return keyframesNamesString;
        }
    }


    calculateAnimationNameSuperContainer(keyName)
    {
        if (keyName === "--animationNameSuperContainer")
        {
            // every possible step name
            let arrayOfStepNames = [
                "above related node",
                "below to related node",
                "highlight left border of nodeToAnimate",
                "highlight right border of nodeToAnimate",
                "own position (left child)",
                "own position (right child)",
                "own position (root)",
            ];

            let keyframesNamesString = this.getKeyframesNamesString("keyframesPrototypeMoveNode", arrayOfStepNames, keyName);

            return keyframesNamesString;
        }
    }


    calculateAnimationDurationSuperContainer(keyName)
    {
        if (keyName === "--animationDurationSuperContainer")
        {
            return this.getCurrentValue(this.styleClassPrototypeName, keyName);
        }
    }


    calculateAnimationDelaySuperContainer(keyName)
    {
        if (keyName === "--animationDelaySuperContainer")
        {
            // every possible step name

            let arrayOfStepNames = [
                "above related node",
                "below to related node",
                "highlight left border of nodeToAnimate",
                "highlight right border of nodeToAnimate",
                "own position (left child)",
                "own position (right child)",
                "own position (root)",
            ];

            let stringDelays = this.getDelaysString(arrayOfStepNames);

            return stringDelays;
        }
    }


    calculateAnimationIterationCountGlowingMovingLine(keyName)
    {
        if (keyName === "--animationIterationCountGlowingMovingLine")
        {
            return 0;
        }
    }


    // PRIVATES

    getDelaysString(arrayOfStepNames)
    {
        let setOfTargetStepNames = new Set(arrayOfStepNames);

        let newValue = "";

        let totalDelaysSoFar = 0;  // current step delay should include
        let totalDurationsSoFar = 0; // current step duration should NOT include

        this.allStepAnimation.forEach(currentStepAnimation =>
        {
            let parsedCurrentDelay = parseFloat(currentStepAnimation.stepAnimationObject.timeStepAnimation.timeDelayStep);
            let parsedCurrentStepDuration = parseFloat(currentStepAnimation.stepAnimationObject.timeStepAnimation.timeDurationStep);

            totalDelaysSoFar += parsedCurrentDelay;
            totalDurationsSoFar += parsedCurrentStepDuration;

            if (setOfTargetStepNames.has(currentStepAnimation.stepAnimationObject.nodesInfoStepAnimation.patternStepName))
            {
                newValue += (totalDelaysSoFar + totalDurationsSoFar - parsedCurrentStepDuration) + "s, ";
            }
        });

        if (newValue === "")
        {
            newValue = "0s"; // remove last ", " in newValue
        }
        else if (newValue[newValue.length - 2] === ",")
        {
            newValue = newValue.substring(0, newValue.length - 2); // remove last ", " in newValue
        }

        return newValue;
    }


    getKeyframesNamesString(keyframesPrototypePropertyNameStep, arrayOfStepNames, styleKeyName)
    {
        let setOfTargetStepNames = new Set(arrayOfStepNames);

        let newValue = "";

        this.allStepAnimation.forEach(currentStepAnimation =>
        {
            if (setOfTargetStepNames.has(currentStepAnimation.stepAnimationObject.nodesInfoStepAnimation.patternStepName) &&
                currentStepAnimation.stepAnimationObject[keyframesPrototypePropertyNameStep])
            {
                let keyframePrototypeName = currentStepAnimation.stepAnimationObject[keyframesPrototypePropertyNameStep].keyframePrototypeName;

                if (keyframesPrototypePropertyNameStep === "keyframesPrototypeMoveNode")
                {
                    newValue += this.getKeyframeMoveNodeName(keyframePrototypeName, currentStepAnimation) + ", ";
                }
                else if (keyframesPrototypePropertyNameStep === "keyframesPrototypeInsideBorder")
                {
                    let nodeId = currentStepAnimation.stepAnimationObject.nodesInfoStepAnimation.relativeNodeToAnimateAccross.nodeId

                    newValue += keyframePrototypeName + "_Find_" + nodeId + ", ";
                }
                else
                {
                    newValue += keyframePrototypeName + ", ";
                }
            }
        });


        if (newValue === "")
        {
            newValue = this.getCurrentValue(this.styleClassPrototypeName, styleKeyName);
        }
        else if (newValue[newValue.length - 2] === ",")
        {
            newValue = newValue.substring(0, newValue.length - 2); // remove last ", " in newValue
        }

        return newValue;
    }


    getKeyframeMoveNodeName(keyframePrototypeName, currentStepAnimation)
    {
        let nodeId = currentStepAnimation.stepAnimationObject.nodesInfoStepAnimation.relativeNodeToAnimateAccross.nodeId;
        return keyframePrototypeName + "_Find_" + nodeId;
    }

    // --------------------------- The end of calculation properties ---------------------------


    checkIsCalculatorFound(keyName)
    {
        let nameOfCalculator = this.combineNameOfCalculator(keyName);

        if (!Object.getPrototypeOf(this).hasOwnProperty(nameOfCalculator))
        {
            throw new Error(`Unable to calculate value of the property '${keyName}'. Function-calculator for of the property '${keyName}' was not found in the class '${this.constructor.name}'`);
        }
    }
}