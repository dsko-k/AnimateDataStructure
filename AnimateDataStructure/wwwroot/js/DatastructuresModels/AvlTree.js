import { BinarySearchTree } from './BinarySearchTree.js';
import { CreatorNodeAvlTree } from '../CreatorNodeDatastructures/CreatorNodeAvlTree.js';

export class AvlTree extends BinarySearchTree
{
    constructor()
    {
        super();
        this.creatorNode = new CreatorNodeAvlTree(this);
        this.balancedTimes = 0;
        this.nodeToCheckBalance = null;
        this.variantsOfRotation = {
            left: "Left",
            right: "Right",
            leftRight: "Left-Right",
            rightLeft: "Right-Left",
        };
        this.appliedTypeOfRotation = null;
    }


    computeBalanceFactor(node)
    {
        let rightSubtreeHeight = 0;
        let leftSubtreeHeight = 0;
        if (node.rightChild)
        {
            rightSubtreeHeight = this.getChildrenSubtree(node.rightChild).length + 1;
        }
        if (node.leftChild)
        {
            leftSubtreeHeight = this.getChildrenSubtree(node.leftChild).length + 1;
        }

        return rightSubtreeHeight - leftSubtreeHeight;
    }


    // For Balancing (recalculate balancing factor for every node of AvlTree)
    updateBalancingFactors()
    {
        let allNodesByLevels = this.getAllNodesByLevels();
        for (let currentLevel = 0; currentLevel < allNodesByLevels.length; currentLevel++)
        {
            for (let n = 0; n < allNodesByLevels[currentLevel].length; n++)
            {
                let currentNode = allNodesByLevels[currentLevel][n];
                let newBalanceFactor = this.computeBalanceFactor(currentNode);
                currentNode.balanceFactor = newBalanceFactor;
            }
        }
    }


    // For balancing (find all nodes with balance factor >= 2)
    getUnbalancedNodes()
    {
        let unbalancedNodes = [];
        let allNodesByLevels = this.getAllNodesByLevels();
        for (let currentLevel = 0; currentLevel < allNodesByLevels.length; currentLevel++)
        {
            for (let n = 0; n < allNodesByLevels[currentLevel].length; n++)
            {
                let currentNode = allNodesByLevels[currentLevel][n];
                let balanceFactor = currentNode.balanceFactor;
                if (balanceFactor >= 2 || balanceFactor <= -2)
                {
                    unbalancedNodes.push(currentNode);
                }
            }
        }

        return unbalancedNodes;
    }

    // For balancing (get unbalanced node up to the this after node addition)
    findUnbalancedNodeAfterAddition(nodeToCheck)
    {
        if (!nodeToCheck)
        {
            throw new Error(`${nodeToCheck}`);
        }
        let allNodesByLevels = this.getAllNodesByLevels();
        if (allNodesByLevels.length < 3)
        {
            return null;
        }
        let headUnbalancedNode = nodeToCheck.parentNode.parentNode;
        let midAfterUnbalancedNode = nodeToCheck.parentNode;
        let minUnbalancedNode = nodeToCheck;
        while (headUnbalancedNode && headUnbalancedNode.parentNode && Math.abs(headUnbalancedNode.balanceFactor) < 2)
        {
            minUnbalancedNode = midAfterUnbalancedNode;
            midAfterUnbalancedNode = headUnbalancedNode;
            headUnbalancedNode = headUnbalancedNode.parentNode;
        }
        if (!headUnbalancedNode || Math.abs(headUnbalancedNode.balanceFactor) < 2)
        {
            return null;
        }

        return {
            headUnbalancedNode: headUnbalancedNode,
            midAfterUnbalancedNode: midAfterUnbalancedNode,
            minUnbalancedNode: minUnbalancedNode
        }
    }


    // For balancing (get unbalanced node up to the this after node addition)
    findUnbalancedNodeAfterDeletion(nodeToCheck)
    {
        if (!nodeToCheck)
        {
            throw new Error(`${nodeToCheck}`);
        }
        let allNodesByLevels = this.getAllNodesByLevels();
        if (allNodesByLevels.length < 3)
        {
            return null;
        }
        let currentNodeToCheck = nodeToCheck;
        while (currentNodeToCheck.parentNode !== null && Math.abs(currentNodeToCheck.balanceFactor) < 2)
        {
            currentNodeToCheck = currentNodeToCheck.parentNode;
        }
        if (currentNodeToCheck.balanceFactor >= 2) // right subtree is deeper than left subtree
        {
            return {
                headUnbalancedNode: currentNodeToCheck,
                midAfterUnbalancedNode: currentNodeToCheck.rightChild,
                minUnbalancedNode: currentNodeToCheck.rightChild.leftChild ? currentNodeToCheck.rightChild.leftChild : currentNodeToCheck.rightChild.rightChild
            }
        }
        else if (currentNodeToCheck.balanceFactor <= -2) // left subtree is deeper than right subtree
        {
            return {
                headUnbalancedNode: currentNodeToCheck,
                midAfterUnbalancedNode: currentNodeToCheck.leftChild,
                minUnbalancedNode: currentNodeToCheck.leftChild.rightChild ? currentNodeToCheck.leftChild.rightChild : currentNodeToCheck.leftChild.leftChild
            }
        }
        else
        {
            return null;
        }
    }


    // For balancing (Update levelInTree for every node in this after rotation)
    updateNodesLevelInTree()
    {
        let allNodesByLevels = this.getAllNodesByLevels();
        for (let currentLevel = 0; currentLevel < allNodesByLevels.length; currentLevel++)
        {
            for (let n = 0; n < allNodesByLevels[currentLevel].length; n++)
            {
                let currentNode = allNodesByLevels[currentLevel][n];
                currentNode.levelInTree = currentLevel + 1;
            }
        }
    }


    // For balancing (choose type of rotation)
    balanceTree(unbalancedNodeHead, midNodeHead, lowestNodeHead) // unbalancedNodeHead - head (not value), midNodeHead - between head and lower
    {
        if (!midNodeHead.isLeftChild && midNodeHead.balanceFactor >= 0)
        {
            this.rotateLeft(unbalancedNodeHead, midNodeHead);
        }
        else if (midNodeHead.isLeftChild && midNodeHead.balanceFactor <= 0)
        {
            this.rotateRight(unbalancedNodeHead, midNodeHead);
        }
        else if (!midNodeHead.isLeftChild && midNodeHead.balanceFactor < 0)
        {
            this.rotateRightLeft(unbalancedNodeHead, midNodeHead, lowestNodeHead);
        }
        else if (midNodeHead.isLeftChild && midNodeHead.balanceFactor > 0)
        {
            this.rotateLeftRight(unbalancedNodeHead, midNodeHead, lowestNodeHead);
        }

        this.balancedTimes++;
        this.updateNodesLevelInTree(); // recalculate levelInTree for every node
        this.updateBalancingFactors(); // update balance factors after rotation
    }

    /*

     p
      \
       X
     /   \
    a     Y
         / \
        b   g

    */

    // For balancing (rotate to left)
    rotateLeft(nodeX, nodeY)
    {
        this.appliedTypeOfRotation = this.variantsOfRotation.left;        
        let parentOfNodeX = nodeX.parentNode;
        let leftChildNodeY = nodeY.leftChild;

        if (!parentOfNodeX)
        {
            this.root = nodeY;
            nodeY.parentNode = parentOfNodeX;
            nodeY.isLeftChild = null;
            this.attachToNodeNewChild(this.root, nodeX, true);
            this.attachToNodeNewChild(nodeX, leftChildNodeY, false);

            return;
        }
        this.attachToNodeNewChild(nodeX, leftChildNodeY, false);
        // y has only gamma
        nodeY.leftChild = null;
        nodeY.parentNode = null;
        // parent p to y
        nodeY.parentNode = parentOfNodeX;

        if (nodeX.isLeftChild !== null)
        {
            nodeX.parentNode = null;
            nodeX.isLeftChild ? parentOfNodeX.leftChild = nodeY : parentOfNodeX.rightChild = nodeY;
            nodeY.isLeftChild = nodeX.isLeftChild;
        }
        this.attachToNodeNewChild(nodeY, nodeX, true);
    }


    // For balancing (rotate to right)
    rotateRight(nodeX, nodeY)
    {
        this.appliedTypeOfRotation = this.variantsOfRotation.right;
        let parentOfNodeX = nodeX.parentNode;
        let rightChildNodeY = nodeY.rightChild;
        if (!parentOfNodeX)
        {
            this.root = nodeY;
            nodeY.parentNode = parentOfNodeX;
            nodeY.isLeftChild = null;
            this.attachToNodeNewChild(this.root, nodeX, false);
            this.attachToNodeNewChild(nodeX, rightChildNodeY, true);

            return;
        }
        this.attachToNodeNewChild(nodeX, rightChildNodeY, true);
        nodeY.rightChild = null;
        nodeY.parentNode = null;
        nodeY.parentNode = parentOfNodeX;
        if (nodeX.isLeftChild !== null)
        {
            nodeX.parentNode = null;
            nodeX.isLeftChild ? parentOfNodeX.leftChild = nodeY : parentOfNodeX.rightChild = nodeY;
            nodeY.isLeftChild = nodeX.isLeftChild;
        }
        this.attachToNodeNewChild(nodeY, nodeX, false);
    }


    // For balancing (rotate to right-left)
    rotateRightLeft(unbalancedNodeHead, midNodeHead, lowestNodeHead)
    {
        this.appliedTypeOfRotation = this.variantsOfRotation.rightLeft;
        let parentHeadNode = unbalancedNodeHead.parentNode;
        let leftChildMinimalNode = lowestNodeHead.leftChild;
        let rightChildMinimalNode = lowestNodeHead.rightChild;
        let isLeftChildHeadNode = unbalancedNodeHead.isLeftChild;
        lowestNodeHead.parentNode = parentHeadNode;
        lowestNodeHead.isLeftChild = isLeftChildHeadNode;
        unbalancedNodeHead.parentNode = null;
        unbalancedNodeHead.rightChild = null;

        if (!parentHeadNode)
        {
            this.root = lowestNodeHead;
            this.attachToNodeNewChild(this.root, midNodeHead, false);
            this.attachToNodeNewChild(this.root, unbalancedNodeHead, true);
        }
        else
        {
            isLeftChildHeadNode ? parentHeadNode.leftChild = lowestNodeHead : parentHeadNode.rightChild = lowestNodeHead;
        }
        this.attachToNodeNewChild(lowestNodeHead, midNodeHead, false);
        this.attachToNodeNewChild(midNodeHead, rightChildMinimalNode, true);
        this.attachToNodeNewChild(lowestNodeHead, unbalancedNodeHead, true);
        this.attachToNodeNewChild(unbalancedNodeHead, leftChildMinimalNode, false);
    }


    // For balancing (rotate to left-right)
    rotateLeftRight(unbalancedNodeHead, midNodeHead, lowestNodeHead)
    {
        this.appliedTypeOfRotation = this.variantsOfRotation.leftRight;
        let parentHeadNode = unbalancedNodeHead.parentNode;
        let leftChildMinimalNode = lowestNodeHead.leftChild;
        let rightChildMinimalNode = lowestNodeHead.rightChild;
        let isLeftChildHeadNode = unbalancedNodeHead.isLeftChild;
        lowestNodeHead.parentNode = parentHeadNode;
        lowestNodeHead.isLeftChild = isLeftChildHeadNode;
        unbalancedNodeHead.parentNode = null;
        unbalancedNodeHead.leftChild = null;

        if (!parentHeadNode)
        {
            this.root = lowestNodeHead;
            this.attachToNodeNewChild(this.root, midNodeHead, true);
            this.attachToNodeNewChild(this.root, unbalancedNodeHead, false);
        }
        else
        {
            isLeftChildHeadNode ? parentHeadNode.leftChild = lowestNodeHead : parentHeadNode.rightChild = lowestNodeHead;
        }
        this.attachToNodeNewChild(lowestNodeHead, midNodeHead, true);
        this.attachToNodeNewChild(midNodeHead, leftChildMinimalNode, false);
        this.attachToNodeNewChild(lowestNodeHead, unbalancedNodeHead, false);
        this.attachToNodeNewChild(unbalancedNodeHead, rightChildMinimalNode, true);
    }


    attachToNodeNewChild(node, newChild, isNewChildLeft)
    {
        if (isNewChildLeft === null || isNewChildLeft === undefined)
        {
            throw new Error(`Incorrect isNewChildLeft = ${isNewChildLeft}`);
        }
        isNewChildLeft ? node.leftChild = newChild : node.rightChild = newChild;
        if (newChild)
        {
            newChild.parentNode = node;
            newChild.isLeftChild = isNewChildLeft;
        }
    }


    findUnbalancedHeadMidLowestNodes() // return object {} with nodes: head, mid, lowest
    {
        let unbalancedNodes;
        let nodeToCheck = this.nodeToCheckBalance.nodeToCheck;
        if (this.nodeToCheckBalance.isAddition)
        {
            unbalancedNodes = this.findUnbalancedNodeAfterAddition(nodeToCheck);
        }
        else
        {
            unbalancedNodes = this.findUnbalancedNodeAfterDeletion(nodeToCheck);
        }

        return unbalancedNodes;
    }
}
