import { DomUpdater } from '../HtmlDomElementHandler/DomUpdater.js';

export class AbstractCssEntityCalculator  // Common operations with each entity of style entities
{
    constructor(tree, refactoredStepAnimation, allStepAnimation)
    {
        this.tree = tree;
        this.refactoredStepAnimation = refactoredStepAnimation;
        this.allStepAnimation = allStepAnimation;
        this.domUpdater = new DomUpdater();
    }

    // calculate the name of style entity
    nodeIdentifierName(isForNodeToAnimate)
    {
        if (!isForNodeToAnimate)
        {
            return this.refactoredStepAnimation.nodesInfoStepAnimation.relativeNodeToAnimateAccross.nodeId;
        }

        return this.refactoredStepAnimation.nodesInfoStepAnimation.nodeToAnimate.nodeId;
    }


    combineNameOfCalculator(keyName)
    {
        this.checkKeyNameCorrectness(keyName);

        let dashPosition = keyName.indexOf('-');

        while (dashPosition != -1)
        {
            let keyNameBeforeDash = keyName.substring(0, dashPosition);
            let keyNameCharacterAfterDash = keyName.substring(dashPosition + 1)[0].toUpperCase();
            let keyNameRestPart = keyName.substring(dashPosition + 2);

            keyName = keyNameBeforeDash + keyNameCharacterAfterDash + keyNameRestPart;

            dashPosition = keyName.indexOf('-', dashPosition);
        }

        let nameOfCalculator = 'calculate' + keyName.toUpperCase()[0] + keyName.substring(1);

        return nameOfCalculator;
    }


    isValueToCalculate(keyName)
    {
        this.checkKeyNameCorrectness(keyName);

        return keyName.length > 1 && keyName[0] === "-" && keyName[1] === "-";
    }


    checkKeyNameCorrectness(keyName)
    {
        if (keyName === "" || !keyName)
        {
            throw new Error("Unable to calculate value for the key of CSS entity. Key to calculate is empty or undefined");
        }
    }

}