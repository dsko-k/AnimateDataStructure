import { ControlHandlersBinarySearchTree } from './ControlHandlersBinarySearchTree.js';
import { AvlTreeOperation } from '../DataStructureOperations/AvlTreeOperation.js';
import { AVLTreeAnimationStepConfiguration } from '../PatternStepAnimationOperation/AVLTreeAnimationStepConfiguration.js';
import { SequenceSteps } from '../AnimationNodeSteps/SequenceSteps.js';
import { ScreenCoordinates } from '../CoordinatesModel/ScreenCoordinates.js';
import { TreeCoordinates } from '../CoordinatesModel/TreeCoordinates.js';


export class ControlHandlersAVLTree extends ControlHandlersBinarySearchTree
{
    constructor(tree)
    {
        super(tree);
        this.tree = tree;
        this.avlTreeOperation = new AvlTreeOperation(this.tree);
        this.avlTreeAnimationStepConfiguration = new AVLTreeAnimationStepConfiguration();
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


        let screenCoordinates = new ScreenCoordinates();
        let screenXCenterCoorditate = screenCoordinates.getScreenXCenter();
        let treeCoordinates = new TreeCoordinates(this.tree, screenXCenterCoorditate, 300);

        treeCoordinates.setStartPositions(this.tree.lastAddedNode);
        treeCoordinates.setCoordinates(this.tree.lastAddedNode);

        let addedNode = this.tree.lastAddedNode; // ????????????????????????????

        // ???????
        this.avlTreeOperation.onAddNewEntryToHtmlTableOnAddNode(addedNode);


        // for balancing
        this.tree.nodeToCheckBalance = {
            nodeToCheck: addedNode,
            isAddition: true
        };

        // correct ADD node
        let patternStepAnimationArrayAddingNode = this.avlTreeAnimationStepConfiguration.getPatternStepAnimationArrayAddingNode();

        // get sequence of the steps
        let sequenceSteps = new SequenceSteps(this.tree);

        let stepsAdditionNode = sequenceSteps.createSequenceStepsAdditionNode(addedNode, patternStepAnimationArrayAddingNode);

        this.onAnimationEndAddNode(addedNode, treeCoordinates, stepsAdditionNode, preLastNode);
    }


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
                this.avlTreeOperation.onUpdateEntryInHtmlTableOnAddNode(nodeToAdd);

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

                this.customEventHandler.dispatchLinkHiddenBeforeBalancing(evn.animationName, svgLineLinkElementName, nodeToAdd);

                this.customEventHandler.dispatchLinkShowAfterBalancing(evn.animationName, svgLineLinkElementName, nodeToAdd);

            }.bind(this));


            // for balancing (start update balance factors and start balancing if it needed)
            svgLineDomElement.addEventListener("linkHiddenBeforeBalancing", function (evn)
            {
                //this.tree.updateBalancingFactors();

                let screenCoordinates = new ScreenCoordinates();
                let screenXCenterCoorditate = screenCoordinates.getScreenXCenter();
                let treeCoordinates = new TreeCoordinates(this.tree, screenXCenterCoorditate, 300);

                if (this.tree.nodeToCheckBalance.nodeToCheck)
                {
                    let unbalancedNodes = this.tree.findUnbalancedHeadMidLowestNodes();
                    this.showRedGlowingBorder(unbalancedNodes.headUnbalancedNode);
                }

                this.onAlignTreeAfterBalancingTemplateMethod(evn, this.tree, treeCoordinates);

            }.bind(this)); // should not include { once: true }


            // ??????????????
            svgLineDomElement.addEventListener("linkShownAfterBalancing", function (evn)
            {
                // dispatch event to enable buttons and input
                //this.customEventHandler.dispatchDisableGroupControls(false);

                this.hideGlowingBorderForPreviouslyFoundNode();

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
                //this.customEventHandler.dispatchDisableGroupControls(false);

                this.tree.updateBalancingFactors();
                // ???
                this.customEventHandler.dispatchDisableGroupControls(false);

                this.onAnimationHideAllLinksBeforeBalancingTemplateMethod(evn);

                // ????
                if (this.tree.treeViewState.isNodeToBeDeleted)
                {
                    this.resetFlagsAfterDeletion();
                }

            }.bind(this));


            // ??????????
            nodeDomElement.addEventListener("findigNodeEnd", function (evn)
            {
                // delete root when it is single node in RBT
                if (this.tree.treeViewState.isNodeToBeDeleted && this.tree.currentAmountOfNodesInTree === 0 && this.tree.treeViewState.wasFoundNodeToBeDeleted === true)
                {
                    this.customEventHandler.dispatchNodeDeleted(nodeToAdd);

                    // update html-table about this.tree operation: delete node - deleted (not deleted)
                    this.avlTreeOperation.onUpdateEntryInHtmlTableOnDeleteNode(nodeToAdd, nodeToAdd.value);

                    this.domUpdater.removeDomElement(nodeToAdd, "superContainer");

                    this.resetFlagsAfterDeletion();
                }
                else if (this.tree.treeViewState.isNodeToBeDeleted && this.tree.treeViewState.wasFoundNodeToBeDeleted === false)
                {
                    let enteredValueOfNodeToBeDeleted = this.tree.treeViewState.enteredValueOfNodeToBeDeleted;
                    this.avlTreeOperation.onUpdateEntryInHtmlTableOnDeleteNode(null, enteredValueOfNodeToBeDeleted);

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
                if (!this.tree.isLinkContainerShown)
                {
                    this.customEventHandler.dispatchDisableGroupControls(false);
                    // ???
                    this.avlTreeOperation.onUpdateEntryToHtmlTableOnBalancingNodes();
                    // ???
                    this.avlTreeOperation.onUpdateEntryToHtmlTableOnRotateNodes();

                    this.onAnimationShowAllLinksAfterBalancing(evn);
                }

                //this.onAnimationShowAllLinksAfterBalancing(evn);

            }.bind(this));

        }

        this.addOnClickEventHandler(nodeToAdd);
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
                this.avlTreeOperation.onUpdateEntryInHtmlTableOnAddNode(nodeToAdd);

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

                this.customEventHandler.dispatchLinkHiddenBeforeBalancing(evn.animationName, svgLineLinkElementName, nodeToAdd);

                this.customEventHandler.dispatchLinkShowAfterBalancing(evn.animationName, svgLineLinkElementName, nodeToAdd);

            }.bind(this));


            // for balancing (start update balance factors and start balancing if it needed)
            svgLineDomElement.addEventListener("linkHiddenBeforeBalancing", function (evn)
            {
                //this.tree.updateBalancingFactors();

                // DUPLICATION in this class and other
                let screenCoordinates = new ScreenCoordinates();
                let screenXCenterCoorditate = screenCoordinates.getScreenXCenter();
                let treeCoordinates = new TreeCoordinates(this.tree, screenXCenterCoorditate, 300);

                // ????
                if (this.tree.nodeToCheckBalance.nodeToCheck)
                {
                    let unbalancedNodes = this.tree.findUnbalancedHeadMidLowestNodes();
                    this.showRedGlowingBorder(unbalancedNodes.headUnbalancedNode);
                }

                this.onAlignTreeAfterBalancingTemplateMethod(evn, this.tree, treeCoordinates);

            }.bind(this)); // should not include { once: true }


            // ??????????????
            svgLineDomElement.addEventListener("linkShownAfterBalancing", function (evn)
            {
                // dispatch event to enable buttons and input
                //this.customEventHandler.dispatchDisableGroupControls(false);

                // ?????
                this.hideGlowingBorderForPreviouslyFoundNode();

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



            // ----------------
            // IS EXCESSIVE???? svgLineDomElement has handler for "linkHiddenBeforeBalancing"
            // ----------------


            //// for balancing (start update balance factors and start balancing if it needed)
            //nodeDomElement.addEventListener("linkHiddenBeforeBalancing", function (evn)
            //{
            //    //this.tree.updateBalancingFactors();

            //    let screenCoordinates = new ScreenCoordinates();
            //    let screenXCenterCoorditate = screenCoordinates.getScreenXCenter();
            //    let treeCoordinates = new TreeCoordinates(this.tree, screenXCenterCoorditate, 300);

            //    this.onAlignTreeAfterBalancingTemplateMethod(evn, this.tree, treeCoordinates);

            //}.bind(this)); // should not include { once: true }


            // for balancing
            nodeDomElement.addEventListener("alignedByWidth", function (evn)
            {
                // dispatch event to enable buttons and input
                //this.customEventHandler.dispatchDisableGroupControls(false);

                this.tree.updateBalancingFactors();
                // ???
                this.customEventHandler.dispatchDisableGroupControls(false);

                this.onAnimationHideAllLinksBeforeBalancingTemplateMethod(evn);

                // ????
                if (this.tree.treeViewState.isNodeToBeDeleted)
                {
                    this.resetFlagsAfterDeletion();
                }

            }.bind(this));


            // ??????????
            nodeDomElement.addEventListener("findigNodeEnd", function (evn)
            {
                // delete root when it is single node in RBT
                if (this.tree.treeViewState.isNodeToBeDeleted && this.tree.currentAmountOfNodesInTree === 0 && this.tree.treeViewState.wasFoundNodeToBeDeleted === true)
                {
                    this.customEventHandler.dispatchNodeDeleted(nodeToAdd);

                    // update html-table about this.tree operation: delete node - deleted (not deleted)
                    this.avlTreeOperation.onUpdateEntryInHtmlTableOnDeleteNode(nodeToAdd, nodeToAdd.value);

                    this.domUpdater.removeDomElement(nodeToAdd, "superContainer");

                    this.resetFlagsAfterDeletion();
                }
                else if (this.tree.treeViewState.isNodeToBeDeleted && this.tree.treeViewState.wasFoundNodeToBeDeleted === false)
                {
                    let enteredValueOfNodeToBeDeleted = this.tree.treeViewState.enteredValueOfNodeToBeDeleted;
                    this.avlTreeOperation.onUpdateEntryInHtmlTableOnDeleteNode(null, enteredValueOfNodeToBeDeleted);

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
                if (!this.tree.isLinkContainerShown)
                {
                    this.customEventHandler.dispatchDisableGroupControls(false);
                    // ???
                    this.avlTreeOperation.onUpdateEntryToHtmlTableOnBalancingNodes();
                    // ???
                    this.avlTreeOperation.onUpdateEntryToHtmlTableOnRotateNodes();

                    this.onAnimationShowAllLinksAfterBalancing(evn);
                }

            }.bind(this));
        }


        this.addOnClickEventHandler(nodeToAdd);
    }


    resetFlagsAfterDeletion()
    {
        this.tree.treeViewState.isNodeToBeDeleted = false;
        this.tree.treeViewState.wasFoundNodeToBeDeleted = null;
        this.tree.treeViewState.enteredValueOfNodeToBeDeleted = null;
        //this.tree.successorOfDeletedNode = null;
    }


    onClickButtonDeleteNode()
    {
        if (this.tree.currentAmountOfNodesInTree === 0)
        {
            return;
        }

        // dispatch event to disable buttons and input
        this.customEventHandler.dispatchDisableGroupControls(true);

        let valueToFind = this.onClickButtonFindNode(true, true);


        // ??????
        this.hideGlowingBorderForPreviouslyFoundNode();

        let nodeToDelete = this.tree.findNode(valueToFind);

        this.tree.treeViewState.isNodeToBeDeleted = true; // !!!! TO DO: set false after the end node deletion
        this.tree.treeViewState.wasFoundNodeToBeDeleted = nodeToDelete !== null; // !!!! TO DO: set NULL after the end node deletion
        this.tree.treeViewState.enteredValueOfNodeToBeDeleted = valueToFind;

        // ?????
        // add new entry to the html-table info about this.tree operation: delete node - deleting
        this.avlTreeOperation.onAddNewEntryToHtmlTableOnDeleteNode(valueToFind);


        if (!nodeToDelete) // for case when trying to delete node that does not exist in this.tree (nodeFinder will go down through branch and disappears)
        {
            return;
        }

        let successor = this.tree.findSuccessorOf(nodeToDelete);

        // for balancing
        this.tree.nodeToCheckBalance = {
            nodeToCheck: successor ? successor : nodeToDelete.parentNode,
            isAddition: false
        };

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
            else // ???
            {
                //this.customEventHandler.dispatchNodeDeleted(nodeToDelete);

                ////this.onBeforeDeletionNode(superContainerName); // BUG IF UNCOMMENTED
                //this.domUpdater.removeDomElement(nodeToDelete, superContainerName);

                //// dispatch event to enable buttons and input
                //this.customEventHandler.dispatchDisableGroupControls(false);

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
                this.avlTreeOperation.onAddNewEntryToHtmlTableOnAlignmentByHeight(successor);

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
                this.avlTreeOperation.onUpdateEntryInHtmlTableOnAlignmentByHeight(successor);

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
            this.avlTreeOperation.onUpdateEntryInHtmlTableOnAlignmentByHeight(successor);

            this.customEventHandler.dispatchNodeDeleted(nodeToDelete);

            this.onBeforeDeletionNode(superContainerName);

        }.bind(this),

            { once: true });

    }


    // For balancing
    // it invoked after alignment this.tree by width (after and node was added or deleted and balancing is needed)
    onAlignTreeAfterBalancingTemplateMethod(evn, tree, treeCoordinates)
    {
        // 1
        if (!this.isAlignTreeAfterBalancing(evn))
        {
            return;
        }

        // 2
        let unbalancedNodes = this.tree.findUnbalancedHeadMidLowestNodes();

        if (!unbalancedNodes)
        {
            return;
        }

        // 3
        this.tree.balanceTree(unbalancedNodes.headUnbalancedNode, unbalancedNodes.midAfterUnbalancedNode, unbalancedNodes.minUnbalancedNode);

        // 4
        treeCoordinates.alignTreeNodesAfterBalancing();

        // 5
        this.onAlignTreeAfterBalancing(evn, this.tree, treeCoordinates);


        // 6
        // for balancing
        this.tree.nodeToCheckBalance.nodeToCheck = null;
        this.tree.isNeedAlignmentByWidth = false; // ??????????? // ??? after balancing this.tree is deemed as aligned by width
    }


    // For balancing
    // Only animation of ballancing
    onAlignTreeAfterBalancing(evn, tree, treeCoordinates)
    {
        // 1

        // balancing starts only after alignment by width (disregards on the reason of alignment by width)
        //if (evn.detail.customEventName !== "linkHiddenBeforeBalancing"/*!evn.detail.customEventName === "alignedByWidth" */ || this.tree.treeLevels <= 2 || !this.tree.nodeToCheckBalance.nodeToCheck)
        //{
        //    return;
        //}



        // 2

        //let unbalancedNodes = this.tree.findUnbalancedHeadMidLowestNodes();

        //if (!unbalancedNodes)
        //{
        //    return;
        //}


        // 3

        //this.tree.balanceTree(unbalancedNodes.headUnbalancedNode, unbalancedNodes.midAfterUnbalancedNode, unbalancedNodes.minUnbalancedNode);


        // 4
        //treeCoordinates.alignTreeNodesAfterBalancing();


        // 5

        // correct BALANCING this.tree
        let patternStepAnimationArrayBalancing = this.avlTreeAnimationStepConfiguration.getPatternStepAnimationArrayBalancing();

        // get sequence of the steps
        let sequenceSteps = new SequenceSteps(this.tree);

        // get this.tree nodes from root to bottom of this.tree


        let allNodesByLevels = this.tree.getAllNodesByLevels();

        for (let currentLevel = 0; currentLevel < allNodesByLevels.length; currentLevel++)
        {
            for (let n = 0; n < allNodesByLevels[currentLevel].length; n++)
            {
                let nodeToBalance = allNodesByLevels[currentLevel][n];

                sequenceSteps.createSequenceStepsNodeBalanced(nodeToBalance, patternStepAnimationArrayBalancing);
            }
        }


        // 6

        // for balancing
        //this.tree.nodeToCheckBalance.nodeToCheck = null;
        //this.tree.isNeedAlignmentByWidth = false; // ??????????? // ??? after balancing this.tree is deemed as aligned by width
    }


    // private
    // check is event and other clauses allow to invoke onAlignTreeAfterBalancing()
    isAlignTreeAfterBalancing(evn)
    {
        // balancing starts only after alignment by width (disregards on the reason of alignment by width)
        if (evn.detail.customEventName !== "linkHiddenBeforeBalancing" || this.tree.treeLevels <= 2 || !this.tree.nodeToCheckBalance.nodeToCheck)
        {
            return false;
        }

        return true;
    }


    // For balancing
    // hide or show 1 link of node before after balancing
    // private
    onAnimationLinkBeforeAfterBalancing(evn, nodeToAnimateLinkBeforeAfterBalancing, isHideLink)
    {
        // correct Show / Hide node link befor / after balancing
        let patternStepAnimationLinkBeforeAfterBalancing = this.avlTreeAnimationStepConfiguration.getPatternStepAnimationLinkBeforeAfterBalancing();

        // get sequence of the steps
        let sequenceSteps = new SequenceSteps(this.tree);

        // get this.tree nodes from root to bottom of this.tree


        let stepsLinkNodeAction = sequenceSteps.createSequenceStepsLinkBeforeAfterBalancing(nodeToAnimateLinkBeforeAfterBalancing, patternStepAnimationLinkBeforeAfterBalancing, isHideLink);

        if (isHideLink === false)
        {
            sequenceSteps.updateHtmlLinkContainerBalancing(nodeToAnimateLinkBeforeAfterBalancing); // ?????????
        }

        if (isHideLink)
        {
            this.tree.isLinkContainerShown = false;
        }
        else
        {
            this.tree.isLinkContainerShown = true; // ????????????
        }
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



        //this.isAnimateHideAllLinksBeforeBalancing(evn);
        if (!this.isAnimateHideAllLinksBeforeBalancing(evn))
        {
            //this.customEventHandler.dispatchDisableGroupControls(false);

            return;
        }


        // 2

        let unbalancedNodes = this.tree.findUnbalancedHeadMidLowestNodes();

        if (!unbalancedNodes)
        {
            return;
        }


        // 3

        if (this.tree.isLinkContainerShown === false)
        {
            return;
        }


        // 4
        this.customEventHandler.dispatchDisableGroupControls(true); // ??????

        // ????
        this.avlTreeOperation.onAddNewEntryToHtmlTableOnBalancingNodes(unbalancedNodes.headUnbalancedNode);

        // ????
        this.avlTreeOperation.onAddNewEntryToHtmlTableOnRotateNodes(unbalancedNodes.minUnbalancedNode);

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

        this.onAnimationHideAllLinksBeforeBalancing(evn);

    }


    // For balancing
    // Only animation of hiding or showing ALL links of all nodes before after balancing
    onAnimationHideAllLinksBeforeBalancing(evn)
    {
        // 1

        //if (evn.detail.customEventName !== "alignedByWidth" || this.tree.treeLevels <= 2 || !this.tree.nodeToCheckBalance.nodeToCheck)
        //{
        //    return;
        //}


        // 2

        //let unbalancedNodes = this.tree.findUnbalancedHeadMidLowestNodes();

        //if (!unbalancedNodes)
        //{
        //    return;
        //}



        // 3

        //if (this.tree.isLinkContainerShown === false)
        //{
        //    return;
        //}



        // 4
        //this.customEventHandler.dispatchDisableGroupControls(true); // ??????


        // 5

        let allNodesByLevels = this.tree.getAllNodesByLevels();

        for (let currentLevel = 1; currentLevel < allNodesByLevels.length; currentLevel++) // root node is omitted
        {

            for (let n = 0; n < allNodesByLevels[currentLevel].length; n++)
            {
                let nodeToShowHideLink = allNodesByLevels[currentLevel][n];

                this.onAnimationLinkBeforeAfterBalancing(evn, nodeToShowHideLink, true);
            }
        }
    }


    // private
    // check is event and other clauses alow to invoke method onAnimationHideAllLinksBeforeBalancing(evn)
    isAnimateHideAllLinksBeforeBalancing(evn)
    {
        if (evn.detail.customEventName !== "alignedByWidth" || this.tree.treeLevels <= 2 || !this.tree.nodeToCheckBalance.nodeToCheck)
        {
            return false;
        }

        return true;
    }


    // For balancing
    // hide or show ALL links of all nodes before after balancing
    onAnimationShowAllLinksAfterBalancing(evn)
    {
        if (evn.detail.customEventName !== "balanceMovingNodeEnded")
        {
            return;
        }

        if (this.tree.isLinkContainerShown === true)
        {
            return;
        }

        // dispatch event to enable buttons and input
        //this.customEventHandler.dispatchDisableGroupControls(false); // ??????


        let allNodesByLevels = this.tree.getAllNodesByLevels();

        for (let currentLevel = 0; currentLevel < allNodesByLevels.length; currentLevel++)
        {
            for (let n = 0; n < allNodesByLevels[currentLevel].length; n++)
            {
                let nodeToShowHideLink = allNodesByLevels[currentLevel][n];

                this.onAnimationLinkBeforeAfterBalancing(evn, nodeToShowHideLink, false);
            }
        }
    }


    // For balancing
    // private
    findUnbalancedNodes(evn)
    {
        if (evn.detail.customEventName !== "alignedByWidth" || this.tree.treeLevels <= 2)
        {
            return null;
        }

        let unbalancedNodes = this.tree.findUnbalancedHeadMidLowestNodes();

        return unbalancedNodes;
    }


    // boilerplate
    // this method is differ to the same method from base class ControlHandlersBinarySearchTree only section  this.tree.nodeToCheckBalance = { ..
    onAddRangeOfNodes()
    {
        // correct ADD RANGE of nodes
        let patternStepAnimationArrayAddRangeOfNodes = this.avlTreeAnimationStepConfiguration.getPatternStepAnimationArrayAddRangeOfNodes();

        let parsedValuesOfRange = this.processInputRangeValues();

        parsedValuesOfRange.forEach(valueOfRange =>
        {
            this.tree.insert(valueOfRange);
        });

        // ?????????
        let screenCoordinates = new ScreenCoordinates();
        let screenXCenterCoorditate = screenCoordinates.getScreenXCenter();
        let treeCoordinates = new TreeCoordinates(this.tree, screenXCenterCoorditate, 300);

        // for consistency
        let addedNode = this.tree.lastAddedNode; // ????????????????????????????

        // for consistency (balancing no needed: this.tree is balanced when it is being builded from saved data in server)
        // for balancing
        this.tree.nodeToCheckBalance = {
            nodeToCheck: addedNode,
            isAddition: true
        };


        treeCoordinates.alignTreeNodesAfterAddRange();


        // get sequence of the steps
        let sequenceSteps = new SequenceSteps(this.tree);


        parsedValuesOfRange.forEach((parsedValue, index) =>
        {
            let nodeFromRangeToAdd = this.tree.findNode(parsedValue);

            let stepsAddNodeFromRange = sequenceSteps.createSequenceStepsAddRangeOfNodes(nodeFromRangeToAdd, patternStepAnimationArrayAddRangeOfNodes);

            let preLastNode = null;

            if (index > 0)
            {
                let preLastValue = parsedValuesOfRange[index - 1];
                preLastNode = this.tree.findNode(preLastValue);
            }

            //???
            this.avlTreeOperation.onAddNewEntryToHtmlTableOnAddRangeOfNodes(nodeFromRangeToAdd);

            this.onAnimationEndAddRangeOfNodes(nodeFromRangeToAdd, treeCoordinates, stepsAddNodeFromRange, preLastNode);
        });

    }

}