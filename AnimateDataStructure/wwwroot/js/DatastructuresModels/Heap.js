import { AbstractTree } from './AbstractTree.js';
import { CreatorNodeHeap } from '../CreatorNodeDatastructures/CreatorNodeHeap.js';
import { Coordinates } from '../CoordinatesModel/Coordinates.js';

export class Heap extends AbstractTree
{
    constructor(isMaxHeap)
    {
        super();
        this.isMaxHeap = isMaxHeap;
        this.creatorNode = new CreatorNodeHeap(this, this.isMaxHeap); // CHECK DATA STRUCTURE after new ... !!!!!!!
        this.lastSwappedNode = null;
        this.swappedTimes = 0; // ????????????????????????
        this.nodeToCheckHeapify = null; // ????????????????????????
    }


    // Heap
    // similar to method insert(valueToAdd) for class BinarySearchTree
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
        else // ==== if (!parentOfAddingNode.rightChild)
        {
            nodeToAdd.isLeftChild = false;
            parentOfAddingNode.rightChild = nodeToAdd;
        }


        //if (parentOfAddingNode.leftChild && parentOfAddingNode.rightChild)
        //{
        //    nodeToAdd.isLeftChild = true;
        //    parentOfAddingNode.rightChild = nodeToAdd;
        //}

        nodeToAdd.parentNode = parentOfAddingNode;
    }


    // Heap
    swapNodes(firstNodeToSwap, secondNodeToSwap)
    {
        let coordinates = new Coordinates(this);

        // ????
        let allNodesByLevels = this.getAllNodesByLevels();


        coordinates.updateHeapCoordinatesAfterSwapTwoNode(allNodesByLevels, firstNodeToSwap, secondNodeToSwap);

        this.reassignNodesToSwap(firstNodeToSwap, secondNodeToSwap);

        this.swappedTimes++; // ????????????????????????
    }


    // CONSIDER REPLASING METHODS INTO CLASS of Node...

    // Heap
    // private
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


            secondNodeToSwap.parentNode = parentFirstNodeToSwap; // !!!!
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
            //firstNodeToSwap.parentNode = null;
            //firstNodeToSwap.leftChild = null;
            //firstNodeToSwap.rightChild = null;

            this.assignChildrenToNode(firstNodeToSwap, null, null);
            firstNodeToSwap.parentNode = null;


            //secondNodeToSwap.parentNode = null;
            //secondNodeToSwap.leftChild = null;
            //secondNodeToSwap.rightChild = null;

            this.assignChildrenToNode(secondNodeToSwap, null, null);
            secondNodeToSwap.parentNode = null;


            //secondNodeToSwap.parentNode = firstNodeToSwap;
            //secondNodeToSwap.leftChild = leftChildFirstNodeToSwap;
            //secondNodeToSwap.rightChild = rightChildFirstNodeToSwap;
            this.assignChildrenToNode(secondNodeToSwap, leftChildFirstNodeToSwap, rightChildFirstNodeToSwap);
            secondNodeToSwap.parentNode = firstNodeToSwap;


            //if (leftChildFirstNodeToSwap)
            //{
            //    leftChildFirstNodeToSwap.parentNode = secondNodeToSwap;
            //}

            //if (rightChildFirstNodeToSwap)
            //{
            //    rightChildFirstNodeToSwap.parentNode = secondNodeToSwap;
            //}



            if (isLeftChildFirstNodeToSwap === false)
            {
                secondNodeToSwap.isLeftChild = false;
                //firstNodeToSwap.rightChild = secondNodeToSwap;
                //firstNodeToSwap.leftChild = leftChildSecondNodeToSwap;

                //if (leftChildSecondNodeToSwap)
                //{
                //    leftChildSecondNodeToSwap.parentNode = firstNodeToSwap;
                //}

                this.assignChildrenToNode(firstNodeToSwap, leftChildSecondNodeToSwap, secondNodeToSwap);
            }

            if (isLeftChildFirstNodeToSwap === true)
            {
                secondNodeToSwap.isLeftChild = true;
                //firstNodeToSwap.leftChild = secondNodeToSwap;
                //firstNodeToSwap.rightChild = rightChildSecondNodeToSwap;


                //if (rightChildSecondNodeToSwap)
                //{
                //    rightChildSecondNodeToSwap.parentNode = firstNodeToSwap;
                //}

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


    // Heap
    // private
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


    // Heap
    // private
    assignParentToNode(node, parentOfNode)
    {
        if (!node)
        {
            throw new Error(`Unable to assign children to node which is ${node}`);
        }

        node.parentNode = parentOfNode;
    }



    // Heap
    // private
    // INCORRECT
    reassignChildToSwap(nodeToAttachNewChild, newChild, isNewChildIsLeftChildOfNode)
    {
        if (nodeToAttachNewChild === null && newChild === null)
        {
            return;
        }

        if (isNewChildIsLeftChildOfNode === true)
        {
            nodeToAttachNewChild.leftChild = newChild;
        }
        if (isNewChildIsLeftChildOfNode === false)
        {
            nodeToAttachNewChild.rightChild = newChild;
        }

        if (newChild !== null) // ????
        {
            newChild.parentNode = nodeToAttachNewChild;
        }
    }


    // Heap
    // private
    // INCORRECT
    reassignParentToSwap(parentOfNewNode, newNode, isLeftChildNewNode)
    {
        if (isLeftChildNewNode)
        {
            parentOfNewNode.leftChild = newNode;
        }

        if (isLeftChildNewNode === false)
        {
            parentOfNewNode.rightChild = newNode;
        }

        if (newNode !== null)
        {
            newNode.parentNode = parentOfNewNode;
            newNode.isLeftChild = isLeftChildNewNode;
        }
    }


    // Heap
    // private
    reassignLevelInTreeToSwap(node, newLevelInTree)
    {
        node.levelInTree = newLevelInTree;
    }


    // Heap
    // private
    // Find nodes starting from last added node and up parent nodes which do not hold creteria of max (min) heap to build correct heap
    getNodesToBuildHeap(isMaxHeap)
    {
        // max-heap: the parent key is greater than or equal to the child keys
        // min-heap: the parent key is less than or equal to the child keys

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


    // Heap
    findParentToInsertNodeInHeap()
    {
        // find free space: at the bottom level of the heap, at the leftmost open space

        // nodes added in Heap in the free space of the last level. If it fully filled, then to the left of new level

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
            // iterates through all nodes in level of lastNodeInLastLevel.parentNode

            let nodesInParentLevel = allNodesByLevels[allNodesByLevels.length - 2];

            for (let i = 0; i < nodesInParentLevel.length; i++)
            {
                let currentNodeInParentLevel = nodesInParentLevel[i];

                if (Object.is(currentNodeInParentLevel, lastNodeInLastLevel.parentNode))
                {
                    // return next node after lastNodeInLastLevel.parentNode
                    if (i < nodesInParentLevel.length - 1)
                    {
                        return nodesInParentLevel[i + 1];
                    }

                    // or left child of the left node of the last level (case when all levels is fully filled)
                    return nodesOfLastLevel[0];
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


    // Delete node applies only after swapping node to delete with the last bottom node (if swapping is needed)
    // Node to delete (if it exists) will be at the place of the last bottom node (because nodeToDelete has already swapped with last bottom node)
    deleteNode(nodeToDelete)
    {
        if (!nodeToDelete)
        {
            throw new Error(`Node to delete is ${nodeToDelete}`);
        }

        let foundNode = this.findNode(nodeToDelete.value);

        // Find nodeToDelete in Heap
        if (foundNode === null)
        {
            return;
        }

        // decrease levels of nodes if nodeToDelete is in the botom level of the heap
        let allNodesByLevels = this.getAllNodesByLevels();

        let nodesOfLastLevel = allNodesByLevels[allNodesByLevels.length - 1];

        if (nodesOfLastLevel.length === 1)
        {
            this.treeLevels -= 1;
        }

        this.currentAmountOfNodesInTree -= 1;

        // nullifying link with nodeToDelete

        let parentOfNodeToDelete = nodeToDelete.parentNode;

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



        //// case when nodeToDelete is in the botom level of the heap
        //if (nodeToDelete.levelInTree === this.treeLevels)
        //{

        //}
        //else // case when nodeToDelete is not in the botom level of the heap
        //{

        //}


    }

}