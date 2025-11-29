
// Computes all values for style or @keyframe, or @property via pattern Strategy
export class ContextCssEntityCalculator // Context
{
    constructor(cssEntityCalculator)
    {
        this.cssEntityCalculator = cssEntityCalculator;
    }


    getCssEntityNewName(isForNodeToAnimate)
    {
        return this.cssEntityCalculator.calculateEntityName(isForNodeToAnimate);
    }


    getComputedValue(keyName, persentage)
    {
        this.cssEntityCalculator.checkKeyNameCorrectness(keyName);

        if (this.isValueToCalculate(keyName))
        {
            let nameOfCalculator = this.cssEntityCalculator.combineNameOfCalculator(keyName);
            this.checkIsCalculatorFound(keyName);

            return Object.getPrototypeOf(this.cssEntityCalculator)[nameOfCalculator].call(this.cssEntityCalculator, keyName, persentage);
        }
        else
        {
            return this.cssEntityCalculator.getCurrentValue(this.keyframePrototypeName, keyName, persentage);
        }
    }


    getComputedKey(keyName, persentage)
    {
        return this.cssEntityCalculator.calculateKeyContains(keyName, persentage);
    }


    isValueToCalculate(keyName)
    {
        return this.cssEntityCalculator.isValueToCalculate(keyName);
    }


    checkIsCalculatorFound(keyName)
    {
        let nameOfCalculator = this.cssEntityCalculator.combineNameOfCalculator(keyName);

        if (!Object.getPrototypeOf(this.cssEntityCalculator).hasOwnProperty(nameOfCalculator))
        {
            throw new Error(`Unable to calculate value of the property '${keyName}'. Function-calculator for of the property '${keyName}' was not found in the class '${this.constructor.name}'`);
        }
    }
}