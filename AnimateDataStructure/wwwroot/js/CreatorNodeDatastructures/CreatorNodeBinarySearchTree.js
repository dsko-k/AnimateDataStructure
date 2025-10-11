import { AbstractCreatorNodeDataStructure } from './AbstractCreatorNodeDataStructure.js';
import { BinarySearchTree } from '../DatastructuresModels/BinarySearchTree.js';
import { NodeBinarySearchTree } from '../NodeDataStructure/NodeBinarySearchTree.js';

export class CreatorNodeBinarySearchTree extends AbstractCreatorNodeDataStructure
{
    constructor(dataStructure)
    {
        super(dataStructure);
        this.dataStructure = dataStructure;
    }


    createNodeInstance(value)
    {
        if (this.dataStructure instanceof BinarySearchTree)
        {
            return new NodeBinarySearchTree(value);
        }

        this.throwErrorDataStructure(this.dataStructure);
    }
}