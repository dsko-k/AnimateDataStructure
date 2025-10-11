// states for DataToHtmlTable: added, updated, removed
export class StateOfDataToHtmlTable
{
	constructor()
	{
		this.currentDataTable = [];
		this.previousDataTable = [];
	}


	getCurrentDataTable()
	{
		return this.currentDataTable;
	}


	// private
	setPreviousCurrentDataTable(currentDataTable, previousDataTable)
	{
		this.currentDataTable = currentDataTable;
		this.previousDataTable = previousDataTable;
	}


	getCellsStatuses()
	{
		let stuses = [];

		for (let row = 0; row < this.currentDataTable.length; row++)
		{
			let newRow = [];

			for (let column = 0; column < this.currentDataTable[row].length; column++)
			{
				newRow.push(this.getStatusOfCellForCurrentDataTable(row, column));
			}

			stuses.push(newRow);
		}

		return stuses;
	}


	// privates
	getStatusOfCellForCurrentDataTable(rowIndexStartedFromZeroInHtmlTable, columnIndexStartedFromOneInHtmlTable)
	{
		let cellValueInPreviousDataTable = this.getCellValue(this.previousDataTable, rowIndexStartedFromZeroInHtmlTable, columnIndexStartedFromOneInHtmlTable);
		let cellValueInCurrentDataTable = this.getCellValue(this.currentDataTable, rowIndexStartedFromZeroInHtmlTable, columnIndexStartedFromOneInHtmlTable);

		let toBeAdded = this.isCellToBeAdded(rowIndexStartedFromZeroInHtmlTable, columnIndexStartedFromOneInHtmlTable);
		let toBeUpdated = toBeAdded ? false : this.isCellToBeUpdated(rowIndexStartedFromZeroInHtmlTable, columnIndexStartedFromOneInHtmlTable);
		let toBeRemoved = (toBeAdded || toBeUpdated) ? false : this.isCellToBeRemoved(rowIndexStartedFromZeroInHtmlTable, columnIndexStartedFromOneInHtmlTable);
		let unchanged = !(toBeAdded || toBeUpdated || toBeRemoved);

		let status = {

			cellValueInPreviousDataTable: cellValueInPreviousDataTable,
			cellValueInCurrentDataTable: cellValueInCurrentDataTable,

			rowIndexStartedFromZeroInHtmlTable: rowIndexStartedFromZeroInHtmlTable,
			columnIndexStartedFromOneInHtmlTable: columnIndexStartedFromOneInHtmlTable,

			toBeAdded: toBeAdded,
			toBeUpdated: toBeUpdated,
			toBeRemoved: toBeRemoved,
			unchanged: unchanged,
		}

		return status;
	}


	getRowsWithStatusToBeAdded()
	{
		let cellsStatuses = this.getCellsStatuses(); // DO NOT DELETE COMMENT: 2D-array

		let rowsToBeAdded = [];

		for (let row = 0; row < cellsStatuses.length; row++)
		{
			if (cellsStatuses[row][0].toBeAdded)
			{
				rowsToBeAdded.push(cellsStatuses[row]);
			}
		}

		return rowsToBeAdded;
	}


	getCellValue(dataTable, rowIndexStartedFromZeroInHtmlTable, columnIndexStartedFromOneInHtmlTable)
	{
		this.checkTable(dataTable);

		let cellValue = this.isExistRowIndexInDataTable(rowIndexStartedFromZeroInHtmlTable, dataTable) ?
			dataTable[rowIndexStartedFromZeroInHtmlTable][columnIndexStartedFromOneInHtmlTable] : null;

		return cellValue;
	}


	// was cell added
	isCellToBeAdded(rowIndexStartedFromZeroInHtmlTable, columnIndexStartedFromOneInHtmlTable)
	{
		this.checkTable(this.currentDataTable);

		if (!this.previousDataTable)
		{
			return true;
		}

		let isExistRowInCurrentDataTable = this.isExistRowIndexInDataTable(rowIndexStartedFromZeroInHtmlTable, this.currentDataTable);
		let isExistRowInPreviousDataTable = this.isExistRowIndexInDataTable(rowIndexStartedFromZeroInHtmlTable, this.previousDataTable);

		return isExistRowInCurrentDataTable && !isExistRowInPreviousDataTable;
	}


	// was cell updated
	isCellToBeUpdated(rowIndexStartedFromZeroInHtmlTable, columnIndexStartedFromOneInHtmlTable)
	{
		this.checkTable(this.currentDataTable);

		if (!this.previousDataTable)
		{
			return false;
		}

		let isExistRowInCurrentDataTable = this.isExistRowIndexInDataTable(rowIndexStartedFromZeroInHtmlTable, this.currentDataTable);
		let isExistColumnInCurrentDataTable = this.isExistColumnIndexInDataTable(columnIndexStartedFromOneInHtmlTable, this.currentDataTable);

		let isExistRowInPreviousDataTable = this.isExistRowIndexInDataTable(rowIndexStartedFromZeroInHtmlTable, this.previousDataTable);
		let isExistColumnInPreviousDataTable = this.isExistColumnIndexInDataTable(columnIndexStartedFromOneInHtmlTable, this.previousDataTable);

		return isExistRowInCurrentDataTable && isExistColumnInCurrentDataTable &&
			isExistRowInPreviousDataTable && isExistColumnInPreviousDataTable &&
			this.currentDataTable[rowIndexStartedFromZeroInHtmlTable][columnIndexStartedFromOneInHtmlTable] !== this.previousDataTable[rowIndexStartedFromZeroInHtmlTable][columnIndexStartedFromOneInHtmlTable];
	}


	// was cell removed
	isCellToBeRemoved(rowIndexStartedFromZeroInHtmlTable, columnIndexStartedFromOneInHtmlTable)
	{
		this.checkTable(this.currentDataTable);

		if (!this.previousDataTable)
		{
			return false;
		}

		let isExistRowInCurrentDataTable = this.isExistRowIndexInDataTable(rowIndexStartedFromZeroInHtmlTable, this.currentDataTable);
		let isExistRowInPreviousDataTable = this.isExistRowIndexInDataTable(rowIndexStartedFromZeroInHtmlTable, this.previousDataTable);

		return !isExistRowInCurrentDataTable && isExistRowInPreviousDataTable;
	}


	// rowIndexStartedFromZeroInHtmlTable starts from 0
	isExistRowIndexInDataTable(rowIndexStartedFromZeroInHtmlTable, dataTable)
	{
		return rowIndexStartedFromZeroInHtmlTable >= 0 && rowIndexStartedFromZeroInHtmlTable <= dataTable.length - 1;
	}


	// columnIndexStartedFromOneInHtmlTable starts from 1
	isExistColumnIndexInDataTable(columnIndexStartedFromOneInHtmlTable, dataTable)
	{
		if (dataTable.length === 0)
		{
			return false;
		}

		return columnIndexStartedFromOneInHtmlTable >= 0 && columnIndexStartedFromOneInHtmlTable <= dataTable[0].length - 1;
	}


	checkTable(dataTable)
	{
		if (!dataTable)
		{
			throw new Error("Current data table is incorrect");
		}
	}
}