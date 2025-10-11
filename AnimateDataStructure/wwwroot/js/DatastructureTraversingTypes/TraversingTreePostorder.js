import { AbstractTraversingTree } from './AbstractTraversingTree.js';

export class TraversingTreePostorder extends AbstractTraversingTree
{
    constructor(tree, traverseUntillFindValue = null)
    {
        super(tree, traverseUntillFindValue);
        this.tree = tree;
        this.traverseUntillFindValue = traverseUntillFindValue;
    }


    // get next node during Inorder Traverse
    getNextNodeToTraverse(currentNode)
    {
        if (!currentNode)
        {
            throw new Error(`Node to traverse can not be null`);
        }


        // leftChild is not visited
        if (currentNode.leftChild && !currentNode.leftChild.isVisitedNode)
        {
            return currentNode.leftChild;
        }

        // leftChild is visited and rightChild is not visited
        if (currentNode.leftChild && currentNode.leftChild.isVisitedNode &&
            currentNode.rightChild && !currentNode.rightChild.isVisitedNode)
        {
            return currentNode.rightChild;
        }

        // both children are visited
        if (currentNode.leftChild && currentNode.leftChild.isVisitedNode &&
            currentNode.rightChild && currentNode.rightChild.isVisitedNode)
        {
            return currentNode.parentNode;
        }


        if (!currentNode.leftChild && currentNode.rightChild && !currentNode.rightChild.isVisitedNode)
        {
            return currentNode.rightChild;
        }


        if (!currentNode.leftChild && currentNode.rightChild && currentNode.rightChild.isVisitedNode)
        {
            return currentNode.parentNode;
        }


        if (currentNode.leftChild && currentNode.leftChild.isVisitedNode && !currentNode.rightChild)
        {
            return currentNode.parentNode;
        }


        if (currentNode.leftChild && currentNode.leftChild.isVisitedNode && !currentNode.rightChild)
        {
            return currentNode.parentNode;
        }


        if (!currentNode.leftChild && !currentNode.rightChild)
        {
            return currentNode.parentNode;
        }
    }


    // set state currentNode.isVisitedNode = true
    setNodeVisited(currentNode)
    {
        if (currentNode.isVisitedNode)
        {
            return;
        }

        if (!currentNode.leftChild && !currentNode.rightChild)
        {
            currentNode.isVisitedNode = true;
            return;
        }

        // both child visited
        if (currentNode.leftChild && currentNode.leftChild.isVisitedNode &&
            currentNode.rightChild && currentNode.rightChild.isVisitedNode)
        {
            currentNode.isVisitedNode = true;
            return;
        }

        // leftChild is absent and rightChild child visited
        if (!currentNode.leftChild && currentNode.rightChild && currentNode.rightChild.isVisitedNode)
        {
            currentNode.isVisitedNode = true;
            return;
        }

        // rightChild is absent and leftChild child visited
        if (currentNode.leftChild && currentNode.leftChild.isVisitedNode && !currentNode.rightChild)
        {
            currentNode.isVisitedNode = true;
            return;
        }
    }

}