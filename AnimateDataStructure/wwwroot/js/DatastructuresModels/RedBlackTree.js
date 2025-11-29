import { AvlTree } from './AvlTree.js';
import { CreatorNodeRedBlackTree } from '../CreatorNodeDatastructures/CreatorNodeRedBlackTree.js';


export class RedBlackTree extends AvlTree
{
    constructor()
    {
        super();
        this.creatorNode = new CreatorNodeRedBlackTree(this);
        this.successorOfDeletedNode = null;
        this.initialSiblingToCheckAfterDeletion = null;
        this.nodesToRecolor = [];
        this.nodeToCheckRbtProperties = null;
        this.doubleBlackNode = null;
    }

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


    // For addition in RBT. Rotate nodeToCheck with its ancestors
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
        }
        // Right Right Rotation
        else if (Object.is(grandParentNode.rightChild, parentNode) && Object.is(parentNode.rightChild, nodeToCheck))
        {
            this.rotateLeft(grandParentNode, parentNode);
        }
        // Left Right Rotation (parentNode is left child of grandParentNode and nodeToCheck is the right child of parentNode)
        else if (Object.is(grandParentNode.leftChild, parentNode) && Object.is(parentNode.rightChild, nodeToCheck))
        {
            this.rotateLeftRight(grandParentNode, parentNode, nodeToCheck);
        }
        // Right Left Rotation
        else if (Object.is(grandParentNode.rightChild, parentNode) && Object.is(parentNode.leftChild, nodeToCheck))
        {
            this.rotateRightLeft(grandParentNode, parentNode, nodeToCheck);
        }
        this.nodeToCheckRbtProperties = null;
        this.balancedTimes++;
        this.updateNodesLevelInTree(); // recalculate levelInTree for every node
    }


    // For addition in RBT. Glow border of the node, that will be the head after rotation
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
        }
        // Right Right Rotation
        else if (Object.is(grandParentNode.rightChild, parentNode) && Object.is(parentNode.rightChild, nodeToCheck))
        {
            return parentNode;
        }
        // Left Right Rotation (parentNode is left child of grandParentNode and nodeToCheck is the right child of parentNode)
        else if (Object.is(grandParentNode.leftChild, parentNode) && Object.is(parentNode.rightChild, nodeToCheck))
        {
            return nodeToCheck;
        }
        // Right Left Rotation
        else if (Object.is(grandParentNode.rightChild, parentNode) && Object.is(parentNode.leftChild, nodeToCheck))
        {
            return nodeToCheck;
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


    // For deletion in RBT. When a black node is deleted and replaced by a black successor, the successor is marked as double black
    checkIsSuccessorDoubleBlackNode(nodeToDelete, successor)
    {
        return !this.checkIsNodeRed(nodeToDelete) && !this.checkIsNodeRed(successor);
    }


    isAnyChildIsRed(node)
    {
        if (!node)
        {
            return false;
        }
        return this.checkIsNodeRed(node.leftChild) || this.checkIsNodeRed(node.rightChild);
    }


    getSiblingOf(node)
    {
        if (node.isLeftChild === null)
        {
            throw new Error(`Sibling of root node does not exist`);
        }
        if (node.isLeftChild)
        {
            return node.parentNode.rightChild;
        }
        return node.parentNode.leftChild;
    }


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


    // For fix after deletion (case when sibling is red). Determing a new sibling after rotation
    getNewSiblingAfterRotationNodesWhenSiblingIsRed(parentOfSiblingBeforeRotation, leftChildOfParentOfSiblingBeforeRotation, rightChildOfParentOfSiblingBeforeRotation)
    {
        // If left or right child of parentOfSiblingBeforeRotation is not changed after rotation, then it is unchanged child is double black
        // sibling of unchanged child is a new sibling after rotation
        // Note: parentOfSiblingBeforeRotation is not changed after rotation (changed only one of its child)
        if (Object.is(parentOfSiblingBeforeRotation.leftChild, leftChildOfParentOfSiblingBeforeRotation))
        {
            return parentOfSiblingBeforeRotation.rightChild;
        }
        return parentOfSiblingBeforeRotation.leftChild;
    }


    // For deletion in RBT. When sibling is black and sibling has TWO red child
    rotateNodesWhenSiblingIsBlackAndHasTwoRedChildren(siblingOfNodeToDelete)
    {
        let areBothChildrenOfSiblingRed = this.checkIsNodeRed(siblingOfNodeToDelete.leftChild) && this.checkIsNodeRed(siblingOfNodeToDelete.rightChild);
        if (!areBothChildrenOfSiblingRed)
        {
            throw new Error(`Sibling of node to delete has no two red children`);
        }
        let parentOfSibling = siblingOfNodeToDelete.parentNode;
        this.setNodesToRecolorWhenSiblingIsBlackAndHasTwoRedChildren(siblingOfNodeToDelete, parentOfSibling);        
        if (siblingOfNodeToDelete.isLeftChild) // Left Left rotation when both children of sibling are red
        {
            this.rotateRight(parentOfSibling, siblingOfNodeToDelete);
        }        
        else // Right Right rotation when both children of sibling are red
        {
            this.rotateLeft(parentOfSibling, siblingOfNodeToDelete);
        }
        this.nodeToCheckRbtProperties = null;
        this.balancedTimes++;
        this.updateNodesLevelInTree();
    }


    // For deletion in RBT
    setNodesToRecolorWhenSiblingIsBlackAndHasTwoRedChildren(siblingBeforeRotation, parentBeforeRotation)
    {
        if (this.checkIsNodeRed(parentBeforeRotation))
        {
            this.addToListOfNodesToRecolor(parentBeforeRotation);
            this.addToListOfNodesToRecolor(siblingBeforeRotation);
        }
        let redChildToRecolor = siblingBeforeRotation.isLeftChild ? siblingBeforeRotation.leftChild : siblingBeforeRotation.rightChild;
        this.addToListOfNodesToRecolor(redChildToRecolor);
    }


    // For deletion in RBT. When sibling is black and sibling has only ONE red child
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
            this.rotateLeftRight(parentOfSibling, siblingOfNodeToDelete, redChildOfSibling);
        }
        // Right Left Rotation (s is right child of its parent and r is left child of s)
        else if (!siblingOfNodeToDelete.isLeftChild && redChildOfSibling.isLeftChild)
        {
            this.rotateRightLeft(parentOfSibling, siblingOfNodeToDelete, redChildOfSibling);
        }
        this.nodeToCheckRbtProperties = null;
        this.balancedTimes++;
        this.updateNodesLevelInTree();
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


    // For deletion in RBT. Rotate nodeToCheck with its ancestors
    rotateNodesWhenSiblingIsRed(siblingOfNodeToDelete)
    {
        if (!this.checkIsNodeRed(siblingOfNodeToDelete))
        {
            throw new Error(`Sibling is not red`);
        }
        let parentOfSibling = siblingOfNodeToDelete.parentNode;
        let leftChildOfParentOfSiblingBeforeRotation = parentOfSibling.leftChild;
        let rightChildOfParentOfSiblingBeforeRotation = parentOfSibling.rightChild;
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
        this.nodeToCheckRbtProperties = this.getNewSiblingAfterRotationNodesWhenSiblingIsRed(parentOfSibling, leftChildOfParentOfSiblingBeforeRotation, rightChildOfParentOfSiblingBeforeRotation);
        this.balancedTimes++;
        this.updateNodesLevelInTree();
    }


    // For deletion in RBT
    setNodesToRecolorWhenSiblingIsRed(siblingBeforeRotation, parentBeforeRotation)
    {
        if (this.checkIsNodeRed(siblingBeforeRotation) != this.checkIsNodeRed(parentBeforeRotation))
        {
            this.addToListOfNodesToRecolor(siblingBeforeRotation);
            this.addToListOfNodesToRecolor(parentBeforeRotation);
        }
    }

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