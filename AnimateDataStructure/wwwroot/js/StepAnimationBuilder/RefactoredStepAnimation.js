import { NodesInfoStepAnimation } from '../StepAnimationModel/NodesInfoStepAnimation.js';
import { CoordinatesStepAnimation } from '../StepAnimationModel/CoordinatesStepAnimation.js';
import { StyleClassPrototypeStepAnimation } from '../StepAnimationModel/StyleClassPrototypeStepAnimation.js';
import { HtmlNodeContainerStepAnimation } from '../StepAnimationModel/HtmlNodeContainerStepAnimation.js';
import { HtmlLinkContainerStepAnimation } from '../StepAnimationModel/HtmlLinkContainerStepAnimation.js';
import { HtmlGlowingMovingUpLineContainerStepAnimation } from '../StepAnimationModel/HtmlGlowingMovingUpLineContainerStepAnimation.js';
import { HtmlGlowingMovingDownLineContainerStepAnimation } from '../StepAnimationModel/HtmlGlowingMovingDownLineContainerStepAnimation.js';
import { KeyframesPrototypeStepAnimation } from '../StepAnimationModel/KeyframesPrototypeStepAnimation.js';
import { PropertyPrototypeStepAnimation } from '../StepAnimationModel/PropertyPrototypeStepAnimation.js';
import { TimeStepAnimation } from '../StepAnimationModel/TimeStepAnimation.js';

export class RefactoredStepAnimation // complex constructed object aka House
{
    constructor()
    {
        this.stepAnimationObject = {};
    }


    addNodesInfoStepAnimation(nodeToAnimate, relativeNodeToAnimateAccross, directionName, patternStepName, applyStepToNodeToAnimate, nodeState) // nodesInfoStepAnimation is an object
    {
        let objectNodesInfoStepAnimation = new NodesInfoStepAnimation(nodeToAnimate, relativeNodeToAnimateAccross, directionName, patternStepName, applyStepToNodeToAnimate, nodeState);
        Object.assign(this.stepAnimationObject, { nodesInfoStepAnimation: objectNodesInfoStepAnimation });
    }


    addCoordinatesStepAnimation(xCoordinateEndMovingStep, yCoordinateEndMovingStep)
    {
        let computedCoordinatesStepAnimation = new CoordinatesStepAnimation(xCoordinateEndMovingStep, yCoordinateEndMovingStep);
        Object.assign(this.stepAnimationObject, { coordinatesStepAnimation: computedCoordinatesStepAnimation })
    }


    addStyleClassPrototypeStepAnimation(styleName, styleKeysToUpdate)
    {
        let objectStyleClassPrototypeStepAnimation = new StyleClassPrototypeStepAnimation(styleName, styleKeysToUpdate);
        Object.assign(this.stepAnimationObject, { styleClassPrototypeStepAnimation: objectStyleClassPrototypeStepAnimation });
    }


    addAdditionalStyleClassesPrototypeStepAnimation(additionalStyleClasses)
    {
        Object.assign(this.stepAnimationObject, { additionalStyleClasses: additionalStyleClasses });
    }


    addHtmlNodeContainerStepAnimation(htmlNodeContainer)
    {
        let objectHtmlNodeContainerStepAnimation = new HtmlNodeContainerStepAnimation(htmlNodeContainer);
        Object.assign(this.stepAnimationObject, { htmlNodeContainer: objectHtmlNodeContainerStepAnimation.htmlNodeContainer });
    }


    addHtmlLinkContainerStepAnimation(htmlLinkContainer)
    {
        let objectHtmlLinkContainerStepAnimation = new HtmlLinkContainerStepAnimation(htmlLinkContainer);
        if (htmlLinkContainer)
        {
            Object.assign(this.stepAnimationObject, { htmlLinkContainer: objectHtmlLinkContainerStepAnimation.htmlLinkContainer });
        }
    }


    addHtmlGlowingMovingUpLineContainerStepAnimation(htmlGlowingMovingUpLineContainer)
    {
        let objectHtmlGlowingMovingUpLineContainerStepAnimation = new HtmlGlowingMovingUpLineContainerStepAnimation(htmlGlowingMovingUpLineContainer);
        if (htmlGlowingMovingUpLineContainer)
        {
            Object.assign(this.stepAnimationObject, { htmlGlowingMovingUpLineContainer: objectHtmlGlowingMovingUpLineContainerStepAnimation.htmlGlowingMovingUpLineContainer });
        }
    }


    addHtmlGlowingMovingDownLineContainerStepAnimation(htmlGlowingMovingDownLineContainer)
    {
        let objectHtmlGlowingMovingDownLineContainerStepAnimation = new HtmlGlowingMovingDownLineContainerStepAnimation(htmlGlowingMovingDownLineContainer);
        if (htmlGlowingMovingDownLineContainer)
        {
            Object.assign(this.stepAnimationObject, { htmlGlowingMovingDownLineContainer: objectHtmlGlowingMovingDownLineContainerStepAnimation.htmlGlowingMovingDownLineContainer });
        }
    }


    addKeyframesPrototype(keyframePatternName, propertyNameInStepAnimation) // InsideBorderRotatorStepAnimation
    {
        let objectKeyframesPrototypeStepAnimation = keyframePatternName ? new KeyframesPrototypeStepAnimation(keyframePatternName) : null;
        Object.assign(this.stepAnimationObject, { [propertyNameInStepAnimation]: objectKeyframesPrototypeStepAnimation });
    }


    addKeyframesPrototypeRelatedWithPropertyEntityPrototypeStepAnimation(keyframesPrototypeRelatedWithPropertyEntityPrototype, propertyNameInStepAnimation)
    {
        if (propertyNameInStepAnimation)
        {
            Object.assign(this.stepAnimationObject, { [propertyNameInStepAnimation]: keyframesPrototypeRelatedWithPropertyEntityPrototype });
        }
    }


    addPropertyPrototype(propertyEntityPatternName, propertyNameInStepAnimation)
    {
        let objectPropertyEntityPrototypeStepAnimation = propertyEntityPatternName ? new PropertyPrototypeStepAnimation(propertyEntityPatternName) : null;
        Object.assign(this.stepAnimationObject, { [propertyNameInStepAnimation]: objectPropertyEntityPrototypeStepAnimation });
    }


    addTimeStepAnimation(timeDurationStep, timeDelayStep)
    {
        let objectTimeStepAnimation = new TimeStepAnimation(timeDurationStep, timeDelayStep);
        Object.assign(this.stepAnimationObject, { timeStepAnimation: objectTimeStepAnimation });
    }

}