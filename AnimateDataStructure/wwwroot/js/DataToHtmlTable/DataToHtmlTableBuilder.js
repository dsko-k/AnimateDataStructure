// Build data to pass to html-table
export class DataToHtmlTableBuilder // Builder
{
    buildRow(rowObject)
    {
        let row = [];

        let keysInRowObject = Object.keys(rowObject);

        keysInRowObject.forEach(key =>
        {
            let cellInRow = this.convertToString(rowObject[key]);

            row.push(cellInRow);
        });

        return row;
    }


    convertToString(value)
    {
        return typeof value !== "string" ? `${value}` : value;
    }


    getAmountOfEnriesInConfigurationObject(configurationObject)
    {
        return Object.keys(configurationObject).length;
    }

}