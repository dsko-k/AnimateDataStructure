export class DataToHtmlTableConfigurationAttributesReaderHeap
{
    // for table with tree characteristics
    getDataTableToHtmlTableConfigurationsForTreeCharacteristics(dataStructure)
    {
        const dataToHtmlTableAttributes = {

            tableTitle: dataStructure.isMaxHeap ? "Max Heap Characteristics" : "Min Heap Characteristics",
            idTable: "idTableTreeCharacteristics",
            idTableContainer: "idTableTreeCharacteristicsContainer",
            idTableSearchInput: "idTableTreeCharacteristicsSearchInput",
            idTableResizerVerticalContainer: "idTableTreeCharacteristicsResizerVerticalContainer",
            idTableResizerBottomHorizontalContainer: "idTableTreeCharacteristicsResizerBottomHorizontalContainer",

            tableHeaderAttributes: {

                column1: "Tree charecteristic",
                column2: "Value",
            },

            // key is field name of tree variable - value is a title in the table
            dataStructureFieldsTitlesAttributes: {

                isMaxHeap: "Is Max Heap",
                alignedTimes: "Alignments in tree",
                currentAmountOfNodesInTree: "Nodes in tree",
                lastAddedNode: "The last added node value",
                lastDeletedNode: "The last deleted node value",
                root: "Root node value",
                totalAddedNodes: "Added nodes",
                treeLevels: "Levels in tree",
                lastClickedNode: "Last clicked node",
            },

            configureTableRowsObject()
            {
                return {

                    row0: {
                        column1: this.dataStructureFieldsTitlesAttributes.isMaxHeap,
                        column2: dataStructure.isMaxHeap,
                    },
                    row1: {
                        column1: this.dataStructureFieldsTitlesAttributes.alignedTimes,
                        column2: dataStructure.alignedTimes,
                    },
                    row2: {
                        column1: this.dataStructureFieldsTitlesAttributes.currentAmountOfNodesInTree,
                        column2: dataStructure.currentAmountOfNodesInTree,
                    },
                    row3: {
                        column1: this.dataStructureFieldsTitlesAttributes.lastAddedNode,
                        column2: !dataStructure.lastAddedNode ? "-" : dataStructure.lastAddedNode.value,
                    },
                    row4: {
                        column1: this.dataStructureFieldsTitlesAttributes.lastDeletedNode,
                        column2: !dataStructure.lastDeletedNode ? "-" : dataStructure.lastDeletedNode.value,
                    },
                    row5: {
                        column1: this.dataStructureFieldsTitlesAttributes.root,
                        column2: !dataStructure.root ? "-" : dataStructure.root.value,
                    },
                    row6: {
                        column1: this.dataStructureFieldsTitlesAttributes.totalAddedNodes,
                        column2: dataStructure.totalAddedNodes,
                    },
                    row7: {
                        column1: this.dataStructureFieldsTitlesAttributes.treeLevels,
                        column2: dataStructure.treeLevels,
                    },
                    row8: {
                        column1: this.dataStructureFieldsTitlesAttributes.lastClickedNode,
                        column2: !dataStructure.treeViewState.lastClickedNode ? "-" : dataStructure.treeViewState.lastClickedNode.value,
                    },
                };
            },
        };

        return dataToHtmlTableAttributes;
    }


    // for table with logging operations on tree: add node, find node, delete node, traversing node, conditionally traversing node
    getDataTableToHtmlTableConfigurationsForTreeOperations(dataStructure)
    {
        const dataToHtmlTableAttributes = {

            tableTitle: dataStructure.isMaxHeap ? "Operations in Max Heap" : "Operations in Min Heap",
            idTable: "idTableTreeOperations",
            idTableContainer: "idTableTreeOperationsContainer",
            idTableSearchInput: "idTableTreeOperationsSearchInput",
            idTableResizerVerticalContainer: "idTableTreeOperationsResizerVerticalContainer",
            idTableResizerBottomHorizontalContainer: "idTableTreeOperationsResizerBottomHorizontalContainer",

            tableHeaderAttributes: {

                column1: "Operation",
                column2: "Node value",
                column3: "Status",
            },

            configureTableRowsObject()
            {
                let rowCounter = 0;
                let tableRowsObject = {};
                if (!dataStructure.operations)
                {
                    return tableRowsObject; // {}
                }
                dataStructure.operations.forEach(operation =>
                {
                    tableRowsObject[`row${rowCounter++}`] = {

                        column1: operation.typeOfOperation,
                        column2: operation.nodeValue,
                        column3: operation.statusOfOperation,
                    };
                });

                return tableRowsObject;
            },
        };

        return dataToHtmlTableAttributes;
    }

    // for table about all types traversing tree
    getDataTableToHtmlTableConfigurationsForTreeTraversing(dataStructure)
    {
        const dataToHtmlTableAttributes = {

            tableTitle: dataStructure.isMaxHeap ? "Traversing Max Heap" : "Traversing Min Heap",
            idTable: "idTableTreeTraversing",
            idTableContainer: "idTableTreeTraversingContainer",
            idTableSearchInput: "idTableTreeTraversingSearchInput",
            idTableResizerVerticalContainer: "idTableTreeOperationsResizerVerticalContainer",
            idTableResizerBottomHorizontalContainer: "idTableTreeOperationsResizerBottomHorizontalContainer",

            tableHeaderAttributes: {

                column1: "Traversing type",
                column2: "Node value",
                column3: "Status",
            },

            configureTableRowsObject()
            {
                let rowCounter = 0;
                let tableRowsObject = {};
                if (!dataStructure.traversing)
                {
                    return tableRowsObject; // {}
                }
                dataStructure.traversing.forEach(traversingOperation =>
                {
                    tableRowsObject[`row${rowCounter++}`] = {

                        column1: traversingOperation.typeOfOperation,
                        column2: traversingOperation.nodeValue,
                        column3: traversingOperation.statusOfOperation,
                    };
                });

                return tableRowsObject;
            },
        };

        return dataToHtmlTableAttributes;
    }


    // for table with node info
    getDataTableToHtmlTableConfigurationsForNodeInfo(dataStructure)
    {
        const dataToHtmlTableAttributes = {

            tableTitle: "Node info (click on node to see)",
            idTable: "idTableNodeInfo",
            idTableContainer: "idTableNodeInfoContainer",
            idTableSearchInput: "idTableNodeInfoSearchInput",
            idTableResizerVerticalContainer: "idTableNodeInfoResizerVerticalContainer",
            idTableResizerBottomHorizontalContainer: "idTableNodeInfoResizerBottomHorizontalContainer",

            tableHeaderAttributes: {

                column1: "Node",
                column2: "Info",
            },

            // key is field name of tree variable - value is a title in the table
            dataStructureFieldsTitlesAttributes: {

                value: "Node value",
                parentNode: "Parent of node",
                leftChild: "Left child",
                rightChild: "Right child",
                levelInTree: "Node placed at level",
                orderNumber: "Order number of node",
                xCoordinate: "X-coordinate",
                yCoordinate: "Y-coordinate",
                isLeftChild: "Is node a left child",
            },

            configureTableRowsObject()
            {
                let valueOfNodeThatWasClickedLastTime = dataStructure.treeViewState.valueOfNodeThatWasClickedLastTime;
                let nodeThatWasClickedLastTime = dataStructure.findNode(valueOfNodeThatWasClickedLastTime);
                if (!nodeThatWasClickedLastTime)
                {
                    return {};
                }
                return {

                    row0: {
                        column1: this.dataStructureFieldsTitlesAttributes.value,
                        column2: nodeThatWasClickedLastTime.value,
                    },
                    row1: {
                        column1: this.dataStructureFieldsTitlesAttributes.parentNode,
                        column2: nodeThatWasClickedLastTime.parentNode ? nodeThatWasClickedLastTime.parentNode.value : "null",
                    },
                    row2: {
                        column1: this.dataStructureFieldsTitlesAttributes.leftChild,
                        column2: nodeThatWasClickedLastTime.leftChild ? nodeThatWasClickedLastTime.leftChild.value : "null",
                    },
                    row3: {
                        column1: this.dataStructureFieldsTitlesAttributes.rightChild,
                        column2: nodeThatWasClickedLastTime.rightChild ? nodeThatWasClickedLastTime.rightChild.value : "null",
                    },
                    row4: {
                        column1: this.dataStructureFieldsTitlesAttributes.levelInTree,
                        column2: nodeThatWasClickedLastTime.levelInTree,
                    },
                    row5: {
                        column1: this.dataStructureFieldsTitlesAttributes.orderNumber,
                        column2: nodeThatWasClickedLastTime.orderNumber,
                    },
                    row6: {
                        column1: this.dataStructureFieldsTitlesAttributes.xCoordinate,
                        column2: nodeThatWasClickedLastTime.xCoordinate,
                    },
                    row7: {
                        column1: this.dataStructureFieldsTitlesAttributes.yCoordinate,
                        column2: nodeThatWasClickedLastTime.yCoordinate,
                    },
                    row8: {
                        column1: this.dataStructureFieldsTitlesAttributes.isLeftChild,
                        column2: nodeThatWasClickedLastTime.isLeftChild,
                    },
                };
            },
        };

        return dataToHtmlTableAttributes;
    }
}