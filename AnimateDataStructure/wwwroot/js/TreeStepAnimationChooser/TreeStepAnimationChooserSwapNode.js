
// Heap
export class TreeStepAnimationChooserSwapNode
{
    // Duplication class TreeStepAnimationChooserAlignNodeByHeight

    // choose array of steps to animate depends on nodeToAnimate, relativeNodeToAnimateAccross
    chooseStepsToAnimate(nodeToAnimate, relativeNodeToAnimateAccross, patternStepAnimationArrayOperation)
    {
        return patternStepAnimationArrayOperation.filter(stepObject =>
        {
            if (nodeToAnimate.isLeftChild === null)
            {
                return stepObject.patternStepName === "own position (root)";
            }

            if (nodeToAnimate.isLeftChild)
            {
                return stepObject.patternStepName === "own position (left child)";
            }

            if (nodeToAnimate.isLeftChild === false)
            {
                return stepObject.patternStepName === "own position (right child)";
            }
        });
    }

}