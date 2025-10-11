import { CssBuilder } from './CssBuilder.js' ;

export class CssUpdater // client of CssBuilder
{
    constructor(tree, allStepAnimation)
    {
        this.tree = tree;
        this.cssBuilder = new CssBuilder(this.tree, allStepAnimation);
    }


    createOrUpdateCssEntityAddNode()
    {
        this.cssBuilder.constructCssAddNode();
    }


    createOrUpdateCssEntityAlignNodeByWidth()
    {
        this.cssBuilder.constructCssAlignNodeByWidth();
    }


    createOrUpdateCssEntityClickNode()
    {
        this.cssBuilder.constructCssClickNode();
    }


    createOrUpdateCssEntityFindNode()
    {
        this.cssBuilder.constructCssFindNode();
    }


    createOrUpdateCssEntityLinkNodeAction()
    {
        this.cssBuilder.constructCssLinkNodeAction();
    }


    createOrUpdateCssEntityAlignNodeByHeight()
    {
        this.cssBuilder.constructCssAlignNodeByHeight();
    }


    // For balancing
    createOrUpdateCssEntityBalancing()
    {
        this.cssBuilder.constructCssBalancing();
    }


    // For balancing
    createOrUpdateCssEntityLinkBeforeAfterBalancing()
    {
        this.cssBuilder.constructCssLinkBeforeAfterBalancing();
    }


    createOrUpdateCssEntityTraversingNode()
    {
        this.cssBuilder.constructCssTraversingNode();
    }


    createOrUpdateCssEntityAddRangeOfNodes()
    {
        this.cssBuilder.constructCssAddRangeOfNodes();
    }


    // Heap
    createOrUpdateCssEntitySwapNode()
    {
        this.cssBuilder.constructCssSwapNode();
    }


    // Heap
    createOrUpdateCssEntityLinkBeforeAfterSwapNodes()
    {
        this.cssBuilder.constructCssLinkBeforeAfterSwapNodes();
    }


    getCreatedOrUpdateCssEntity()
    {
        return this.cssBuilder;
    }
}