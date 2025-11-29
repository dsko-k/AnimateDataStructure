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
        if (currentNode.leftChild && !currentNode.leftChild.isVisitedNode) // leftChild is not visited
        {
            return currentNode.leftChild;
        }        
        if (currentNode.leftChild && currentNode.leftChild.isVisitedNode && 
            currentNode.rightChild && !currentNode.rightChild.isVisitedNode) // leftChild is visited and rightChild is not visited
        {
            return currentNode.rightChild;
        }        
        if (currentNode.leftChild && currentNode.leftChild.isVisitedNode &&
            currentNode.rightChild && currentNode.rightChild.isVisitedNode) // both children are visited
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
        if (currentNode.leftChild && currentNode.leftChild.isVisitedNode &&
            currentNode.rightChild && currentNode.rightChild.isVisitedNode) // both child visited
        {
            currentNode.isVisitedNode = true;
            return;
        }        
        if (!currentNode.leftChild && currentNode.rightChild && currentNode.rightChild.isVisitedNode) // leftChild is absent and rightChild child visited
        {
            currentNode.isVisitedNode = true;
            return;
        }        
        if (currentNode.leftChild && currentNode.leftChild.isVisitedNode && !currentNode.rightChild) // rightChild is absent and leftChild child visited
        {
            currentNode.isVisitedNode = true;
            return;
        }
    }
}