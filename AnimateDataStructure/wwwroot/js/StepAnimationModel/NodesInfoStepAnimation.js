
export class NodesInfoStepAnimation // object part aka part of House
{
    constructor(nodeToAnimate, relativeNodeToAnimateAccross, directionName, patternStepName, applyStepToNodeToAnimate, nodeState)
    {
        this.nodeToAnimate = nodeToAnimate;
        this.relativeNodeToAnimateAccross = relativeNodeToAnimateAccross;
        this.directionName = directionName;
        this.patternStepName = patternStepName;
        this.applyStepToNodeToAnimate = applyStepToNodeToAnimate;
        this.nodeState = nodeState;
    }

    setDirectionName(directionName)
    {
        this.directionName = directionName;
    }

    setPatternStepName(patternStepName)
    {
        this.patternStepName = patternStepName;
    }
}