import { RefactoredBuilderStepAnimation } from './RefactoredBuilderStepAnimation.js';
import { RefactoredConstructorStepAnimation } from './RefactoredConstructorStepAnimation.js';

export class StepAnimationClient
{
    constructor(nodeToAnimate, relativeNodeToAnimateAccross, extractedStepAcrossRelativeNode, coordinatesOperationStepAnimation)
    {
        this.refactoredBuilderStepAnimation = new RefactoredBuilderStepAnimation(nodeToAnimate, relativeNodeToAnimateAccross, extractedStepAcrossRelativeNode, coordinatesOperationStepAnimation);
        this.refactoredConstructorStepAnimation = new RefactoredConstructorStepAnimation(this.refactoredBuilderStepAnimation);
    }


    createStepAnimation()
    {
        this.refactoredConstructorStepAnimation.constructStepAnimation();
        return this.refactoredBuilderStepAnimation.getPatternStepAnimation();
    }
}