import { AbstractCssEntityCalculator } from './AbstractCssEntityCalculator.js';
import { StyleClassTextHandler } from '../CssHandlers/StyleClassTextHandler.js';

export class StyleClassCalculatorAlignNodeByWidth extends AbstractCssEntityCalculator // ConcreteStrategyB
{
    constructor(tree, refactoredStepAnimation, allStepAnimation)
    {
        super(tree, refactoredStepAnimation, allStepAnimation);
        this.tree = tree;
        this.styleClassPrototypeName = refactoredStepAnimation.styleClassPrototypeStepAnimation.styleClassPrototypeName;
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


    // CONSIDER MOVING TO THE BASE CLASS !!!!!!!!!!
    // Duplication
    calculateXCoordinate(keyName)
    {
        if (keyName === "--xCoordinate")
        {
            return this.getCoordinate(keyName);
        }
    }


    // CONSIDER MOVING TO THE BASE CLASS !!!!!!!!!!
    calculateYCoordinate(keyName)
    {
        if (keyName === "--yCoordinate")
        {
            return this.getCoordinate(keyName);
        }
    }


    // CONSIDER MOVING TO THE BASE CLASS !!!!!!!!!!
    calculateTopSuperContainer(keyName)
    {
        if (keyName === "--topSuperContainer")
        {
            return this.getCoordinate(keyName);
        }
    }


    // CONSIDER MOVING TO THE BASE CLASS !!!!!!!!!!
    calculateLeftSuperContainer(keyName)
    {
        if (keyName === "--leftSuperContainer")
        {
            return this.getCoordinate(keyName);
        }
    }


    // CONSIDER MOVING TO THE BASE CLASS !!!!!!!!!!
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
        else if (keyName === "--topSuperContainer")
        {
            return targetStepAnimation[0].stepAnimationObject.nodesInfoStepAnimation.nodeToAnimate.yCoordinatePrevious + "px";
        }
        else if (keyName === "--leftSuperContainer")
        {
            return targetStepAnimation[0].stepAnimationObject.nodesInfoStepAnimation.nodeToAnimate.xCoordinatePrevious + "px";
        }

        throw new Error(`Incorrect keyName '${keyName}' it should be '--xCoordinate' or '--yCoordinate' or '--topSuperContainer' or '--leftSuperContainer'`);
    }


    calculateAnimationNameContainerSpectrumBorder(keyName)
    {
        if (keyName === "--animationNameContainerSpectrumBorder")
        {
            return this.refactoredStepAnimation["keyframesPrototypeContainerSpectrumBorder"].keyframePrototypeName;
        }
    }


    calculateAnimationDurationSuperContainer(keyName)
    {
        if (keyName === "--animationDurationSuperContainer")
        {
            return `${parseFloat(this.refactoredStepAnimation.timeStepAnimation.timeDurationStep)}s`; // ???????????????????????????????
        }
    }


    calculateAnimationDelaySuperContainer(keyName)
    {
        if (keyName === "--animationDelaySuperContainer")
        {
            return `${parseFloat(this.refactoredStepAnimation.timeStepAnimation.timeDelayStep)}s`;
        }
    }


    calculateAnimationNameSuperContainer(keyName)
    {
        if (keyName === "--animationNameSuperContainer")
        {
            let arrayOfStepNames = [
                "own position (root)",
                "own position (left child)",
                "own position (right child)",
            ]

            let keyframesAlignNodeByWidth = this.getKeyframesMoveNodeNamesString(arrayOfStepNames);

            return keyframesAlignNodeByWidth;
        }
    }


    getKeyframesMoveNodeNamesString(arrayOfStepNames)
    {
        let setOfTargetStepNames = new Set(arrayOfStepNames);

        let newValue = "";

        this.allStepAnimation.forEach(currentStepAnimation =>
        {
            if (setOfTargetStepNames.has(currentStepAnimation.stepAnimationObject.nodesInfoStepAnimation.patternStepName))
            {
                newValue += this.getKeyframeMoveNodeName(currentStepAnimation.stepAnimationObject) + ", ";
            }
        });

        if (newValue === "")
        {
            throw new Error(`Unable to calculate string with keyframes to align node`);
        }

        newValue = newValue.substring(0, newValue.length - 2); // remove last ", " in newValue

        return newValue;
    }


    getKeyframeMoveNodeName(stepAnimation)
    {
        return this.composeKeyframeName(stepAnimation, "keyframesPrototypeMoveNode");
    }


    // create KeyframeName based on the name of keyframePrototype, times of this.tree alignment and nodeId
    composeKeyframeName(stepAnimation, keyframePrototypeKey)
    {
        let relativeNodeToAnimateAccross = stepAnimation.nodesInfoStepAnimation.relativeNodeToAnimateAccross;
        let nodeToAnimate = stepAnimation.nodesInfoStepAnimation.nodeToAnimate;

        let keyframePrototypeName = stepAnimation[keyframePrototypeKey].keyframePrototypeName;

        if (relativeNodeToAnimateAccross)
        {
            return keyframePrototypeName + "_Align_By_Width_" + this.tree.alignedTimes + "_" + relativeNodeToAnimateAccross.nodeId;
        }

        return keyframePrototypeName + "_Align_By_Width_" + this.tree.alignedTimes + "_" + nodeToAnimate.nodeId;
    }


    calculateWidthEndLinkContainer(keyName)
    {
        if (keyName === "--widthEndLinkContainer")
        {
            let targetStepAnimation = this.allStepAnimation.filter(currentStepAnimation =>
            {
                return currentStepAnimation.stepAnimationObject.nodesInfoStepAnimation.patternStepName === "own position (left child)" || currentStepAnimation.stepAnimationObject.nodesInfoStepAnimation.patternStepName === "own position (right child)";
            });


            if (targetStepAnimation.length != 0)
            {
                return `${Math.abs(targetStepAnimation[0].stepAnimationObject.nodesInfoStepAnimation.nodeToAnimate.xCoordinatePrevious -
                    targetStepAnimation[0].stepAnimationObject.nodesInfoStepAnimation.nodeToAnimate.parentNode.xCoordinatePrevious)}px`;
            }

            return this.getCurrentValue(this.styleClassPrototypeName, keyName);
        }
    }


    calculateHorizontalShiftOwnNode(keyName)
    {
        if (keyName === "--horizontalShiftOwnNode")
        {
            let targetStepAnimation = this.allStepAnimation;

            if (targetStepAnimation.length != 0)
            {
                let nodeToAnimate = targetStepAnimation[0].stepAnimationObject.nodesInfoStepAnimation.nodeToAnimate;

                if (!nodeToAnimate.parentNode && nodeToAnimate.xCoordinatePrevious)
                {
                    return `${Math.abs(nodeToAnimate.xCoordinate) - Math.abs(nodeToAnimate.xCoordinatePrevious)}px`;
                }

                let widthBeforeAlignment = Math.abs(nodeToAnimate.xCoordinatePrevious - nodeToAnimate.parentNode.xCoordinatePrevious);
                let widthAfterAlignment = Math.abs(nodeToAnimate.xCoordinate - nodeToAnimate.parentNode.xCoordinate);

                return `${widthAfterAlignment - widthBeforeAlignment}px`;
            }
        }
    }


    calculateAnimationLinkContainer(keyName)
    {
        if (keyName === "--animationLinkContainer")
        {            
            return this.refactoredStepAnimation["keyframesPrototypeAnimationLinkContainer"].keyframePrototypeName + "_Align_By_Width_" + this.tree.alignedTimes + "_" + super.nodeIdentifierName(true);
        }
    }


    calculateLinkContainerAnimationDelay(keyName)
    {
        if (keyName === "--linkContainerAnimationDelay")
        {            
            return `${parseFloat(this.refactoredStepAnimation.timeStepAnimation.timeDelayStep)}s`;
        }
    }


    // PRIVATES DUPLICATION

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
}