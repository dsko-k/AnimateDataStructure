import { AbstractTree } from './AbstractTree.js';
import { CreatorNodeHeap } from '../CreatorNodeDatastructures/CreatorNodeHeap.js';
import { Coordinates } from '../CoordinatesModel/Coordinates.js';

export class Heap extends AbstractTree
{
    constructor(isMaxHeap)
    {
        super();
        this.isMaxHeap = isMaxHeap;
        this.creatorNode = new CreatorNodeHeap(this, this.isMaxHeap);
        this.lastSwappedNode = null;
        this.swappedTimes = 0;
        this.nodeToCheckHeapify = null;
    }


    insert(valueToAdd)
    {
        let nodeToAdd = this.creatorNode.createNodeInstance(valueToAdd, this.isMaxHeap);
        if (this.root == null)
        {
            this.root = nodeToAdd;
            this.currentAmountOfNodesInTree++;
            this.treeLevels++;
            this.totalAddedNodes++;
            this.root.orderNumber = this.totalAddedNodes;
            this.lastAddedNode = nodeToAdd;
            nodeToAdd.setLevelInTree();
            nodeToAdd.setNodeId(this.root.orderNumber);

            return nodeToAdd;
        }
        else
        {
            this.treeLevelsBeforeNodeOperation = this.getAllNodesByLevels().length;
            this.currentAmountOfNodesInTree++;
            this.totalAddedNodes++;
            nodeToAdd.orderNumber = this.totalAddedNodes;
            this.lastAddedNode = nodeToAdd;
            let parentOfAddingNode = this.findParentToInsertNodeInHeap();
            this.attachNodeToHeap(parentOfAddingNode, nodeToAdd);
            nodeToAdd.setLevelInTree(); // it should be after assigning a parent to nodeToAdd
            nodeToAdd.setNodeId(nodeToAdd.orderNumber);
            this.treeLevels = this.getAllNodesByLevels().length;

            return nodeToAdd;
        }
    }


    // Heap
    attachNodeToHeap(parentOfAddingNode, nodeToAdd)
    {
        if (parentOfAddingNode === null)
        {
            throw new Error("Incorrect parent node");
        }

        if (parentOfAddingNode.leftChild && parentOfAddingNode.rightChild)
        {
            nodeToAdd.isLeftChild = true;
            parentOfAddingNode.rightChild = nodeToAdd;
        }
        else if (!parentOfAddingNode.leftChild)
        {
            nodeToAdd.isLeftChild = true;
            parentOfAddingNode.leftChild = nodeToAdd;
        }
        else
        {
            nodeToAdd.isLeftChild = false;
            parentOfAddingNode.rightChild = nodeToAdd;
        }
        nodeToAdd.parentNode = parentOfAddingNode;
    }


    swapNodes(firstNodeToSwap, secondNodeToSwap)
    {
        let coordinates = new Coordinates(this);
        let allNodesByLevels = this.getAllNodesByLevels();
        coordinates.updateHeapCoordinatesAfterSwapTwoNode(allNodesByLevels, firstNodeToSwap, secondNodeToSwap);
        this.reassignNodesToSwap(firstNodeToSwap, secondNodeToSwap);
        this.swappedTimes++;
    }


    reassignNodesToSwap(firstNodeToSwap, secondNodeToSwap)
    {
        let levelInTreeFirstNodeToSwap = firstNodeToSwap.levelInTree;
        let levelInTreeSecondNodeToSwap = secondNodeToSwap.levelInTree;
        let isLeftChildFirstNodeToSwap = firstNodeToSwap.isLeftChild;
        let isLeftChildSecondNodeToSwap = secondNodeToSwap.isLeftChild;
        let leftChildFirstNodeToSwap = firstNodeToSwap.leftChild;
        let rightChildFirstNodeToSwap = firstNodeToSwap.rightChild;
        let leftChildSecondNodeToSwap = secondNodeToSwap.leftChild;
        let rightChildSecondNodeToSwap = secondNodeToSwap.rightChild;
        let parentFirstNodeToSwap = firstNodeToSwap.parentNode;
        let parentSecondNodeToSwap = secondNodeToSwap.parentNode;

        if (!Object.is(secondNodeToSwap, firstNodeToSwap.parentNode))
        {
            firstNodeToSwap.parentNode = null;
            firstNodeToSwap.leftChild = null;
            firstNodeToSwap.rightChild = null;
            secondNodeToSwap.parentNode = null;
            secondNodeToSwap.leftChild = null;
            secondNodeToSwap.rightChild = null;
            secondNodeToSwap.parentNode = parentFirstNodeToSwap;
            secondNodeToSwap.leftChild = leftChildFirstNodeToSwap;
            secondNodeToSwap.rightChild = rightChildFirstNodeToSwap;

            if (leftChildFirstNodeToSwap)
            {
                leftChildFirstNodeToSwap.parentNode = secondNodeToSwap;
            }

            if (rightChildFirstNodeToSwap)
            {
                rightChildFirstNodeToSwap.parentNode = secondNodeToSwap;
            }
            secondNodeToSwap.isLeftChild = isLeftChildFirstNodeToSwap;
            if (isLeftChildFirstNodeToSwap === null)
            {
                this.root = secondNodeToSwap;
            }
            else
            {
                isLeftChildFirstNodeToSwap ? parentFirstNodeToSwap.leftChild = secondNodeToSwap : parentFirstNodeToSwap.rightChild = secondNodeToSwap;
                firstNodeToSwap.leftChild = leftChildSecondNodeToSwap; // null always if firstNodeToSwap is node to delete
                firstNodeToSwap.rightChild = rightChildSecondNodeToSwap; // null always if firstNodeToSwap is node to delete
            }
            firstNodeToSwap.parentNode = parentSecondNodeToSwap;
            firstNodeToSwap.isLeftChild = isLeftChildSecondNodeToSwap;
            if (isLeftChildSecondNodeToSwap)
            {
                parentSecondNodeToSwap.leftChild = firstNodeToSwap;
            }
            else
            {
                parentSecondNodeToSwap.rightChild = firstNodeToSwap;
            }
        }
        else
        {
            this.assignChildrenToNode(firstNodeToSwap, null, null);
            firstNodeToSwap.parentNode = null;
            this.assignChildrenToNode(secondNodeToSwap, null, null);
            secondNodeToSwap.parentNode = null;
            this.assignChildrenToNode(secondNodeToSwap, leftChildFirstNodeToSwap, rightChildFirstNodeToSwap);
            secondNodeToSwap.parentNode = firstNodeToSwap;

            if (isLeftChildFirstNodeToSwap === false)
            {
                secondNodeToSwap.isLeftChild = false;
                this.assignChildrenToNode(firstNodeToSwap, leftChildSecondNodeToSwap, secondNodeToSwap);
            }
            if (isLeftChildFirstNodeToSwap === true)
            {
                secondNodeToSwap.isLeftChild = true;
                this.assignChildrenToNode(firstNodeToSwap, secondNodeToSwap, rightChildSecondNodeToSwap);
            }
            firstNodeToSwap.parentNode = parentSecondNodeToSwap;
            if (isLeftChildSecondNodeToSwap === true)
            {
                parentSecondNodeToSwap.leftChild = firstNodeToSwap;
                firstNodeToSwap.isLeftChild = true;
            }
            if (isLeftChildSecondNodeToSwap === false)
            {
                parentSecondNodeToSwap.rightChild = firstNodeToSwap;
                firstNodeToSwap.isLeftChild = false;
            }
            if (firstNodeToSwap.parentNode === null)
            {
                firstNodeToSwap.isLeftChild = null;
                this.root = firstNodeToSwap;
            }
        }
        this.reassignLevelInTreeToSwap(firstNodeToSwap, levelInTreeSecondNodeToSwap);
        this.reassignLevelInTreeToSwap(secondNodeToSwap, levelInTreeFirstNodeToSwap);
    }


    assignChildrenToNode(node, leftChildOfNode, rightChildOfNode)
    {
        if (!node)
        {
            throw new Error(`Unable to assign children to node which is ${node}`);
        }
        node.leftChild = leftChildOfNode;
        if (leftChildOfNode)
        {
            leftChildOfNode.parentNode = node;
            leftChildOfNode.isLeftChild = true;
        }
        node.rightChild = rightChildOfNode;
        if (rightChildOfNode)
        {
            rightChildOfNode.parentNode = node;
            rightChildOfNode.isLeftChild = false;
        }
    }


    assignParentToNode(node, parentOfNode)
    {
        if (!node)
        {
            throw new Error(`Unable to assign children to node which is ${node}`);
        }
        node.parentNode = parentOfNode;
    }


    reassignLevelInTreeToSwap(node, newLevelInTree)
    {
        node.levelInTree = newLevelInTree;
    }


    // Find nodes starting from last added node and up parent nodes which do not hold creteria of max (min) heap to build correct heap
    getNodesToBuildHeap(isMaxHeap)
    {
        let arrayOfNodesToBuildHeap = [];
        let currentNode = this.lastAddedNode;
        while (currentNode)
        {
            arrayOfNodesToBuildHeap.push(currentNode);
            if (isMaxHeap && currentNode.parentNode && currentNode.parentNode.value < currentNode.value)
            {
                currentNode = currentNode.parentNode;
            }
            else if (!isMaxHeap && currentNode.parentNode && currentNode.parentNode.value > currentNode.value)
            {
                currentNode = currentNode.parentNode;
            }
            else
            {
                break;
            }
        }
        if (arrayOfNodesToBuildHeap.length <= 1)
        {
            return [];
        }

        return arrayOfNodesToBuildHeap;
    }


    // Find free space: at the bottom level of the heap, at the leftmost open space
    findParentToInsertNodeInHeap()
    {
        let allNodesByLevels = this.getAllNodesByLevels();
        if (allNodesByLevels.length === 0)
        {
            return null;
        }
        if (allNodesByLevels.length === 1)
        {
            return allNodesByLevels[0][0];
        }
        let nodesOfLastLevel = allNodesByLevels[allNodesByLevels.length - 1];
        let lastNodeInLastLevel = nodesOfLastLevel[nodesOfLastLevel.length - 1];
        if (lastNodeInLastLevel.isLeftChild === true)
        {
            return lastNodeInLastLevel.parentNode;
        }
        else if (lastNodeInLastLevel.isLeftChild === false)
        {
            let nodesInParentLevel = allNodesByLevels[allNodesByLevels.length - 2];
            for (let i = 0; i < nodesInParentLevel.length; i++) // iterates through all nodes in level of lastNodeInLastLevel.parentNode
            {
                let currentNodeInParentLevel = nodesInParentLevel[i];
                if (Object.is(currentNodeInParentLevel, lastNodeInLastLevel.parentNode))
                {
                    if (i < nodesInParentLevel.length - 1) // return next node after lastNodeInLastLevel.parentNode
                    {
                        return nodesInParentLevel[i + 1];
                    }
                    return nodesOfLastLevel[0]; // or left child of the left node of the last level (case when all levels is fully filled)
                }
            }
        }
        else
        {
            throw new Error(`Node ${lastNodeInLastLevel.nodeId} has incorrect value isLeftChild = ${lastNodeInLastLevel.isLeftChild}`);
        }
    }


    findNode(valueToFind)
    {
        let allNodesByLevels = this.getAllNodesByLevels();
        if (allNodesByLevels.length === 0)
        {
            return null;
        }
        let foundNodes = allNodesByLevels.flat().filter(node => node.value === valueToFind);
        if (foundNodes.length === 1)
        {
            return foundNodes[0];
        }
        if (foundNodes.length === 0)
        {
            return null;
        }
        if (foundNodes.length > 1)
        {
            throw new Error(`Found ${foundNodes.length} nodes with value ${valueToFind}. Heap can not contain duplicates`);
        }
    }


    // find last node in the bottom level of Heap
    findLastNodeOfBottomLevel()
    {
        let allNodesByLevels = this.getAllNodesByLevels();
        if (allNodesByLevels.length === 0)
        {
            return null;
        }
        let nodesOfLastLevel = allNodesByLevels[allNodesByLevels.length - 1];
        return nodesOfLastLevel[nodesOfLastLevel.length - 1];
    }


    // Delete node applies only after swapping node to delete with the last bottom node (if swapping is needed). Node to delete (if it exists) will be at the place of the last bottom node (because nodeToDelete has already swapped with last bottom node)
    deleteNode(nodeToDelete)
    {
        if (!nodeToDelete)
        {
            throw new Error(`Node to delete is ${nodeToDelete}`);
        }
        let foundNode = this.findNode(nodeToDelete.value);
        if (foundNode === null)
        {
            return;
        }        
        let allNodesByLevels = this.getAllNodesByLevels();
        let nodesOfLastLevel = allNodesByLevels[allNodesByLevels.length - 1];
        if (nodesOfLastLevel.length === 1)
        {
            this.treeLevels -= 1;
        }
        this.currentAmountOfNodesInTree -= 1;
        let parentOfNodeToDelete = nodeToDelete.parentNode; // nullifying link with nodeToDelete
        if (nodeToDelete.isLeftChild === true)
        {
            parentOfNodeToDelete.leftChild = null;
        }
        else if (nodeToDelete.isLeftChild === false)
        {
            parentOfNodeToDelete.rightChild = null;
        }
        else // nodeToDelete is root
        {
            this.root = null;
        }
    }
}