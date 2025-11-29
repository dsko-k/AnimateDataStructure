export class TreeStepAnimationChooserNodeBalancing
{
    chooseStepsToAnimate(nodeToAnimate, relativeNodeToAnimateAccross, patternStepAnimationArrayOperation)
    {
        return patternStepAnimationArrayOperation.filter(stepObject =>
        {
            if (nodeToAnimate.parentNode === null)
            {
                return stepObject.patternStepName === "own position (root)";
            }
            if (nodeToAnimate.isLeftChild)
            {
                return stepObject.patternStepName === "own position (left child)";
            }
            return stepObject.patternStepName === "own position (right child)";
        });
    }
}