export class TreeStepAnimationChooserLinkBeforeAfterBalancing
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
                return stepObject.patternStepName === "erase link (left child)";
            }
            else if (this.isHideLink && !nodeToAnimate.isLeftChild)
            {
                return stepObject.patternStepName === "erase link (right child)";
            }
            else if (!this.isHideLink && nodeToAnimate.isLeftChild)
            {
                return stepObject.patternStepName === "draw link (left child)";
            }
            else if (!this.isHideLink && !nodeToAnimate.isLeftChild)
            {
                return stepObject.patternStepName === "draw link (right child)";
            }
            else
            {
                throw new Error(`Unable to find appropriate step to animate link of node ${nodeToAnimate.value}. Check step animations`);
            }
        });
    }
}