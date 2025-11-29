import { AnimationMovingAcrossNodes } from './AnimationMovingAcrossNodes.js';
import { CssUpdater } from '../CssBuilder/CssUpdater.js';
import { TreeStepAnimationChooserAddNode } from '../TreeStepAnimationChooser/TreeStepAnimationChooserAddNode.js';
import { TreeStepAnimationChooserAlignNodeByWidth } from '../TreeStepAnimationChooser/TreeStepAnimationChooserAlignNodeByWidth.js';
import { TreeStepAnimationChooserClickNode } from '../TreeStepAnimationChooser/TreeStepAnimationChooserClickNode.js';
import { TreeStepAnimationChooserFindNode } from '../TreeStepAnimationChooser/TreeStepAnimationChooserFindNode.js';
import { TreeStepAnimationChooserFindSuccessorNode } from '../TreeStepAnimationChooser/TreeStepAnimationChooserFindSuccessorNode.js';
import { TreeStepAnimationChooserLinkNodeAction } from '../TreeStepAnimationChooser/TreeStepAnimationChooserLinkNodeAction.js';
import { TreeStepAnimationChooserAlignNodeByHeight } from '../TreeStepAnimationChooser/TreeStepAnimationChooserAlignNodeByHeight.js';
import { TreeStepAnimationChooserNodeBalancing } from '../TreeStepAnimationChooser/TreeStepAnimationChooserNodeBalancing.js';
import { TreeStepAnimationChooserLinkBeforeAfterBalancing } from '../TreeStepAnimationChooser/TreeStepAnimationChooserLinkBeforeAfterBalancing.js';
import { TreeStepAnimationChooserTraversingNode } from '../TreeStepAnimationChooser/TreeStepAnimationChooserTraversingNode.js';
import { TreeStepAnimationChooserAddRangeOfNodes } from '../TreeStepAnimationChooser/TreeStepAnimationChooserAddRangeOfNodes.js';
import { TreeStepAnimationChooserSwapNode } from '../TreeStepAnimationChooser/TreeStepAnimationChooserSwapNode.js';
import { TreeStepAnimationChooserLinkBeforeAfterSwapNodes } from '../TreeStepAnimationChooser/TreeStepAnimationChooserLinkBeforeAfterSwapNodes.js';
import { HtmlElementContainerClient } from '../HtmlElementNodeBuilder/HtmlElementContainerClient.js';
import { HtmlAddNodeBuilder } from '../HtmlElementNodeBuilder/HtmlAddNodeBuilder.js';
import { HtmlFindNodeBuilder } from '../HtmlElementNodeBuilder/HtmlFindNodeBuilder.js';
import { HtmlTraversingNodeBuilder } from '../HtmlElementNodeBuilder/HtmlTraversingNodeBuilder.js';
import { DomUpdater } from '../HtmlDomElementHandler/DomUpdater.js';

export class SequenceSteps
{
    constructor(tree)
    {
        this.tree = tree;
        this.sequenceSteps = [];
    }


    addNextStep(stepAnimation, cssEntity)
    {
        this.sequenceSteps.push({
            stepAnimation: stepAnimation,
            cssEntity: cssEntity
        });
    }


    getSequenceSteps()
    {
        return this.sequenceSteps;
    }


    createSequenceStepsAdditionNode(nodeToAnimate, patternStepAnimationArrayOperation)
    {
        let animationMovingAcrossNodes = new AnimationMovingAcrossNodes(this.tree, patternStepAnimationArrayOperation, new TreeStepAnimationChooserAddNode());

        let stepAnimations = animationMovingAcrossNodes.animateAddNode(nodeToAnimate);

        let cssUpdater = new CssUpdater(this.tree, stepAnimations.flat());

        cssUpdater.createOrUpdateCssEntityAddNode();

        let lastStepIndex = stepAnimations.flat().length - 1;
        let lastStep = stepAnimations.flat()[lastStepIndex].stepAnimationObject;

        let htmlElementContainerClient = new HtmlElementContainerClient(lastStep,
            new HtmlAddNodeBuilder(lastStep, patternStepAnimationArrayOperation));

        htmlElementContainerClient.createHtmlElementContainer(lastStep.htmlGlowingMovingUpLineContainer);

        let htmlElementContainerParts = htmlElementContainerClient.getHtmlElementContainerParts();

        let nodeState = lastStep.nodesInfoStepAnimation.nodeState;
        nodeToAnimate.appliedNodeStyles.addAppliedNodeStyles(nodeToAnimate, nodeState);

        return stepAnimations.flat();
    }


    createSequenceStepsAlignNodeByWidth(nodeToAnimate, patternStepAnimationArrayOperation)
    {
        let animationMovingAcrossNodes = new AnimationMovingAcrossNodes(this.tree, patternStepAnimationArrayOperation, new TreeStepAnimationChooserAlignNodeByWidth());

        let stepAnimations = animationMovingAcrossNodes.animateAlignNode(nodeToAnimate);

        let cssUpdater = new CssUpdater(this.tree, stepAnimations.flat());
        cssUpdater.createOrUpdateCssEntityAlignNodeByWidth();

        let lastStepIndex = stepAnimations.flat().length - 1;
        let lastStep = stepAnimations.flat()[lastStepIndex].stepAnimationObject;

        let nodeState = lastStep.nodesInfoStepAnimation.nodeState;
        nodeToAnimate.appliedNodeStyles.addAppliedNodeStyles(nodeToAnimate, nodeState);

        return this.getSequenceSteps();
    }


    createSequenceStepsClickNode(nodeToAnimate, relativeNodeToAnimateAccross, patternStepAnimationArrayOperation)
    {
        let animationMovingAcrossNodes = new AnimationMovingAcrossNodes(this.tree, patternStepAnimationArrayOperation, new TreeStepAnimationChooserClickNode());

        let stepAnimations = animationMovingAcrossNodes.animateClickNode(nodeToAnimate, relativeNodeToAnimateAccross);

        let cssUpdater = new CssUpdater(this.tree, stepAnimations.flat());
        cssUpdater.createOrUpdateCssEntityClickNode();
                
        let domUpdater = new DomUpdater();

        let lastStepIndex = stepAnimations.flat().length - 1;
        let lastStep = stepAnimations.flat()[lastStepIndex].stepAnimationObject;

        let nodeState = lastStep.additionalStyleClasses
            .filter(additionalStyleClass => additionalStyleClass.nodeIsLeftChild === nodeToAnimate.isLeftChild)[0].nodeState;

        domUpdater.applyAdditionalStyleClasses(nodeToAnimate, lastStep.additionalStyleClasses, nodeState);

        return this.getSequenceSteps();
    }


    createSequenceStepsHideClickNode(nodeToAnimate, relativeNodeToAnimateAccross, patternStepAnimationArrayOperation)
    {
        let animationMovingAcrossNodes = new AnimationMovingAcrossNodes(this.tree, patternStepAnimationArrayOperation, new TreeStepAnimationChooserClickNode());

        let stepAnimations = animationMovingAcrossNodes.animateClickNode(nodeToAnimate, relativeNodeToAnimateAccross);

        let domUpdater = new DomUpdater();

        let lastStepIndex = stepAnimations.flat().length - 1;
        let lastStep = stepAnimations.flat()[lastStepIndex].stepAnimationObject;

        let nodeState = lastStep.additionalStyleClasses
            .filter(additionalStyleClass => additionalStyleClass.nodeIsLeftChild === nodeToAnimate.isLeftChild)[0].nodeState;

        domUpdater.applyAdditionalStyleClasses(nodeToAnimate, lastStep.additionalStyleClasses, nodeState);

        return this.getSequenceSteps();
    }


    createSequenceStepsFindNode(nodeToAnimate, patternStepAnimationArrayOperation)
    {
        let animationMovingAcrossNodes = new AnimationMovingAcrossNodes(this.tree, patternStepAnimationArrayOperation, new TreeStepAnimationChooserFindNode());

        let stepAnimations = animationMovingAcrossNodes.animateFindNode(nodeToAnimate);

        let cssUpdater = new CssUpdater(this.tree, stepAnimations.flat());

        cssUpdater.createOrUpdateCssEntityFindNode();

        let lastStepIndex = stepAnimations.flat().length - 1;
        let lastStep = stepAnimations.flat()[lastStepIndex].stepAnimationObject;

        let htmlElementContainerClient = new HtmlElementContainerClient(lastStep,
            new HtmlFindNodeBuilder(lastStep, patternStepAnimationArrayOperation));

        htmlElementContainerClient.createHtmlElementContainer(lastStep.htmlGlowingMovingUpLineContainer);

        let htmlElementContainerParts = htmlElementContainerClient.getHtmlElementContainerParts();

        return stepAnimations.flat();
    }


    createSequenceStepsFindSuccessorNode(nodeToDelete, patternStepAnimationArrayOperation, nodeFinder)
    {
        let animationMovingAcrossNodes = new AnimationMovingAcrossNodes(this.tree, patternStepAnimationArrayOperation, new TreeStepAnimationChooserFindSuccessorNode(nodeToDelete));

        let stepAnimations = animationMovingAcrossNodes.animateFindSuccessorNode(nodeToDelete, nodeFinder);

        let cssUpdater = new CssUpdater(this.tree, stepAnimations.flat());

        cssUpdater.createOrUpdateCssEntityFindNode();

        let lastStepIndex = stepAnimations.flat().length - 1;
        let lastStep = stepAnimations.flat()[lastStepIndex].stepAnimationObject;

        let htmlElementContainerClient = new HtmlElementContainerClient(lastStep,
            new HtmlFindNodeBuilder(lastStep, patternStepAnimationArrayOperation));

        htmlElementContainerClient.createHtmlElementContainer(lastStep.htmlGlowingMovingUpLineContainer);

        let htmlElementContainerParts = htmlElementContainerClient.getHtmlElementContainerParts();

        return stepAnimations.flat();
    }


    createSequenceStepsLinkNodeAction(nodeToAnimateLinkAction, patternStepAnimationArrayOperation, isHideLink)
    {
        let animationMovingAcrossNodes = new AnimationMovingAcrossNodes(this.tree, patternStepAnimationArrayOperation, new TreeStepAnimationChooserLinkNodeAction(isHideLink));

        let stepAnimations = animationMovingAcrossNodes.animateLinkNodeAction(nodeToAnimateLinkAction);

        let lastStepIndex = stepAnimations.flat().length - 1;
        let lastStep = stepAnimations.flat()[lastStepIndex].stepAnimationObject;

        if (!isHideLink)
        {
            this.updateHtmlLinkContainerLinkNodeAction(lastStep);
        }

        let cssUpdater = new CssUpdater(this.tree, stepAnimations.flat());

        cssUpdater.createOrUpdateCssEntityLinkNodeAction();

        return stepAnimations.flat();
    }


    updateHtmlLinkContainerLinkNodeAction(stepAnimation)
    {
        if (!stepAnimation.nodesInfoStepAnimation.patternStepName.includes("draw"))
        {
            return;
        }

        let linkContainerElement = stepAnimation.htmlLinkContainer[0];
        let correctStyleClassLinkContainer = linkContainerElement.styleClassToApply.substring(1);
        let elementNameLinkContainer = linkContainerElement.elementName;

        let domUpdater = new DomUpdater();

        let nodeToAnimate = stepAnimation.nodesInfoStepAnimation.nodeToAnimate;
        let currentClassNameOfLinkContainer = domUpdater.getAttributeDomElement(nodeToAnimate, elementNameLinkContainer, "class");

        if (nodeToAnimate.isLeftChild !== null && currentClassNameOfLinkContainer !== correctStyleClassLinkContainer)
        {
            domUpdater.updateStyleClass(nodeToAnimate, elementNameLinkContainer, correctStyleClassLinkContainer)
        }

        if (nodeToAnimate.isLeftChild === null)
        {
            domUpdater.updateStyleClass(nodeToAnimate, elementNameLinkContainer, "");
        }
    }


    updateHtmlLinkContainerBalancing(nodeToUnfadeLinkContainer)
    {
        let correctStyleClassLinkContainer = "";
        let elementNameLinkContainer = "linkContainer";

        let domUpdater = new DomUpdater();

        if (nodeToUnfadeLinkContainer.isLeftChild !== null)
        {
            nodeToUnfadeLinkContainer.isLeftChild ? correctStyleClassLinkContainer = "leftLinkContainer" : correctStyleClassLinkContainer = "rightLinkContainer";
        }

        domUpdater.updateStyleClass(nodeToUnfadeLinkContainer, elementNameLinkContainer, correctStyleClassLinkContainer);

        let elementNameGlowingMovingUpLineContainer = "glowingMovingUpLineContainer";

        if (nodeToUnfadeLinkContainer.isLeftChild === null)
        {
            domUpdater.updateStyleClass(nodeToUnfadeLinkContainer, elementNameGlowingMovingUpLineContainer, "");
        }
    }


    // Heap
    updateHtmlLinkContainerSwapNodes(nodeToUpdateLinkContainer)
    {
        let correctStyleClassLinkContainer = "";
        let elementNameLinkContainer = "linkContainer";

        let domUpdater = new DomUpdater();

        if (nodeToUpdateLinkContainer.isLeftChild !== null)
        {
            nodeToUpdateLinkContainer.isLeftChild ? correctStyleClassLinkContainer = "leftLinkContainer" : correctStyleClassLinkContainer = "rightLinkContainer";
        }

        domUpdater.updateStyleClass(nodeToUpdateLinkContainer, elementNameLinkContainer, correctStyleClassLinkContainer);

        let elementNameGlowingMovingUpLineContainer = "glowingMovingUpLineContainer";

        if (nodeToUpdateLinkContainer.isLeftChild === null)
        {
            domUpdater.updateStyleClass(nodeToUpdateLinkContainer, elementNameGlowingMovingUpLineContainer, "");
        }
    }


    updateHtmlLinkContainerAlignByHeight(nodeToAlignByHeight)
    {
        if (nodeToAlignByHeight.isLeftChild !== null)
        {
            return;
        }

        let correctStyleClassLinkContainer = "";
        let elementNameLinkContainer = "linkContainer";

        let domUpdater = new DomUpdater();

        domUpdater.updateStyleClass(nodeToAlignByHeight, elementNameLinkContainer, correctStyleClassLinkContainer);

        let elementNameGlowingMovingUpLineContainer = "glowingMovingUpLineContainer";

        domUpdater.updateStyleClass(nodeToAlignByHeight, elementNameGlowingMovingUpLineContainer, "");

    }


    updateHtmlLinkContainer(stepAnimation)
    {
        let linkContainerElement = stepAnimation.htmlLinkContainer[0];
        let correctStyleClassLinkContainer = linkContainerElement.styleClassToApply.substring(1);
        let elementNameLinkContainer = linkContainerElement.elementName;

        let domUpdater = new DomUpdater();

        let nodeToAnimate = stepAnimation.nodesInfoStepAnimation.nodeToAnimate;
        let currentClassNameOfLinkContainer = domUpdater.getAttributeDomElement(nodeToAnimate, elementNameLinkContainer, "class");

        if (nodeToAnimate.isLeftChild !== null && currentClassNameOfLinkContainer !== correctStyleClassLinkContainer)
        {
            domUpdater.updateStyleClass(nodeToAnimate, elementNameLinkContainer, correctStyleClassLinkContainer)
        }

        if (nodeToAnimate.isLeftChild === null)
        {
            domUpdater.updateStyleClass(nodeToAnimate, elementNameLinkContainer, "");
        }
    }


    createSequenceStepsAlignNodeByHeight(nodeToAnimate, patternStepAnimationArrayOperation)
    {
        let animationMovingAcrossNodes = new AnimationMovingAcrossNodes(this.tree, patternStepAnimationArrayOperation, new TreeStepAnimationChooserAlignNodeByHeight());

        let stepAnimations = animationMovingAcrossNodes.animateAlignNode(nodeToAnimate);

        let cssUpdater = new CssUpdater(this.tree, stepAnimations.flat());
        cssUpdater.createOrUpdateCssEntityAlignNodeByHeight();

        let lastStepIndex = stepAnimations.flat().length - 1;
        let lastStep = stepAnimations.flat()[lastStepIndex].stepAnimationObject;

        let nodeState = lastStep.nodesInfoStepAnimation.nodeState;

        nodeToAnimate.appliedNodeStyles.addAppliedNodeStyles(nodeToAnimate, nodeState);

        return stepAnimations.flat();
    }


    createSequenceStepsNodeBalanced(nodeToBalance, patternStepAnimationArrayOperation)
    {
        let animationMovingAcrossNodes = new AnimationMovingAcrossNodes(this.tree, patternStepAnimationArrayOperation, new TreeStepAnimationChooserNodeBalancing());

        let stepAnimations = animationMovingAcrossNodes.animateAlignNode(nodeToBalance);

        let cssUpdater = new CssUpdater(this.tree, stepAnimations.flat());
        cssUpdater.createOrUpdateCssEntityBalancing();

        let lastStepIndex = stepAnimations.flat().length - 1;
        let lastStep = stepAnimations.flat()[lastStepIndex].stepAnimationObject;

        let nodeState = lastStep.nodesInfoStepAnimation.nodeState;
        nodeToBalance.appliedNodeStyles.addAppliedNodeStyles(nodeToBalance, nodeState);

        return this.getSequenceSteps();
    }


    createSequenceStepsLinkBeforeAfterBalancing(nodeToAnimateLink, patternStepAnimationLinkBeforeAfterBalancing, isHideLink)
    {
        let animationMovingAcrossNodes = new AnimationMovingAcrossNodes(this.tree, patternStepAnimationLinkBeforeAfterBalancing, new TreeStepAnimationChooserLinkBeforeAfterBalancing(isHideLink));

        let stepAnimations = animationMovingAcrossNodes.animateLinkNodeAction(nodeToAnimateLink);

        let lastStepIndex = stepAnimations.flat().length - 1;
        let lastStep = stepAnimations.flat()[lastStepIndex].stepAnimationObject;
        
        let cssUpdater = new CssUpdater(this.tree, stepAnimations.flat());

        cssUpdater.createOrUpdateCssEntityLinkBeforeAfterBalancing();

        return stepAnimations.flat();
    }


    createSequenceStepsTraversingNode(nodeVisistor, startNode, traversingTreeOperationInstance, patternStepAnimationArrayOperation)
    {
        let animationMovingAcrossNodes = new AnimationMovingAcrossNodes(this.tree, patternStepAnimationArrayOperation, new TreeStepAnimationChooserTraversingNode());

        let stepAnimations = animationMovingAcrossNodes.animateTraversingNode(nodeVisistor, startNode, traversingTreeOperationInstance);

        let cssUpdater = new CssUpdater(this.tree, stepAnimations.flat());

        cssUpdater.createOrUpdateCssEntityTraversingNode();

        let lastStepIndex = stepAnimations.flat().length - 1;
        let lastStep = stepAnimations.flat()[lastStepIndex].stepAnimationObject;

        let htmlElementContainerClient = new HtmlElementContainerClient(lastStep,
            new HtmlTraversingNodeBuilder(lastStep, patternStepAnimationArrayOperation));

        htmlElementContainerClient.createHtmlElementContainer();

        let htmlElementContainerParts = htmlElementContainerClient.getHtmlElementContainerParts();

        return stepAnimations.flat();
    }


    createSequenceStepsAddRangeOfNodes(nodeToAnimate, patternStepAnimationArrayOperation)
    {
        let animationMovingAcrossNodes = new AnimationMovingAcrossNodes(this.tree, patternStepAnimationArrayOperation, new TreeStepAnimationChooserAddRangeOfNodes());

        let stepAnimations = animationMovingAcrossNodes.animateAlignNode(nodeToAnimate);

        let cssUpdater = new CssUpdater(this.tree, stepAnimations.flat());
        cssUpdater.createOrUpdateCssEntityAddRangeOfNodes();

        let lastStepIndex = stepAnimations.flat().length - 1;
        let lastStep = stepAnimations.flat()[lastStepIndex].stepAnimationObject;

        let htmlElementContainerClient = new HtmlElementContainerClient(lastStep,
            new HtmlAddNodeBuilder(lastStep, patternStepAnimationArrayOperation));

        htmlElementContainerClient.createHtmlElementContainer(lastStep.htmlGlowingMovingUpLineContainer);

        let htmlElementContainerParts = htmlElementContainerClient.getHtmlElementContainerParts();

        let nodeState = lastStep.nodesInfoStepAnimation.nodeState;
        nodeToAnimate.appliedNodeStyles.addAppliedNodeStyles(nodeToAnimate, nodeState);

        return stepAnimations.flat();
    }


    createSequenceStepsSwapNodes(nodeToSwap, relativeNodeToPlaceOnItPreviousPlace, patternStepAnimationArrayOperation)
    {
        let animationMovingAcrossNodes = new AnimationMovingAcrossNodes(this.tree, patternStepAnimationArrayOperation, new TreeStepAnimationChooserSwapNode());

        let stepAnimations = animationMovingAcrossNodes.animateSwapNode(nodeToSwap, relativeNodeToPlaceOnItPreviousPlace);

        let cssUpdater = new CssUpdater(this.tree, stepAnimations.flat());
        cssUpdater.createOrUpdateCssEntitySwapNode();

        let lastStepIndex = stepAnimations.flat().length - 1;
        let lastStep = stepAnimations.flat()[lastStepIndex].stepAnimationObject;

        let nodeState = lastStep.nodesInfoStepAnimation.nodeState;

        nodeToSwap.appliedNodeStyles.addAppliedNodeStyles(nodeToSwap, nodeState);

        return stepAnimations.flat();
    }


    createSequenceStepsLinkBeforeAfterSwapNodes(nodeToAnimateLink, patternStepAnimationLinkBeforeAfterSwapNodes, isHideLink)
    {
        let animationMovingAcrossNodes = new AnimationMovingAcrossNodes(this.tree, patternStepAnimationLinkBeforeAfterSwapNodes, new TreeStepAnimationChooserLinkBeforeAfterSwapNodes(isHideLink));

        let stepAnimations = animationMovingAcrossNodes.animateLinkNodeAction(nodeToAnimateLink);

        let lastStepIndex = stepAnimations.flat().length - 1;
        let lastStep = stepAnimations.flat()[lastStepIndex].stepAnimationObject;

        let cssUpdater = new CssUpdater(this.tree, stepAnimations.flat());

        cssUpdater.createOrUpdateCssEntityLinkBeforeAfterSwapNodes();

        return stepAnimations.flat();
    }
}