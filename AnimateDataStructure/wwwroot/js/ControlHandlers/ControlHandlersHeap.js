import { ControlHandlersAbstractTree } from './ControlHandlersAbstractTree.js';
import { TraversingContext } from '../DatastructureTraversingTypes/TraversingContext.js';
import { HeapOperation } from '../DataStructureOperations/HeapOperation.js';
import { HeapAnimationStepConfiguration } from '../PatternStepAnimationOperation/HeapAnimationStepConfiguration.js';
import { SequenceSteps } from '../AnimationNodeSteps/SequenceSteps.js';
import { ScreenCoordinates } from '../CoordinatesModel/ScreenCoordinates.js';
import { TreeCoordinates } from '../CoordinatesModel/TreeCoordinates.js';
import { TraversingTreePreorder } from '../DatastructureTraversingTypes/TraversingTreePreorder.js';

export class ControlHandlersHeap extends ControlHandlersAbstractTree
{
    constructor(isMaxHeap, tree)
    {
        super(tree);
        this.tree = tree;
        this.isMaxHeap = isMaxHeap;
        this.traversingContext = new TraversingContext(this, this.tree);
        this.heapOperation = new HeapOperation(this.tree, this.isMaxHeap);
        this.heapAnimationStepConfiguration = new HeapAnimationStepConfiguration();
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
        this.tree.nodeToCheckHeapify = addedNode;
        this.heapOperation.onAddNewEntryToHtmlTableOnAddNode(addedNode);
        let patternStepAnimationArrayAddNodeToHeap = this.heapAnimationStepConfiguration.getPatternStepAnimationArrayAddNodeToHeap();
        let sequenceSteps = new SequenceSteps(this.tree);
        let stepsAdditionNode = sequenceSteps.createSequenceStepsAdditionNode(addedNode, patternStepAnimationArrayAddNodeToHeap);
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
                this.heapOperation.onUpdateEntryInHtmlTableOnAddNode(nodeToAdd); // only in this order
                this.onAlignTreeByWidth(evn, this.tree, treeCoordinates);
            }.bind(this),
                { once: true });

            nodeDomElement.addEventListener("nodeDeleted", function (evn)
            {
                this.onAlignTreeByWidth(evn, this.tree, treeCoordinates);
            }.bind(this),
                { once: true });
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
                this.customEventHandler.dispatchLinkHiddenBeforeSwapNodes(evn.animationName, svgLineLinkElementName, nodeToAdd);
                this.customEventHandler.dispatchShowLinksAfterAllSwaps(evn.animationName, svgLineLinkElementName, nodeToAdd, this.isMaxHeap);
            }.bind(this));


            svgLineDomElement.addEventListener("linkHiddenBeforeSwapNodes", function (evn)
            {
                let lastBottomNode = evn.detail.nodeWhereFiredEvent;
                if (this.tree.treeViewState.isNodeToBeDeleted && !Object.is(this.tree.lastDeletedNode, lastBottomNode)) // heapify during deletion node
                {
                    if (Object.is(this.tree.lastDeletedNode, lastBottomNode.parentNode))
                    {
                        this.onSwapNodes(lastBottomNode, this.tree.lastDeletedNode, this.isMaxHeap);
                    }
                    else
                    {
                        this.onSwapNodes(this.tree.lastDeletedNode, lastBottomNode, this.isMaxHeap);
                    }
                }
                else if (this.tree.treeViewState.isNodeToBeDeleted && Object.is(this.tree.lastDeletedNode, lastBottomNode)) // heapify during deletion node
                {
                    this.tree.deleteNode(this.tree.lastDeletedNode);
                    this.customEventHandler.dispatchNodeDeleted(this.tree.lastDeletedNode);
                    let superContainerElementName = "superContainer";
                    this.onBeforeDeletionNode(superContainerElementName);
                    this.tree.treeViewState.isNodeToBeDeleted = false;
                    this.tree.isLinkContainerShown = true;
                }
                else // heapify after adding node
                {
                    this.onHeapifyTwoNodes(lastBottomNode);
                }

            }.bind(this));
        }

        if (nodeDomElement)
        {
            nodeDomElement.addEventListener("animationend", function (evn)
            {
                this.customEventHandler.dispatchNodeAdded(evn.animationName, superContainerElementName, nodeToAdd); // fire event "nodeAdded"
                this.customEventHandler.dispatchNodeAlignedByWidth(evn.animationName, superContainerElementName, nodeToAdd); // fire event "alignedByWidth" to start update balance factors and start balancing if it needed
                this.customEventHandler.dispatchSwapTwoNodesEnded(evn.animationName, superContainerElementName, nodeToAdd);
            }.bind(this));

            nodeDomElement.addEventListener("alignedByWidth", function (evn)
            {
                if (!this.tree.isNeedAlignmentByWidth && this.tree.currentAmountOfNodesInTree === 1)
                {
                    this.customEventHandler.dispatchDisableGroupControls(false);
                }
                this.onStartBuildingHeap(this.isMaxHeap);
            }.bind(this));
        }

        nodeDomElement.addEventListener("swapTwoNodesEnded", function (evn)
        {
            if (this.tree.treeViewState.isNodeToBeDeleted)
            {
                this.tree.deleteNode(this.tree.lastDeletedNode);
            }
            // Heapify
            let nodeWhereFiredEvent = evn.detail.nodeWhereFiredEvent;
            let isNeededHeapify = this.onHeapifyTwoNodes(nodeWhereFiredEvent);
            if (!isNeededHeapify)
            {
                if (this.tree.treeViewState.isNodeToBeDeleted)
                {
                    if (this.tree.currentAmountOfNodesInTree <= 1)
                    {
                        this.customEventHandler.dispatchShowLinksAfterAllSwaps("svgLineShowAfterSwapNodes", svgLineLinkElementName, nodeToAdd, this.isMaxHeap);
                    }
                    else
                    {
                        this.onAnimationLinesBeforeDeletionNode(this.tree.lastDeletedNode);
                    }
                }
                else
                {
                    this.heapOperation.onUpdateEntryInHtmlTableOnHeapifyEnd(nodeWhereFiredEvent.value);
                    this.onAnimationLinesBeforeAfterSwapAllNodes(false);
                    this.customEventHandler.dispatchDisableGroupControls(false);
                }
            }
        }.bind(this));
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
                this.heapOperation.onUpdateEntryInHtmlTableOnAddNode(nodeToAdd); // only in this order
                this.onAlignTreeByWidth(evn, this.tree, treeCoordinates);
            }.bind(this),
                { once: true });

            nodeDomElement.addEventListener("nodeDeleted", function (evn)
            {
                this.onAlignTreeByWidth(evn, this.tree, treeCoordinates);
            }.bind(this),
                { once: true });
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
                this.customEventHandler.dispatchLinkHiddenBeforeSwapNodes(evn.animationName, svgLineLinkElementName, nodeToAdd);
                this.customEventHandler.dispatchShowLinksAfterAllSwaps(evn.animationName, svgLineLinkElementName, nodeToAdd, this.isMaxHeap);
            }.bind(this));

            svgLineDomElement.addEventListener("linkHiddenBeforeSwapNodes", function (evn)
            {
                let lastBottomNode = evn.detail.nodeWhereFiredEvent;

                if (this.tree.treeViewState.isNodeToBeDeleted && !Object.is(this.tree.lastDeletedNode, lastBottomNode)) // heapify during deletion node
                {
                    if (Object.is(this.tree.lastDeletedNode, lastBottomNode.parentNode))
                    {
                        this.onSwapNodes(lastBottomNode, this.tree.lastDeletedNode, this.isMaxHeap);
                    }
                    else
                    {
                        this.onSwapNodes(this.tree.lastDeletedNode, lastBottomNode, this.isMaxHeap);
                    }
                }
                else if (this.tree.treeViewState.isNodeToBeDeleted && Object.is(this.tree.lastDeletedNode, lastBottomNode)) // heapify during deletion node
                {
                    this.tree.deleteNode(this.tree.lastDeletedNode);
                    this.customEventHandler.dispatchNodeDeleted(this.tree.lastDeletedNode);
                    let superContainerElementName = "superContainer";
                    this.onBeforeDeletionNode(superContainerElementName);
                    this.tree.treeViewState.isNodeToBeDeleted = false;
                    this.tree.isLinkContainerShown = true;
                }
                else // heapify after adding node
                {
                    this.onHeapifyTwoNodes(lastBottomNode);
                }
            }.bind(this));
        }

        if (nodeDomElement)
        {
            nodeDomElement.addEventListener("animationend", function (evn)
            {
                this.customEventHandler.dispatchNodeAdded(evn.animationName, superContainerElementName, nodeToAdd); // fire event "nodeAdded"
                this.customEventHandler.dispatchNodeAlignedByWidth(evn.animationName, superContainerElementName, nodeToAdd); // for balancing (fire event "alignedByWidth" to start update balance factors and start balancing if it needed)                
                this.customEventHandler.dispatchSwapTwoNodesEnded(evn.animationName, superContainerElementName, nodeToAdd);
            }.bind(this));

            nodeDomElement.addEventListener("alignedByWidth", function (evn)
            {
                if (!this.tree.isNeedAlignmentByWidth && this.tree.currentAmountOfNodesInTree === 1)
                {
                    this.customEventHandler.dispatchDisableGroupControls(false); // dispatch event to enable buttons and input
                }
                this.onStartBuildingHeap(this.isMaxHeap);
            }.bind(this));
        }

        nodeDomElement.addEventListener("swapTwoNodesEnded", function (evn)
        {
            if (this.tree.treeViewState.isNodeToBeDeleted)
            {
                this.tree.deleteNode(this.tree.lastDeletedNode);
            }
            // Heapify
            let nodeWhereFiredEvent = evn.detail.nodeWhereFiredEvent;
            let isNeededHeapify = this.onHeapifyTwoNodes(nodeWhereFiredEvent);
            if (!isNeededHeapify)
            {
                if (this.tree.treeViewState.isNodeToBeDeleted)
                {
                    if (this.tree.currentAmountOfNodesInTree <= 1)
                    {
                        this.customEventHandler.dispatchShowLinksAfterAllSwaps("svgLineShowAfterSwapNodes", svgLineLinkElementName, nodeToAdd, this.isMaxHeap);
                    }
                    else
                    {
                        this.onAnimationLinesBeforeDeletionNode(this.tree.lastDeletedNode);
                    }
                }
                else
                {
                    this.heapOperation.onUpdateEntryInHtmlTableOnHeapifyEnd(nodeWhereFiredEvent.value);
                    this.onAnimationLinesBeforeAfterSwapAllNodes(false);
                    this.customEventHandler.dispatchDisableGroupControls(false);
                }
            }

        }.bind(this));
        this.addOnClickEventHandler(nodeToAdd);
    }


    onAddRangeOfNodes()
    {
        let patternStepAnimationArrayAddRangeOfNodes = this.heapAnimationStepConfiguration.getPatternStepAnimationArrayAddRangeOfNodes();
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
            this.heapOperation.onAddNewEntryToHtmlTableOnAddRangeOfNodes(nodeFromRangeToAdd);
            this.onAnimationEndAddRangeOfNodes(nodeFromRangeToAdd, treeCoordinates, stepsAddNodeFromRange, preLastNode);
        });
    }


    onStartBuildingHeap(isMaxHeap)
    {
        if (this.tree.treeLevels < 2)
        {
            return;
        }
        let lastBottomNode = this.tree.findLastNodeOfBottomLevel();
        if (isMaxHeap && lastBottomNode.parentNode.value >= lastBottomNode.value) // secondNodeToSwap as parent of firstNodeToSwap
        {
            this.customEventHandler.dispatchDisableGroupControls(false);
            return;
        }
        if (!isMaxHeap && lastBottomNode.parentNode.value <= lastBottomNode.value) // secondNodeToSwap as parent of firstNodeToSwap
        {
            this.customEventHandler.dispatchDisableGroupControls(false);
            return;
        }
        if (this.tree.isLinkContainerShown)
        {
            this.heapOperation.onAddNewEntryToHtmlTableOnHeapify(lastBottomNode.value);
        }
        this.customEventHandler.dispatchDisableGroupControls(true);
        this.onAnimationLinesBeforeAfterSwapAllNodes(true);
    }


    onSwapNodes(firstNodeToSwap, secondNodeToSwap, isMaxHeap) // before swap: secondNodeToSwap - upper    firstNodeToSwap - lower node
    {
        if (!firstNodeToSwap)
        {
            throw new Error(`First node to swap is ${firstNodeToSwap}`);
        }
        if (!secondNodeToSwap)
        {
            this.heapOperation.onUpdateEntryInHtmlTableOnHeapifyEnd(firstNodeToSwap.value);
            this.onAnimationLinesBeforeAfterSwapAllNodes(false);
            return;
        }
        this.tree.swapNodes(firstNodeToSwap, secondNodeToSwap);
        this.setLastSwappedNodes(firstNodeToSwap, secondNodeToSwap);
        let patternStepAnimationArraySwapNode = this.heapAnimationStepConfiguration.getPatternStepAnimationArraySwapNode();
        let sequenceSteps = new SequenceSteps(this.tree);
        let allNodesByLevels = this.tree.getAllNodesByLevels();
        for (let currentLevel = 0; currentLevel < allNodesByLevels.length; currentLevel++)
        {
            for (let n = 0; n < allNodesByLevels[currentLevel].length; n++)
            {
                let nodeToSwap = allNodesByLevels[currentLevel][n];
                let sequenceStepsSwapNode = null;
                if (Object.is(firstNodeToSwap, nodeToSwap))
                {
                    sequenceStepsSwapNode = sequenceSteps.createSequenceStepsSwapNodes(firstNodeToSwap, secondNodeToSwap, patternStepAnimationArraySwapNode);
                }
                else if (Object.is(secondNodeToSwap, nodeToSwap))
                {
                    sequenceStepsSwapNode = sequenceSteps.createSequenceStepsSwapNodes(secondNodeToSwap, firstNodeToSwap, patternStepAnimationArraySwapNode);
                }
                else
                {
                    sequenceStepsSwapNode = sequenceSteps.createSequenceStepsSwapNodes(nodeToSwap, nodeToSwap, patternStepAnimationArraySwapNode);
                }
            }
        }
    }


    // setting occurs after swapping
    setLastSwappedNodes(firstNodeToSwap, secondNodeToSwap)
    {
        if (firstNodeToSwap.levelInTree >= secondNodeToSwap.levelInTree)
        {
            this.tree.lastSwappedNode = {
                higherNodeBeforeSwap: firstNodeToSwap,
                lowerNodeBeforeSwap: secondNodeToSwap,
            }
        }
        else
        {
            this.tree.lastSwappedNode = {
                higherNodeBeforeSwap: secondNodeToSwap,
                lowerNodeBeforeSwap: firstNodeToSwap,
            }
        }
    }


    onHeapifyTwoNodes(lastAddedNode)
    {
        let isNeedHepifyUp = this.onHeapifyUpTwoNodes(lastAddedNode);
        let isNeedHepifyDown = this.onHeapifyDownTwoNodes(lastAddedNode);
        return isNeedHepifyUp || isNeedHepifyDown;
    }


    onHeapifyUpTwoNodes(lastAddedNode)
    {
        let isNeedHepifyUp = false;
        if (!this.isMaxHeap)
        {
            isNeedHepifyUp = lastAddedNode.parentNode !== null && lastAddedNode.parentNode.value > lastAddedNode.value;
        }
        else
        {
            isNeedHepifyUp = lastAddedNode.parentNode !== null && lastAddedNode.parentNode.value < lastAddedNode.value;
        }
        if (isNeedHepifyUp)
        {
            this.onSwapNodes(lastAddedNode, lastAddedNode.parentNode, this.isMaxHeap);
        }
        return isNeedHepifyUp;
    }


    onHeapifyDownTwoNodes(lastAddedNode)
    {
        let isNeedHepifyDown = false;
        let leftChildLastAddedNode = lastAddedNode.leftChild;
        let rightChildLastAddedNode = lastAddedNode.rightChild;
        if (!this.isMaxHeap)
        {
            let minChild;
            if (leftChildLastAddedNode && rightChildLastAddedNode)
            {
                isNeedHepifyDown = lastAddedNode.value > leftChildLastAddedNode.value || lastAddedNode.value > rightChildLastAddedNode.value;

                if (isNeedHepifyDown)
                {
                    minChild = leftChildLastAddedNode.value < rightChildLastAddedNode.value ? leftChildLastAddedNode : rightChildLastAddedNode;
                    this.onSwapNodes(minChild, lastAddedNode, this.isMaxHeap);
                }
            }
            else if (leftChildLastAddedNode && !rightChildLastAddedNode)
            {
                isNeedHepifyDown = lastAddedNode.value > leftChildLastAddedNode.value;
                if (isNeedHepifyDown)
                {
                    minChild = leftChildLastAddedNode;
                    this.onSwapNodes(minChild, lastAddedNode, this.isMaxHeap);
                }
            }
            else if (!leftChildLastAddedNode && rightChildLastAddedNode)
            {
                isNeedHepifyDown = lastAddedNode.value > rightChildLastAddedNode.value;
                if (isNeedHepifyDown)
                {
                    minChild = rightChildLastAddedNode;

                    this.onSwapNodes(minChild, lastAddedNode, this.isMaxHeap);
                }
            }
        }
        else
        {
            let maxChild;
            if (leftChildLastAddedNode && rightChildLastAddedNode)
            {
                isNeedHepifyDown = lastAddedNode.value < leftChildLastAddedNode.value || lastAddedNode.value < rightChildLastAddedNode.value;

                if (isNeedHepifyDown)
                {
                    maxChild = leftChildLastAddedNode.value > rightChildLastAddedNode.value ? leftChildLastAddedNode : rightChildLastAddedNode;
                    this.onSwapNodes(maxChild, lastAddedNode, this.isMaxHeap);
                }
            }
            else if (leftChildLastAddedNode && !rightChildLastAddedNode)
            {
                isNeedHepifyDown = lastAddedNode.value < leftChildLastAddedNode.value;

                if (isNeedHepifyDown)
                {
                    maxChild = leftChildLastAddedNode;
                    this.onSwapNodes(maxChild, lastAddedNode, this.isMaxHeap);
                }
            }
            else if (!leftChildLastAddedNode && rightChildLastAddedNode)
            {
                isNeedHepifyDown = lastAddedNode.value < rightChildLastAddedNode.value;

                if (isNeedHepifyDown)
                {
                    maxChild = rightChildLastAddedNode;
                    this.onSwapNodes(maxChild, lastAddedNode, this.isMaxHeap);
                }
            }
        }
        return isNeedHepifyDown;
    }


    // Hide or show 1 link of node before after swap nodes
    onAnimationLinkBeforeAfterSwapNodes(nodeToAnimateLinkBeforeAfterSwapNodes, isHideLink)
    {
        let patternStepAnimationLinkBeforeAfterSwapNodes = this.heapAnimationStepConfiguration.getPatternStepAnimationLinkBeforeAfterSwapNodes();
        let sequenceSteps = new SequenceSteps(this.tree);
        let stepsLinkNodeAction = sequenceSteps.createSequenceStepsLinkBeforeAfterSwapNodes(nodeToAnimateLinkBeforeAfterSwapNodes, patternStepAnimationLinkBeforeAfterSwapNodes, isHideLink);
        if (isHideLink === false)
        {
            sequenceSteps.updateHtmlLinkContainerSwapNodes(nodeToAnimateLinkBeforeAfterSwapNodes);
            this.tree.isLinkContainerShown = true;
        }
    }


    onAnimationLinesBeforeAfterSwapAllNodes(isHideLines)
    {
        let allNodesByLevels = this.tree.getAllNodesByLevels();
        for (let currentLevel = 0; currentLevel < allNodesByLevels.length; currentLevel++)
        {
            for (let n = 0; n < allNodesByLevels[currentLevel].length; n++)
            {
                let currentNode = allNodesByLevels[currentLevel][n];
                this.onAnimationLinkBeforeAfterSwapNodes(currentNode, isHideLines);
            }
        }
    }


    // Draw lines for all nodes except the line of nodeToDelete
    onAnimationLinesBeforeDeletionNode(nodeToDelete)
    {
        if (!nodeToDelete)
        {
            throw new Error(`Node to delete is empty`);
        }
        let allNodesByLevels = this.tree.getAllNodesByLevels();
        for (let currentLevel = 0; currentLevel < allNodesByLevels.length; currentLevel++)
        {
            for (let n = 0; n < allNodesByLevels[currentLevel].length; n++)
            {
                let currentNode = allNodesByLevels[currentLevel][n];
                if (!Object.is(nodeToDelete, currentNode))
                {
                    this.onAnimationLinkBeforeAfterSwapNodes(currentNode, false);
                }
            }
        }
    }


    onClickButtonFindNode()
    {
        if (this.tree.currentAmountOfNodesInTree === 0)
        {
            return;
        }
        let superContainerName = "superContainer";
        this.customEventHandler.dispatchDisableGroupControls(true);
        if (this.tree.treeViewState.getLastClickedNode()) // "automatically" hide clicking on node if it was clicked before
        {
            this.onHideClickNode();
            this.tree.treeViewState.setLastClickedNode(null);
        }
        this.hideGlowingBorderForPreviouslyFoundNode();
        let valueToFind = this.processInputForNodeValue();
        this.heapOperation.onAddNewEntryToHtmlTableOnFindNode(valueToFind);
        this.addHandlerOnUpdateEntryInHtmlTableOnFindNode(valueToFind, superContainerName);
        this.traversingContext.onTraversingTree(this.tree.root, new TraversingTreePreorder(this.tree, valueToFind));
    }


    addHandlerOnUpdateEntryInHtmlTableOnFindNode(valueToFind, superContainerName)
    {
        let foundNode = this.tree.findNode(valueToFind);
        let wasFoundValue = foundNode !== null;
        // event "lastNodeBeforeEndingTraversing" fired on the last node of conditional traversing (if node not found, event fired on root)
        // if node not found during find (in essence, conditional traversing) then event "lastNodeBeforeEndingTraversing"
        // handled on root, because root is a node that always the last in conditional traversing when value is not found
        let domElementToHandleLastTraversedNode = foundNode ? this.domUpdater.getDomElement(foundNode, superContainerName) :
            this.domUpdater.getDomElement(this.tree.root, superContainerName);
        domElementToHandleLastTraversedNode.addEventListener("lastNodeBeforeEndingTraversing", function (evn)
        {
            this.heapOperation.onUpdateEntryInHtmlTableOnFindNode(valueToFind, wasFoundValue);
            this.customEventHandler.dispatchDisableGroupControls(false);
        }.bind(this),
            { once: true });
    }


    onFindHeapNodesBeforeDeletion(nodeToDelete, lastBottomNode)
    {
        if (!lastBottomNode)
        {
            throw new Error("Incorrect last bottom node");
        }
        if (this.tree.treeViewState.getLastClickedNode()) // "automatically" hide clicking on node if it was clicked before
        {
            this.onHideClickNode();
            this.tree.treeViewState.setLastClickedNode(null);
        }
        let superContainerName = "superContainer";
        if (!nodeToDelete) // case when Heap does not contain value that should be deleted
        {
            this.addHandlerOnEndSearchingNodeToDeleteThatNotExists(nodeToDelete, superContainerName);
            this.traversingContext.onTraversingTree(this.tree.root, new TraversingTreePreorder(this.tree));
            return;
        }
        this.traversingContext.onTraversingTree(this.tree.root, new TraversingTreePreorder(this.tree, nodeToDelete.value));
        this.addHandlerOnNodeToBeDeletedFound(nodeToDelete, lastBottomNode, superContainerName);
    }


    addHandlerOnNodeToBeDeletedFound(nodeToDelete, lastBottomNode, superContainerName)
    {
        let domElementNodeToDelete = this.domUpdater.getDomElement(nodeToDelete, superContainerName);
        domElementNodeToDelete.addEventListener("lastNodeBeforeEndingTraversing", function (evn)
        {
            this.heapOperation.onUpdateEntryInHtmlTableOnFindNodeBeforeDeletion(nodeToDelete.value, true);
            if (!Object.is(nodeToDelete, lastBottomNode))
            {
                this.heapOperation.onAddNewEntryToHtmlTableOnFindLastBottomNode();
                this.traversingContext.onTraversingTree(lastBottomNode, new TraversingTreePreorder(this.tree, lastBottomNode.value));
            }
        }.bind(this),
            { once: true });
    }


    onClickButtonDeleteNode()
    {
        if (this.tree.currentAmountOfNodesInTree === 0)
        {
            return;
        }
        this.customEventHandler.dispatchDisableGroupControls(true);
        if (this.tree.treeViewState.getLastClickedNode()) // "automatically" hide clicking on node if a new node is added
        {
            this.onHideClickNode();
            this.tree.treeViewState.setLastClickedNode(null);
        }
        this.hideGlowingBorderForPreviouslyFoundNode();
        this.tree.treeViewState.isNodeToBeDeleted = true; // set false after the end node deletion
        let valueToFind = this.processInputForNodeValue();
        let nodeToDelete = this.tree.findNode(valueToFind);
        this.tree.treeViewState.wasFoundNodeToBeDeleted = nodeToDelete !== null; // set NULL after the end node deletion
        this.tree.treeViewState.enteredValueOfNodeToBeDeleted = valueToFind;
        this.heapOperation.onAddNewEntryToHtmlTableOnDeleteNode(valueToFind);
        if (nodeToDelete)
        {
            this.tree.lastDeletedNode = nodeToDelete;
        }
        let lastBottomNode = this.tree.findLastNodeOfBottomLevel();
        this.tree.nodeToCheckHeapify = lastBottomNode;
        this.heapOperation.onAddNewEntryToHtmlTableOnFindNodeBeforeDeletion(valueToFind);
        this.onFindHeapNodesBeforeDeletion(nodeToDelete, lastBottomNode);
        if (nodeToDelete)
        {
            let superContainerName = "superContainer";
            var domElementLastBottomNode = this.domUpdater.getDomElement(lastBottomNode, superContainerName);
            domElementLastBottomNode.addEventListener("lastNodeBeforeEndingTraversing", function (evn)
            {
                if (!Object.is(nodeToDelete, lastBottomNode))
                {
                    this.heapOperation.onUpdateEntryInHtmlTableOnFindLastBottomNode(lastBottomNode.value);
                }
                this.onDeleteNodeHeap(nodeToDelete, lastBottomNode);
            }.bind(this),
                { once: true });
        }
    }


    onDeleteNodeHeap(nodeToDelete, lastBottomNode)
    {
        if (!nodeToDelete)
        {
            throw new Error("Incorrect node to delete");
        }
        if (!lastBottomNode)
        {
            throw new Error("Incorrect last bottom node");
        }
        this.customEventHandler.dispatchDisableGroupControls(true);
        this.tree.nodeToCheckHeapify = lastBottomNode;
        let superContainerElementName = "superContainer";
        let svgLineLinkElementName = "svgLineLink";
        let svgLineDomElementLastBottomNode = this.domUpdater.getDomElement(lastBottomNode, svgLineLinkElementName);
        svgLineDomElementLastBottomNode.addEventListener("showLinkAfterAllSwaps", function (evn)
        {
            if (!Object.is(nodeToDelete, lastBottomNode))
            {
                this.heapOperation.onUpdateEntryInHtmlTableOnHeapifyEnd(lastBottomNode.value);
                this.customEventHandler.dispatchNodeDeleted(this.tree.lastDeletedNode);
                this.onBeforeDeletionNode(superContainerElementName);
                this.tree.treeViewState.isNodeToBeDeleted = false;
                this.tree.isLinkContainerShown = true;
                this.tree.treeViewState.wasFoundNodeToBeDeleted = null;
            }
        }.bind(this),
            { once: true });

        if (this.tree.currentAmountOfNodesInTree === 1 && Object.is(this.tree.lastDeletedNode, lastBottomNode)) // for case, when need deletion of root
        {
            this.tree.deleteNode(this.tree.lastDeletedNode);
            this.customEventHandler.dispatchNodeDeleted(this.tree.lastDeletedNode);
            this.onBeforeDeletionNode(superContainerElementName);
            this.tree.treeViewState.isNodeToBeDeleted = false;
            this.tree.treeViewState.wasFoundNodeToBeDeleted = null;
            this.customEventHandler.dispatchDisableGroupControls(false);
        }
        if (Object.is(this.tree.lastDeletedNode, lastBottomNode))
        {
            this.onAnimationLinkBeforeAfterSwapNodes(nodeToDelete, true);
            return;
        }
        if (!nodeToDelete) // for case when trying to delete node that does not exist in tree (nodeFinder will go down through branch and disappears)
        {
            return;
        }
        this.heapOperation.onAddNewEntryToHtmlTableOnHeapify(lastBottomNode.value);
        this.onAnimationLinesBeforeAfterSwapAllNodes(true);
    }


    addHandlerOnEndSearchingNodeToDeleteThatNotExists(nodeToDelete, superContainerName)
    {
        let valueToDelete = this.tree.treeViewState.enteredValueOfNodeToBeDeleted;
        // event "lastNodeBeforeEndingTraversing" fired on the last node of conditional traversing (if node not found, event fired on root)
        // if node not found during find (in essence, conditional traversing) then event "lastNodeBeforeEndingTraversing"
        // handled on root, because root is a node that always the last in conditional traversing when value is not found
        let domElementToHandleLastTraversedNode = this.domUpdater.getDomElement(this.tree.root, superContainerName);
        domElementToHandleLastTraversedNode.addEventListener("lastNodeBeforeEndingTraversing", function (evn)
        {
            this.heapOperation.onUpdateEntryInHtmlTableOnFindNodeBeforeDeletion(valueToDelete, false);
            this.heapOperation.onUpdateEntryInHtmlTableOnDeleteNode(nodeToDelete, valueToDelete);
            this.customEventHandler.dispatchDisableGroupControls(false);
        }.bind(this),
            { once: true });
    }
}