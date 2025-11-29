import { AvlTreeOperation } from './AvlTreeOperation.js';

export class RedBlackTreeOperation extends AvlTreeOperation
{
    constructor(dataStructure)
    {
        super(dataStructure);
    }


    onAddNewEntryToHtmlTableOnFixRbtProperties(unbalancedNode, causeOfFixingRbtProperties)
    {
        let typeOfOperation = this.treeOperationsStatuses.typesOfOperations.fixRedBlackTreeProperties;
        this.dataStructureActionInfo.writeNewEntryAboutActionInTree(unbalancedNode.value, typeOfOperation, causeOfFixingRbtProperties);
        this.customEventHandlerHtmlTable.dispatchUpdateTableTreeOperations(this.dataStructure);
    }


    onAddNewEntryToHtmlTableOnRecolorNode(nodeToRecolor)
    {
        let typeOfOperation = this.treeOperationsStatuses.typesOfOperations.recolorNode;
        let statusOfOperation = this.getStatusOfOperationRecoloringNode(nodeToRecolor);
        this.dataStructureActionInfo.writeNewEntryAboutActionInTree(nodeToRecolor.value, typeOfOperation, statusOfOperation);
        this.customEventHandlerHtmlTable.dispatchUpdateTableTreeOperations(this.dataStructure);
    }


    getStatusOfOperationRecoloringNode(nodeToRecolor)
    {
        let statusesOfOperation = this.treeOperationsStatuses.statusesOfOperation;
        return nodeToRecolor.isNodeRed ? statusesOfOperation.redColorAfterRecolor : statusesOfOperation.blackColorAfterRecolor;
    }
}