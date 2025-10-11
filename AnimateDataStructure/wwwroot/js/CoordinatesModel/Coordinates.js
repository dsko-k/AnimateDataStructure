import { StyleClassTextHandler } from '../CssHandlers/StyleClassTextHandler.js';
import { ScreenCoordinates } from './ScreenCoordinates.js';

export class Coordinates
{
    getNodeCoordinates(node)
    {
        let coordinates = {};
        coordinates.x = node.getXCoordinate();
        coordinates.y = node.getYCoordinate();

        return coordinates;
    }


    getStyleValue(styleNamePrototype, keyName)
    {
        this.checkParameter(styleNamePrototype);
        this.checkParameter(keyName);
        let styleClassTextHandler = new StyleClassTextHandler();

        return parseFloat(styleClassTextHandler.getStyleValue(styleNamePrototype, keyName).styleValue);
    }

    //private
    checkParameter(param)
    {
        if (!param || param === '')
        {
            throw new Error(`Incorrect parameter. It is ${param}`);
        }
    }


    getSizeNodeContainer(styleNamePrototype, widthOrHeight)
    {
        if (widthOrHeight != "--heightSuperContainer" & widthOrHeight != "--widthSuperContainer")
        {
            throw new Error(`Incorrect argument '${widthOrHeight}'. It can be only '--heightSuperContainer' or '--widthSuperContainer'. See style prototype '${styleNamePrototype}'`);
        }

        return this.getStyleValue(styleNamePrototype, widthOrHeight);
    }


    setStartPositionX(node, styleNamePrototype, keyLeft)
    {
        if (keyLeft != "--leftSuperContainer")
        {
            throw new Error(`Incorrect argument '${keyLeft}'. It can be only '--leftSuperContainer'. See style prototype '${styleNamePrototype}'`);
        }

        node.startPositionX = this.getStyleValue(styleNamePrototype, keyLeft); // where will be placed node on the screen before animation will be started
    }


    setStartPositionY(node, styleNamePrototype, keyTop)
    {
        if (keyTop != "--topSuperContainer")
        {
            throw new Error(`Incorrect argument '${keyTop}'. It can be only '--topSuperContainer'. See style prototype '${styleNamePrototype}'`);
        }

        node.startPositionY = this.getStyleValue(styleNamePrototype, keyTop); // where will be placed node on the screen before animation will be started
    }


    setCoordinatesRelocation(nodeToRelocate, newXCoordinate, newYCoordinate)
    {
        nodeToRelocate.xCoordinatePrevious = nodeToRelocate.xCoordinate;
        nodeToRelocate.yCoordinatePrevious = nodeToRelocate.yCoordinate;

        nodeToRelocate.xCoordinate = newXCoordinate;
        nodeToRelocate.yCoordinate = newYCoordinate;
    }


    // use to relocate method that initialize node finder
    initializeNodeCoordinates(nodeToInitialize, styleNamePrototype)
    {
        this.setStartPositionX(nodeToInitialize, styleNamePrototype, "--leftSuperContainer");
        this.setStartPositionY(nodeToInitialize, styleNamePrototype, "--topSuperContainer");

        return nodeToInitialize;
    }


    // For balancing and alignment after: balancing and (after open saved tree?)
    // coordinates before tree shift (shift of root will be added soon when tree shift will be computed)
    setInitialRootCoordinates(rootNode)
    {
        let screenCoordinates = new ScreenCoordinates();
        let screenXCenter = screenCoordinates.getScreenXCenter();

        rootNode.xCoordinatePrevious = rootNode.xCoordinate;
        rootNode.yCoordinatePrevious = rootNode.yCoordinate;

        rootNode.xCoordinate = screenXCenter;
        rootNode.yCoordinate = 300; // Replace HARDCODE (the same 300 occured somwhere)
    }


    // Heap
    swapTwoNodeCoordinates(firstNodeToSwap, secondNodeToSwap)
    {
        let xCoordinateFirstNode = firstNodeToSwap.xCoordinate;
        let yCoordinateFirstNode = firstNodeToSwap.yCoordinate;

        let xCoordinateSecondNode = secondNodeToSwap.xCoordinate;
        let yCoordinateSecondNode = secondNodeToSwap.yCoordinate;

        this.setCoordinatesRelocation(firstNodeToSwap, xCoordinateSecondNode, yCoordinateSecondNode);
        this.setCoordinatesRelocation(secondNodeToSwap, xCoordinateFirstNode, yCoordinateFirstNode);
    }


    // Heap
    // update coordinates of every node of Heap after swapping two nodes
    updateHeapCoordinatesAfterSwapTwoNode(allNodesByLevels, firstNodeToSwap, secondNodeToSwap)
    {
        for (let currentLevel = 0; currentLevel < allNodesByLevels.length; currentLevel++)
        {
            for (let n = 0; n < allNodesByLevels[currentLevel].length; n++)
            {
                let currentNode = allNodesByLevels[currentLevel][n];

                // setting xCoordinate = xCoordinatePrevious and yCoordinate = yCoordinatePrevious
                // for the all nodes, that are not firstNodeToSwap or secondNodeToSwap

                if (!Object.is(currentNode, firstNodeToSwap) && !Object.is(currentNode, secondNodeToSwap))
                {
                    this.setCoordinatesRelocation(currentNode, currentNode.xCoordinate, currentNode.yCoordinate);
                }
            }
        }

        this.swapTwoNodeCoordinates(firstNodeToSwap, secondNodeToSwap);
    }
}