export class TreeStepAnimationChooserTraversingNode
{
    chooseStepsToAnimate(nodeToAnimate, relativeNodeToAnimateAccross, patternStepAnimationArrayOperation)
    {
        return patternStepAnimationArrayOperation.filter(stepObject =>
        {
            if (relativeNodeToAnimateAccross.isLeftChild === null)
            {
                return stepObject.patternStepName === "own position (root)";
            }
            if (relativeNodeToAnimateAccross.isLeftChild === true)
            {
                return stepObject.patternStepName === "own position (left child)";
            }
            if (relativeNodeToAnimateAccross.isLeftChild === false)
            {
                return stepObject.patternStepName === "own position (right child)";
            }
        });
    }
}