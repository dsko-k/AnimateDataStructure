export class TreeViewState
{
    constructor()
    {
        this.lastClickedNode = null;
        this.clickedTimes = 1;
        this.isClickOnNodesDisabled = true;
        this.isNodeToBeDeleted = false;
        this.wasFoundNodeToBeDeleted = null;
        this.enteredValueOfNodeToBeDeleted = null;
        this.valueOfNodeThatWasClickedLastTime = null;
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