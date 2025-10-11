import { AbstractCreatorNodeDataStructure } from './AbstractCreatorNodeDataStructure.js';
import { RedBlackTree } from '../DatastructuresModels/RedBlackTree.js';
import { NodeRedBlackTree } from '../NodeDataStructure/NodeRedBlackTree.js';


export class CreatorNodeRedBlackTree extends AbstractCreatorNodeDataStructure
{
    constructor(dataStructure)
    {
        super(dataStructure);
        this.dataStructure = dataStructure;
    }


    createNodeInstance(value)
    {
        if (this.dataStructure instanceof RedBlackTree)
        {
            return new NodeRedBlackTree(value);
        }

        this.throwErrorDataStructure(this.dataStructure);
    }
}