import { BinarySearchTreeOperation } from './BinarySearchTreeOperation.js';

export class AvlTreeOperation extends BinarySearchTreeOperation
{
    constructor(dataStructure)
    {
        super(dataStructure);
    }


    // notification that tree has unbalanced nodes
    onAddNewEntryToHtmlTableOnBalancingNodes(headOfUnbalancedNode)
    {
        let typeOfOperation = this.treeOperationsStatuses.typesOfOperations.balanceNodes;
        let statusOfOperation = this.treeOperationsStatuses.statusesOfOperation.balancing;

        this.dataStructureActionInfo.writeNewEntryAboutActionInTree(headOfUnbalancedNode.value, typeOfOperation, statusOfOperation);
        this.customEventHandlerHtmlTable.dispatchUpdateTableTreeOperations(this.dataStructure);
    }


    // Update entry to the html-table info about tree operation: rotate node - rotated
    onUpdateEntryToHtmlTableOnBalancingNodes()
    {
        let typeOfOperation = this.treeOperationsStatuses.typesOfOperations.balanceNodes;
        let statusOfOperation = this.treeOperationsStatuses.statusesOfOperation.balanced;

        let oldModelEntryOfActionInTree = this.dataStructureActionInfo.getLastOperationByType(typeOfOperation);

        let updatedFieldsInModelEntryOfActionInTree = {

            statusOfOperation: statusOfOperation,
            wasUpdated: true,
        };

        this.dataStructureActionInfo.updatePropertiesInModelEntryOfActionInTree(oldModelEntryOfActionInTree, updatedFieldsInModelEntryOfActionInTree);
        this.customEventHandlerHtmlTable.dispatchUpdateTableTreeOperations(this.dataStructure);
    }


    // add new entry to the html-table info about tree operation: rotate node - rotated
    onAddNewEntryToHtmlTableOnRotateNodes(unbalancedNode)
    {
        let typeOfOperation = this.treeOperationsStatuses.typesOfOperations.rotateNode;
        let statusOfOperation = this.createStatusOfOperationBeforeRotation();

        this.dataStructureActionInfo.writeNewEntryAboutActionInTree(unbalancedNode.value, typeOfOperation, statusOfOperation);
        this.customEventHandlerHtmlTable.dispatchUpdateTableTreeOperations(this.dataStructure);
    }


    // Update entry to the html-table info about tree operation: rotate node - rotated
    onUpdateEntryToHtmlTableOnRotateNodes()
    {
        let typeOfOperation = this.treeOperationsStatuses.typesOfOperations.rotateNode;
        let statusOfOperation = this.createStatusOfOperationAfterRotation(this.dataStructure);

        let oldModelEntryOfActionInTree = this.dataStructureActionInfo.getLastOperationByType(typeOfOperation);

        let updatedFieldsInModelEntryOfActionInTree = {

            statusOfOperation: statusOfOperation,
            wasUpdated: true,
        };

        this.dataStructureActionInfo.updatePropertiesInModelEntryOfActionInTree(oldModelEntryOfActionInTree, updatedFieldsInModelEntryOfActionInTree);
        this.customEventHandlerHtmlTable.dispatchUpdateTableTreeOperations(this.dataStructure);
    }


    // privates

    createStatusOfOperationBeforeRotation()
    {
        return this.treeOperationsStatuses.statusesOfOperation.rotation;
    }


    createStatusOfOperationAfterRotation(dataStructure)
    {
        let statusOfOperation = this.treeOperationsStatuses.statusesOfOperation.rotated;
        let appliedTypeOfRotation = dataStructure.appliedTypeOfRotation;

        return statusOfOperation + ` to ${appliedTypeOfRotation}`;
    }

}