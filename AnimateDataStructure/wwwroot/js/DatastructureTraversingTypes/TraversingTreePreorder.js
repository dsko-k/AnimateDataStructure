import { AbstractTraversingTree } from './AbstractTraversingTree.js';

export class TraversingTreePreorder extends AbstractTraversingTree
{
    // https://www.freecodecamp.org/news/binary-search-tree-traversal-inorder-preorder-post-order-for-bst/

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


        if (!currentNode.isVisitedNode)
        {
            return currentNode;
        }

        // leftChild is is not visited
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
        if (!currentNode.isVisitedNode)
        {
            currentNode.isVisitedNode = true;
            return;
        }
    }

}