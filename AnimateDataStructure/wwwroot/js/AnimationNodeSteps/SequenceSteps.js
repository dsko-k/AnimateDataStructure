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


export class SequenceSteps // To control all steps of all operations
{
    constructor(tree)
    {
        this.tree = tree;
        this.sequenceSteps = [];
    }

    addNextStep(stepAnimation, cssEntity) // stepAnimation - is either object StepAnimation or array of StepAnimation
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

    // TO DO: TEMPLATE Method
    // create SequenceSteps for adding node in Tree
    createSequenceStepsAdditionNode(nodeToAnimate, patternStepAnimationArrayOperation)
    {
        let animationMovingAcrossNodes = new AnimationMovingAcrossNodes(this.tree, patternStepAnimationArrayOperation, new TreeStepAnimationChooserAddNode());

        // add moving nodeToAnimate along Tree

        let stepAnimations = animationMovingAcrossNodes.animateAddNode(nodeToAnimate);

        // create css

        let cssUpdater = new CssUpdater(this.tree, stepAnimations.flat());

        cssUpdater.createOrUpdateCssEntityAddNode();

        // create html

        let lastStepIndex = stepAnimations.flat().length - 1;
        let lastStep = stepAnimations.flat()[lastStepIndex].stepAnimationObject;

        let htmlElementContainerClient = new HtmlElementContainerClient(lastStep,
            new HtmlAddNodeBuilder(lastStep, patternStepAnimationArrayOperation));

        htmlElementContainerClient.createHtmlElementContainer(lastStep.htmlGlowingMovingUpLineContainer);

        let htmlElementContainerParts = htmlElementContainerClient.getHtmlElementContainerParts();

        // Add AppliedNodeStyles

        let nodeState = lastStep.nodesInfoStepAnimation.nodeState;
        nodeToAnimate.appliedNodeStyles.addAppliedNodeStyles(nodeToAnimate, nodeState);


        return stepAnimations.flat();
    }


    createSequenceStepsAlignNodeByWidth(nodeToAnimate, patternStepAnimationArrayOperation)
    {
        let animationMovingAcrossNodes = new AnimationMovingAcrossNodes(this.tree, patternStepAnimationArrayOperation, new TreeStepAnimationChooserAlignNodeByWidth());

        let stepAnimations = animationMovingAcrossNodes.animateAlignNode(nodeToAnimate);

        // create or update css

        let cssUpdater = new CssUpdater(this.tree, stepAnimations.flat());
        cssUpdater.createOrUpdateCssEntityAlignNodeByWidth();

        // update html
        let lastStepIndex = stepAnimations.flat().length - 1;
        let lastStep = stepAnimations.flat()[lastStepIndex].stepAnimationObject;

        //let htmlElementContainerClient = new HtmlElementContainerClient(lastStep,
        //    new HtmlUpdateNodeBuilder(lastStep, patternStepAnimationArrayOperation));

        // htmlElementContainerClient.updateHtmlElementContainer("superContainer");

        // Add AppliedNodeStyles

        let nodeState = lastStep.nodesInfoStepAnimation.nodeState;
        //nodeToAnimate.appliedNodeStyles.addAppliedNodeStyles(nodeToAnimate, "alignNode");
        nodeToAnimate.appliedNodeStyles.addAppliedNodeStyles(nodeToAnimate, nodeState);

        return this.getSequenceSteps();
    }


    createSequenceStepsClickNode(nodeToAnimate, relativeNodeToAnimateAccross, patternStepAnimationArrayOperation)
    {
        let animationMovingAcrossNodes = new AnimationMovingAcrossNodes(this.tree, patternStepAnimationArrayOperation, new TreeStepAnimationChooserClickNode());

        let stepAnimations = animationMovingAcrossNodes.animateClickNode(nodeToAnimate, relativeNodeToAnimateAccross);

        // create or update css

        let cssUpdater = new CssUpdater(this.tree, stepAnimations.flat());
        cssUpdater.createOrUpdateCssEntityClickNode(); // ?????????????????????????

        // update html // ??????????????????? no needed
        //let lastStepIndex = stepAnimations.flat().length - 1;
        //let lastStep = stepAnimations.flat()[lastStepIndex].stepAnimationObject;

        //let htmlElementContainerClient = new HtmlElementContainerClient(lastStep,
        //    new HtmlUpdateNodeBuilder(lastStep, patternStepAnimationArrayOperation));

        //htmlElementContainerClient.updateHtmlElementContainer("superContainer");

        // Add AppliedNodeStyles in applyAdditionalStyleClasses(node, additionalStyleClasses, operation)
        //nodeToAnimate.appliedNodeStyles.addAppliedNodeStyles(nodeToAnimate, "clickNode");

        let domUpdater = new DomUpdater();

        let lastStepIndex = stepAnimations.flat().length - 1;
        let lastStep = stepAnimations.flat()[lastStepIndex].stepAnimationObject;

        let nodeState = lastStep.additionalStyleClasses
            .filter(additionalStyleClass => additionalStyleClass.nodeIsLeftChild === nodeToAnimate.isLeftChild)[0].nodeState;

        //domUpdater.applyAdditionalStyleClasses(nodeToAnimate, lastStep.additionalStyleClasses, "clickNode");
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

        // create css

        let cssUpdater = new CssUpdater(this.tree, stepAnimations.flat());

        cssUpdater.createOrUpdateCssEntityFindNode();

        // create html

        let lastStepIndex = stepAnimations.flat().length - 1;
        let lastStep = stepAnimations.flat()[lastStepIndex].stepAnimationObject;

        let htmlElementContainerClient = new HtmlElementContainerClient(lastStep,
            new HtmlFindNodeBuilder(lastStep, patternStepAnimationArrayOperation));

        htmlElementContainerClient.createHtmlElementContainer(lastStep.htmlGlowingMovingUpLineContainer);

        let htmlElementContainerParts = htmlElementContainerClient.getHtmlElementContainerParts();

        // Add AppliedNodeStyles in glowBorderAfterNodeFound


        return stepAnimations.flat();
    }


    createSequenceStepsFindSuccessorNode(nodeToDelete, patternStepAnimationArrayOperation, nodeFinder)
    {
        let animationMovingAcrossNodes = new AnimationMovingAcrossNodes(this.tree, patternStepAnimationArrayOperation, new TreeStepAnimationChooserFindSuccessorNode(nodeToDelete));

        //let controlHandlers = new ControlHandlersAVLTree(); /// ????????????????

        //let nodeFinder = controlHandlers.initializeNodeFinderSuccessor(nodeToDelete, patternStepAnimationArrayOperation);


        let stepAnimations = animationMovingAcrossNodes.animateFindSuccessorNode(nodeToDelete, nodeFinder);

        // create css

        let cssUpdater = new CssUpdater(this.tree, stepAnimations.flat());

        cssUpdater.createOrUpdateCssEntityFindNode();

        // create html

        let lastStepIndex = stepAnimations.flat().length - 1;
        let lastStep = stepAnimations.flat()[lastStepIndex].stepAnimationObject;

        let htmlElementContainerClient = new HtmlElementContainerClient(lastStep,
            new HtmlFindNodeBuilder(lastStep, patternStepAnimationArrayOperation));

        htmlElementContainerClient.createHtmlElementContainer(lastStep.htmlGlowingMovingUpLineContainer);

        let htmlElementContainerParts = htmlElementContainerClient.getHtmlElementContainerParts();

        // Add AppliedNodeStyles in glowBorderAfterNodeFound


        return stepAnimations.flat();
    }


    createSequenceStepsLinkNodeAction(nodeToAnimateLinkAction, patternStepAnimationArrayOperation, isHideLink)
    {
        let animationMovingAcrossNodes = new AnimationMovingAcrossNodes(this.tree, patternStepAnimationArrayOperation, new TreeStepAnimationChooserLinkNodeAction(isHideLink));

        let stepAnimations = animationMovingAcrossNodes.animateLinkNodeAction(nodeToAnimateLinkAction);

        // update html

        let lastStepIndex = stepAnimations.flat().length - 1;
        let lastStep = stepAnimations.flat()[lastStepIndex].stepAnimationObject;

        if (!isHideLink)
        {
            this.updateHtmlLinkContainerLinkNodeAction(lastStep);
        }


        // create css

        let cssUpdater = new CssUpdater(this.tree, stepAnimations.flat());

        cssUpdater.createOrUpdateCssEntityLinkNodeAction();




        // Add AppliedNodeStyles in glowBorderAfterNodeFound




        // Add custom event


        //let customEventHandler = new CustomEventHandler();

        //if (!nodeToAnimateLinkAction.parent)
        //{
        //    let eventName = isHideLink ? "linkErasedBeforeAlignmentByHeight" : "linkDrawnAfterAlignmentByHeight"; // !!!!!!!!!!!!!!!!!! Replace hardcode !!!!!!!!!!!

        //    // !!!!!!!!!!!!!!!!!! Replace hardcode !!!!!!!!!!!
        //    let linkEvent = customEventHandler.createCustomEvent(eventName);

        //    customEventHandler.dispatchCustomEvent(linkEvent, nodeToAnimateLinkAction, "superContainer");
        //}


        return stepAnimations.flat();
    }


    // private (for createSequenceStepsLinkNodeAction(...) )
    updateHtmlLinkContainerLinkNodeAction(stepAnimation)
    {
        if (!stepAnimation.nodesInfoStepAnimation.patternStepName.includes("draw"))
        {
            return;
        }

        // DRY: use method below updateHtmlLinkContainer(stepAnimation) instead of codehere below

        let linkContainerElement = stepAnimation.htmlLinkContainer[0];
        let correctStyleClassLinkContainer = linkContainerElement.styleClassToApply.substring(1);
        let elementNameLinkContainer = linkContainerElement.elementName;

        // domUpdater - is not present in other classes
        let domUpdater = new DomUpdater();

        let nodeToAnimate = stepAnimation.nodesInfoStepAnimation.nodeToAnimate;
        let currentClassNameOfLinkContainer = domUpdater.getAttributeDomElement(nodeToAnimate, elementNameLinkContainer, "class");

        if (nodeToAnimate.isLeftChild !== null && currentClassNameOfLinkContainer !== correctStyleClassLinkContainer)
        {
            domUpdater.updateStyleClass(nodeToAnimate, elementNameLinkContainer, correctStyleClassLinkContainer)
        }

        if (nodeToAnimate.isLeftChild === null)
        {
            domUpdater.updateStyleClass(nodeToAnimate, elementNameLinkContainer, "");// when any node will be with html related to link container
        }
    }


    // Balancing
    updateHtmlLinkContainerBalancing(nodeToUnfadeLinkContainer)
    {
        let correctStyleClassLinkContainer = "";
        let elementNameLinkContainer = "linkContainer";

        // domUpdater - is not present in other classes ???????????????
        let domUpdater = new DomUpdater();

        if (nodeToUnfadeLinkContainer.isLeftChild !== null)
        {
            nodeToUnfadeLinkContainer.isLeftChild ? correctStyleClassLinkContainer = "leftLinkContainer" : correctStyleClassLinkContainer = "rightLinkContainer";
        }

        domUpdater.updateStyleClass(nodeToUnfadeLinkContainer, elementNameLinkContainer, correctStyleClassLinkContainer); // when any node will be with html related to link container

        //// set correct class to elementName: "glowingMovingUpLineContainer" (if node is not root, but was root)

        let elementNameGlowingMovingUpLineContainer = "glowingMovingUpLineContainer";

        if (nodeToUnfadeLinkContainer.isLeftChild === null)
        {
            domUpdater.updateStyleClass(nodeToUnfadeLinkContainer, elementNameGlowingMovingUpLineContainer, ""); // (for node that was not root, but after balancing became root) It for correct showing glowingMovingLine
        }
    }


    // Heap
    updateHtmlLinkContainerSwapNodes(nodeToUpdateLinkContainer)
    {
        let correctStyleClassLinkContainer = "";
        let elementNameLinkContainer = "linkContainer";

        // domUpdater - is not present in other classes ???????????????
        let domUpdater = new DomUpdater();

        if (nodeToUpdateLinkContainer.isLeftChild !== null)
        {
            nodeToUpdateLinkContainer.isLeftChild ? correctStyleClassLinkContainer = "leftLinkContainer" : correctStyleClassLinkContainer = "rightLinkContainer";
        }

        domUpdater.updateStyleClass(nodeToUpdateLinkContainer, elementNameLinkContainer, correctStyleClassLinkContainer); // when any node will be with html related to link container

        //// set correct class to elementName: "glowingMovingUpLineContainer" (if node is not root, but was root)

        let elementNameGlowingMovingUpLineContainer = "glowingMovingUpLineContainer";

        if (nodeToUpdateLinkContainer.isLeftChild === null)
        {
            domUpdater.updateStyleClass(nodeToUpdateLinkContainer, elementNameGlowingMovingUpLineContainer, ""); // (for node that was not root, but after balancing became root) It for correct showing glowingMovingLine
        }
    }


    // updateHtmlLinkContainer for successor node, which became a root after alignment by height
    updateHtmlLinkContainerAlignByHeight(nodeToAlignByHeight)
    {
        if (nodeToAlignByHeight.isLeftChild !== null)
        {
            return;
        }

        // if nodeToAlignByHeight is successor, which became a root

        let correctStyleClassLinkContainer = "";
        let elementNameLinkContainer = "linkContainer";

        let domUpdater = new DomUpdater();

        domUpdater.updateStyleClass(nodeToAlignByHeight, elementNameLinkContainer, correctStyleClassLinkContainer); // when any node will be with html related to link container


        //// set correct class to elementName: "glowingMovingUpLineContainer" (if node is not root, but was root)

        let elementNameGlowingMovingUpLineContainer = "glowingMovingUpLineContainer";

        domUpdater.updateStyleClass(nodeToAlignByHeight, elementNameGlowingMovingUpLineContainer, ""); // For successor node that after alignment by height became root. It is for correct showing glowingMovingLine

    }


    // private
    updateHtmlLinkContainer(stepAnimation)
    {
        let linkContainerElement = stepAnimation.htmlLinkContainer[0];
        let correctStyleClassLinkContainer = linkContainerElement.styleClassToApply.substring(1);
        let elementNameLinkContainer = linkContainerElement.elementName;

        // domUpdater - is not present in other classes
        let domUpdater = new DomUpdater();

        let nodeToAnimate = stepAnimation.nodesInfoStepAnimation.nodeToAnimate;
        let currentClassNameOfLinkContainer = domUpdater.getAttributeDomElement(nodeToAnimate, elementNameLinkContainer, "class");

        if (nodeToAnimate.isLeftChild !== null && currentClassNameOfLinkContainer !== correctStyleClassLinkContainer)
        {
            domUpdater.updateStyleClass(nodeToAnimate, elementNameLinkContainer, correctStyleClassLinkContainer)
        }

        if (nodeToAnimate.isLeftChild === null)
        {
            domUpdater.updateStyleClass(nodeToAnimate, elementNameLinkContainer, "");// when any node will be with html related to link container
        }
    }


    createSequenceStepsAlignNodeByHeight(nodeToAnimate, patternStepAnimationArrayOperation)
    {
        let animationMovingAcrossNodes = new AnimationMovingAcrossNodes(this.tree, patternStepAnimationArrayOperation, new TreeStepAnimationChooserAlignNodeByHeight());

        let stepAnimations = animationMovingAcrossNodes.animateAlignNode(nodeToAnimate);

        // create or update css

        let cssUpdater = new CssUpdater(this.tree, stepAnimations.flat());
        cssUpdater.createOrUpdateCssEntityAlignNodeByHeight();

        // update html
        let lastStepIndex = stepAnimations.flat().length - 1;
        let lastStep = stepAnimations.flat()[lastStepIndex].stepAnimationObject;

        //let htmlElementContainerClient = new HtmlElementContainerClient(lastStep,
        //    new HtmlAlignByHeightNodeBuilder(lastStep, patternStepAnimationArrayOperation));

        // htmlElementContainerClient.updateHtmlElementContainer("superContainer");

        // Add AppliedNodeStyles

        let nodeState = lastStep.nodesInfoStepAnimation.nodeState;

        nodeToAnimate.appliedNodeStyles.addAppliedNodeStyles(nodeToAnimate, nodeState);

        return stepAnimations.flat();
    }


    // For balancing
    createSequenceStepsNodeBalanced(nodeToBalance, patternStepAnimationArrayOperation)
    {
        let animationMovingAcrossNodes = new AnimationMovingAcrossNodes(this.tree, patternStepAnimationArrayOperation, new TreeStepAnimationChooserNodeBalancing());

        let stepAnimations = animationMovingAcrossNodes.animateAlignNode(nodeToBalance);

        // create or update css

        let cssUpdater = new CssUpdater(this.tree, stepAnimations.flat());
        cssUpdater.createOrUpdateCssEntityBalancing();

        // update html
        let lastStepIndex = stepAnimations.flat().length - 1;
        let lastStep = stepAnimations.flat()[lastStepIndex].stepAnimationObject;


        // ???????? node should be updatet with a new container for line link (implemented in alignment by height)
        //let htmlElementContainerClient = new HtmlElementContainerClient(lastStep,
        //    new HtmlUpdateNodeBuilder(lastStep, patternStepAnimationArrayOperation));

        // htmlElementContainerClient.updateHtmlElementContainer("superContainer");

        // Add AppliedNodeStyles

        let nodeState = lastStep.nodesInfoStepAnimation.nodeState;
        nodeToBalance.appliedNodeStyles.addAppliedNodeStyles(nodeToBalance, nodeState);

        return this.getSequenceSteps();
    }


    // For balancing
    createSequenceStepsLinkBeforeAfterBalancing(nodeToAnimateLink, patternStepAnimationLinkBeforeAfterBalancing, isHideLink)
    {
        let animationMovingAcrossNodes = new AnimationMovingAcrossNodes(this.tree, patternStepAnimationLinkBeforeAfterBalancing, new TreeStepAnimationChooserLinkBeforeAfterBalancing(isHideLink));

        let stepAnimations = animationMovingAcrossNodes.animateLinkNodeAction(nodeToAnimateLink);

        // update html

        let lastStepIndex = stepAnimations.flat().length - 1;
        let lastStep = stepAnimations.flat()[lastStepIndex].stepAnimationObject;

        //if (!isHideLink)
        //{
        //    this.updateHtmlLinkContainerLinkNodeAction(lastStep);
        //}


        // create css

        let cssUpdater = new CssUpdater(this.tree, stepAnimations.flat());

        cssUpdater.createOrUpdateCssEntityLinkBeforeAfterBalancing();




        // Add AppliedNodeStyles in glowBorderAfterNodeFound




        // Add custom event


        //let customEventHandler = new CustomEventHandler();

        //if (!nodeToAnimateLinkAction.parent)
        //{
        //    let eventName = isHideLink ? "linkErasedBeforeAlignmentByHeight" : "linkDrawnAfterAlignmentByHeight"; // !!!!!!!!!!!!!!!!!! Replace hardcode !!!!!!!!!!!

        //    // !!!!!!!!!!!!!!!!!! Replace hardcode !!!!!!!!!!!
        //    let linkEvent = customEventHandler.createCustomEvent(eventName);

        //    customEventHandler.dispatchCustomEvent(linkEvent, nodeToAnimateLinkAction, "superContainer");
        //}


        return stepAnimations.flat();
    }


    // Traversing
    createSequenceStepsTraversingNode(nodeVisistor, startNode, traversingTreeOperationInstance, patternStepAnimationArrayOperation)
    {
        let animationMovingAcrossNodes = new AnimationMovingAcrossNodes(this.tree, patternStepAnimationArrayOperation, new TreeStepAnimationChooserTraversingNode());

        // startNode is a node to begin traversing tree
        let stepAnimations = animationMovingAcrossNodes.animateTraversingNode(nodeVisistor, startNode, traversingTreeOperationInstance);

        // create css

        let cssUpdater = new CssUpdater(this.tree, stepAnimations.flat());

        cssUpdater.createOrUpdateCssEntityTraversingNode();

        // create html

        let lastStepIndex = stepAnimations.flat().length - 1;
        let lastStep = stepAnimations.flat()[lastStepIndex].stepAnimationObject;

        let htmlElementContainerClient = new HtmlElementContainerClient(lastStep,
            new HtmlTraversingNodeBuilder(lastStep, patternStepAnimationArrayOperation));

        htmlElementContainerClient.createHtmlElementContainer();

        let htmlElementContainerParts = htmlElementContainerClient.getHtmlElementContainerParts();

        // Add AppliedNodeStyles in glowBorderAfterNodeFound


        return stepAnimations.flat();
    }


    createSequenceStepsAddRangeOfNodes(nodeToAnimate, patternStepAnimationArrayOperation)
    {
        let animationMovingAcrossNodes = new AnimationMovingAcrossNodes(this.tree, patternStepAnimationArrayOperation, new TreeStepAnimationChooserAddRangeOfNodes());

        let stepAnimations = animationMovingAcrossNodes.animateAlignNode(nodeToAnimate);

        // create or update css

        let cssUpdater = new CssUpdater(this.tree, stepAnimations.flat());
        cssUpdater.createOrUpdateCssEntityAddRangeOfNodes();

        // create html

        let lastStepIndex = stepAnimations.flat().length - 1;
        let lastStep = stepAnimations.flat()[lastStepIndex].stepAnimationObject;

        let htmlElementContainerClient = new HtmlElementContainerClient(lastStep,
            new HtmlAddNodeBuilder(lastStep, patternStepAnimationArrayOperation));

        htmlElementContainerClient.createHtmlElementContainer(lastStep.htmlGlowingMovingUpLineContainer);

        let htmlElementContainerParts = htmlElementContainerClient.getHtmlElementContainerParts();


        // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
        // TO DO: Add nodeState to patternStepAnimationArrayAddRangeOfNodes
        // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

        let nodeState = lastStep.nodesInfoStepAnimation.nodeState;
        nodeToAnimate.appliedNodeStyles.addAppliedNodeStyles(nodeToAnimate, nodeState);

        return stepAnimations.flat();
    }


    // Heap
    createSequenceStepsSwapNodes(nodeToSwap, relativeNodeToPlaceOnItPreviousPlace, patternStepAnimationArrayOperation)
    {
        let animationMovingAcrossNodes = new AnimationMovingAcrossNodes(this.tree, patternStepAnimationArrayOperation, new TreeStepAnimationChooserSwapNode());

        // node relativeNodeToPlaceOnItPreviousPlace uses only for names in keyframes to specify nodeIds (order numbers) to swap
        let stepAnimations = animationMovingAcrossNodes.animateSwapNode(nodeToSwap, relativeNodeToPlaceOnItPreviousPlace);

        // create or update css

        let cssUpdater = new CssUpdater(this.tree, stepAnimations.flat());
        cssUpdater.createOrUpdateCssEntitySwapNode();

        // update html
        let lastStepIndex = stepAnimations.flat().length - 1;
        let lastStep = stepAnimations.flat()[lastStepIndex].stepAnimationObject;

        //let htmlElementContainerClient = new HtmlElementContainerClient(lastStep,
        //    new HtmlAlignByHeightNodeBuilder(lastStep, patternStepAnimationArrayOperation));

        // htmlElementContainerClient.updateHtmlElementContainer("superContainer");

        // Add AppliedNodeStyles

        let nodeState = lastStep.nodesInfoStepAnimation.nodeState;

        nodeToSwap.appliedNodeStyles.addAppliedNodeStyles(nodeToSwap, nodeState);

        return stepAnimations.flat();
    }


    // Heap
    createSequenceStepsLinkBeforeAfterSwapNodes(nodeToAnimateLink, patternStepAnimationLinkBeforeAfterSwapNodes, isHideLink)
    {
        let animationMovingAcrossNodes = new AnimationMovingAcrossNodes(this.tree, patternStepAnimationLinkBeforeAfterSwapNodes, new TreeStepAnimationChooserLinkBeforeAfterSwapNodes(isHideLink));

        let stepAnimations = animationMovingAcrossNodes.animateLinkNodeAction(nodeToAnimateLink);

        // update html

        let lastStepIndex = stepAnimations.flat().length - 1;
        let lastStep = stepAnimations.flat()[lastStepIndex].stepAnimationObject;

        //if (!isHideLink)
        //{
        //    this.updateHtmlLinkContainerLinkNodeAction(lastStep);
        //}


        // create css

        let cssUpdater = new CssUpdater(this.tree, stepAnimations.flat());

        cssUpdater.createOrUpdateCssEntityLinkBeforeAfterSwapNodes();




        // Add AppliedNodeStyles in glowBorderAfterNodeFound




        // Add custom event


        //let customEventHandler = new CustomEventHandler();

        //if (!nodeToAnimateLinkAction.parent)
        //{
        //    let eventName = isHideLink ? "linkErasedBeforeAlignmentByHeight" : "linkDrawnAfterAlignmentByHeight"; // !!!!!!!!!!!!!!!!!! Replace hardcode !!!!!!!!!!!

        //    // !!!!!!!!!!!!!!!!!! Replace hardcode !!!!!!!!!!!
        //    let linkEvent = customEventHandler.createCustomEvent(eventName);

        //    customEventHandler.dispatchCustomEvent(linkEvent, nodeToAnimateLinkAction, "superContainer");
        //}


        return stepAnimations.flat();
    }

}