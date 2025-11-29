export class TreeStepAnimationChooserLinkNodeAction
{
    constructor(isHideLink)
    {
        this.isHideLink = isHideLink;
    }

    chooseStepsToAnimate(nodeToAnimate, relativeNodeToAnimateAccross, patternStepAnimationArrayOperation)
    {
        return patternStepAnimationArrayOperation.filter(stepObject =>
        {
            if (this.isHideLink && nodeToAnimate.isLeftChild)
            {
                return stepObject.patternStepName === "erase left link to parent";
            }
            else if (this.isHideLink && !nodeToAnimate.isLeftChild)
            {
                return stepObject.patternStepName === "erase right link to parent";
            }
            else if (!this.isHideLink && nodeToAnimate.isLeftChild)
            {
                return stepObject.patternStepName === "draw left link to parent";
            }
            else if (!this.isHideLink && !nodeToAnimate.isLeftChild)
            {
                return stepObject.patternStepName === "draw right link to parent";
            }
            else
            {
                throw new Error(`Unable to find appropriate step to animate link of node ${nodeToAnimate.value}`);
            }
        });
    }
}