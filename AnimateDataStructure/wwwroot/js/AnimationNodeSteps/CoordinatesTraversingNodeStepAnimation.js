
export class CoordinatesTraversingNodeStepAnimation
{
    constructor(nodeToAnimate, relativeNodeToAnimateAccross, extractedStepAcrossRelativeNode)
    {
        this.nodeToAnimate = nodeToAnimate;
        this.relativeNodeToAnimateAccross = relativeNodeToAnimateAccross;
        this.extractedStepAcrossRelativeNode = extractedStepAcrossRelativeNode;
    }


    computeXCoordinateEndMovingStep()
    {
        return this.relativeNodeToAnimateAccross.xCoordinate;
    }


    computeYCoordinateEndMovingStep()
    {
        return this.relativeNodeToAnimateAccross.yCoordinate;
    }
}