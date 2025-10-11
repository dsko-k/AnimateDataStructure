import { AbstractCssEntityCalculator } from './AbstractCssEntityCalculator.js';
import { StyleClassTextHandler } from '../CssHandlers/StyleClassTextHandler.js';

export class StyleClassCalculatorAddRangeOfNodes extends AbstractCssEntityCalculator // ConcreteStrategyA
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
        return this.styleClassTextHandler.getStyleValue(cssEntityPrototypeName, keyName).styleValue;
    }


    // --------------------------- Calculation properties ---------------------------


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
            return this.allStepAnimation[0].stepAnimationObject.nodesInfoStepAnimation.nodeToAnimate.yCoordinate + "px";
        }
    }


    calculateLeftSuperContainer(keyName)
    {
        if (keyName === "--leftSuperContainer")
        {
            return this.allStepAnimation[0].stepAnimationObject.nodesInfoStepAnimation.nodeToAnimate.xCoordinate + "px";
        }
    }


    calculateAnimationNameContainerSpectrumBorder(keyName)
    {
        if (keyName === "--animationNameContainerSpectrumBorder")
        {
            let arrayOfStepNames = [
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
            return `${parseFloat(this.refactoredStepAnimation.timeStepAnimation.timeDelayStep)}s`; //"0s";
        }
    }


    calculateAnimationNamesShadowBorderRotatorContainerLeftRightTurn(keyName)
    {
        if (keyName === "--animationNamesShadowBorderRotatorContainerLeftRightTurn")
        {
            let arrayOfStepNames = [
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
            return `${parseFloat(this.refactoredStepAnimation.timeStepAnimation.timeDurationStep)}s`; //"0s";
        }
    }


    calculateAnimationDelaySuperContainer(keyName)
    {
        if (keyName === "--animationDelaySuperContainer")
        {
            // every possible step name

            let arrayOfStepNames = [
                "own position (left child)",
                "own position (right child)",
                "own position (root)",
            ];

            let stringDelays = this.getDelaysString(arrayOfStepNames);

            return stringDelays;
        }
    }


    calculateAnimationDelayMovingLine(keyName)
    {
        if (keyName === "--animationDelayMovingLine")
        {
            return `${parseFloat(this.refactoredStepAnimation.timeStepAnimation.timeDelayStep)}s`; //"0s";
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
            //else
            //{
            //    throw new Error(`Steps is 0`);
            //}

            throw new Error(`Steps is 0`);

        }
    }


    calculateWidthEndLinkContainer(keyName)
    {
        if (keyName === "--widthEndLinkContainer")
        {
            let targetStepAnimation = this.allStepAnimation.filter(currentStepAnimation =>
            {
                return currentStepAnimation.stepAnimationObject.nodesInfoStepAnimation.patternStepName.includes("own position");
            });


            if (targetStepAnimation.length != 0 && targetStepAnimation[0].stepAnimationObject.nodesInfoStepAnimation.nodeToAnimate.parentNode)
            {
                return Math.abs(targetStepAnimation[0].stepAnimationObject.nodesInfoStepAnimation.nodeToAnimate.xCoordinate -
                    targetStepAnimation[0].stepAnimationObject.nodesInfoStepAnimation.nodeToAnimate.parentNode.xCoordinate) + "px";
            }

            return this.getCurrentValue(this.styleClassPrototypeName, keyName);
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
        if (patternStepName.includes("own position"))
        {
            return keyframePrototypeName + "_" + nodeToAnimate.nodeId;
        }
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