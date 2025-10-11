import { AbstractNodeTree } from './AbstractNodeTree.js';

export class NodeHeap extends AbstractNodeTree
{
    constructor(value, isMaxHeap)
    {
        super(value);
        this.isMaxHeap = isMaxHeap;
    }
}