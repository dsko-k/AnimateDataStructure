import { AbstractTreeTraversing } from '../DataStructureOperations/AbstractTreeTraversing.js';
import { ContexCleaningCssEntity } from '../CssCleaner/ContexCleaningCssEntity.js';
import { KeyframeCleaner } from '../CssCleaner/KeyframeCleaner.js';
// class AbstractTreeTraversing not the AbstractTraversingTree

export class TraversingContext
{
    constructor(controlHandlersContext, tree)
    {
        this.controlHandlersContext = controlHandlersContext; // treeContext is type of some ControlHandlers...
        this.tree = tree;

        this.abstractTreeTraversing = new AbstractTreeTraversing(this.tree); // DO NOT REMOVE: for table with info about traversing
    }


    onTraversingTree(startingNodeToTraverse = this.tree.root, traversingTreeOperationInstance)
    {
        if (this.tree.currentAmountOfNodesInTree === 0)
        {
            return;
        }

        // dispatch event to disable buttons and input
        this.controlHandlersContext.customEventHandler.dispatchDisableGroupControls(true);

        this.controlHandlersContext.hideGlowingBorderForPreviouslyFoundNode();


        if (!traversingTreeOperationInstance.traverseUntillFindValue)
        {
            let valueToFind = this.controlHandlersContext.processInputForNodeValue();

            traversingTreeOperationInstance.traverseUntillFindValue = valueToFind; // DO NOT DELETE: traverseUntillFindValue = NaN when input was empty (nothin was entered)

            this.abstractTreeTraversing.onAddNewEntryToHtmlTableOnTraversingStarted(traversingTreeOperationInstance);
        }

        // initialize node-visitor (move to first node to traverse)

        let nodeVisitor = this.controlHandlersContext.initializeNodeVisitor();

        this.onTraversingNodes(nodeVisitor, startingNodeToTraverse, traversingTreeOperationInstance); // animate moving node-visitor
    }


    // private


    onTraversingNodes(nodeVisitor, startNode, traversingTreeOperationInstance)
    {
        let sequenceStepsTraversingNode = this.controlHandlersContext.getSequenceStepsTraversingNode(nodeVisitor, startNode, traversingTreeOperationInstance);

        this.onVisitedNode(nodeVisitor, sequenceStepsTraversingNode, traversingTreeOperationInstance);
    }


    // Change color of node after it was visited
    onVisitedNode(nodeVisitor, stepAnimations, traversingTreeOperationInstance)
    {
        traversingTreeOperationInstance.restoreVisitedStatusAllNodes(); // restore visited status to all nodes

        // !!!!!!!!!!!!!!!! REPLACE HARDCODE !!!!!!!!!!!!!!!!
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
                // Add entry in html-table Tree Traversing
                this.abstractTreeTraversing.onAddNewEntryToHtmlTableOnVisitedNode(currentNodeToVisit, traversingTreeOperationInstance);

                this.controlHandlersContext.onChangeColorForVisitedNode(currentNodeToVisit, currentStepAnimation, traversingTreeOperationInstance);

                // glow borded of the found node (in case of Heap, when find node possible only using traversing untill node with particular value will not be found)
                this.onTargetNodeFoundDuringTraversing(currentNodeToVisit, currentStepAnimation, traversingTreeOperationInstance, 2, 3);
            }


            let lastAnimationName = this.controlHandlersContext.domUpdater.getLastAnimationName(nodeVisitor, superContainerName);

            if (lastAnimationName === evn.animationName)
            {
                let timeoutDurationMilsec = parseFloat(currentStepAnimation.stepAnimationObject.timeStepAnimation.timeDurationStep) * 1000 / 2;

                // DO NOT DELETE COMMENT:

                // setTimeout is necessary to show node-visitor during timeoutDurationMilsec before node-visitor will be deleted
                // If setTimeout was not used then during postorder traversing
                // last node (root) was changed color and the color of root would instantly restored (efect as
                // root color was not changed after it was visited in the end of postorder traversing)

                setTimeout(function ()
                {
                    // remove keyframes and style class(?) of nodeVisitor
                    this.cleanCssOfNode(nodeVisitor, superContainerName);

                    domElementNodeVisitor.remove();

                    // restore all node colors
                    this.onAnimationEndTraversing(stepAnimations, traversingTreeOperationInstance, currentNodeToVisit);

                }.bind(this), timeoutDurationMilsec);

                return;
            }

            stepNumber++;

        }.bind(this));

    }


    // glow borded of the found node (in case of Heap, where node can be found only using traversing untill node with particular value will not be found)
    onTargetNodeFoundDuringTraversing(currentNodeToVisit, currentStepAnimation, traversingTreeOperationInstance, indexInAdditionalStyleClassesForShadowGlowingBorder, indexInAdditionalStyleClassesForGlowingBorder)
    {
        if (traversingTreeOperationInstance.traverseUntillFindValue &&
            currentNodeToVisit.value === traversingTreeOperationInstance.traverseUntillFindValue)
        {
            this.setAdditionalStyleClassDuringTraversing(currentNodeToVisit, currentStepAnimation, indexInAdditionalStyleClassesForShadowGlowingBorder);
            this.setAdditionalStyleClassDuringTraversing(currentNodeToVisit, currentStepAnimation, indexInAdditionalStyleClassesForGlowingBorder);
        }
    }


    onAnimationEndTraversing(stepAnimations, traversingTreeOperationInstance, lastNodeBeforeEndingTraversing)
    {
        // restore colors of nodes after traversing this.tree
        this.controlHandlersContext.restoreNodesColorsAfterTraversing(stepAnimations);

        // restore visited status to all nodes
        traversingTreeOperationInstance.restoreVisitedStatusAllNodes();

        this.abstractTreeTraversing.onAddNewEntryToHtmlTableOnTraversingEnded(traversingTreeOperationInstance, traversingTreeOperationInstance.wasFoundNodeValueDuringTraversing);

        traversingTreeOperationInstance.setFlagWasFoundNodeValueDuringTraversing(false);

        // ????
        if (!this.tree.treeViewState.isNodeToBeDeleted)
        {
            // dispatch event to enable buttons and input
            this.controlHandlersContext.customEventHandler.dispatchDisableGroupControls(false);
        }

        // DO NOT DELETE COMMENT:
        // line below should be only after dispatchDisableGroupControls(false); in other case - BUG in activity of a group of controls
        this.controlHandlersContext.customEventHandler.dispatchLastNodeBeforeEndingTraversing(lastNodeBeforeEndingTraversing);
    }

    
    //private
    // apply additionalStyleClasses for current step
    setAdditionalStyleClassDuringTraversing(nodeToApply, currentStepAnimation, indexInAdditionalStyleClasses)
    {
        let additionalStyleClasses = currentStepAnimation.stepAnimationObject.additionalStyleClasses;

        this.controlHandlersContext.domUpdater.updateStyleClass(nodeToApply, additionalStyleClasses[indexInAdditionalStyleClasses].elementNameToApplyStyle, additionalStyleClasses[indexInAdditionalStyleClasses].styleClassToApply);

        // Apply state to visited node
        let nodeState = currentStepAnimation.stepAnimationObject.additionalStyleClasses[indexInAdditionalStyleClasses].nodeState;
        nodeToApply.appliedNodeStyles.addAppliedNodeStyles(nodeToApply, nodeState);
    }


    // Part for traversing


    // remove keyframes and style class(?) of nodeVisitor
    cleanCssOfNode(node, elementName)
    {
        let contexCleaningCssEntity = new ContexCleaningCssEntity(new KeyframeCleaner());
        contexCleaningCssEntity.cleanCss(node, elementName);

        // Incorrect behavior animation of nodeVisitor if traverse this.tree another time (css style of nodeVisitor should not be deleted!!!)

        //contexCleaningCssEntity = new ContexCleaningCssEntity(new StyleCleaner());
        //contexCleaningCssEntity.cleanCss(node, elementName);
    }
}