import { AbstractTreeOperation } from './AbstractTreeOperation.js';

// Writes entries about the next operations: add, find, delete, relocate, rotate, recoloring, fix RBT properties
export class BinarySearchTreeOperation extends AbstractTreeOperation
{
    constructor(dataStructure)
    {
        super(dataStructure);
    }
}