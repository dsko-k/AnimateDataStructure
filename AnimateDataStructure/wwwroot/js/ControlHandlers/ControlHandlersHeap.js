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
        this.isMaxHeap = isMaxHeap; // stays in this class

        //?????
        this.traversingContext = new TraversingContext(this, this.tree);
        this.heapOperation = new HeapOperation(this.tree, this.isMaxHeap);
        this.heapAnimationStepConfiguration = new HeapAnimationStepConfiguration();
    }


    // Heap
    // Partialy duplication of method onClickButtonAddNode()
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

        this.tree.insert(valueToAdd); //this.tree.insert(valueToAdd);

        // DUPLICATION
        let screenCoordinates = new ScreenCoordinates();
        let screenXCenterCoorditate = screenCoordinates.getScreenXCenter();
        let treeCoordinates = new TreeCoordinates(this.tree, screenXCenterCoorditate, 300);

        treeCoordinates.setStartPositions(this.tree.lastAddedNode);
        treeCoordinates.setCoordinates(this.tree.lastAddedNode);

        let addedNode = this.tree.lastAddedNode;
        this.tree.nodeToCheckHeapify = addedNode; // ????????????????????????????

        this.heapOperation.onAddNewEntryToHtmlTableOnAddNode(addedNode);

        // correct ADD HEAP node
        let patternStepAnimationArrayAddNodeToHeap = this.heapAnimationStepConfiguration.getPatternStepAnimationArrayAddNodeToHeap();

        // get sequence of the steps
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
            // ???
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
                    this.onHeapifyTwoNodes(lastBottomNode); // ??????
                }

            }.bind(this)); // should not include { once: true }
        }


        // attach custom event handler when node relocated DUPLICATION of above !!!!!!!!!!!!!!!!!!!!


        if (nodeDomElement)
        {
            nodeDomElement.addEventListener("animationend", function (evn)
            {
                this.customEventHandler.dispatchNodeAdded(evn.animationName, superContainerElementName, nodeToAdd); // fire event "nodeAdded"

                this.customEventHandler.dispatchNodeAlignedByWidth(evn.animationName, superContainerElementName, nodeToAdd); // for balancing (fire event "alignedByWidth" to start update balance factors and start balancing if it needed)

                // Heap
                this.customEventHandler.dispatchSwapTwoNodesEnded(evn.animationName, superContainerElementName, nodeToAdd);

            }.bind(this));


            nodeDomElement.addEventListener("alignedByWidth", function (evn)
            {
                // dispatch event to enable buttons and input

                //if (!this.tree.isNeedAlignmentByWidth)
                //{
                //    this.customEventHandler.dispatchDisableGroupControls(false);
                //}

                // ??????
                if (!this.tree.isNeedAlignmentByWidth && this.tree.currentAmountOfNodesInTree === 1)
                {
                    this.customEventHandler.dispatchDisableGroupControls(false);
                }

                this.onStartBuildingHeap(this.isMaxHeap);

            }.bind(this));
        }


        // Heap
        nodeDomElement.addEventListener("swapTwoNodesEnded", function (evn)
        {
            // delete node

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
                    //this.onAnimationLinesBeforeDeletionNode(this.tree.lastDeletedNode);

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
                    this.customEventHandler.dispatchDisableGroupControls(false); // ?????
                }

                // ??????????????
                //let superContainerElementName = "superContainer";

                //this.cleanCssOfNode(this.tree.lastSwappedNode.higherNodeBeforeSwap, superContainerElementName);
                //this.cleanCssOfNode(this.tree.lastSwappedNode.lowerNodeBeforeSwap, superContainerElementName);
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
            // ???
            nodeDomElement.addEventListener("nodeAdded", function (evn)
            {
                this.heapOperation.onUpdateEntryInHtmlTableOnAddNode(nodeToAdd); // only in this order

                this.onAlignTreeByWidth(evn, this.tree, treeCoordinates);

            }.bind(this),

                { once: true }); // this.tree is a global variable


            nodeDomElement.addEventListener("nodeDeleted", function (evn)
            {
                this.onAlignTreeByWidth(evn, this.tree, treeCoordinates);

            }.bind(this),

                { once: true }); // this.tree is a global variable
        }

        let svgLineLinkElementName = "svgLineLink";

        let svgLineDomElement = this.domUpdater.getDomElement(nodeToAdd, svgLineLinkElementName);

        if (svgLineDomElement)
        {
            svgLineDomElement.addEventListener("animationstart", function (evn)
            {
                // the only difference between method onAnimationEndAddNode(...)
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
                    this.onHeapifyTwoNodes(lastBottomNode); // ??????
                }

            }.bind(this)); // should not include { once: true }
        }


        // attach custom event handler when node relocated DUPLICATION of above !!!!!!!!!!!!!!!!!!!!


        if (nodeDomElement)
        {
            nodeDomElement.addEventListener("animationend", function (evn)
            {
                this.customEventHandler.dispatchNodeAdded(evn.animationName, superContainerElementName, nodeToAdd); // fire event "nodeAdded"

                this.customEventHandler.dispatchNodeAlignedByWidth(evn.animationName, superContainerElementName, nodeToAdd); // for balancing (fire event "alignedByWidth" to start update balance factors and start balancing if it needed)

                // Heap
                this.customEventHandler.dispatchSwapTwoNodesEnded(evn.animationName, superContainerElementName, nodeToAdd);

            }.bind(this));


            nodeDomElement.addEventListener("alignedByWidth", function (evn)
            {
                // dispatch event to enable buttons and input

                if (!this.tree.isNeedAlignmentByWidth && this.tree.currentAmountOfNodesInTree === 1)
                {
                    this.customEventHandler.dispatchDisableGroupControls(false);
                }

                this.onStartBuildingHeap(this.isMaxHeap);

            }.bind(this));
        }


        // Heap
        nodeDomElement.addEventListener("swapTwoNodesEnded", function (evn)
        {
            // delete node

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
                    //this.onAnimationLinesBeforeDeletionNode(this.tree.lastDeletedNode);

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
                    this.customEventHandler.dispatchDisableGroupControls(false); // ?????
                }

                // ??????????????
                //let superContainerElementName = "superContainer";

                //this.cleanCssOfNode(this.tree.lastSwappedNode.higherNodeBeforeSwap, superContainerElementName);
                //this.cleanCssOfNode(this.tree.lastSwappedNode.lowerNodeBeforeSwap, superContainerElementName);
            }

        }.bind(this));


        this.addOnClickEventHandler(nodeToAdd);
    }


    onAddRangeOfNodes()
    {
        // correct ADD RANGE of nodes
        let patternStepAnimationArrayAddRangeOfNodes = this.heapAnimationStepConfiguration.getPatternStepAnimationArrayAddRangeOfNodes();

        let parsedValuesOfRange = this.processInputRangeValues();

        parsedValuesOfRange.forEach(valueOfRange =>
        {
            this.tree.insert(valueOfRange);
        });

        // DUPLICATION
        let screenCoordinates = new ScreenCoordinates();
        let screenXCenterCoorditate = screenCoordinates.getScreenXCenter();
        let treeCoordinates = new TreeCoordinates(this.tree, screenXCenterCoorditate, 300);

        //// for consistency
        //let addedNode = this.tree.lastAddedNode; // ????????????????????????????

        //// for consistency (balancing no needed: this.tree is balanced when it is being builded from saved data in server)
        //// for balancing
        //this.tree.nodeToCheckBalance = {
        //    nodeToCheck: addedNode,
        //    isAddition: true
        //};


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

            this.heapOperation.onAddNewEntryToHtmlTableOnAddRangeOfNodes(nodeFromRangeToAdd);

            this.onAnimationEndAddRangeOfNodes(nodeFromRangeToAdd, treeCoordinates, stepsAddNodeFromRange, preLastNode);
        });

    }


    // Heap
    onStartBuildingHeap(isMaxHeap)
    {
        if (this.tree.treeLevels < 2)
        {
            return;
        }

        // max-heap: the parent key is greater than or equal to the child keys
        // min-heap: the parent key is less than or equal to the child keys

        let lastBottomNode = this.tree.findLastNodeOfBottomLevel();

        if (isMaxHeap && lastBottomNode.parentNode.value >= lastBottomNode.value) // secondNodeToSwap as parent of firstNodeToSwap
        {
            this.customEventHandler.dispatchDisableGroupControls(false); // ?????
            return;
        }

        if (!isMaxHeap && lastBottomNode.parentNode.value <= lastBottomNode.value) // secondNodeToSwap as parent of firstNodeToSwap
        {
            this.customEventHandler.dispatchDisableGroupControls(false); // ?????
            return;
        }


        // ???
        if (this.tree.isLinkContainerShown)
        {
            this.heapOperation.onAddNewEntryToHtmlTableOnHeapify(lastBottomNode.value);
        }

        this.customEventHandler.dispatchDisableGroupControls(true); // ?????

        this.onAnimationLinesBeforeAfterSwapAllNodes(true);
    }


    // Heap
    onSwapNodes(firstNodeToSwap, secondNodeToSwap, isMaxHeap) // before swap: secondNodeToSwap - upper    firstNodeToSwap - lower node
    {
        if (!firstNodeToSwap)
        {
            throw new Error(`First node to swap is ${firstNodeToSwap}`);
        }

        if (!secondNodeToSwap)
        {
            // ???
            this.heapOperation.onUpdateEntryInHtmlTableOnHeapifyEnd(firstNodeToSwap.value);

            this.onAnimationLinesBeforeAfterSwapAllNodes(false);
            return;
        }

        // max-heap: the parent key is greater than or equal to the child keys
        // min-heap: the parent key is less than or equal to the child keys

        //if (isMaxHeap && secondNodeToSwap.value >= firstNodeToSwap.value) // secondNodeToSwap as parent of firstNodeToSwap
        //{
        //    this.onAnimationLinesBeforeAfterSwapAllNodes(false);
        //    return;
        //}

        //if (!isMaxHeap && secondNodeToSwap.value <= firstNodeToSwap.value) // secondNodeToSwap as parent of firstNodeToSwap
        //{
        //    this.onAnimationLinesBeforeAfterSwapAllNodes(false);
        //    return;
        //}


        this.tree.swapNodes(firstNodeToSwap, secondNodeToSwap);


        //this.tree.lastSwappedNode = {
        //    higherNodeBeforeSwap: firstNodeToSwap,
        //    lowerNodeBeforeSwap: secondNodeToSwap,
        //}

        this.setLastSwappedNodes(firstNodeToSwap, secondNodeToSwap);

        // correct SWAP NODES
        let patternStepAnimationArraySwapNode = this.heapAnimationStepConfiguration.getPatternStepAnimationArraySwapNode();

        // get sequence of the steps
        let sequenceSteps = new SequenceSteps(this.tree);

        // get this.tree nodes from root to bottom of this.tree


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

        // TO DO: PROVIDE REMOVING @keyframe _Swap_ after end operation

    }


    // ?????????
    // private
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
        let isNeedHepifyUp = this.onHeapifyUpTwoNodes(lastAddedNode); // when add node

        let isNeedHepifyDown = this.onHeapifyDownTwoNodes(lastAddedNode); // when delete node

        return isNeedHepifyUp || isNeedHepifyDown;
    }


    // when add node
    onHeapifyUpTwoNodes(lastAddedNode)
    {
        let isNeedHepifyUp = false;

        //if (!isMaxHeap)  // when add
        if (!this.isMaxHeap)  // when add
        {
            isNeedHepifyUp = lastAddedNode.parentNode !== null && lastAddedNode.parentNode.value > lastAddedNode.value; // no heapify up if lastAddedNode.parentNode.value <= lastAddedNode.value
        }
        else
        {
            isNeedHepifyUp = lastAddedNode.parentNode !== null && lastAddedNode.parentNode.value < lastAddedNode.value; // no heapify up if lastAddedNode.parentNode.value >= this.tree.lastAddedNode.value
        }

        if (isNeedHepifyUp)
        {
            this.onSwapNodes(lastAddedNode, lastAddedNode.parentNode, this.isMaxHeap);
        }

        return isNeedHepifyUp;
    }


    // when delete node
    onHeapifyDownTwoNodes(lastAddedNode)
    {
        let isNeedHepifyDown = false;

        let leftChildLastAddedNode = lastAddedNode.leftChild;
        let rightChildLastAddedNode = lastAddedNode.rightChild;

        //if (!isMaxHeap)
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
        else // if (isMaxHeap)
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


    // Heap
    // hide or show 1 link of node before after swap nodes
    // private
    onAnimationLinkBeforeAfterSwapNodes(nodeToAnimateLinkBeforeAfterSwapNodes, isHideLink)
    {
        // correct Show / Hide node link befor / after Swap Nodes
        let patternStepAnimationLinkBeforeAfterSwapNodes = this.heapAnimationStepConfiguration.getPatternStepAnimationLinkBeforeAfterSwapNodes();

        // get sequence of the steps
        let sequenceSteps = new SequenceSteps(this.tree);

        // get this.tree nodes from root to bottom of this.tree

        let stepsLinkNodeAction = sequenceSteps.createSequenceStepsLinkBeforeAfterSwapNodes(nodeToAnimateLinkBeforeAfterSwapNodes, patternStepAnimationLinkBeforeAfterSwapNodes, isHideLink);

        if (isHideLink === false)
        {
            sequenceSteps.updateHtmlLinkContainerSwapNodes(nodeToAnimateLinkBeforeAfterSwapNodes);

            this.tree.isLinkContainerShown = true;
        }

    }


    // Heap
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


    // Heap
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

        // dispatch event to disable buttons and input
        this.customEventHandler.dispatchDisableGroupControls(true);

        // "automatically" hide clicking on node if it was clicked before
        if (this.tree.treeViewState.getLastClickedNode())
        {
            this.onHideClickNode();
            this.tree.treeViewState.setLastClickedNode(null);
        }

        this.hideGlowingBorderForPreviouslyFoundNode();

        let valueToFind = this.processInputForNodeValue();

        // ??????
        this.heapOperation.onAddNewEntryToHtmlTableOnFindNode(valueToFind);

        this.addHandlerOnUpdateEntryInHtmlTableOnFindNode(valueToFind, superContainerName);

        this.traversingContext.onTraversingTree(this.tree.root, new TraversingTreePreorder(this.tree, valueToFind));
    }


    addHandlerOnUpdateEntryInHtmlTableOnFindNode(valueToFind, superContainerName)
    {
        let foundNode = this.tree.findNode(valueToFind);
        let wasFoundValue = foundNode !== null;

        // DO NOT DELETE COMMENT:
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


        // "automatically" hide clicking on node if it was clicked before
        if (this.tree.treeViewState.getLastClickedNode())
        {
            this.onHideClickNode();
            this.tree.treeViewState.setLastClickedNode(null);
        }

        let superContainerName = "superContainer";

        // add handler to find nodeToDelete

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
        // 1. Find node to delete using traversing
        // 2. If node to delete and last bottom node are not the same, then find last bottom node using traversing
        // 3. Do the next steps to delete node:


        // Animation of node deletion in Heap:

        // If nodeToDelete and lastBottomNode are not the same nodes

        // 1. Swap nodeToDelete with lastBottomNode
        // 2. Heapify only lastBottomNode (nodeToDelete should not be heapified)
        // 3. Draw all lines, EXCLUDING the line of nodeToDelete
        // 4. Dispatch "nodeDeleted" to start this.tree alignment by width
        // 5. Delete nodeToDelete

        // If nodeToDelete and lastBottomNode are the same nodes

        // 1. Erase line of nodeToDelete
        // 2. Dispatch "nodeDeleted" to start this.tree alignment by width
        // 3. Delete nodeToDelete

        if (this.tree.currentAmountOfNodesInTree === 0)
        {
            return;
        }

        // dispatch event to disable buttons and input
        this.customEventHandler.dispatchDisableGroupControls(true);

        // "automatically" hide clicking on node if a new node is added
        if (this.tree.treeViewState.getLastClickedNode())
        {
            this.onHideClickNode();
            this.tree.treeViewState.setLastClickedNode(null); // ++++
        }

        this.hideGlowingBorderForPreviouslyFoundNode();

        this.tree.treeViewState.isNodeToBeDeleted = true; // !!!! TO DO: set false after the end node deletion +++

        let valueToFind = this.processInputForNodeValue();

        let nodeToDelete = this.tree.findNode(valueToFind);

        this.tree.treeViewState.wasFoundNodeToBeDeleted = nodeToDelete !== null; // !!!! TO DO: set NULL after the end node deletion
        this.tree.treeViewState.enteredValueOfNodeToBeDeleted = valueToFind;

        // add new entry to the html-table info about this.tree operation: delete node - deleting
        this.heapOperation.onAddNewEntryToHtmlTableOnDeleteNode(valueToFind);

        if (nodeToDelete)
        {
            this.tree.lastDeletedNode = nodeToDelete;
        }

        let lastBottomNode = this.tree.findLastNodeOfBottomLevel();

        this.tree.nodeToCheckHeapify = lastBottomNode;

        // ????
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
        // Animation of node deletion in Heap:

        // If nodeToDelete and lastBottomNode are not the same nodes

        // 1. Swap nodeToDelete with lastBottomNode
        // 2. Heapify only lastBottomNode (nodeToDelete should not be heapified)
        // 3. Draw all lines, EXCLUDING the line of nodeToDelete
        // 4. Dispatch "nodeDeleted" to start this.tree alignment by width
        // 5. Delete nodeToDelete

        // If nodeToDelete and lastBottomNode are the same nodes

        // 1. Erase line of nodeToDelete
        // 2. Dispatch "nodeDeleted" to start this.tree alignment by width
        // 3. Delete nodeToDelete


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
                // ???
                this.heapOperation.onUpdateEntryInHtmlTableOnHeapifyEnd(lastBottomNode.value);

                this.customEventHandler.dispatchNodeDeleted(this.tree.lastDeletedNode);

                this.onBeforeDeletionNode(superContainerElementName);

                this.tree.treeViewState.isNodeToBeDeleted = false;

                this.tree.isLinkContainerShown = true;

                // ???
                this.tree.treeViewState.wasFoundNodeToBeDeleted = null;
            }

        }.bind(this),

            { once: true }); // should include { once: true }



        if (this.tree.currentAmountOfNodesInTree === 1 && Object.is(this.tree.lastDeletedNode, lastBottomNode)) // for case, when need deletion of root
        {
            this.tree.deleteNode(this.tree.lastDeletedNode);

            this.customEventHandler.dispatchNodeDeleted(this.tree.lastDeletedNode);

            this.onBeforeDeletionNode(superContainerElementName);

            this.tree.treeViewState.isNodeToBeDeleted = false;

            // ???
            this.tree.treeViewState.wasFoundNodeToBeDeleted = null;

            this.customEventHandler.dispatchDisableGroupControls(false);
        }


        // TO DO: replace with a case when this.tree.lastDeletedNode === last bottom node  and  last bottom node is single in the last bottom nodes row
        if (Object.is(this.tree.lastDeletedNode, lastBottomNode))
        {
            this.onAnimationLinkBeforeAfterSwapNodes(nodeToDelete, true);
            return;
        }

        if (!nodeToDelete) // for case when trying to delete node that does not exist in this.tree (nodeFinder will go down through branch and disappears)
        {
            return;
        }

        // ???
        this.heapOperation.onAddNewEntryToHtmlTableOnHeapify(lastBottomNode.value);


        this.onAnimationLinesBeforeAfterSwapAllNodes(true);
    }


    addHandlerOnEndSearchingNodeToDeleteThatNotExists(nodeToDelete, superContainerName)
    {
        let valueToDelete = this.tree.treeViewState.enteredValueOfNodeToBeDeleted;

        // DO NOT DELETE COMMENT:
        // event "lastNodeBeforeEndingTraversing" fired on the last node of conditional traversing (if node not found, event fired on root)
        // if node not found during find (in essence, conditional traversing) then event "lastNodeBeforeEndingTraversing"
        // handled on root, because root is a node that always the last in conditional traversing when value is not found
        let domElementToHandleLastTraversedNode = this.domUpdater.getDomElement(this.tree.root, superContainerName);

        domElementToHandleLastTraversedNode.addEventListener("lastNodeBeforeEndingTraversing", function (evn)
        {
            this.heapOperation.onUpdateEntryInHtmlTableOnFindNodeBeforeDeletion(valueToDelete, false);

            this.heapOperation.onUpdateEntryInHtmlTableOnDeleteNode(nodeToDelete, valueToDelete)

            this.customEventHandler.dispatchDisableGroupControls(false);

        }.bind(this),

            { once: true });
    }
}