// Writes entries about actions in dataStructure's specified property
export class DataStructureActionInfo
{
    constructor(dataStructure, propertyInDataStructureToAddState)
    {
        this.dataStructure = dataStructure;
        this.propertyInDataStructureToAddState = propertyInDataStructureToAddState;
    }


    // !!!!!!!!!! REMOVE dataStructure and propertyInDataStructureToAddState as parameter of methods!!!!!!!!!!!!!!

    // public
    // write State Of Tree Operation for valid node
    writeNewEntryAboutActionInTree(nodeValue, typeOfOperation, statusOfOperation)
    {
        let entryModelOfActionInTree = this.createModelEntryOfActionInTree(nodeValue, typeOfOperation, statusOfOperation);
        this.addEntryAboutActionInTree(this.dataStructure, this.propertyInDataStructureToAddState, entryModelOfActionInTree);
    }


    // public
    updateAllFieldsOfEntryAboutActionInTree(nodeValue, typeOfOperation, statusOfOperation)
    {
        let updatedEntryModelOfActionInTree = this.createModelEntryOfActionInTree(nodeValue, typeOfOperation, statusOfOperation);
        this.updateLastEntryAboutActionInTree(updatedEntryModelOfActionInTree, typeOfOperation);
    }


    // private

    // add entry to the dataStructure about operation that was made
    addEntryAboutActionInTree(dataStructure, propertyInDataStructureToAddState, entryModelOfActionInTree) // operationsStatusInfo is object with information about operation on tree that was made
    {
        if (entryModelOfActionInTree.wasUpdated) // skip updating if updatedOperationsStatusInfo was already updated
        {
            throw new Error("Unable to add operation that was already updated");
        }

        if (!this.dataStructure.hasOwnProperty(this.propertyInDataStructureToAddState))
        {
            this.dataStructure[this.propertyInDataStructureToAddState] = [];
        }

        entryModelOfActionInTree.orderNumberOfOperation = this.dataStructure[this.propertyInDataStructureToAddState].length;
        this.dataStructure[this.propertyInDataStructureToAddState].push(entryModelOfActionInTree);
    }


    updateLastEntryAboutActionInTree(updatedEntryModelOfActionInTree, typeOfOperationToUpdate) // operationsStatusInfo is object with information about operation on tree that was made
    {
        if (updatedEntryModelOfActionInTree.wasUpdated) // skip updating if updatedEntryModelOfActionInTree was already updated
        {
            return;
        }

        let indexLastOperationByType = this.getIndexOfLastOperationByType(typeOfOperationToUpdate);

        let lastOperationByType = this.dataStructure[this.propertyInDataStructureToAddState][indexLastOperationByType];

        if (lastOperationByType.wasUpdated)
        {
            return;
        }

        updatedEntryModelOfActionInTree.wasUpdated = true;
        updatedEntryModelOfActionInTree.orderNumberOfOperation = lastOperationByType.orderNumberOfOperation;

        this.dataStructure[this.propertyInDataStructureToAddState][indexLastOperationByType] = updatedEntryModelOfActionInTree;
    }


    // ???
    getIndexOfLastOperationByType(typeOfOperation)
    {
        if (!this.dataStructure.hasOwnProperty(this.propertyInDataStructureToAddState) ||
            (this.dataStructure.hasOwnProperty(this.propertyInDataStructureToAddState) && this.dataStructure[this.propertyInDataStructureToAddState].length === 0))
        {
            throw new Error(`Property with name ${this.propertyInDataStructureToAddState} was not found or this property is empty`);
        }

        let operationsByType = this.dataStructure[this.propertyInDataStructureToAddState]
            .filter(operation => operation.typeOfOperation === typeOfOperation);

        if (operationsByType.length === 0)
        {
            throw new Error(`Operation with type ${typeOfOperation} was not found`);
        }

        let lastOperationByType = operationsByType[operationsByType.length - 1];

        let indexLastOperationByType = lastOperationByType.orderNumberOfOperation;

        if (indexLastOperationByType === null)
        {
            throw new Error(`Index of operation ${typeOfOperation} was not found`);
        }

        return indexLastOperationByType;
    }


    // ???
    getLastOperationByType(typeOfOperation)
    {
        let indexLastOperationByType = this.getIndexOfLastOperationByType(typeOfOperation);
        return this.dataStructure[this.propertyInDataStructureToAddState][indexLastOperationByType];
    }


    // operationsStatusInfo is object with information about operation on tree that was made
    createModelEntryOfActionInTree(nodeValue, typeOfOperation, statusOfOperation)
    {
        return {

            orderNumberOfOperation: null, // DO NOT DELETE: orderNumberOfOperation counts from 0
            typeOfOperation: typeOfOperation,
            nodeValue: nodeValue,
            statusOfOperation: statusOfOperation,
            wasUpdated: false,
        };
    }


    updatePropertiesInModelEntryOfActionInTree(oldModelEntryOfActionInTree, newModelEntryOfActionInTree)
    {
        Object.keys(newModelEntryOfActionInTree).forEach(keyOfNewModelEntryOfActionInTree =>
        {
            if (oldModelEntryOfActionInTree.hasOwnProperty(keyOfNewModelEntryOfActionInTree))
            {
                oldModelEntryOfActionInTree[keyOfNewModelEntryOfActionInTree] = newModelEntryOfActionInTree[keyOfNewModelEntryOfActionInTree];
            }
        });
    }

}