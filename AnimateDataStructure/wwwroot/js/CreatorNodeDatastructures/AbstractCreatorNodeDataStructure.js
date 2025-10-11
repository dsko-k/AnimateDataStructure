export class AbstractCreatorNodeDataStructure
{
    constructor(tree)
    {
        this.tree = tree;
    }


    throwErrorDataStructure(dataStructure)
    {
        throw new Error(`Unable to create node instance. ${dataStructure} is incorrect data structure`);
    }
}