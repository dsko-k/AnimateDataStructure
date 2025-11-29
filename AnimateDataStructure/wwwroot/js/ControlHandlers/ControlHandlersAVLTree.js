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
        this.customEventHandler.dispatchDisableGroupControls(true);
        if (this.tree.treeViewState.getLastClickedNode()) // "automatically" hide clicking on node if a new node is added
        {
            this.onHideClickNode();
            this.tree.treeViewState.setLastClickedNode(null);
        }
        this.hideGlowingBorderForPreviouslyFoundNode();
        let preLastNode = this.tree.lastAddedNode;
        let valueToAdd = this.processInputForNodeValue();
        this.tree.insert(valueToAdd);
        let screenCoordinates = new ScreenCoordinates();
        let screenXCenterCoorditate = screenCoordinates.getScreenXCenter();
        let treeCoordinates = new TreeCoordinates(this.tree, screenXCenterCoorditate, 300);
        treeCoordinates.setStartPositions(this.tree.lastAddedNode);
        treeCoordinates.setCoordinates(this.tree.lastAddedNode);
        let addedNode = this.tree.lastAddedNode;
        this.avlTreeOperation.onAddNewEntryToHtmlTableOnAddNode(addedNode);
        this.tree.nodeToCheckBalance = {
            nodeToCheck: addedNode,
            isAddition: true
        };
        let patternStepAnimationArrayAddingNode = this.avlTreeAnimationStepConfiguration.getPatternStepAnimationArrayAddingNode();
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
            nodeDomElement.addEventListener("nodeAdded", function (evn)
            {
                this.onAlignTreeByWidth(evn, this.tree, treeCoordinates);
                this.avlTreeOperation.onUpdateEntryInHtmlTableOnAddNode(nodeToAdd);
            }.bind(this),
                { once: true });

            nodeDomElement.addEventListener("nodeDeleted", function (evn)
            {
                this.onAlignTreeByWidth(evn, this.tree, treeCoordinates);
            }.bind(this),
                { once: true });

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
                let screenCoordinates = new ScreenCoordinates();
                let screenXCenterCoorditate = screenCoordinates.getScreenXCenter();
                let treeCoordinates = new TreeCoordinates(this.tree, screenXCenterCoorditate, 300);
                if (this.tree.nodeToCheckBalance.nodeToCheck)
                {
                    let unbalancedNodes = this.tree.findUnbalancedHeadMidLowestNodes();
                    this.showRedGlowingBorder(unbalancedNodes.headUnbalancedNode);
                }
                this.onAlignTreeAfterBalancingTemplateMethod(evn, this.tree, treeCoordinates);
            }.bind(this));

            svgLineDomElement.addEventListener("linkShownAfterBalancing", function (evn)
            {
                this.hideGlowingBorderForPreviouslyFoundNode();
            }.bind(this));
        }


        if (nodeDomElement)
        {
            nodeDomElement.addEventListener("animationend", function (evn)
            {
                this.customEventHandler.dispatchNodeAdded(evn.animationName, superContainerElementName, nodeToAdd); // fire event "nodeAdded"
                this.customEventHandler.dispatchNodeAlignedByHeight(evn.animationName, superContainerElementName, nodeToAdd);
                this.customEventHandler.dispatchNodeAlignedByWidth(evn.animationName, superContainerElementName, nodeToAdd); // fire event "alignedByWidth" to start update balance factors and start balancing if it needed)
                this.customEventHandler.dispatchLinkDrawnErasedBeforeAfterAlignmentByHeight(evn.animationName, superContainerElementName, nodeToAdd);
                this.customEventHandler.dispatchBalanceMovingNodeEnded(evn.animationName, superContainerElementName, nodeToAdd); // fire event "balanceMovingNodeEnded" to start drawing
            }.bind(this));

            // for balancing
            nodeDomElement.addEventListener("alignedByWidth", function (evn)
            {
                this.tree.updateBalancingFactors();
                this.customEventHandler.dispatchDisableGroupControls(false);
                this.onAnimationHideAllLinksBeforeBalancingTemplateMethod(evn);
                if (this.tree.treeViewState.isNodeToBeDeleted)
                {
                    this.resetFlagsAfterDeletion();
                }
            }.bind(this));

            nodeDomElement.addEventListener("findigNodeEnd", function (evn)
            {
                // delete root when it is single node
                if (this.tree.treeViewState.isNodeToBeDeleted && this.tree.currentAmountOfNodesInTree === 0 && this.tree.treeViewState.wasFoundNodeToBeDeleted === true)
                {
                    this.customEventHandler.dispatchNodeDeleted(nodeToAdd);
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

            nodeDomElement.addEventListener("balanceMovingNodeEnded", function (evn)
            {
                if (!this.tree.isLinkContainerShown)
                {
                    this.customEventHandler.dispatchDisableGroupControls(false);
                    this.avlTreeOperation.onUpdateEntryToHtmlTableOnBalancingNodes();
                    this.avlTreeOperation.onUpdateEntryToHtmlTableOnRotateNodes();
                    this.onAnimationShowAllLinksAfterBalancing(evn);
                }
            }.bind(this));
        }
        this.addOnClickEventHandler(nodeToAdd);
    }


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
            nodeDomElement.addEventListener("nodeAdded", function (evn)
            {
                this.onAlignTreeByWidth(evn, this.tree, treeCoordinates);
                this.avlTreeOperation.onUpdateEntryInHtmlTableOnAddNode(nodeToAdd);
            }.bind(this),
                { once: true });

            nodeDomElement.addEventListener("nodeDeleted", function (evn)
            {
                this.onAlignTreeByWidth(evn, this.tree, treeCoordinates);
            }.bind(this),
                { once: true });

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
                this.glowBorderAfterAdditionRangeOfNodes(evn, nodeToAdd, sequenceStepsAdditionNode, preLastNode);

            }.bind(this),
                { once: true });

            svgLineDomElement.addEventListener("animationend", function (evn)
            {
                this.customEventHandler.dispatchSVGLinkErasedBeforeAlignmentByHeight(evn.animationName, svgLineLinkElementName, nodeToAdd);
                this.customEventHandler.dispatchSVGLinkDrawnAfterAlignmentByHeight(evn.animationName, svgLineLinkElementName, nodeToAdd);
                this.customEventHandler.dispatchLinkHiddenBeforeBalancing(evn.animationName, svgLineLinkElementName, nodeToAdd);
                this.customEventHandler.dispatchLinkShowAfterBalancing(evn.animationName, svgLineLinkElementName, nodeToAdd);
            }.bind(this));

            // start update balance factors and start balancing if it needed
            svgLineDomElement.addEventListener("linkHiddenBeforeBalancing", function (evn)
            {
                let screenCoordinates = new ScreenCoordinates();
                let screenXCenterCoorditate = screenCoordinates.getScreenXCenter();
                let treeCoordinates = new TreeCoordinates(this.tree, screenXCenterCoorditate, 300);
                if (this.tree.nodeToCheckBalance.nodeToCheck)
                {
                    let unbalancedNodes = this.tree.findUnbalancedHeadMidLowestNodes();
                    this.showRedGlowingBorder(unbalancedNodes.headUnbalancedNode);
                }
                this.onAlignTreeAfterBalancingTemplateMethod(evn, this.tree, treeCoordinates);
            }.bind(this));

            svgLineDomElement.addEventListener("linkShownAfterBalancing", function (evn)
            {
                this.hideGlowingBorderForPreviouslyFoundNode();
            }.bind(this));
        }

        if (nodeDomElement)
        {
            nodeDomElement.addEventListener("animationend", function (evn)
            {
                this.customEventHandler.dispatchNodeAdded(evn.animationName, superContainerElementName, nodeToAdd); // fire event "nodeAdded"
                this.customEventHandler.dispatchNodeAlignedByHeight(evn.animationName, superContainerElementName, nodeToAdd);
                this.customEventHandler.dispatchNodeAlignedByWidth(evn.animationName, superContainerElementName, nodeToAdd); // fire event "alignedByWidth" to start update balance factors and start balancing if it needed
                this.customEventHandler.dispatchLinkDrawnErasedBeforeAfterAlignmentByHeight(evn.animationName, superContainerElementName, nodeToAdd);
                this.customEventHandler.dispatchBalanceMovingNodeEnded(evn.animationName, superContainerElementName, nodeToAdd); // fire event "balanceMovingNodeEnded" to start drawing
            }.bind(this));

            // for balancing
            nodeDomElement.addEventListener("alignedByWidth", function (evn)
            {
                this.tree.updateBalancingFactors();
                this.customEventHandler.dispatchDisableGroupControls(false);
                this.onAnimationHideAllLinksBeforeBalancingTemplateMethod(evn);
                if (this.tree.treeViewState.isNodeToBeDeleted)
                {
                    this.resetFlagsAfterDeletion();
                }
            }.bind(this));

            nodeDomElement.addEventListener("findigNodeEnd", function (evn)
            {
                // delete root when it is single node
                if (this.tree.treeViewState.isNodeToBeDeleted && this.tree.currentAmountOfNodesInTree === 0 && this.tree.treeViewState.wasFoundNodeToBeDeleted === true)
                {
                    this.customEventHandler.dispatchNodeDeleted(nodeToAdd);
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

            nodeDomElement.addEventListener("balanceMovingNodeEnded", function (evn)
            {
                if (!this.tree.isLinkContainerShown)
                {
                    this.customEventHandler.dispatchDisableGroupControls(false);
                    this.avlTreeOperation.onUpdateEntryToHtmlTableOnBalancingNodes();
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
    }


    onClickButtonDeleteNode()
    {
        if (this.tree.currentAmountOfNodesInTree === 0)
        {
            return;
        }
        this.customEventHandler.dispatchDisableGroupControls(true);
        let valueToFind = this.onClickButtonFindNode(true, true);
        this.hideGlowingBorderForPreviouslyFoundNode();
        let nodeToDelete = this.tree.findNode(valueToFind);
        this.tree.treeViewState.isNodeToBeDeleted = true; // set false after the end node deletion
        this.tree.treeViewState.wasFoundNodeToBeDeleted = nodeToDelete !== null; // set NULL after the end node deletion
        this.tree.treeViewState.enteredValueOfNodeToBeDeleted = valueToFind;
        this.avlTreeOperation.onAddNewEntryToHtmlTableOnDeleteNode(valueToFind);
        if (!nodeToDelete) // for case when trying to delete node that does not exist in this.tree (nodeFinder will go down through branch and disappears)
        {
            return;
        }
        let successor = this.tree.findSuccessorOf(nodeToDelete);
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
                    this.customEventHandler.dispatchNodeDeleted(nodeToDelete);
                    this.onBeforeDeletionNode(superContainerName);
                }.bind(this),
                    { once: true });
                return;
            }
            else
            {
                return;
            }
        }

        let domElementSvgLineForLinkDrawnAfterAlignmentByHeight = this.domUpdater.getDomElement(successor, "svgLineLink");
        if (successor)
        {
            domElementSvgLineForLinkDrawnAfterAlignmentByHeight.addEventListener("linkErasedBeforeAlignmentByHeight", function (evn)
            {
                this.avlTreeOperation.onAddNewEntryToHtmlTableOnAlignmentByHeight(successor);
                let operation = this.tree.deleteNode.bind(this.tree, nodeToDelete);
                this.onAlignTreeByHeight(evn, this.tree, operation, nodeToDelete, successor);
            }.bind(this),
                { once: true });
        }

        if (nodeToDelete.isLeftChild === null && successor && !successor.leftChild && !successor.rightChild) // and successor no children
        {
            let domElementNodeSuccessorSuperContainer = this.domUpdater.getDomElement(successor, superContainerName);
            domElementNodeSuccessorSuperContainer.addEventListener("alignedByHeight", function (evn)
            {
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
        else if (successor && !successor.rightChild && !successor.leftChild) // no successor.leftChild
        {
            domElementSvgLineForLinkDrawnAfterAlignmentByHeight = this.domUpdater.getDomElement(successor, "svgLineLink");
        }
        else if ((successor && nodeToDelete.isLeftChild === null && successor.leftChild && !successor.rightChild) ||
            (successor && successor.leftChild && !successor.rightChild)) // successor.leftChild and successor is root
        {
            domElementSvgLineForLinkDrawnAfterAlignmentByHeight = this.domUpdater.getDomElement(successor.leftChild, "svgLineLink");
        }

        domElementSvgLineForLinkDrawnAfterAlignmentByHeight.addEventListener("linkDrawnAfterAlignmentByHeight", function (evn)
        {
            this.avlTreeOperation.onUpdateEntryInHtmlTableOnAlignmentByHeight(successor);
            this.customEventHandler.dispatchNodeDeleted(nodeToDelete);
            this.onBeforeDeletionNode(superContainerName);
        }.bind(this),
            { once: true });
    }

    // it invoked after alignment tree by width (after node was added or deleted and balancing is needed)
    onAlignTreeAfterBalancingTemplateMethod(evn, tree, treeCoordinates)
    {
        if (!this.isAlignTreeAfterBalancing(evn))
        {
            return;
        }
        let unbalancedNodes = this.tree.findUnbalancedHeadMidLowestNodes();
        if (!unbalancedNodes)
        {
            return;
        }
        this.tree.balanceTree(unbalancedNodes.headUnbalancedNode, unbalancedNodes.midAfterUnbalancedNode, unbalancedNodes.minUnbalancedNode);
        treeCoordinates.alignTreeNodesAfterBalancing();
        this.onAlignTreeAfterBalancing(evn, this.tree, treeCoordinates);
        this.tree.nodeToCheckBalance.nodeToCheck = null;
        this.tree.isNeedAlignmentByWidth = false; // after balancing tree is deemed as aligned by width
    }


    // Only animation of ballancing
    onAlignTreeAfterBalancing(evn, tree, treeCoordinates)
    {
        let patternStepAnimationArrayBalancing = this.avlTreeAnimationStepConfiguration.getPatternStepAnimationArrayBalancing();
        let sequenceSteps = new SequenceSteps(this.tree);
        let allNodesByLevels = this.tree.getAllNodesByLevels();
        for (let currentLevel = 0; currentLevel < allNodesByLevels.length; currentLevel++)
        {
            for (let n = 0; n < allNodesByLevels[currentLevel].length; n++)
            {
                let nodeToBalance = allNodesByLevels[currentLevel][n];
                sequenceSteps.createSequenceStepsNodeBalanced(nodeToBalance, patternStepAnimationArrayBalancing);
            }
        }
    }

    // Check is event and other clauses allow to invoke onAlignTreeAfterBalancing()
    isAlignTreeAfterBalancing(evn)
    {
        // balancing starts only after alignment by width (disregards on the reason of alignment by width)
        if (evn.detail.customEventName !== "linkHiddenBeforeBalancing" || this.tree.treeLevels <= 2 || !this.tree.nodeToCheckBalance.nodeToCheck)
        {
            return false;
        }
        return true;
    }

    // Hide or show 1 link of node before after balancing
    onAnimationLinkBeforeAfterBalancing(evn, nodeToAnimateLinkBeforeAfterBalancing, isHideLink)
    {
        let patternStepAnimationLinkBeforeAfterBalancing = this.avlTreeAnimationStepConfiguration.getPatternStepAnimationLinkBeforeAfterBalancing();
        let sequenceSteps = new SequenceSteps(this.tree);
        let stepsLinkNodeAction = sequenceSteps.createSequenceStepsLinkBeforeAfterBalancing(nodeToAnimateLinkBeforeAfterBalancing, patternStepAnimationLinkBeforeAfterBalancing, isHideLink);
        if (isHideLink === false)
        {
            sequenceSteps.updateHtmlLinkContainerBalancing(nodeToAnimateLinkBeforeAfterBalancing);
        }
        if (isHideLink)
        {
            this.tree.isLinkContainerShown = false;
        }
        else
        {
            this.tree.isLinkContainerShown = true;
        }
    }


    // Hide or show ALL links of all nodes before after balancing
    onAnimationHideAllLinksBeforeBalancingTemplateMethod(evn)
    {
        if (!this.isAnimateHideAllLinksBeforeBalancing(evn))
        {
            return;
        }
        let unbalancedNodes = this.tree.findUnbalancedHeadMidLowestNodes();
        if (!unbalancedNodes)
        {
            return;
        }
        if (this.tree.isLinkContainerShown === false)
        {
            return;
        }
        this.customEventHandler.dispatchDisableGroupControls(true);
        this.avlTreeOperation.onAddNewEntryToHtmlTableOnBalancingNodes(unbalancedNodes.headUnbalancedNode);
        this.avlTreeOperation.onAddNewEntryToHtmlTableOnRotateNodes(unbalancedNodes.minUnbalancedNode);
        this.onAnimationHideAllLinksBeforeBalancing(evn);
    }


    // Only animation of hiding or showing ALL links of all nodes before after balancing
    onAnimationHideAllLinksBeforeBalancing(evn)
    {
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


    // Check is event and other clauses alow to invoke method onAnimationHideAllLinksBeforeBalancing(evn)
    isAnimateHideAllLinksBeforeBalancing(evn)
    {
        if (evn.detail.customEventName !== "alignedByWidth" || this.tree.treeLevels <= 2 || !this.tree.nodeToCheckBalance.nodeToCheck)
        {
            return false;
        }
        return true;
    }


    // Hide or show ALL links of all nodes before after balancing
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


    findUnbalancedNodes(evn)
    {
        if (evn.detail.customEventName !== "alignedByWidth" || this.tree.treeLevels <= 2)
        {
            return null;
        }
        let unbalancedNodes = this.tree.findUnbalancedHeadMidLowestNodes();
        return unbalancedNodes;
    }


    onAddRangeOfNodes()
    {
        let patternStepAnimationArrayAddRangeOfNodes = this.avlTreeAnimationStepConfiguration.getPatternStepAnimationArrayAddRangeOfNodes();
        let parsedValuesOfRange = this.processInputRangeValues();
        parsedValuesOfRange.forEach(valueOfRange =>
        {
            this.tree.insert(valueOfRange);
        });
        let screenCoordinates = new ScreenCoordinates();
        let screenXCenterCoorditate = screenCoordinates.getScreenXCenter();
        let treeCoordinates = new TreeCoordinates(this.tree, screenXCenterCoorditate, 300);
        let addedNode = this.tree.lastAddedNode;
        // balancing no needed: tree is balanced when it is being buildt from saved data in server
        this.tree.nodeToCheckBalance = {
            nodeToCheck: addedNode,
            isAddition: true
        };
        treeCoordinates.alignTreeNodesAfterAddRange();
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
            this.avlTreeOperation.onAddNewEntryToHtmlTableOnAddRangeOfNodes(nodeFromRangeToAdd);
            this.onAnimationEndAddRangeOfNodes(nodeFromRangeToAdd, treeCoordinates, stepsAddNodeFromRange, preLastNode);
        });
    }
}