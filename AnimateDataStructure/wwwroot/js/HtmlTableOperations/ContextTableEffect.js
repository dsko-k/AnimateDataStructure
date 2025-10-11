// ------ A pattern Strategy (State) to add functionality for table: searching, sorting, hovering on row, hovering on header

export class ContextTableEffect
{
    constructor(abstractTableOperationInstance)
    {
        this.abstractTableOperationInstance = abstractTableOperationInstance;
        this.tableId = this.abstractTableOperationInstance.tableId;
    }

    appendTableOperation()
    {
        this.abstractTableOperationInstance.addHandlerForTableOperation();
    }
}