
export class TreeStepAnimationChooserAddNode
{
    chooseStepsToAnimate(nodeToAnimate, relativeNodeToAnimateAccross, patternStepAnimationArrayOperation)
    {
        return patternStepAnimationArrayOperation.filter(stepObject =>
        {
            if (relativeNodeToAnimateAccross === null)
            {
                return stepObject.patternStepName === "own position (root)";
            }
            if (stepObject.patternStepName.includes("highlight left border of nodeToAnimate"))
            {
                return nodeToAnimate.value < relativeNodeToAnimateAccross.value;
            }
            if (stepObject.patternStepName.includes("highlight right border of nodeToAnimate"))
            {
                return nodeToAnimate.value >= relativeNodeToAnimateAccross.value;
            }
            if (Object.is(nodeToAnimate.parentNode, relativeNodeToAnimateAccross))
            {
                if (stepObject.patternStepName.includes("own position (root)"))
                {
                    return false;
                }
                if (stepObject.patternStepName.includes("own position (left child)") || stepObject.patternStepName.includes("own position (right child)"))
                {
                    return stepObject.isNodeToAnimateLeftChild === nodeToAnimate.isLeftChild;
                }
                if (stepObject.patternStepName.includes("draw left link to parent"))
                {
                    return nodeToAnimate.isLeftChild;
                }
                if (stepObject.patternStepName.includes("draw right link to parent"))
                {
                    return !nodeToAnimate.isLeftChild;
                }
            }
            else
            {
                if (stepObject.patternStepName.includes("own position (root)"))
                {
                    return nodeToAnimate.parentNode === null;
                }
                if (stepObject.patternStepName.includes("own position (left child)") || stepObject.patternStepName.includes("own position (right child)"))
                {
                    return false;
                }
                if (stepObject.patternStepName.includes("draw left link to parent") || stepObject.patternStepName.includes("draw right link to parent"))
                {
                    return false;
                }
            }
            return true;
        });
    }
}