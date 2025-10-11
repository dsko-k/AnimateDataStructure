import { AbstractCreatorNodeDataStructure } from './AbstractCreatorNodeDataStructure.js';
import { Heap } from '../DatastructuresModels/Heap.js';
import { NodeHeap } from '../NodeDataStructure/NodeHeap.js';

export class CreatorNodeHeap extends AbstractCreatorNodeDataStructure
{
    constructor(dataStructure, isMaxHeap)
    {
        super(dataStructure);
        this.dataStructure = dataStructure;
        this.isMaxHeap = isMaxHeap;
    }


    createNodeInstance(value)
    {
        if (this.dataStructure instanceof Heap)
        {
            return new NodeHeap(value, this.isMaxHeap);
        }

        this.throwErrorDataStructure(this.dataStructure);
    }
}