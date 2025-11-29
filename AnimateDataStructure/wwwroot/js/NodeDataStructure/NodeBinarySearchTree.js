import { AbstractNodeTree } from './AbstractNodeTree.js';

export class NodeBinarySearchTree extends AbstractNodeTree
{
    constructor(value)
    {
        super(value);
        this.value = value;
    }
}