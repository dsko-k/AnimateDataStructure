import { AbstractTreeOperation } from './AbstractTreeOperation.js';

// Writes entries about the next operations: heapify down, heapify up
export class HeapOperation extends AbstractTreeOperation
{
    constructor(dataStructure, isMaxHeap)
    {
        super(dataStructure);
        this.isMaxHeap = isMaxHeap;
    }


    onAddNewEntryToHtmlTableOnFindNode(valueToFind)
    {
        let typesOfOperation = this.treeOperationsStatuses.typesOfOperations.findNode;
        let statusOfOperation = this.treeOperationsStatuses.statusesOfOperation.searching;
        this.dataStructureActionInfo.writeNewEntryAboutActionInTree(valueToFind, typesOfOperation, statusOfOperation);
        this.customEventHandlerHtmlTable.dispatchUpdateTableTreeOperations(this.dataStructure);
    }


    onUpdateEntryInHtmlTableOnFindNode(valueToFind, wasFoundValue)
    {
        let typesOfOperation = this.treeOperationsStatuses.typesOfOperations.findNode;
        let statusOfOperation = this.getStatusOfOperationOnFindNode(wasFoundValue);
        this.dataStructureActionInfo.updateAllFieldsOfEntryAboutActionInTree(valueToFind, typesOfOperation, statusOfOperation);
        this.customEventHandlerHtmlTable.dispatchUpdateTableTreeOperations(this.dataStructure);
    }


    // Find node BEFORE it will be deleted
    onAddNewEntryToHtmlTableOnFindNodeBeforeDeletion(valueToDelete)
    {
        let typesOfOperation = this.treeOperationsStatuses.typesOfOperations.findHeapNodeBeforeDeletion;
        let statusOfOperation = this.treeOperationsStatuses.statusesOfOperation.searching;
        this.dataStructureActionInfo.writeNewEntryAboutActionInTree(valueToDelete, typesOfOperation, statusOfOperation);
        this.customEventHandlerHtmlTable.dispatchUpdateTableTreeOperations(this.dataStructure);
    }


    // Find node BEFORE it will be deleted
    onUpdateEntryInHtmlTableOnFindNodeBeforeDeletion(valueToDelete, wasFound)
    {
        let typesOfOperation = this.treeOperationsStatuses.typesOfOperations.findHeapNodeBeforeDeletion;
        let statusOfOperation = this.getStatusOfOperationOnFindNode(wasFound);
        this.dataStructureActionInfo.updateAllFieldsOfEntryAboutActionInTree(valueToDelete, typesOfOperation, statusOfOperation);
        this.customEventHandlerHtmlTable.dispatchUpdateTableTreeOperations(this.dataStructure);
    }


    // Find last bottom node that to replace deleted node
    onAddNewEntryToHtmlTableOnFindLastBottomNode()
    {
        let typesOfOperation = this.treeOperationsStatuses.typesOfOperations.findHeapLastBottomNode;
        let statusOfOperation = this.treeOperationsStatuses.statusesOfOperation.searching;
        let valueToFind = statusOfOperation;
        this.dataStructureActionInfo.writeNewEntryAboutActionInTree(valueToFind, typesOfOperation, statusOfOperation);
        this.customEventHandlerHtmlTable.dispatchUpdateTableTreeOperations(this.dataStructure);
    }


    onUpdateEntryInHtmlTableOnFindLastBottomNode(valueLastBottomNode)
    {
        let typesOfOperation = this.treeOperationsStatuses.typesOfOperations.findHeapLastBottomNode;
        let statusOfOperation = this.treeOperationsStatuses.statusesOfOperation.found;
        this.dataStructureActionInfo.updateAllFieldsOfEntryAboutActionInTree(valueLastBottomNode, typesOfOperation, statusOfOperation);
        this.customEventHandlerHtmlTable.dispatchUpdateTableTreeOperations(this.dataStructure);
    }


    getStatusOfOperationOnFindNode(wasFoundValue)
    {
        let statusesOfOperation = this.treeOperationsStatuses.statusesOfOperation;
        return wasFoundValue ? statusesOfOperation.found : statusesOfOperation.notFound;
    }


    onAddNewEntryToHtmlTableOnHeapify(valueToHeapify)
    {
        let typesOfOperation = this.treeOperationsStatuses.typesOfOperations.heapify;
        let statusOfOperation = this.treeOperationsStatuses.statusesOfOperation.heapifying;
        this.dataStructureActionInfo.writeNewEntryAboutActionInTree(valueToHeapify, typesOfOperation, statusOfOperation);
        this.customEventHandlerHtmlTable.dispatchUpdateTableTreeOperations(this.dataStructure);
    }


    onUpdateEntryInHtmlTableOnHeapifyEnd(valueToHeapify)
    {
        let typesOfOperation = this.treeOperationsStatuses.typesOfOperations.heapify;
        let statusOfOperation = this.treeOperationsStatuses.statusesOfOperation.heapified;
        this.dataStructureActionInfo.updateAllFieldsOfEntryAboutActionInTree(valueToHeapify, typesOfOperation, statusOfOperation);
        this.customEventHandlerHtmlTable.dispatchUpdateTableTreeOperations(this.dataStructure);
    }
}