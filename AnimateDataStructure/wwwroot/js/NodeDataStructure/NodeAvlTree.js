import { NodeBinarySearchTree } from './NodeBinarySearchTree.js';

export class NodeAvlTree extends NodeBinarySearchTree
{
    constructor(value)
    {
        super(value);
        this.value = value;
        this.balanceFactor = 0;
        this.nodeHeight = 0; // max depth between node subtrees
    }
}