export class RefactoredConstructorStepAnimation // Foreman
{
    constructor(builderStepAnimation)
    {
        this.builderStepAnimation = builderStepAnimation;
    }

    constructStepAnimation()
    {
        this.builderStepAnimation.buildNodesInfoStepAnimation();
        this.builderStepAnimation.buildCoordinatesStepAnimation();
        this.builderStepAnimation.buildStyleClassPrototypeStepAnimation();
        this.builderStepAnimation.buildAdditionalStyleClassesPrototypeStepAnimation();
        this.builderStepAnimation.buildHtmlNodeContainerStepAnimation();
        this.builderStepAnimation.buildHtmlLinkContainerStepAnimation();
        this.builderStepAnimation.buildHtmlGlowingMovingUpLineContainerStepAnimation();
        this.builderStepAnimation.buildHtmlGlowingMovingDownLineContainerStepAnimation();
        this.builderStepAnimation.buildKeyframesPrototypeStepAnimation("keyframesPrototypeMoveNode");
        this.builderStepAnimation.buildKeyframesPrototypeStepAnimation("keyframesPrototypeContainerSpectrumBorder");
        this.builderStepAnimation.buildKeyframesPrototypeStepAnimation("keyframesPrototypeAnimationLinkContainer");
        this.builderStepAnimation.buildKeyframesPrototypeStepAnimation("keyframesPrototypeBorderRotatorContainer");
        this.builderStepAnimation.buildKeyframesPrototypeStepAnimation("keyframesPrototypeShadowBorderRotatorContainer");
        this.builderStepAnimation.buildKeyframesPrototypeStepAnimation("keyframesPrototypeInsideBorder");
        this.builderStepAnimation.buildKeyframesPrototypeStepAnimation("keyframesPrototypeSvgLineLink");
        this.builderStepAnimation.buildKeyframesPrototypeStepAnimation("keyframesPrototypeGlowingMovingLine");
        this.builderStepAnimation.buildKeyframesPrototypeRelatedWithPropertyEntityPrototypeStepAnimation("keyframesPrototypeRelatedWithPropertyEntityPrototype");        
        this.builderStepAnimation.buildPropertyPrototypeStepAnimation("propertyEntityPrototypeInsideBorder");
        this.builderStepAnimation.buildTimeStepAnimation();
    }
}