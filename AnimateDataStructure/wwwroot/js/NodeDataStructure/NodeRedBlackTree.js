import { NodeAvlTree } from './NodeAvlTree.js';

export class NodeRedBlackTree extends NodeAvlTree
{
    constructor(value)
    {
        super(value);
        this.value = value;
        this.isNodeRed = true;
        this.isNodeToBeRotatedWithAncestors = false;
    }


    changeNodeColorToOpposite()
    {
        this.isNodeRed = !this.isNodeRed;
    }
}