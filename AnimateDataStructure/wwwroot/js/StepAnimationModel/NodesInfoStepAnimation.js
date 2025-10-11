
export class NodesInfoStepAnimation // object part aka part of House
{

    // to review arguments in invokation
    constructor(nodeToAnimate, relativeNodeToAnimateAccross, directionName,
        patternStepName, // "1. above related node", "2. right to related node", "3. down to related node", // "4. below to related node",
        // "5. highlight left or right border of nodeToAnimate", "6. to child positon (left or right)", "7. draw link"
        applyStepToNodeToAnimate, nodeState)
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