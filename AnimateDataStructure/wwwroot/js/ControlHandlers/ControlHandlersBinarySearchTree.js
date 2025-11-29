import { ControlHandlersAbstractTree } from './ControlHandlersAbstractTree.js';
import { BinarySearchTreeOperation } from '../DataStructureOperations/BinarySearchTreeOperation.js';
import { BinarySearchTreeAnimationStepConfiguration } from '../PatternStepAnimationOperation/BinarySearchTreeAnimationStepConfiguration.js';
import { SequenceSteps } from '../AnimationNodeSteps/SequenceSteps.js';
import { ScreenCoordinates } from '../CoordinatesModel/ScreenCoordinates.js';
import { TreeCoordinates } from '../CoordinatesModel/TreeCoordinates.js';



export class ControlHandlersBinarySearchTree extends ControlHandlersAbstractTree
{
    constructor(tree)
    {
        super(tree);
        this.tree = tree;
        this.binarySearchTreeOperation = new BinarySearchTreeOperation(this.tree);
        this.binarySearchTreeAnimationStepConfiguration = new BinarySearchTreeAnimationStepConfiguration();
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
        this.binarySearchTreeOperation.onAddNewEntryToHtmlTableOnAddNode(addedNode);         
        let patternStepAnimationArrayAddingNode = this.binarySearchTreeAnimationStepConfiguration.getPatternStepAnimationArrayAddingNode();
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
                this.binarySearchTreeOperation.onUpdateEntryInHtmlTableOnAddNode(nodeToAdd); // only in this order
                this.onAlignTreeByWidth(evn, this.tree, treeCoordinates);
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
            }.bind(this));
        }

        if (nodeDomElement)
        {
            nodeDomElement.addEventListener("animationend", function (evn)
            {
                this.customEventHandler.dispatchNodeAdded(evn.animationName, superContainerElementName, nodeToAdd); // fire event "nodeAdded"
                this.customEventHandler.dispatchNodeAlignedByHeight(evn.animationName, superContainerElementName, nodeToAdd);
                this.customEventHandler.dispatchNodeAlignedByWidth(evn.animationName, superContainerElementName, nodeToAdd); // fire event "alignedByWidth" to start update balance factors and start balancing if it needed
            }.bind(this)); // this.tree is a global variable

            nodeDomElement.addEventListener("alignedByWidth", function (evn)
            {
                this.customEventHandler.dispatchDisableGroupControls(false);
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
                    this.binarySearchTreeOperation.onUpdateEntryInHtmlTableOnDeleteNode(nodeToAdd, nodeToAdd.value);
                    this.domUpdater.removeDomElement(nodeToAdd, "superContainer");
                    this.resetFlagsAfterDeletion();
                }
                else if (this.tree.treeViewState.isNodeToBeDeleted && this.tree.treeViewState.wasFoundNodeToBeDeleted === false)
                {
                    let enteredValueOfNodeToBeDeleted = this.tree.treeViewState.enteredValueOfNodeToBeDeleted;
                    this.binarySearchTreeOperation.onUpdateEntryInHtmlTableOnDeleteNode(null, enteredValueOfNodeToBeDeleted);
                    this.resetFlagsAfterDeletion();
                }
                else if (this.tree.treeViewState.isNodeToBeDeleted && this.tree.treeViewState.wasFoundNodeToBeDeleted === null)
                {
                    throw new Error("Incorrect flag during deletion");
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
                this.binarySearchTreeOperation.onUpdateEntryInHtmlTableOnAddNode(nodeToAdd); // only in this order
                this.onAlignTreeByWidth(evn, this.tree, treeCoordinates);
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
            }.bind(this));
        }


        if (nodeDomElement)
        {
            nodeDomElement.addEventListener("animationend", function (evn)
            {
                this.customEventHandler.dispatchNodeAdded(evn.animationName, superContainerElementName, nodeToAdd); // fire event "nodeAdded"
                this.customEventHandler.dispatchNodeAlignedByHeight(evn.animationName, superContainerElementName, nodeToAdd);
                this.customEventHandler.dispatchNodeAlignedByWidth(evn.animationName, superContainerElementName, nodeToAdd); // fire event "alignedByWidth" to start update balance factors and start balancing if it needed
            }.bind(this));

            nodeDomElement.addEventListener("alignedByWidth", function (evn)
            {
                this.customEventHandler.dispatchDisableGroupControls(false);
                if (this.tree.treeViewState.isNodeToBeDeleted)
                {
                    this.resetFlagsAfterDeletion();
                }
            }.bind(this));

            nodeDomElement.addEventListener("findigNodeEnd", function (evn)
            {
                // delete root when it is single node in RBT
                if (this.tree.treeViewState.isNodeToBeDeleted && this.tree.currentAmountOfNodesInTree === 0 && this.tree.treeViewState.wasFoundNodeToBeDeleted === true)
                {
                    this.customEventHandler.dispatchNodeDeleted(nodeToAdd);
                    this.binarySearchTreeOperation.onUpdateEntryInHtmlTableOnDeleteNode(nodeToAdd, nodeToAdd.value);
                    this.domUpdater.removeDomElement(nodeToAdd, "superContainer");
                    this.resetFlagsAfterDeletion();
                }
                else if (this.tree.treeViewState.isNodeToBeDeleted && this.tree.treeViewState.wasFoundNodeToBeDeleted === false)
                {
                    let enteredValueOfNodeToBeDeleted = this.tree.treeViewState.enteredValueOfNodeToBeDeleted;
                    this.binarySearchTreeOperation.onUpdateEntryInHtmlTableOnDeleteNode(null, enteredValueOfNodeToBeDeleted);
                    this.resetFlagsAfterDeletion();
                }
                else if (this.tree.treeViewState.isNodeToBeDeleted && this.tree.treeViewState.wasFoundNodeToBeDeleted === null)
                {
                    throw new Error("Incorrect flag during deletion");
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
        this.binarySearchTreeOperation.onAddNewEntryToHtmlTableOnDeleteNode(valueToFind);
        if (!nodeToDelete) // for case when trying to delete node that does not exist in this.tree (nodeFinder will go down through branch and disappears)
        {
            return;
        }
        let successor = this.tree.findSuccessorOf(nodeToDelete);
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
                this.binarySearchTreeOperation.onAddNewEntryToHtmlTableOnAlignmentByHeight(successor);
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
                this.binarySearchTreeOperation.onUpdateEntryInHtmlTableOnAlignmentByHeight(successor);
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
            this.binarySearchTreeOperation.onUpdateEntryInHtmlTableOnAlignmentByHeight(successor);
            this.customEventHandler.dispatchNodeDeleted(nodeToDelete);
            this.onBeforeDeletionNode(superContainerName);

        }.bind(this),
            { once: true });
    }


    onAddRangeOfNodes()
    {
        let patternStepAnimationArrayAddRangeOfNodes = this.binarySearchTreeAnimationStepConfiguration.getPatternStepAnimationArrayAddRangeOfNodes();
        let parsedValuesOfRange = this.processInputRangeValues();
        parsedValuesOfRange.forEach(valueOfRange =>
        {
            this.tree.insert(valueOfRange);
        });
        let screenCoordinates = new ScreenCoordinates();
        let screenXCenterCoorditate = screenCoordinates.getScreenXCenter();
        let treeCoordinates = new TreeCoordinates(this.tree, screenXCenterCoorditate, 300);
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
            this.binarySearchTreeOperation.onAddNewEntryToHtmlTableOnAddRangeOfNodes(nodeFromRangeToAdd);
            this.onAnimationEndAddRangeOfNodes(nodeFromRangeToAdd, treeCoordinates, stepsAddNodeFromRange, preLastNode);
        });
    }
}