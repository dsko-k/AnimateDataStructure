import { NodeAvlTree } from './NodeAvlTree.js';

export class NodeRedBlackTree extends NodeAvlTree
{
    constructor(value)
    {
        super(value);

        this.value = value;
        this.isNodeRed = true; // to get value always use method in RBT isRedUncleOfNode(nodeToCheckItUncle), because node could be null and then is black

        this.isNodeToBeRotatedWithAncestors = false; // ?????? node which parent and grandparent have to be rotated. Parent and grandparent are not signified as isNodeToBeRotatedWithAncestors = true

        //this.isNodeToBeRecoloredAfterRotation = false; // to remove

        // For event "stepFixingDeletionNodeEnded"
        //this.isNodeDoubleBlack = false; // ??? for fixing after deletion. Set correct  tree.successorOfDeletedNode


        //this.parentNode = null;
        //this.leftChild = null;
        //this.rightChild = null;
        //this.isLeftChild = null; // ++

        //this.orderNumber = 0; // ++
        //this.nodeId = null;
        //this.isVisitedNode = false;


        //this.levelInTree = 0; // !!!!!! possible sourse of errors during relocation or balancing !!!!!!!!!!

        //this.startPositionX = null; // where will be placed node on the screen before animation will be started
        //this.startPositionY = null;

        //this.xCoordinate = null; // final coordinate after addition node
        //this.yCoordinate = null;

        //this.xCoordinatePrevious = null; // coordinate after addition node and before allignment of tree
        //this.yCoordinatePrevious = null;


        //this.positionNumberInFullTree = null; // ????????????? Is needed????????????? Order number node if all nodes in level were present

        //this.appliedNodeStyles = new AppliedNodeStyles();

        // this.statuses = new NodeStates(); // ?????????????????

        // for balancing
        // this.balanceFactor = 0; // FOR Node AVL Tree

        // for balancing
        // this.nodeHeight = 0; // max depth between node subtrees
    }


    // to remove
    //getIsNodeToBeRecoloredAfterRotation()
    //{
    //    return this.isNodeToBeRecoloredAfterRotation;
    //}


    //// to remove
    //setIsNodeToBeRecoloredAfterRotation(newValue)
    //{
    //    this.isNodeToBeRecoloredAfterRotation = newValue;
    //}


    changeNodeColorToOpposite()
    {
        this.isNodeRed = !this.isNodeRed;
    }

}