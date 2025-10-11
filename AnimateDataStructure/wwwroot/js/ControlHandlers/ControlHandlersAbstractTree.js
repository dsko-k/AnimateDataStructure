import { DomUpdater } from '../HtmlDomElementHandler/DomUpdater.js';
import { HtmlPageDomUpdater } from '../HtmlDomElementHandler/HtmlPageDomUpdater.js';
import { CustomEventHandler } from '../CustomEventHandler/CustomEventHandler.js';
import { CustomEventHandlerHtmlTable } from '../CustomEventHandler/CustomEventHandlerHtmlTable.js';
import { TreeOperationsStatuses } from '../DataStructureOperationsStatuses/TreeOperationsStatuses.js';
import { AbstractTreeOperation } from '../DataStructureOperations/AbstractTreeOperation.js';
import { AbstractTreeTraversing } from '../DataStructureOperations/AbstractTreeTraversing.js';
import { HtmlConfigurationAttributesReader } from '../HtmlConfigurationAttributes/HtmlConfigurationAttributesReader.js';
import { AbstractTreeAnimationStepConfiguration } from '../PatternStepAnimationOperation/AbstractTreeAnimationStepConfiguration.js';
import { SequenceSteps } from '../AnimationNodeSteps/SequenceSteps.js';
import { Coordinates } from '../CoordinatesModel/Coordinates.js';
import { ContexCleaningCssEntity } from '../CssCleaner/ContexCleaningCssEntity.js';
import { KeyframeCleaner } from '../CssCleaner/KeyframeCleaner.js';



export class ControlHandlersAbstractTree // functionality of avl this.tree
{
    constructor(tree)
    {
        this.tree = tree;
        this.domUpdater = new DomUpdater();
        this.htmlPageDomUpdater = new HtmlPageDomUpdater();
        this.customEventHandler = new CustomEventHandler(this.tree);
        this.customEventHandlerHtmlTable = new CustomEventHandlerHtmlTable();
        this.treeOperationsStatuses = new TreeOperationsStatuses();
        this.abstractTreeOperation = new AbstractTreeOperation(this.tree);
        this.abstractTreeTraversing = new AbstractTreeTraversing(this.tree); // DO NOT REMOVE: for table with info about traversing
        this.htmlConfigurationAttributesReader = new HtmlConfigurationAttributesReader();        
        this.abstractTreeAnimationStepConfiguration = new AbstractTreeAnimationStepConfiguration();
    }


    onAlignTreeByWidth(evn, tree, treeCoordinates)
    {
        if ((evn.detail.customEventName !== "nodeAdded" && evn.detail.customEventName !== "nodeDeleted") || this.tree.treeLevels == 0)
        {
            return;
        }

        let superContainerElementName = "superContainer";

        // TEST for disabling buttons
        if (this.tree.treeLevels == 1)
        {
            this.customEventHandler.dispatchNodeAlignedByWidthWithoutAlignment(superContainerElementName, this.tree.root);
            return;
        }

        treeCoordinates.alignTreeNodesByWidth();

        // this should be only after computation coordinates for alignment treeCoordinates.alignTreeNodesByWidth();
        // for case when alignment by width is no needed (if root coordinates did not change after alignTreeNodesByWidth(), then alignment by width is no needed )

        if (!this.tree.isNeedAlignmentByWidth)
        {
            this.customEventHandler.dispatchNodeAlignedByWidthWithoutAlignment(superContainerElementName, this.tree.root);
            return;
        }

        // dispatch event to disable buttons and input
        this.customEventHandler.dispatchDisableGroupControls(true);

        let patternStepAnimationArrayAlignNodeByWidth = this.abstractTreeAnimationStepConfiguration.getPatternStepAnimationArrayAlignNodeByWidth();

        let sequenceSteps = new SequenceSteps(this.tree);

        // get this.tree nodes from root to bottom of this.tree


        let allNodesByLevels = this.tree.getAllNodesByLevels();

        for (let currentLevel = 0; currentLevel < allNodesByLevels.length; currentLevel++)
        {
            for (let n = 0; n < allNodesByLevels[currentLevel].length; n++)
            {
                let nodeToAlign = allNodesByLevels[currentLevel][n];

                sequenceSteps.createSequenceStepsAlignNodeByWidth(nodeToAlign, patternStepAnimationArrayAlignNodeByWidth);
            }
        }

        this.tree.isNeedAlignmentByWidth = false;
    }


    glowBorderAfterNodeAddition(evn, lastNode, sequenceStepsAdditionNode, preLastNode)
    {
        if (lastNode.isLeftChild === null || !evn.animationName.includes("svgDrawLine")) // replace hardcode!!!!!!!!!!!!!!!!!!!!!!!!
        {
            return;
        }

        let lastStep = sequenceStepsAdditionNode[sequenceStepsAdditionNode.length - 1].stepAnimationObject;
        let additionalStyleClasses = lastStep.additionalStyleClasses;

        if (!additionalStyleClasses)
        {
            throw new Error(`Last animation step '${lastStep.nodesInfoStepAnimation.patternStepName}' does not have additional styles to apply`);
        }

        let styleClassesToLastNode = additionalStyleClasses.filter(styleClasses => styleClasses.applyToLastAddedNode);
        let styleClassesToPreLastNode = additionalStyleClasses.filter(styleClasses => !styleClasses.applyToLastAddedNode);

        // last Node
        let isExistLastNodeDomElement = this.domUpdater.isExistDomElement(lastNode, styleClassesToLastNode[0].elementNameToApplyStyle);
        if (isExistLastNodeDomElement) // check has lastNode been deleted
        {
            this.domUpdater.updateStyleClass(lastNode, styleClassesToLastNode[0].elementNameToApplyStyle, styleClassesToLastNode[0].styleClassToApply);
            this.domUpdater.updateStyleClass(lastNode, styleClassesToLastNode[1].elementNameToApplyStyle, styleClassesToLastNode[1].styleClassToApply);
        }


        // pre-last Node
        let isExistPreLastNodeDomElement = this.domUpdater.isExistDomElement(preLastNode, styleClassesToPreLastNode[0].elementNameToApplyStyle);
        if (isExistPreLastNodeDomElement && preLastNode /*&& preLastNode.parentNode*/)
        {
            this.domUpdater.updateStyleClass(preLastNode, styleClassesToPreLastNode[0].elementNameToApplyStyle, styleClassesToPreLastNode[0].styleClassToApply);
            this.domUpdater.updateStyleClass(preLastNode, styleClassesToPreLastNode[1].elementNameToApplyStyle, styleClassesToPreLastNode[1].styleClassToApply);
        }


        let lastNodeState = styleClassesToLastNode[0].nodeState;
        lastNode?.appliedNodeStyles.addAppliedNodeStyles(lastNode, lastNodeState);

        let preLastNodeState = styleClassesToPreLastNode[0].nodeState;
        preLastNode?.appliedNodeStyles.addAppliedNodeStyles(preLastNode, preLastNodeState);
    }


    // ??????
    glowBorderAfterAdditionRangeOfNodes(evn, lastNode, sequenceStepsAdditionNode, preLastNode)
    {
        if (lastNode.isLeftChild === null || !evn.animationName.includes("svgDrawLine"))
        {
            return;
        }

        let lastStep = sequenceStepsAdditionNode[sequenceStepsAdditionNode.length - 1].stepAnimationObject;
        let additionalStyleClasses = lastStep.additionalStyleClasses;

        if (!additionalStyleClasses)
        {
            throw new Error(`Last animation step '${lastStep.nodesInfoStepAnimation.patternStepName}' does not have additional styles to apply`);
        }

        let styleClassesToLastNode = additionalStyleClasses.filter(styleClasses => styleClasses.applyToLastAddedNode);
        let styleClassesToAnyNodeBeforeLast = additionalStyleClasses.filter(styleClasses => !styleClasses.applyToLastAddedNode);


        // last Node
        let isExistLastNodeDomElement = this.domUpdater.isExistDomElement(lastNode, styleClassesToLastNode[0].elementNameToApplyStyle);

        if (Object.is(lastNode, this.tree.lastAddedNode) && isExistLastNodeDomElement)
        {
            this.domUpdater.updateStyleClass(lastNode, styleClassesToLastNode[0].elementNameToApplyStyle, styleClassesToLastNode[0].styleClassToApply);
            this.domUpdater.updateStyleClass(lastNode, styleClassesToLastNode[1].elementNameToApplyStyle, styleClassesToLastNode[1].styleClassToApply);
        }
        else
        {
            this.domUpdater.updateStyleClass(lastNode, styleClassesToAnyNodeBeforeLast[0].elementNameToApplyStyle, styleClassesToAnyNodeBeforeLast[0].styleClassToApply);
            this.domUpdater.updateStyleClass(lastNode, styleClassesToAnyNodeBeforeLast[1].elementNameToApplyStyle, styleClassesToAnyNodeBeforeLast[1].styleClassToApply);
        }


        let lastNodeState = styleClassesToLastNode[0].nodeState;
        lastNode?.appliedNodeStyles.addAppliedNodeStyles(lastNode, lastNodeState);
    }


    // private - part of onAnimationEndFindNode
    glowBorderAfterNodeFound(sequenceStepsFindNode, evn, superContainerName, isFindSuccessor, isHideLink)
    {
        if (evn.target.dataset.elementName !== superContainerName)
        {
            return;
        }

        let lastStep = sequenceStepsFindNode[sequenceStepsFindNode.length - 1].stepAnimationObject;
        let finderNode = lastStep.nodesInfoStepAnimation.nodeToAnimate;
        let lastAnimationName = this.domUpdater.getLastAnimationName(finderNode, superContainerName);

        if (evn.animationName !== lastAnimationName)
        {
            return;
        }

        let additionalStyleClasses = lastStep.additionalStyleClasses;

        let foundNode = lastStep.nodesInfoStepAnimation.relativeNodeToAnimateAccross;

        // apply orange glowing border to found node
        if (additionalStyleClasses) // without hardcore equivalent to if (lastStep.nodesInfoStepAnimation.patternStepName.includes("own position"))
        {
            this.domUpdater.updateStyleClass(foundNode, additionalStyleClasses[0].elementNameToApplyStyle, additionalStyleClasses[0].styleClassToApply);
            this.domUpdater.updateStyleClass(foundNode, additionalStyleClasses[1].elementNameToApplyStyle, additionalStyleClasses[1].styleClassToApply);

            // Apply state to found node
            let nodeState = lastStep.additionalStyleClasses[0].nodeState;
            foundNode.appliedNodeStyles.addAppliedNodeStyles(foundNode, nodeState);
        }


        // dispatch event to enable buttons and input
        this.customEventHandler.dispatchDisableGroupControls(false);

        // remove node-finder
        this.domUpdater.removeDomElement(finderNode, superContainerName);

        this.customEventHandler.dispatchNodeFound(superContainerName, foundNode); // uses only in RBT when node should be double black during deletion

        if (isFindSuccessor && additionalStyleClasses)
        {
            // add new entry to the html-table info about this.tree operation: find successor of deleted node - processing
            this.abstractTreeOperation.onAddNewEntryToHtmlTableOnFindSuccessor(foundNode);

            this.onFindSuccessor(foundNode);
        }

        if (this.tree.treeViewState.isNodeToBeDeleted && !isFindSuccessor)
        {
            // Update entry in the html-table info about this.tree operation: find successor of deleted node - found (not found)
            this.abstractTreeOperation.onUpdateEntryInHtmlTableOnFindSuccessor(foundNode);
        }
        else if (!this.tree.treeViewState.isNodeToBeDeleted && !isFindSuccessor)
        {
            // Update entry in the html-table info about this.tree operation: find node - found (not found)
            this.abstractTreeOperation.onUpdateEntryInHtmlTableOnFindNode(finderNode, foundNode);
        }


        if (isHideLink && additionalStyleClasses)
        {
            this.onLinkNodeAction(foundNode, true);
        }

        // ++++++++++++ case: successor of deleted node (deleted node has 2 children):
        // hide link of the successor's right child if the child is present
        // In this case successor always does not have left child. Successor can have (or not) right children
        if (!isFindSuccessor && isHideLink && foundNode.rightChild)
        {
            this.onLinkNodeAction(foundNode.rightChild, true);
        }

        // ?????????????????????????? case: successor of deleted node (deleted node has 1 children):
        // hide link of the successor's right child if the child is present
        // In this case successor can have (or not) left, right children (hiding right link between successor and its child made above)
        if (!isFindSuccessor && isHideLink && foundNode.leftChild)
        {
            this.onLinkNodeAction(foundNode.leftChild, true);
        }
    }


    // private - part of onAnimationEndRelocationNode
    hideGlowingBorderOnStartNodeAlignedByHeight(sequenceStepsAlignNodeByHeight, successor)
    {
        let lastStep = sequenceStepsAlignNodeByHeight[sequenceStepsAlignNodeByHeight.length - 1].stepAnimationObject;

        if (!lastStep.additionalStyleClasses)
        {
            throw new Error(`Last animation step '${lastStep.nodesInfoStepAnimation.patternStepName}' does not have additional styles to apply`);
        }

        let nodeToAnimate = lastStep.nodesInfoStepAnimation.nodeToAnimate;
        let nodeState = lastStep.additionalStyleClasses[0].nodeState;

        if (nodeToAnimate === successor)
        {
            this.domUpdater.applyAdditionalStyleClasses(nodeToAnimate, lastStep.additionalStyleClasses, nodeState);
        }
    }


    // private
    // Hide red glowing border (and its shadow) for node, that previously was found
    removeRedGlowingBorderForPreviouslyFoundNode(nodeToAnimate)
    {
        let patternStepAnimationHideGlowingBorderForFoundNode = this.abstractTreeAnimationStepConfiguration.getPatternStepAnimationHideGlowingBorderForFoundNode();

        let additionalStyleClasses = patternStepAnimationHideGlowingBorderForFoundNode[0].additionalStyleClasses;

        let styleOfBorderWithoutGlowing = this.domUpdater.getStyleToApplyOfAdditionalStyleClasses(additionalStyleClasses, "borderRotatorContainer", "applyToLastAddedNode", false);
        let styleOfShadowBorderWithoutGlowing = this.domUpdater.getStyleToApplyOfAdditionalStyleClasses(additionalStyleClasses, "shadowBorderRotatorContainer", "applyToLastAddedNode", false);

        let styleOfGlowingBorderLastAddedNode = this.domUpdater.getStyleToApplyOfAdditionalStyleClasses(additionalStyleClasses, "borderRotatorContainer", "applyToLastAddedNode", true);
        let styleOfGlowingShadowBorderLastAddedNode = this.domUpdater.getStyleToApplyOfAdditionalStyleClasses(additionalStyleClasses, "shadowBorderRotatorContainer", "applyToLastAddedNode", true);

        let currentStyleOfGlowingBorderNodeToAnimate = this.domUpdater.getAttributeDomElement(nodeToAnimate, "borderRotatorContainer", "class");
        //let currentStyleOfGlowingShadowBorderNodeToAnimate = this.getAttributeDomElement(nodeToAnimate, "shadowBorderRotatorContainer", "class");

        let correctBorderRotatorStyle;
        let correctShadowBorderRotatorStyle;

        if (Object.is(nodeToAnimate, this.tree.lastAddedNode) && currentStyleOfGlowingBorderNodeToAnimate === styleOfGlowingBorderLastAddedNode)
        {
            return;
        }
        else if (Object.is(nodeToAnimate, this.tree.lastAddedNode) && currentStyleOfGlowingBorderNodeToAnimate !== styleOfGlowingBorderLastAddedNode)
        {
            correctBorderRotatorStyle = styleOfGlowingBorderLastAddedNode;
            correctShadowBorderRotatorStyle = styleOfGlowingShadowBorderLastAddedNode;
        }
        else if (currentStyleOfGlowingBorderNodeToAnimate === styleOfBorderWithoutGlowing)
        {
            return;
        }
        else
        {
            correctBorderRotatorStyle = styleOfBorderWithoutGlowing;
            correctShadowBorderRotatorStyle = styleOfShadowBorderWithoutGlowing;
        }

        this.domUpdater.updateStyleClass(nodeToAnimate, "borderRotatorContainer", correctBorderRotatorStyle);
        this.domUpdater.updateStyleClass(nodeToAnimate, "shadowBorderRotatorContainer", correctShadowBorderRotatorStyle);
    }


    // ????????
    // remove red glowing border (and its shadow) for node that previously was found. Method is invoked in the beginning of any CRUD operation
    hideGlowingBorderForPreviouslyFoundNode()
    {
        let allNodesByLevels = this.tree.getAllNodesByLevels();

        for (let currentLevel = 0; currentLevel < allNodesByLevels.length; currentLevel++)
        {
            for (let n = 0; n < allNodesByLevels[currentLevel].length; n++)
            {
                let currentNode = allNodesByLevels[currentLevel][n];

                this.removeRedGlowingBorderForPreviouslyFoundNode(currentNode);
            }
        }
    }


    // ???
    // For RBT and AVL: for sibling node in RBT and for node with balance factor >= +-2 in AVL this.tree
    showRedGlowingBorder(nodeToAnimate)
    {
        let patternStepAnimationShowRedGlowingBorderNode = this.abstractTreeAnimationStepConfiguration.getPatternStepAnimationShowRedGlowingBorderNode();

        let additionalStyleClasses = patternStepAnimationShowRedGlowingBorderNode[0].additionalStyleClasses;

        if (additionalStyleClasses) // without hardcore equivalent to if (lastStep.nodesInfoStepAnimation.patternStepName.includes("own position"))
        {
            this.domUpdater.updateStyleClass(nodeToAnimate, additionalStyleClasses[0].elementNameToApplyStyle, additionalStyleClasses[0].styleClassToApply);
            this.domUpdater.updateStyleClass(nodeToAnimate, additionalStyleClasses[1].elementNameToApplyStyle, additionalStyleClasses[1].styleClassToApply);
        }
    }


    onAnimationEndFindNode(sequenceStepsFindNode, isFindSuccessor, isHideLink)
    {
        let lastStep = sequenceStepsFindNode[sequenceStepsFindNode.length - 1].stepAnimationObject;
        let finderNode = lastStep.nodesInfoStepAnimation.nodeToAnimate;

        let superContainerName = lastStep.htmlNodeContainer[0].elementName;
        let finderNodeDomElement = this.domUpdater.getDomElement(finderNode, superContainerName);

        finderNodeDomElement.addEventListener("animationend", function (evn)
        {
            this.glowBorderAfterNodeFound(sequenceStepsFindNode, evn, superContainerName, isFindSuccessor, isHideLink);

        }.bind(this));
    }


    onAnimationEndRelocationNode(evn, nodeToRelocate) // update container for link (change it to left of right, width?) and draw link
    {
        ////if (!evn.animationName.includes("Align_by_height")) // replace hardcode!!!!!!!!!!!!!!!!!!!!!!!!
        ////{
        ////    return;
        ////}

        //// ???????????
        //if (!evn.animationName.includes("moveNodeOwnPosition_Align_by_height")) // replace hardcode!!!!!!!!!!!!!!!!!!!!!!!!
        //{
        //    return;
        //}

        //let superContainerName = "superContainer"; // REMOVE HARDCODE!!!!!!!!!!

        //let domElementNodeToRelocate = this.domUpdater.getDomElement(nodeToRelocate, superContainerName);

        //let animationSvgLineLink = window.getComputedStyle(domElementNodeToRelocate).getPropertyValue("--animationSvgLineLink");

        //if (!animationSvgLineLink.includes("svgEraseLine")) // TO DO: compare animationSvgLineLink with value keyframesPrototypeSvgLineLink in step animation (it does not contain here) to avoid hardcode
        //{
        //    return;
        //}

        this.onLinkNodeAction(nodeToRelocate, false);
    }


    onBeforeDeletionNode(superContainerName)
    {
        let nodeToDelete = this.tree.lastDeletedNode;
        let isExistDomNodeToDelete = this.domUpdater.isExistDomElement(nodeToDelete, superContainerName);

        if (isExistDomNodeToDelete)
        {
            // DO NOT DELETE: it is not a single place to Update entry in the html-table about this.tree operation: delete node - deleted (not deleted)
            // also it is need to be added before removing domNodeToDelete                
            // Update entry in the html-table about this.tree operation: delete node - deleted (not deleted)
            this.abstractTreeOperation.onUpdateEntryInHtmlTableOnDeleteNode(nodeToDelete, nodeToDelete.value);

            //this.customEventHandler.dispatchNodeDeleted(nodeToDelete); // BUG IF UNCOMMENTED
            this.domUpdater.removeDomElement(nodeToDelete, superContainerName);
        }
    }


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

            }.bind(this));
        }
    }


    onClickNode(clickedNode)
    {
        if (this.tree.treeViewState.isClickOnNodesDisabled) // disable clicks on all nodes while animation is shown
        {
            return;
        }

        if (this.tree.treeViewState.getLastClickedNode())
        {
            this.onHideClickNode();
        }

        if (Object.is(clickedNode, this.tree.treeViewState.getLastClickedNode()))
        {
            this.tree.treeViewState.setLastClickedNode(null);
            return;
        }

        this.tree.treeViewState.setLastClickedNode(clickedNode);
        this.tree.treeViewState.increaseClickedCounter();
        this.tree.treeViewState.valueOfNodeThatWasClickedLastTime = clickedNode.value;

        // correct CLICK node
        let patternStepAnimationArrayClickNode = this.abstractTreeAnimationStepConfiguration.getPatternStepAnimationArrayClickNode();

        let sequenceSteps = new SequenceSteps(this.tree);

        let ancestors = this.tree.getAllParentsFromRootToNode(clickedNode);
        let successors = this.tree.getAllSuccessors(clickedNode);

        let nodesToAnimate = [...ancestors, clickedNode, ...successors];

        nodesToAnimate.forEach(nodeToAnimate =>
        {
            sequenceSteps.createSequenceStepsClickNode(nodeToAnimate, clickedNode, patternStepAnimationArrayClickNode);
        });
    }


    onHideClickNode()
    {
        let lastClickedNode = this.tree.treeViewState.lastClickedNode;

        // correct HIDE CLICK node
        let patternStepAnimationArrayHideClickNode = this.abstractTreeAnimationStepConfiguration.getPatternStepAnimationArrayHideClickNode();

        let sequenceSteps = new SequenceSteps(this.tree);

        let ancestors = this.tree.getAllParentsFromRootToNode(lastClickedNode);
        let successors = this.tree.getAllSuccessors(lastClickedNode);

        let nodesToAnimate = [...ancestors, lastClickedNode, ...successors];

        nodesToAnimate.forEach(nodeToAnimate =>
        {
            sequenceSteps.createSequenceStepsHideClickNode(nodeToAnimate, lastClickedNode, patternStepAnimationArrayHideClickNode);
        });

        // hide red glowing border and restore cyan gloving for the last added node
        this.hideGlowingBorderForPreviouslyFoundNode();
    }


    onClickButtonFindNode(isFindSuccessor = false, isHideLink)
    {
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

        if (isFindSuccessor === false)
        {
            this.hideGlowingBorderForPreviouslyFoundNode();
        }

        // correct FIND node
        let patternStepAnimationArrayFindNode = this.abstractTreeAnimationStepConfiguration.getPatternStepAnimationArrayFindNode();

        let valueToFind = this.processInputForNodeValue();

        let nodeFinder = this.initializeNodeFinder(valueToFind, patternStepAnimationArrayFindNode);


        //???????
        // add info about this.tree operation: find node - processing
        // nodeFinder use as object that always has value to find even if value correct but does not exist in this.tree
        this.abstractTreeOperation.onAddNewEntryToHtmlTableOnFindNode(isFindSuccessor, nodeFinder);


        // get sequence of the steps
        let sequenceSteps = new SequenceSteps(this.tree);

        let stepsFindNode = sequenceSteps.createSequenceStepsFindNode(nodeFinder, patternStepAnimationArrayFindNode);

        // !!!!!!!!!!!!!!!!!!!!!!!!! after animation finding end

        this.onAnimationEndFindNode(stepsFindNode, isFindSuccessor, isHideLink);

        return valueToFind;
    }


    onFindSuccessor(nodeToDelete)
    {
        if (!nodeToDelete.leftChild && !nodeToDelete.rightChild)
        {
            return;
        }

        // dispatch event to disable buttons and input
        this.customEventHandler.dispatchDisableGroupControls(true);

        // correct FIND SUCCESSOR node
        let patternStepAnimationArrayFindSuccessorNode = this.abstractTreeAnimationStepConfiguration.getPatternStepAnimationArrayFindSuccessorNode();

        //let controlHandlers = new ControlHandlersAVLTree();

        // get sequence of the steps
        let sequenceSteps = new SequenceSteps(this.tree);

        //???
        let nodeFinderSuccessor = this.initializeNodeFinderSuccessor(nodeToDelete);

        let stepsFindSuccessorNode = sequenceSteps.createSequenceStepsFindSuccessorNode(nodeToDelete, patternStepAnimationArrayFindSuccessorNode, nodeFinderSuccessor);

        this.onAnimationEndFindNode(stepsFindSuccessorNode, false, true);
    }


    initializeNodeFinderSuccessor(nodeToDelete)
    {
        let nodeFinderSuccessor = this.tree.creatorNode.createNodeInstance(nodeToDelete.value);

        nodeFinderSuccessor.startPositionX = nodeToDelete.xCoordinate;
        nodeFinderSuccessor.startPositionY = nodeToDelete.yCoordinate;

        return nodeFinderSuccessor;
    }


    initializeNodeFinder(valueToFind, patternStepAnimationArrayFindNode)
    {
        let nodeFinder = this.tree.creatorNode.createNodeInstance(valueToFind);

        let coordinates = new Coordinates();
        let styleNamePrototype = patternStepAnimationArrayFindNode[0].styleName;

        return coordinates.initializeNodeCoordinates(nodeFinder, styleNamePrototype);
    }


    initializeNodeVisitor()
    {
        let nodeVisitor = this.tree.creatorNode.createNodeInstance(null);

        return new Coordinates().initializeNodeCoordinates(nodeVisitor, ".superContainerVisitor");
    }


    onLinkNodeAction(nodeToAnimateLinkAction, isHideLink)
    {
        // ???????
        if (!nodeToAnimateLinkAction.parentNode)
        {
            return;
        }


        if (!nodeToAnimateLinkAction.parentNode)
        {
            throw new Error(`Atempt to operate link of parent node ${nodeToAnimateLinkAction.value} (root node should not have a link) `);
        }

        // dispatch event to disable buttons and input
        this.customEventHandler.dispatchDisableGroupControls(true);

        // correct LINK action node
        let patternStepAnimationArrayLinkNodeAction = this.abstractTreeAnimationStepConfiguration.getPatternStepAnimationArrayLinkNodeAction();

        // get sequence of the steps
        let sequenceSteps = new SequenceSteps(this.tree);

        let stepsLinkNodeAction = sequenceSteps.createSequenceStepsLinkNodeAction(nodeToAnimateLinkAction, patternStepAnimationArrayLinkNodeAction, isHideLink);
    }


    // operation - is method that applied before starting alignment this.tree by height (deletion node or balancing this.tree)
    // for operation use bind with partial application of the arguments
    onAlignTreeByHeight(evn, tree, operation, nodeToDelete, successor)
    {
        // fire custom event related to end of finding successor !!!!!!!!!

        if (evn.detail.customEventName !== "linkErasedBeforeAlignmentByHeight")
        {
            return;
        }

        // dispatch event to disable buttons and input
        this.customEventHandler.dispatchDisableGroupControls(true);

        operation();

        // correct ALIGN node BY HEIGHT
        let patternStepAnimationArrayAlignNodeByHeight = this.abstractTreeAnimationStepConfiguration.getPatternStepAnimationArrayAlignNodeByHeight();

        let elementName = "superContainer";

        // decrease z-index for nodeToDelete
        this.domUpdater.changeZIndexForNodeElement(nodeToDelete, elementName, "-1"); // newValue - any negative (or lower) value of z-index than have successor


        // get sequence of the steps
        let sequenceSteps = new SequenceSteps(this.tree);

        // get this.tree nodes from root to bottom of this.tree


        let allNodesByLevels = this.tree.getAllNodesByLevels();

        for (let currentLevel = 0; currentLevel < allNodesByLevels.length; currentLevel++)
        {
            for (let n = 0; n < allNodesByLevels[currentLevel].length; n++)
            {
                let nodeToAlignByHeight = allNodesByLevels[currentLevel][n];

                let sequenceStepsAlignNodeByHeight = sequenceSteps.createSequenceStepsAlignNodeByHeight(nodeToAlignByHeight, patternStepAnimationArrayAlignNodeByHeight);

                // hide glowingBorder when Started alignment by height
                this.hideGlowingBorderOnStartNodeAlignedByHeight(sequenceStepsAlignNodeByHeight, successor);

                // updateHtmlLinkContainer for successor node, which became a root after alignment by height
                sequenceSteps.updateHtmlLinkContainerAlignByHeight(nodeToAlignByHeight);
            }
        }

    }


    // part for Traversing
    getSequenceStepsTraversingNode(nodeVisitor, startNode, traversingTreeOperationInstance)
    {
        // correct TRAVERSING NODE
        let patternStepAnimationArrayTraversingNode = this.abstractTreeAnimationStepConfiguration.getPatternStepAnimationArrayTraversingNode();

        // get sequence of the steps
        let sequenceSteps = new SequenceSteps(this.tree);

        let sequenceStepsTraversingNode = sequenceSteps.createSequenceStepsTraversingNode(nodeVisitor, startNode, traversingTreeOperationInstance, patternStepAnimationArrayTraversingNode);

        return sequenceStepsTraversingNode;
    }

    // Part for traversing

    onChangeColorForVisitedNode(currentNodeToVisit, currentStepAnimation)
    {
        if (currentNodeToVisit.wasChangedNodeColorAfterVisiting)
        {
            return;
        }

        let additionalStyleClasses = currentStepAnimation.stepAnimationObject.additionalStyleClasses;

        let indexInAdditionalStyleClass = additionalStyleClasses
            .findIndex(additionalStyleElement => additionalStyleElement.isStyleSetForVisitedNode);

        this.setAdditionalStyleClassDuringTraversing(currentNodeToVisit, currentStepAnimation, indexInAdditionalStyleClass);

        currentNodeToVisit.wasChangedNodeColorAfterVisiting = true;
    }


    restoreNodesColorsAfterTraversing(stepAnimations)
    {
        stepAnimations.forEach(currentStepAnimation =>
        {
            let currentNodeToVisit = currentStepAnimation.stepAnimationObject.nodesInfoStepAnimation.relativeNodeToAnimateAccross;

            this.setAdditionalStyleClassDuringTraversing(currentNodeToVisit, currentStepAnimation, 1);
        });
    }


    //private
    // apply additionalStyleClasses for current step
    setAdditionalStyleClassDuringTraversing(nodeToApply, currentStepAnimation, indexInAdditionalStyleClasses)
    {
        let additionalStyleClasses = currentStepAnimation.stepAnimationObject.additionalStyleClasses;

        this.domUpdater.updateStyleClass(nodeToApply, additionalStyleClasses[indexInAdditionalStyleClasses].elementNameToApplyStyle, additionalStyleClasses[indexInAdditionalStyleClasses].styleClassToApply);

        // Apply state to visited node
        let nodeState = currentStepAnimation.stepAnimationObject.additionalStyleClasses[indexInAdditionalStyleClasses].nodeState;
        nodeToApply.appliedNodeStyles.addAppliedNodeStyles(nodeToApply, nodeState);
    }


    // remove keyframes and style class(?) of nodeVisitor
    cleanCssOfNode(node, elementName)
    {
        let contexCleaningCssEntity = new ContexCleaningCssEntity(new KeyframeCleaner());
        contexCleaningCssEntity.cleanCss(node, elementName);

        // Incorrect behavior animation of nodeVisitor if traverse this.tree another time (css style of nodeVisitor should not be deleted!!!)

        //contexCleaningCssEntity = new ContexCleaningCssEntity(new StyleCleaner());
        //contexCleaningCssEntity.cleanCss(node, elementName);
    }


    // private
    parseInputForNodeValue()
    {
        let textElement = document.getElementById('idInputForNodeValue');

        let inputValue = parseFloat(textElement.value); // check the value of an input

        //textElement.value = '';

        return inputValue;
    }


    // private
    parseInputRangeNodeValues(textFromInput)
    {
        let arrayOfValues = textFromInput.split(",")
            .map(enterdValue =>
            {
                let parsed = parseFloat(enterdValue);

                if (isNaN(parsed))
                {
                    throw new Error(`Unable to parse value '${enterdValue}' in range of values`)
                }

                return parsed;
            });

        return arrayOfValues;
    }


    // private
    clearInputValue()
    {
        let textElement = document.getElementById('idInputForNodeValue');
        textElement.value = '';
    }


    // public
    processInputForNodeValue()
    {
        let valueInInput = this.parseInputForNodeValue();
        this.clearInputValue();
        return valueInInput;
    }


    // TO DELETE AFTER IMPLEMENTING SERVER PART
    processInputRangeValues()
    {
        let textElement = document.getElementById('idInputForNodeValue');

        let arrayOfValues = this.parseInputRangeNodeValues(textElement.value);

        this.clearInputValue();

        return arrayOfValues;
    }


    // disable or enable html element (button, input)
    disableButton(idButton, isDisabled, textControlWhenEnabled, textControlWhenDisabled)
    {
        let buttonDomElement = this.domUpdater.getControl(idButton);
        buttonDomElement.disabled = isDisabled;

        this.setTextToControlWhenItEnabled(buttonDomElement, isDisabled, textControlWhenEnabled);
        this.setTextToControlWhenItDisabled(buttonDomElement, isDisabled, textControlWhenDisabled);
    }


    setTextToControlWhenItEnabled(controlDomElement, isDisabled, textControlWhenEnabled)
    {
        if (!textControlWhenEnabled)
        {
            return;
        }

        if (isDisabled === false)
        {
            controlDomElement.textContent = textControlWhenEnabled;
        }
    }


    setTextToControlWhenItDisabled(controlDomElement, isDisabled, textControlWhenDisabled)
    {
        if (!textControlWhenDisabled)
        {
            return;
        }

        if (isDisabled === true)
        {
            controlDomElement.textContent = textControlWhenDisabled;
        }
    }


    setTextToInputPlaceholderWhenItEnabled(controlDomElement, isDisabled, textPlaceholderWhenEnabled)
    {
        if (!textPlaceholderWhenEnabled)
        {
            return;
        }

        if (isDisabled === false)
        {
            controlDomElement.placeholder = textPlaceholderWhenEnabled;
        }
    }


    setTextToInputPlaceholderWhenItDisabled(controlDomElement, isDisabled, textPlaceholderWhenDisabled)
    {
        if (!textPlaceholderWhenDisabled)
        {
            return;
        }

        if (isDisabled === true)
        {
            controlDomElement.placeholder = textPlaceholderWhenDisabled;
        }
    }


    disableInput(idInput, isDisabled, textPlaceholderWhenEnabled, textPlaceholderWhenDisabled)
    {
        let inputDomElement = this.domUpdater.getControl(idInput);
        inputDomElement.disabled = isDisabled;

        this.setTextToInputPlaceholderWhenItEnabled(inputDomElement, isDisabled, textPlaceholderWhenEnabled);
        this.setTextToInputPlaceholderWhenItDisabled(inputDomElement, isDisabled, textPlaceholderWhenDisabled);

        // toggle input progress bar
        //this.toggleStyleInputProgressBar(isDisabled); // There is visible issues with latencies and interruptions !!!!!
    }


    // There is visible issues with latencies and interruptions !!!!!
    // Toggle style of input progress bar
    toggleStyleInputProgressBar(isDisabled)
    {
        let inputConfigurations = this.htmlConfigurationAttributesReader.getHtmlInputNodeConfigurations();
        let divInputProgressBarAttributes = inputConfigurations.divInputProgressBarAttributes;
        let idInputProgressBar = divInputProgressBarAttributes.defaultAttributes.id;

        let classNameInputProgressBar = divInputProgressBarAttributes.defaultAttributes.class;
        let inputProgressBarDomElement = this.domUpdater.getControl(idInputProgressBar);

        if (isDisabled)
        {
            inputProgressBarDomElement.classList.add(classNameInputProgressBar);

            return;
        }

        inputProgressBarDomElement.classList.remove(classNameInputProgressBar);
    }


    // attach event handler for button or input
    attachControlsActivityHandlers(idControl)
    {
        let controlElement = this.domUpdater.getControl(idControl);

        controlElement.addEventListener("enableControl", function (evn)
        {
            this.disableGroupControls(false); // enable buttons and input ????????

        }.bind(this));


        controlElement.addEventListener("disableControl", function (evn)
        {
            this.disableGroupControls(true); // disable buttons and input ????????

        }.bind(this));
    }


    // ???
    // disable or enable group of html elements (buttons, inputs). Argument arrayEnableDisableIds is an array
    disableGroupControls(isDisabled) // arrayEnableDisableIds = [{idControl, isEnable}, {idControl, isEnable}, {idControl, isEnable},...]
    {
        let idInput = this.getIdInputNode();
        let idButtonAddNode = this.getIdButtonAddNode();
        let idButtonFindNode = this.getIdButtonFindNode();
        let idButtonDeleteNode = this.getIdButtonDeleteNode();
        let idButtonTraverseMenu = this.getIdButtonTraverseMenu();
        let idButtonTraverseInorder = this.getIdButtonTraverseInorder();
        let idButtonTraversePreorder = this.getIdButtonTraversePreorder();
        let idButtonTraversePostorder = this.getIdButtonTraversePostorder();
        let idButtonSave = this.getIdButtonSave();

        let inputNodeConfigurations = this.htmlConfigurationAttributesReader.getHtmlInputNodeConfigurations();
        let textPlaceholderWhenDisabled = inputNodeConfigurations.inputAttributes.textInsideInput.whenInputDisabled;
        let textPlaceholderWhenEnabled = inputNodeConfigurations.inputAttributes.textInsideInput.whenInputEnabled;
        this.disableInput(idInput, isDisabled, textPlaceholderWhenEnabled, textPlaceholderWhenDisabled);
        this.disableButton(idButtonAddNode, isDisabled, null, null);
        this.disableButton(idButtonFindNode, isDisabled, null, null);
        this.disableButton(idButtonDeleteNode, isDisabled, null, null);

        let buttonTraverseMenuConfigurations = this.htmlConfigurationAttributesReader.getHtmlControlButtonTraverseMenuConfigurations();
        let textButtonTraverseMenuWhenItEnabled = buttonTraverseMenuConfigurations.buttonTraverseMenuAttributes.textInsideButton.whenButtonEnabled;
        this.disableButton(idButtonTraverseMenu, isDisabled, textButtonTraverseMenuWhenItEnabled, null);
        this.disableButton(idButtonTraverseInorder, isDisabled, null, null);
        this.disableButton(idButtonTraversePreorder, isDisabled, null, null);
        this.disableButton(idButtonTraversePostorder, isDisabled, null, null); // "idButtonTraversingPostorder"
        this.disableButton(idButtonSave, isDisabled, null, null);
    }


    attachGroupControlActivityHandlers()
    {
        let idInput = this.getIdInputNode();
        let idButtonAddNode = this.getIdButtonAddNode();
        let idButtonFindNode = this.getIdButtonFindNode();
        let idButtonDeleteNode = this.getIdButtonDeleteNode();
        let idButtonTraverseMenu = this.getIdButtonTraverseMenu();
        let idButtonTraverseInorder = this.getIdButtonTraverseInorder();
        let idButtonTraversePreorder = this.getIdButtonTraversePreorder();
        let idButtonTraversePostorder = this.getIdButtonTraversePostorder();
        let idButtonSave = this.getIdButtonSave();

        this.attachControlsActivityHandlers(idInput);
        this.attachControlsActivityHandlers(idButtonAddNode);
        this.attachControlsActivityHandlers(idButtonFindNode);
        this.attachControlsActivityHandlers(idButtonDeleteNode);
        this.attachControlsActivityHandlers(idButtonTraverseMenu);
        this.attachControlsActivityHandlers(idButtonTraverseInorder);
        this.attachControlsActivityHandlers(idButtonTraversePreorder);
        this.attachControlsActivityHandlers(idButtonTraversePostorder);
        this.attachControlsActivityHandlers(idButtonSave);
    }


    getIdInputNode()
    {
        let inputNodeConfigurations = this.htmlConfigurationAttributesReader.getHtmlInputNodeConfigurations();
        return inputNodeConfigurations.inputAttributes.defaultAttributes.id; // "idInputForNodeValue"
    }


    getIdButtonAddNode()
    {
        let buttonAddNodeConfigurations = this.htmlConfigurationAttributesReader.getHtmlControlButtonAddNodeConfigurations();
        return buttonAddNodeConfigurations.buttonAddNodeAttributes.defaultAttributes.id;
    }


    getIdButtonFindNode()
    {
        let buttonFindNodeConfigurations = this.htmlConfigurationAttributesReader.getHtmlControlButtonFindNodeConfigurations();
        return buttonFindNodeConfigurations.buttonFindNodeAttributes.defaultAttributes.id;
    }


    getIdButtonDeleteNode()
    {
        let buttonDeleteNodeConfigurations = this.htmlConfigurationAttributesReader.getHtmlControlButtonDeleteNodeConfigurations();
        return buttonDeleteNodeConfigurations.buttonDeleteNodeAttributes.defaultAttributes.id;
    }


    getIdButtonTraverseMenu()
    {
        let buttonTraverseMenuConfigurations = this.htmlConfigurationAttributesReader.getHtmlControlButtonTraverseMenuConfigurations();
        return buttonTraverseMenuConfigurations.buttonTraverseMenuAttributes.defaultAttributes.id;
    }


    getIdButtonTraverseInorder()
    {
        let buttonTraverseInorderConfigurations = this.htmlConfigurationAttributesReader.getHtmlControlButtonTraverseInorderConfigurations();
        return buttonTraverseInorderConfigurations.buttonTraverseInorderAttributes.defaultAttributes.id;
    }


    getIdButtonTraversePreorder()
    {
        let buttonTraversePreorderConfigurations = this.htmlConfigurationAttributesReader.getHtmlControlButtonTraversePreorderConfigurations();
        return buttonTraversePreorderConfigurations.buttonTraversePreorderAttributes.defaultAttributes.id;
    }


    getIdButtonTraversePostorder()
    {
        let buttonTraversePostorderConfigurations = this.htmlConfigurationAttributesReader.getHtmlControlButtonTraversePostorderConfigurations();
        return buttonTraversePostorderConfigurations.buttonTraversePostorderAttributes.defaultAttributes.id;
    }


    getIdButtonSave()
    {
        let buttonSaveConfigurations = this.htmlConfigurationAttributesReader.getHtmlControlButtonSaveConfigurations();
        return buttonSaveConfigurations.buttonSaveAttributes.defaultAttributes.id;
    }

}