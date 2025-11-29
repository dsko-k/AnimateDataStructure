import { DomUpdater } from '../HtmlDomElementHandler/DomUpdater.js';
import { CustomEventHandlerHtmlTable } from './CustomEventHandlerHtmlTable.js';

export class CustomEventHandler
{
    constructor(tree)
    {
        this.tree = tree;
        this.domUpdater = new DomUpdater();
    }


    createCustomEvent(eventName, nodeWhereFiredEvent)
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


    // fires when node is found but its link have not started to hide yet
    dispatchNodeFound(elementNameToFire, nodeWhichWasFound)
    {
        let customEventName = "findigNodeEnd";  // relocation (moving) of successor node is ended but link have not drawn yet
        let linkEvent = this.createCustomEvent(customEventName, nodeWhichWasFound);
        this.dispatchCustomEvent(linkEvent, nodeWhichWasFound, elementNameToFire);
    }


    // split on 2 methods
    dispatchLinkDrawnErasedBeforeAfterAlignmentByHeight(animationEndName, elementNameToFire, nodeContainedLink)
    {
        let customEventName = "";

        if (animationEndName.includes("svgDrawLine"))
        {
            let lastAnimationName = this.domUpdater.getLastAnimationName(nodeContainedLink, "superContainer");

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

        let linkEvent = this.createCustomEvent(customEventName, nodeContainedLink);
        this.dispatchCustomEvent(linkEvent, nodeContainedLink, elementNameToFire); // elementNameToFire = "superContainer"
    }


    // SVG line link container finished to draw after alignment by height
    dispatchSVGLinkDrawnAfterAlignmentByHeight(animationEndName, elementNameToFire, nodeContainedLink)
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

        let linkEvent = this.createCustomEvent(customEventName, nodeContainedLink);
        this.dispatchCustomEvent(linkEvent, nodeContainedLink, elementNameToFire); // elementNameToFire = "superContainer"
    }


    // SVG line link container finished to drew after alignment by height
    dispatchSVGLinkErasedBeforeAlignmentByHeight(animationEndName, elementNameToFire, nodeContainedLink)
    {
        let customEventName = "linkErasedBeforeAlignmentByHeight";

        if (!animationEndName.includes("svgEraseLine"))
        {
            return;
        }

        let linkEvent = this.createCustomEvent(customEventName, nodeContainedLink);
        this.dispatchCustomEvent(linkEvent, nodeContainedLink, elementNameToFire); // elementNameToFire = "superContainer"
    }


    // relocation of successor node on place of nodeToDelete is ended but node link have not drawn yet
    dispatchNodeAlignedByHeight(animationEndName, elementNameToFire, node)
    {
        if (!animationEndName.includes("moveNodeOwnPosition_Align_by_height"))
        {
            return;
        }

        if (node.isLeftChild !== null)
        {
            let superContainerName = "superContainer";
            let domElementNodeToRelocate = this.domUpdater.getDomElement(node, superContainerName);

            let animationSvgLineLink = window.getComputedStyle(domElementNodeToRelocate).getPropertyValue("--animationSvgLineLink");

            if (!animationSvgLineLink.includes("svgEraseLine"))
            {
                return;
            }
        }

        let customEventName = "alignedByHeight";  // relocation (moving) of successor node is ended but link have not drawn yet
        let linkEvent = this.createCustomEvent(customEventName, node);
        this.dispatchCustomEvent(linkEvent, node, elementNameToFire); // elementNameToFire = "superContainer"
    }


    // Fired only one time on added node
    dispatchNodeAlignedByWidth(animationEndName, elementNameToFire, node)
    {
        // fire only on root
        if (node.parentNode || !animationEndName.includes("moveNodeOwnPosition_Align_By_Width_")) // moveNodeOwnPosition_
        {
            return;
        }

        let customEventName = "alignedByWidth";
        let linkEvent = this.createCustomEvent(customEventName, node);
        this.dispatchCustomEvent(linkEvent, node, elementNameToFire); // elementNameToFire = "superContainer"
    }


    // Fired only one time on added node
    dispatchNodeAlignedByWidthWithoutAlignment(elementNameToFire, node)
    {
        // fire only on root
        if (node.parentNode)
        {
            return;
        }

        let customEventName = "alignedByWidth";
        let linkEvent = this.createCustomEvent(customEventName, node);
        this.dispatchCustomEvent(linkEvent, node, elementNameToFire); // elementNameToFire = "superContainer"
    }


    dispatchNodeAdded(animationEndName, elementNameToFire, nodeAdded)
    {
        let customEventName = "nodeAdded";
        let animationNameToFind = nodeAdded.isLeftChild === null ? `moveNodeOwnPosition_${nodeAdded.nodeId}` : `moveDrawLineNode_${nodeAdded.nodeId}`;

        if (!animationEndName.includes(animationNameToFind))
        {
            return;
        }

        let linkEvent = this.createCustomEvent(customEventName, nodeAdded);
        this.dispatchCustomEvent(linkEvent, nodeAdded, elementNameToFire); // elementNameToFire = "superContainer"
    }


    // It should fire after link drawn (after relocation). It should be fired on successor (if it present or on parent of deleted node, if successor = null)
    dispatchNodeDeleted(nodeToFire)
    {
        let customEventName = "nodeDeleted";
        let superContainerName = "superContainer";
        let linkEvent = this.createCustomEvent(customEventName, nodeToFire);
        this.dispatchCustomEvent(linkEvent, nodeToFire, superContainerName); // elementNameToFire = "superContainer"
    }


    // dispatch event after ending of moving node during balancing
    dispatchBalanceMovingNodeEnded(animationEndName, elementNameToFire, nodeToAnimate)
    {
        if (!animationEndName.includes("moveNodeOwnPosition_Balancing_")) // moveNodeOwnPosition_
        {
            return;
        }

        let customEventName = "balanceMovingNodeEnded";
        let linkEvent = this.createCustomEvent(customEventName, nodeToAnimate);
        this.dispatchCustomEvent(linkEvent, nodeToAnimate, elementNameToFire); // elementNameToFire = "linkContainer"
    }


    dispatchLinkHiddenBeforeBalancing(animationEndName, elementNameToFire, nodeToAnimate)
    {
        if (!animationEndName.includes("svgLineHideBeforeBalancing"))
        {
            return;
        }

        this.tree.isLinkContainerShown = false;
        let customEventName = "linkHiddenBeforeBalancing";
        let linkEvent = this.createCustomEvent(customEventName, nodeToAnimate);
        this.dispatchCustomEvent(linkEvent, nodeToAnimate, elementNameToFire); // elementNameToFire = "linkContainer"
    }


    dispatchLinkShowAfterBalancing(animationEndName, elementNameToFire, nodeToAnimate)
    {
        if (!animationEndName.includes("svgLineShowAfterLinkContainerFade"))
        {
            return;
        }

        this.tree.isLinkContainerShown = true;
        let customEventName = "linkShownAfterBalancing";
        let linkEvent = this.createCustomEvent(customEventName, nodeToAnimate);
        this.dispatchCustomEvent(linkEvent, nodeToAnimate, elementNameToFire); // elementNameToFire = "linkContainer"
    }

    // dispatch event about last traversed node before traversing ended
    // Fired when node with particular value was found during traversing (case for Heap: node to delete and last bottom node if they are different nodes)
    // event "lastNodeBeforeEndingTraversing" fired on the last node of conditional traversing (if node not found, event fired on root)
    // if node not found then event "lastNodeBeforeEndingTraversing" handled on root, because root is a node that always the last in conditional traversing when value is not found
    dispatchLastNodeBeforeEndingTraversing(lastNodeBeforeEndingTraversing)
    {
        let customEventName = "lastNodeBeforeEndingTraversing";
        let superContainerName = "superContainer";
        let linkEvent = this.createCustomEvent(customEventName, lastNodeBeforeEndingTraversing);
        this.dispatchCustomEvent(linkEvent, lastNodeBeforeEndingTraversing, superContainerName); // elementNameToFire = "superContainer"
    }


    dispatchStepFixingAdditionNodeEnded(elementNameToFire, nodeToAnimate)
    {
        let customEventName = "stepFixingAdditionNodeEnded";
        let linkEvent = this.createCustomEvent(customEventName, nodeToAnimate);
        this.dispatchCustomEvent(linkEvent, nodeToAnimate, elementNameToFire); // elementNameToFire = "superContainer"
    }

    // Uses after range of nodes was added. Event should be fired only once on the last node from range of nodes to add
    // Uses as part of measures to avoid firing unwanted events after addition range of nodes (instead setTimeout)
    dispatchTreePropertiesCompliedAfterAdditionRangeOfNodes(elementNameToFire, nodeToAnimate)
    {
        let customEventName = "treePropertiesCompliedAfterAdditionRangeOfNodes";
        let linkEvent = this.createCustomEvent(customEventName, nodeToAnimate);
        this.dispatchCustomEvent(linkEvent, nodeToAnimate, elementNameToFire); // elementNameToFire = "superContainer"
    }


    // dispatch event on SVG where will be need to be rotation
    dispatchLinkHiddenBeforeRotation(animationEndName, elementNameToFire, nodeToAnimate)
    {
        if (!nodeToAnimate.isNodeToBeRotatedWithAncestors)
        {
            return;
        }

        if (!animationEndName.includes("svgLineHideBeforeBalancing"))
        {
            return;
        }

        this.tree.isLinkContainerShown = false;
        let customEventName = "linkHiddenBeforeBalancing";
        let linkEvent = this.createCustomEvent(customEventName, nodeToAnimate);
        this.dispatchCustomEvent(linkEvent, nodeToAnimate, elementNameToFire); // elementNameToFire = "linkContainer"
    }

    // event fired only on the first node that in list of nodes to recolor this.tree.nodesToRecolor
    dispatchLinkShowAfterRotation(animationEndName, elementNameToFire, nodeToAnimate)
    {
        if (!animationEndName.includes("svgLineShowAfterLinkContainerFade"))
        {
            return;
        }

        this.tree.isLinkContainerShown = true;
        let customEventName = "linkShownAfterRotation";
        let linkEvent = this.createCustomEvent(customEventName, nodeToAnimate);
        this.dispatchCustomEvent(linkEvent, nodeToAnimate, elementNameToFire); // elementNameToFire = "linkContainer"
    }


    dispatchLinkHiddenBeforeSwapNodes(animationEndName, elementNameToFire, nodeToAnimate)
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

        this.tree.isLinkContainerShown = false;
        let customEventName = "linkHiddenBeforeSwapNodes";
        let linkEvent = this.createCustomEvent(customEventName, nodeToAnimate);
        this.dispatchCustomEvent(linkEvent, nodeToAnimate, elementNameToFire); // elementNameToFire = "linkContainer"
    }


    dispatchStepFixingDeletionNodeEnded(elementNameToFire, nodeToDelete, nodeToFireEvent)
    {
        // fire on nodeToFireEvent (it is sibling of nodeToDelete or specified node)
        if (!nodeToDelete || this.tree.currentAmountOfNodesInTree === 1)
        {
            return;
        }

        let customEventName = "stepFixingDeletionNodeEnded";
        let linkEvent = this.createCustomEvent(customEventName, nodeToFireEvent);
        this.dispatchCustomEvent(linkEvent, nodeToFireEvent, elementNameToFire); // elementNameToFire = "superContainer"
    }


    dispatchSwapTwoNodesEnded(animationEndName, elementNameToFire, nodeToAnimate)
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

        let customEventName = "swapTwoNodesEnded";
        let linkEvent = this.createCustomEvent(customEventName, nodeToAnimate);
        this.dispatchCustomEvent(linkEvent, nodeToAnimate, elementNameToFire); // elementNameToFire = "linkContainer"
    }


    // Fire event on nodes except nodeToDelete when all lines of nodes were drawn
    dispatchShowLinksAfterAllSwaps(animationEndName, elementNameToFire, nodeToAnimate, isMaxHeap)
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

        let customEventName = "showLinkAfterAllSwaps";
        let linkEvent = this.createCustomEvent(customEventName, nodeToAnimate);
        this.dispatchCustomEvent(linkEvent, nodeToAnimate, elementNameToFire); // elementNameToFire = "linkContainer"
    }


    // dispatch event "disableControl" or "enableControl"
    dispatchDisableControl(idControl, isToDisableControl)
    {
        let customEventName = "disableControl";

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
        this.tree.treeViewState.isClickOnNodesDisabled = isToDisableControl; // disable or enable clicks on node

        this.dispatchDisableControl("idButtonAdd", isToDisableControl);
        this.dispatchDisableControl("idButtonFind", isToDisableControl);
        this.dispatchDisableControl("idButtonDelete", isToDisableControl);
        this.dispatchDisableControl("idButtonTraversingInorder", isToDisableControl);
        this.dispatchDisableControl("idButtonTraversingPreorder", isToDisableControl);
        this.dispatchDisableControl("idButtonTraversingPostorder", isToDisableControl);
        this.dispatchDisableControl("idInputForNodeValue", isToDisableControl);

        let customEventHandlerHtmlTable = new CustomEventHandlerHtmlTable();
        customEventHandlerHtmlTable.dispatchUpdateTableTreeCharacteristics(isToDisableControl, this.tree); // works only after enabling buttons

        if (!isToDisableControl)
        {
            customEventHandlerHtmlTable.dispatchUpdateTableNodeInfo(this.tree);
        }
    }
}