import { AbstractCssEntityCalculator } from './AbstractCssEntityCalculator.js';
import { StyleClassTextHandler } from '../CssHandlers/StyleClassTextHandler.js';

export class StyleClassCalculatorAddNode extends AbstractCssEntityCalculator
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
        return this.styleClassPrototypeName + "_" + super.nodeIdentifierName(isForNodeToAnimate);
    }


    getCurrentValue(cssEntityPrototypeName, keyName)
    {
        return this.styleClassTextHandler.getStyleValue(cssEntityPrototypeName, keyName).styleValue; // do not change value from prototype style
    }



    // --------------------------- Calculation properties ---------------------------

    // Convention:
    // the name of a function-calculator should be consisted of "calculate" and the name of property key to calculate.
    // The name of property key to calculate starts from Upper case, for example: calculateHeight(keyName)
    // If keyName starts with "--" (for example, key: "--propertyGradientName"), then symbols -- are trimmed and
    // the first letter of property key to calculate starts from Upper case
    // for example, style key: "--propertyGradientName" transforms into calculatePropertyGradientName(keyName)


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


    getCoordinate(keyName)
    {
        let targetStepAnimation = this.allStepAnimation.filter(currentStepAnimation =>
        {
            return currentStepAnimation.stepAnimationObject.nodesInfoStepAnimation.patternStepName.includes("own position");
        });

        if (targetStepAnimation.length === 0)
        {
            throw new Error(`Unable to get coordinate: there is no any step with name, that includes 'own position'`);
        }

        if (keyName === "--xCoordinate")
        {
            return targetStepAnimation[0].stepAnimationObject.nodesInfoStepAnimation.nodeToAnimate.xCoordinate + "px";
        }
        else if (keyName === "--yCoordinate")
        {
            return targetStepAnimation[0].stepAnimationObject.nodesInfoStepAnimation.nodeToAnimate.yCoordinate + "px";
        }

        throw new Error(`Incorrect keyName '${keyName}' it should be '--xCoordinate' or '--yCoordinate'`);
    }


    calculateTopSuperContainer(keyName)
    {
        if (keyName === "--topSuperContainer")
        {
            return this.getCurrentValue(this.styleClassPrototypeName, keyName);
        }
    }


    calculateLeftSuperContainer(keyName)
    {
        if (keyName === "--leftSuperContainer")
        {
            return this.getCurrentValue(this.styleClassPrototypeName, keyName);
        }
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
                "draw left link to parent",
                "draw right link to parent",
            ];

            let keyframesNamesString = this.getKeyframesNamesString("keyframesPrototypeContainerSpectrumBorder", arrayOfStepNames, keyName);

            return keyframesNamesString;
        }
    }


    calculateColorBorderRotatorClockwise(keyName)
    {
        if (keyName === "--colorBorderRotatorClockwise")
        {
            return this.getCurrentValue(this.styleClassPrototypeName, keyName);
        }
    }


    calculateColorBorderRotatorClockwiseShift(keyName)
    {
        if (keyName === "--colorBorderRotatorClockwiseShift")
        {
            return this.getCurrentValue(this.styleClassPrototypeName, keyName);
        }
    }


    calculateColorBorderRotatorAntiClockwise(keyName)
    {
        if (keyName === "--colorBorderRotatorAntiClockwise")
        {
            return this.getCurrentValue(this.styleClassPrototypeName, keyName);
        }
    }


    calculateColorBorderRotatorAntiClockwiseShift(keyName)
    {
        if (keyName === "--colorBorderRotatorAntiClockwiseShift")
        {
            return this.getCurrentValue(this.styleClassPrototypeName, keyName);
        }
    }


    calculateAnimationLinkContainer(keyName)
    {
        if (keyName === "--animationLinkContainer")
        {
            return this.getCurrentValue(this.styleClassPrototypeName, keyName);
        }
    }


    calculateColorSvgGlovingMovingLine(keyName)
    {
        if (keyName === "--colorSvgGlovingMovingLine")
        {
            return this.getCurrentValue(this.styleClassPrototypeName, keyName);
        }
    }


    calculateBorderRotatorWidth(keyName)
    {
        if (keyName === "--borderRotatorWidth")
        {
            return this.getCurrentValue(this.styleClassPrototypeName, keyName);
        }
    }


    calculateAnimationDurationBorderRotator(keyName)
    {
        if (keyName === "--animationDurationBorderRotator")
        {
            return this.getCurrentValue(this.styleClassPrototypeName, keyName);
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


    calculateGradInitialValueInsideBorder(keyName)
    {
        if (keyName === "--gradInitialValueInsideBorder")
        {
            return this.getCurrentValue(this.styleClassPrototypeName, keyName);
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
                "draw left link to parent",
                "draw right link to parent",
            ];

            let keyframesNamesString = this.getKeyframesNamesString("keyframesPrototypeInsideBorder", arrayOfStepNames, keyName);

            return keyframesNamesString;
        }
    }


    calculateHeightSuperContainer(keyName)
    {
        if (keyName === "--heightSuperContainer")
        {
            return this.getCurrentValue(this.styleClassPrototypeName, keyName);
        }
    }


    calculateWidthSuperContainer(keyName)
    {
        if (keyName === "--widthSuperContainer")
        {
            return this.getCurrentValue(this.styleClassPrototypeName, keyName);
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
                "draw left link to parent",
                "draw right link to parent",
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


    calculateAnimationTimingFunctionSuperContainer(keyName)
    {
        if (keyName === "--animationTimingFunctionSuperContainer")
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
                "draw left link to parent",
                "draw right link to parent",
            ];

            let stringDelays = this.getDelaysString(arrayOfStepNames);

            return stringDelays;
        }
    }


    calculateDistanceBetweenLevels(keyName)
    {
        if (keyName === "--distanceBetweenLevels")
        {
            return this.getCurrentValue(this.styleClassPrototypeName, keyName);
        }
    }


    calculateAnimationNameGlowingMovingLine(keyName)
    {
        if (keyName === "--animationNameGlowingMovingLine")
        {
            return this.getCurrentValue(this.styleClassPrototypeName, keyName);
        }
    }


    calculateAnimationDelayMovingLine(keyName)
    {
        if (keyName === "--animationDelayMovingLine")
        {
            let arrayOfStepNames = [
                "draw left link to parent",
                "draw right link to parent",
            ];

            let stringDelays = this.getDelaysString(arrayOfStepNames);

            return stringDelays;
        }
    }


    calculateAnimationIterationCountGlowingMovingLine(keyName)
    {
        if (keyName === "--animationIterationCountGlowingMovingLine")
        {
            return this.getCurrentValue(this.styleClassPrototypeName, keyName);
        }
    }


    calculateLineStrokeUrl(keyName)
    {
        if (keyName === "--lineStrokeUrl")
        {
            let targetStepAnimation = this.allStepAnimation;

            if (targetStepAnimation.length != 0)
            {
                let nodeId = targetStepAnimation[0].stepAnimationObject.nodesInfoStepAnimation.nodeToAnimate.nodeId;
                let idLinearGradient = `id_linearGradient_${nodeId}`;

                return `url(#${idLinearGradient})`;
            }
            else
            {
                throw new Error(`Steps is 0`);
            }
        }
    }


    calculateWidthEndLinkContainer(keyName)
    {
        if (keyName === "--widthEndLinkContainer")
        {
            let targetStepAnimation = this.allStepAnimation.filter(currentStepAnimation =>
            {
                return currentStepAnimation.stepAnimationObject.nodesInfoStepAnimation.patternStepName === "draw left link to parent" || currentStepAnimation.stepAnimationObject.nodesInfoStepAnimation.patternStepName === "draw right link to parent";
            });


            if (targetStepAnimation.length != 0)
            {
                return Math.abs(targetStepAnimation[0].stepAnimationObject.nodesInfoStepAnimation.nodeToAnimate.xCoordinate -
                    targetStepAnimation[0].stepAnimationObject.nodesInfoStepAnimation.nodeToAnimate.parentNode.xCoordinate) + "px";
            }

            return this.getCurrentValue(this.styleClassPrototypeName, keyName);
        }
    }


    calculateHorizontalShiftOwnNode(keyName)
    {
        if (keyName === "--horizontalShiftOwnNode")
        {
            return this.getCurrentValue(this.styleClassPrototypeName, keyName);
        }
    }


    calculateAnimationSvgLineLink(keyName)
    {
        if (keyName === "--animationSvgLineLink")
        {
            return this.getCurrentValue(this.styleClassPrototypeName, keyName);
        }
    }


    calculateLinkContainerAnimationDelay(keyName)
    {
        if (keyName === "--linkContainerAnimationDelay")
        {
            return this.getCurrentValue(this.styleClassPrototypeName, keyName);
        }
    }


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
                    let nodesInfoStepAnimation = currentStepAnimation.stepAnimationObject.nodesInfoStepAnimation;
                    newValue += this.getKeyframeMoveNodeName(keyframePrototypeName, nodesInfoStepAnimation.patternStepName, nodesInfoStepAnimation.nodeToAnimate, nodesInfoStepAnimation.relativeNodeToAnimateAccross) + ", ";
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


    getKeyframeMoveNodeName(keyframePrototypeName, patternStepName, nodeToAnimate, relativeNodeToAnimateAccross)
    {
        if (patternStepName.includes("own position") || patternStepName.includes("draw left link to parent") || patternStepName.includes("draw right link to parent"))
        {
            return keyframePrototypeName + "_" + nodeToAnimate.nodeId;
        }

        return keyframePrototypeName + "_" + relativeNodeToAnimateAccross.nodeId;
    }


    checkIsCalculatorFound(keyName)
    {
        let nameOfCalculator = this.combineNameOfCalculator(keyName);

        if (!Object.getPrototypeOf(this).hasOwnProperty(nameOfCalculator))
        {
            throw new Error(`Unable to calculate value of the property '${keyName}'. Function-calculator for of the property '${keyName}' was not found in the class '${this.constructor.name}'`);
        }
    }
}