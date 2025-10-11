import { DomUpdater } from '../HtmlDomElementHandler/DomUpdater.js';
import { CustomEventHandlerHtmlTable } from './CustomEventHandlerHtmlTable.js';

export class CustomEventHandler
{
    constructor(tree)
    {
        this.tree = tree;
        this.domUpdater = new DomUpdater();
    }


    createCustomEvent(eventName, nodeWhereFiredEvent) // elementNameOfNode - is value of attribute data-element-name in html
    {
        if (!eventName || eventName === "")
        {
            throw new Error(`Unable to create custom event. Name of event is incorrect`);
        }

        const eventDetails = {

            customEventName: eventName,
            nodeWhereFiredEvent: nodeWhereFiredEvent
        };

        const event = new CustomEvent(eventName, { detail: eventDetails });

        return event;
    }


    dispatchCustomEvent(eventName, node, elementNameOfNode)
    {
        if (this.domUpdater.isExistDomElement(node, elementNameOfNode))
        {
            let domElement = this.domUpdater.getDomElement(node, elementNameOfNode);
            domElement.dispatchEvent(eventName);
        }
    }


    // is needed????
    // fires when node is found but its link have not started to hide yet
    dispatchNodeFound(elementNameToFire, nodeWhichWasFound)
    {
        //if (!animationEndName.includes("_Find_"))
        //{
        //    return;
        //}

        // !!!!!!!!!!!!!!!!!! Replace hardcode !!!!!!!!!!!
        let customEventName = "findigNodeEnd";  // relocation (moving) of successor node is ended but link have not drawn yet

        let linkEvent = this.createCustomEvent(customEventName, nodeWhichWasFound);

        this.dispatchCustomEvent(linkEvent, nodeWhichWasFound, elementNameToFire);
    }


    // split on 2 methods
    dispatchLinkDrawnErasedBeforeAfterAlignmentByHeight(animationEndName, elementNameToFire, nodeContainedLink) // elementNameToFire - value of attribute data-element-name in HTML
    {
        let customEventName = ""; // !!!!!!!!!!!!!!!!!! Replace hardcode !!!!!!!!!!!

        if (animationEndName.includes("svgDrawLine"))
        {
            let lastAnimationName = this.domUpdater.getLastAnimationName(nodeContainedLink, "superContainer");

            //if (!lastAnimationName.includes("Align_by_height"))
            //{
            //    return;
            //}

            // ???????????
            if (!lastAnimationName.includes("moveNodeOwnPosition_Align_by_height"))
            {
                return;
            }

            customEventName = "linkDrawnAfterAlignmentByHeight"; // === AlignmentByHeight is ended
        }
        else if (animationEndName.includes("svgEraseLine"))
        {
            customEventName = "linkErasedBeforeAlignmentByHeight";
        }
        else
        {
            return;
        }

        // !!!!!!!!!!!!!!!!!! Replace hardcode !!!!!!!!!!!
        let linkEvent = this.createCustomEvent(customEventName, nodeContainedLink);

        this.dispatchCustomEvent(linkEvent, nodeContainedLink, elementNameToFire); // elementNameToFire = "superContainer"
    }


    // ??????????????
    // SVG line link container finished to drew after alignment by height
    // to replace dispatchLinkDrawnErasedBeforeAfterAlignmentByHeight
    dispatchSVGLinkDrawnAfterAlignmentByHeight(animationEndName, elementNameToFire, nodeContainedLink) // elementNameToFire - value of attribute data-element-name in HTML
    {
        let customEventName = "linkDrawnAfterAlignmentByHeight"; // === AlignmentByHeight is ended

        if (!animationEndName.includes("svgDrawLine"))
        {
            return;
        }

        let lastAnimationName = this.domUpdater.getLastAnimationName(nodeContainedLink, "superContainer");

        if (!lastAnimationName.includes("moveNodeOwnPosition_Align_by_height"))
        {
            return;
        }

        // !!!!!!!!!!!!!!!!!! Replace hardcode !!!!!!!!!!!
        let linkEvent = this.createCustomEvent(customEventName, nodeContainedLink);

        this.dispatchCustomEvent(linkEvent, nodeContainedLink, elementNameToFire); // elementNameToFire = "superContainer"
    }


    // ??????????????
    // SVG line link container finished to drew after alignment by height
    // to replace dispatchLinkDrawnErasedBeforeAfterAlignmentByHeight
    dispatchSVGLinkErasedBeforeAlignmentByHeight(animationEndName, elementNameToFire, nodeContainedLink) // elementNameToFire - value of attribute data-element-name in HTML
    {
        let customEventName = "linkErasedBeforeAlignmentByHeight";

        if (!animationEndName.includes("svgEraseLine"))
        {
            return;
        }

        let linkEvent = this.createCustomEvent(customEventName, nodeContainedLink);

        this.dispatchCustomEvent(linkEvent, nodeContainedLink, elementNameToFire); // elementNameToFire = "superContainer"
    }


    // relocation(moving) of successor node on place of nodeToDelete is ended but node link have not drawn yet
    dispatchNodeAlignedByHeight(animationEndName, elementNameToFire, node) // elementNameToFire - value of attribute data-element-name in HTML
    {
        // add the case when successor is null (deleting node without children)

        //if (!animationEndName.includes("Align_by_height"))
        //{
        //    return;
        //}

        // ??????
        if (!animationEndName.includes("moveNodeOwnPosition_Align_by_height"))
        {
            return;
        }

        if (node.isLeftChild !== null)
        {
            // REMOVE HARDCODE!!!!!!!!!!
            let superContainerName = "superContainer";
            let domElementNodeToRelocate = this.domUpdater.getDomElement(node, superContainerName);

            let animationSvgLineLink = window.getComputedStyle(domElementNodeToRelocate).getPropertyValue("--animationSvgLineLink");

            if (!animationSvgLineLink.includes("svgEraseLine")) // TO DO ???????: compare animationSvgLineLink with value keyframesPrototypeSvgLineLink in step animation (it does not contain here) to avoid hardcode
            {
                return;
            }
        }

        // !!!!!!!!!!!!!!!!!! Replace hardcode !!!!!!!!!!!
        let customEventName = "alignedByHeight";  // relocation (moving) of successor node is ended but link have not drawn yet

        // !!!!!!!!!!!!!!!!!! Replace hardcode !!!!!!!!!!!
        let linkEvent = this.createCustomEvent(customEventName, node);

        this.dispatchCustomEvent(linkEvent, node, elementNameToFire); // elementNameToFire = "superContainer"
    }


    //??? For balancing (after dispatching an event "alignedByWidth", balancing is started).
    // Fired only one time on added node
    dispatchNodeAlignedByWidth(animationEndName, elementNameToFire, node) // elementNameToFire - value of attribute data-element-name in HTML
    {
        //// fire only on root
        if (node.parentNode || !animationEndName.includes("moveNodeOwnPosition_Align_By_Width_")) // moveNodeOwnPosition_
        {
            return;
        }

        let customEventName = "alignedByWidth"; // !!!!!!!!!!!!!!!!!! Replace hardcode !!!!!!!!!!!

        // !!!!!!!!!!!!!!!!!! Replace hardcode !!!!!!!!!!!
        let linkEvent = this.createCustomEvent(customEventName, node);

        this.dispatchCustomEvent(linkEvent, node, elementNameToFire); // elementNameToFire = "superContainer"
    }


    // Fired only one time on added node. Mostly duplication of dispatchNodeAlignedByWidth(...), except if
    dispatchNodeAlignedByWidthWithoutAlignment(elementNameToFire, node) // elementNameToFire - value of attribute data-element-name in HTML
    {
        // fire only on root
        if (node.parentNode)
        {
            return;
        }

        let customEventName = "alignedByWidth"; // !!!!!!!!!!!!!!!!!! Replace hardcode !!!!!!!!!!!

        // !!!!!!!!!!!!!!!!!! Replace hardcode !!!!!!!!!!!
        let linkEvent = this.createCustomEvent(customEventName, node);

        this.dispatchCustomEvent(linkEvent, node, elementNameToFire); // elementNameToFire = "superContainer"
    }


    dispatchNodeAdded(animationEndName, elementNameToFire, nodeAdded) // elementNameToFire - value of attribute data-element-name in HTML
    {
        // !!!!!!!!!!!!!!!!!! Replace hardcode !!!!!!!!!!!

        let customEventName = "nodeAdded";

        //let superContainerName = "superContainer";
        //let lastAnimationName = this.domUpdater.getLastAnimationName(nodeAdded, superContainerName);

        let animationNameToFind = nodeAdded.isLeftChild === null ? `moveNodeOwnPosition_${nodeAdded.nodeId}` : `moveDrawLineNode_${nodeAdded.nodeId}`;

        if (!animationEndName.includes(animationNameToFind))
        {
            return;
        }

        let linkEvent = this.createCustomEvent(customEventName, nodeAdded);

        this.dispatchCustomEvent(linkEvent, nodeAdded, elementNameToFire); // elementNameToFire = "superContainer"
    }


    // It should fire after link drawn (after relocation)
    // It should be fired on successor (if it present or on parent of deleted node, if successor = null)
    dispatchNodeDeleted(nodeToFire) // elementNameToFire - value of attribute data-element-name in HTML
    {
        let customEventName = "nodeDeleted"; // !!!!!!!!!!!!!!!!!! Replace hardcode !!!!!!!!!!!
        let superContainerName = "superContainer";

        let linkEvent = this.createCustomEvent(customEventName, nodeToFire);

        this.dispatchCustomEvent(linkEvent, nodeToFire, superContainerName); // elementNameToFire = "superContainer"
    }


    // For balancing
    // dispatch event after ending of moving node during balancing
    dispatchBalanceMovingNodeEnded(animationEndName, elementNameToFire, nodeToAnimate) // elementNameToFire "linkContainer" - value of attribute data-element-name in HTML
    {
        if (!animationEndName.includes("moveNodeOwnPosition_Balancing_")) // moveNodeOwnPosition_
        {
            return;
        }

        let customEventName = "balanceMovingNodeEnded"; // !!!!!!!!!!!!!!!!!! Replace hardcode !!!!!!!!!!!

        let linkEvent = this.createCustomEvent(customEventName, nodeToAnimate);

        this.dispatchCustomEvent(linkEvent, nodeToAnimate, elementNameToFire); // elementNameToFire = "linkContainer"
    }


    // For balancing
    dispatchLinkHiddenBeforeBalancing(animationEndName, elementNameToFire, nodeToAnimate) // elementNameToFire "linkContainer" - value of attribute data-element-name in HTML
    {
        if (!animationEndName.includes("svgLineHideBeforeBalancing"))
        {
            return;
        }

        this.tree.isLinkContainerShown = false; // ????????????

        let customEventName = "linkHiddenBeforeBalancing"; // !!!!!!!!!!!!!!!!!! Replace hardcode !!!!!!!!!!!

        let linkEvent = this.createCustomEvent(customEventName, nodeToAnimate);

        this.dispatchCustomEvent(linkEvent, nodeToAnimate, elementNameToFire); // elementNameToFire = "linkContainer"
    }


    // For balancing
    dispatchLinkShowAfterBalancing(animationEndName, elementNameToFire, nodeToAnimate) // elementNameToFire "linkContainer" - value of attribute data-element-name in HTML
    {
        if (!animationEndName.includes("svgLineShowAfterLinkContainerFade"))
        {
            return;
        }

        this.tree.isLinkContainerShown = true; // ????????????

        let customEventName = "linkShownAfterBalancing"; // !!!!!!!!!!!!!!!!!! Replace hardcode !!!!!!!!!!!

        let linkEvent = this.createCustomEvent(customEventName, nodeToAnimate);

        this.dispatchCustomEvent(linkEvent, nodeToAnimate, elementNameToFire); // elementNameToFire = "linkContainer"
    }


    // DO NOT DELETE COMMENT:
    // dispatch event about last traversed node before traversing ended
    // Fired when node with particular value was found during traversing (case for Heap: node to delete and last bottom node if they are different nodes)
    // event "lastNodeBeforeEndingTraversing" fired on the last node of conditional traversing (if node not found, event fired on root)
    // if node not found then event "lastNodeBeforeEndingTraversing" handled on root, because root is a node that always the last in conditional traversing when value is not found
    dispatchLastNodeBeforeEndingTraversing(lastNodeBeforeEndingTraversing) // elementNameToFire - value of attribute data-element-name in HTML
    {
        let customEventName = "lastNodeBeforeEndingTraversing"; // !!!!!!!!!!!!!!!!!! Replace hardcode !!!!!!!!!!!
        let superContainerName = "superContainer";

        let linkEvent = this.createCustomEvent(customEventName, lastNodeBeforeEndingTraversing);

        this.dispatchCustomEvent(linkEvent, lastNodeBeforeEndingTraversing, superContainerName); // elementNameToFire = "superContainer"
    }


    // RBT
    dispatchStepFixingAdditionNodeEnded(elementNameToFire, nodeToAnimate)
    {
        let customEventName = "stepFixingAdditionNodeEnded"; // !!!!!!!!!!!!!!!!!! Replace hardcode !!!!!!!!!!!

        let linkEvent = this.createCustomEvent(customEventName, nodeToAnimate);

        this.dispatchCustomEvent(linkEvent, nodeToAnimate, elementNameToFire); // elementNameToFire = "superContainer"
    }


    //???
    // RBT
    // Uses after range of nodes was added. Event should be fired only once on the last node from range of nodes to add
    // Uses as part of measures to avoid firing unwanted events after addition range of nodes (instead setTimeout)
    dispatchTreePropertiesCompliedAfterAdditionRangeOfNodes(elementNameToFire, nodeToAnimate)
    {
        let customEventName = "treePropertiesCompliedAfterAdditionRangeOfNodes"; // !!!!!!!!!!!!!!!!!! Replace hardcode !!!!!!!!!!!

        let linkEvent = this.createCustomEvent(customEventName, nodeToAnimate);

        this.dispatchCustomEvent(linkEvent, nodeToAnimate, elementNameToFire); // elementNameToFire = "superContainer"
    }


    // RBT
    // dispatch event on SVG where will be need to be rotation
    dispatchLinkHiddenBeforeRotation(animationEndName, elementNameToFire, nodeToAnimate) // elementNameToFire "linkContainer" - value of attribute data-element-name in HTML
    {
        if (!nodeToAnimate.isNodeToBeRotatedWithAncestors)
        {
            return;
        }

        if (!animationEndName.includes("svgLineHideBeforeBalancing"))
        {
            return;
        }

        this.tree.isLinkContainerShown = false; // ????????????

        let customEventName = "linkHiddenBeforeBalancing"; // !!!!!!!!!!!!!!!!!! Replace hardcode !!!!!!!!!!!

        let linkEvent = this.createCustomEvent(customEventName, nodeToAnimate);

        this.dispatchCustomEvent(linkEvent, nodeToAnimate, elementNameToFire); // elementNameToFire = "linkContainer"
    }


    // RBT
    // event fired only on the first node that in list of nodes to recolor this.tree.nodesToRecolor
    dispatchLinkShowAfterRotation(animationEndName, elementNameToFire, nodeToAnimate) // elementNameToFire "linkContainer" - value of attribute data-element-name in HTML
    {
        if (!animationEndName.includes("svgLineShowAfterLinkContainerFade"))
        {
            return;
        }

        this.tree.isLinkContainerShown = true; // ????????????

        let customEventName = "linkShownAfterRotation"; // was let customEventName = "linkShownAfterBalancing"; // !!!!!!!!!!!!!!!!!! Replace hardcode !!!!!!!!!!!

        let linkEvent = this.createCustomEvent(customEventName, nodeToAnimate);

        this.dispatchCustomEvent(linkEvent, nodeToAnimate, elementNameToFire); // elementNameToFire = "linkContainer"
    }



    // Heap
    dispatchLinkHiddenBeforeSwapNodes(animationEndName, elementNameToFire, nodeToAnimate) // elementNameToFire "linkContainer" - value of attribute data-element-name in HTML
    {
        if (!animationEndName.includes("svgLineHideBeforeSwapNodes"))
        {
            return;
        }

        if (this.tree.isLinkContainerShown === false)
        {
            return;
        }

        let lastBottomNode = this.tree.findLastNodeOfBottomLevel();

        if (!Object.is(nodeToAnimate, lastBottomNode))
        {
            return;
        }

        //if (!Object.is(nodeToAnimate, this.tree.lastAddedNode) || !animationEndName.includes("svgLineHideBeforeSwapNodes") ||
        //    this.tree.isLinkContainerShown === false)
        //{
        //    return;
        //}


        this.tree.isLinkContainerShown = false; // ????????????

        let customEventName = "linkHiddenBeforeSwapNodes"; // !!!!!!!!!!!!!!!!!! Replace hardcode !!!!!!!!!!!

        let linkEvent = this.createCustomEvent(customEventName, nodeToAnimate);

        this.dispatchCustomEvent(linkEvent, nodeToAnimate, elementNameToFire); // elementNameToFire = "linkContainer"
    }


    // RBT
    dispatchStepFixingDeletionNodeEnded(elementNameToFire, nodeToDelete, nodeToFireEvent)
    {
        // fire on nodeToFireEvent (it is sibling of nodeToDelete or specified node)

        if (!nodeToDelete || this.tree.currentAmountOfNodesInTree === 1)
        {
            return;
        }

        let customEventName = "stepFixingDeletionNodeEnded"; // !!!!!!!!!!!!!!!!!! Replace hardcode !!!!!!!!!!!

        let linkEvent = this.createCustomEvent(customEventName, nodeToFireEvent);

        this.dispatchCustomEvent(linkEvent, nodeToFireEvent, elementNameToFire); // elementNameToFire = "superContainer"
    }


    // Heap
    dispatchSwapTwoNodesEnded(animationEndName, elementNameToFire, nodeToAnimate) // elementNameToFire "linkContainer" - value of attribute data-element-name in HTML
    {
        if (!animationEndName.includes("moveNodeOwnPosition_Swap_"))
        {
            return;
        }

        if (nodeToAnimate === null)
        {
            return;
        }

        if (this.tree.lastSwappedNode === null)
        {
            return;
        }

        if (!Object.is(nodeToAnimate, this.tree.nodeToCheckHeapify))
        {
            return;
        }


        let customEventName = "swapTwoNodesEnded"; // !!!!!!!!!!!!!!!!!! Replace hardcode !!!!!!!!!!!

        let linkEvent = this.createCustomEvent(customEventName, nodeToAnimate);

        this.dispatchCustomEvent(linkEvent, nodeToAnimate, elementNameToFire); // elementNameToFire = "linkContainer"
    }


    // Heap
    // Fire event on nodes except nodeToDelete when all lines of nodes were drawn
    dispatchShowLinksAfterAllSwaps(animationEndName, elementNameToFire, nodeToAnimate, isMaxHeap) // elementNameToFire "linkContainer" - value of attribute data-element-name in HTML
    {
        if ((!this.tree.isLinkContainerShown || !this.tree.treeViewState.isNodeToBeDeleted) && this.tree.currentAmountOfNodesInTree > 1)
        {
            return;
        }

        if (Object.is(nodeToAnimate, this.tree.lastDeletedNode))
        {
            return;
        }

        if (!animationEndName.includes("svgLineShowAfterSwapNodes"))
        {
            return;
        }

        //if (isMaxHeap && this.tree.lastAddedNode.parentNode && this.tree.lastAddedNode.parentNode.value < this.tree.lastAddedNode.value ||
        //    !isMaxHeap && this.tree.lastAddedNode.parentNode && this.tree.lastAddedNode.parentNode.value > this.tree.lastAddedNode.value)
        //{
        //    return;
        //}


        let customEventName = "showLinkAfterAllSwaps"; // !!!!!!!!!!!!!!!!!! Replace hardcode !!!!!!!!!!!

        let linkEvent = this.createCustomEvent(customEventName, nodeToAnimate);

        this.dispatchCustomEvent(linkEvent, nodeToAnimate, elementNameToFire); // elementNameToFire = "linkContainer"
    }


    // dispatch event "disableControl" or "enableControl"
    dispatchDisableControl(idControl, isToDisableControl)
    {
        let customEventName = "disableControl"; // !!!!!!!!!!!!!!!!!! Replace hardcode !!!!!!!!!!!

        if (!isToDisableControl)
        {
            customEventName = "enableControl";
        }

        let customEvent = this.createCustomEvent(customEventName, null);

        let domControlElement = this.domUpdater.getControl(idControl);

        domControlElement.dispatchEvent(customEvent);
    }


    // dispatch event "disableControl" or "enableControl" for group of buttons and input
    dispatchDisableGroupControls(isToDisableControl)
    {
        // to REWORK using event
        this.tree.treeViewState.isClickOnNodesDisabled = isToDisableControl; // disable or enable clicks on node


        // !!!!! there was implemented methods that search id of these button ControlHandlersAbstractTree
        this.dispatchDisableControl("idButtonAdd", isToDisableControl);
        this.dispatchDisableControl("idButtonFind", isToDisableControl);
        this.dispatchDisableControl("idButtonDelete", isToDisableControl);
        this.dispatchDisableControl("idButtonTraversingInorder", isToDisableControl);
        this.dispatchDisableControl("idButtonTraversingPreorder", isToDisableControl);
        this.dispatchDisableControl("idButtonTraversingPostorder", isToDisableControl);
        this.dispatchDisableControl("idInputForNodeValue", isToDisableControl);


        let customEventHandlerHtmlTable = new CustomEventHandlerHtmlTable();
        customEventHandlerHtmlTable.dispatchUpdateTableTreeCharacteristics(isToDisableControl, this.tree); // works only after enabling buttons

        // ????
        if (!isToDisableControl)
        {
            customEventHandlerHtmlTable.dispatchUpdateTableNodeInfo(this.tree);
        }
    }

}