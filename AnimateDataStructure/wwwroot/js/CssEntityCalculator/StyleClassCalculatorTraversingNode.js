import { AbstractCssEntityCalculator } from './AbstractCssEntityCalculator.js';
import { StyleClassTextHandler } from '../CssHandlers/StyleClassTextHandler.js';

export class StyleClassCalculatorTraversingNode extends AbstractCssEntityCalculator
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
        let nodeToAnimate = this.allStepAnimation[this.allStepAnimation.length - 1].stepAnimationObject.nodesInfoStepAnimation.nodeToAnimate;
        return this.styleClassPrototypeName + "_" + super.nodeIdentifierName(true);
    }


    getCurrentValue(cssEntityPrototypeName, keyName)
    {
        return this.styleClassTextHandler.getStyleValue(cssEntityPrototypeName, keyName).styleValue;
    }


    calculateTopSuperContainer(keyName)
    {
        if (keyName === "--topSuperContainer")
        {
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
            return this.getCurrentValue(this.styleClassPrototypeName, keyName);
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

        this.allStepAnimation.forEach((currentStepAnimation, index) =>
        {
            if (setOfTargetStepNames.has(currentStepAnimation.stepAnimationObject.nodesInfoStepAnimation.patternStepName) &&
                currentStepAnimation.stepAnimationObject[keyframesPrototypePropertyNameStep])
            {
                let keyframePrototypeName = currentStepAnimation.stepAnimationObject[keyframesPrototypePropertyNameStep].keyframePrototypeName;

                if (keyframesPrototypePropertyNameStep === "keyframesPrototypeMoveNode")
                {
                    newValue += this.getKeyframeMoveNodeName(keyframePrototypeName, currentStepAnimation, index) + ", ";
                }
                else if (keyframesPrototypePropertyNameStep === "keyframesPrototypeInsideBorder")
                {
                    let nodeId = currentStepAnimation.stepAnimationObject.nodesInfoStepAnimation.relativeNodeToAnimateAccross.nodeId;
                    newValue += keyframePrototypeName + "_Traversing_" + nodeId + ", ";
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


    getKeyframeMoveNodeName(keyframePrototypeName, currentStepAnimation, indexOfStepAnimation)
    {
        let nodeId = currentStepAnimation.stepAnimationObject.nodesInfoStepAnimation.relativeNodeToAnimateAccross.nodeId;

        return `${keyframePrototypeName}_Traversing_${nodeId}_IndexOfStepAnimation_${indexOfStepAnimation}`;
    }
}