import { ContextCssEntityCalculator } from '../CssEntityCalculator/ContextCssEntityCalculator.js';

export class StyleClassBuilder // ConcreteBuilder for Style class
{
    constructor(tree, styleClassCalculatorOperation)
    {
        this.tree = tree;
        this.styleClassCalculatorOperation = styleClassCalculatorOperation;
        this.contextCssEntityCalculator = new ContextCssEntityCalculator(this.styleClassCalculatorOperation);

        this.isStyleClassUpdated = false;
        this.styleClassBeforeUpdate;
        this.styleClassAfterUpdate;
    }


    buildNewStyleClass(refactoredStepAnimation)
    {
        let newStyleClassName = this.getNewStyleClassName(refactoredStepAnimation);

        if (!this.isExistStyleClass(newStyleClassName)) // create new style class
        {
            this.styleClassCalculatorOperation.styleClassTextHandler.copyStyleClass(this.styleClassCalculatorOperation.styleClassPrototypeName, newStyleClassName);
        }
        else
        {
            this.isStyleClassUpdated = true;
        }
    }

    // TO DO: remove to Base class
    writeStyleClassState(refactoredStepAnimation, isBeforeUpdate)
    {
        let newStyleClassName = this.getNewStyleClassName(refactoredStepAnimation);

        if (isBeforeUpdate && !this.isExistStyleClass(newStyleClassName))
        {
            this.styleClassBeforeUpdate = this.getStyleClassContent(this.styleClassCalculatorOperation.styleClassPrototypeName);
        }
        else if (isBeforeUpdate && this.isExistStyleClass(newStyleClassName))
        {
            this.styleClassBeforeUpdate = this.getStyleClassContent(newStyleClassName);
        }
        else
        {
            this.styleClassAfterUpdate = this.getStyleClassContent(newStyleClassName);
        }
    }


    buildUpdatedStyleClass(refactoredStepAnimation)
    {
        let updatingStyleClassName = this.getNewStyleClassName(refactoredStepAnimation);

        if (!updatingStyleClassName)
        {
            throw new Error(`Style class name has undefined value`);
        }

        let keysToUpdate = this.getKeysToUpdate(refactoredStepAnimation, updatingStyleClassName);

        keysToUpdate.forEach(styleKeyToUpdate =>
        {
            this.updateStyleClassValue(updatingStyleClassName, styleKeyToUpdate);
        });
    }


    // PRIVATE

    // MOVE TO BASE CLASS

    getKeysToUpdate(refactoredStepAnimation, updatingStyleClassName)
    {
        let keysToUpdate = refactoredStepAnimation.styleClassPrototypeStepAnimation.styleKeysToUpdate;

        if (!keysToUpdate)
        {
            let allKeys = this.styleClassCalculatorOperation.styleClassTextHandler.getStyleKeys(updatingStyleClassName).map(entry => entry.styleKey);

            return allKeys.filter(key => key.includes("--"));
        }

        return keysToUpdate;
    }


    isExistStyleClass(styleClassName)
    {
        return this.styleClassCalculatorOperation.styleClassTextHandler.isExistStyleClass(styleClassName);
    }

    // PRIVATE MOVE TO BASE CLASS
    getNewStyleClassName(refactoredStepAnimation)
    {
        return this.contextCssEntityCalculator.getCssEntityNewName(refactoredStepAnimation.nodesInfoStepAnimation.applyStepToNodeToAnimate);
    }


    // PRIVATE MOVE TO BASE CLASS
    getStyleClassContent(styleClassName)
    {
        return this.styleClassCalculatorOperation.styleClassTextHandler.getStyleClass(styleClassName);
    }


    // update value of Style class by name of its key
    // private
    updateStyleClassValue(updatingStyleClassName, styleKeyToUpdate)
    {
        if (this.contextCssEntityCalculator.isValueToCalculate(styleKeyToUpdate))
        {
            let newValue = this.contextCssEntityCalculator.getComputedValue(styleKeyToUpdate);

            if (newValue === null || newValue === undefined)
            {
                throw new Error(`Key ${styleKeyToUpdate} for style class ${updatingStyleClassName} has undefined value to update. Check calculator and persentage to get correct value`);
            }

            this.styleClassCalculatorOperation.styleClassTextHandler.updateValue(updatingStyleClassName, styleKeyToUpdate, newValue);
        }
    }

}