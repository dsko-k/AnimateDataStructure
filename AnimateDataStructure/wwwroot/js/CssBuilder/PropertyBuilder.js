import { ContextCssEntityCalculator } from '../CssEntityCalculator/ContextCssEntityCalculator.js';

export class PropertyBuilder
{
    constructor(tree, propertyCalculatorOperation)
    {
        this.tree = tree;
        this.propertyCalculatorOperation = propertyCalculatorOperation;
        this.contextCssEntityCalculator = new ContextCssEntityCalculator(this.propertyCalculatorOperation);
        this.propertyEntityKeyToUpdate = "initial-value"; // added ????????????
        //this.isKeyframeUpdated = false;
        //this.keyframeBeforeUpdate = [];
        //this.keyframeAfterUpdate = [];
    }


    buildNewPropertyEntity(refactoredStepAnimation)
    {
        let newPropertyEntityName = this.getNewPropertyEntityName(refactoredStepAnimation);

        if (!this.isExistPropertyEntity(newPropertyEntityName)) // create new style class
        {
            this.propertyCalculatorOperation.propertyTextHandler.copyPropertyEntity(this.propertyCalculatorOperation.propertyPrototypeName, newPropertyEntityName);
        }
    }


    // ????
    buildUpdatedPropertyEntity(refactoredStepAnimation)
    {
        let updatingPropertyEntityName = this.getNewPropertyEntityName(refactoredStepAnimation);

        if (!updatingPropertyEntityName)
        {
            throw new Error(`@property name has undefined value`);
        }

        if (this.contextCssEntityCalculator.isValueToCalculate(this.propertyEntityKeyToUpdate))
        {
            let newValue = this.contextCssEntityCalculator.getComputedValue(this.propertyEntityKeyToUpdate);

            this.propertyCalculatorOperation.propertyTextHandler.updateValue(updatingPropertyEntityName, this.propertyEntityKeyToUpdate, newValue);
        }
    }


    // PRIVATE

    isExistPropertyEntity(propertyEntityName)
    {
        return this.propertyCalculatorOperation.propertyTextHandler.isExistPropertyEntity(propertyEntityName);
    }


    // ?????
    getNewPropertyEntityName(refactoredStepAnimation)
    {
        return this.contextCssEntityCalculator.getCssEntityNewName(refactoredStepAnimation.nodesInfoStepAnimation.applyStepToNodeToAnimate);
    }

}