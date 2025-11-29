export class TreeTraversingStatuses
{
    constructor()
    {
        this.typesOfTraversing = {
            traverseInOrder: "Traversing Inorder",
            traversePreOrder: "Traversing Preorder",
            traversePostOrder: "Traversing Postorder",
            conditionalTraverseInOrder: "Conditional Traversing Inorder",
            conditionalTraversePreOrder: "Conditional Traversing Preorder",
            conditionalTraversePostOrder: "Conditional Traversing Postorder",
        };

        this.statusesOfTraversing = {
            traversingStarted: "Started...", // for starting unconditional traversing
            searchingDuringTraversing: "Searching value...", // for starting conditional traversing
            traversed: "Node traversed",
            targetNodeFound: "Node found, traversing terminated",
            targetNodeNotFound: "Node not found during traversing",
            traversingEnded: "Finished",
        };

        this.valueToFindDuringTraversing = {
            unspecifiedValue: "-",
        };
    }


    getStatusesOfOperation()
    {
        return this.statusesOfOperation;
    }


    getTypesOfOperations()
    {
        return this.typesOfOperations;
    }


    writeNewStateOfTreeOperation(dataStructure, propertyInDataStructureToAddState, nodeValue, typeOfOperation, statusOfOperation)
    {
        let operationStatusInfo = this.createOperationsStatusInfo(nodeValue, typeOfOperation, statusOfOperation);
        this.addStateOfTreeOperation(dataStructure, propertyInDataStructureToAddState, operationStatusInfo);
    }


    updateStateOfTreeOperation(dataStructure, propertyInDataStructureToAddState, nodeValue, typeOfOperation, statusOfOperation)
    {
        let updatedOperationsStatusInfo = this.createOperationsStatusInfo(nodeValue, typeOfOperation, statusOfOperation);
        this.updateLastStateOfTreeOperation(dataStructure, propertyInDataStructureToAddState, updatedOperationsStatusInfo, typeOfOperation);
    }


    addStateOfTreeOperation(dataStructure, propertyInDataStructureToAddState, operationStatusInfo)
    {
        if (operationStatusInfo.wasUpdated) // skip updating if updatedOperationsStatusInfo was already updated
        {
            throw new Error("Unable to add operation that was already updated");
        }

        if (!dataStructure.hasOwnProperty(propertyInDataStructureToAddState))
        {
            dataStructure[propertyInDataStructureToAddState] = [];
        }

        operationStatusInfo.orderNumberOfOperation = dataStructure[propertyInDataStructureToAddState].length;
        dataStructure[propertyInDataStructureToAddState].push(operationStatusInfo);
    }


    updateLastStateOfTreeOperation(dataStructure, propertyInDataStructureToAddState, updatedOperationsStatusInfo, typeOfOperationToUpdate) // operationsStatusInfo is object with information about operation on tree that was made
    {
        if (updatedOperationsStatusInfo.wasUpdated) // skip updating if updatedOperationsStatusInfo was already updated
        {
            return;
        }

        if (!dataStructure.hasOwnProperty(propertyInDataStructureToAddState) ||
            (dataStructure.hasOwnProperty(propertyInDataStructureToAddState) && dataStructure[propertyInDataStructureToAddState].length === 0))
        {
            throw new Error("Updating should be after operation was done");
        }

        let operationsByType = dataStructure[propertyInDataStructureToAddState]
            .filter(operation => operation.typeOfOperation === typeOfOperationToUpdate);

        if (operationsByType.length === 0)
        {
            throw new Error(`Unable to update operation ${typeOfOperationToUpdate}. Not found any operation with type ${typeOfOperationToUpdate}`);
        }

        let lastOperationByType = operationsByType[operationsByType.length - 1];
        let indexLastOperationByType = lastOperationByType.orderNumberOfOperation;

        if (indexLastOperationByType === null)
        {
            throw new Error(`Operation to update was not found. Operation should be added before updating`);
        }

        if (lastOperationByType.wasUpdated)
        {
            return;
        }

        updatedOperationsStatusInfo.wasUpdated = true;
        updatedOperationsStatusInfo.orderNumberOfOperation = lastOperationByType.orderNumberOfOperation;
        dataStructure[propertyInDataStructureToAddState][indexLastOperationByType] = updatedOperationsStatusInfo;
    }


    // operationsStatusInfo is object with information about operation on tree that was made
    createOperationsStatusInfo(nodeValue, typeOfOperation, statusOfOperation)
    {
        return {
            orderNumberOfOperation: null, // counts from 0
            typeOfOperation: typeOfOperation,
            nodeValue: nodeValue,
            statusOfOperation: statusOfOperation,
            wasUpdated: false,
        };
    }


    writeNewStateOfTreeTraversing(dataStructure, propertyInDataStructureToAddState, nodeValue, typeOfOperation, statusOfOperation)
    {
        let operationStatusInfo = this.createTraversingStatusInfo(nodeValue, typeOfOperation, statusOfOperation);
        this.addStateOfTreeOperation(dataStructure, propertyInDataStructureToAddState, operationStatusInfo);
    }


    updateStateOfTreeTraversing(dataStructure, propertyInDataStructureToAddState, nodeValue, typeOfOperation, statusOfOperation)
    {
        let updatedOperationsStatusInfo = this.createTraversingStatusInfo(nodeValue, typeOfOperation, statusOfOperation);
        this.updateLastStateOfTreeOperation(dataStructure, propertyInDataStructureToAddState, updatedOperationsStatusInfo, typeOfOperation);
    }


    createTraversingStatusInfo(nodeValue, typeOfOperation, statusOfOperation)
    {
        return {
            orderNumberOfOperation: null, // counts from 0
            typeOfOperation: typeOfOperation,
            nodeValue: nodeValue,
            statusOfOperation: statusOfOperation,
            wasUpdated: false,
        };
    }
}