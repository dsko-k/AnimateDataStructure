import { AbstractCreatorNodeDataStructure } from './AbstractCreatorNodeDataStructure.js';
import { AvlTree } from '../DatastructuresModels/AvlTree.js';
import { NodeAvlTree } from '../NodeDataStructure/NodeAvlTree.js';

export class CreatorNodeAvlTree extends AbstractCreatorNodeDataStructure
{
    constructor(dataStructure)
    {
        super(dataStructure);
        this.dataStructure = dataStructure;
    }


    createNodeInstance(value)
    {
        if (this.dataStructure instanceof AvlTree)
        {
            return new NodeAvlTree(value);
        }

        this.throwErrorDataStructure(this.dataStructure);
    }
}