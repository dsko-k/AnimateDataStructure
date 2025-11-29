import { BinarySearchTree } from '../DatastructuresModels/BinarySearchTree.js';
import { AvlTree } from '../DatastructuresModels/AvlTree.js';
import { Heap } from '../DatastructuresModels/Heap.js';
import { RedBlackTree } from '../DatastructuresModels/RedBlackTree.js';
import { DataToHtmlTableConfigurationAttributesReaderBinarySearchTree } from '../HtmlConfigurationAttributes/DataToHtmlTableConfigurationAttributesReaderBinarySearchTree.js';
import { DataToHtmlTableConfigurationAttributesReaderAvlTree } from '../HtmlConfigurationAttributes/DataToHtmlTableConfigurationAttributesReaderAvlTree.js';
import { DataToHtmlTableConfigurationAttributesReaderHeap } from '../HtmlConfigurationAttributes/DataToHtmlTableConfigurationAttributesReaderHeap.js';
import { DataToHtmlTableConfigurationAttributesReaderRedBlackTree } from '../HtmlConfigurationAttributes/DataToHtmlTableConfigurationAttributesReaderRedBlackTree.js';

// ---------- Pattern Strategy DataToHtmlTableConfigurationAttributesReader ----------
export class ContextDataToHtmlTableConfigurationAttributesReader
{
    constructor(dataStructure)
    {
        this.dataStructure = dataStructure;
        this.dataStructureInstanceDataToHtmlTableConfiguration = {
            [new BinarySearchTree().constructor.name]: new DataToHtmlTableConfigurationAttributesReaderBinarySearchTree(),
            [new AvlTree().constructor.name]: new DataToHtmlTableConfigurationAttributesReaderAvlTree(),
            [new Heap().constructor.name]: new DataToHtmlTableConfigurationAttributesReaderHeap(),
            [new RedBlackTree().constructor.name]: new DataToHtmlTableConfigurationAttributesReaderRedBlackTree(),
        };
        this.dataToHtmlTableConfigurationAttributesReader = this.computeInstanceDataToHtmlTableConfigurationAttributesReader(this.dataStructure);
    }


    // compute instance of dataToHtmlTableConfigurationAttributesReader instead parameter
    computeInstanceDataToHtmlTableConfigurationAttributesReader(dataStructure)
    {
        if (!this.dataStructureInstanceDataToHtmlTableConfiguration.hasOwnProperty(dataStructure.constructor.name))
        {
            throw new Error(`Incorrect instance of datastructure with name ${dataStructure.constructor.name}`);
        }

        return this.dataStructureInstanceDataToHtmlTableConfiguration[dataStructure.constructor.name];
    }


    // for table with TreeCharacteristics
    createDataTableToHtmlTableConfigurationsForTreeCharacteristics(dataStructure)
    {
        return this.dataToHtmlTableConfigurationAttributesReader.getDataTableToHtmlTableConfigurationsForTreeCharacteristics(dataStructure);
    }


    // for table with log of operations on tree: add, delete, find...
    createDataTableToHtmlTableConfigurationsForTreeOperations(dataStructure)
    {
        return this.dataToHtmlTableConfigurationAttributesReader.getDataTableToHtmlTableConfigurationsForTreeOperations(dataStructure);
    }


    // for table about all types traversing tree
    createDataTableToHtmlTableConfigurationsForTreeTraversing(dataStructure)
    {
        return this.dataToHtmlTableConfigurationAttributesReader.getDataTableToHtmlTableConfigurationsForTreeTraversing(dataStructure);
    }


    // for table with node info
    createDataTableToHtmlTableConfigurationsForNodeInfo(dataStructure)
    {
        return this.dataToHtmlTableConfigurationAttributesReader.getDataTableToHtmlTableConfigurationsForNodeInfo(dataStructure);
    }
}