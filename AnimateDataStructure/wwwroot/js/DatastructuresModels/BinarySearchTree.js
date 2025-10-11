import { AbstractTree } from './AbstractTree.js';
import { CreatorNodeBinarySearchTree } from '../CreatorNodeDatastructures/CreatorNodeBinarySearchTree.js';

export class BinarySearchTree extends AbstractTree
{
    constructor()
    {
        super(); // !!!!!!!!!!!!!
        this.creatorNode = new CreatorNodeBinarySearchTree(this); // CHECK DATA STRUCTURE after new ... !!!!!!!

        //this.root = null;
        //this.treeLevelsBeforeNodeOperation = 0; // +++
        //this.treeLevels = 0;
        //this.currentAmountOfNodesInTree = 0; // +++
        //this.totalAddedNodes = 0; // counter of nodes, that was added in tree (if node deleted, then counter still unchanged). counter is never decreased
        //this.lastAddedNode = null;
        //this.lastDeletedNode = null;
        //this.isTreeToBeAlignedByWidth = false; // for BinarySearchTree: Have to be aligned by width after addition or deletion node. For AVL tree also takes into account previous balancing
        //this.alignedTimes = 0; // how many times node was alligned
        //this.treeViewState = new TreeViewState();
        //this.creatorNode = new CreatorNodeBinarySearchTree(this); // CHECK DATA STRUCTURE after new ... !!!!!!!

        // for balancing
        //this.balancedTimes = 0; // how many times node was balanced  // for balancing
        // for balancing
        //this.nodeToCheckBalance = null; // {nodeToCheck: someNode, isAddition: true/false } nodeToCheck - added node or parent of successor node (after deletion), isAddition - node to check after addition or after deletion

        // for balancing
        // in base AbstractTree
        //this.isLinkContainerShown = true; // set true in onAnimationEndBalancingUnfadeLinkContainer(..).   set false in onAnimationEndFadeLinkContainer(...)

        // heap
        //this.isMaxHeap = true; // TO DO: create as argument of constructor in class Heap. This class should be derived from class BinarySearchTree
    }


    // TO DO: MOVE TO AbstractTree !!!!!!!!

    insert(valueToAdd)
    {
        if (this.root == null)
        {
            //let nodeToAdd = new NodeBinarySearchTree(valueToAdd);
            let nodeToAdd = this.creatorNode.createNodeInstance(valueToAdd);

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

            let nodeToAdd = this.addNode(this.root, valueToAdd);

            this.treeLevels = this.getAllNodesByLevels().length;

            return nodeToAdd;
        }
    }


    // TO DO: MOVE TO AbstractTree !!!!!!!!

    addNode(currentNode, valueToAdd) // newNode has type Node
    {
        //let nodeToAdd = new NodeBinarySearchTree(valueToAdd);
        let nodeToAdd = this.creatorNode.createNodeInstance(valueToAdd);

        if (currentNode == null)
        {
            currentNode = nodeToAdd;
        }

        if (valueToAdd < currentNode.value)
        {
            if (currentNode.leftChild == null)
            {
                currentNode.leftChild = nodeToAdd;
                nodeToAdd.parentNode = currentNode;

                this.currentAmountOfNodesInTree++;
                this.lastAddedNode = nodeToAdd;
                this.totalAddedNodes++;

                nodeToAdd.isLeftChild = true;
                nodeToAdd.orderNumber = this.totalAddedNodes;
                nodeToAdd.setLevelInTree();
                nodeToAdd.setNodeId(nodeToAdd.orderNumber);
            }
            else
            {
                this.addNode(currentNode.leftChild, valueToAdd);
            }
        }
        else
        {
            if (currentNode.rightChild == null)
            {
                currentNode.rightChild = nodeToAdd;
                nodeToAdd.parentNode = currentNode;

                this.currentAmountOfNodesInTree++;
                this.lastAddedNode = nodeToAdd;
                this.totalAddedNodes++;

                nodeToAdd.isLeftChild = false;
                nodeToAdd.orderNumber = this.totalAddedNodes;
                nodeToAdd.setLevelInTree();
                nodeToAdd.setNodeId(nodeToAdd.orderNumber);
            }
            else
            {
                this.addNode(currentNode.rightChild, valueToAdd);
            }
        }

        // ????????????????????????
        return nodeToAdd;
    }


}