import { Coordinates } from '../CoordinatesModel/Coordinates.js';

export class CoordinatesAddNodeStepAnimation
{
    constructor(nodeToAnimate, relativeNodeToAnimateAccross, extractedStepAcrossRelativeNode)
    {
        this.nodeToAnimate = nodeToAnimate;
        this.relativeNodeToAnimateAccross = relativeNodeToAnimateAccross;
        this.extractedStepAcrossRelativeNode = extractedStepAcrossRelativeNode;
    }


    computeXCoordinateEndMovingStep() // patternStepAnimationArrayOperation - an array with steps
    {
        if (!this.nodeToAnimate.parentNode || this.extractedStepAcrossRelativeNode.patternStepName.includes("own position") || this.extractedStepAcrossRelativeNode.patternStepName.includes("link to parent"))
        {
            return this.nodeToAnimate.xCoordinate;
        }

        if (this.extractedStepAcrossRelativeNode.patternStepName === "above related node" ||
            this.extractedStepAcrossRelativeNode.patternStepName === "below to related node" ||
            this.extractedStepAcrossRelativeNode.patternStepName === "highlight left border of nodeToAnimate" ||
            this.extractedStepAcrossRelativeNode.patternStepName === "highlight right border of nodeToAnimate")
        {
            return this.relativeNodeToAnimateAccross.xCoordinate;
        }
    }


    computeYCoordinateEndMovingStep()
    {
        if (!this.nodeToAnimate.parentNode || this.extractedStepAcrossRelativeNode.patternStepName.includes("own position") || this.extractedStepAcrossRelativeNode.patternStepName.includes("link to parent"))
        {
            return this.nodeToAnimate.yCoordinate;
        }

        let coordinatesObject = new Coordinates();
        let relativeNodeToAnimateAccrossHeight = coordinatesObject.getSizeNodeContainer(this.extractedStepAcrossRelativeNode.styleName, "--heightSuperContainer");
        let nodeToAnimateHeight = coordinatesObject.getSizeNodeContainer(this.extractedStepAcrossRelativeNode.styleName, "--widthSuperContainer");


        if (this.extractedStepAcrossRelativeNode.patternStepName === "above related node")
        {
            return this.relativeNodeToAnimateAccross.yCoordinate -
                this.extractedStepAcrossRelativeNode.verticalClearanceNodes -
                nodeToAnimateHeight;
        }

        if (this.extractedStepAcrossRelativeNode.patternStepName === "below to related node" ||
            this.extractedStepAcrossRelativeNode.patternStepName === "highlight left border of nodeToAnimate" ||
            this.extractedStepAcrossRelativeNode.patternStepName === "highlight right border of nodeToAnimate")
        {
            return this.relativeNodeToAnimateAccross.yCoordinate +
                relativeNodeToAnimateAccrossHeight +
                this.extractedStepAcrossRelativeNode.verticalClearanceNodes;
        }
    }
}