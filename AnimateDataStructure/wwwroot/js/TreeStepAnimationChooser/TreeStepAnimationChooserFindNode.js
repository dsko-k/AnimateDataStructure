export class TreeStepAnimationChooserFindNode
{
    chooseStepsToAnimate(nodeToAnimate, relativeNodeToAnimateAccross, patternStepAnimationArrayOperation)
    {
        return patternStepAnimationArrayOperation.filter(stepObject =>
        {
            if (!relativeNodeToAnimateAccross.parentNode && relativeNodeToAnimateAccross.value === nodeToAnimate.value)
            {
                return stepObject.patternStepName === "own position (root)";
            }
            if (stepObject.patternStepName.includes("highlight left border of nodeToAnimate"))
            {
                return nodeToAnimate.value < relativeNodeToAnimateAccross.value;
            }
            if (stepObject.patternStepName.includes("highlight right border of nodeToAnimate"))
            {
                return nodeToAnimate.value > relativeNodeToAnimateAccross.value;
            }
            if (stepObject.patternStepName.includes("own position (left child)"))
            {
                return relativeNodeToAnimateAccross.isLeftChild && nodeToAnimate.value === relativeNodeToAnimateAccross.value;
            }
            if (stepObject.patternStepName.includes("own position (right child)"))
            {
                return relativeNodeToAnimateAccross.isLeftChild === false && nodeToAnimate.value === relativeNodeToAnimateAccross.value;
            }
            if (stepObject.patternStepName.includes("above related node"))
            {
                return relativeNodeToAnimateAccross.value !== nodeToAnimate.value;
            }
            if (stepObject.patternStepName.includes("below to related node"))
            {
                return relativeNodeToAnimateAccross.value !== nodeToAnimate.value;
            }
            return false;
        });
    }

}