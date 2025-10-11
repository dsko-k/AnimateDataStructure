export class TreeStepAnimationChooserClickNode
{
    // choose array of steps to animate depends on nodeToAnimate, relativeNodeToAnimateAccross
    chooseStepsToAnimate(nodeToAnimate, relativeNodeToAnimateAccross, patternStepAnimationArrayOperation)
    {
        // relativeNodeToAnimateAccross - is clicked node,
        // nodeToAnimate - is ancestor of clicked node, or successor of clicked node or clicked node itself
        return patternStepAnimationArrayOperation.filter(stepObject =>
        {
            if (Object.is(nodeToAnimate, relativeNodeToAnimateAccross))
            {
                if (stepObject.patternStepName === "node clicked (it is a root)" ||
                    stepObject.patternStepName === "node clicked (it is a left child)" ||
                    stepObject.patternStepName === "node clicked (it is a right child)")
                {
                    return stepObject.isNodeToAnimateLeftChild === nodeToAnimate.isLeftChild;
                }
            }

            if (nodeToAnimate.levelInTree < relativeNodeToAnimateAccross.levelInTree)
            {
                if (stepObject.patternStepName === "ancestor of clicked node (ancestor is left child of its parent)" ||
                    stepObject.patternStepName === "ancestor of clicked node (ancestor is right child of its parent)" ||
                    stepObject.patternStepName === "ancestor of clicked node (ancestor is root)")
                {
                    return stepObject.isNodeToAnimateLeftChild === nodeToAnimate.isLeftChild;
                }
            }

            if (nodeToAnimate.levelInTree > relativeNodeToAnimateAccross.levelInTree)
            {
                if (stepObject.patternStepName === "successor of clicked node (successor is left child of its parent)" ||
                    stepObject.patternStepName === "successor of clicked node (successor is right child of its parent)")
                {
                    return stepObject.isNodeToAnimateLeftChild === nodeToAnimate.isLeftChild;
                }
            }

        });

    }

}