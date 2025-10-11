export class TreeViewState
{
    constructor()
    {
        this.lastClickedNode = null; // it is = null after another click by the same node
        this.clickedTimes = 1;
        this.isClickOnNodesDisabled = true;
        this.isNodeToBeDeleted = false; // use only in Heap to distinguish handlers for heapify after adding node or heapify during deletion node

        this.wasFoundNodeToBeDeleted = null; // ????
        this.enteredValueOfNodeToBeDeleted = null; // ????

        this.valueOfNodeThatWasClickedLastTime = null; // ???? retains value of node that was clicked last time (it is not deleted after another click by the same node)
    }


    getLastClickedNode()
    {
        return this.lastClickedNode;
    }


    setLastClickedNode(node)
    {
        this.lastClickedNode = node;
    }


    increaseClickedCounter()
    {
        this.clickedTimes++;
    }


    getClickedTimes()
    {
        return this.clickedTimes;
    }


    getIsClickOnNodesDisabled()
    {
        return this.isClickOnNodesDisabled;
    }


    setIsClickOnNodesDisabled(isClickOnNodesDisabled)
    {
        this.isClickOnNodesDisabled = isClickOnNodesDisabled;
    }
}