import { RefactoredStepAnimation } from './RefactoredStepAnimation.js';

export class RefactoredBuilderStepAnimation // builder
{
    constructor(nodeToAnimate, relativeNodeToAnimateAccross, extractedStepAcrossRelativeNode, coordinatesOperationStepAnimation)
    {
        this.nodeToAnimate = nodeToAnimate;
        this.relativeNodeToAnimateAccross = relativeNodeToAnimateAccross;
        this.patternStepAnimation = new RefactoredStepAnimation(); // aka House
        this.extractedStepAcrossRelativeNode = extractedStepAcrossRelativeNode;
        this.coordinatesOperationStepAnimation = coordinatesOperationStepAnimation;
    }


    buildNodesInfoStepAnimation()
    {
        this.patternStepAnimation.addNodesInfoStepAnimation(this.nodeToAnimate, this.relativeNodeToAnimateAccross,
            this.extractedStepAcrossRelativeNode.directionName,
            this.extractedStepAcrossRelativeNode.patternStepName,
            this.extractedStepAcrossRelativeNode.applyStepToNodeToAnimate,
            this.extractedStepAcrossRelativeNode.nodeState);
    }


    buildCoordinatesStepAnimation()
    {
        let xCoordinateEndMovingStep = this.coordinatesOperationStepAnimation.computeXCoordinateEndMovingStep();
        let yCoordinateEndMovingStep = this.coordinatesOperationStepAnimation.computeYCoordinateEndMovingStep();
        this.patternStepAnimation.addCoordinatesStepAnimation(xCoordinateEndMovingStep, yCoordinateEndMovingStep);
    }


    buildStyleClassPrototypeStepAnimation()
    {
        let styleName = this.extractedStepAcrossRelativeNode.styleName;
        let styleKeysToUpdate = this.extractedStepAcrossRelativeNode.styleKeysToUpdate ?? null;
        this.patternStepAnimation.addStyleClassPrototypeStepAnimation(styleName, styleKeysToUpdate);
    }


    buildAdditionalStyleClassesPrototypeStepAnimation()
    {
        let additionalStyleClasses = this.extractedStepAcrossRelativeNode.additionalStyleClasses;
        this.patternStepAnimation.addAdditionalStyleClassesPrototypeStepAnimation(additionalStyleClasses);
    }


    buildHtmlNodeContainerStepAnimation()
    {
        if (!this.extractedStepAcrossRelativeNode.htmlNodeContainer)
        {
            throw new Error(`patternStepAnimationArray does not contain htmlNodeContainer`)
        }
        this.patternStepAnimation.addHtmlNodeContainerStepAnimation(this.extractedStepAcrossRelativeNode.htmlNodeContainer);
    }


    buildHtmlLinkContainerStepAnimation()
    {
        if (this.extractedStepAcrossRelativeNode?.htmlLinkContainer)
        {
            this.patternStepAnimation.addHtmlLinkContainerStepAnimation(this.extractedStepAcrossRelativeNode.htmlLinkContainer);
        }
    }


    buildHtmlGlowingMovingUpLineContainerStepAnimation()
    {
        if (this.extractedStepAcrossRelativeNode?.htmlGlowingMovingUpLineContainer)
        {
            this.patternStepAnimation.addHtmlGlowingMovingUpLineContainerStepAnimation(this.extractedStepAcrossRelativeNode.htmlGlowingMovingUpLineContainer);
        }
    }


    buildHtmlGlowingMovingDownLineContainerStepAnimation()
    {
        if (this.extractedStepAcrossRelativeNode?.htmlGlowingMovingDownLineContainer)
        {
            this.patternStepAnimation.addHtmlGlowingMovingDownLineContainerStepAnimation(this.extractedStepAcrossRelativeNode.htmlGlowingMovingDownLineContainer);
        }
    }


    buildKeyframesPrototypeStepAnimation(propertyNameInStepAnimation)
    {
        let keyframeName = this.extractedStepAcrossRelativeNode[propertyNameInStepAnimation];
        if (this.extractedStepAcrossRelativeNode.hasOwnProperty(propertyNameInStepAnimation))
        {
            this.patternStepAnimation.addKeyframesPrototype(keyframeName, propertyNameInStepAnimation);
        }
    }


    buildKeyframesPrototypeRelatedWithPropertyEntityPrototypeStepAnimation(propertyNameInStepAnimation)
    {
        let keyframesPrototypeRelatedWithPropertyEntityPrototype = this.extractedStepAcrossRelativeNode[propertyNameInStepAnimation];
        if (this.extractedStepAcrossRelativeNode.hasOwnProperty(propertyNameInStepAnimation))
        {
            this.patternStepAnimation.addKeyframesPrototypeRelatedWithPropertyEntityPrototypeStepAnimation(keyframesPrototypeRelatedWithPropertyEntityPrototype, propertyNameInStepAnimation);
        }
    }


    buildPropertyPrototypeStepAnimation(propertyNameInStepAnimation)
    {
        let propertyEntityName = this.extractedStepAcrossRelativeNode[propertyNameInStepAnimation];
        if (this.extractedStepAcrossRelativeNode.hasOwnProperty(propertyNameInStepAnimation))
        {
            this.patternStepAnimation.addPropertyPrototype(propertyEntityName, propertyNameInStepAnimation);
        }
    }


    buildTimeStepAnimation()
    {
        this.patternStepAnimation.addTimeStepAnimation(this.extractedStepAcrossRelativeNode.timeDurationStep,
            this.extractedStepAcrossRelativeNode.timeDelayStep);
    }


    getPatternStepAnimation()
    {
        return this.patternStepAnimation;
    }
}