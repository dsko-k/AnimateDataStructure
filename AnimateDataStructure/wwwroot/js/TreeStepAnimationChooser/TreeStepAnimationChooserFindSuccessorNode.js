
export class TreeStepAnimationChooserFindSuccessorNode
{
    constructor(nodeToDelete)
    {
        this.nodeToDelete = nodeToDelete;
    }

    // choose array of steps to animate depends on nodeToAnimate, relativeNodeToAnimateAccross
    chooseStepsToAnimate(nodeToAnimate, relativeNodeToAnimateAccross, patternStepAnimationArrayOperation)
    {
        if (this.nodeToDelete.leftChild && this.nodeToDelete.rightChild)
        {
            return patternStepAnimationArrayOperation.filter(stepObject =>
            {
                if (stepObject.patternStepName.includes("above related node") || stepObject.patternStepName.includes("below to related node"))
                {
                    return relativeNodeToAnimateAccross.leftChild;
                }

                if (stepObject.patternStepName.includes("highlight left border of nodeToAnimate"))
                {
                    return relativeNodeToAnimateAccross.leftChild;
                }

                //if (stepObject.patternStepName.includes("highlight right border of nodeToAnimate"))
                //{
                //    return relativeNodeToAnimateAccross.leftChild && (relativeNodeToAnimateAccross.parentNode.value === nodeToAnimate.value);
                //}

                if (stepObject.patternStepName.includes("own position (left child)"))
                {
                    return !relativeNodeToAnimateAccross.leftChild && (relativeNodeToAnimateAccross.parentNode.value > nodeToAnimate.value);
                }

                if (stepObject.patternStepName.includes("own position (right child)"))
                {
                    return !relativeNodeToAnimateAccross.leftChild && (relativeNodeToAnimateAccross.parentNode.value === nodeToAnimate.value);
                }

                return false;
            });
        }

        if (!this.nodeToDelete.leftChild && this.nodeToDelete.rightChild ||
            this.nodeToDelete.leftChild && !this.nodeToDelete.rightChild)
        {
            return patternStepAnimationArrayOperation.filter(stepObject =>
            {
                //if (stepObject.patternStepName.includes("above related node") || stepObject.patternStepName.includes("below to related node"))
                //{
                //    return relativeNodeToAnimateAccross.leftChild;
                //}

                //if (stepObject.patternStepName.includes("highlight left border of nodeToAnimate"))
                //{
                //    return relativeNodeToAnimateAccross.isLeftChild;
                //}

                if (stepObject.patternStepName.includes("highlight right border of nodeToAnimate"))
                {
                    return relativeNodeToAnimateAccross.isLeftChild;
                }

                if (stepObject.patternStepName.includes("own position (left child)"))
                {
                    return Object.is(relativeNodeToAnimateAccross, this.nodeToDelete.leftChild);
                }

                if (stepObject.patternStepName.includes("own position (right child)"))
                {
                    return Object.is(relativeNodeToAnimateAccross, this.nodeToDelete.rightChild);
                }

                return false;
            });
        }


        ////////////////// no needed???
        return patternStepAnimationArrayOperation.filter(stepObject =>
        {
            if (this.nodeToDelete.leftChild && this.nodeToDelete.rightChild)
            {
                if (stepObject.patternStepName.includes("above related node") || stepObject.patternStepName.includes("below to related node"))
                {
                    return relativeNodeToAnimateAccross.leftChild;
                }

                //if (stepObject.patternStepName.includes("highlight left border of nodeToAnimate"))
                //{
                //    return relativeNodeToAnimateAccross.leftChild;
                //}

                //if (stepObject.patternStepName.includes("highlight right border of nodeToAnimate"))
                //{
                //    return relativeNodeToAnimateAccross.leftChild && (relativeNodeToAnimateAccross.parentNode.value === nodeToAnimate.value);
                //}

                if (stepObject.patternStepName.includes("own position (left child)"))
                {
                    return !relativeNodeToAnimateAccross.leftChild && (relativeNodeToAnimateAccross.parentNode.value > nodeToAnimate.value);
                }

                if (stepObject.patternStepName.includes("own position (right child)"))
                {
                    return !relativeNodeToAnimateAccross.leftChild && (relativeNodeToAnimateAccross.parentNode.value === nodeToAnimate.value);
                }

                return false;
            }


            if (!this.nodeToDelete.leftChild && this.nodeToDelete.rightChild ||
                this.nodeToDelete.leftChild && !this.nodeToDelete.rightChild)
            {
                //if (stepObject.patternStepName.includes("above related node") || stepObject.patternStepName.includes("below to related node"))
                //{
                //    return relativeNodeToAnimateAccross.leftChild;
                //}

                if (stepObject.patternStepName.includes("highlight left border of nodeToAnimate"))
                {
                    return relativeNodeToAnimateAccross.isLeftChild;
                }

                if (stepObject.patternStepName.includes("highlight right border of nodeToAnimate"))
                {
                    return relativeNodeToAnimateAccross.isLeftChild;
                }

                if (stepObject.patternStepName.includes("own position (left child)"))
                {
                    return Object.is(relativeNodeToAnimateAccross, this.nodeToDelete.leftChild);
                }

                if (stepObject.patternStepName.includes("own position (right child)"))
                {
                    return Object.is(relativeNodeToAnimateAccross, this.nodeToDelete.rightChild);
                }

                return false;
            }
        });
    }

}