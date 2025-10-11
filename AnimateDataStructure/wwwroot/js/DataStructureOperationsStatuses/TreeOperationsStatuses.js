export class TreeOperationsStatuses
{
    constructor()
    {
        this.typesOfOperations = {

            addNode: "Add node",
            findNode: "Find node",
            findSuccessorNode: "Find successor of deleted node",
            findHeapNodeBeforeDeletion: "Find node to be deleted",
            findHeapLastBottomNode: "Find last bottom node",
            deleteNode: "Delete node",
            relocateSuccessorOnNodeToDelete: "Replace deleted node with successor",
            replaceNodeToDeleteWithLastBottomNode: "Replace deleted node with last bottom node", // for Heap
            fixRedBlackTreeProperties: "Fix Red-Black Tree Properties",
            balanceNodes: "Balance nodes",
            rotateNode: "Rotate node with its ancestors",
            recolorNode: "Recolor node",
            heapify: "Heapify to restore heap properties",
        };

        this.statusesOfOperation = {

            addition: "Addition...",
            searching: "Searching...",
            added: "Added",
            deleting: "Deleting...",
            notAdded: "Rejected",
            found: "Found",
            notFound: "Not found",
            balancing: "Balancing...",
            balanced: "Balanced",
            rotation: "Rotation...",
            rotated: "Rotated",
            rotateLeftLeft: "Left-Left rotation",
            rotateRightRight: "Right-Right rotation",
            rotateLeftRight: "Left-Right rotation",
            rotateRightLeft: "Right-Left rotation",
            relocationSuccessor: "Successor relocation...",
            successorRelocated: "Relocated",
            replacingNodeToDelete: "Replacing...", // for Heap
            replacedNodeToDelete: "Replaced", // for Heap
            deleted: "Deleted",
            notDeleted: "Not deleted (node not found)",
            replaced: "Replaced",
            redColorAfterRecolor: `Recolored to Red`,
            blackColorAfterRecolor: `Recolored to Black`,
            heapifying: "Heapifying...",
            heapified: "Heapified",
        };


        this.causeOfRotationInRedBlackTree = {

            siblingIsRed: `Its Sibling node is Red`,
            siblingIsBlackAndHasAtLeastOneRedChild: `Its Sibling is Black & has at least 1 Red child`,
            uncleIsBlack: `Its Uncle node is Black`,
            siblingIsBlackAndHasTwoRedChildren: `Its Sibling is Black & has 2 Red children`, // no need
            siblingIsBlackAndHasOneRedChild: `Its Sibling is Black & has 1 Red child`, // no need
        };


        this.causeOfFixingRedBlackTreeProperties = {

            nodeIsRootDuringAddititon: `Node is root & Red during addititon`,
            uncleNodeIsRedDuringAddititon: `Its Uncle is Red during addititon`,
            siblingIsBlackAndChildrenAreBlack: `Its Sibling is Black & children are Black`,
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


    // TO REMOVE METHODS!!!!!!

    // public
    // write State Of Tree Operation for valid node
    writeNewStateOfTreeOperation(dataStructure, propertyInDataStructureToAddState, nodeValue, typeOfOperation, statusOfOperation)
    {
        let operationStatusInfo = this.createOperationsStatusInfo(nodeValue, typeOfOperation, statusOfOperation);
        this.addStateOfTreeOperation(dataStructure, propertyInDataStructureToAddState, operationStatusInfo);
    }


    // public
    updateStateOfTreeOperation(dataStructure, propertyInDataStructureToAddState, nodeValue, typeOfOperation, statusOfOperation)
    {
        let updatedOperationsStatusInfo = this.createOperationsStatusInfo(nodeValue, typeOfOperation, statusOfOperation);
        this.updateLastStateOfTreeOperation(dataStructure, propertyInDataStructureToAddState, updatedOperationsStatusInfo, typeOfOperation);
    }


    // private

    // add entry to the dataStructure about operation that was made
    addStateOfTreeOperation(dataStructure, propertyInDataStructureToAddState, operationStatusInfo) // operationsStatusInfo is object with information about operation on tree that was made
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

            orderNumberOfOperation: null, // DO NOT DELETE: orderNumberOfOperation counts from 0
            typeOfOperation: typeOfOperation,
            nodeValue: nodeValue,
            statusOfOperation: statusOfOperation,
            wasUpdated: false,
        };
    }



    // For Traversing
    writeNewStateOfTreeTraversing(dataStructure, propertyInDataStructureToAddState, nodeValue, typeOfOperation, statusOfOperation)
    {
        let operationStatusInfo = this.createTraversingStatusInfo(nodeValue, typeOfOperation, statusOfOperation);
        this.addStateOfTreeOperation(dataStructure, propertyInDataStructureToAddState, operationStatusInfo);
    }


    // For Traversing
    updateStateOfTreeTraversing(dataStructure, propertyInDataStructureToAddState, nodeValue, typeOfOperation, statusOfOperation)
    {
        let updatedOperationsStatusInfo = this.createTraversingStatusInfo(nodeValue, typeOfOperation, statusOfOperation);
        this.updateLastStateOfTreeOperation(dataStructure, propertyInDataStructureToAddState, updatedOperationsStatusInfo, typeOfOperation);
    }


    // For Traversing
    createTraversingStatusInfo(nodeValue, typeOfOperation, statusOfOperation)
    {
        return {

            orderNumberOfOperation: null, // DO NOT DELETE: orderNumberOfOperation counts from 0
            typeOfOperation: typeOfOperation,
            nodeValue: nodeValue,
            statusOfOperation: statusOfOperation,
            wasUpdated: false,
        };
    }

}