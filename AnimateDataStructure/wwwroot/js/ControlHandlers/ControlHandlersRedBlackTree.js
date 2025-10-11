import { ControlHandlersAVLTree } from './ControlHandlersAVLTree.js';
import { RedBlackTreeOperation } from '../DataStructureOperations/RedBlackTreeOperation.js';
import { RedBlackTreeAnimationStepConfiguration } from '../PatternStepAnimationOperation/RedBlackTreeAnimationStepConfiguration.js';
import { SequenceSteps } from '../AnimationNodeSteps/SequenceSteps.js';
import { ScreenCoordinates } from '../CoordinatesModel/ScreenCoordinates.js';
import { TreeCoordinates } from '../CoordinatesModel/TreeCoordinates.js';

export class ControlHandlersRedBlackTree extends ControlHandlersAVLTree
{
    constructor(tree)
    {
        super(tree);
        this.tree = tree;
        this.redBlackTreeOperation = new RedBlackTreeOperation(this.tree);
        this.redBlackTreeAnimationStepConfiguration = new RedBlackTreeAnimationStepConfiguration();
    }


    onClickButtonAddNode()
    {
        // dispatch event to disable buttons and input
        this.customEventHandler.dispatchDisableGroupControls(true);

        // "automatically" hide clicking on node if a new node is added
        if (this.tree.treeViewState.getLastClickedNode())
        {
            this.onHideClickNode();
            this.tree.treeViewState.setLastClickedNode(null);
        }

        this.hideGlowingBorderForPreviouslyFoundNode();

        let preLastNode = this.tree.lastAddedNode;

        let valueToAdd = this.processInputForNodeValue(); // check the value of an input

        this.tree.insert(valueToAdd);

        // DUPLICATION
        let screenCoordinates = new ScreenCoordinates();
        let screenXCenterCoorditate = screenCoordinates.getScreenXCenter();
        let treeCoordinates = new TreeCoordinates(this.tree, screenXCenterCoorditate, 300);

        treeCoordinates.setStartPositions(this.tree.lastAddedNode);
        treeCoordinates.setCoordinates(this.tree.lastAddedNode);

        let addedNode = this.tree.lastAddedNode; // ????????????????????????????

        // ???????
        // add info about this.tree operation add node - processing
        //this.treeOperationsStatuses.writeNewStateOfTreeOperation(this.tree, addedNode, this.treeOperationsStatuses.typesOfOperations.addNode, this.treeOperationsStatuses.statusesOfOperation.addition);
        //this.customEventHandlerHtmlTable.dispatchUpdateTableTreeOperations(this.tree);
        this.redBlackTreeOperation.onAddNewEntryToHtmlTableOnAddNode(addedNode);



        //// for balancing
        //this.tree.nodeToCheckBalance = {
        //    nodeToCheck: addedNode,
        //    isAddition: true
        //};


        // correct ADD node
        let patternStepAnimationArrayAddingNode = this.redBlackTreeAnimationStepConfiguration.getPatternStepAnimationArrayAddingNode();

        // get sequence of the steps
        let sequenceSteps = new SequenceSteps(this.tree);

        let stepsAdditionNode = sequenceSteps.createSequenceStepsAdditionNode(addedNode, patternStepAnimationArrayAddingNode);

        this.onAnimationEndAddNode(addedNode, treeCoordinates, stepsAdditionNode, preLastNode);
    }


    // !!!!!!!!!!!!!!!!!!!!!!!!!!
    // TO DO: TO OVERRIDE IN ALL DERIVED CLASSES !!!!!!!!!!!!!

    onAnimationEndAddNode(nodeToAdd, treeCoordinates, sequenceStepsAdditionNode, preLastNode)
    {
        let superContainerElementName = sequenceStepsAdditionNode[0].stepAnimationObject.htmlNodeContainer[0].elementName;

        let nodeDomElement;

        if (this.domUpdater.isExistDomElement(nodeToAdd, superContainerElementName))
        {
            nodeDomElement = this.domUpdater.getDomElement(nodeToAdd, superContainerElementName);
        }

        if (nodeDomElement)
        {
            // ???
            nodeDomElement.addEventListener("nodeAdded", function (evn)
            {
                this.onAlignTreeByWidth(evn, this.tree, treeCoordinates);

                // add info about this.tree operation add node: added
                this.redBlackTreeOperation.onUpdateEntryInHtmlTableOnAddNode(nodeToAdd);

            }.bind(this),

                { once: true }); // this.tree is a global variable


            nodeDomElement.addEventListener("nodeDeleted", function (evn)
            {
                this.onAlignTreeByWidth(evn, this.tree, treeCoordinates);

            }.bind(this),

                { once: true }); // this.tree is a global variable


            // ????????
            nodeDomElement.addEventListener("alignedByHeight", function (evn)
            {
                this.onAnimationEndRelocationNode(evn, nodeToAdd);

            }.bind(this));
        }

        // REPLACE HARDCODE

        let svgLineLinkElementName = "svgLineLink";

        let delayMsBeforeRecoloring = 1000; // 1000 ms


        let svgLineDomElement = this.domUpdater.getDomElement(nodeToAdd, svgLineLinkElementName);

        if (svgLineDomElement)
        {
            svgLineDomElement.addEventListener("animationstart", function (evn)
            {
                this.glowBorderAfterNodeAddition(evn, nodeToAdd, sequenceStepsAdditionNode, preLastNode);

            }.bind(this),

                { once: true });


            svgLineDomElement.addEventListener("animationend", function (evn)
            {
                this.customEventHandler.dispatchSVGLinkErasedBeforeAlignmentByHeight(evn.animationName, svgLineLinkElementName, nodeToAdd);

                this.customEventHandler.dispatchSVGLinkDrawnAfterAlignmentByHeight(evn.animationName, svgLineLinkElementName, nodeToAdd);

                //this.customEventHandler.dispatchLinkHiddenBeforeBalancing(evn.animationName, svgLineLinkElementName, nodeToAdd);
                this.customEventHandler.dispatchLinkHiddenBeforeRotation(evn.animationName, svgLineLinkElementName, nodeToAdd);


                //this.customEventHandler.dispatchLinkShowAfterBalancing(evn.animationName, svgLineLinkElementName, nodeToAdd);
                this.customEventHandler.dispatchLinkShowAfterRotation(evn.animationName, svgLineLinkElementName, nodeToAdd);

            }.bind(this));


            // for balancing (start update balance factors and start balancing if it needed)
            svgLineDomElement.addEventListener("linkHiddenBeforeBalancing", function (evn)
            {
                //this.tree.updateBalancingFactors();

                let screenCoordinates = new ScreenCoordinates();
                let screenXCenterCoorditate = screenCoordinates.getScreenXCenter();
                let treeCoordinates = new TreeCoordinates(this.tree, screenXCenterCoorditate, 300);

                //this.onAlignTreeAfterBalancingTemplateMethod(evn, this.tree, treeCoordinates);

                // ???

                let nodeToCheck = evn.detail.nodeWhereFiredEvent;

                if (this.tree.treeViewState.isNodeToBeDeleted)
                {
                    if (!Object.is(nodeToCheck, this.tree.nodeToCheckRbtProperties))
                    {
                        return;
                    }

                    let siblingOfNodeToDelete = nodeToCheck;

                    //????
                    // add new entry to the html-table info about this.tree operation: rotate node - rotating
                    this.redBlackTreeOperation.onAddNewEntryToHtmlTableOnRotateNodes(nodeToCheck);


                    // sibling is black and has two red children
                    if (!this.tree.checkIsNodeRed(siblingOfNodeToDelete) &&
                        this.tree.checkIsNodeRed(siblingOfNodeToDelete.leftChild) && this.tree.checkIsNodeRed(siblingOfNodeToDelete.rightChild))
                    {
                        this.tree.rotateNodesWhenSiblingIsBlackAndHasTwoRedChildren(siblingOfNodeToDelete);
                    }
                    // sibling is black and one red child
                    else if (!this.tree.checkIsNodeRed(siblingOfNodeToDelete) && this.tree.isAnyChildIsRed(siblingOfNodeToDelete))
                    {
                        this.tree.rotateNodesWhenSiblingIsBlackAndHasOneRedChild(siblingOfNodeToDelete); // +++
                    }
                    // sibling is red
                    else if (this.tree.checkIsNodeRed(siblingOfNodeToDelete))
                    {
                        this.tree.rotateNodesWhenSiblingIsRed(siblingOfNodeToDelete);
                    }
                    else
                    {
                        throw new Error(`Incorrect type of rotation after deletion`);
                    }
                }
                else
                {
                    //????
                    // add new entry to the html-table info about this.tree operation: rotate node - rotating
                    this.redBlackTreeOperation.onAddNewEntryToHtmlTableOnRotateNodes(nodeToCheck);

                    this.tree.rotateNodesWhenUncleIsBlack(nodeToCheck);
                }

                treeCoordinates.alignTreeNodesAfterBalancing();


                this.onAlignTreeAfterBalancingTemplateMethod(evn, this.tree, treeCoordinates);

            }.bind(this)); // should not include { once: true }


            // ???????????????????????
            svgLineDomElement.addEventListener("linkShownAfterRotation", function (evn)
            {
                // recoloring
                // For Left Left Case [3.b (i)] and Right Right case [3.b (iii)], swap colors of grandparent and parent after rotations
                // For Left Right Case [3.b (ii)] and Right Left Case [3.b (iv)], swap colors of grandparent and inserted node after rotations

                let nodeToRecolorAfterRotation = evn.detail.nodeWhereFiredEvent;

                if (!Object.is(nodeToRecolorAfterRotation, this.tree.root)) // handle only on root (move to up block????)
                {
                    return;
                }

                if (this.tree.treeViewState.isNodeToBeDeleted)
                {
                    this.onRecolorAfterDeletionAndRotation(superContainerElementName, delayMsBeforeRecoloring);
                }
                else
                {
                    this.onRecolorAfterAdditionAndRotation(superContainerElementName, delayMsBeforeRecoloring);
                }

            }.bind(this)); // should not include { once: true }
        }


        // attach custom event handler when node relocated DUPLICATION of above !!!!!!!!!!!!!!!!!!!!


        if (nodeDomElement)
        {
            nodeDomElement.addEventListener("animationend", function (evn)
            {
                this.customEventHandler.dispatchNodeAdded(evn.animationName, superContainerElementName, nodeToAdd); // fire event "nodeAdded"

                this.customEventHandler.dispatchNodeAlignedByHeight(evn.animationName, superContainerElementName, nodeToAdd);

                this.customEventHandler.dispatchNodeAlignedByWidth(evn.animationName, superContainerElementName, nodeToAdd); // for balancing (fire event "alignedByWidth" to start update balance factors and start balancing if it needed)

                this.customEventHandler.dispatchLinkDrawnErasedBeforeAfterAlignmentByHeight(evn.animationName, superContainerElementName, nodeToAdd); // added ????

                this.customEventHandler.dispatchBalanceMovingNodeEnded(evn.animationName, superContainerElementName, nodeToAdd); // for balancing (fire event "balanceMovingNodeEnded" to start drawing

                // moved to svgDomElement
                //this.customEventHandler.dispatchLinkHiddenBeforeBalancing(evn.animationName, superContainerElementName, nodeToAdd); // for balancing (fire event "linkHiddenBeforeBalancing" to start moving nodes during balancing

                // moved to svgDomElement
                //this.customEventHandler.dispatchLinkShowAfterBalancing(evn.animationName, superContainerElementName, nodeToAdd); // for balancing (fire event "linkShownAfterBalancing" to signal that link drawn after balancing

                //this.onAnimationEndRelocationNode(evn, nodeToAdd);

            }.bind(this)); // this.tree is a global variable




            // for balancing
            nodeDomElement.addEventListener("alignedByWidth", function (evn)
            {
                // dispatch event to enable buttons and input
                this.customEventHandler.dispatchDisableGroupControls(true); // ???????

                // balancing
                //this.tree.updateBalancingFactors();
                //this.onAnimationHideAllLinksBeforeBalancingTemplateMethod(evn);

                if (this.tree.treeViewState.isNodeToBeDeleted)
                {
                    if (this.tree.currentAmountOfNodesInTree === 1)
                    {
                        // enable controls !!!!!!!!!!

                        this.onNodeToDeleteOrSuccessorIsRed(this.tree.successorOfDeletedNode, superContainerElementName, delayMsBeforeRecoloring);

                        this.onWhenPropertiesRestoredAfterDeletion();

                        return;
                    }


                    let nodeToFireEvent;

                    if (!this.tree.checkIsSuccessorDoubleBlackNode(this.tree.lastDeletedNode, this.tree.successorOfDeletedNode))
                    {
                        //????
                        //nodeToDelete is Red and successor is Black and successor is not null
                        if (this.tree.checkIsNodeRed(this.tree.lastDeletedNode) && this.tree.successorOfDeletedNode && !this.tree.checkIsNodeRed(this.tree.successorOfDeletedNode))
                        {
                            this.onNodeToDeleteIsRedAndSuccessorIsBlack(this.tree.lastDeletedNode, this.tree.successorOfDeletedNode, superContainerElementName, delayMsBeforeRecoloring)
                        }
                        else if (this.tree.checkIsNodeRed(this.tree.lastDeletedNode) && this.tree.successorOfDeletedNode && this.tree.checkIsNodeRed(this.tree.successorOfDeletedNode))
                        {
                            this.onNodeToDeleteIsRedAndSuccessorIsRed(this.tree.lastDeletedNode, this.tree.successorOfDeletedNode, superContainerElementName, delayMsBeforeRecoloring);
                        }
                        else
                        {
                            this.onNodeToDeleteOrSuccessorIsRed(this.tree.successorOfDeletedNode, superContainerElementName, delayMsBeforeRecoloring);
                        }

                        //this.onNodeToDeleteOrSuccessorIsRed(this.tree.lastDeletedNode, this.tree.successorOfDeletedNode, superContainerElementName, delayMsBeforeRecoloring);
                        //return;
                    }
                    else // if nodeToDelete is double black, then fire event on sibling of nodeToDelete
                    {
                        // if successor !== null, operate with sibling of successor before successor was moved on the place of deleted root
                        // if successor === null, operate with sibling of nodeToDelete

                        nodeToFireEvent = this.tree.initialSiblingToCheckAfterDeletion; //this.tree.getSiblingOf(this.tree.lastDeletedNode);
                    }

                    this.customEventHandler.dispatchStepFixingDeletionNodeEnded(superContainerElementName, this.tree.lastDeletedNode, nodeToFireEvent);
                }
                else
                {
                    this.customEventHandler.dispatchStepFixingAdditionNodeEnded(superContainerElementName, this.tree.lastAddedNode);
                }

            }.bind(this));


            nodeDomElement.addEventListener("stepFixingAdditionNodeEnded", function (evn)
            {
                let nodeWhereFiredEvent = evn.detail.nodeWhereFiredEvent;

                if (this.tree.isNeedToFixTreeAfterAddition(nodeWhereFiredEvent))
                {
                    if (Object.is(nodeWhereFiredEvent, this.tree.root))
                    {
                        // add new entry to the html-table info about this.tree operation: balance node - balancing...
                        this.redBlackTreeOperation.onAddNewEntryToHtmlTableOnFixRbtProperties(nodeWhereFiredEvent, this.treeOperationsStatuses.causeOfFixingRedBlackTreeProperties.nodeIsRootDuringAddititon);

                        this.onNodeIsRootDuringAddititon(nodeWhereFiredEvent, superContainerElementName, delayMsBeforeRecoloring);
                    }
                    else if (this.tree.isRedUncleOfNode(nodeWhereFiredEvent))
                    {
                        // add new entry to the html-table info about this.tree operation: balance node - balancing...
                        this.redBlackTreeOperation.onAddNewEntryToHtmlTableOnFixRbtProperties(nodeWhereFiredEvent, this.treeOperationsStatuses.causeOfFixingRedBlackTreeProperties.uncleNodeIsRedDuringAddititon);

                        this.onUncleNodeIsRedDuringAddititon(nodeWhereFiredEvent, superContainerElementName, delayMsBeforeRecoloring);
                    }
                    else if (!this.tree.isRedUncleOfNode(nodeWhereFiredEvent))
                    {
                        // add new entry to the html-table info about this.tree operation: balance node - balancing...
                        this.redBlackTreeOperation.onAddNewEntryToHtmlTableOnFixRbtProperties(nodeWhereFiredEvent, this.treeOperationsStatuses.causeOfRotationInRedBlackTree.uncleIsBlack);

                        this.onAnimationHideAllLinksBeforeBalancingTemplateMethod(evn);

                        let nodeToBeHeadAfterRotationDuringAddition = this.tree.getNodeToBeHeadAfterRotationDuringAddition(nodeWhereFiredEvent)

                        this.glowBordersDuringFixingRBTProperties(nodeToBeHeadAfterRotationDuringAddition);

                        nodeWhereFiredEvent.isNodeToBeRotatedWithAncestors = true; // set flag false when rotation will be ended!!!!!!!
                    }
                }
                else
                {
                    this.tree.nodeToCheckRbtProperties = null;

                    this.customEventHandler.dispatchDisableGroupControls(false); // ???????
                }

            }.bind(this));


            nodeDomElement.addEventListener("stepFixingDeletionNodeEnded", function (evn)
            {
                let nodeWhereFiredEvent = evn.detail.nodeWhereFiredEvent;

                let siblingOfNodeToDelete = nodeWhereFiredEvent;


                // if sibling is black and has at least one red children or
                // if sibling is red, then - hide links before rotation

                if ((!this.tree.checkIsNodeRed(siblingOfNodeToDelete) && this.tree.isAnyChildIsRed(siblingOfNodeToDelete)) ||
                    this.tree.checkIsNodeRed(siblingOfNodeToDelete))
                {
                    // 3.2
                    // (a): If sibling s is black and at least one of sibling’s children is red, perform rotation(s).
                    // Let the red child of s be r. This case can be divided in four subcases depending upon positions of s and r.

                    //       (i) Left Left Case (s is left child of its parent and r is left child of s or both children of s are red). This is mirror of right right case shown in below diagram.
                    //       (ii) Left Right Case(s is left child of its parent and r is right child).This is mirror of right left case shown in below diagram.
                    //       (iii) Right Right Case(s is right child of its parent and r is right child of s or both children of s are red)
                    //       (iv) Right Left Case (s is right child of its parent and r is left child of s)

                    // 3.2
                    //  (c): If sibling is red, perform a rotation to move old sibling up, recolor the old sibling and parent.The new sibling is always black(See the below diagram).This mainly converts the this.tree to black sibling case(by rotation) and leads to case(a) or(b). This case can be divided in two subcases.
                    //      (i) Left Case(s is left child of its parent).This is mirror of right right case shown in below diagram.We right rotate the parent p.
                    //      (ii) Right Case(s is right child of its parent).We left rotate the parent p.



                    let causeOfFixingRbtProperties = this.tree.checkIsNodeRed(siblingOfNodeToDelete) ?
                        this.treeOperationsStatuses.causeOfRotationInRedBlackTree.siblingIsRed :
                        this.treeOperationsStatuses.causeOfRotationInRedBlackTree.siblingIsBlackAndHasAtLeastOneRedChild;
                    this.redBlackTreeOperation.onAddNewEntryToHtmlTableOnFixRbtProperties(siblingOfNodeToDelete, causeOfFixingRbtProperties);


                    this.tree.nodeToCheckRbtProperties = siblingOfNodeToDelete;

                    this.onAnimationHideAllLinksBeforeBalancingTemplateMethod(evn);

                    nodeWhereFiredEvent.isNodeToBeRotatedWithAncestors = true; // set false when rotation will be ended!!!!!!!
                }
                // move clause to upper if!!!!!!!!
                else if (!this.tree.checkIsNodeRed(siblingOfNodeToDelete) && !this.tree.isAnyChildIsRed(siblingOfNodeToDelete))
                {
                    // ?????????
                    //this.onChangeNodeColor(this.tree.doubleBlackNode, true); // recolor black node to double black

                    // 3.2
                    //  (b): If sibling is black and its both children are black, perform recoloring, and recur for the parent if parent is black.
                    //       If parent was red, then we didn’t need to recur for parent, we can simply make it black (red + double black = single black)



                    //????
                    this.redBlackTreeOperation.onAddNewEntryToHtmlTableOnFixRbtProperties(siblingOfNodeToDelete, this.treeOperationsStatuses.causeOfFixingRedBlackTreeProperties.siblingIsBlackAndChildrenAreBlack);


                    // recolor. Repeat step if parent is black
                    this.onRecolorAfterDeletionWhenSiblingIsBlackAndChildrenAreBlack(siblingOfNodeToDelete, superContainerElementName, delayMsBeforeRecoloring);
                }

                // ??????
                this.glowBordersDuringFixingRBTProperties(siblingOfNodeToDelete);

            }.bind(this));


            // ??????????
            // for change color to double black
            nodeDomElement.addEventListener("findigNodeEnd", function (evn)
            {
                if (this.tree.treeViewState.isNodeToBeDeleted && Object.is(nodeToAdd, this.tree.doubleBlackNode))
                {
                    this.onChangeNodeColor(nodeToAdd, true);
                }

                // delete root when it is single node in RBT
                if (this.tree.treeViewState.isNodeToBeDeleted && this.tree.currentAmountOfNodesInTree === 0 && this.tree.treeViewState.wasFoundNodeToBeDeleted === true)
                {
                    this.customEventHandler.dispatchNodeDeleted(nodeToAdd);

                    // update html-table about this.tree operation: delete node - deleted (not deleted)
                    this.redBlackTreeOperation.onUpdateEntryInHtmlTableOnDeleteNode(nodeToAdd, nodeToAdd.value);

                    this.domUpdater.removeDomElement(nodeToAdd, "superContainer");

                    this.onWhenPropertiesRestoredAfterDeletion();
                }
                else if (this.tree.treeViewState.isNodeToBeDeleted && this.tree.treeViewState.wasFoundNodeToBeDeleted === false)
                {
                    let enteredValueOfNodeToBeDeleted = this.tree.treeViewState.enteredValueOfNodeToBeDeleted;
                    this.redBlackTreeOperation.onUpdateEntryInHtmlTableOnDeleteNode(null, enteredValueOfNodeToBeDeleted);

                    this.resetFlagsAfterDeletion();
                }
                else if (this.tree.treeViewState.isNodeToBeDeleted && this.tree.treeViewState.wasFoundNodeToBeDeleted === null)
                {
                    throw new Error("Incorrect flag during deletion");
                }

            }.bind(this));


            // for balancing
            nodeDomElement.addEventListener("balanceMovingNodeEnded", function (evn)
            {
                // Update entry to the html-table info about this.tree operation: rotate node - rotated
                this.redBlackTreeOperation.onUpdateEntryToHtmlTableOnRotateNodes();

                this.onAnimationShowAllLinksAfterBalancing(evn);

            }.bind(this));

        }


        this.addOnClickEventHandler(nodeToAdd); // from this class ????
    }



    // duplication of method onAnimationEndAddNode(...) except body of the "animationstart"
    onAnimationEndAddRangeOfNodes(nodeToAdd, treeCoordinates, sequenceStepsAdditionNode, preLastNode)
    {
        let superContainerElementName = sequenceStepsAdditionNode[0].stepAnimationObject.htmlNodeContainer[0].elementName;

        let nodeDomElement;

        if (this.domUpdater.isExistDomElement(nodeToAdd, superContainerElementName))
        {
            nodeDomElement = this.domUpdater.getDomElement(nodeToAdd, superContainerElementName);
        }

        if (nodeDomElement)
        {
            // ???
            nodeDomElement.addEventListener("nodeAdded", function (evn)
            {
                this.onAlignTreeByWidth(evn, this.tree, treeCoordinates);

                // add info about this.tree operation add node: added
                this.redBlackTreeOperation.onUpdateEntryInHtmlTableOnAddNode(nodeToAdd);

            }.bind(this),

                { once: true }); // this.tree is a global variable


            nodeDomElement.addEventListener("nodeDeleted", function (evn)
            {
                this.onAlignTreeByWidth(evn, this.tree, treeCoordinates);

            }.bind(this),

                { once: true }); // this.tree is a global variable


            // ????????
            nodeDomElement.addEventListener("alignedByHeight", function (evn)
            {
                this.onAnimationEndRelocationNode(evn, nodeToAdd);

            }.bind(this));
        }

        let svgLineLinkElementName = "svgLineLink";

        let delayMsBeforeRecoloring = 1000; // 1000 ms

        let svgLineDomElement = this.domUpdater.getDomElement(nodeToAdd, svgLineLinkElementName);

        if (svgLineDomElement)
        {
            svgLineDomElement.addEventListener("animationstart", function (evn)
            {
                //this.glowBorderAfterNodeAddition(evn, nodeToAdd, sequenceStepsAdditionNode, preLastNode);
                // the only difference between method onAnimationEndAddNode(...)
                this.glowBorderAfterAdditionRangeOfNodes(evn, nodeToAdd, sequenceStepsAdditionNode, preLastNode); // + tested for AddRange()

            }.bind(this),

                { once: true });


            svgLineDomElement.addEventListener("animationend", function (evn)
            {
                this.customEventHandler.dispatchSVGLinkErasedBeforeAlignmentByHeight(evn.animationName, svgLineLinkElementName, nodeToAdd);

                this.customEventHandler.dispatchSVGLinkDrawnAfterAlignmentByHeight(evn.animationName, svgLineLinkElementName, nodeToAdd);

                //this.customEventHandler.dispatchLinkHiddenBeforeBalancing(evn.animationName, svgLineLinkElementName, nodeToAdd);
                this.customEventHandler.dispatchLinkHiddenBeforeRotation(evn.animationName, svgLineLinkElementName, nodeToAdd);


                //this.customEventHandler.dispatchLinkShowAfterBalancing(evn.animationName, svgLineLinkElementName, nodeToAdd);
                this.customEventHandler.dispatchLinkShowAfterRotation(evn.animationName, svgLineLinkElementName, nodeToAdd);

            }.bind(this));


            // for balancing (start update balance factors and start balancing if it needed)
            svgLineDomElement.addEventListener("linkHiddenBeforeBalancing", function (evn)
            {
                //this.tree.updateBalancingFactors();

                let screenCoordinates = new ScreenCoordinates();
                let screenXCenterCoorditate = screenCoordinates.getScreenXCenter();
                let treeCoordinates = new TreeCoordinates(this.tree, screenXCenterCoorditate, 300);

                //this.onAlignTreeAfterBalancingTemplateMethod(evn, this.tree, treeCoordinates);

                // ???

                let nodeToCheck = evn.detail.nodeWhereFiredEvent;

                if (this.tree.treeViewState.isNodeToBeDeleted)
                {
                    if (!Object.is(nodeToCheck, this.tree.nodeToCheckRbtProperties))
                    {
                        return;
                    }

                    let siblingOfNodeToDelete = nodeToCheck; // ??????  //this.tree.getSiblingOf(this.tree.lastDeletedNode);

                    //????
                    // add new entry to the html-table info about this.tree operation: rotate node - rotating
                    this.redBlackTreeOperation.onAddNewEntryToHtmlTableOnRotateNodes(nodeToCheck);


                    // sibling is black and has two red children
                    if (!this.tree.checkIsNodeRed(siblingOfNodeToDelete) &&
                        this.tree.checkIsNodeRed(siblingOfNodeToDelete.leftChild) && this.tree.checkIsNodeRed(siblingOfNodeToDelete.rightChild))
                    {
                        this.tree.rotateNodesWhenSiblingIsBlackAndHasTwoRedChildren(siblingOfNodeToDelete);
                    }
                    // sibling is black and one red child
                    else if (!this.tree.checkIsNodeRed(siblingOfNodeToDelete) && this.tree.isAnyChildIsRed(siblingOfNodeToDelete))
                    {
                        this.tree.rotateNodesWhenSiblingIsBlackAndHasOneRedChild(siblingOfNodeToDelete); // +++
                    }
                    // sibling is red
                    else if (this.tree.checkIsNodeRed(siblingOfNodeToDelete))
                    {
                        this.tree.rotateNodesWhenSiblingIsRed(siblingOfNodeToDelete);
                    }
                    else
                    {
                        throw new Error(`Incorrect type of rotation after deletion`);
                    }
                }
                else
                {
                    //????
                    // add new entry to the html-table info about this.tree operation: rotate node - rotating
                    this.redBlackTreeOperation.onAddNewEntryToHtmlTableOnRotateNodes(nodeToCheck);

                    this.tree.rotateNodesWhenUncleIsBlack(nodeToCheck);
                }

                treeCoordinates.alignTreeNodesAfterBalancing();


                this.onAlignTreeAfterBalancingTemplateMethod(evn, this.tree, treeCoordinates);

            }.bind(this)); // should not include { once: true }


            // ???????????????????????
            svgLineDomElement.addEventListener("linkShownAfterRotation", function (evn)
            {
                // recoloring
                // For Left Left Case [3.b (i)] and Right Right case [3.b (iii)], swap colors of grandparent and parent after rotations
                // For Left Right Case [3.b (ii)] and Right Left Case [3.b (iv)], swap colors of grandparent and inserted node after rotations

                let nodeToRecolorAfterRotation = evn.detail.nodeWhereFiredEvent;

                if (!Object.is(nodeToRecolorAfterRotation, this.tree.root)) // handle only on root (move to up block????)
                {
                    return;
                }

                if (this.tree.treeViewState.isNodeToBeDeleted)
                {
                    this.onRecolorAfterDeletionAndRotation(superContainerElementName, delayMsBeforeRecoloring);
                }
                else
                {
                    this.onRecolorAfterAdditionAndRotation(superContainerElementName, delayMsBeforeRecoloring);
                }

            }.bind(this)); // should not include { once: true }
        }


        // attach custom event handler when node relocated DUPLICATION of above !!!!!!!!!!!!!!!!!!!!


        if (nodeDomElement)
        {
            nodeDomElement.addEventListener("animationend", function (evn)
            {
                this.customEventHandler.dispatchNodeAdded(evn.animationName, superContainerElementName, nodeToAdd); // fire event "nodeAdded"

                this.customEventHandler.dispatchNodeAlignedByHeight(evn.animationName, superContainerElementName, nodeToAdd);

                this.customEventHandler.dispatchNodeAlignedByWidth(evn.animationName, superContainerElementName, nodeToAdd); // for balancing (fire event "alignedByWidth" to start update balance factors and start balancing if it needed)

                this.customEventHandler.dispatchLinkDrawnErasedBeforeAfterAlignmentByHeight(evn.animationName, superContainerElementName, nodeToAdd); // added ????

                this.customEventHandler.dispatchBalanceMovingNodeEnded(evn.animationName, superContainerElementName, nodeToAdd); // for balancing (fire event "balanceMovingNodeEnded" to start drawing

            }.bind(this)); // this.tree is a global variable



            // for balancing
            nodeDomElement.addEventListener("alignedByWidth", function (evn)
            {
                // dispatch event to enable buttons and input
                this.customEventHandler.dispatchDisableGroupControls(true); // ???????

                // balancing
                //this.tree.updateBalancingFactors();
                //this.onAnimationHideAllLinksBeforeBalancingTemplateMethod(evn);

                if (this.tree.treeViewState.isNodeToBeDeleted)
                {
                    if (this.tree.currentAmountOfNodesInTree === 1)
                    {
                        // enable controls !!!!!!!!!!

                        this.onNodeToDeleteOrSuccessorIsRed(this.tree.successorOfDeletedNode, superContainerElementName, delayMsBeforeRecoloring);

                        this.onWhenPropertiesRestoredAfterDeletion();

                        return;
                    }


                    let nodeToFireEvent;

                    if (!this.tree.checkIsSuccessorDoubleBlackNode(this.tree.lastDeletedNode, this.tree.successorOfDeletedNode))
                    {
                        //????
                        //nodeToDelete is Red and successor is Black and successor is not null
                        if (this.tree.checkIsNodeRed(this.tree.lastDeletedNode) && this.tree.successorOfDeletedNode && !this.tree.checkIsNodeRed(this.tree.successorOfDeletedNode))
                        {
                            this.onNodeToDeleteIsRedAndSuccessorIsBlack(this.tree.lastDeletedNode, this.tree.successorOfDeletedNode, superContainerElementName, delayMsBeforeRecoloring)
                        }
                        else if (this.tree.checkIsNodeRed(this.tree.lastDeletedNode) && this.tree.successorOfDeletedNode && this.tree.checkIsNodeRed(this.tree.successorOfDeletedNode))
                        {
                            this.onNodeToDeleteIsRedAndSuccessorIsRed(this.tree.lastDeletedNode, this.tree.successorOfDeletedNode, superContainerElementName, delayMsBeforeRecoloring);
                        }
                        else
                        {
                            this.onNodeToDeleteOrSuccessorIsRed(this.tree.successorOfDeletedNode, superContainerElementName, delayMsBeforeRecoloring);
                        }

                        //this.onNodeToDeleteOrSuccessorIsRed(this.tree.lastDeletedNode, this.tree.successorOfDeletedNode, superContainerElementName, delayMsBeforeRecoloring);
                        //return;
                    }
                    else // if nodeToDelete is double black, then fire event on sibling of nodeToDelete
                    {
                        // if successor !== null, operate with sibling of successor before successor was moved on the place of deleted root
                        // if successor === null, operate with sibling of nodeToDelete

                        nodeToFireEvent = this.tree.initialSiblingToCheckAfterDeletion; //this.tree.getSiblingOf(this.tree.lastDeletedNode);
                    }

                    this.customEventHandler.dispatchStepFixingDeletionNodeEnded(superContainerElementName, this.tree.lastDeletedNode, nodeToFireEvent);
                }
                else
                {
                    this.customEventHandler.dispatchStepFixingAdditionNodeEnded(superContainerElementName, this.tree.lastAddedNode);
                }

            }.bind(this));


            nodeDomElement.addEventListener("stepFixingAdditionNodeEnded", function (evn)
            {
                let nodeWhereFiredEvent = evn.detail.nodeWhereFiredEvent;

                if (this.tree.isNeedToFixTreeAfterAddition(nodeWhereFiredEvent))
                {
                    if (Object.is(nodeWhereFiredEvent, this.tree.root))
                    {
                        // add new entry to the html-table info about this.tree operation: balance node - balancing...
                        this.redBlackTreeOperation.onAddNewEntryToHtmlTableOnFixRbtProperties(nodeWhereFiredEvent, this.treeOperationsStatuses.causeOfFixingRedBlackTreeProperties.nodeIsRootDuringAddititon);

                        this.onNodeIsRootDuringAddititon(nodeWhereFiredEvent, superContainerElementName, delayMsBeforeRecoloring);
                    }
                    else if (this.tree.isRedUncleOfNode(nodeWhereFiredEvent))
                    {
                        // add new entry to the html-table info about this.tree operation: balance node - balancing...
                        this.redBlackTreeOperation.onAddNewEntryToHtmlTableOnFixRbtProperties(nodeWhereFiredEvent, this.treeOperationsStatuses.causeOfFixingRedBlackTreeProperties.uncleNodeIsRedDuringAddititon);

                        this.onUncleNodeIsRedDuringAddititon(nodeWhereFiredEvent, superContainerElementName, delayMsBeforeRecoloring);
                    }
                    else if (!this.tree.isRedUncleOfNode(nodeWhereFiredEvent))
                    {
                        // add new entry to the html-table info about this.tree operation: balance node - balancing...
                        this.redBlackTreeOperation.onAddNewEntryToHtmlTableOnFixRbtProperties(nodeWhereFiredEvent, this.treeOperationsStatuses.causeOfRotationInRedBlackTree.uncleIsBlack);

                        this.onAnimationHideAllLinksBeforeBalancingTemplateMethod(evn);

                        let nodeToBeHeadAfterRotationDuringAddition = this.tree.getNodeToBeHeadAfterRotationDuringAddition(nodeWhereFiredEvent)

                        this.glowBordersDuringFixingRBTProperties(nodeToBeHeadAfterRotationDuringAddition);

                        nodeWhereFiredEvent.isNodeToBeRotatedWithAncestors = true; // set flag false when rotation will be ended!!!!!!!
                    }
                }
                else
                {
                    this.tree.nodeToCheckRbtProperties = null;

                    // Uses after range of nodes was added. Event should be fired only once on the last node from range of nodes to add
                    //(differs by this line from method onAnimationEndAddNode(...))
                    this.customEventHandler.dispatchTreePropertiesCompliedAfterAdditionRangeOfNodes(superContainerElementName, nodeToAdd);

                    this.customEventHandler.dispatchDisableGroupControls(false); // ???????
                }

            }.bind(this));


            nodeDomElement.addEventListener("stepFixingDeletionNodeEnded", function (evn)
            {
                let nodeWhereFiredEvent = evn.detail.nodeWhereFiredEvent;

                let siblingOfNodeToDelete = nodeWhereFiredEvent;


                // if sibling is black and has at least one red children or
                // if sibling is red, then - hide links before rotation

                if ((!this.tree.checkIsNodeRed(siblingOfNodeToDelete) && this.tree.isAnyChildIsRed(siblingOfNodeToDelete)) ||
                    this.tree.checkIsNodeRed(siblingOfNodeToDelete))
                {
                    // 3.2
                    // (a): If sibling s is black and at least one of sibling’s children is red, perform rotation(s).
                    // Let the red child of s be r. This case can be divided in four subcases depending upon positions of s and r.

                    //       (i) Left Left Case (s is left child of its parent and r is left child of s or both children of s are red). This is mirror of right right case shown in below diagram.
                    //       (ii) Left Right Case(s is left child of its parent and r is right child).This is mirror of right left case shown in below diagram.
                    //       (iii) Right Right Case(s is right child of its parent and r is right child of s or both children of s are red)
                    //       (iv) Right Left Case (s is right child of its parent and r is left child of s)

                    // 3.2
                    //  (c): If sibling is red, perform a rotation to move old sibling up, recolor the old sibling and parent.The new sibling is always black(See the below diagram).This mainly converts the this.tree to black sibling case(by rotation) and leads to case(a) or(b). This case can be divided in two subcases.
                    //      (i) Left Case(s is left child of its parent).This is mirror of right right case shown in below diagram.We right rotate the parent p.
                    //      (ii) Right Case(s is right child of its parent).We left rotate the parent p.



                    let causeOfFixingRbtProperties = this.tree.checkIsNodeRed(siblingOfNodeToDelete) ?
                        this.treeOperationsStatuses.causeOfRotationInRedBlackTree.siblingIsRed :
                        this.treeOperationsStatuses.causeOfRotationInRedBlackTree.siblingIsBlackAndHasAtLeastOneRedChild;
                    this.redBlackTreeOperation.onAddNewEntryToHtmlTableOnFixRbtProperties(siblingOfNodeToDelete, causeOfFixingRbtProperties);


                    this.tree.nodeToCheckRbtProperties = siblingOfNodeToDelete;

                    this.onAnimationHideAllLinksBeforeBalancingTemplateMethod(evn);

                    nodeWhereFiredEvent.isNodeToBeRotatedWithAncestors = true; // set false when rotation will be ended!!!!!!!
                }
                // move clause to upper if!!!!!!!!
                else if (!this.tree.checkIsNodeRed(siblingOfNodeToDelete) && !this.tree.isAnyChildIsRed(siblingOfNodeToDelete))
                {
                    // ?????????
                    //this.onChangeNodeColor(this.tree.doubleBlackNode, true); // recolor black node to double black

                    // 3.2
                    //  (b): If sibling is black and its both children are black, perform recoloring, and recur for the parent if parent is black.
                    //       If parent was red, then we didn’t need to recur for parent, we can simply make it black (red + double black = single black)



                    //????
                    this.redBlackTreeOperation.onAddNewEntryToHtmlTableOnFixRbtProperties(siblingOfNodeToDelete, this.treeOperationsStatuses.causeOfFixingRedBlackTreeProperties.siblingIsBlackAndChildrenAreBlack);


                    // recolor. Repeat step if parent is black
                    this.onRecolorAfterDeletionWhenSiblingIsBlackAndChildrenAreBlack(siblingOfNodeToDelete, superContainerElementName, delayMsBeforeRecoloring);
                }

                // ??????
                this.glowBordersDuringFixingRBTProperties(siblingOfNodeToDelete);

            }.bind(this));


            // ??????????
            // for change color to double black
            nodeDomElement.addEventListener("findigNodeEnd", function (evn)
            {
                if (this.tree.treeViewState.isNodeToBeDeleted && Object.is(nodeToAdd, this.tree.doubleBlackNode))
                {
                    this.onChangeNodeColor(nodeToAdd, true);
                }

                // delete root when it is single node in RBT
                if (this.tree.treeViewState.isNodeToBeDeleted && this.tree.currentAmountOfNodesInTree === 0 && this.tree.treeViewState.wasFoundNodeToBeDeleted === true)
                {
                    this.customEventHandler.dispatchNodeDeleted(nodeToAdd);

                    // update html-table about this.tree operation: delete node - deleted (not deleted)
                    this.redBlackTreeOperation.onUpdateEntryInHtmlTableOnDeleteNode(nodeToAdd, nodeToAdd.value);

                    this.domUpdater.removeDomElement(nodeToAdd, "superContainer");

                    this.onWhenPropertiesRestoredAfterDeletion();
                }
                else if (this.tree.treeViewState.isNodeToBeDeleted && this.tree.treeViewState.wasFoundNodeToBeDeleted === false)
                {
                    let enteredValueOfNodeToBeDeleted = this.tree.treeViewState.enteredValueOfNodeToBeDeleted;
                    this.redBlackTreeOperation.onUpdateEntryInHtmlTableOnDeleteNode(null, enteredValueOfNodeToBeDeleted);

                    this.resetFlagsAfterDeletion();
                }
                else if (this.tree.treeViewState.isNodeToBeDeleted && this.tree.treeViewState.wasFoundNodeToBeDeleted === null)
                {
                    throw new Error("Incorrect flag during deletion");
                }

            }.bind(this));


            // for balancing
            nodeDomElement.addEventListener("balanceMovingNodeEnded", function (evn)
            {
                // Update entry to the html-table info about this.tree operation: rotate node - rotated
                this.redBlackTreeOperation.onUpdateEntryToHtmlTableOnRotateNodes();

                this.onAnimationShowAllLinksAfterBalancing(evn);

            }.bind(this));

        }


        this.addOnClickEventHandler(nodeToAdd); // from this class ????
    }


    onClickNode(clickedNode)
    {
        super.onClickNode(clickedNode);
        this.onChangeColorWhenRedOrBlackNodeClicked(clickedNode); // to add red or black color for node
    }


    onHideClickNode()
    {
        let valueOfNodeToHideClick = this.tree.treeViewState.lastClickedNode.value;

        if (!valueOfNodeToHideClick)
        {
            throw new Error("Incorrect value of the node to hide click");
        }

        super.onHideClickNode();

        let nodeToHideClick = this.tree.findNode(valueOfNodeToHideClick);

        this.onChangeColorWhenRedOrBlackNodeHideClick(nodeToHideClick);
    }


    // reimplementation in this class
    addOnClickEventHandler(nodeToAdd)
    {
        let nodeDomElement = this.domUpdater.getDomElement(nodeToAdd, "superContainer");

        if (nodeDomElement)
        {
            nodeDomElement.addEventListener("click", function (evn)
            {
                this.onClickNode(nodeToAdd);

                // ???
                this.customEventHandlerHtmlTable.dispatchUpdateTableNodeInfo(this.tree);

                // ???
                this.customEventHandlerHtmlTable.dispatchUpdateTableTreeCharacteristics(false, this.tree);

                if (this.tree.treeViewState.lastClickedNode)
                {
                    this.onChangeColorWhenRedOrBlackNodeClicked(nodeToAdd);
                }
                else
                {
                    this.onChangeColorWhenRedOrBlackNodeHideClick(nodeToAdd);
                }

            }.bind(this));
        }
    }


    onAlignTreeAfterBalancingTemplateMethod(evn, tree, treeCoordinates)
    {
        // 1
        if (!this.isAlignTreeAfterBalancing(evn))
        {
            return;
        }

        let nodeToCheck = evn.detail.nodeWhereFiredEvent;


        // moved to handler body

        //this.tree.rotateNodesWhenUncleIsBlack(nodeToCheck);

        //treeCoordinates.alignTreeNodesAfterBalancing();


        // 5 from base class AVL
        this.onAlignTreeAfterBalancing(evn, this.tree, treeCoordinates);


        // 6
        this.tree.isNeedAlignmentByWidth = false; // ??? after balancing this.tree is deemed as aligned by width

        nodeToCheck.isNodeToBeRotatedWithAncestors = false; // ???
    }


    // private
    // check is event and other clauses allow to invoke onAlignTreeAfterBalancing()
    isAlignTreeAfterBalancing(evn)
    {
        // ??????????????????????????????????????????????????????????????????
        if (evn.detail.customEventName !== "linkHiddenBeforeBalancing" || this.tree.treeLevels <= 2 /* || !this.tree.nodeToCheckBalance.nodeToCheck */)
        {
            return false;
        }

        return true;
    }


    // For balancing
    // Template method to hide or show ALL links of all nodes before after balancing
    onAnimationHideAllLinksBeforeBalancingTemplateMethod(evn)
    {
        // 1

        //if (evn.detail.customEventName !== "alignedByWidth" || this.tree.treeLevels <= 2 || !this.tree.nodeToCheckBalance.nodeToCheck)
        //{
        //    return;
        //}

        if (!this.isAnimateHideAllLinksBeforeBalancing(evn))
        {
            return;
        }


        // ????????????????????????????????????????????????????????????
        // 2

        //let unbalancedNodes = this.tree.findUnbalancedHeadMidLowestNodes();

        //if (!unbalancedNodes)
        //{
        //    return;
        //}


        // ????????????????????????????????????????????????????????????
        // 3

        if (this.tree.isLinkContainerShown === false)
        {
            return;
        }


        // ????????????????????????????????????????????????????????????
        // 4
        // this.customEventHandler.dispatchDisableGroupControls(true); // ??????


        // 5

        //let allNodesByLevels = this.tree.getAllNodesByLevels();

        //for (let currentLevel = 1; currentLevel < allNodesByLevels.length; currentLevel++) // root node is omitted
        //{

        //    for (let n = 0; n < allNodesByLevels[currentLevel].length; n++)
        //    {
        //        let nodeToShowHideLink = allNodesByLevels[currentLevel][n];

        //        this.onAnimationLinkBeforeAfterBalancing(evn, nodeToShowHideLink, true);
        //    }
        //}


        // from base class AVL
        this.onAnimationHideAllLinksBeforeBalancing(evn);

    }


    // private
    // check is event and other clauses alow to invoke method onAnimationHideAllLinksBeforeBalancing(evn)
    isAnimateHideAllLinksBeforeBalancing(evn)
    {
        if (this.tree.treeLevels <= 2)
        {
            return false;
        }

        return evn.detail.customEventName === "stepFixingAdditionNodeEnded" || evn.detail.customEventName === "stepFixingDeletionNodeEnded";
    }



    // change the color of node to opposite
    onChangeNodeColor(nodeToAnimate, isNodeToAnimateShouldBecomeDoubleBlack)
    {
        let patternStepAnimationChangeNodeColor = this.redBlackTreeAnimationStepConfiguration.getPatternStepAnimationChangeNodeColor();

        let additionalStyleClasses = patternStepAnimationChangeNodeColor[0].additionalStyleClasses;

        let elementNameToApplyStyle = additionalStyleClasses[0].elementNameToApplyStyle;

        let styleOfRedNode = this.domUpdater.getStyleToApplyOfAdditionalStyleClasses(additionalStyleClasses, elementNameToApplyStyle, "applyToNodeThatHaveToBeRed", true);
        let styleOfBlackNode = this.domUpdater.getStyleToApplyOfAdditionalStyleClasses(additionalStyleClasses, elementNameToApplyStyle, "applyToNodeThatHaveToBeRed", false);

        // ?????
        let styleOfDoubleBlackNode = this.domUpdater.getStyleToApplyOfAdditionalStyleClasses(additionalStyleClasses, elementNameToApplyStyle, "applyToNodeThatHaveToBeRed", null);

        if (isNodeToAnimateShouldBecomeDoubleBlack === true)
        {
            this.domUpdater.updateStyleClass(nodeToAnimate, elementNameToApplyStyle, styleOfDoubleBlackNode);

            return;
        }


        /////////
        let currentStyleOfInsideBorderElement = this.domUpdater.getAttributeDomElement(nodeToAnimate, elementNameToApplyStyle, "class");

        let newStyleInsideBorderToApply = '';

        if (currentStyleOfInsideBorderElement === styleOfRedNode)
        {
            newStyleInsideBorderToApply = styleOfBlackNode;
        }
        else if (currentStyleOfInsideBorderElement === styleOfBlackNode)
        {
            newStyleInsideBorderToApply = styleOfRedNode;
        }
        else if (currentStyleOfInsideBorderElement === styleOfDoubleBlackNode)
        {
            newStyleInsideBorderToApply = styleOfBlackNode;
        }
        else
        {
            throw new Error(`Incorrect style to apply to html-element '${elementNameToApplyStyle}'`);
        }

        this.domUpdater.updateStyleClass(nodeToAnimate, elementNameToApplyStyle, newStyleInsideBorderToApply);
    }


    // private
    // change color from red to black OR from black to red
    // Changing the color from black to double black is made by passing true into the method onChangeNodeColor(nodeToAnimate, true);
    changeNodeColorTemplateMethod(nodeToAnimate)
    {
        nodeToAnimate.changeNodeColorToOpposite();

        this.onChangeNodeColor(nodeToAnimate, false);

        return nodeToAnimate;
    }


    // restore node color double black node to black node
    restoreNodeColorFromDoubleBlackToBlack()
    {
        if (this.tree.doubleBlackNode !== null && !Object.is(this.tree.doubleBlackNode, this.tree.lastDeletedNode))
        {
            this.onChangeNodeColor(this.tree.doubleBlackNode, false);
        }
    }


    // when added node is root (to fix RBT properties after addition)
    onNodeIsRootDuringAddititon(nodeToCheckAfterAddition, superContainerElementName, delayMsBeforeRecoloring)
    {
        this.tree.addToListOfNodesToRecolor(nodeToCheckAfterAddition); // nodeToCheckAfterAddition is root

        this.tree.nodeToCheckRbtProperties = null; //nodeToCheckAfterAddition;  // set null after checking +++

        this.onAbstractRecoloringNodes(superContainerElementName, delayMsBeforeRecoloring, true); // set false when after deletion
    }


    // when added node x (or node assigned to be x) is RED (to fix RBT properties after addition)
    onUncleNodeIsRedDuringAddititon(nodeToCheckAfterAddition, superContainerElementName, delayMsBeforeRecoloring)
    {
        let uncleNode = this.tree.getUncleOfNode(nodeToCheckAfterAddition);
        let parentNode = nodeToCheckAfterAddition.parentNode;
        let grandParentNode = this.tree.getGrandParentNode(nodeToCheckAfterAddition);

        this.tree.addToListOfNodesToRecolor(parentNode);
        this.tree.addToListOfNodesToRecolor(uncleNode);
        this.tree.addToListOfNodesToRecolor(grandParentNode);

        this.tree.nodeToCheckRbtProperties = grandParentNode;

        this.onAbstractRecoloringNodes(superContainerElementName, delayMsBeforeRecoloring, true); // set false when after deletion

        //setTimeout(() =>
        //{
        //    this.changeNodeColorTemplateMethod(parentNode, superContainerElementName);
        //    this.changeNodeColorTemplateMethod(uncleNode, superContainerElementName);
        //    this.changeNodeColorTemplateMethod(grandParentNode, superContainerElementName);

        //    this.customEventHandler.dispatchStepFixingAdditionNodeEnded(superContainerElementName, grandParentNode);

        //}, delayMsBeforeRecoloring);

    }


    // change color of node after addition and rotation
    onRecolorAfterAdditionAndRotation(superContainerElementName, delayMsBeforeRecoloring)
    {
        // ????????
        //this.tree.nodeToCheckRbtProperties = nodeToRecolorAfterRotation;

        this.onAbstractRecoloringNodes(superContainerElementName, delayMsBeforeRecoloring, true); // set false when after deletion


        //setTimeout(() =>
        //{
        //    this.changeNodeColorTemplateMethod(nodeToRecolorAfterRotation);

        //    //this.customEventHandler.dispatchStepFixingAdditionNodeEnded(superContainerElementName, nodeToRecolorAfterRotation);

        //}, delayMsBeforeRecoloring);
    }



    // To fix RBT properties after DELETION


    // Recoloring after deletion
    onRecolorAfterDeletionRedRoot(superContainerElementName, delayMsBeforeRecoloring)
    {
        this.tree.nodeToCheckRbtProperties = null; // ????

        this.tree.addToListOfNodesToRecolor(this.tree.root); // ????

        this.onAbstractRecoloringNodes(superContainerElementName, delayMsBeforeRecoloring, false);
    }


    // Recoloring after deletion
    onNodeToDeleteOrSuccessorIsRed(successor, superContainerElementName, delayMsBeforeRecoloring)
    {
        this.tree.nodeToCheckRbtProperties = null; // ????

        if (successor && this.tree.checkIsNodeRed(successor))
        {
            this.tree.addToListOfNodesToRecolor(successor);
        }

        this.onAbstractRecoloringNodes(superContainerElementName, delayMsBeforeRecoloring, false); // set false when do fixing after deletion
    }


    // ?????????
    // For deletion

    // Run before operations on fix RBT properties - we only recolor successor after nodeToDelete was replaced with successor
    // i.e. black successor is recolored in red color that was in nodeToDelete then there examining node that
    // was a sibling of successor before moving successor on the place of nodeToDelete
    onNodeToDeleteIsRedAndSuccessorIsBlack(nodeToDelete, successor, superContainerElementName, delayMsBeforeRecoloring)
    {
        if (!successor || !this.tree.treeViewState.isNodeToBeDeleted || !nodeToDelete.isNodeRed || successor.isNodeRed)
        {
            return;
        }

        this.tree.addToListOfNodesToRecolor(successor); // recolor successor in red (in color of nodeToDelete)

        this.tree.nodeToCheckRbtProperties = this.tree.initialSiblingToCheckAfterDeletion; // check RBT properties on sibling of the successor (successor before moving it on the place of nodeToDelete)

        this.onAbstractRecoloringNodes(superContainerElementName, delayMsBeforeRecoloring, false); // set false when do fixing after deletion
    }


    // ?????????
    // For deletion

    // Run during checking RBT properties when nodeToDelete was red and successor is red
    // No need any recoloring or rotation in this case
    onNodeToDeleteIsRedAndSuccessorIsRed(nodeToDelete, successor, superContainerElementName, delayMsBeforeRecoloring)
    {
        if (!this.tree.treeViewState.isNodeToBeDeleted || !nodeToDelete.isNodeRed || !successor || !successor.isNodeRed)
        {
            return;
        }

        this.tree.nodeToCheckRbtProperties = null;

        // list of nodes to recolor is always empty in this case
        this.onAbstractRecoloringNodes(superContainerElementName, delayMsBeforeRecoloring, false); // set false when do fixing after deletion
    }


    // ??????
    // Recoloring after deletion (and after rotation)
    //onRecolorAfterDeletionAndRotationWhenSiblingWasBlackWithAtLeastOneRedChild(superContainerElementName, delayMsBeforeRecoloring)
    onRecolorAfterDeletionAndRotation(superContainerElementName, delayMsBeforeRecoloring)
    {
        //this.tree.nodeToCheckRbtProperties = sibling;

        this.onAbstractRecoloringNodes(superContainerElementName, delayMsBeforeRecoloring, false); // set false when after deletion
    }


    // Recoloring after deletion (and after rotation)
    onRecolorAfterDeletionWhenSiblingIsBlackAndChildrenAreBlack(sibling, superContainerElementName, delayMsBeforeRecoloring)
    {
        //If the double black's sibling node is also a black node and its child nodes are also black in color, follow the steps below −

        // Recolor its parent to black (if the parent is a red node, it becomes black; if the parent is already a black node, it becomes double black)

        // Recolor the parent's sibling with red

        // If double black node still exists, we apply other cases

        if (this.tree.checkIsNodeRed(sibling.parentNode))
        {
            this.tree.addToListOfNodesToRecolor(sibling.parentNode);

            this.tree.nodeToCheckRbtProperties = null; // no need further examination
        }
        else
        {
            // next node to examine is a sibling of sibling.parentNode
            //this.tree.nodeToCheckRbtProperties = this.tree.getSiblingOf(sibling.parentNode); // double black becomes sibling.parentNode, but examining is SIBLING of double black

            // ???
            this.restoreNodeColorFromDoubleBlackToBlack(); // restore previous double black node to black node
            // ???
            this.tree.doubleBlackNode = sibling.parentNode;

            this.onChangeNodeColor(this.tree.doubleBlackNode, true); // recolor black node to double black

            this.setNodeToCheckAfterDeletionWhenSiblingIsBlackAndChildrenAreBlackAndParentIsBlack(sibling.parentNode); // double black becomes sibling.parentNode, but examining is SIBLING of double black

            // ??????
            this.hideGlowingBorderForPreviouslyFoundNode();
        }

        this.tree.addToListOfNodesToRecolor(sibling); // ????

        this.onAbstractRecoloringNodes(superContainerElementName, delayMsBeforeRecoloring, false); // set false when after deletion
    }


    // For deletion
    setNodeToCheckAfterDeletionWhenSiblingIsBlackAndChildrenAreBlackAndParentIsBlack(node)
    {
        let nodeToCheckAfterDeletionWhenSiblingIsBlackAndChildrenAreBlack = null;

        if (Object.is(node, this.tree.root))
        {
            this.tree.nodeToCheckRbtProperties = null;
        }
        else
        {
            nodeToCheckAfterDeletionWhenSiblingIsBlackAndChildrenAreBlack = this.tree.getSiblingOf(node);

            this.tree.nodeToCheckRbtProperties = nodeToCheckAfterDeletionWhenSiblingIsBlackAndChildrenAreBlack;
        }

        return nodeToCheckAfterDeletionWhenSiblingIsBlackAndChildrenAreBlack;
    }


    // For deletion
    // Restore flags after deletion when RBT properties were restored
    onWhenPropertiesRestoredAfterDeletion()
    {
        this.restoreNodeColorFromDoubleBlackToBlack();
        this.resetFlagsAfterDeletion();
    }


    resetFlagsAfterDeletion()
    {
        this.tree.treeViewState.isNodeToBeDeleted = false;
        this.tree.treeViewState.wasFoundNodeToBeDeleted = null;
        this.tree.treeViewState.enteredValueOfNodeToBeDeleted = null;
        this.tree.successorOfDeletedNode = null;
        this.tree.doubleBlackNode = null;
    }


    onAbstractRecoloringNodes(superContainerElementName, delayMsBeforeRecoloring, isAfterNodeAddition)
    {
        setTimeout(() =>
        {
            this.tree.nodesToRecolor.forEach(currentNodeToRecolor =>
            {

                this.changeNodeColorTemplateMethod(currentNodeToRecolor);

                // Update entry to the html-table info about this.tree operation: recolor node - Node is Red or black after recoloring
                this.redBlackTreeOperation.onAddNewEntryToHtmlTableOnRecolorNode(currentNodeToRecolor);
            });

            this.onAfterRecoloringNodes(superContainerElementName, isAfterNodeAddition);

        }, delayMsBeforeRecoloring);
    }


    //???
    onAfterRecoloringNodes(superContainerElementName, isAfterNodeAddition)
    {
        this.tree.nodesToRecolor.length = 0; // clear list of nodes to recolor

        // dispatch on proper node to continue step

        if (this.tree.nodeToCheckRbtProperties === null)
        {
            if (this.tree.treeViewState.isNodeToBeDeleted)
            {
                this.onWhenPropertiesRestoredAfterDeletion();
            }

            this.hideGlowingBorderForPreviouslyFoundNode();

            // enable controls
            this.customEventHandler.dispatchDisableGroupControls(false); // ???????

            return;
        }

        if (isAfterNodeAddition)
        {
            this.customEventHandler.dispatchStepFixingAdditionNodeEnded(superContainerElementName, this.tree.nodeToCheckRbtProperties);
        }
        else
        {
            this.customEventHandler.dispatchStepFixingDeletionNodeEnded(superContainerElementName, this.tree.lastDeletedNode, this.tree.nodeToCheckRbtProperties);
        }
    }



    // For addition and deletion
    // glow borders for nodes during fixing RBT properties
    glowBordersDuringFixingRBTProperties(nodeWithRedGlowingBorder)
    {
        this.showRedGlowingBorder(nodeWithRedGlowingBorder); // taken from base class ControlHandlersAbstractTree

        // for arrayOfNodesWithYellowBorders
        //
    }


    // TO DO: TO OVERRIDE IN ALL DERIVED CLASSES !!!!!!!!!!!!!
    // What to do in case when root is single node in RBT:
    // 1. In any case use always search node to delete even RBT has only root. Use line: valueToFind = this.onClickButtonFindNode(true, true);
    // 2. In method onAnimationEndAddNode(...) related to class ControlHandlersRedBlackTree add addEventListener(...) on event "findigNodeEnd"
    // 3. In nodeDomElement.addEventListener("findigNodeEnd"...) add:
    // 3.1 if-block for case when this.tree.treeViewState.isNodeToBeDeleted && this.tree.currentAmountOfNodesInTree === 0 (nodeToDelete removed in model but in html nodeToDelete is present) && this.tree.treeViewState.wasFoundNodeToBeDeleted === true
    // 3.2 else if-block for case when this.tree.treeViewState.isNodeToBeDeleted && && this.tree.treeViewState.wasFoundNodeToBeDeleted === false

    // 4. In this if-block remove logic from method onClickButtonDeleteNode() namely: case in section if (!successor), subsection for case else (when NO parent of nodeToDelete)
    // 5. In method onClickButtonDeleteNode() remove code inside block if (!nodeToDelete) except line return; (in the beginning of the method)
    // 6. Check restoring flags about deletion: this.tree.treeViewState.isNodeToBeDeleted and other
    // 7. For non-Rbt this.tree add In onAnimationEndAddNode(...) add in handler nodeDomElement.addEventListener("alignedByWidth"...
    //    section of invokation this.resetFlagsAfterDeletion(); in case if (this.tree.treeViewState.isNodeToBeDeleted)
    //    ensure that method resetFlagsAfterDeletion() is implemented in correspondent class
    onClickButtonDeleteNode()
    {
        if (this.tree.currentAmountOfNodesInTree === 0)
        {
            return;
        }

        // dispatch event to disable buttons and input
        this.customEventHandler.dispatchDisableGroupControls(true);

        let valueToFind = this.onClickButtonFindNode(true, true);


        this.hideGlowingBorderForPreviouslyFoundNode();

        let nodeToDelete = this.tree.findNode(valueToFind);

        this.tree.treeViewState.isNodeToBeDeleted = true; // !!!! TO DO: set false after the end node deletion
        this.tree.treeViewState.wasFoundNodeToBeDeleted = nodeToDelete !== null; // !!!! TO DO: set NULL after the end node deletion
        this.tree.treeViewState.enteredValueOfNodeToBeDeleted = valueToFind;

        // ?????
        // add new entry to the html-table info about this.tree operation: delete node - deleting
        this.redBlackTreeOperation.onAddNewEntryToHtmlTableOnDeleteNode(valueToFind);

        if (!nodeToDelete) // for case when trying to delete node that does not exist in this.tree (nodeFinder will go down through branch and disappears)
        {
            return;
        }


        let successor = this.tree.findSuccessorOf(nodeToDelete);

        this.tree.successorOfDeletedNode = successor;
        this.tree.initialSiblingToCheckAfterDeletion = this.tree.getInitialSiblingToCheckAfterDeletion(nodeToDelete, successor);

        if (this.tree.checkIsSuccessorDoubleBlackNode(nodeToDelete, successor))
        {
            this.tree.doubleBlackNode = successor === null ? nodeToDelete : successor; // set null after restore RBT properties+++
        }


        // for balancing
        //this.tree.nodeToCheckBalance = {
        //    nodeToCheck: successor ? successor : nodeToDelete.parentNode,
        //    isAddition: false
        //};

        let superContainerName = "superContainer";

        if (!successor)
        {
            this.tree.deleteNode(nodeToDelete);

            if (nodeToDelete.parentNode)
            {
                let domElementSvgLineLinkOfNodeToDelete = this.domUpdater.getDomElement(nodeToDelete, "svgLineLink");

                domElementSvgLineLinkOfNodeToDelete.addEventListener("linkErasedBeforeAlignmentByHeight", function (evn)
                {
                    this.customEventHandler.dispatchNodeDeleted(nodeToDelete); // ??????

                    this.onBeforeDeletionNode(superContainerName);

                    // dispatch event to enable buttons and input
                    //this.customEventHandler.dispatchDisableGroupControls(false);

                }.bind(this),

                    { once: true });

                return;
            }
            else
            {
                //this.customEventHandler.dispatchNodeDeleted(nodeToDelete);

                ////this.onBeforeDeletionNode(superContainerName); // BUG IF UNCOMMENTED

                //// ?????
                //// another place to update html-table about this.tree operation: delete node - deleted (not deleted)
                //this.onUpdateEntryInHtmlTableOnDeleteNode(this.tree, nodeToDelete, nodeToDelete.value);


                //this.domUpdater.removeDomElement(nodeToDelete, superContainerName);

                //// dispatch event to enable buttons and input
                //this.customEventHandler.dispatchDisableGroupControls(false);

                //// ????
                //if (this.tree.currentAmountOfNodesInTree === 0) // nodeToDelete was removed above
                //{
                //    this.onWhenPropertiesRestoredAfterDeletion();
                //}

                //return;

                return;
            }
        }

        let domElementSvgLineForLinkDrawnAfterAlignmentByHeight = this.domUpdater.getDomElement(successor, "svgLineLink"); // +++

        if (successor)
        {
            domElementSvgLineForLinkDrawnAfterAlignmentByHeight.addEventListener("linkErasedBeforeAlignmentByHeight", function (evn)
            {
                // ???
                // add new entry to the html-table info about this.tree operation: relocate successor node - relocating
                this.redBlackTreeOperation.onAddNewEntryToHtmlTableOnAlignmentByHeight(successor);

                let operation = this.tree.deleteNode.bind(this.tree, nodeToDelete);
                this.onAlignTreeByHeight(evn, this.tree, operation, nodeToDelete, successor);

            }.bind(this),

                { once: true }); // handler invokes once (alternative to removeEventListener)
        }

        if (nodeToDelete.isLeftChild === null && successor && !successor.leftChild && !successor.rightChild) // + and successor no children +++
        {
            let domElementNodeSuccessorSuperContainer = this.domUpdater.getDomElement(successor, superContainerName);

            domElementNodeSuccessorSuperContainer.addEventListener("alignedByHeight", function (evn)
            {
                // ???
                // Update entry in the html-table info about this.tree operation: relocate successor node - relocated
                this.redBlackTreeOperation.onUpdateEntryInHtmlTableOnAlignmentByHeight(successor);

                this.customEventHandler.dispatchNodeDeleted(nodeToDelete);

                this.onBeforeDeletionNode(superContainerName);

            }.bind(this),

                { once: true });

            return;
        }

        // 2 cases: successor has rightChild and successor has not rightChild

        if (successor && successor.rightChild)
        {
            domElementSvgLineForLinkDrawnAfterAlignmentByHeight = this.domUpdater.getDomElement(successor.rightChild, "svgLineLink");
        }
        else if (successor && !successor.rightChild && !successor.leftChild) // ????? + no successor.leftChild
        {
            domElementSvgLineForLinkDrawnAfterAlignmentByHeight = this.domUpdater.getDomElement(successor, "svgLineLink");
        }
        else if ((successor && nodeToDelete.isLeftChild === null && successor.leftChild && !successor.rightChild) ||
            (successor && successor.leftChild && !successor.rightChild)) // + successor.leftChild and successor is root
        {
            domElementSvgLineForLinkDrawnAfterAlignmentByHeight = this.domUpdater.getDomElement(successor.leftChild, "svgLineLink");
        }


        domElementSvgLineForLinkDrawnAfterAlignmentByHeight.addEventListener("linkDrawnAfterAlignmentByHeight", function (evn)
        {
            // ???
            // Update entry in the html-table info about this.tree operation: relocate successor node - relocated
            this.redBlackTreeOperation.onUpdateEntryInHtmlTableOnAlignmentByHeight(successor);

            this.customEventHandler.dispatchNodeDeleted(nodeToDelete);

            this.onBeforeDeletionNode(superContainerName);

        }.bind(this),

            { once: true });
    }


    // boilerplate
    onAddRangeOfNodes()
    {
        // correct ADD RANGE of nodes
        let patternStepAnimationArrayAddRangeOfNodes = this.redBlackTreeAnimationStepConfiguration.getPatternStepAnimationArrayAddRangeOfNodes();

        let parsedValueFlagsOfRange = this.processInputRangeValues();

        parsedValueFlagsOfRange.forEach(valueFlagPairOfRange =>
        {
            let addedNodeOfRedBlackTree = this.tree.insert(valueFlagPairOfRange.parsedValue);
            addedNodeOfRedBlackTree.isNodeRed = valueFlagPairOfRange.parsedFlag;
        });

        // ?????????
        let screenCoordinates = new ScreenCoordinates();
        let screenXCenterCoorditate = screenCoordinates.getScreenXCenter();
        let treeCoordinates = new TreeCoordinates(this.tree, screenXCenterCoorditate, 300);

        // for consistency
        let addedNode = this.tree.lastAddedNode; // ????????????????????????????

        // for consistency (balancing no needed: this.tree is balanced when it is being builded from saved data in server)
        // for balancing
        //this.tree.nodeToCheckBalance = {
        //    nodeToCheck: addedNode,
        //    isAddition: true
        //};


        treeCoordinates.alignTreeNodesAfterAddRange();


        // get sequence of the steps
        let sequenceSteps = new SequenceSteps(this.tree);

        // ????
        let nodesTheirCorrectColors = [];
        let superContainerElementName;

        // DO NOT DELETE:
        // to avoid firing events from onAnimationEndAddRangeOfNodes() right after addition a range of nodes:
        // all nodes of range are set to black disregard to entered flags (true, false)
        // aftre nodes of range will be added and their colors are changed to correct ones

        // changed names of parameters and usind object
        parsedValueFlagsOfRange.forEach((parsedValueFlag, index) =>
        {
            let nodeFromRangeToAdd = this.tree.findNode(parsedValueFlag.parsedValue);

            //nodeFromRangeToAdd.isNodeRed = parsedValueFlag.parsedFlag;
            // ????
            nodeFromRangeToAdd.isNodeRed = false; // initially all nodes are always black

            let stepsAddNodeFromRange = sequenceSteps.createSequenceStepsAddRangeOfNodes(nodeFromRangeToAdd, patternStepAnimationArrayAddRangeOfNodes);
            superContainerElementName = stepsAddNodeFromRange[0].stepAnimationObject.htmlNodeContainer[0].elementName;


            let preLastNode = null;

            if (index > 0)
            {
                let preLastValue = parsedValueFlagsOfRange[index - 1].parsedValue;
                preLastNode = this.tree.findNode(preLastValue);
            }

            //??????
            nodesTheirCorrectColors.push(this.setNodeItsCorrectColor(nodeFromRangeToAdd, parsedValueFlag.parsedFlag));

            this.onSetRedOrBlackNodeColor(nodeFromRangeToAdd);

            //???
            this.redBlackTreeOperation.onAddNewEntryToHtmlTableOnAddRangeOfNodes(nodeFromRangeToAdd);

            this.onAnimationEndAddRangeOfNodes(nodeFromRangeToAdd, treeCoordinates, stepsAddNodeFromRange, preLastNode);
        });

        //setTimeout(function ()
        //{
        //	this.setCorrectNodeColorsAfterAddRangeOfNodes(nodesTheirCorrectColors);

        //}.bind(this), 500);


        let lastAddedNodeDomElement = this.domUpdater.getDomElement(this.tree.lastAddedNode, superContainerElementName);

        lastAddedNodeDomElement.addEventListener("treePropertiesCompliedAfterAdditionRangeOfNodes", function (evn)
        {
            this.setCorrectNodeColorsAfterAddRangeOfNodes(nodesTheirCorrectColors);

        }.bind(this),

            { once: true });


    }


    // ???
    // Set correct colors of nodes when added range of nodes (to avoid firing events from onAnimationEndAddRangeOfNodes() right after addition a range of nodes)
    // intitially all nodes set to black disregard to entered flags (true, false)
    setCorrectNodeColorsAfterAddRangeOfNodes(nodesTheirCorrectColors)
    {
        nodesTheirCorrectColors.forEach(nodeItsCorrectColor =>
        {

            let currentNode = nodeItsCorrectColor.node;
            let isNodeRed = nodeItsCorrectColor.isNodeRed;

            currentNode.isNodeRed = isNodeRed;

            this.onSetRedOrBlackNodeColor(currentNode);
        });
    }


    // ????
    setNodeItsCorrectColor(node, isNodeRed)
    {
        if (!node)
        {
            throw new Error("Incorrect node value");
        }

        return {
            node: node,
            isNodeRed: isNodeRed,
        };
    }


    processInputRangeValues()
    {
        let textElement = document.getElementById('idInputForNodeValue');

        let arrayOfValueFlags = this.parseInputRangeNodeValues(textElement.value);

        this.clearInputValue();

        return arrayOfValueFlags;
    }


    processInputForNodeValue()
    {
        let valueInInput = this.parseInputForNodeValue();
        this.clearInputValue();
        return valueInInput;
    }


    // private
    parseInputRangeNodeValues(textFromInput)
    {
        // 10.254,true,11.512,false,21,true,22.554,false,35,true
        // 10,false,11,false,9,false,12,true

        //let patternText = /(?<number>[0-9]+|[0-9]+.[0-9]), *(?<flag>true|false)/gm;
        // let regexp = new RegExp(`(?<number>[0-9]+|[0-9]+.[0-9]), *(?<flag>true|false),*`, "");

        let regexp = new RegExp(`(?<number>[0-9]+\.[0-9]+|[0-9]+), *(?<flag>true|false)+`, "g");

        let valueFlagPairsArray = textFromInput.match(regexp);

        let parsedValueFlagPairsArray = this.parseValueFlagPairs(valueFlagPairsArray);

        return parsedValueFlagPairsArray;
    }


    // private
    parseValueFlagPairs(valueFlagPairs)
    {
        let arrayOfObjects = valueFlagPairs.map(valueFlag =>
        {
            let value = this.parseValueInValueFlagPair(valueFlag);
            let flag = this.parseFlagInValueFlagPair(valueFlag);

            return {
                parsedValue: value,
                parsedFlag: flag
            };
        });

        return arrayOfObjects;
    }


    // private
    parseFlagInValueFlagPair(valueFlagPair)
    {
        let flag = false;

        if (!valueFlagPair.includes("true") && !valueFlagPair.includes("false"))
        {
            throw new Error(`Pair ${valueFlagPair} does not contain correct value of flag ('true' or 'false')`);
        }

        if (valueFlagPair.includes("true"))
        {
            flag = true;
        }

        return flag;
    }


    // private
    parseValueInValueFlagPair(valueFlagPair)
    {
        let parsed = parseFloat(valueFlagPair);

        if (isNaN(parsed))
        {
            throw new Error(`Unable to parse value in the pair '${valueFlagPair}' from the range of values`)
        }

        return parsed;
    }


    // set red or black color for node. It is used to set colors of nodes after addition a range of values for Red-Black Tree.
    // (after range of values added and Red-Black Tree was built, it intially does not have red or black colors I.e. style .insideBorder class is incorrect and not appropriate for RBT)
    onSetRedOrBlackNodeColor(nodeToAnimate)
    {
        // colors of nodes after addition a range of values for Red-Black Tree
        let patternStepAnimationChangeNodeColor = this.redBlackTreeAnimationStepConfiguration.getPatternStepAnimationChangeNodeColorAfterAddRange();

        let additionalStyleClasses = patternStepAnimationChangeNodeColor[0].additionalStyleClasses;

        let elementNameToApplyStyle = additionalStyleClasses[0].elementNameToApplyStyle;

        let styleOfRedNode = this.domUpdater.getStyleToApplyOfAdditionalStyleClasses(additionalStyleClasses, elementNameToApplyStyle, "applyToNodeThatHaveToBeRed", true);
        let styleOfBlackNode = this.domUpdater.getStyleToApplyOfAdditionalStyleClasses(additionalStyleClasses, elementNameToApplyStyle, "applyToNodeThatHaveToBeRed", false);

        // ?????
        //let styleOfDoubleBlackNode = this.domUpdater.getStyleToApplyOfAdditionalStyleClasses(additionalStyleClasses, elementNameToApplyStyle, "applyToNodeThatHaveToBeRed", null);

        //if (isNodeToAnimateShouldBecomeDoubleBlack === true)
        //{
        //    this.domUpdater.updateStyleClass(nodeToAnimate, elementNameToApplyStyle, styleOfDoubleBlackNode);

        //    return;
        //}



        //let currentStyleOfInsideBorderElement = this.domUpdater.getAttributeDomElement(nodeToAnimate, elementNameToApplyStyle, "class");

        let newStyleInsideBorderToApply = '';

        if (nodeToAnimate.isNodeRed === false)
        {
            newStyleInsideBorderToApply = styleOfBlackNode;
        }
        else if (nodeToAnimate.isNodeRed === true)
        {
            newStyleInsideBorderToApply = styleOfRedNode;
        }
        else
        {
            throw new Error(`Incorrect style to apply to html-element`);
        }

        this.domUpdater.updateStyleClass(nodeToAnimate, elementNameToApplyStyle, newStyleInsideBorderToApply);
    }


    onChangeColorWhenRedOrBlackNodeClicked(nodeToAnimate)
    {
        let patternStepAnimationChangeNodeColor = this.redBlackTreeAnimationStepConfiguration.getPatternStepAnimationChangeNodeColorWhenRedOrBlackNodeClicked();
        let additionalStyleClasses = patternStepAnimationChangeNodeColor[0].additionalStyleClasses;

        let elementNameToApplyStyle = additionalStyleClasses[0].elementNameToApplyStyle;

        let styleOfClickedRedNode = this.domUpdater.getStyleToApplyOfAdditionalStyleClasses(additionalStyleClasses, elementNameToApplyStyle, "applyToNodeThatHaveToBeRed", true);
        let styleOfClickedBlackNode = this.domUpdater.getStyleToApplyOfAdditionalStyleClasses(additionalStyleClasses, elementNameToApplyStyle, "applyToNodeThatHaveToBeRed", false);


        let newStyleInsideBorderToApply = '';

        if (nodeToAnimate.isNodeRed === false)
        {
            newStyleInsideBorderToApply = styleOfClickedBlackNode;
        }
        else if (nodeToAnimate.isNodeRed === true)
        {
            newStyleInsideBorderToApply = styleOfClickedRedNode;
        }
        else
        {
            throw new Error(`Incorrect style to apply to html-element`);
        }

        this.domUpdater.updateStyleClass(nodeToAnimate, elementNameToApplyStyle, newStyleInsideBorderToApply);
    }


    onChangeColorWhenRedOrBlackNodeHideClick(nodeToAnimate)
    {
        let patternStepAnimationChangeNodeColor = this.redBlackTreeAnimationStepConfiguration.getPatternStepAnimationChangeNodeColorWhenRedOrBlackNodeHideClick();

        let additionalStyleClasses = patternStepAnimationChangeNodeColor[0].additionalStyleClasses;

        let elementNameToApplyStyle = additionalStyleClasses[0].elementNameToApplyStyle;

        let styleOfClickedRedNode = this.domUpdater.getStyleToApplyOfAdditionalStyleClasses(additionalStyleClasses, elementNameToApplyStyle, "applyToNodeThatHaveToBeRed", true);
        let styleOfClickedBlackNode = this.domUpdater.getStyleToApplyOfAdditionalStyleClasses(additionalStyleClasses, elementNameToApplyStyle, "applyToNodeThatHaveToBeRed", false);


        let newStyleInsideBorderToApply = '';

        if (nodeToAnimate.isNodeRed === false)
        {
            newStyleInsideBorderToApply = styleOfClickedBlackNode;
        }
        else if (nodeToAnimate.isNodeRed === true)
        {
            newStyleInsideBorderToApply = styleOfClickedRedNode;
        }
        else
        {
            throw new Error(`Incorrect style to apply to html-element`);
        }

        this.domUpdater.updateStyleClass(nodeToAnimate, elementNameToApplyStyle, newStyleInsideBorderToApply);
    }


    // part for Traversing
    // reimplementation in ControlHandlersRedBlackTree
    getSequenceStepsTraversingNode(nodeVisitor, startNode, traversingTreeOperationInstance)
    {
        // correct TRAVERSING NODE
        let patternStepAnimationArrayTraversingNode = this.redBlackTreeAnimationStepConfiguration.getPatternStepAnimationArrayTraversingNode();

        // get sequence of the steps
        let sequenceSteps = new SequenceSteps(this.tree);

        let sequenceStepsTraversingNode = sequenceSteps.createSequenceStepsTraversingNode(nodeVisitor, startNode, traversingTreeOperationInstance, patternStepAnimationArrayTraversingNode);

        return sequenceStepsTraversingNode;
    }


    // part for Traversing
    restoreNodesColorsAfterTraversing(stepAnimations)
    {
        stepAnimations.forEach(currentStepAnimation =>
        {
            let currentNodeToVisit = currentStepAnimation.stepAnimationObject.nodesInfoStepAnimation.relativeNodeToAnimateAccross;

            this.onSetRedOrBlackNodeColor(currentNodeToVisit);
        });
    }


    // Part for traversing

    onChangeColorForVisitedNode(currentNodeToVisit, currentStepAnimation, traversingTreeOperationInstance)
    {
        if (currentNodeToVisit.wasChangedNodeColorAfterVisiting)
        {
            return;
        }

        let additionalStyleClasses = currentStepAnimation.stepAnimationObject.additionalStyleClasses;

        let indexInAdditionalStyleClass = additionalStyleClasses
            .findIndex(additionalStyleElement => additionalStyleElement.applyToNodeThatHaveToBeRed === currentNodeToVisit.isNodeRed);


        this.setAdditionalStyleClassDuringTraversing(currentNodeToVisit, currentStepAnimation, indexInAdditionalStyleClass);

        currentNodeToVisit.wasChangedNodeColorAfterVisiting = true;
    }

}