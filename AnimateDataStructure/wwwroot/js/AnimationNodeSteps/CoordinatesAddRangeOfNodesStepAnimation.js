
export class CoordinatesAddRangeOfNodesStepAnimation
{
    constructor(nodeToAnimate, relativeNodeToAnimateAccross, extractedStepAcrossRelativeNode)
    {
        this.nodeToAnimate = nodeToAnimate;
        this.relativeNodeToAnimateAccross = relativeNodeToAnimateAccross;
        this.extractedStepAcrossRelativeNode = extractedStepAcrossRelativeNode;
    }


    computeXCoordinateEndMovingStep()
    {
        return this.nodeToAnimate.xCoordinate;
    }


    computeYCoordinateEndMovingStep()
    {
        return this.nodeToAnimate.yCoordinate;
    }
}