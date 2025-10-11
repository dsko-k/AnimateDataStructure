import { KeyframeTextHandler } from '../CssHandlers/KeyframeTextHandler.js';

export class KeyframesPrototypeStepAnimation
{
    constructor(keyframePrototypeName)
    {
        this.keyframePrototypeName = keyframePrototypeName;
        this.keyframeTextHandler = new KeyframeTextHandler();
        this.keyframePrototype = this.getKeyframePrototype();
        this.keyframePrototypeKeyValues = this.getKeyValues();
    }

    getKeyValues()
    {
        return this.keyframeTextHandler.getParsedKeyframe(this.keyframePrototypeName);
    }

    getKeyframePrototype()
    {
        return this.keyframeTextHandler.getUnparsedKeyframeNameAndBody(this.keyframePrototypeName);
    }
}