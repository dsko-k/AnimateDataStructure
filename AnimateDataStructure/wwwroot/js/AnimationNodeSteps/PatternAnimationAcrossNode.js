import { StepAnimationClient } from '../StepAnimationBuilder/StepAnimationClient.js';
import { TreeStepAnimationChooserAddNode } from '../TreeStepAnimationChooser/TreeStepAnimationChooserAddNode.js';
import { TreeStepAnimationChooserAlignNodeByWidth } from '../TreeStepAnimationChooser/TreeStepAnimationChooserAlignNodeByWidth.js';
import { TreeStepAnimationChooserClickNode } from '../TreeStepAnimationChooser/TreeStepAnimationChooserClickNode.js';
import { TreeStepAnimationChooserLinkNodeAction } from '../TreeStepAnimationChooser/TreeStepAnimationChooserLinkNodeAction.js';
import { TreeStepAnimationChooserLinkBeforeAfterBalancing } from '../TreeStepAnimationChooser/TreeStepAnimationChooserLinkBeforeAfterBalancing.js';
import { TreeStepAnimationChooserFindNode } from '../TreeStepAnimationChooser/TreeStepAnimationChooserFindNode.js';
import { TreeStepAnimationChooserFindSuccessorNode } from '../TreeStepAnimationChooser/TreeStepAnimationChooserFindSuccessorNode.js';
import { TreeStepAnimationChooserAlignNodeByHeight } from '../TreeStepAnimationChooser/TreeStepAnimationChooserAlignNodeByHeight.js';
import { TreeStepAnimationChooserNodeBalancing } from '../TreeStepAnimationChooser/TreeStepAnimationChooserNodeBalancing.js';
import { TreeStepAnimationChooserTraversingNode } from '../TreeStepAnimationChooser/TreeStepAnimationChooserTraversingNode.js';
import { TreeStepAnimationChooserAddRangeOfNodes } from '../TreeStepAnimationChooser/TreeStepAnimationChooserAddRangeOfNodes.js';
import { TreeStepAnimationChooserSwapNode } from '../TreeStepAnimationChooser/TreeStepAnimationChooserSwapNode.js';
import { TreeStepAnimationChooserLinkBeforeAfterSwapNodes } from '../TreeStepAnimationChooser/TreeStepAnimationChooserLinkBeforeAfterSwapNodes.js';
import { CoordinatesAddNodeStepAnimation } from '../AnimationNodeSteps/CoordinatesAddNodeStepAnimation.js';
import { CoordinatesFindNodeStepAnimation } from '../AnimationNodeSteps/CoordinatesFindNodeStepAnimation.js';
import { CoordinatesAlignByHeightNodeStepAnimation } from '../AnimationNodeSteps/CoordinatesAlignByHeightNodeStepAnimation.js';
import { CoordinatesTraversingNodeStepAnimation } from '../AnimationNodeSteps/CoordinatesTraversingNodeStepAnimation.js';
import { CoordinatesAddRangeOfNodesStepAnimation } from '../AnimationNodeSteps/CoordinatesAddRangeOfNodesStepAnimation.js';
import { CoordinatesSwapNodeStepAnimation } from '../AnimationNodeSteps/CoordinatesSwapNodeStepAnimation.js';
import { CoordinatesLinkBeforeAfterSwapNodesStepAnimation } from '../AnimationNodeSteps/CoordinatesLinkBeforeAfterSwapNodesStepAnimation.js';


export class PatternAnimationAcrossNode
{
    constructor(nodeToAnimate, relativeNodeToAnimateAccross, patternStepAnimationArrayOperation, treeStepAnimationChooserOperation)
    {
        this.nodeToAnimate = nodeToAnimate;
        this.relativeNodeToAnimateAccross = relativeNodeToAnimateAccross;
        this.patternStepAnimationArrayOperation = patternStepAnimationArrayOperation;
        this.treeStepAnimationChooserOperation = treeStepAnimationChooserOperation;
        this.stepsAnimationAcrossNode = [];
    }


    createPatternAnimationAcrossNode()
    {
        let stepsToAnimate = this.treeStepAnimationChooserOperation.chooseStepsToAnimate(this.nodeToAnimate, this.relativeNodeToAnimateAccross, this.patternStepAnimationArrayOperation);

        stepsToAnimate.forEach(step =>
        {
            let coordinatesOperationNodeStepAnimation = this.getCoordinatesOperationNodeStepAnimation(this.nodeToAnimate, this.relativeNodeToAnimateAccross, step);
            let stepAnimationClient = new StepAnimationClient(this.nodeToAnimate, this.relativeNodeToAnimateAccross, step, coordinatesOperationNodeStepAnimation);
            let stepAnimation = stepAnimationClient.createStepAnimation();
            this.stepsAnimationAcrossNode.push(stepAnimation);
        });

        return this.stepsAnimationAcrossNode;
    }


    getCoordinatesOperationNodeStepAnimation(nodeToAnimate, relativeNodeToAnimateAccross, extractedStepAcrossRelativeNode)
    {
        if (this.treeStepAnimationChooserOperation instanceof TreeStepAnimationChooserAddNode ||
            this.treeStepAnimationChooserOperation instanceof TreeStepAnimationChooserAlignNodeByWidth ||
            this.treeStepAnimationChooserOperation instanceof TreeStepAnimationChooserClickNode ||
            this.treeStepAnimationChooserOperation instanceof TreeStepAnimationChooserLinkNodeAction ||
            this.treeStepAnimationChooserOperation instanceof TreeStepAnimationChooserLinkBeforeAfterBalancing
        )
        {
            return new CoordinatesAddNodeStepAnimation(nodeToAnimate, relativeNodeToAnimateAccross, extractedStepAcrossRelativeNode);
        }

        if (this.treeStepAnimationChooserOperation instanceof TreeStepAnimationChooserFindNode ||
            this.treeStepAnimationChooserOperation instanceof TreeStepAnimationChooserFindSuccessorNode)
        {
            return new CoordinatesFindNodeStepAnimation(nodeToAnimate, relativeNodeToAnimateAccross, extractedStepAcrossRelativeNode);
        }

        if (this.treeStepAnimationChooserOperation instanceof TreeStepAnimationChooserAlignNodeByHeight ||
            this.treeStepAnimationChooserOperation instanceof TreeStepAnimationChooserNodeBalancing)
        {
            return new CoordinatesAlignByHeightNodeStepAnimation(nodeToAnimate, relativeNodeToAnimateAccross, extractedStepAcrossRelativeNode);
        }

        if (this.treeStepAnimationChooserOperation instanceof TreeStepAnimationChooserTraversingNode)
        {
            return new CoordinatesTraversingNodeStepAnimation(nodeToAnimate, relativeNodeToAnimateAccross, extractedStepAcrossRelativeNode);
        }

        if (this.treeStepAnimationChooserOperation instanceof TreeStepAnimationChooserAddRangeOfNodes)
        {
            return new CoordinatesAddRangeOfNodesStepAnimation(nodeToAnimate, relativeNodeToAnimateAccross, extractedStepAcrossRelativeNode);
        }

        if (this.treeStepAnimationChooserOperation instanceof TreeStepAnimationChooserSwapNode)
        {
            return new CoordinatesSwapNodeStepAnimation(nodeToAnimate, relativeNodeToAnimateAccross, extractedStepAcrossRelativeNode);
        }

        if (this.treeStepAnimationChooserOperation instanceof TreeStepAnimationChooserLinkBeforeAfterSwapNodes)
        {
            return new CoordinatesLinkBeforeAfterSwapNodesStepAnimation(nodeToAnimate, relativeNodeToAnimateAccross, extractedStepAcrossRelativeNode);
        }


        throw new Error(`Incorrect type ${typeof this.treeStepAnimationChooserOperation}`);
    }
}