import { TreeViewState } from './TreeViewState.js';
import { Coordinates } from '../CoordinatesModel/Coordinates.js';

export class AbstractTree
{
    constructor()
    {
        this.creatorNode = null;
        this.root = null;
        this.treeLevelsBeforeNodeOperation = 0;
        this.treeLevels = 0;
        this.currentAmountOfNodesInTree = 0;
        this.totalAddedNodes = 0; // nodes that was added in tree (if node deleted, then counter still unchanged)
        this.lastAddedNode = null;
        this.lastDeletedNode = null;
        this.alignedTimes = 0;
        this.treeViewState = new TreeViewState();
        this.isNeedAlignmentByWidth = false;        
        this.isLinkContainerShown = true;
        this.listOfCurrentNodesInTree = [];
    }


    findNode(valueToFind)
    {
        let currentNode = this.root;
        while (currentNode && currentNode.value !== valueToFind)
        {
            if (valueToFind > currentNode.value)
            {
                currentNode = currentNode.rightChild;
            }
            else
            {
                currentNode = currentNode.leftChild;
            }
        }

        return currentNode;
    }


    findNodeOrLastNodeSubtree(valueToFind)
    {
        let currentNode = this.root;
        while (currentNode && currentNode.value !== valueToFind)
        {
            if (valueToFind > currentNode.value)
            {
                if (!currentNode.rightChild)
                {
                    break;
                }
                else
                {
                    currentNode = currentNode.rightChild;
                }
            }
            else
            {
                if (!currentNode.leftChild)
                {
                    break;
                }
                else
                {
                    currentNode = currentNode.leftChild;
                }
            }
        }

        return currentNode;
    }


    findSuccessorOf(nodeToDelete)
    {
        if (nodeToDelete.leftChild && !nodeToDelete.rightChild) // if only leftChild
        {
            return nodeToDelete.leftChild;
        }
        if (!nodeToDelete.leftChild && nodeToDelete.rightChild) // if only rightChild
        {
            return nodeToDelete.rightChild;
        }
        if (!nodeToDelete.leftChild && !nodeToDelete.rightChild) // if has no child
        {
            return null;
        }
        // if nodeToDelete has leftChild and rightChild
        let currentNode = nodeToDelete.rightChild;
        while (currentNode.leftChild)
        {
            currentNode = currentNode.leftChild;
        }

        return currentNode;
    }


    deleteNode(nodeToDelete)
    {
        if (!nodeToDelete)
        {
            throw new Error(`Unable to delete node: it is null or undefined`);
        }

        this.updateTreeCoordinatesBeforeDeletionNode();
        this.lastDeletedNode = nodeToDelete;
        this.treeLevelsBeforeNodeOperation = this.treeLevels;
                
        if (nodeToDelete.leftChild && nodeToDelete.rightChild) // nodeToDelete has both child
        {
            this.deleteNodeWithTwoChildren(nodeToDelete);
        }
        // nodeToDelete has 1 child
        else if (nodeToDelete.leftChild && !nodeToDelete.rightChild || !nodeToDelete.leftChild && nodeToDelete.rightChild)
        {
            this.deleteNodeWithOneChildren(nodeToDelete);
        }
        // nodeToDelete has no child
        else
        {
            this.deleteNodeWithNoChildren(nodeToDelete);
        }

        this.treeLevels = this.getAllNodesByLevels().length;
        this.currentAmountOfNodesInTree--;
        this.setCounterNodeAligned(); // increase counter of tree alignment
    }


    deleteNodeWithTwoChildren(nodeToDelete)
    {
        if (!nodeToDelete.leftChild || !nodeToDelete.rightChild)
        {
            throw new Error(`Incorrect method to delete node with Id = ${nodeToDelete.nodeId}`);
        }

        let parentOfNodeToDelete = nodeToDelete.parentNode;
        let leftChildOfNodeToDelete = nodeToDelete.leftChild;
        let rightChildOfNodeToDelete = nodeToDelete.rightChild;
        let successorNode = this.findSuccessorOf(nodeToDelete);
        let successorNodeOrderNumber = successorNode.orderNumber;
        let successorNodeId = successorNode.nodeId;
        let successorNodeAppliedNodeStyles = successorNode.appliedNodeStyles;
        let parentOfSuccessorNode = successorNode.parentNode;
        let rightChildOfSuccessorNode = successorNode.rightChild;

        if (successorNode)
        {
            this.initializeSubtreeRelocation(successorNode);
            this.initializeNodeRelocation(successorNode, nodeToDelete.xCoordinate, nodeToDelete.yCoordinate, nodeToDelete.levelInTree);
        }
        // attach right child of successor node to parent of successor node
        successorNode.isLeftChild ? parentOfSuccessorNode.leftChild = rightChildOfSuccessorNode : parentOfSuccessorNode.rightChild = rightChildOfSuccessorNode;

        if (rightChildOfSuccessorNode && !Object.is(parentOfSuccessorNode, nodeToDelete))
        {
            rightChildOfSuccessorNode.isLeftChild = successorNode.isLeftChild;
            rightChildOfSuccessorNode.parentNode = parentOfSuccessorNode;
        }

        // attach successor and new parent instead removed node
        if (nodeToDelete.isLeftChild === null)
        {
            this.root = successorNode;
        }
        if (nodeToDelete.isLeftChild === true)
        {
            parentOfNodeToDelete.leftChild = successorNode;
        }
        else if (nodeToDelete.isLeftChild === false)
        {
            parentOfNodeToDelete.rightChild = successorNode;
        }

        successorNode.parentNode = parentOfNodeToDelete;
        successorNode.isLeftChild = nodeToDelete.isLeftChild;
        successorNode.orderNumber = successorNodeOrderNumber;
        successorNode.nodeId = successorNodeId;
        successorNode.appliedNodeStyles = successorNodeAppliedNodeStyles;

        // attach children of removed node as children of successor
        if (!Object.is(successorNode, leftChildOfNodeToDelete))
        {
            successorNode.leftChild = leftChildOfNodeToDelete;
            leftChildOfNodeToDelete.parentNode = successorNode;
        }
        if (!Object.is(successorNode, rightChildOfNodeToDelete))
        {
            successorNode.rightChild = rightChildOfNodeToDelete;
            rightChildOfNodeToDelete.parentNode = successorNode;
        }
    }


    deleteNodeWithOneChildren(nodeToDelete)
    {
        if (nodeToDelete.leftChild && nodeToDelete.rightChild || !nodeToDelete.leftChild && !nodeToDelete.rightChild)
        {
            throw new Error(`Incorrect method to delete node with Id = ${nodeToDelete.nodeId}`);
        }

        let parentOfNodeToDelete = nodeToDelete.parentNode;
        let successorNode = this.findSuccessorOf(nodeToDelete);
        //info about successorNode to avoid it altering during assignment
        let successorNodeOrderNumber = successorNode.orderNumber;
        let successorNodeId = successorNode.nodeId;
        let successorNodeAppliedNodeStyles = successorNode.appliedNodeStyles;
        let parentOfSuccessorNode = successorNode.parentNode;

        if (successorNode)
        {
            let xCoordinateShift = nodeToDelete.xCoordinate - successorNode.xCoordinate;
            let yCoordinateShift = nodeToDelete.yCoordinate - successorNode.yCoordinate;
            this.initializeSubtreeRelocationByShift(successorNode, xCoordinateShift, yCoordinateShift)
            this.initializeNodeRelocation(successorNode, nodeToDelete.xCoordinate, nodeToDelete.yCoordinate, nodeToDelete.levelInTree);
        }
        // attach successor and new parent instead removed node
        if (nodeToDelete.isLeftChild === null)
        {
            this.root = successorNode;
        }
        if (nodeToDelete.isLeftChild === true)
        {
            parentOfNodeToDelete.leftChild = successorNode;
        }
        else if (nodeToDelete.isLeftChild === false)
        {
            parentOfNodeToDelete.rightChild = successorNode;
        }
        successorNode.parentNode = parentOfNodeToDelete;
        successorNode.isLeftChild = nodeToDelete.isLeftChild;
        // assign info about successorNode
        successorNode.orderNumber = successorNodeOrderNumber;
        successorNode.nodeId = successorNodeId;
        successorNode.appliedNodeStyles = successorNodeAppliedNodeStyles;
    }


    deleteNodeWithNoChildren(nodeToDelete)
    {
        if (nodeToDelete.leftChild || nodeToDelete.rightChild)
        {
            throw new Error(`Incorrect method to delete node with Id = ${nodeToDelete.nodeId}`);
        }
        let parentOfNodeToDelete = nodeToDelete.parentNode;
        if (parentOfNodeToDelete)
        {
            nodeToDelete.isLeftChild ? parentOfNodeToDelete.leftChild = null : parentOfNodeToDelete.rightChild = null;
        }
        else
        {
            this.root = null;
        }
    }


    initializeNodeRelocation(nodeToRelocate, xCoordinateAfterRelocation, yCoordinateAfterRelocation, levelInTree)
    {
        let coordinates = new Coordinates();
        coordinates.setCoordinatesRelocation(nodeToRelocate, xCoordinateAfterRelocation, yCoordinateAfterRelocation);
        nodeToRelocate.levelInTree = levelInTree;
    }


    initializeSubtreeRelocation(subtreeNode)
    {
        let allChildrenSubtreeNodes = this.getChildrenSubtree(subtreeNode);

        if (allChildrenSubtreeNodes.length == 0)
        {
            return;
        }
        let xCoordinateShift = subtreeNode.xCoordinate - allChildrenSubtreeNodes[0][0].xCoordinate;
        let yCoordinateShift = subtreeNode.yCoordinate - allChildrenSubtreeNodes[0][0].yCoordinate;
        allChildrenSubtreeNodes.forEach(nodesInLevel =>
        {
            nodesInLevel.forEach(nodeInSubtree =>
            {
                this.initializeNodeRelocation(nodeInSubtree,
                    nodeInSubtree.xCoordinate + xCoordinateShift,
                    nodeInSubtree.yCoordinate + yCoordinateShift,
                    nodeInSubtree.levelInTree - 1);
            });
        });
    }


    // For case, when deleted node with one child
    initializeSubtreeRelocationByShift(subtreeNode, xCoordinateShift, yCoordinateShift)
    {
        let allChildrenSubtreeNodes = this.getChildrenSubtree(subtreeNode);
        if (allChildrenSubtreeNodes.length == 0)
        {
            return;
        }
        allChildrenSubtreeNodes.forEach(nodesInLevel =>
        {
            nodesInLevel.forEach(nodeInSubtree =>
            {
                this.initializeNodeRelocation(nodeInSubtree,
                    nodeInSubtree.xCoordinate + xCoordinateShift,
                    nodeInSubtree.yCoordinate + yCoordinateShift,
                    nodeInSubtree.levelInTree - 1);
            });
        });
    }


    updateTreeCoordinatesBeforeDeletionNode()
    {
        let allNodesByLevels = this.getAllNodesByLevels();
        for (let currentLevel = 0; currentLevel < allNodesByLevels.length; currentLevel++)
        {
            for (let n = 0; n < allNodesByLevels[currentLevel].length; n++)
            {
                let currentNode = allNodesByLevels[currentLevel][n];
                currentNode.xCoordinatePrevious = currentNode.xCoordinate;
                currentNode.yCoordinatePrevious = currentNode.yCoordinate;
            }
        }
    }


    getAllParrentsFromNodeToRoot(node)
    {
        let parents = [];
        let currentParent = null;
        while (node != null)
        {
            currentParent = node.parentNode;
            if (currentParent != null)
            {
                parents.push(currentParent);
            }
            node = node.parentNode;
        }
        return parents;
    }


    getAllParentsFromRootToNode(node)
    {
        let parentsFromNodeToRoot = this.getAllParrentsFromNodeToRoot(node);
        return parentsFromNodeToRoot.reverse();
    }


    getChildrenFromTo(startingNodeAncestor, endingNodeChild)
    {
        let allChildrenFromTo = [];
        let currentNode = endingNodeChild;
        while (!Object.is(currentNode, startingNodeAncestor))
        {
            allChildrenFromTo.push(currentNode);
            currentNode = currentNode.parentNode;
        }
        allChildrenFromTo.push(startingNodeAncestor);
        allChildrenFromTo.pop();
        return allChildrenFromTo.reverse();
    }


    getAllSuccessors(node)
    {
        let stack = [];
        let childStack = [];
        let allSuccessors = [];
        if (node.leftChild || node.rightChild)
        {
            stack.push(node);
        }
        while (stack.length > 0)
        {
            childStack.length = 0;
            let levelNodes = [];
            for (var elemStack of stack)
            {
                if (elemStack.leftChild != null)
                {
                    childStack.push(elemStack.leftChild);
                    levelNodes.push(elemStack.leftChild);
                }
                if (elemStack.rightChild != null)
                {
                    childStack.push(elemStack.rightChild);
                    levelNodes.push(elemStack.rightChild);
                }
            }

            if (levelNodes.length != 0)
            {
                levelNodes.forEach(levelNode => allSuccessors.push(levelNode));
            }
            stack.length = 0;
            for (var elemChildStack of childStack)
            {
                stack.push(elemChildStack);
            }
        }
        return allSuccessors;
    }


    getAllNodesByLevels()
    {
        let stack = [];
        let childStack = [];
        let allNodesByLevels = [];
        let levelNodes = [];
        if (this.root != null)
        {
            stack.push(this.root);
            levelNodes.push(this.root);
            allNodesByLevels.push(levelNodes);
        }
        while (stack.length > 0)
        {
            childStack.length = 0;
            let levelNodes = [];
            for (var elemStack of stack)
            {
                if (elemStack.leftChild != null)
                {
                    childStack.push(elemStack.leftChild);
                    levelNodes.push(elemStack.leftChild);
                }
                if (elemStack.rightChild != null)
                {
                    childStack.push(elemStack.rightChild);
                    levelNodes.push(elemStack.rightChild);
                }
            }

            if (levelNodes.length != 0)
            {
                allNodesByLevels.push(levelNodes);
            }
            stack.length = 0;
            for (var elemChildStack of childStack)
            {
                stack.push(elemChildStack);
            }
        }

        return allNodesByLevels;
    }


    // Find all children in subtree, started from node
    getChildrenSubtree(subtreeNode)
    {
        let stack = [];
        let childStack = [];
        let allNodesByLevels = [];
        let levelNodes = [];
        if (subtreeNode)
        {
            stack.push(subtreeNode);
            levelNodes.push(subtreeNode);
        }
        while (stack.length > 0)
        {
            childStack.length = 0;
            let levelNodes = [];
            for (var elemStack of stack)
            {
                if (elemStack.leftChild)
                {
                    childStack.push(elemStack.leftChild);
                    levelNodes.push(elemStack.leftChild);
                }
                if (elemStack.rightChild)
                {
                    childStack.push(elemStack.rightChild);
                    levelNodes.push(elemStack.rightChild);
                }
            }

            if (levelNodes.length != 0)
            {
                allNodesByLevels.push(levelNodes);
            }
            stack.length = 0;
            for (var elemChildStack of childStack)
            {
                stack.push(elemChildStack);
            }
        }
        return allNodesByLevels;
    }


    // Find the node, that is the most left relative to relativeNode in tree (if relativeNode is this.root, than the method find minimum node in tree and the outer left node)
    getOutermostLeftNode(relativeNode)
    {
        if (!relativeNode)
        {
            new Error(`Relative node to find outermost left node is ${relativeNode}`);
        }
        let currentLeftNode = relativeNode;
        while (currentLeftNode.leftChild)
        {
            currentLeftNode = currentLeftNode.leftChild;
        }
        return currentLeftNode;
    }


    setCounterNodeAligned()
    {
        this.alignedTimes++;
    }


    // Represent tree as array of numbers from top level of tree to the bottom level (BFS)
    getDataStructureNodesAsString()
    {
        let allNodesByLevels = this.getAllNodesByLevels();
        let flattenNodeValues = allNodesByLevels.flat().map(node => node.value);
        return flattenNodeValues.join(','); // converts array [1, 2, 3, 4, 5, 6, 7, 8] into string "1,2,3,4,5,6,7,8"
    }
}