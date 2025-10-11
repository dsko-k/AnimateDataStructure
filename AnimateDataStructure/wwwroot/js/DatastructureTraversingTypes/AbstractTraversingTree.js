
export class AbstractTraversingTree
{
    constructor(tree, traverseUntillFindValue = null)
    {
        this.tree = tree;
        this.traverseUntillFindValue = traverseUntillFindValue; // for case, when traversing is going untill node with particular value will be found (case for find value in Heap)
        this.wasFoundNodeValueDuringTraversing = false;
    }

    // set node.isVisitedNode = false for all tree nodes
    restoreVisitedStatusAllNodes()
    {
        let allNodesByLevels = this.tree.getAllNodesByLevels();

        for (let currentLevel = 0; currentLevel < allNodesByLevels.length; currentLevel++)
        {
            for (let n = 0; n < allNodesByLevels[currentLevel].length; n++)
            {
                let currentNode = allNodesByLevels[currentLevel][n];

                currentNode.isVisitedNode = false;

                currentNode.wasChangedNodeColorAfterVisiting = false;
            }
        }
    }


    setFlagWasFoundNodeValueDuringTraversing(predicate)
    {
        if (predicate !== true && predicate !== false)
        {
            throw new Error("Incorrect value for predicate");
        }

        this.wasFoundNodeValueDuringTraversing = predicate;
    }


    // returns array of nodes to be visited to traverse tree
    traverseTree(startNode)
    {
        let visitedNodesToTraverse = [];

        let currentNodeToTraverse = startNode;

        visitedNodesToTraverse.push(startNode);

        while (currentNodeToTraverse)
        {
            this.setNodeVisited(currentNodeToTraverse);

            // for case, when traversing is going untill node with particular value will be found (case for find value in Heap)
            if (this.traverseUntillFindValue && this.traverseUntillFindValue === currentNodeToTraverse.value && currentNodeToTraverse.isVisitedNode)
            {
                this.setFlagWasFoundNodeValueDuringTraversing(true);

                break;
            }

            currentNodeToTraverse = this.getNextNodeToTraverse(currentNodeToTraverse);

            if (currentNodeToTraverse)
            {
                visitedNodesToTraverse.push(currentNodeToTraverse);
            }
        }

        return visitedNodesToTraverse;
    }

}