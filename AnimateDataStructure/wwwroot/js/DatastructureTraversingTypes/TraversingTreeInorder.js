import { AbstractTraversingTree } from './AbstractTraversingTree.js';

export class TraversingTreeInorder extends AbstractTraversingTree
{
    constructor(tree, traverseUntillFindValue = null)
    {
        super(tree, traverseUntillFindValue);
        this.tree = tree;
        this.traverseUntillFindValue = traverseUntillFindValue;
    }

    // Get next node during Inorder Traverse
    getNextNodeToTraverse(currentNode)
    {
        if (!currentNode)
        {
            throw new Error(`Node to traverse can not be null`);
        }
        if (currentNode.leftChild && currentNode.leftChild.isVisitedNode && !currentNode.rightChild) // no rightChild and leftChild was visited
        {
            return currentNode.parentNode;
        }
        if (!currentNode.leftChild && currentNode.rightChild && currentNode.rightChild.isVisitedNode) // no leftChild and rightChild was visited
        {
            return currentNode.parentNode;
        }
        if (currentNode.leftChild && currentNode.leftChild.isVisitedNode && currentNode.rightChild && currentNode.rightChild.isVisitedNode) // both children were visited
        {
            return currentNode.parentNode;
        }
        // if currentNode has both child which was visited
        if (currentNode.leftChild && currentNode.leftChild.isVisitedNode && currentNode.rightChild && currentNode.rightChild.isVisitedNode)
        {
            return currentNode.parentNode;
        }
        // if currentNode was visited and do not have children
        if (currentNode.isVisitedNode && !currentNode.leftChild && !currentNode.rightChild)
        {
            return currentNode.parentNode;
        }
        // if currentNode have only right children
        if (!currentNode.leftChild && currentNode.rightChild && !currentNode.rightChild.isVisitedNode)
        {
            return currentNode.rightChild;
        }
        // if currentNode has unvisited leftChild
        if (currentNode.leftChild && !currentNode.leftChild.isVisitedNode)
        {
            return currentNode.leftChild;
        }
        // if currentNode has visited left child and currentNode has unvisited rightChild
        if (currentNode.leftChild && currentNode.leftChild.isVisitedNode && currentNode.rightChild && !currentNode.rightChild.isVisitedNode)
        {
            return currentNode.rightChild;
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
        // if left child of currentNode is visited and currentNode is not visited yet
        if (currentNode.leftChild && currentNode.leftChild.isVisitedNode)
        {
            currentNode.isVisitedNode = true;
            return;
        }
        // if currentNode has no left child, parent node is visited and currentNode is not visited yet
        if (!currentNode.leftChild && currentNode.parentNode && currentNode.parentNode.isVisitedNode)
        {
            currentNode.isVisitedNode = true;
            return;
        }
        // if currentNode has no left child and currentNode is root
        if (!currentNode.leftChild && !currentNode.parentNode)
        {
            currentNode.isVisitedNode = true;
            return;
        }
        // if currentNode has no left child and currentNode is root
        if (!currentNode.leftChild && currentNode.rightChild && currentNode.rightChild.isVisitedNode)
        {
            currentNode.isVisitedNode = true;
            return;
        }
    }
}