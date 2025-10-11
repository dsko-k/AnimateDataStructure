import { PatternAnimationAcrossNode } from './PatternAnimationAcrossNode.js';

export class AnimationMovingAcrossNodes
{
    constructor(tree, patternStepAnimationArrayOperation, treeStepAnimationChooserOperation)
    {
        this.tree = tree;
        this.patternStepAnimationArrayOperation = patternStepAnimationArrayOperation;
        this.animationAcrossAllNodes = [];
        this.treeStepAnimationChooserOperation = treeStepAnimationChooserOperation;
    }

    animateNodeMovingAcrossNodes(nodeToAnimate, listOfRelativeNodes)
    {
        listOfRelativeNodes.forEach(relativeNode =>
        {
            let patternAnimationAcrossNode = new PatternAnimationAcrossNode(nodeToAnimate, relativeNode, this.patternStepAnimationArrayOperation, this.treeStepAnimationChooserOperation);

            let patternAnimation = patternAnimationAcrossNode.createPatternAnimationAcrossNode();

            this.animationAcrossAllNodes.push(patternAnimation);
        });

        if (listOfRelativeNodes.length === 0)
        {
            let patternAnimationAcrossNode = new PatternAnimationAcrossNode(nodeToAnimate, null, this.patternStepAnimationArrayOperation, this.treeStepAnimationChooserOperation);

            let patternAnimation = patternAnimationAcrossNode.createPatternAnimationAcrossNode();

            this.animationAcrossAllNodes.push(patternAnimation);
        }

        return this.animationAcrossAllNodes;
    }


    animateAddNode(nodeToAnimate)
    {
        let allParentNodesFromRootToNode = this.tree.getAllParentsFromRootToNode(nodeToAnimate);
        return this.animateNodeMovingAcrossNodes(nodeToAnimate, allParentNodesFromRootToNode);
    }


    // using for alignment by width and by height
    animateAlignNode(nodeToAnimate)
    {
        return this.animateNodeMovingAcrossNodes(nodeToAnimate, [nodeToAnimate]);
    }


    animateClickNode(nodeToAnimate, relativeNodeToAnimateAccross)
    {
        return this.animateNodeMovingAcrossNodes(nodeToAnimate, [relativeNodeToAnimateAccross]);
    }


    animateFindNode(nodeFinder)
    {
        let foundNode = this.tree.findNodeOrLastNodeSubtree(nodeFinder.value);

        let allParentNodesFromRootToNode = [...this.tree.getAllParentsFromRootToNode(foundNode), foundNode];
        return this.animateNodeMovingAcrossNodes(nodeFinder, allParentNodesFromRootToNode);
    }


    animateFindSuccessorNode(nodeToDelete, nodeFinder)
    {
        let foundSuccessorNode = this.tree.findSuccessorOf(nodeToDelete);

        let allNodesFromRemovedNodeToSuccessor = [...this.tree.getChildrenFromTo(nodeToDelete, foundSuccessorNode)];

        // nodeFinder ?????????????
        return this.animateNodeMovingAcrossNodes(nodeFinder, allNodesFromRemovedNodeToSuccessor);
    }


    animateLinkNodeAction(nodeToAnimateLinkAction)
    {
        return this.animateNodeMovingAcrossNodes(nodeToAnimateLinkAction, [nodeToAnimateLinkAction]);
    }


    animateRelocateNode(nodeToRelocate, relativeNodeToAnimateAccross)
    {
        return this.animateNodeMovingAcrossNodes(nodeToRelocate, [relativeNodeToAnimateAccross]);
    }


    animateTraversingNode(nodeVisitor, startNode, traversingTreeOperationInstance) // startNode is a node to begin traversing this.tree
    {
        let allNodesToVisit = [...traversingTreeOperationInstance.traverseTree(startNode)];

        return this.animateNodeMovingAcrossNodes(nodeVisitor, allNodesToVisit);
    }


    // Heap
    animateSwapNode(nodeToAnimate, relativeNodeToAnimateAccross)
    {
        return this.animateNodeMovingAcrossNodes(nodeToAnimate, [relativeNodeToAnimateAccross]);
    }
}