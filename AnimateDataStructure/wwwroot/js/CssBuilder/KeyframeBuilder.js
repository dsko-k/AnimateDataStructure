import { ContextCssEntityCalculator } from '../CssEntityCalculator/ContextCssEntityCalculator.js';

export class KeyframeBuilder
{
    constructor(tree, keyframeCalculatorOperation)
    {
        this.tree = tree;
        this.keyframeCalculatorOperation = keyframeCalculatorOperation;
        this.contextCssEntityCalculator = new ContextCssEntityCalculator(this.keyframeCalculatorOperation);
        this.isKeyframeUpdated = false;
        this.keyframeBeforeUpdate = [];
        this.keyframeAfterUpdate = [];
    }


    buildNewKeyframe(refactoredStepAnimation)
    {
        let newKeyframeName = this.getNewKeyframeName(refactoredStepAnimation);

        if (!this.isExistKeyframe(newKeyframeName)) // create a new style class
        {
            this.keyframeCalculatorOperation.keyframeTextHandler.copyKeyframe(this.keyframeCalculatorOperation.keyframePrototypeName, newKeyframeName);
        }
        else
        {
            this.isKeyframeUpdated = true;
        }
    }


    writeKeyframeState(refactoredStepAnimation, isBeforeUpdate)
    {
        let newKeyframeName = this.getNewKeyframeName(refactoredStepAnimation);

        if (isBeforeUpdate && !this.isExistKeyframe(newKeyframeName))
        {
            this.keyframeBeforeUpdate.push(this.getKeyframeContent(this.keyframeCalculatorOperation.keyframePrototypeName));
        }
        else if (isBeforeUpdate && this.isExistKeyframe(newKeyframeName))
        {
            this.keyframeBeforeUpdate.push(this.getKeyframeContent(newKeyframeName));
        }
        else
        {
            this.keyframeAfterUpdate.push(this.getKeyframeContent(newKeyframeName));
        }
    }


    buildUpdatedKeyframe(refactoredStepAnimation)
    {
        let updatingKeyframeName = this.getNewKeyframeName(refactoredStepAnimation);

        if (!updatingKeyframeName)
        {
            throw new Error(`Keyframe name has undefined value`);
        }

        let propertiesRelatedWithKeyframe = refactoredStepAnimation.hasOwnProperty("keyframesPrototypeRelatedWithPropertyEntityPrototype") &&
            refactoredStepAnimation["keyframesPrototypeRelatedWithPropertyEntityPrototype"] ?
            refactoredStepAnimation["keyframesPrototypeRelatedWithPropertyEntityPrototype"] : [];

        let persentagesToUpdate = this.keyframeCalculatorOperation.keyframeTextHandler.getAllPersentages(updatingKeyframeName);

        persentagesToUpdate.forEach(currentPersentage =>
        {
            let keysToUpdate = this.keyframeCalculatorOperation.keyframeTextHandler.getKeysByPersentage(updatingKeyframeName, currentPersentage);

            keysToUpdate.forEach(currentKeyToUpdate =>
            {
                this.updateKeyframeValue(updatingKeyframeName, currentPersentage, currentKeyToUpdate); // Update value of @keyframe
            });
        });
    }


    isExistKeyframe(keyframeName)
    {
        return this.keyframeCalculatorOperation.keyframeTextHandler.isExistKeyframe(keyframeName);
    }


    getNewKeyframeName(refactoredStepAnimation)
    {
        return this.contextCssEntityCalculator.getCssEntityNewName(refactoredStepAnimation.nodesInfoStepAnimation.applyStepToNodeToAnimate);
    }


    getKeyframeContent(keyframeName)
    {
        return this.keyframeCalculatorOperation.keyframeTextHandler.getKeyframe(keyframeName);
    }


    // Update value of key in @keyframe
    updateKeyframeValue(keyframeName, persentage, currentKeyName)
    {
        if (!this.contextCssEntityCalculator.isValueToCalculate(currentKeyName))
        {
            return;
        }

        let newValue = this.contextCssEntityCalculator.getComputedValue(currentKeyName, persentage);

        if (!newValue)
        {
            throw new Error(`Key ${currentKeyName} for keyframe ${keyframeName} has undefined value to update. Check calculator and persentage to get correct value`);
        }

        this.keyframeCalculatorOperation.keyframeTextHandler.updateValue(keyframeName, persentage, currentKeyName, newValue);
    }
}