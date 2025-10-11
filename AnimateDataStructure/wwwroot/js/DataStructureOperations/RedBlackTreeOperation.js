import { AvlTreeOperation } from './AvlTreeOperation.js';

export class RedBlackTreeOperation extends AvlTreeOperation
{
    constructor(dataStructure)
    {
        super(dataStructure);
    }


    // add new entry to the html-table info about tree operation: Fix R.B. tree properties - cause
    // DO NOT DELETE: no method-counterpart to update entry (it is not an entry to update)
    onAddNewEntryToHtmlTableOnFixRbtProperties(unbalancedNode, causeOfFixingRbtProperties)
    {
        let typeOfOperation = this.treeOperationsStatuses.typesOfOperations.fixRedBlackTreeProperties;

        this.dataStructureActionInfo.writeNewEntryAboutActionInTree(unbalancedNode.value, typeOfOperation, causeOfFixingRbtProperties);
        this.customEventHandlerHtmlTable.dispatchUpdateTableTreeOperations(this.dataStructure);
    }


    // add new entry to the html-table info about tree operation: recolor node - Node is Red or black before recoloring
    // DO NOT DELETE: no method-counterpart to update entry, there is only the state AFTER recoloring
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