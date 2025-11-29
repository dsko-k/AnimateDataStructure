import { DataStructureActionInfo } from './DataStructureActionInfo.js';
import { TreeOperationsStatuses } from '../DataStructureOperationsStatuses/TreeOperationsStatuses.js';
import { CustomEventHandlerHtmlTable } from '../CustomEventHandler/CustomEventHandlerHtmlTable.js';

// Writes entries about the next operations: add, find, delete, relocate
export class AbstractTreeOperation
{
    constructor(dataStructure)
    {
        this.dataStructure = dataStructure;
        this.propertyInDataStructureToAddState = "operations";
        this.dataStructureActionInfo = new DataStructureActionInfo(dataStructure, this.propertyInDataStructureToAddState);
        this.treeOperationsStatuses = new TreeOperationsStatuses();
        this.customEventHandlerHtmlTable = new CustomEventHandlerHtmlTable();
    }


    onAddNewEntryToHtmlTableOnAddNode(addedNode)
    {
        this.dataStructureActionInfo.writeNewEntryAboutActionInTree(addedNode.value, this.treeOperationsStatuses.typesOfOperations.addNode, this.treeOperationsStatuses.statusesOfOperation.addition);
        this.customEventHandlerHtmlTable.dispatchUpdateTableTreeOperations(this.dataStructure);
    }


    onAddNewEntryToHtmlTableOnAddRangeOfNodes(addedNode)
    {
        this.dataStructureActionInfo.writeNewEntryAboutActionInTree(addedNode.value, this.treeOperationsStatuses.typesOfOperations.addNode, this.treeOperationsStatuses.statusesOfOperation.added); // DO NOT DELETE: differs by .added not .addition
        this.customEventHandlerHtmlTable.dispatchUpdateTableTreeOperations(this.dataStructure);
    }

    // Uses also for updating when adding range of nodes
    onUpdateEntryInHtmlTableOnAddNode(nodeToAdd)
    {
        let typeOfOperation = this.treeOperationsStatuses.typesOfOperations.addNode;
        let statusOfOperation = this.treeOperationsStatuses.statusesOfOperation.added;
        let oldModelEntryOfActionInTree = this.dataStructureActionInfo.getLastOperationByType(typeOfOperation);
        let updatedFieldsInModelEntryOfActionInTree = {

            statusOfOperation: statusOfOperation,
            wasUpdated: true,
        };
        this.dataStructureActionInfo.updatePropertiesInModelEntryOfActionInTree(oldModelEntryOfActionInTree, updatedFieldsInModelEntryOfActionInTree);
        this.customEventHandlerHtmlTable.dispatchUpdateTableTreeOperations(this.dataStructure);
    }


    onAddNewEntryToHtmlTableOnFindNode(isFindSuccessor, nodeFinder)
    {
        if (isFindSuccessor)
        {
            return;
        }
        // nodeFinder use as object that always has value to find even if value correct but does not exist in tree
        let typesOfOperation = this.treeOperationsStatuses.typesOfOperations.findNode;
        let statusOfOperation = this.treeOperationsStatuses.statusesOfOperation.searching;
        this.dataStructureActionInfo.writeNewEntryAboutActionInTree(nodeFinder.value, typesOfOperation, statusOfOperation);
        this.customEventHandlerHtmlTable.dispatchUpdateTableTreeOperations(this.dataStructure);
    }


    onUpdateEntryInHtmlTableOnFindNode(nodeFinder, foundNode)
    {
        let typesOfOperation = this.treeOperationsStatuses.typesOfOperations.findNode;
        let statusOfOperation = this.getStatusOfOperationOnFindNode(nodeFinder, foundNode);
        this.dataStructureActionInfo.updateAllFieldsOfEntryAboutActionInTree(nodeFinder.value, typesOfOperation, statusOfOperation);
        this.customEventHandlerHtmlTable.dispatchUpdateTableTreeOperations(this.dataStructure);
    }


    getStatusOfOperationOnFindNode(nodeFinder, foundNode)
    {
        // nodeFinder use as object that always has value to find even if value correct but does not exist in tree
        let statusesOfOperation = this.treeOperationsStatuses.statusesOfOperation;
        return (nodeFinder.value === foundNode.value) ? statusesOfOperation.found : statusesOfOperation.notFound;
    }


    // add new entry to the html-table info about tree operation: find successor of deleted node - processing
    onAddNewEntryToHtmlTableOnFindSuccessor(foundNode)
    {
        // We do not add an entry about tree operation: "find successor of deleted node" if node does not have successor i.e. any child
        if (!foundNode.leftChild && !foundNode.rightChild)
        {
            return;
        }

        let typesOfOperation = this.treeOperationsStatuses.typesOfOperations.findSuccessorNode;
        let statusSearching = this.treeOperationsStatuses.statusesOfOperation.searching;
        this.dataStructureActionInfo.writeNewEntryAboutActionInTree(statusSearching, typesOfOperation, statusSearching);
        this.customEventHandlerHtmlTable.dispatchUpdateTableTreeOperations(this.dataStructure);
    }


    onUpdateEntryInHtmlTableOnFindSuccessor(foundNode)
    {
        let typeOfOperation = this.treeOperationsStatuses.typesOfOperations.findSuccessorNode;
        let statusOfOperation = this.treeOperationsStatuses.statusesOfOperation.found;
        this.dataStructureActionInfo.updateAllFieldsOfEntryAboutActionInTree(foundNode.value, typeOfOperation, statusOfOperation);
        this.customEventHandlerHtmlTable.dispatchUpdateTableTreeOperations(this.dataStructure);
    }


    // add new entry to the html-table info about tree operation: relocate successor node - relocating
    onAddNewEntryToHtmlTableOnAlignmentByHeight(successor)
    {
        let typeOfOperation = this.treeOperationsStatuses.typesOfOperations.relocateSuccessorOnNodeToDelete;
        let statusOfOperation = this.treeOperationsStatuses.statusesOfOperation.relocationSuccessor;
        this.dataStructureActionInfo.writeNewEntryAboutActionInTree(successor.value, typeOfOperation, statusOfOperation);
        this.customEventHandlerHtmlTable.dispatchUpdateTableTreeOperations(this.dataStructure);
    }


    onUpdateEntryInHtmlTableOnAlignmentByHeight(successor)
    {
        let typeOfOperation = this.treeOperationsStatuses.typesOfOperations.relocateSuccessorOnNodeToDelete;
        let statusOfOperation = this.treeOperationsStatuses.statusesOfOperation.successorRelocated;
        this.dataStructureActionInfo.updateAllFieldsOfEntryAboutActionInTree(successor.value, typeOfOperation, statusOfOperation);
        this.customEventHandlerHtmlTable.dispatchUpdateTableTreeOperations(this.dataStructure);
    }


    onAddNewEntryToHtmlTableOnDeleteNode(nodeToDeleteValue)
    {
        let typesOfOperation = this.treeOperationsStatuses.typesOfOperations.deleteNode;
        let statusOfOperation = this.treeOperationsStatuses.statusesOfOperation.deleting;
        this.dataStructureActionInfo.writeNewEntryAboutActionInTree(nodeToDeleteValue, typesOfOperation, statusOfOperation);
        this.customEventHandlerHtmlTable.dispatchUpdateTableTreeOperations(this.dataStructure);
    }


    onUpdateEntryInHtmlTableOnDeleteNode(nodeToDelete, valueToDelete)
    {
        let typeOfOperation = this.treeOperationsStatuses.typesOfOperations.deleteNode;
        // if try to delete node that does not exist in tree
        let statusesOfOperation = !nodeToDelete ? this.treeOperationsStatuses.statusesOfOperation.notDeleted : this.treeOperationsStatuses.statusesOfOperation.deleted;
        this.dataStructureActionInfo.updateAllFieldsOfEntryAboutActionInTree(valueToDelete, typeOfOperation, statusesOfOperation);
        this.customEventHandlerHtmlTable.dispatchUpdateTableTreeOperations(this.dataStructure);
    }
}