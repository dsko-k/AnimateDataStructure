import { AvlTree } from './AvlTree.js';
import { CreatorNodeRedBlackTree } from '../CreatorNodeDatastructures/CreatorNodeRedBlackTree.js';


export class RedBlackTree extends AvlTree
{
    constructor()
    {
        super(); // !!!!!!!!!!!!!
        this.creatorNode = new CreatorNodeRedBlackTree(this); // CHECK DATA STRUCTURE after new ... !!!!!!!

        this.successorOfDeletedNode = null; // ??? node that became successor after deletion node
        this.initialSiblingToCheckAfterDeletion = null;

        this.nodesToRecolor = []; // ??? list of nodes that have to be recolored
        this.nodeToCheckRbtProperties = null; // ??? node that need to be checked on violation RBT properties
        this.doubleBlackNode = null; // ?????


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
        //this.balancedTimes = 0; // how many times node was balanced  // for balancing
        // for balancing
        //this.nodeToCheckBalance = null; // {nodeToCheck: someNode, isAddition: true/false } nodeToCheck - added node or parent of successor node (after deletion), isAddition - node to check after addition or after deletion

        // for balancing
        // in base AbstractTree
        //this.isLinkContainerShown = true; // set true in onAnimationEndBalancingUnfadeLinkContainer(..).   set false in onAnimationEndFadeLinkContainer(...)

        // heap
        //this.isMaxHeap = true; // TO DO: create as argument of constructor in class Heap. This class should be derived from class BinarySearchTree
    }


    // https://www.geeksforgeeks.org/insertion-in-red-black-this/

    /* Algorithm to fix RBT properties after ADDITION:

        Let x be the newly inserted node.

        1. Perform standard BST insertion and make the colour of newly inserted nodes as RED.
        2. If x is the root, change the colour of x as BLACK (Black height of complete this increases by 1).
        3. Do the following if the color of x’s parent is not BLACK and x is not the root.
            a) If x’s uncle is RED (Grandparent must have been black from property 4)
            onUncleNodeIsRedDuringAddititon
                (i) Change the colour of parent and uncle as BLACK.
                (ii) Colour of a grandparent as RED.
                (iii) Change x = x’s grandparent, repeat steps 2 and 3 for new x.

            b) If x’s uncle is BLACK, then there can be four configurations for x, x’s parent (p) and x’s grandparent (g) (This is similar to AVL Tree)

                (i) Left Left Case (p is left child of g and x is left child of p)
                (ii) Left Right Case (p is left child of g and x is the right child of p)
                (iii) Right Right Case (Mirror of case i)
                (iv) Right Left Case (Mirror of case ii)

        Re-coloring after rotations:

        For Left Left Case [3.b (i)] and Right Right case [3.b (iii)], swap colors of grandparent and parent after rotations
        For Left Right Case [3.b (ii)]and Right Left Case [3.b (iv)], swap colors of grandparent and inserted node after rotations */


    // check is this comply all rules of RBT after addition
    isNeedToFixTreeAfterAddition(node)
    {
        if (node === null) // ???????
        {
            return false;
        }

        if (Object.is(node, this.root))
        {
            return this.root.isNodeRed;
        }

        return !(node.parentNode.isNodeRed === false);
    }


    getGrandParentNode(node)
    {
        if (node.currentLevel < 2)
        {
            throw new Error(`Unable to find grandparent: node has level ${node.currentLevel}`);
        }

        return node.parentNode.parentNode;
    }


    getUncleOfNode(node)
    {
        let parentNode = node.parentNode;

        let grandParentNode = this.getGrandParentNode(node);

        if (parentNode.isLeftChild === true)
        {
            return grandParentNode.rightChild;
        }

        if (parentNode.isLeftChild === false)
        {
            return grandParentNode.leftChild;
        }

        throw new Error(`Unable to find Uncle: node has level ${node.currentLevel}`);
    }


    checkIsNodeRed(node)
    {
        if (!node)
        {
            return false;
        }

        return node.isNodeRed;
    }


    // add value to the list of nodes to recolor
    addToListOfNodesToRecolor(nodeToRecolor)
    {
        this.nodesToRecolor.push(nodeToRecolor);
    }


    clearListOfNodesToRecolor()
    {
        this.nodesToRecolor.length = 0;
    }


    isRedUncleOfNode(nodeToCheckItUncle)
    {
        let uncleNode = this.getUncleOfNode(nodeToCheckItUncle);

        return this.checkIsNodeRed(uncleNode);
    }


    // For addition in RBT
    // rotate nodeToCheck with its ancestors
    rotateNodesWhenUncleIsBlack(nodeToCheck)
    {
        let uncleNode = this.getUncleOfNode(nodeToCheck);

        if (this.checkIsNodeRed(uncleNode))
        {
            return;
        }

        let parentNode = nodeToCheck.parentNode;
        let grandParentNode = this.getGrandParentNode(nodeToCheck);


        this.setNodesToRecolorWhenUncleIsBlack(grandParentNode, parentNode, nodeToCheck);


        // Left Left Rotation (parentNode is left child of grandParentNode and nodeToCheck is left child of parentNode)
        if (Object.is(grandParentNode.leftChild, parentNode) && Object.is(parentNode.leftChild, nodeToCheck))
        {
            this.rotateRight(grandParentNode, parentNode);

            //this.addToListOfNodesToRecolor(parentNode);
            //this.addToListOfNodesToRecolor(grandParentNode);
        }
        // Right Right Rotation
        else if (Object.is(grandParentNode.rightChild, parentNode) && Object.is(parentNode.rightChild, nodeToCheck))
        {
            this.rotateLeft(grandParentNode, parentNode);

            //this.addToListOfNodesToRecolor(parentNode);
            //this.addToListOfNodesToRecolor(grandParentNode);
        }
        // Left Right Rotation (parentNode is left child of grandParentNode and nodeToCheck is the right child of parentNode)
        else if (Object.is(grandParentNode.leftChild, parentNode) && Object.is(parentNode.rightChild, nodeToCheck))
        {
            this.rotateLeftRight(grandParentNode, parentNode, nodeToCheck);

            //this.addToListOfNodesToRecolor(grandParentNode);
            //this.addToListOfNodesToRecolor(nodeToCheck);
        }
        // Right Left Rotation
        else if (Object.is(grandParentNode.rightChild, parentNode) && Object.is(parentNode.leftChild, nodeToCheck))
        {
            this.rotateRightLeft(grandParentNode, parentNode, nodeToCheck);

            //this.addToListOfNodesToRecolor(grandParentNode);
            //this.addToListOfNodesToRecolor(nodeToCheck);
        }

        this.nodeToCheckRbtProperties = null;

        this.balancedTimes++; // Increase balancing counter

        this.updateNodesLevelInTree(); // recalculate levelInTree for every node
    }


    // For addition in RBT
    // glow border of the node, that will be the head after rotation
    getNodeToBeHeadAfterRotationDuringAddition(nodeToCheck) // nodeToCheck is nodeWhereFiredEvent during addition
    {
        let uncleNode = this.getUncleOfNode(nodeToCheck);

        if (this.checkIsNodeRed(uncleNode))
        {
            return;
        }

        let parentNode = nodeToCheck.parentNode;
        let grandParentNode = this.getGrandParentNode(nodeToCheck);


        // Left Left Rotation (parentNode is left child of grandParentNode and nodeToCheck is left child of parentNode)
        if (Object.is(grandParentNode.leftChild, parentNode) && Object.is(parentNode.leftChild, nodeToCheck))
        {
            return parentNode;
            //this.rotateRight(grandParentNode, parentNode);

            //this.addToListOfNodesToRecolor(parentNode);
            //this.addToListOfNodesToRecolor(grandParentNode);
        }
        // Right Right Rotation
        else if (Object.is(grandParentNode.rightChild, parentNode) && Object.is(parentNode.rightChild, nodeToCheck))
        {
            return parentNode;

            //this.rotateLeft(grandParentNode, parentNode);

            //this.addToListOfNodesToRecolor(parentNode);
            //this.addToListOfNodesToRecolor(grandParentNode);
        }
        // Left Right Rotation (parentNode is left child of grandParentNode and nodeToCheck is the right child of parentNode)
        else if (Object.is(grandParentNode.leftChild, parentNode) && Object.is(parentNode.rightChild, nodeToCheck))
        {
            return nodeToCheck;

            //this.rotateLeftRight(grandParentNode, parentNode, nodeToCheck);

            //this.addToListOfNodesToRecolor(grandParentNode);
            //this.addToListOfNodesToRecolor(nodeToCheck);
        }
        // Right Left Rotation
        else if (Object.is(grandParentNode.rightChild, parentNode) && Object.is(parentNode.leftChild, nodeToCheck))
        {
            return nodeToCheck;

            //this.rotateRightLeft(grandParentNode, parentNode, nodeToCheck);

            //this.addToListOfNodesToRecolor(grandParentNode);
            //this.addToListOfNodesToRecolor(nodeToCheck);
        }
    }


    // For addition in RBT
    setNodesToRecolorWhenUncleIsBlack(grandParentNodeBeforeRotation, parentBeforeRotation, nodeToCheck)
    {
        // Left Left Rotation (parentNode is left child of grandParentNode and nodeToCheck is left child of parentNode)
        // or Right Right Rotation
        if ((Object.is(grandParentNodeBeforeRotation.leftChild, parentBeforeRotation) && Object.is(parentBeforeRotation.leftChild, nodeToCheck)) ||
            (Object.is(grandParentNodeBeforeRotation.rightChild, parentBeforeRotation) && Object.is(parentBeforeRotation.rightChild, nodeToCheck)))
        {
            this.addToListOfNodesToRecolor(parentBeforeRotation);
            this.addToListOfNodesToRecolor(grandParentNodeBeforeRotation);
        }
        // Left Right Rotation (parentNode is left child of grandParentNode and nodeToCheck is the right child of parentNode)
        // or Right Left Rotation
        else if ((Object.is(grandParentNodeBeforeRotation.leftChild, parentBeforeRotation) && Object.is(parentBeforeRotation.rightChild, nodeToCheck)) ||
            (Object.is(grandParentNodeBeforeRotation.rightChild, parentBeforeRotation) && Object.is(parentBeforeRotation.leftChild, nodeToCheck)))
        {
            this.addToListOfNodesToRecolor(grandParentNodeBeforeRotation);
            this.addToListOfNodesToRecolor(nodeToCheck);
        }
        else
        {
            throw new Error("Unable to select correct rotation");
        }
    }


    // For deletion in RBT
    // When a black node is deleted and replaced by a black successor, the successor is marked as double black
    checkIsSuccessorDoubleBlackNode(nodeToDelete, successor)
    {
        return !this.checkIsNodeRed(nodeToDelete) && !this.checkIsNodeRed(successor);
    }


    // For deletion in RBT
    isAnyChildIsRed(node)
    {
        if (!node)
        {
            return false;
        }

        //return (node.leftChild && node.leftChild.isNodeRed) || (node.rightChild && node.rightChild.isNodeRed);
        return this.checkIsNodeRed(node.leftChild) || this.checkIsNodeRed(node.rightChild);
    }


    // IS NEEDED+++
    // For deletion in RBT
    getSiblingOf(node)
    {
        if (node.isLeftChild === null) // ???????????????????
        {
            throw new Error(`Sibling of root node does not exist`);
        }

        if (node.isLeftChild)
        {
            return node.parentNode.rightChild;
        }

        return node.parentNode.leftChild;
    }


    // ??????
    getInitialSiblingToCheckAfterDeletion(nodeToDelete, successor)
    {
        if (successor !== null)
        {
            return successor.isLeftChild ? successor.parentNode.rightChild : successor.parentNode.leftChild;
        }
        else if (Object.is(nodeToDelete, this.root) && successor === null)
        {
            return null;
        }

        return nodeToDelete.isLeftChild ? nodeToDelete.parentNode.rightChild : nodeToDelete.parentNode.leftChild;
    }


    // for fix after deletion (case when sibling is red)
    // Determing a new sibling after rotation using rotateNodesWhenSiblingIsRed(siblingOfNodeToDelete)
    getNewSiblingAfterRotationNodesWhenSiblingIsRed(parentOfSiblingBeforeRotation, leftChildOfParentOfSiblingBeforeRotation, rightChildOfParentOfSiblingBeforeRotation)
    {
        // DO NOT DELETE COMMENT:
        // if left or right child of parentOfSiblingBeforeRotation is not changed after rotation, then it is unchanged child is double black
        // sibling of unchanged child is a new sibling after rotation

        // Note: parentOfSiblingBeforeRotation is not changed after rotation (changed only one of its child)

        if (Object.is(parentOfSiblingBeforeRotation.leftChild, leftChildOfParentOfSiblingBeforeRotation))
        {
            return parentOfSiblingBeforeRotation.rightChild;
        }

        return parentOfSiblingBeforeRotation.leftChild;
    }


    // For deletion in RBT
    // When sibling is black and sibling has TWO red child
    rotateNodesWhenSiblingIsBlackAndHasTwoRedChildren(siblingOfNodeToDelete)
    {
        let areBothChildrenOfSiblingRed = this.checkIsNodeRed(siblingOfNodeToDelete.leftChild) &&
            this.checkIsNodeRed(siblingOfNodeToDelete.rightChild);

        if (!areBothChildrenOfSiblingRed)
        {
            throw new Error(`Sibling of node to delete has no two red children`);
        }

        let parentOfSibling = siblingOfNodeToDelete.parentNode;

        // for recoloring

        this.setNodesToRecolorWhenSiblingIsBlackAndHasTwoRedChildren(siblingOfNodeToDelete, parentOfSibling);


        // Left Left rotation when both children of sibling are red
        if (siblingOfNodeToDelete.isLeftChild)
        {
            this.rotateRight(parentOfSibling, siblingOfNodeToDelete);
        }
        // Right Right rotation when both children of sibling are red
        else
        {
            this.rotateLeft(parentOfSibling, siblingOfNodeToDelete);
        }

        this.nodeToCheckRbtProperties = null; // siblingOfNodeToDelete; // ??????


        this.balancedTimes++; // Increase balancing counter

        this.updateNodesLevelInTree(); // recalculate levelInTree for every node
    }


    // For deletion in RBT
    setNodesToRecolorWhenSiblingIsBlackAndHasTwoRedChildren(siblingBeforeRotation, parentBeforeRotation)
    {
        // for recoloring

        // add to list of nodes to recolor (black sibling with 2 red children):
        // 1. Red child: left child if siblingOfNodeToDelete is left child or right child if siblingOfNodeToDelete is right child
        // 2. siblingOfNodeToDelete (if parent of siblingOfNodeToDelete is red)
        // 3. parent of siblingOfNodeToDelete if this parent is red

        if (this.checkIsNodeRed(parentBeforeRotation))
        {
            this.addToListOfNodesToRecolor(parentBeforeRotation);
            this.addToListOfNodesToRecolor(siblingBeforeRotation);
        }

        let redChildToRecolor = siblingBeforeRotation.isLeftChild ? siblingBeforeRotation.leftChild : siblingBeforeRotation.rightChild;

        this.addToListOfNodesToRecolor(redChildToRecolor);
    }


    // For deletion in RBT
    // When sibling is black and sibling has only ONE red child
    rotateNodesWhenSiblingIsBlackAndHasOneRedChild(siblingOfNodeToDelete)
    {
        if (!this.isAnyChildIsRed(siblingOfNodeToDelete))
        {
            throw new Error(`Sibling has no any red child`);
        }
        else if (this.checkIsNodeRed(siblingOfNodeToDelete.leftChild) && this.checkIsNodeRed(siblingOfNodeToDelete.rightChild))
        {
            throw new Error(`Sibling has two red children`);
        }

        let redChildOfSibling = this.checkIsNodeRed(siblingOfNodeToDelete.leftChild) ? siblingOfNodeToDelete.leftChild : siblingOfNodeToDelete.rightChild;

        let parentOfSibling = siblingOfNodeToDelete.parentNode;


        // for recoloring ?????

        //// add to list of nodes to recolor (black sibling with 2 red children):
        //// 1. Red child
        //// 2. swap colors of sibling and its parent (if they are not the same color)

        //this.addToListOfNodesToRecolor(redChildOfSibling); // ????

        //if (this.checkIsNodeRed(siblingOfNodeToDelete) != this.checkIsNodeRed(siblingOfNodeToDelete.parentNode))
        //{
        //    this.addToListOfNodesToRecolor(siblingOfNodeToDelete);
        //    this.addToListOfNodesToRecolor(siblingOfNodeToDelete.parentNode);
        //}

        this.setNodesToRecolorWhenSiblingIsBlackAndHasOneRedChild(siblingOfNodeToDelete, parentOfSibling, redChildOfSibling);


        // Left Left Rotation (s is left child of its parent and r is left child of s or both children of s are red)
        if (siblingOfNodeToDelete.isLeftChild && redChildOfSibling.isLeftChild)
        {
            this.rotateRight(parentOfSibling, siblingOfNodeToDelete);
        }
        // Right Right Rotation (s is right child of its parent and r is right child of s or both children of s are red)
        else if (!siblingOfNodeToDelete.isLeftChild && !redChildOfSibling.isLeftChild)
        {
            this.rotateLeft(parentOfSibling, siblingOfNodeToDelete);
        }
        // Left Right Rotation (s is left child of its parent and r is right child)
        else if (siblingOfNodeToDelete.isLeftChild && !redChildOfSibling.isLeftChild)
        {
            this.rotateLeftRight(parentOfSibling, siblingOfNodeToDelete, redChildOfSibling); // incorrect naming method when it was defined ??????????????
        }
        // Right Left Rotation (s is right child of its parent and r is left child of s)
        else if (!siblingOfNodeToDelete.isLeftChild && redChildOfSibling.isLeftChild)
        {
            this.rotateRightLeft(parentOfSibling, siblingOfNodeToDelete, redChildOfSibling); // incorrect naming method when it was defined ??????????????
        }


        this.nodeToCheckRbtProperties = null; //????   //siblingOfNodeToDelete;


        this.balancedTimes++; // Increase balancing counter

        this.updateNodesLevelInTree(); // recalculate levelInTree for every node
    }


    // For deletion in RBT
    setNodesToRecolorWhenSiblingIsBlackAndHasOneRedChild(siblingBeforeRotation, parentBeforeRotation, redChildBeforeRotation)
    {
        // 3 nodes parentBeforeRotation, siblingBeforeRotation, redChildBeforeRotation resemble to the head of an arrow > or <
        // in this case red child is rotated to the head of ^ and is red (it is not recolored). The rest of nodes is black
        if (siblingBeforeRotation.isLeftChild !== redChildBeforeRotation.isLeftChild)
        {
            if (this.checkIsNodeRed(parentBeforeRotation))
            {
                this.addToListOfNodesToRecolor(parentBeforeRotation);
            }
            else
            {
                this.addToListOfNodesToRecolor(redChildBeforeRotation);
            }
        }
        // 3 nodes parentBeforeRotation, siblingBeforeRotation, redChildBeforeRotation resemble to diagonal \ or /
        // in this case siblingBeforeRotation is rotated to the head of ^ and is black (recolored). The rest of nodes is black
        else
        {
            if (this.checkIsNodeRed(parentBeforeRotation))
            {
                this.addToListOfNodesToRecolor(siblingBeforeRotation);
                this.addToListOfNodesToRecolor(parentBeforeRotation);
                this.addToListOfNodesToRecolor(redChildBeforeRotation);
            }
            else
            {
                this.addToListOfNodesToRecolor(redChildBeforeRotation);
            }
        }

    }


    // For deletion in RBT
    // rotate nodeToCheck with its ancestors
    rotateNodesWhenSiblingIsRed(siblingOfNodeToDelete)
    {
        if (!this.checkIsNodeRed(siblingOfNodeToDelete))
        {
            throw new Error(`Sibling is not red`);
        }

        let parentOfSibling = siblingOfNodeToDelete.parentNode;

        let leftChildOfParentOfSiblingBeforeRotation = parentOfSibling.leftChild;
        let rightChildOfParentOfSiblingBeforeRotation = parentOfSibling.rightChild;

        // for recoloring

        this.setNodesToRecolorWhenSiblingIsRed(siblingOfNodeToDelete, siblingOfNodeToDelete.parentNode);




        // Left Left rotation when both children of sibling are red
        if (siblingOfNodeToDelete.isLeftChild)
        {
            this.rotateRight(parentOfSibling, siblingOfNodeToDelete);
        }
        // Right Right rotation when both children of sibling are red
        else if (!siblingOfNodeToDelete.isLeftChild)
        {
            this.rotateLeft(parentOfSibling, siblingOfNodeToDelete);
        }

        // see picture in case 3.2 (c)   https://www.geeksforgeeks.org/deletion-in-red-black-this/
        // sibling of deleted node after rotation

        this.nodeToCheckRbtProperties = this.getNewSiblingAfterRotationNodesWhenSiblingIsRed(parentOfSibling, leftChildOfParentOfSiblingBeforeRotation, rightChildOfParentOfSiblingBeforeRotation);



        this.balancedTimes++; // Increase balancing counter

        this.updateNodesLevelInTree(); // recalculate levelInTree for every node
    }


    // For deletion in RBT
    setNodesToRecolorWhenSiblingIsRed(siblingBeforeRotation, parentBeforeRotation)
    {
        // add to list of nodes to recolor (black sibling with 2 red children):
        // 1. Swap colors of sibling and its parent
        // Reapply other cases that are suitable

        if (this.checkIsNodeRed(siblingBeforeRotation) != this.checkIsNodeRed(parentBeforeRotation)) // no need (sibling is red and its parent is black always in this case)???
        {
            this.addToListOfNodesToRecolor(siblingBeforeRotation);
            this.addToListOfNodesToRecolor(parentBeforeRotation);
        }
    }


    // ?????

    // DO NOT DELETE:

    // Represent tree as array of numbers from top level of tree to the bottom level with addition elements of flag isRedNode (BFS)
    // 10.254,true,11.512,false,21,true,22.554,false,35,true
    // 10,false,11,false,9,false,12,true
    getDataStructureNodesAsString()
    {
        let allNodesByLevels = this.getAllNodesByLevels();

        // flatten array allNodesByLevels with addition elements of flag isRedNode: [ 10, false, 11, false, 9, false, 12, true ]
        let flattenNodeValuesIsRedNodeFlag = allNodesByLevels
            .flatMap(level => level.flatMap(node => [node.value, node.isNodeRed]));

        // converts array [ 10, false, 11, false, 9, false, 12, true ] into string "10,false,11,false,9,false,12,true"
        return flattenNodeValuesIsRedNodeFlag.join(',');
    }

}