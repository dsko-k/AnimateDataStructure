import { KeyframeTextHandler } from '../CssHandlers/KeyframeTextHandler.js';
import { AbstractCssEntityCleaner } from './AbstractCssEntityCleaner.js';

export class KeyframeCleaner extends AbstractCssEntityCleaner
{
    constructor()
    {
        super();
        this.keyframeTextHandler = new KeyframeTextHandler();
    }


    // remove keyframes
    removeCssEntities(node, elementName)
    {
        if (!this.domUpdater.isExistDomElement(node, elementName))
        {
            throw new Error(`Unable to remove animation for node with nodeId = '${node.nodeId}' and elementName = '${elementName}'. It does not exist`);
        }

        let animationNamesToRemove = this.domUpdater.getAnimationNames(node, elementName);

        animationNamesToRemove.forEach(keyframeNameToRemove =>
        {
            let isExistKeyframe = this.keyframeTextHandler.isExistKeyframe(keyframeNameToRemove);

            if (!isExistKeyframe)
            {
                throw new Error(`Unable to remove keyframe '${keyframeNameToRemove}'. It does not exist `);
            }

            this.keyframeTextHandler.deleteKeyframe(keyframeNameToRemove);
        });
    }

}