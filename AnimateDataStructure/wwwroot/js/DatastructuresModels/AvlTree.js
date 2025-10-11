import { BinarySearchTree } from './BinarySearchTree.js';
import { CreatorNodeAvlTree } from '../CreatorNodeDatastructures/CreatorNodeAvlTree.js';


export class AvlTree extends BinarySearchTree
{
    constructor()
    {
        super(); // !!!!!!!!!!!!!
        this.creatorNode = new CreatorNodeAvlTree(this); // CHECK DATA STRUCTURE after new ... !!!!!!!

        //this.root = null;
        //this.treeLevelsBeforeNodeOperation = 0; // +++
        //this.treeLevels = 0;
        //this.currentAmountOfNodesInTree = 0; // +++
        //this.totalAddedNodes = 0; // counter of nodes, that was added in this (if node deleted, then counter still unchanged). counter is never decreased
        //this.lastAddedNode = null;
        //this.lastDeletedNode = null;
        //this.isTreeToBeAlignedByWidth = false; // for BinarySearchTree: Have to be aligned by width after addition or deletion node. For AVL this also takes into account previous balancing
        //this.alignedTimes = 0; // how many times node was alligned
        //this.treeViewState = new TreeViewState();
        //this.creatorNode = new CreatorNodeBinarySearchTree(this); // CHECK DATA STRUCTURE after new ... !!!!!!!

        // for balancing
        this.balancedTimes = 0; // how many times node was balanced  // for balancing
        // for balancing
        this.nodeToCheckBalance = null; // {nodeToCheck: someNode, isAddition: true/false } nodeToCheck - added node or parent of successor node (after deletion), isAddition - node to check after addition or after deletion

        this.variantsOfRotation = {

            left: "Left",
            right: "Right",
            leftRight: "Left-Right",
            rightLeft: "Right-Left",
        };

        this.appliedTypeOfRotation = null;

        // for balancing
        // in base AbstractTree
        //this.isLinkContainerShown = true; // set true in onAnimationEndBalancingUnfadeLinkContainer(..).   set false in onAnimationEndFadeLinkContainer(...)

        // heap
        //this.isMaxHeap = true; // TO DO: create as argument of constructor in class Heap. This class should be derived from class BinarySearchTree
    }




    // For Balancing

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


    // For Balancing (recalculate balancing factor for every node of AvlTree) INEFFICIENT!!!!!!!!
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


        this.balancedTimes++; // Increase balancing counter

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
        //// https://www.programiz.com/dsa/avl-this

        this.appliedTypeOfRotation = this.variantsOfRotation.left;


        //// to store initial states of nodes before rotation
        let parentOfNodeX = nodeX.parentNode;
        let leftChildNodeY = nodeY.leftChild;

        if (!parentOfNodeX)
        {
            this.root = nodeY;
            nodeY.parentNode = parentOfNodeX;
            nodeY.isLeftChild = null;

            //this.root.leftChild = nodeX;
            //nodeX.parentNode = this.root;
            //nodeX.isLeftChild = true;

            this.attachToNodeNewChild(this.root, nodeX, true);

            //nodeX.rightChild = leftChildNodeY;

            //if (leftChildNodeY)
            //{
            //    leftChildNodeY.isLeftChild = false;
            //    leftChildNodeY.parentNode = nodeX;
            //}

            this.attachToNodeNewChild(nodeX, leftChildNodeY, false);

            return;
        }

        // beta to x

        //nodeX.rightChild = leftChildNodeY;

        //if (leftChildNodeY)
        //{
        //    leftChildNodeY.isLeftChild = false;
        //    leftChildNodeY.parentNode = nodeX;
        //}

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


        // left child of y is x

        //nodeY.leftChild = nodeX;
        //nodeX.parentNode = nodeY;
        //nodeX.isLeftChild = true;
        this.attachToNodeNewChild(nodeY, nodeX, true);
    }


    // For balancing (rotate to right)
    rotateRight(nodeX, nodeY)
    {
        this.appliedTypeOfRotation = this.variantsOfRotation.right;

        // https://www.programiz.com/dsa/avl-this

        let parentOfNodeX = nodeX.parentNode;
        let rightChildNodeY = nodeY.rightChild;

        if (!parentOfNodeX)
        {
            this.root = nodeY;
            nodeY.parentNode = parentOfNodeX;
            nodeY.isLeftChild = null;

            //this.root.rightChild = nodeX;
            //nodeX.parentNode = this.root;
            //nodeX.isLeftChild = false;

            this.attachToNodeNewChild(this.root, nodeX, false);

            //nodeX.leftChild = rightChildNodeY;

            //if (rightChildNodeY)
            //{
            //    rightChildNodeY.parentNode = nodeX;
            //    rightChildNodeY.isLeftChild = true;
            //}

            this.attachToNodeNewChild(nodeX, rightChildNodeY, true);

            return;
        }

        // gamma to x

        //nodeX.leftChild = rightChildNodeY;

        //if (rightChildNodeY)
        //{
        //    rightChildNodeY.parentNode = nodeX;
        //    rightChildNodeY.isLeftChild = true;
        //}

        this.attachToNodeNewChild(nodeX, rightChildNodeY, true);

        // y has only beta

        nodeY.rightChild = null;
        nodeY.parentNode = null;

        // parent p to y

        nodeY.parentNode = parentOfNodeX;

        if (nodeX.isLeftChild !== null)
        {
            nodeX.parentNode = null;
            nodeX.isLeftChild ? parentOfNodeX.leftChild = nodeY : parentOfNodeX.rightChild = nodeY;
            nodeY.isLeftChild = nodeX.isLeftChild;
        }

        // right child of y is x

        //nodeY.rightChild = nodeX;
        //nodeX.parentNode = nodeY;
        //nodeX.isLeftChild = false;

        this.attachToNodeNewChild(nodeY, nodeX, false);
    }


    // For balancing (rotate to right-left)
    rotateRightLeft(unbalancedNodeHead, midNodeHead, lowestNodeHead)
    {
        this.appliedTypeOfRotation = this.variantsOfRotation.rightLeft;

        // https://www.programiz.com/dsa/avl-this

        // ?????????????????????
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

            //this.root.leftChild = midNodeHead;
            //midNodeHead.parentNode = this.root;

            this.attachToNodeNewChild(this.root, midNodeHead, false);


            //this.root.rightChild = unbalancedNodeHead;
            //unbalancedNodeHead.parentNode = this.root;

            this.attachToNodeNewChild(this.root, unbalancedNodeHead, true);
        }
        else
        {
            isLeftChildHeadNode ? parentHeadNode.leftChild = lowestNodeHead : parentHeadNode.rightChild = lowestNodeHead;
        }

        //lowestNodeHead.leftChild = midNodeHead;
        //midNodeHead.parentNode = lowestNodeHead
        //midNodeHead.isLeftChild = true;

        this.attachToNodeNewChild(lowestNodeHead, midNodeHead, false);


        //midNodeHead.rightChild = leftChildMinimalNode;

        //if (leftChildMinimalNode)
        //{
        //    leftChildMinimalNode.parentNode = midNodeHead;
        //    leftChildMinimalNode.isLeftChild = false;
        //}

        this.attachToNodeNewChild(midNodeHead, rightChildMinimalNode, true);


        //lowestNodeHead.rightChild = unbalancedNodeHead;
        //unbalancedNodeHead.parentNode = lowestNodeHead;
        //unbalancedNodeHead.isLeftChild = false;

        this.attachToNodeNewChild(lowestNodeHead, unbalancedNodeHead, true);


        //unbalancedNodeHead.leftChild = rightChildMinimalNode;

        //if (rightChildMinimalNode)
        //{
        //    rightChildMinimalNode.parentNode = unbalancedNodeHead;
        //    rightChildMinimalNode.isLeftChild = true;
        //}

        this.attachToNodeNewChild(unbalancedNodeHead, leftChildMinimalNode, false);

    }


    // For balancing (rotate to left-right)
    rotateLeftRight(unbalancedNodeHead, midNodeHead, lowestNodeHead)
    {
        this.appliedTypeOfRotation = this.variantsOfRotation.leftRight;


        // https://www.programiz.com/dsa/avl-this

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

            //this.root.leftChild = midNodeHead;
            //midNodeHead.parentNode = this.root;

            this.attachToNodeNewChild(this.root, midNodeHead, true);


            //this.root.rightChild = unbalancedNodeHead;
            //unbalancedNodeHead.parentNode = this.root;

            this.attachToNodeNewChild(this.root, unbalancedNodeHead, false);
        }
        else
        {
            isLeftChildHeadNode ? parentHeadNode.leftChild = lowestNodeHead : parentHeadNode.rightChild = lowestNodeHead;
        }

        //lowestNodeHead.leftChild = midNodeHead;
        //midNodeHead.parentNode = lowestNodeHead
        //midNodeHead.isLeftChild = true;

        this.attachToNodeNewChild(lowestNodeHead, midNodeHead, true);


        //midNodeHead.rightChild = leftChildMinimalNode;

        //if (leftChildMinimalNode)
        //{
        //    leftChildMinimalNode.parentNode = midNodeHead;
        //    leftChildMinimalNode.isLeftChild = false;
        //}

        this.attachToNodeNewChild(midNodeHead, leftChildMinimalNode, false);


        //lowestNodeHead.rightChild = unbalancedNodeHead;
        //unbalancedNodeHead.parentNode = lowestNodeHead;
        //unbalancedNodeHead.isLeftChild = false;

        this.attachToNodeNewChild(lowestNodeHead, unbalancedNodeHead, false);


        //unbalancedNodeHead.leftChild = rightChildMinimalNode;

        //if (rightChildMinimalNode)
        //{
        //    rightChildMinimalNode.parentNode = unbalancedNodeHead;
        //    rightChildMinimalNode.isLeftChild = true;
        //}

        this.attachToNodeNewChild(unbalancedNodeHead, rightChildMinimalNode, true);
    }


    // For balancing
    // private (attach to node as child)
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


    // for balancing
    // find unbalancedNodes
    findUnbalancedHeadMidLowestNodes() // return object {} with nodes inside object: head, mid, lowest
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
