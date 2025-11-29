import { AbstractTreeTraversing } from '../DataStructureOperations/AbstractTreeTraversing.js';
import { ContexCleaningCssEntity } from '../CssCleaner/ContexCleaningCssEntity.js';
import { KeyframeCleaner } from '../CssCleaner/KeyframeCleaner.js';

export class TraversingContext
{
    constructor(controlHandlersContext, tree)
    {
        this.controlHandlersContext = controlHandlersContext;
        this.tree = tree;
        this.abstractTreeTraversing = new AbstractTreeTraversing(this.tree); // for table with info about traversing
    }


    onTraversingTree(startingNodeToTraverse = this.tree.root, traversingTreeOperationInstance)
    {
        if (this.tree.currentAmountOfNodesInTree === 0)
        {
            return;
        }
        this.controlHandlersContext.customEventHandler.dispatchDisableGroupControls(true);
        this.controlHandlersContext.hideGlowingBorderForPreviouslyFoundNode();
        if (!traversingTreeOperationInstance.traverseUntillFindValue)
        {
            let valueToFind = this.controlHandlersContext.processInputForNodeValue();
            traversingTreeOperationInstance.traverseUntillFindValue = valueToFind; // traverseUntillFindValue = NaN when input was empty (nothin was entered)
            this.abstractTreeTraversing.onAddNewEntryToHtmlTableOnTraversingStarted(traversingTreeOperationInstance);
        }        
        let nodeVisitor = this.controlHandlersContext.initializeNodeVisitor(); // initialize node-visitor (move to first node to traverse)
        this.onTraversingNodes(nodeVisitor, startingNodeToTraverse, traversingTreeOperationInstance); // animate moving node-visitor
    }


    onTraversingNodes(nodeVisitor, startNode, traversingTreeOperationInstance)
    {
        let sequenceStepsTraversingNode = this.controlHandlersContext.getSequenceStepsTraversingNode(nodeVisitor, startNode, traversingTreeOperationInstance);
        this.onVisitedNode(nodeVisitor, sequenceStepsTraversingNode, traversingTreeOperationInstance);
    }


    // Change color of node after it was visited
    onVisitedNode(nodeVisitor, stepAnimations, traversingTreeOperationInstance)
    {
        traversingTreeOperationInstance.restoreVisitedStatusAllNodes(); // restore visited status to all nodes
        let superContainerName = "superContainer";
        let domElementNodeVisitor = this.controlHandlersContext.domUpdater.getDomElement(nodeVisitor, superContainerName);
        let stepNumber = 0;

        domElementNodeVisitor.addEventListener("animationend", function (evn)
        {
            if (!evn.animationName.includes(`moveNodeOwnPosition_Traversing_`) || stepNumber >= stepAnimations.length)
            {
                return;
            }

            let currentStepAnimation = stepAnimations[stepNumber];
            let currentNodeToVisit = currentStepAnimation.stepAnimationObject.nodesInfoStepAnimation.relativeNodeToAnimateAccross;
            traversingTreeOperationInstance.setNodeVisited(currentNodeToVisit);
            // change color of node on color of visited node
            if (currentNodeToVisit.isVisitedNode && evn.animationName.includes(`IndexOfStepAnimation_${stepNumber}`))
            {
                this.abstractTreeTraversing.onAddNewEntryToHtmlTableOnVisitedNode(currentNodeToVisit, traversingTreeOperationInstance);
                this.controlHandlersContext.onChangeColorForVisitedNode(currentNodeToVisit, currentStepAnimation, traversingTreeOperationInstance);
                // glow borded of the found node (in case of Heap, when find node possible only using traversing untill node with particular value will not be found)
                this.onTargetNodeFoundDuringTraversing(currentNodeToVisit, currentStepAnimation, traversingTreeOperationInstance, 2, 3);
            }
            let lastAnimationName = this.controlHandlersContext.domUpdater.getLastAnimationName(nodeVisitor, superContainerName);
            if (lastAnimationName === evn.animationName)
            {
                let timeoutDurationMilsec = parseFloat(currentStepAnimation.stepAnimationObject.timeStepAnimation.timeDurationStep) * 1000 / 2;
                // setTimeout is necessary to show node-visitor during timeoutDurationMilsec before node-visitor will be deleted
                // If setTimeout was not used then during postorder traversing
                // last node (root) was changed color and the color of root would instantly restored (efect as
                // root color was not changed after it was visited in the end of postorder traversing)
                setTimeout(function ()
                {
                    this.cleanCssOfNode(nodeVisitor, superContainerName);
                    domElementNodeVisitor.remove();                    
                    this.onAnimationEndTraversing(stepAnimations, traversingTreeOperationInstance, currentNodeToVisit); // restore all node colors

                }.bind(this), timeoutDurationMilsec);

                return;
            }
            stepNumber++;
        }.bind(this));
    }


    // glow borded of the found node (in case of Heap, where node can be found only using traversing untill node with particular value will not be found)
    onTargetNodeFoundDuringTraversing(currentNodeToVisit, currentStepAnimation, traversingTreeOperationInstance, indexInAdditionalStyleClassesForShadowGlowingBorder, indexInAdditionalStyleClassesForGlowingBorder)
    {
        if (traversingTreeOperationInstance.traverseUntillFindValue && currentNodeToVisit.value === traversingTreeOperationInstance.traverseUntillFindValue)
        {
            this.setAdditionalStyleClassDuringTraversing(currentNodeToVisit, currentStepAnimation, indexInAdditionalStyleClassesForShadowGlowingBorder);
            this.setAdditionalStyleClassDuringTraversing(currentNodeToVisit, currentStepAnimation, indexInAdditionalStyleClassesForGlowingBorder);
        }
    }


    onAnimationEndTraversing(stepAnimations, traversingTreeOperationInstance, lastNodeBeforeEndingTraversing)
    {
        this.controlHandlersContext.restoreNodesColorsAfterTraversing(stepAnimations);
        traversingTreeOperationInstance.restoreVisitedStatusAllNodes();
        this.abstractTreeTraversing.onAddNewEntryToHtmlTableOnTraversingEnded(traversingTreeOperationInstance, traversingTreeOperationInstance.wasFoundNodeValueDuringTraversing);
        traversingTreeOperationInstance.setFlagWasFoundNodeValueDuringTraversing(false);
        if (!this.tree.treeViewState.isNodeToBeDeleted)
        {
            this.controlHandlersContext.customEventHandler.dispatchDisableGroupControls(false);
        }
        // line below should be only after dispatchDisableGroupControls(false); in other case - BUG in activity of a group of controls
        this.controlHandlersContext.customEventHandler.dispatchLastNodeBeforeEndingTraversing(lastNodeBeforeEndingTraversing);
    }


    // apply additionalStyleClasses for current step
    setAdditionalStyleClassDuringTraversing(nodeToApply, currentStepAnimation, indexInAdditionalStyleClasses)
    {
        let additionalStyleClasses = currentStepAnimation.stepAnimationObject.additionalStyleClasses;
        this.controlHandlersContext.domUpdater.updateStyleClass(nodeToApply, additionalStyleClasses[indexInAdditionalStyleClasses].elementNameToApplyStyle, additionalStyleClasses[indexInAdditionalStyleClasses].styleClassToApply);        
        let nodeState = currentStepAnimation.stepAnimationObject.additionalStyleClasses[indexInAdditionalStyleClasses].nodeState;
        nodeToApply.appliedNodeStyles.addAppliedNodeStyles(nodeToApply, nodeState);
    }


    cleanCssOfNode(node, elementName)
    {
        let contexCleaningCssEntity = new ContexCleaningCssEntity(new KeyframeCleaner());
        contexCleaningCssEntity.cleanCss(node, elementName);
    }
}