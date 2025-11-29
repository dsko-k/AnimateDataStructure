import { AppliedNodeStyles } from './AppliedNodeStyles.js';

export class AbstractNodeTree // functionality of binary tree
{
    constructor(value)
    {
        this.value = value;

        this.parentNode = null;
        this.leftChild = null;
        this.rightChild = null;
        this.isLeftChild = null;
        this.orderNumber = 0;
        this.nodeId = null;
        this.isVisitedNode = false;
        this.wasChangedNodeColorAfterVisiting = false;
        this.levelInTree = 0;
        this.startPositionX = null; // where will be placed node on the screen before animation will be started
        this.startPositionY = null;
        this.xCoordinate = null; // final coordinate after addition node
        this.yCoordinate = null;
        this.xCoordinatePrevious = null; // coordinate after addition node and before allignment of tree
        this.yCoordinatePrevious = null;
        this.appliedNodeStyles = new AppliedNodeStyles();
    }


    setLevelInTree()
    {
        let level = 0;
        let currentNode = this;
        while (currentNode != null)
        {
            level++;
            currentNode = currentNode.parentNode;
        }
        this.levelInTree = level;
    }


    setNodeId(nodeOrderNumber)
    {
        this.nodeId = `orderNumber_${nodeOrderNumber}`;
    }
}