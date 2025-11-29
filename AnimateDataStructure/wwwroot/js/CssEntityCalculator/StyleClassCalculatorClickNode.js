import { AbstractCssEntityCalculator } from './AbstractCssEntityCalculator.js';
import { StyleClassTextHandler } from '../CssHandlers/StyleClassTextHandler.js';

export class StyleClassCalculatorClickNode extends AbstractCssEntityCalculator
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
        let appliedNodeStyles = this.refactoredStepAnimation.nodesInfoStepAnimation.nodeToAnimate.appliedNodeStyles.appliedNodeStyles;

        return appliedNodeStyles[appliedNodeStyles.length - 1]
            .allDomNodes
            .filter(domNode => domNode.elementName === 'superContainer')[0].class;
    }


    getCurrentValue(cssEntityPrototypeName, keyName)
    {
        return this.styleClassTextHandler.getStyleValue(cssEntityPrototypeName, keyName).styleValue; // do not change value from prototype style
    }


    calculateAnimationDelayMovingLine(keyName)
    {
        if (keyName === "--animationDelayMovingLine")
        {
            let levelDifference = this.getLevelDifference();

            if (levelDifference === 0)
            {
                return `0s`;
            }

            let cssEntityPrototypeName = this.calculateEntityName(true);
            let animationDurationBorderRotator = parseFloat(this.getCurrentValue(cssEntityPrototypeName, "--animationDurationBorderRotator"));
            let animationDurationGlowingMovingLine = animationDurationBorderRotator / 2;
                        
            if (levelDifference > 0)
            {
                return `${levelDifference * (animationDurationGlowingMovingLine + animationDurationBorderRotator / 2)}s`;
            }

            return `${(-1) * (levelDifference + 1) * (animationDurationGlowingMovingLine + animationDurationBorderRotator / 2)}s`;
        }
    }


    calculateAnimationNamesBorderRotatorContainerLeftRightTurn(keyName)
    {
        if (keyName === "--animationNamesBorderRotatorContainerLeftRightTurn")
        {
            return this.refactoredStepAnimation.keyframesPrototypeBorderRotatorContainer.keyframePrototypeName + `${this.tree.treeViewState.getClickedTimes()}`;
        }
    }


    calculateAnimationNamesShadowBorderRotatorContainerLeftRightTurn(keyName)
    {
        if (keyName === "--animationNamesShadowBorderRotatorContainerLeftRightTurn")
        {
            return this.refactoredStepAnimation.keyframesPrototypeBorderRotatorContainer.keyframePrototypeName + `${this.tree.treeViewState.getClickedTimes()}`;
        }
    }


    calculateAnimationDelaysBorderRotatorContainer(keyName)
    {
        if (keyName === "--animationDelaysBorderRotatorContainer")
        {
            let levelDifference = Math.abs(this.getLevelDifference());

            if (levelDifference === 0)
            {
                return "0s";
            }

            let cssEntityPrototypeName = this.calculateEntityName(true);
            let animationDurationBorderRotator = parseFloat(this.getCurrentValue(cssEntityPrototypeName, "--animationDurationBorderRotator"));
            let animationDurationGlowingMovingLine = animationDurationBorderRotator / 2;

            return `${levelDifference * animationDurationGlowingMovingLine + (levelDifference - 1) * animationDurationBorderRotator / 2}s`;
        }
    }


    getLevelDifference()
    {
        let nodeToAnimate = this.refactoredStepAnimation.nodesInfoStepAnimation.nodeToAnimate;
        let relativeNodeToAnimateAccross = this.refactoredStepAnimation.nodesInfoStepAnimation.relativeNodeToAnimateAccross;

        return relativeNodeToAnimateAccross.levelInTree - nodeToAnimate.levelInTree;
    }


    calculateAnimationIterationCountGlowingMovingLine(keyName)
    {
        if (keyName === "--animationIterationCountGlowingMovingLine")
        {
            return "infinite";
        }
    }


    calculateAnimationNameGlowingMovingLine(keyName)
    {
        if (keyName === "--animationNameGlowingMovingLine")
        {
            return this.refactoredStepAnimation["keyframesPrototypeGlowingMovingLine"].keyframePrototypeName + `${this.tree.treeViewState.getClickedTimes()}`;
        }
    }
}