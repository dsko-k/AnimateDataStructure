import { DataStructureActionInfo } from './DataStructureActionInfo.js';
import { TreeTraversingStatuses } from '../DataStructureOperationsStatuses/TreeTraversingStatuses.js';
import { CustomEventHandlerHtmlTable } from '../CustomEventHandler/CustomEventHandlerHtmlTable.js';
import { TraversingTreeInorder } from '../DatastructureTraversingTypes/TraversingTreeInorder.js';
import { TraversingTreePreorder } from '../DatastructureTraversingTypes/TraversingTreePreorder.js';
import { TraversingTreePostorder } from '../DatastructureTraversingTypes/TraversingTreePostorder.js';

export class AbstractTreeTraversing
{
    constructor(dataStructure)
    {
        this.dataStructure = dataStructure;
        this.propertyInDataStructureToAddState = "traversing";
        this.dataStructureActionInfo = new DataStructureActionInfo(dataStructure, this.propertyInDataStructureToAddState);
        this.treeTraversingStatuses = new TreeTraversingStatuses();
        this.customEventHandlerHtmlTable = new CustomEventHandlerHtmlTable();
    }


    onAddNewEntryToHtmlTableOnVisitedNode(nodeVisited, traversingTreeOperationInstance)
    {
        if (nodeVisited.wasChangedNodeColorAfterVisiting)
        {
            return;
        }

        let typesOfTraversing = this.mapTreeTraversingType(traversingTreeOperationInstance);
        let statusOfTraversing = this.treeTraversingStatuses.statusesOfTraversing.traversed;
        this.dataStructureActionInfo.writeNewEntryAboutActionInTree(nodeVisited.value, typesOfTraversing, statusOfTraversing);
        this.customEventHandlerHtmlTable.dispatchUpdateTableTreeTraversing(this.dataStructure);
    }


    mapTreeTraversingType(traversingTreeOperationInstance)
    {
        let isConditional = this.isConditionalTraversing(traversingTreeOperationInstance);
        let typesOfTraversing = this.treeTraversingStatuses.typesOfTraversing;
        this.mapTraversingTypes = {

            [new TraversingTreeInorder(this.dataStructure).constructor.name]: isConditional ? typesOfTraversing.conditionalTraverseInOrder : typesOfTraversing.traverseInOrder,
            [new TraversingTreePreorder(this.dataStructure).constructor.name]: isConditional ? typesOfTraversing.conditionalTraversePreOrder : typesOfTraversing.traversePreOrder,
            [new TraversingTreePostorder(this.dataStructure).constructor.name]: isConditional ? typesOfTraversing.conditionalTraversePostOrder : typesOfTraversing.traversePostOrder,
        };

        if (!this.mapTraversingTypes.hasOwnProperty(traversingTreeOperationInstance.constructor.name))
        {
            throw new Error(`Incorrect instance of traversing Tree Operation Instance with name: ${traversingTreeOperationInstance.constructor.name}`);
        }

        return this.mapTraversingTypes[traversingTreeOperationInstance.constructor.name];
    }


    // Check is traversing will last until specified value of node is found
    isConditionalTraversing(traversingTreeOperationInstance)
    {
        return !isNaN(traversingTreeOperationInstance.traverseUntillFindValue);
    }


    onAddNewEntryToHtmlTableOnTraversingStarted(traversingTreeOperationInstance)
    {
        let typesOfTraversing = this.mapTreeTraversingType(traversingTreeOperationInstance);
        let statusOfTraversing;
        let traverseUntillFindValue;
        if (isNaN(traversingTreeOperationInstance.traverseUntillFindValue)) // for Unconditional traversing
        {
            statusOfTraversing = this.treeTraversingStatuses.statusesOfTraversing.traversingStarted;
            traverseUntillFindValue = this.treeTraversingStatuses.valueToFindDuringTraversing.unspecifiedValue;;
        }
        else
        {
            statusOfTraversing = this.treeTraversingStatuses.statusesOfTraversing.searchingDuringTraversing;
            traverseUntillFindValue = traversingTreeOperationInstance.traverseUntillFindValue;
        }
        this.dataStructureActionInfo.writeNewEntryAboutActionInTree(traverseUntillFindValue, typesOfTraversing, statusOfTraversing);
        this.customEventHandlerHtmlTable.dispatchUpdateTableTreeTraversing(this.dataStructure);
    }


    onAddNewEntryToHtmlTableOnTraversingEnded(traversingTreeOperationInstance, wasFoundTargetValue)
    {
        let typesOfTraversing = this.mapTreeTraversingType(traversingTreeOperationInstance);
        let statusOfTraversing;
        let traverseUntillFindValue;
        if (isNaN(traversingTreeOperationInstance.traverseUntillFindValue)) // for Unconditional traversing
        {
            statusOfTraversing = this.treeTraversingStatuses.statusesOfTraversing.traversingEnded;
            traverseUntillFindValue = this.treeTraversingStatuses.valueToFindDuringTraversing.unspecifiedValue;
        }
        else // for conditional traversing
        {
            let statuses = this.treeTraversingStatuses.statusesOfTraversing;
            statusOfTraversing = wasFoundTargetValue ? statuses.targetNodeFound : statuses.targetNodeNotFound;
            traverseUntillFindValue = traversingTreeOperationInstance.traverseUntillFindValue;
        }
        this.dataStructureActionInfo.writeNewEntryAboutActionInTree(traverseUntillFindValue, typesOfTraversing, statusOfTraversing);
        this.customEventHandlerHtmlTable.dispatchUpdateTableTreeTraversing(this.dataStructure);
    }
}