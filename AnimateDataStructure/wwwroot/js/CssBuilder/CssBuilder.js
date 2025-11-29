import { StyleClassBuilder } from './StyleClassBuilder.js';
import { StyleClassCalculatorAddNode } from '../CssEntityCalculator/StyleClassCalculatorAddNode.js';
import { StyleClassCalculatorAlignNodeByWidth } from '../CssEntityCalculator/StyleClassCalculatorAlignNodeByWidth.js';
import { StyleClassCalculatorClickNode } from '../CssEntityCalculator/StyleClassCalculatorClickNode.js';
import { StyleClassCalculatorFindNode } from '../CssEntityCalculator/StyleClassCalculatorFindNode.js';
import { StyleClassCalculatorLinkNodeAction } from '../CssEntityCalculator/StyleClassCalculatorLinkNodeAction.js';
import { StyleClassCalculatorAlignNodeByHeight } from '../CssEntityCalculator/StyleClassCalculatorAlignNodeByHeight.js';
import { StyleClassCalculatorBalancing } from '../CssEntityCalculator/StyleClassCalculatorBalancing.js';
import { StyleClassCalculatorLinkBeforeAfterBalancing } from '../CssEntityCalculator/StyleClassCalculatorLinkBeforeAfterBalancing.js';
import { StyleClassCalculatorTraversingNode } from '../CssEntityCalculator/StyleClassCalculatorTraversingNode.js';
import { StyleClassCalculatorAddRangeOfNodes } from '../CssEntityCalculator/StyleClassCalculatorAddRangeOfNodes.js';
import { StyleClassCalculatorSwapNode } from '../CssEntityCalculator/StyleClassCalculatorSwapNode.js';
import { StyleClassCalculatorLinkBeforeAfterSwapNodes } from '../CssEntityCalculator/StyleClassCalculatorLinkBeforeAfterSwapNodes.js';
import { KeyframeBuilder } from './KeyframeBuilder.js';
import { KeyframeCalculatorAddNode } from '../CssEntityCalculator/KeyframeCalculatorAddNode.js';
import { KeyframeCalculatorAlignNodeByWidth } from '../CssEntityCalculator/KeyframeCalculatorAlignNodeByWidth.js';
import { KeyframeCalculatorClickNode } from '../CssEntityCalculator/KeyframeCalculatorClickNode.js';
import { KeyframeCalculatorFindNode } from '../CssEntityCalculator/KeyframeCalculatorFindNode.js';
import { KeyframeCalculatorLinkNodeAction } from '../CssEntityCalculator/KeyframeCalculatorLinkNodeAction.js';
import { KeyframeCalculatorAlignNodeByHeight } from '../CssEntityCalculator/KeyframeCalculatorAlignNodeByHeight.js';
import { KeyframeCalculatorBalancing } from '../CssEntityCalculator/KeyframeCalculatorBalancing.js';
import { KeyframeCalculatorLinkBeforeAfterBalancing } from '../CssEntityCalculator/KeyframeCalculatorLinkBeforeAfterBalancing.js';
import { KeyframeCalculatorTraversingNode } from '../CssEntityCalculator/KeyframeCalculatorTraversingNode.js';
import { KeyframeCalculatorAddRangeOfNodes } from '../CssEntityCalculator/KeyframeCalculatorAddRangeOfNodes.js';
import { KeyframeCalculatorSwapNode } from '../CssEntityCalculator/KeyframeCalculatorSwapNode.js';
import { KeyframeCalculatorLinkBeforeAfterSwapNodes } from '../CssEntityCalculator/KeyframeCalculatorLinkBeforeAfterSwapNodes.js';


export class CssBuilder // Foreman
{
    constructor(tree, allStepAnimation)
    {
        this.tree = tree;
        this.allStepAnimation = allStepAnimation;
    }

    constructCssAddNode()
    {
        if (!this.allStepAnimation || this.allStepAnimation.length == 0)
        {
            throw new Error(`Steps to animate are empty or undefined`);
        }

        this.constructKeyframeAddNode("keyframesPrototypeMoveNode");
        this.constructStyleClassAddNode();
    }


    constructCssAlignNodeByWidth()
    {
        if (!this.allStepAnimation || this.allStepAnimation.length == 0)
        {
            throw new Error(`Steps to animate are empty or undefined`);
        }

        this.constructKeyframeAlignNodeByWidth("keyframesPrototypeMoveNode");
        this.constructKeyframeAlignNodeByWidth("keyframesPrototypeAnimationLinkContainer");
        this.constructStyleClassAlignNodeByWidth();
    }


    constructCssClickNode()
    {
        if (!this.allStepAnimation || this.allStepAnimation.length == 0)
        {
            throw new Error(`Steps to animate are empty or undefined`);
        }

        this.constructStyleClassClickNode();
        this.constructKeyframeClickNode("keyframesPrototypeBorderRotatorContainer");
        this.constructKeyframeClickNode("keyframesPrototypeShadowBorderRotatorContainer");
        this.constructKeyframeClickNode("keyframesPrototypeGlowingMovingLine");
    }


    constructCssFindNode()
    {
        if (!this.allStepAnimation || this.allStepAnimation.length == 0)
        {
            throw new Error(`Steps to animate are empty or undefined`);
        }

        this.constructKeyframeFindNode("keyframesPrototypeInsideBorder");
        this.constructKeyframeFindNode("keyframesPrototypeMoveNode");
        this.constructStyleClassFindNode();
    }


    constructCssLinkNodeAction()
    {
        if (!this.allStepAnimation || this.allStepAnimation.length == 0)
        {
            throw new Error(`Steps to animate are empty or undefined`);
        }
        this.constructKeyframeLinkNodeAction("keyframesPrototypeSvgLineLink");
        this.constructStyleClassLinkNodeAction();
    }


    constructCssAlignNodeByHeight()
    {
        if (!this.allStepAnimation || this.allStepAnimation.length == 0)
        {
            throw new Error(`Steps to animate are empty or undefined`);
        }

        this.constructKeyframeAlignNodeByHeight("keyframesPrototypeMoveNode");
        this.constructKeyframeAlignNodeByHeight("keyframesPrototypeInsideBorder");// ??????
        this.constructStyleClassAlignNodeByHeight();
    }


    constructCssBalancing()
    {
        if (!this.allStepAnimation || this.allStepAnimation.length == 0)
        {
            throw new Error(`Steps to animate are empty or undefined`);
        }

        this.constructKeyframeBalancing("keyframesPrototypeMoveNode");
        this.constructKeyframeBalancing("keyframesPrototypeAnimationLinkContainer");
        this.constructKeyframeBalancing("keyframesPrototypeInsideBorder");
        this.constructKeyframeBalancing("keyframesPrototypeSvgLineLink");
        this.constructStyleClassBalancing();
    }


    constructCssLinkBeforeAfterBalancing()
    {
        if (!this.allStepAnimation || this.allStepAnimation.length == 0)
        {
            throw new Error(`Steps to animate are empty or undefined`);
        }
        this.constructKeyframeLinkBeforeAfterBalancing("keyframesPrototypeSvgLineLink");
        this.constructStyleClassLinkBeforeAfterBalancing();
    }


    constructCssTraversingNode()
    {
        if (!this.allStepAnimation || this.allStepAnimation.length == 0)
        {
            throw new Error(`Steps to animate are empty or undefined`);
        }

        this.constructKeyframeTraversingNode("keyframesPrototypeMoveNode");
        this.constructStyleClassTraversingNode();
    }


    constructCssAddRangeOfNodes()
    {
        if (!this.allStepAnimation || this.allStepAnimation.length == 0)
        {
            throw new Error(`Steps to animate are empty or undefined`);
        }

        this.constructKeyframeAddRangeOfNodes("keyframesPrototypeMoveNode");
        this.constructStyleClassAddRangeOfNodes();
    }


    constructCssSwapNode()
    {
        if (!this.allStepAnimation || this.allStepAnimation.length == 0)
        {
            throw new Error(`Steps to animate are empty or undefined`);
        }

        this.constructKeyframeSwapNode("keyframesPrototypeMoveNode");
        this.constructKeyframeSwapNode("keyframesPrototypeInsideBorder"); // ??????
        this.constructStyleClassSwapNode();
    }


    constructCssLinkBeforeAfterSwapNodes()
    {
        if (!this.allStepAnimation || this.allStepAnimation.length == 0)
        {
            throw new Error(`Steps to animate are empty or undefined`);
        }
        this.constructKeyframeLinkBeforeAfterSwapNodes("keyframesPrototypeSvgLineLink");
        this.constructStyleClassLinkBeforeAfterSwapNodes();
    }


    constructStyleClassAddNode()
    {
        let stepAnimationObject = this.allStepAnimation.flat()[0].stepAnimationObject;
        let styleClassCalculatorOperation = new StyleClassCalculatorAddNode(this.tree, stepAnimationObject, this.allStepAnimation.flat());
        let styleClassBuilder = new StyleClassBuilder(this.tree, styleClassCalculatorOperation);

        styleClassBuilder.buildNewStyleClass(stepAnimationObject);
        styleClassBuilder.writeStyleClassState(stepAnimationObject, true);
        styleClassBuilder.buildUpdatedStyleClass(stepAnimationObject);
        styleClassBuilder.writeStyleClassState(stepAnimationObject, false);
    }


    constructStyleClassAlignNodeByWidth()
    {
        let stepAnimationObject = this.allStepAnimation.flat()[0].stepAnimationObject;
        let styleClassCalculatorOperation = new StyleClassCalculatorAlignNodeByWidth(this.tree, stepAnimationObject, this.allStepAnimation.flat());
        let styleClassBuilder = new StyleClassBuilder(this.tree, styleClassCalculatorOperation);

        styleClassBuilder.buildNewStyleClass(stepAnimationObject);
        styleClassBuilder.writeStyleClassState(stepAnimationObject, true);
        styleClassBuilder.buildUpdatedStyleClass(stepAnimationObject);
        styleClassBuilder.writeStyleClassState(stepAnimationObject, false);
    }


    constructStyleClassClickNode()
    {
        this.allStepAnimation.flat().forEach(currentStepAnimation =>
        {
            let styleClassCalculatorOperation = new StyleClassCalculatorClickNode(this.tree, currentStepAnimation.stepAnimationObject, this.allStepAnimation.flat());
            let styleClassBuilder = new StyleClassBuilder(this.tree, styleClassCalculatorOperation);

            styleClassBuilder.buildNewStyleClass(currentStepAnimation.stepAnimationObject);
            styleClassBuilder.writeStyleClassState(currentStepAnimation.stepAnimationObject, true);
            styleClassBuilder.buildUpdatedStyleClass(currentStepAnimation.stepAnimationObject);
            styleClassBuilder.writeStyleClassState(currentStepAnimation.stepAnimationObject, false);
        });
    }


    constructStyleClassFindNode()
    {
        let stepAnimationObject = this.allStepAnimation.flat()[0].stepAnimationObject;
        let styleClassCalculatorOperation = new StyleClassCalculatorFindNode(this.tree, stepAnimationObject, this.allStepAnimation.flat());
        let styleClassBuilder = new StyleClassBuilder(this.tree, styleClassCalculatorOperation);

        styleClassBuilder.buildNewStyleClass(stepAnimationObject);
        styleClassBuilder.writeStyleClassState(stepAnimationObject, true);
        styleClassBuilder.buildUpdatedStyleClass(stepAnimationObject);
        styleClassBuilder.writeStyleClassState(stepAnimationObject, false);
    }


    constructStyleClassLinkNodeAction()
    {
        let stepAnimationObject = this.allStepAnimation.flat()[0].stepAnimationObject;
        let styleClassCalculatorOperation = new StyleClassCalculatorLinkNodeAction(this.tree, stepAnimationObject, this.allStepAnimation.flat());
        let styleClassBuilder = new StyleClassBuilder(this.tree, styleClassCalculatorOperation);

        styleClassBuilder.buildNewStyleClass(stepAnimationObject);
        styleClassBuilder.writeStyleClassState(stepAnimationObject, true);
        styleClassBuilder.buildUpdatedStyleClass(stepAnimationObject);
        styleClassBuilder.writeStyleClassState(stepAnimationObject, false);
    }


    constructStyleClassAlignNodeByHeight()
    {
        let stepAnimationObject = this.allStepAnimation.flat()[0].stepAnimationObject;
        let styleClassCalculatorOperation = new StyleClassCalculatorAlignNodeByHeight(this.tree, stepAnimationObject, this.allStepAnimation.flat());
        let styleClassBuilder = new StyleClassBuilder(this.tree, styleClassCalculatorOperation);

        styleClassBuilder.buildNewStyleClass(stepAnimationObject);
        styleClassBuilder.writeStyleClassState(stepAnimationObject, true);
        styleClassBuilder.buildUpdatedStyleClass(stepAnimationObject);
        styleClassBuilder.writeStyleClassState(stepAnimationObject, false);
    }


    // For balancing
    constructStyleClassBalancing()
    {
        let stepAnimationObject = this.allStepAnimation.flat()[0].stepAnimationObject;
        let styleClassCalculatorOperation = new StyleClassCalculatorBalancing(this.tree, stepAnimationObject, this.allStepAnimation.flat());
        let styleClassBuilder = new StyleClassBuilder(this.tree, styleClassCalculatorOperation);

        styleClassBuilder.buildNewStyleClass(stepAnimationObject);
        styleClassBuilder.writeStyleClassState(stepAnimationObject, true);
        styleClassBuilder.buildUpdatedStyleClass(stepAnimationObject);
        styleClassBuilder.writeStyleClassState(stepAnimationObject, false);
    }


    constructStyleClassLinkBeforeAfterBalancing()
    {
        let stepAnimationObject = this.allStepAnimation.flat()[0].stepAnimationObject;
        let styleClassCalculatorOperation = new StyleClassCalculatorLinkBeforeAfterBalancing(this.tree, stepAnimationObject, this.allStepAnimation.flat());
        let styleClassBuilder = new StyleClassBuilder(this.tree, styleClassCalculatorOperation);

        styleClassBuilder.buildNewStyleClass(stepAnimationObject);
        styleClassBuilder.writeStyleClassState(stepAnimationObject, true);
        styleClassBuilder.buildUpdatedStyleClass(stepAnimationObject);
        styleClassBuilder.writeStyleClassState(stepAnimationObject, false);
    }


    constructStyleClassTraversingNode()
    {
        let stepAnimationObject = this.allStepAnimation.flat()[0].stepAnimationObject;
        let styleClassCalculatorOperation = new StyleClassCalculatorTraversingNode(this.tree, stepAnimationObject, this.allStepAnimation.flat());
        let styleClassBuilder = new StyleClassBuilder(this.tree, styleClassCalculatorOperation);

        styleClassBuilder.buildNewStyleClass(stepAnimationObject);
        styleClassBuilder.writeStyleClassState(stepAnimationObject, true);
        styleClassBuilder.buildUpdatedStyleClass(stepAnimationObject);
        styleClassBuilder.writeStyleClassState(stepAnimationObject, false);
    }


    constructStyleClassAddRangeOfNodes()
    {
        let stepAnimationObject = this.allStepAnimation.flat()[0].stepAnimationObject;
        let styleClassCalculatorOperation = new StyleClassCalculatorAddRangeOfNodes(this.tree, stepAnimationObject, this.allStepAnimation.flat());
        let styleClassBuilder = new StyleClassBuilder(this.tree, styleClassCalculatorOperation);

        styleClassBuilder.buildNewStyleClass(stepAnimationObject);
        styleClassBuilder.writeStyleClassState(stepAnimationObject, true);
        styleClassBuilder.buildUpdatedStyleClass(stepAnimationObject);
        styleClassBuilder.writeStyleClassState(stepAnimationObject, false);
    }


    constructStyleClassSwapNode()
    {
        let stepAnimationObject = this.allStepAnimation.flat()[0].stepAnimationObject;
        let styleClassCalculatorOperation = new StyleClassCalculatorSwapNode(this.tree, stepAnimationObject, this.allStepAnimation.flat());
        let styleClassBuilder = new StyleClassBuilder(this.tree, styleClassCalculatorOperation);

        styleClassBuilder.buildNewStyleClass(stepAnimationObject);
        styleClassBuilder.writeStyleClassState(stepAnimationObject, true);
        styleClassBuilder.buildUpdatedStyleClass(stepAnimationObject);
        styleClassBuilder.writeStyleClassState(stepAnimationObject, false);
    }


    constructStyleClassLinkBeforeAfterSwapNodes()
    {
        let stepAnimationObject = this.allStepAnimation.flat()[0].stepAnimationObject;
        let styleClassCalculatorOperation = new StyleClassCalculatorLinkBeforeAfterSwapNodes(this.tree, stepAnimationObject, this.allStepAnimation.flat());
        let styleClassBuilder = new StyleClassBuilder(this.tree, styleClassCalculatorOperation);

        styleClassBuilder.buildNewStyleClass(stepAnimationObject);
        styleClassBuilder.writeStyleClassState(stepAnimationObject, true);
        styleClassBuilder.buildUpdatedStyleClass(stepAnimationObject);
        styleClassBuilder.writeStyleClassState(stepAnimationObject, false);
    }


    // ------------- section of constructKeyframe...(keyframesPrototypePropertyName)

    constructKeyframeAddNode(keyframesPrototypePropertyName)
    {
        this.allStepAnimation.flat().forEach((currentStepAnimation, index) =>
        {
            // 2 arguments in new KeyframeCalculatorAddNode(...) not 3 like in new KeyframeCalculatorTraversingNode(...)
            let keyframeCalculatorOperation = new KeyframeCalculatorAddNode(this.tree, currentStepAnimation.stepAnimationObject, keyframesPrototypePropertyName);
            let keyframeBuilder = new KeyframeBuilder(this.tree, keyframeCalculatorOperation);

            keyframeBuilder.buildNewKeyframe(currentStepAnimation.stepAnimationObject);
            keyframeBuilder.writeKeyframeState(currentStepAnimation.stepAnimationObject, true);
            keyframeBuilder.buildUpdatedKeyframe(currentStepAnimation.stepAnimationObject);
            keyframeBuilder.writeKeyframeState(currentStepAnimation.stepAnimationObject, false);
        });
    }


    constructKeyframeAlignNodeByWidth(keyframesPrototypePropertyName)
    {
        this.allStepAnimation.flat().forEach((currentStepAnimation, index) =>
        {
            let keyframeCalculatorOperation = new KeyframeCalculatorAlignNodeByWidth(this.tree, currentStepAnimation.stepAnimationObject, keyframesPrototypePropertyName);
            let keyframeBuilder = new KeyframeBuilder(this.tree, keyframeCalculatorOperation);

            keyframeBuilder.buildNewKeyframe(currentStepAnimation.stepAnimationObject);
            keyframeBuilder.writeKeyframeState(currentStepAnimation.stepAnimationObject, true);
            keyframeBuilder.buildUpdatedKeyframe(currentStepAnimation.stepAnimationObject);
            keyframeBuilder.writeKeyframeState(currentStepAnimation.stepAnimationObject, false);
        });
    }


    constructKeyframeClickNode(keyframesPrototypePropertyName)
    {
        this.allStepAnimation.flat().forEach((currentStepAnimation, index) =>
        {
            let keyframeCalculatorOperation = new KeyframeCalculatorClickNode(this.tree, currentStepAnimation.stepAnimationObject, keyframesPrototypePropertyName);
            let keyframeBuilder = new KeyframeBuilder(this.tree, keyframeCalculatorOperation);

            keyframeBuilder.buildNewKeyframe(currentStepAnimation.stepAnimationObject);
            keyframeBuilder.writeKeyframeState(currentStepAnimation.stepAnimationObject, true);
            keyframeBuilder.buildUpdatedKeyframe(currentStepAnimation.stepAnimationObject);
            keyframeBuilder.writeKeyframeState(currentStepAnimation.stepAnimationObject, false);
        });
    }


    constructKeyframeFindNode(keyframesPrototypePropertyName)
    {
        this.allStepAnimation.flat().forEach((currentStepAnimation, index) =>
        {
            let keyframeCalculatorOperation = new KeyframeCalculatorFindNode(this.tree, currentStepAnimation.stepAnimationObject, keyframesPrototypePropertyName);
            let keyframeBuilder = new KeyframeBuilder(this.tree, keyframeCalculatorOperation);

            keyframeBuilder.buildNewKeyframe(currentStepAnimation.stepAnimationObject);
            keyframeBuilder.writeKeyframeState(currentStepAnimation.stepAnimationObject, true);
            keyframeBuilder.buildUpdatedKeyframe(currentStepAnimation.stepAnimationObject);
            keyframeBuilder.writeKeyframeState(currentStepAnimation.stepAnimationObject, false);
        });
    }


    constructKeyframeLinkNodeAction(keyframesPrototypePropertyName)
    {
        this.allStepAnimation.flat().forEach((currentStepAnimation, index) =>
        {
            let keyframeCalculatorOperation = new KeyframeCalculatorLinkNodeAction(this.tree, currentStepAnimation.stepAnimationObject, keyframesPrototypePropertyName);
            let keyframeBuilder = new KeyframeBuilder(this.tree, keyframeCalculatorOperation);

            keyframeBuilder.buildNewKeyframe(currentStepAnimation.stepAnimationObject);
            keyframeBuilder.writeKeyframeState(currentStepAnimation.stepAnimationObject, true);
            keyframeBuilder.buildUpdatedKeyframe(currentStepAnimation.stepAnimationObject);
            keyframeBuilder.writeKeyframeState(currentStepAnimation.stepAnimationObject, false);
        });
    }


    constructKeyframeAlignNodeByHeight(keyframesPrototypePropertyName)
    {
        this.allStepAnimation.flat().forEach((currentStepAnimation, index) =>
        {
            let keyframeCalculatorOperation = new KeyframeCalculatorAlignNodeByHeight(this.tree, currentStepAnimation.stepAnimationObject, keyframesPrototypePropertyName);
            let keyframeBuilder = new KeyframeBuilder(this.tree, keyframeCalculatorOperation);

            keyframeBuilder.buildNewKeyframe(currentStepAnimation.stepAnimationObject);
            keyframeBuilder.writeKeyframeState(currentStepAnimation.stepAnimationObject, true);
            keyframeBuilder.buildUpdatedKeyframe(currentStepAnimation.stepAnimationObject);
            keyframeBuilder.writeKeyframeState(currentStepAnimation.stepAnimationObject, false);
        });
    }


    constructKeyframeBalancing(keyframesPrototypePropertyName)
    {
        this.allStepAnimation.flat().forEach((currentStepAnimation, index) =>
        {
            let keyframeCalculatorOperation = new KeyframeCalculatorBalancing(this.tree, currentStepAnimation.stepAnimationObject, keyframesPrototypePropertyName);
            let keyframeBuilder = new KeyframeBuilder(this.tree, keyframeCalculatorOperation);

            keyframeBuilder.buildNewKeyframe(currentStepAnimation.stepAnimationObject);
            keyframeBuilder.writeKeyframeState(currentStepAnimation.stepAnimationObject, true);
            keyframeBuilder.buildUpdatedKeyframe(currentStepAnimation.stepAnimationObject);
            keyframeBuilder.writeKeyframeState(currentStepAnimation.stepAnimationObject, false);
        });
    }


    constructKeyframeLinkBeforeAfterBalancing(keyframesPrototypePropertyName)
    {
        this.allStepAnimation.flat().forEach((currentStepAnimation, index) =>
        {
            let keyframeCalculatorOperation = new KeyframeCalculatorLinkBeforeAfterBalancing(this.tree, currentStepAnimation.stepAnimationObject, keyframesPrototypePropertyName);
            let keyframeBuilder = new KeyframeBuilder(this.tree, keyframeCalculatorOperation);

            keyframeBuilder.buildNewKeyframe(currentStepAnimation.stepAnimationObject);
            keyframeBuilder.writeKeyframeState(currentStepAnimation.stepAnimationObject, true);
            keyframeBuilder.buildUpdatedKeyframe(currentStepAnimation.stepAnimationObject);
            keyframeBuilder.writeKeyframeState(currentStepAnimation.stepAnimationObject, false);
        });
    }


    constructKeyframeTraversingNode(keyframesPrototypePropertyName)
    {
        this.allStepAnimation.flat().forEach((currentStepAnimation, index) =>
        {
            // 3 arguments, not 2 like in other new KeyframeCalculator...()
            let keyframeCalculatorOperation = new KeyframeCalculatorTraversingNode(this.tree, currentStepAnimation.stepAnimationObject, keyframesPrototypePropertyName, index);
            let keyframeBuilder = new KeyframeBuilder(this.tree, keyframeCalculatorOperation);

            keyframeBuilder.buildNewKeyframe(currentStepAnimation.stepAnimationObject);
            keyframeBuilder.writeKeyframeState(currentStepAnimation.stepAnimationObject, true);
            keyframeBuilder.buildUpdatedKeyframe(currentStepAnimation.stepAnimationObject);
            keyframeBuilder.writeKeyframeState(currentStepAnimation.stepAnimationObject, false);
        });
    }


    constructKeyframeAddRangeOfNodes(keyframesPrototypePropertyName)
    {
        this.allStepAnimation.flat().forEach((currentStepAnimation, index) =>
        {
            let keyframeCalculatorOperation = new KeyframeCalculatorAddRangeOfNodes(this.tree, currentStepAnimation.stepAnimationObject, keyframesPrototypePropertyName);
            let keyframeBuilder = new KeyframeBuilder(this.tree, keyframeCalculatorOperation);

            keyframeBuilder.buildNewKeyframe(currentStepAnimation.stepAnimationObject);
            keyframeBuilder.writeKeyframeState(currentStepAnimation.stepAnimationObject, true);
            keyframeBuilder.buildUpdatedKeyframe(currentStepAnimation.stepAnimationObject);
            keyframeBuilder.writeKeyframeState(currentStepAnimation.stepAnimationObject, false);
        });
    }


    constructKeyframeSwapNode(keyframesPrototypePropertyName)
    {
        this.allStepAnimation.flat().forEach((currentStepAnimation, index) =>
        {
            let keyframeCalculatorOperation = new KeyframeCalculatorSwapNode(this.tree, currentStepAnimation.stepAnimationObject, keyframesPrototypePropertyName);
            let keyframeBuilder = new KeyframeBuilder(this.tree, keyframeCalculatorOperation);

            keyframeBuilder.buildNewKeyframe(currentStepAnimation.stepAnimationObject);
            keyframeBuilder.writeKeyframeState(currentStepAnimation.stepAnimationObject, true);
            keyframeBuilder.buildUpdatedKeyframe(currentStepAnimation.stepAnimationObject);
            keyframeBuilder.writeKeyframeState(currentStepAnimation.stepAnimationObject, false);
        });
    }


    constructKeyframeLinkBeforeAfterSwapNodes(keyframesPrototypePropertyName)
    {
        this.allStepAnimation.flat().forEach((currentStepAnimation, index) =>
        {
            let keyframeCalculatorOperation = new KeyframeCalculatorLinkBeforeAfterSwapNodes(this.tree, currentStepAnimation.stepAnimationObject, keyframesPrototypePropertyName);
            let keyframeBuilder = new KeyframeBuilder(this.tree, keyframeCalculatorOperation);

            keyframeBuilder.buildNewKeyframe(currentStepAnimation.stepAnimationObject);
            keyframeBuilder.writeKeyframeState(currentStepAnimation.stepAnimationObject, true);
            keyframeBuilder.buildUpdatedKeyframe(currentStepAnimation.stepAnimationObject);
            keyframeBuilder.writeKeyframeState(currentStepAnimation.stepAnimationObject, false);
        });
    }
}