import { StyleClassTextHandler } from '../CssHandlers/StyleClassTextHandler.js';
import { Coordinates } from './Coordinates.js';
import { ScreenCoordinates } from './ScreenCoordinates.js';

export class TreeCoordinates // alignment tree nodes
{
    constructor(tree, xCoordinateRoot, yCoordinateRoot)
    {
        this.tree = tree;
        this.xCoordinateRoot = xCoordinateRoot;
        this.yCoordinateRoot = yCoordinateRoot;
        this.styleClassTextHandler = new StyleClassTextHandler();
        this.distanceBetweenLevels = this.getTrimmedStyleValue("superContainer", "--distanceBetweenLevels", 2);
        this.heightNode = this.getTrimmedStyleValue("superContainer", "--heightSuperContainer", 2);
        this.widthNode = this.getTrimmedStyleValue("superContainer", "--widthSuperContainer", 2);
        this.startPositionXNode = this.getTrimmedStyleValue("superContainer", "--leftSuperContainer", 2);
        this.startPositionYNode = this.getTrimmedStyleValue("superContainer", "--topSuperContainer", 2);
    }


    computeNodeXCoordinate(node)
    {
        this.checkNode(node);

        if (node.parentNode != null)
        {
            let multiplier = node.isLeftChild ? -1 : 1;

            return node.parentNode.xCoordinate + multiplier * Math.pow(2, (this.tree.treeLevels - node.levelInTree)) * this.widthNode;
        }

        if (!node.xCoordinate)
        {
            node.xCoordinate = this.xCoordinateRoot;
        }

        return node.xCoordinate;
    }


    computeNodeYCoordinate(node)
    {
        this.checkNode(node);

        if (node.parentNode != null)
        {
            return node.parentNode.yCoordinate + this.distanceBetweenLevels + this.heightNode;
        }

        if (!node.yCoordinate)
        {
            node.yCoordinate = this.yCoordinateRoot;
        }

        return node.yCoordinate;
    }


    setCoordinates(node) // distanceBetweenLevels = 200
    {
        this.checkNode(node);

        node.xCoordinatePrevious = node.xCoordinate;
        node.yCoordinatePrevious = node.yCoordinate;

        node.xCoordinate = this.computeNodeXCoordinate(node);
        node.yCoordinate = this.computeNodeYCoordinate(node);

        if (!node.xCoordinatePrevious)
        {
            node.xCoordinatePrevious = node.xCoordinate;
        }

        if (!node.yCoordinatePrevious)
        {
            node.yCoordinatePrevious = node.yCoordinate;
        }

        // ????
        if (node.xCoordinatePrevious !== node.xCoordinate)
        {
            this.tree.isNeedAlignmentByWidth = true; // ??????
        }
    }


    getStartPositionX(node) // where will be placed node on the screen before animation will be started
    {
        if (!node.startPositionX)
        {
            node.startPositionX = this.startPositionXNode;
        }
    }


    getStartPositionY(node)
    {
        if (!node.startPositionY)
        {
            node.startPositionY = this.startPositionYNode;
        }
    }


    setStartPositions(node)
    {
        this.getStartPositionX(node);
        this.getStartPositionY(node);
    }

    // private
    getTrimmedStyleValue(styleName, keyName, lengthSymbolsToTrim)
    {
        let rawStyleValue = this.styleClassTextHandler.getStyleValue(styleName, keyName).styleValue;
        return this.styleClassTextHandler.trimMeasure(rawStyleValue, lengthSymbolsToTrim);
    }


    // check node on null
    checkNode(node)
    {
        if (!node)
        {
            throw new Error(`node is undefined or null`);
        }
    }


    // Tree Alignment
    alignTreeNodesByWidth()
    {
        this.tree.setCounterNodeAligned();

        this.changeDistanceBetweenNodes();

        let treeShift = this.computeTreeShift();

        if (treeShift != 0)
        {
            this.shiftTree(treeShift);
            this.tree.isNeedAlignmentByWidth = true; // ??????
        }
    }


    // For balancing (align tree after rebalancing). Consider uising this method when draw tree after opening tree that was saved
    alignTreeNodesAfterBalancing()
    {
        this.tree.setCounterNodeAligned();

        // initialize coordinates for root after balancing (shift of root will be added soon when tree shift will be computed)
        let coordinates = new Coordinates();
        coordinates.setInitialRootCoordinates(this.tree.root);

        this.changeDistanceBetweenNodes(1);

        let treeShift = this.computeTreeShift();

        if (treeShift != 0)
        {
            this.shiftTree(treeShift);
        }
    }


    // Tree Alignment after addition range of nodes
    alignTreeNodesAfterAddRange()
    {
        //this.tree.setCounterNodeAligned();

        // initialize coordinates for root after balancing (shift of root will be added soon when tree shift will be computed)
        let coordinates = new Coordinates();
        coordinates.setInitialRootCoordinates(this.tree.root);

        this.changeDistanceBetweenNodes(0);

        let treeShift = this.computeTreeShift();

        if (treeShift != 0)
        {
            this.shiftTree(treeShift);
        }
    }


    // private
    changeDistanceBetweenNodes(startingLevel = 0)
    {
        let allNodesByLevels = this.tree.getAllNodesByLevels();

        if (startingLevel != 0 && (startingLevel > allNodesByLevels.length || startingLevel < 0))
        {
            throw new Error(`Incorrect level '${startingLevel}' to start change distance between nodes`);
        }

        for (let currentLevel = startingLevel; currentLevel < allNodesByLevels.length; currentLevel++)
        {
            for (let n = 0; n < allNodesByLevels[currentLevel].length; n++)
            {
                let currentNode = allNodesByLevels[currentLevel][n];

                this.setCoordinates(currentNode);
            }
        }
    }


    // private
    computeTreeShift()
    {
        if (this.tree.treeLevels === 1)
        {
            return 0;
        }

        let screenCoordinates = new ScreenCoordinates();
        let screenXCenter = screenCoordinates.getScreenXCenter();

        let outermostLeftNode = this.tree.getOutermostLeftNode(this.tree.root);

        // shift tree and suppose, that next node will be left child of current outermostLeftNode
        if (outermostLeftNode.rightChild)
        {
            return screenXCenter - (outermostLeftNode.xCoordinate - Math.pow(2, (this.tree.treeLevels - (outermostLeftNode.levelInTree + 1))) * this.widthNode);
        }

        if (outermostLeftNode.xCoordinate <= screenXCenter)
        {
            let multiplier = outermostLeftNode.isLeftChild ? -1 : 1;

            return screenXCenter - (outermostLeftNode.parentNode.xCoordinate + multiplier * Math.pow(2, (this.tree.treeLevels - outermostLeftNode.levelInTree)) * this.widthNode);
        }

        return screenXCenter - (outermostLeftNode.xCoordinate + Math.pow(2, (this.tree.treeLevels - (outermostLeftNode.levelInTree + 1))) * this.widthNode);
    }


    shiftTree(treeShift)
    {
        let allNodesByLevels = this.tree.getAllNodesByLevels();

        for (let currentLevel = 0; currentLevel < allNodesByLevels.length; currentLevel++)
        {
            for (let n = 0; n < allNodesByLevels[currentLevel].length; n++)
            {
                let currentNode = allNodesByLevels[currentLevel][n];

                currentNode.xCoordinate += treeShift;
            }
        }
    }

}