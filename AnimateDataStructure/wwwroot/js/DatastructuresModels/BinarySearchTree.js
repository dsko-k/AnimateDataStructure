import { AbstractTree } from './AbstractTree.js';
import { CreatorNodeBinarySearchTree } from '../CreatorNodeDatastructures/CreatorNodeBinarySearchTree.js';

export class BinarySearchTree extends AbstractTree
{
    constructor()
    {
        super();
        this.creatorNode = new CreatorNodeBinarySearchTree(this);
    }


    insert(valueToAdd)
    {
        if (this.root == null)
        {
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


    addNode(currentNode, valueToAdd)
    {
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

        return nodeToAdd;
    }
}