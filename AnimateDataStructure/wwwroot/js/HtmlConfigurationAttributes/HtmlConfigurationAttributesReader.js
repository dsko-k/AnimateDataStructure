export class HtmlConfigurationAttributesReader // Home
{
    constructor()
    {

    }


    getHtmlPageConfigurations()
    {
        const allAttributes = {

            // <body id="idBody">...</body>
            bodyPageAttributes: {

                tag: "body",

                defaultAttributes: {

                    "id": "idBody",
                },
                                
            },

        };

        return allAttributes;
    }


    getHtmlTableConfigurationsForElements()
    {
        // TO DO: Move configuration object to the server
        const allAttributes = {

            // <div id="idTableContainer" class="tableContainer">...</div>
            divTableContainerAttributes: {

                tag: "div",

                defaultAttributes: {
                    "id": "idTableContainer",
                    "class": "tableContainer",
                },

                configureAttributes(idValue)
                {
                    return {
                        "id": idValue,
                        "class": "tableContainer",
                    };
                },
            },


            // <div class="tableTitle">...</div>
            divTableTitleAttributes: {

                tag: "div",

                defaultAttributes: {

                    "class": "tableTitle",
                },
            },


            // <h2>Some table title</h2>
            hTableTitleAttributes: {

                tag: "h2",

                defaultAttributes: {},
            },


            // ????
            // <div class="tableButtonClose">...</div>
            divTableButtonCloseAttributes: {

                tag: "div",

                defaultAttributes: {

                    "id": "idTableButtonClose",
                    "class": "tableButtonClose",
                },
            },

            // <p class="textTableButtonClose">...</p>
            pTextInTableButtonCloseAttributes: {

                tag: "p",

                defaultAttributes: {

                    "class": "textTableButtonClose",
                },

                textInsideButton: "X",
            },


            // <div class="tableSearchContainer">...</div>
            divTableSearchContainerAttributes: {

                tag: "div",

                defaultAttributes: {

                    "class": "tableSearchContainer",
                },
            },


            // <input id="idTableSearchInput" class="inputData" type="search" placeholder="Live search in a table...">
            inputTableSearchAttributes: {

                tag: "input",

                defaultAttributes: {

                    "id": "idTableSearchInput",
                    "class": "inputData",
                    "type": "search",
                    "placeholder": "Live search in a table...",
                },

                configureAttributes(idValue)
                {
                    return {
                        "id": idValue,
                        "class": "inputData",
                        "type": "search",
                        "placeholder": "Live search in a table...",
                    };
                },
            },


            // <div class="tableBody">...</div>
            divTableBodyAttributes: {

                tag: "div",

                defaultAttributes: {

                    "class": "tableBody",
                },
            },


            // <table id="idTable" data-isTableSorted="false" data-isTableSortedAscend="null" data-lastSortedColumnNumber="null">
            tableAttributes: {

                tag: "table",

                defaultAttributes: {

                    "id": "idTable",
                    "data-isTableSorted": "false",
                    "data-isTableSortedAscend": "null",
                    "data-lastSortedColumnNumber": "null",
                },

                dataAttributes: {

                    isTableSorted: "data-isTableSorted",
                    isTableSortedAscend: "data-isTableSortedAscend",
                    lastSortedColumnNumber: "data-lastSortedColumnNumber",
                },

                configureAttributes(idValue)
                {
                    return {

                        "id": idValue,
                        "data-isTableSorted": "false",
                        "data-isTableSortedAscend": "null",
                        "data-lastSortedColumnNumber": "null",
                    };
                },
            },



            // <thead>
            theadAttributes: {

                tag: "thead",

                defaultAttributes: {},
            },


            // ------------------------------ <tr> for <th>s section BEGIN ------------------------------

            // <tr>
            trForHeaderAttributes: {

                tag: "tr",

                defaultAttributes: {},
            },


            // <th data-tablecolumnordernumber="1" class="headerColumn">...</th>
            thAttributes: {

                tag: "th",

                defaultAttributes: {

                    "data-tableColumnOrderNumber": "1",
                    "class": "headerColumn",
                },

                configureAttributes(columnOrderNumber) // columnOrderNumber starts from 1
                {
                    return {

                        "data-tableColumnOrderNumber": `${columnOrderNumber}`,
                        "class": "headerColumn",
                    };
                },
            },

            // ------------------------------ <button> for <th>s section BEGIN ------------------------------


            // <button class="sortAscendingButton">...</button>
            sortAscendingButtonAttributes: {

                tag: "button",

                defaultAttributes: {

                    "class": "sortAscendingButton",
                },

                onClickAttributes: {

                    "class": "sortAscendingButtonOnClick",
                },

                textInsideButton: "↑",
            },


            // <button class="sortDescendingButton">...</button>
            sortDescendingButtonAttributes: {

                tag: "button",

                defaultAttributes: {

                    "class": "sortDescendingButton",
                },

                onClickAttributes: {

                    "class": "sortDescendingButtonOnClick",
                },

                textInsideButton: "↓",
            },

            // ------------------------------ <button> for <th>s section END ------------------------------


            // <tbody>
            tbodyAttributes: {

                tag: "tbody",

                defaultAttributes: {},
            },


            // ------------------------------ <tr> as parent of <td>s section BEGIN ------------------------------


            // <tr data-tablerowviewordernumber="0" data-tablerowviewordernumberininitialunsortedtable="0" data-issortedtablerow="false" data-istablerowtobehidden="false" >...</tr>
            trForRowAttributes: {

                tag: "tr",

                defaultAttributes: {

                    "data-tableRowViewOrderNumber": "0",
                    "data-tableRowViewOrderNumberInInitialUnsortedTable": "0",
                    "data-isSortedTableRow": "false",
                    "data-isTableRowToBeHidden": "false",
                },

                dataAttributes: {

                    rowViewOrderNumber: "data-tableRowViewOrderNumber",
                    rowViewOrderNumberInInitialUnsortedTable: "data-tableRowViewOrderNumberInInitialUnsortedTable",
                    isSortedTableRow: "data-isSortedTableRow",
                    isTableRowToBeHidden: "data-isTableRowToBeHidden",
                },

                sortTableRowAttributes: {

                    "class": "sortedRow",
                },

                hideTableRowAttributes: {

                    "class": "hideTableRow",
                },

                // cssVariables that are used for animation related to <tr> tag
                cssVariables: {

                    rowYCoordinateAfterSorting: "--translateYForSorting",
                    rowDelayAnimation: "--delayBeforeRemoveRow",
                    rowDisplayState: "--displayState",
                },

                configureAttributes(rowViewOrderNumberInInitialUnsortedTable) // rowViewOrderNumberInInitialUnsortedTable starts from 0
                {
                    return {
                        "data-tableRowViewOrderNumber": `${rowViewOrderNumberInInitialUnsortedTable}`,
                        "data-tableRowViewOrderNumberInInitialUnsortedTable": `${rowViewOrderNumberInInitialUnsortedTable}`,
                        "data-isSortedTableRow": `${false}`,
                        "data-isTableRowToBeHidden": `${false}`,
                    };
                },
            },


            // ------------------------------ <tr> as parent of <td>s section END ------------------------------




            // ------------------------------ <td> section BEGIN ------------------------------

            tdAttributes: {

                tag: "td",

                defaultAttributes: {},
            },


            // <div class="cell">...
            divCellAttributes: {

                tag: "div",

                defaultAttributes: {

                    "class": "cell",
                },

                additionalStyleDivCellBelongedToEvenRow: {

                    "class": "cellEvenOnMouseEnterTableColumn", // for root div inside td, that belongs to even row. Used as additional style to toggle color of cell when hover column header
                },

                additionalStyleDivCellBelongedToOddRow: {

                    "class": "cellOddOnMouseEnterTableColumn", // for root div inside td, that belongs to odd row. Used as additional style to toggle color of cell when hover column header
                }

            },


            // <div class="cellWithGlowingRadialBorder">...
            divCellWithGlowingRadialBorderAttributes: {

                tag: "div",

                defaultAttributes: {

                    "class": "cellWithGlowingRadialBorder",
                },
            },


            // <div class="borderOfCellWithGlowingRadialBorder"></div>
            divBorderOfCellWithGlowingRadialBorderAttributes: {

                tag: "div",

                defaultAttributes: {

                    "class": "borderOfCellWithGlowingRadialBorder",
                },

                // cssVariables that are used for animation related to gradient when moving mouse above element
                cssVariables: {

                    mouseX: "--mouse-x",
                    mouseY: "--mouse-y",
                },
            },


            // <div class="contentOfCellWithGlowingRadialBorder">
            divContentOfCellWithGlowingRadialBorderAttributes: {

                tag: "div",

                defaultAttributes: {

                    "class": "contentOfCellWithGlowingRadialBorder",
                },

                cssVariables: {

                    backgroundColor: "--backgroundColorOfContentOfCellWithGlowingRadialBorder",
                },


                backgroundColor: {

                    rowEven: "rgba(25,25,25)",
                    rowEvenOnHover: "rgba(45,45,45)",
                    rowOdd: "#090a4e",
                    rowOddOnHover: "#0b0d75",
                }


            },


            // <div class="glowingRadialGradientInsideCellContent"></div>
            divGlowingRadialGradientInsideCellContentAttributes: {

                tag: "div",

                defaultAttributes: {

                    "class": "glowingRadialGradientInsideCellContent",
                },
            },


            // <p class="textInsideCell">
            pTextInsideCellAttributes: {

                tag: "p",

                defaultAttributes: {

                    "class": "textInsideCell",
                },

                additionalStyleOnTextUpdated: {

                    "class": "updatedTextInsideCell", // uses as additional style after last updating text inside cell
                },

                // cssVariables that are used for animation related to gradient when moving mouse above element
                cssVariables: {

                    mouseX: "--mouse-x",
                    mouseY: "--mouse-y",
                },

            },

            // <div class="cellLoader">
            divCellLoaderAttributes: {

                tag: "div",

                defaultAttributes: {

                    "class": "cellLoader",
                },


                additionalStyleOnCellLoaderSequentiallyOn: {

                    "class": "cellLoaderSequentiallyOn", // uses as additional style after last updating text inside cell
                },

                additionalStyleOnCellLoaderIndividuallyOn: {

                    "class": "cellLoaderIndividuallyOn", // uses as additional style after last updating text inside cell
                },

                cssVariablesNamesAttributes: {

                    "cellNumber": "--cellBelongsToColumnNumber",
                },

                configureAttributes(columnNumberStartsFromOne) // rowViewOrderNumberInInitialUnsortedTable starts from 0
                {
                    return {
                        "style": `${this.cssVariablesNamesAttributes.cellNumber}: ${columnNumberStartsFromOne}`,
                        "class": `${this.defaultAttributes.class}`,
                    };
                },
            },

            // ------------------------------ <td> section END ------------------------------




            // ------------------------------ <div> Resizer section BEGIN ------------------------------


            // <div id="idTableResizerVerticalContainer" class="resizerVerticalContainer"></div>
            divTableResizerVerticalAttributes: {

                tag: "div",

                defaultAttributes: {

                    "id": "idTableResizerVerticalContainer",
                    "class": "resizerVerticalContainer",
                },

                configureAttributes(idValue) // columnOrderNumber starts from 1
                {
                    return {

                        "id": idValue,
                        "class": "resizerVerticalContainer",
                    };
                },
            },


            // <div id="idTableResizerBottomHorizontalContainer" class="resizerBottomHorizontalContainer"></div>
            divTableResizerHorizontalAttributes: {

                tag: "div",

                defaultAttributes: {

                    "id": "idTableResizerBottomHorizontalContainer",
                    "class": "resizerBottomHorizontalContainer",
                },

                configureAttributes(idValue) // columnOrderNumber starts from 1
                {
                    return {

                        "id": idValue,
                        "class": "resizerBottomHorizontalContainer",
                    };
                },
            },

            // ------------------------------ <div> Resizer section END ------------------------------

        };

        return allAttributes;
    }


    // DO NOT DELETE: not the same as sidebar's table, but functionality the same
    getHistoryTableConfigurations()
    {
        const allAttributes = {

            // DO NOT DELETE: NOTE: here attribute style="width: 75%;" is needed as hardcode
            // <div id="idHistoryTableContainer" class="tableContainer" style="width: 75%;">...</div>
            divHistoryTableContainerAttributes: {

                tag: "body",

                defaultAttributes: {

                    "id": "idHistoryTableContainer",
                    "class":  "tableContainer",
                },

            },


            // <div class="tableSearchContainer">...</div>
            divTableSearchContainerAttributes: {

                tag: "div",

                defaultAttributes: {

                    "id": "idHistoryTableSearchContainer",
                    "class": "tableSearchContainer",
                },
            },


            // <input id="idTableHistorySearchInput" class="inputData" type="search" placeholder="Live search in a table...">
            inputTableSearchAttributes: {

                tag: "input",

                defaultAttributes: {

                    "id": "idTableHistorySearchInput",
                    "class": "inputData",
                    "type": "search",
                    "placeholder": "Live search in a table...",
                },

                configureAttributes(idValue)
                {
                    return {
                        "id": idValue,
                        "class": "inputData",
                        "type": "search",
                        "placeholder": "Live search in a table...",
                    };
                },
            },


            // <div id="idHistoryTableResizerVerticalContainer" class="resizerVerticalContainer">...</div>
            divHistoryTableResizerVerticalContainerAttributes: {

                tag: "div",

                defaultAttributes: {

                    "id": "idHistoryTableResizerVerticalContainer",
                    "class": "tableContainer",
                },

            },


            // <div id="idHistoryTableResizerBottomHorizontalContainer" class="resizerBottomHorizontalContainer">...</div>
            divHistoryTableResizerBottomHorizontalContainerAttributes: {

                tag: "div",

                defaultAttributes: {

                    "id": "idHistoryTableResizerBottomHorizontalContainer",
                    "class": "tableContainer",
                },

            },


            // ???
            tableHistoryAttributes: {

                tag: "table",

                defaultAttributes: {

                    "id": "idHistoryTable",
                },

            },

            // ------------------------------ <div> Resizer section BEGIN ------------------------------


            // <div id="idHistoryTableResizerVerticalContainer" class="resizerVerticalContainer"></div>
            divTableResizerVerticalAttributes: {

                tag: "div",

                defaultAttributes: {

                    "id": "idHistoryTableResizerVerticalContainer",
                    "class": "resizerVerticalContainer",
                },

                configureAttributes(idValue) // columnOrderNumber starts from 1
                {
                    return {

                        "id": idValue,
                        "class": "resizerVerticalContainer",
                    };
                },
            },


            // <div id="idHistoryTableResizerBottomHorizontalContainer" class="resizerBottomHorizontalContainer"></div>
            divTableResizerHorizontalAttributes: {

                tag: "div",

                defaultAttributes: {

                    "id": "idHistoryTableResizerBottomHorizontalContainer",
                    "class": "resizerBottomHorizontalContainer",
                },

                configureAttributes(idValue) // columnOrderNumber starts from 1
                {
                    return {

                        "id": idValue,
                        "class": "resizerBottomHorizontalContainer",
                    };
                },
            },

            // ------------------------------ <div> Resizer section END ------------------------------

        };

        return allAttributes;
    }


    getHtmlSidebarConfigurations()
    {
        // TO DO: Move configuration object to the server
        const allAttributes = {

            // <div id="idSidebarContainer" class="sidebarContainer">...</div>
            divSidebarContainerAttributes: {

                tag: "div",

                defaultAttributes: {

                    "id": "idSidebarContainer",
                    "class": "sidebarContainer",
                },

                // additional style name to animate expanding sidebar on click
                sidebarContainerExpandAttributes: {

                    "class": "sidebarContainerExpand",
                },

                // additional style name to animate narrowing sidebar on click
                sidebarContainerNarrowAttributes: {

                    "class": "sidebarContainerNarrow",
                },
            },


            // <div id="idSidebar" class="sidebar">...</div>
            divSidebarAttributes: {

                tag: "div",

                defaultAttributes: {

                    "id": "idSidebar",
                    "class": "sidebar",
                },

            },

        };

        return allAttributes;
    }

    // Sidebar buttons

    getHtmlSidebarButtonMenuConfigurations()
    {
        // TO DO: Move configuration object to the server
        const allAttributes = {

            // Menu
            // <div id="idButtonSidebarMenu" class="buttonWithGlowingRadialBorder menuButtonWithGlowingRadialBorder">
            divButtonWithGlowingRadialBorderAttributes: {

                tag: "div",

                defaultAttributes: {

                    "id": "idButtonSidebarMenu",
                    "class": "buttonWithGlowingRadialBorder menuButtonWithGlowingRadialBorder",
                },

                // here should not be object additionalAttributesOnClick : {...}

                // cssVariables that are used for animation related to gradient when moving mouse above element
                cssVariables: {

                    mouseX: "--mouse-x",
                    mouseY: "--mouse-y",
                },

            },


            // <div class="borderOfButtonWithGlowingRadialBorder"> </div>
            divBorderOfButtonWithGlowingRadialBorderAttributes: {

                tag: "div",

                defaultAttributes: {

                    "class": "borderOfButtonWithGlowingRadialBorder",
                },
            },


            // <div class="contentOfButtonWithGlowingRadialBorder"> </div>
            divContentOfButtonWithGlowingRadialBorderAttributes: {

                tag: "div",

                defaultAttributes: {

                    "class": "contentOfButtonWithGlowingRadialBorder",
                },
            },


            // <div class="glowingRadialGradientInsideButtonContent">...</div>
            divGlowingRadialGradientInsideButtonContentAttributes: {

                tag: "div",

                defaultAttributes: {

                    "class": "glowingRadialGradientInsideButtonContent",
                },
            },


            // <div class="sidebarIconContainer">...</div>
            divSidebarIconContainerAttributes: {

                tag: "div",

                defaultAttributes: {

                    "class": "sidebarIconContainer",
                },
            },


            // All, except Fourth
            // <svg class="svgButtonIcon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"> </svg>
            svgButtonMenuIconAttributes: {

                tag: "svg",

                defaultAttributes: {

                    "class": "svgButtonIcon",
                    "xmlns": "http://www.w3.org/2000/svg",
                    "viewBox": "0 0 16 16",
                },
            },


            // <path d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3m5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3m5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3" />
            pathSvgButtonIconFirstAttributes: {

                tag: "path",

                defaultAttributes: {

                    "d": "M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3m5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3m5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3",
                },
            },


            // <div id="idMenuSidebarSvgTextForButtonContainer" class="sidebarSvgTextForButtonContainer">
            divSidebarSvgTextForButtonContainerAttributes: {

                tag: "div",

                defaultAttributes: {

                    "id": "idMenuSidebarSvgTextForButtonContainer",
                    "class": "sidebarSvgTextForButtonContainer",
                },

                configureAttributes(idValue)
                {
                    let configuredAttributes = this.defaultAttributes;
                    configuredAttributes["id"] = idValue;

                    configuredAttributes["tag"] = this.tag;


                    return configuredAttributes;
                },
            },


            // <svg class="containerSvgTextInsideButtonContent" viewBox="140 -17 1 25" xmlns="http://www.w3.org/2000/svg"> </svg>
            svgContainerSvgTextInsideButtonContentAttributes: {

                tag: "svg",

                defaultAttributes: {

                    "class": "containerSvgTextInsideButtonContent",
                    "xmlns": "http://www.w3.org/2000/svg",
                    "viewBox": "140 -17 1 25",
                },
            },


            // "MENU"
            // <text class="textOfButtonInsideSidebar">MENU</text>
            textOfButtonInsideSidebarAttributes: {

                tag: "text",

                defaultAttributes: {

                    "class": "textOfButtonInsideSidebar",
                },

                defaultTextInsideButton: "MENU",
            },

        };

        return allAttributes;
    }


    getHtmlSidebarButtonSecondConfigurations()
    {
        // TO DO: Move configuration object to the server
        const allAttributes = {

            // <div id="idButtonSidebarSecond" class="buttonWithGlowingRadialBorder">
            divButtonWithGlowingRadialBorderAttributes: {

                tag: "div",

                defaultAttributes: {

                    "id": "idButtonSidebarSecond",
                    "class": "buttonWithGlowingRadialBorder",
                },

                additionalAttributesOnClick: {

                    "class": "buttonWithGlowingRadialBorderOnClick",
                },

                // cssVariables that are used for animation related to gradient when moving mouse above element
                cssVariables: {

                    mouseX: "--mouse-x",
                    mouseY: "--mouse-y",
                },
            },


            // <div class="borderOfButtonWithGlowingRadialBorder"> </div>
            divBorderOfButtonWithGlowingRadialBorderAttributes: {

                tag: "div",

                defaultAttributes: {

                    "class": "borderOfButtonWithGlowingRadialBorder",
                },
            },


            // <div class="contentOfButtonWithGlowingRadialBorder"> </div>
            divContentOfButtonWithGlowingRadialBorderAttributes: {

                tag: "div",

                defaultAttributes: {

                    "class": "contentOfButtonWithGlowingRadialBorder",
                },
            },


            // <div class="glowingRadialGradientInsideButtonContent">...</div>
            divGlowingRadialGradientInsideButtonContentAttributes: {

                tag: "div",

                defaultAttributes: {

                    "class": "glowingRadialGradientInsideButtonContent",
                },
            },


            // <div class="sidebarIconContainer">...</div>
            divSidebarIconContainerAttributes: {

                tag: "div",

                defaultAttributes: {

                    "class": "sidebarIconContainer",
                },
            },


            // All, except Fourth
            // <svg class="svgButtonIcon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"> </svg>
            svgButtonMenuIconAttributes: {

                tag: "svg",

                defaultAttributes: {

                    "class": "svgButtonIcon",
                    "xmlns": "http://www.w3.org/2000/svg",
                    "viewBox": "0 0 16 16",
                },
            },


            // <path d="M3.5 11a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5zm3.5.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5zm4.5-.5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5z" />
            pathSvgButtonIconFirstAttributes: {

                tag: "path",

                defaultAttributes: {

                    "d": "M3.5 11a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5zm3.5.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5zm4.5-.5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5z",
                },
            },


            // <path d="M14 1a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2zM2 14h12a1 1 0 0 0 1-1V5H1v8a1 1 0 0 0 1 1M2 2a1 1 0 0 0-1 1v1h14V3a1 1 0 0 0-1-1z" />
            pathSvgButtonIconSecondAttributes: {

                tag: "path",

                defaultAttributes: {

                    "d": "M14 1a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2zM2 14h12a1 1 0 0 0 1-1V5H1v8a1 1 0 0 0 1 1M2 2a1 1 0 0 0-1 1v1h14V3a1 1 0 0 0-1-1z",
                },
            },


            // <div id="idButtonSidebarSecondSvgTextContainer" class="sidebarSvgTextForButtonContainer">
            divSidebarSvgTextForButtonContainerAttributes: {

                tag: "div",

                defaultAttributes: {

                    "id": "idButtonSidebarSecondSvgTextContainer",
                    "class": "sidebarSvgTextForButtonContainer",
                },

                configureAttributes(idValue)
                {
                    let configuredAttributes = this.defaultAttributes;
                    configuredAttributes["id"] = idValue;

                    configuredAttributes["tag"] = this.tag;


                    return configuredAttributes;
                },
            },


            // <svg class="containerSvgTextInsideButtonContent" viewBox="140 -17 1 25" xmlns="http://www.w3.org/2000/svg"> </svg>
            svgContainerSvgTextInsideButtonContentAttributes: {

                tag: "svg",

                defaultAttributes: {

                    "class": "containerSvgTextInsideButtonContent",
                    "xmlns": "http://www.w3.org/2000/svg",
                    "viewBox": "140 -17 1 25",
                },
            },


            // <text class="textOfButtonInsideSidebar">Data structure</text>
            textOfButtonInsideSidebarAttributes: {

                tag: "text",

                defaultAttributes: {

                    "class": "textOfButtonInsideSidebar",
                },

                defaultTextInsideButton: "Data structure",
            },

        };

        return allAttributes;
    }


    getHtmlSidebarButtonThirdConfigurations()
    {
        // TO DO: Move configuration object to the server
        const allAttributes = {

            // <div id="idButtonSidebarThird" class="buttonWithGlowingRadialBorder">
            divButtonWithGlowingRadialBorderAttributes: {

                tag: "div",

                defaultAttributes: {

                    "id": "idButtonSidebarThird",
                    "class": "buttonWithGlowingRadialBorder",
                },

                additionalAttributesOnClick: {

                    "class": "buttonWithGlowingRadialBorderOnClick",
                },
            },


            // <div class="borderOfButtonWithGlowingRadialBorder"> </div>
            divBorderOfButtonWithGlowingRadialBorderAttributes: {

                tag: "div",

                defaultAttributes: {

                    "class": "borderOfButtonWithGlowingRadialBorder",
                },
            },


            // <div class="contentOfButtonWithGlowingRadialBorder"> </div>
            divContentOfButtonWithGlowingRadialBorderAttributes: {

                tag: "div",

                defaultAttributes: {

                    "class": "contentOfButtonWithGlowingRadialBorder",
                },
            },


            // <div class="glowingRadialGradientInsideButtonContent">...</div>
            divGlowingRadialGradientInsideButtonContentAttributes: {

                tag: "div",

                defaultAttributes: {

                    "class": "glowingRadialGradientInsideButtonContent",
                },
            },


            // <div class="sidebarIconContainer">...</div>
            divSidebarIconContainerAttributes: {

                tag: "div",

                defaultAttributes: {

                    "class": "sidebarIconContainer",
                },
            },


            // All, except Fourth
            // <svg class="svgButtonIcon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"> </svg>
            svgButtonMenuIconAttributes: {

                tag: "svg",

                defaultAttributes: {

                    "class": "svgButtonIcon",
                    "xmlns": "http://www.w3.org/2000/svg",
                    "viewBox": "0 0 16 16",
                },
            },


            // <path fill-rule="evenodd" d="M6 3.5A1.5 1.5 0 0 1 7.5 2h1A1.5 1.5 0 0 1 10 3.5v1A1.5 1.5 0 0 1 8.5 6v1H14a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-1 0V8h-5v.5a.5.5 0 0 1-1 0V8h-5v.5a.5.5 0 0 1-1 0v-1A.5.5 0 0 1 2 7h5.5V6A1.5 1.5 0 0 1 6 4.5zM8.5 5a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5zM0 11.5A1.5 1.5 0 0 1 1.5 10h1A1.5 1.5 0 0 1 4 11.5v1A1.5 1.5 0 0 1 2.5 14h-1A1.5 1.5 0 0 1 0 12.5zm1.5-.5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5zm4.5.5A1.5 1.5 0 0 1 7.5 10h1a1.5 1.5 0 0 1 1.5 1.5v1A1.5 1.5 0 0 1 8.5 14h-1A1.5 1.5 0 0 1 6 12.5zm1.5-.5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5zm4.5.5a1.5 1.5 0 0 1 1.5-1.5h1a1.5 1.5 0 0 1 1.5 1.5v1a1.5 1.5 0 0 1-1.5 1.5h-1a1.5 1.5 0 0 1-1.5-1.5zm1.5-.5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5z" />
            pathSvgButtonIconFirstAttributes: {

                tag: "path",

                defaultAttributes: {

                    "fill-rule": "evenodd",
                    "d": "M6 3.5A1.5 1.5 0 0 1 7.5 2h1A1.5 1.5 0 0 1 10 3.5v1A1.5 1.5 0 0 1 8.5 6v1H14a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-1 0V8h-5v.5a.5.5 0 0 1-1 0V8h-5v.5a.5.5 0 0 1-1 0v-1A.5.5 0 0 1 2 7h5.5V6A1.5 1.5 0 0 1 6 4.5zM8.5 5a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5zM0 11.5A1.5 1.5 0 0 1 1.5 10h1A1.5 1.5 0 0 1 4 11.5v1A1.5 1.5 0 0 1 2.5 14h-1A1.5 1.5 0 0 1 0 12.5zm1.5-.5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5zm4.5.5A1.5 1.5 0 0 1 7.5 10h1a1.5 1.5 0 0 1 1.5 1.5v1A1.5 1.5 0 0 1 8.5 14h-1A1.5 1.5 0 0 1 6 12.5zm1.5-.5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5zm4.5.5a1.5 1.5 0 0 1 1.5-1.5h1a1.5 1.5 0 0 1 1.5 1.5v1a1.5 1.5 0 0 1-1.5 1.5h-1a1.5 1.5 0 0 1-1.5-1.5zm1.5-.5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5z",
                },
            },


            // <div id="idButtonSidebarThirdSvgTextContainer" class="sidebarSvgTextForButtonContainer">
            divSidebarSvgTextForButtonContainerAttributes: {

                tag: "div",

                defaultAttributes: {

                    "id": "idButtonSidebarThirdSvgTextContainer",
                    "class": "sidebarSvgTextForButtonContainer",
                },

                configureAttributes(idValue)
                {
                    let configuredAttributes = this.defaultAttributes;
                    configuredAttributes["id"] = idValue;

                    configuredAttributes["tag"] = this.tag;


                    return configuredAttributes;
                },
            },


            // <svg class="containerSvgTextInsideButtonContent" viewBox="140 -17 1 25" xmlns="http://www.w3.org/2000/svg"> </svg>
            svgContainerSvgTextInsideButtonContentAttributes: {

                tag: "svg",

                defaultAttributes: {

                    "class": "containerSvgTextInsideButtonContent",
                    "xmlns": "http://www.w3.org/2000/svg",
                    "viewBox": "140 -17 1 25",
                },
            },


            // <text class="textOfButtonInsideSidebar">Operations</text>
            textOfButtonInsideSidebarAttributes: {

                tag: "text",

                defaultAttributes: {

                    "class": "textOfButtonInsideSidebar",
                },

                defaultTextInsideButton: "Operations",
            },

        };

        return allAttributes;
    }


    getHtmlSidebarButtonFourthConfigurations()
    {
        // TO DO: Move configuration object to the server
        const allAttributes = {

            // <div id="idButtonSidebarFourth" class="buttonWithGlowingRadialBorder">
            divButtonWithGlowingRadialBorderAttributes: {

                tag: "div",

                defaultAttributes: {

                    "id": "idButtonSidebarFourth",
                    "class": "buttonWithGlowingRadialBorder",
                },

                additionalAttributesOnClick: {

                    "class": "buttonWithGlowingRadialBorderOnClick",
                },
            },


            // <div class="borderOfButtonWithGlowingRadialBorder"> </div>
            divBorderOfButtonWithGlowingRadialBorderAttributes: {

                tag: "div",

                defaultAttributes: {

                    "class": "borderOfButtonWithGlowingRadialBorder",
                },
            },


            // <div class="contentOfButtonWithGlowingRadialBorder"> </div>
            divContentOfButtonWithGlowingRadialBorderAttributes: {

                tag: "div",

                defaultAttributes: {

                    "class": "contentOfButtonWithGlowingRadialBorder",
                },
            },


            // <div class="glowingRadialGradientInsideButtonContent">...</div>
            divGlowingRadialGradientInsideButtonContentAttributes: {

                tag: "div",

                defaultAttributes: {

                    "class": "glowingRadialGradientInsideButtonContent",
                },
            },


            // <div class="sidebarIconContainer">...</div>
            divSidebarIconContainerAttributes: {

                tag: "div",

                defaultAttributes: {

                    "class": "sidebarIconContainer",
                },
            },


            // All, except this Fourth
            // <svg class="svgButtonIcon" viewBox="0 0 20 20"> </svg>
            svgButtonMenuIconAttributes: {

                tag: "svg",

                defaultAttributes: {

                    "class": "svgButtonIcon",
                    "xmlns": "http://www.w3.org/2000/svg",
                    "viewBox": "0 0 20 20",
                },
            },


            // <path fill="none" d="M17.222,5.041l-4.443-4.414c-0.152-0.151-0.356-0.235-0.571-0.235h-8.86c-0.444,0-0.807,0.361-0.807,0.808v17.602c0,0.448,0.363,0.808,0.807,0.808h13.303c0.448,0,0.808-0.36,0.808-0.808V5.615C17.459,5.399,17.373,5.192,17.222,5.041zM15.843,17.993H4.157V2.007h7.72l3.966,3.942V17.993z"></path>
            pathSvgButtonIconFirstAttributes: {

                tag: "path",

                defaultAttributes: {

                    "fill": "none",
                    "d": "M17.222,5.041l-4.443-4.414c-0.152-0.151-0.356-0.235-0.571-0.235h-8.86c-0.444,0-0.807,0.361-0.807,0.808v17.602c0,0.448,0.363,0.808,0.807,0.808h13.303c0.448,0,0.808-0.36,0.808-0.808V5.615C17.459,5.399,17.373,5.192,17.222,5.041zM15.843,17.993H4.157V2.007h7.72l3.966,3.942V17.993z",
                },
            },


            // <path fill="none" d="M5.112,7.3c0,0.446,0.363,0.808,0.808,0.808h8.077c0.445,0,0.808-0.361,0.808-0.808c0-0.447-0.363-0.808-0.808-0.808H5.92C5.475,6.492,5.112,6.853,5.112,7.3z"></path>
            pathSvgButtonIconSecondAttributes: {

                tag: "path",

                defaultAttributes: {

                    "fill": "none",
                    "d": "M5.112,7.3c0,0.446,0.363,0.808,0.808,0.808h8.077c0.445,0,0.808-0.361,0.808-0.808c0-0.447-0.363-0.808-0.808-0.808H5.92C5.475,6.492,5.112,6.853,5.112,7.3z",
                },
            },


            // <path fill="none" d="M5.92,5.331h4.342c0.445,0,0.808-0.361,0.808-0.808c0-0.446-0.363-0.808-0.808-0.808H5.92c-0.444,0-0.808,0.361-0.808,0.808C5.112,4.97,5.475,5.331,5.92,5.331z"></path>
            pathSvgButtonIconThirdAttributes: {

                tag: "path",

                defaultAttributes: {

                    "fill": "none",
                    "d": "M5.92,5.331h4.342c0.445,0,0.808-0.361,0.808-0.808c0-0.446-0.363-0.808-0.808-0.808H5.92c-0.444,0-0.808,0.361-0.808,0.808C5.112,4.97,5.475,5.331,5.92,5.331z",
                },
            },


            // <path fill="none" d="M13.997,9.218H5.92c-0.444,0-0.808,0.361-0.808,0.808c0,0.446,0.363,0.808,0.808,0.808h8.077c0.445,0,0.808-0.361,0.808-0.808C14.805,9.58,14.442,9.218,13.997,9.218z"></path>
            pathSvgButtonIconFourthAttributes: {

                tag: "path",

                defaultAttributes: {

                    "fill": "none",
                    "d": "M13.997,9.218H5.92c-0.444,0-0.808,0.361-0.808,0.808c0,0.446,0.363,0.808,0.808,0.808h8.077c0.445,0,0.808-0.361,0.808-0.808C14.805,9.58,14.442,9.218,13.997,9.218z",
                },
            },


            // <path fill="none" d="M13.997,11.944H5.92c-0.444,0-0.808,0.361-0.808,0.808c0,0.446,0.363,0.808,0.808,0.808h8.077c0.445,0,0.808-0.361,0.808-0.808C14.805,12.306,14.442,11.944,13.997,11.944z"></path>
            pathSvgButtonIconFifthAttributes: {

                tag: "path",

                defaultAttributes: {

                    "fill": "none",
                    "d": "M13.997,11.944H5.92c-0.444,0-0.808,0.361-0.808,0.808c0,0.446,0.363,0.808,0.808,0.808h8.077c0.445,0,0.808-0.361,0.808-0.808C14.805,12.306,14.442,11.944,13.997,11.944z",
                },
            },


            // <path fill="none" d="M13.997,14.67H5.92c-0.444,0-0.808,0.361-0.808,0.808c0,0.447,0.363,0.808,0.808,0.808h8.077c0.445,0,0.808-0.361,0.808-0.808C14.805,15.032,14.442,14.67,13.997,14.67z"></path>
            pathSvgButtonIconSixthAttributes: {

                tag: "path",

                defaultAttributes: {

                    "fill": "none",
                    "d": "M13.997,14.67H5.92c-0.444,0-0.808,0.361-0.808,0.808c0,0.447,0.363,0.808,0.808,0.808h8.077c0.445,0,0.808-0.361,0.808-0.808C14.805,15.032,14.442,14.67,13.997,14.67z",
                },
            },


            // <div id="idButtonSidebarFourthSvgTextContainer" class="sidebarSvgTextForButtonContainer">
            divSidebarSvgTextForButtonContainerAttributes: {

                tag: "div",

                defaultAttributes: {

                    "id": "idButtonSidebarFourthSvgTextContainer",
                    "class": "sidebarSvgTextForButtonContainer",
                },

                configureAttributes(idValue)
                {
                    let configuredAttributes = this.defaultAttributes;
                    configuredAttributes["id"] = idValue;

                    configuredAttributes["tag"] = this.tag;


                    return configuredAttributes;
                },
            },


            // <svg class="containerSvgTextInsideButtonContent" viewBox="140 -17 1 25" xmlns="http://www.w3.org/2000/svg"> </svg>
            svgContainerSvgTextInsideButtonContentAttributes: {

                tag: "svg",

                defaultAttributes: {

                    "class": "containerSvgTextInsideButtonContent",
                    "xmlns": "http://www.w3.org/2000/svg",
                    "viewBox": "140 -17 1 25",
                },
            },


            // <text class="textOfButtonInsideSidebar">Traversing</text>
            textOfButtonInsideSidebarAttributes: {

                tag: "text",

                defaultAttributes: {

                    "class": "textOfButtonInsideSidebar",
                },

                defaultTextInsideButton: "Traversing",
            },

        };

        return allAttributes;
    }


    getHtmlSidebarButtonFifthConfigurations()
    {
        // TO DO: Move configuration object to the server
        const allAttributes = {

            // <div id="idButtonSidebarFifth" class="buttonWithGlowingRadialBorder">
            divButtonWithGlowingRadialBorderAttributes: {

                tag: "div",

                defaultAttributes: {

                    "id": "idButtonSidebarFifth",
                    "class": "buttonWithGlowingRadialBorder",
                },

                additionalAttributesOnClick: {

                    "class": "buttonWithGlowingRadialBorderOnClick",
                },
            },


            // <div class="borderOfButtonWithGlowingRadialBorder"> </div>
            divBorderOfButtonWithGlowingRadialBorderAttributes: {

                tag: "div",

                defaultAttributes: {

                    "class": "borderOfButtonWithGlowingRadialBorder",
                },
            },


            // <div class="contentOfButtonWithGlowingRadialBorder"> </div>
            divContentOfButtonWithGlowingRadialBorderAttributes: {

                tag: "div",

                defaultAttributes: {

                    "class": "contentOfButtonWithGlowingRadialBorder",
                },
            },


            // <div class="glowingRadialGradientInsideButtonContent">...</div>
            divGlowingRadialGradientInsideButtonContentAttributes: {

                tag: "div",

                defaultAttributes: {

                    "class": "glowingRadialGradientInsideButtonContent",
                },
            },


            // <div class="sidebarIconContainer">...</div>
            divSidebarIconContainerAttributes: {

                tag: "div",

                defaultAttributes: {

                    "class": "sidebarIconContainer",
                },
            },


            // All, except this Fourth
            // <svg class="svgButtonIcon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
            svgButtonMenuIconAttributes: {

                tag: "svg",

                defaultAttributes: {

                    "class": "svgButtonIcon",
                    "xmlns": "http://www.w3.org/2000/svg",
                    "viewBox": "0 0 16 16",
                },
            },


            // <path d="M0 4s0-2 2-2h12s2 0 2 2v6s0 2-2 2h-4q0 1 .25 1.5H11a.5.5 0 0 1 0 1H5a.5.5 0 0 1 0-1h.75Q6 13 6 12H2s-2 0-2-2zm1.398-.855a.76.76 0 0 0-.254.302A1.5 1.5 0 0 0 1 4.01V10c0 .325.078.502.145.602q.105.156.302.254a1.5 1.5 0 0 0 .538.143L2.01 11H14c.325 0 .502-.078.602-.145a.76.76 0 0 0 .254-.302 1.5 1.5 0 0 0 .143-.538L15 9.99V4c0-.325-.078-.502-.145-.602a.76.76 0 0 0-.302-.254A1.5 1.5 0 0 0 13.99 3H2c-.325 0-.502.078-.602.145" />
            pathSvgButtonIconFirstAttributes: {

                tag: "path",

                defaultAttributes: {

                    "d": "M0 4s0-2 2-2h12s2 0 2 2v6s0 2-2 2h-4q0 1 .25 1.5H11a.5.5 0 0 1 0 1H5a.5.5 0 0 1 0-1h.75Q6 13 6 12H2s-2 0-2-2zm1.398-.855a.76.76 0 0 0-.254.302A1.5 1.5 0 0 0 1 4.01V10c0 .325.078.502.145.602q.105.156.302.254a1.5 1.5 0 0 0 .538.143L2.01 11H14c.325 0 .502-.078.602-.145a.76.76 0 0 0 .254-.302 1.5 1.5 0 0 0 .143-.538L15 9.99V4c0-.325-.078-.502-.145-.602a.76.76 0 0 0-.302-.254A1.5 1.5 0 0 0 13.99 3H2c-.325 0-.502.078-.602.145",
                },
            },


            // <div id="idButtonSidebarFifthSvgTextContainer" class="sidebarSvgTextForButtonContainer">
            divSidebarSvgTextForButtonContainerAttributes: {

                tag: "div",

                defaultAttributes: {

                    "id": "idButtonSidebarFifthSvgTextContainer",
                    "class": "sidebarSvgTextForButtonContainer",
                },

                configureAttributes(idValue)
                {
                    let configuredAttributes = this.defaultAttributes;
                    configuredAttributes["id"] = idValue;

                    configuredAttributes["tag"] = this.tag;


                    return configuredAttributes;
                },
            },


            // <svg class="containerSvgTextInsideButtonContent" viewBox="140 -17 1 25" xmlns="http://www.w3.org/2000/svg"> </svg>
            svgContainerSvgTextInsideButtonContentAttributes: {

                tag: "svg",

                defaultAttributes: {

                    "class": "containerSvgTextInsideButtonContent",
                    "xmlns": "http://www.w3.org/2000/svg",
                    "viewBox": "140 -17 1 25",
                },
            },


            // <text class="textOfButtonInsideSidebar">Display</text>
            textOfButtonInsideSidebarAttributes: {

                tag: "text",

                defaultAttributes: {

                    "class": "textOfButtonInsideSidebar",
                },

                defaultTextInsideButton: "Node Info",
            },

        };

        return allAttributes;
    }



    // Form for input and buttons: Add node, Find node, Delete node,...
    getHtmlFormInputValuesDataStructureConfigurations()
    {
        // TO DO: Move configuration object to the server
        const allAttributes = {

            // <form id="idFormInputDataStructureValues">
            formInputValuesDataStructureAttributes: {

                tag: "form",

                defaultAttributes: {

                    "id": "idFormInputDataStructureValues",
                },

            },

        };

        return allAttributes;
    }


    // Input for node
    getHtmlInputNodeConfigurations()
    {
        // TO DO: Move configuration object to the server
        const allAttributes = {

            // <div id="idInpuntContainer" class="inputWithButtonsContainer"> </div>
            divInputContainerAttributes: {

                tag: "div",

                defaultAttributes: {

                    "id": "idInpuntContainer",
                    "class": "inputWithButtonsContainer",
                },
            },


            // <div id="idInputEffectSubContainer" class="inputEffectSubContainer"> </div>
            divInputEffectSubContainerAttributes: {

                tag: "div",

                defaultAttributes: {

                    "id": "idInputEffectSubContainer",
                    "class": "inputEffectSubContainer",
                },
            },

            
            // <input class="input" type="text" id="idInputForNodeValue" placeholder="" />
            inputAttributes: {

                tag: "input",

                defaultAttributes: {

                    "id": "idInputForNodeValue",
                    "class": "input",
                    "placeholder": "", // DO NOT DELETE placeholder="" it is needed for label input CSS effects
                    "type": "text",
                },

                textInsideInput: {

                    //"whenInputDisabled": "Wait for ending animation...",
                    //"whenInputEnabled": "Enter number to add, find, delete node or conditional traverse",
                    "whenInputDisabled": "", // DO NOT DELETE placeholder="" it is needed for label input CSS effects
                    "whenInputEnabled": "",// DO NOT DELETE placeholder="" it is needed for label input CSS effects
                },
            },

            
            // <label id="idLabelForInputForNodeValue" for="idInputForNodeValue">Enter number to add, find, delete node or conditional traverse</label>
            labelInputValuesDataStructureAttributes: {

                tag: "label",

                defaultAttributes: {

                    "id": "idLabelForInputForNodeValue",
                    "for": "idInputForNodeValue",
                },

                textInsideLabel: "Enter number to add, find, delete node or conditional traverse",
            },


            // It will not be used due latencies and interruptions

            // <div id="idInputProgressBar" class=""> </div>
            divInputProgressBarAttributes: {

                tag: "div",

                defaultAttributes: {

                    "id": "idInputProgressBar",
                    "class": "",
                },

                additionalStyleToShowProgressBar: {

                    "class": "inputProgressBar",
                }
            },

        };

        return allAttributes;
    }


    getFormInputValuesDataStructureSpanErrorConfigurations()
    {
        // TO DO: Move configuration object to the server
        const allAttributes = {

            // <span id="idErrorMessageSpanDataStructureInputValue" class="spanErrorMessageDataStructureInputValue"></span>
            spanErrorMessageDataStructureInputValueAttributes: {

                tag: "span",

                defaultAttributes: {

                    "id": "idErrorMessageSpanDataStructureInputValue",
                    "class": "spanErrorMessageDataStructureInputValue",
                },

            },

            // dynamically nested inside span
            // <ul class="ulErrorList"></ul>
            ulErrorListErrorMessageDataStructureInputValueAttributes: {

                tag: "ul",

                defaultAttributes: {

                    "class": "ulErrorListDataStructureInputValue",
                },

                // it hides ul
                additionalStyleError: {

                    "class": "ulErrorHideListDataStructureInputValue", // for root div inside td, that belongs to even row. Used as additional style to toggle color of cell when hover column header
                },

            },

        };

        return allAttributes;
    }

    

    // Control buttons: Add node, Find node, Delete node, Traverse



    // Button Add node
    getHtmlControlButtonAddNodeConfigurations()
    {
        // TO DO: Move configuration object to the server
        const allAttributes = {

            // <button id="idButtonAdd" class="neonButtonAdd">Add node</button>
            buttonAddNodeAttributes: {

                tag: "button",

                defaultAttributes: {

                    "id": "idButtonAdd",
                    "class": "neonButtonAdd",
                    "type": "button",
                },

                onMouseDownAttributes: {

                    "class": "neonButtonAddOnMouseDown", // DO NOT DELETE: style is applied to input container not for button
                },

            },

        };

        return allAttributes;
    }


    // Button Find node
    getHtmlControlButtonFindNodeConfigurations()
    {
        // TO DO: Move configuration object to the server
        const allAttributes = {

            // <button id="idButtonFind" class="neonButtonFind">Find node</button>
            buttonFindNodeAttributes: {

                tag: "button",

                defaultAttributes: {

                    "id": "idButtonFind",
                    "class": "neonButtonFind",
                    "type": "button",
                },

                onMouseDownAttributes: {

                    "class": "neonButtonFindOnMouseDown", // DO NOT DELETE: style is applied to input container not for button
                },
            },

        };

        return allAttributes;
    }


    // Button Delete node
    getHtmlControlButtonDeleteNodeConfigurations()
    {
        // TO DO: Move configuration object to the server
        const allAttributes = {

            // <button id="idButtonDelete" class="neonButtonDelete">Delete node</button>
            buttonDeleteNodeAttributes: {

                tag: "button",

                defaultAttributes: {

                    "id": "idButtonDelete",
                    "class": "neonButtonDelete",
                    "type": "button",
                },

                onMouseDownAttributes: {

                    "class": "neonButtonDeleteOnMouseDown", // DO NOT DELETE: style is applied to input container not for button
                },

            },

        };

        return allAttributes;
    }


    // Button Traverse Menu
    getHtmlControlButtonTraverseMenuConfigurations()
    {
        // TO DO: Move configuration object to the server
        const allAttributes = {

            // <button id="idButtonTraverseMenu" class="neonButtonTraverseMenu">Traverse</button>
            buttonTraverseMenuAttributes: {

                tag: "button",

                defaultAttributes: {

                    "id": "idButtonTraverseMenu",
                    "class": "neonButtonTraverseMenu",
                    "type": "button",
                },

                onMouseDownAttributes: {

                    "class": "neonButtonTraverseMenuOnMouseDown", // DO NOT DELETE: style is applied to input container not for button
                },

                textInsideButton: {

                    "whenButtonEnabled": "Traverse",
                },

            },

        };

        return allAttributes;
    }


    // List of traverse menu
    getHtmlControlListOfTraverseMenuConfigurations()
    {
        // TO DO: Move configuration object to the server
        const allAttributes = {

            // <div id="idListOfTraversalMenu" class="listOfTraversalMenu">
            listOfTraverseMenuAttributes: {

                tag: "div",

                defaultAttributes: {

                    "id": "idListOfTraversalMenu",
                    "class": "listOfTraversalMenu",
                    "type": "button",
                },

                onMouseDownAttributes: {

                    "class": "showListOfTraversalMenu", // DO NOT DELETE: style is applied to input container not for button
                },

            },

        };

        return allAttributes;
    }


    // Button Traverse Inorder
    getHtmlControlButtonTraverseInorderConfigurations()
    {
        // TO DO: Move configuration object to the server
        const allAttributes = {

            // <button id="idButtonTraversingInorder" class="neonButtonTraverseInorder">Traverse Inorder</button>
            buttonTraverseInorderAttributes: {

                tag: "button",

                defaultAttributes: {

                    "id": "idButtonTraversingInorder",
                    "class": "neonButtonTraverseInorder",
                    "type": "button",
                },

                onMouseDownAttributes: {

                    "class": "neonButtonTraverseInorderOnMouseDown", // DO NOT DELETE: style is applied to input container not for button
                },

            },

        };

        return allAttributes;
    }


    // Button Traverse Preorder
    getHtmlControlButtonTraversePreorderConfigurations()
    {
        // TO DO: Move configuration object to the server
        const allAttributes = {

            // <button id="idButtonTraversingPreorder" class="neonButtonTraversePreorder">Traverse Preorder</button>
            buttonTraversePreorderAttributes: {

                tag: "button",

                defaultAttributes: {

                    "id": "idButtonTraversingPreorder",
                    "class": "neonButtonTraversePreorder",
                    "type": "button",
                },

                onMouseDownAttributes: {

                    "class": "neonButtonTraversePreorderOnMouseDown", // DO NOT DELETE: style is applied to input container not for button
                },
            },

        };

        return allAttributes;
    }


    // Button Traverse Postorder
    getHtmlControlButtonTraversePostorderConfigurations()
    {
        // TO DO: Move configuration object to the server
        const allAttributes = {

            // <button id="idButtonTraversingPostorder" class="neonButtonTraversePostorder">Traverse Postorder</button>
            buttonTraversePostorderAttributes: {

                tag: "button",

                defaultAttributes: {

                    "id": "idButtonTraversingPostorder",
                    "class": "neonButtonTraversePostorder",
                    "type": "button",
                },

                onMouseDownAttributes: {

                    "class": "neonButtonTraversePostorderOnMouseDown", // DO NOT DELETE: style is applied to input container not for button
                },
            },

        };

        return allAttributes;
    }


    // Ripple Effect
    getHtmlRippleEffectOnControlButtonConfigurations()
    {
        // TO DO: Move configuration object to the server
        const allAttributes = {

            // <span id="idRippleEfect" class="neonButtonRippleEffect"></span>
            containerRippleEffectOnButtonClickAttributes: {

                tag: "span",

                defaultAttributes: {

                    "id": "idContainerRippleEffect",
                    "class": "containerRippleEffect",
                },

            },


            // <span id="idRippleEfect" class="neonButtonRippleEffect"></span>
            rippleEffectOnButtonClickAttributes: {

                tag: "span",

                defaultAttributes: {

                    "id": "idRippleEfect",
                    "class": "neonButtonRippleEffect",
                },

            },

        };

        return allAttributes;
    }


    // Button Save
    getHtmlControlButtonSaveConfigurations()
    {
        // TO DO: Move configuration object to the server
        const allAttributes = {

            // <button id="idButtonSave" class="neonButtonSave">Save</button>
            buttonSaveAttributes: {

                tag: "button",

                defaultAttributes: {

                    "id": "idButtonSave",
                    "class": "neonButtonSave",
                    "type": "button",
                },

                onMouseDownAttributes: {

                    "class": "neonButtonSaveOnMouseDown", // DO NOT DELETE: style is applied to input container not for button
                },

                textWhenSavedDatastructure: 'Saved',
                textWhenNotSavedDatastructure: 'Save',
            },

        };

        return allAttributes;
    }


    // IS NEEDED??
    // NOT THE SAME AS button Log In on the Login Form
    // Button Log In
    getHtmlControlButtonLogInConfigurations()
    {
        // TO DO: Move configuration object to the server
        const allAttributes = {

            // <button id="idButtonLogIn" class="neonButtonLogIn">Log In</button>
            buttonLogInAttributes: {

                tag: "button",

                defaultAttributes: {

                    "id": "idButtonLogIn",
                    "class": "neonButtonLogIn",
                },

                onMouseDownAttributes: {

                    "class": "neonButtonLogInOnMouseDown", // DO NOT DELETE: style is applied to input container not for button
                },

            },

        };

        return allAttributes;
    }


    // Button Authenticate
    getHtmlControlButtonAuthenticateConfigurations()
    {
        // TO DO: Move configuration object to the server
        const allAttributes = {

            // It holds the anti-forgery token
            // <input type="hidden" id="RequestVerificationToken" name="@tokens.FormFieldName" value="@tokens.RequestToken" />
            inputAuthenticateAntiForgeryTokenAttributes: {

                tag: "input",

                defaultAttributes: {

                    "id": "RequestVerificationToken",
                    "type": "hidden",
                    "value": "@tokens.RequestToken",
                },
            },

            // It holds the user's authentication status
            // <input type="hidden" id="isAuthenticated" value="@isAuthenticated.ToString().ToLower()" />
            inputUserAuthenticationStatusAttributes: {

                tag: "input",

                defaultAttributes: {

                    "id": "isAuthenticated",
                    "type": "hidden",
                    "value": "@isAuthenticated.ToString().ToLower()",
                },
            },


            // Dynamically created form to submit request about Log out to the server
            dynamicFormToSubmitLogOutAttributes: {

                tag: "form",

                defaultAttributes: {

                    "id": "idFormForLogOutButton",
                    "method": "POST",
                    "action": '/Authentication/Logout',
                },
            },

            // Dynamically created form to submit request about Log out to the server
            dynamicInputInsideFormToSubmitLogOutAttributes: {

                tag: "input",

                defaultAttributes: {

                    "name": "RequestVerificationToken",
                    "type": "hidden",
                    "value": "",
                },
            },


            // <button id="idButtonAuthenticate" class="neonButtonSignIn" type="button" data-id-button-to-click-after-authentication="">Authenticate</button>
            buttonAuthenticateAttributes: {

                tag: "button",

                defaultAttributes: {

                    "id": "idButtonAuthenticate",
                    "class": "neonButtonAuthenticate",
                    "type": "button",
                    //?????
                    "data-id-button-to-click-after-authentication": "",
                },

                onMouseDownAttributes: {

                    "class": "neonButtonAuthenticateOnMouseDown", // DO NOT DELETE: style is applied to input container not for button
                },

                textWhenAuthenticated: 'Log out',
                textWhenUnauthenticated: 'Authenticate',

                dataAttributeNames: {

                    dataAttributeNameForIdButtonToClickAfterAuthentication: "idButtonToClickAfterAuthentication",// DO NOT DELETE:  data- skipped
                }

            },

        };

        return allAttributes;
    }


    // Button Add Range node
    getHtmlControlButtonAddRangeOfNodesConfigurations()
    {
        // TO DO: Move configuration object to the server
        const allAttributes = {

            // <input class="buttonAddRange" type="button" id="idButtonAddRange" value="Add range" />
            buttonAddRangeAttributes: {

                tag: "input",

                defaultAttributes: {

                    "id": "idButtonAddRange",
                    "class": "buttonAddRange",
                    "type": "button",
                    "value": "Add range"
                },
                                
            },

        };

        return allAttributes;
    }

    // Cards for page ListDataStructures
    getHtmlCardsOfListDatastructuresConfigurations()
    {
        // TO DO: Move configuration object to the server
        const allAttributes = {

            // <div id="idCardsContainer" class="cardsContainer">
            divCardsContainerAttributes: {

                tag: "div",

                defaultAttributes: {

                    "id": "idCardsContainer",
                    "class": "cardsContainer",
                },

                // cssVariables that are used for animation related to gradient when moving mouse above the card
                cssVariables: {

                    mouseX: "--mouse-x",
                    mouseY: "--mouse-y",
                },

            },


            // <div id="idCardBinarySearchTree" class="card">
            divCardBinarySearchTreeAttributes: {

                tag: "div",

                defaultAttributes: {

                    "id": "idCardBinarySearchTree",
                    "class": "card",
                },
                
                urlToOpen: "../BinarySearchTree/Template",
            },


            // <div id="idCardAvlTree" class="card">
            divCardAvlTreeAttributes: {

                tag: "div",

                defaultAttributes: {

                    "id": "idCardAvlTree",
                    "class": "card",
                },

                urlToOpen: "../AvlTree/Template",
            },


            // <div id="idCardMinHeap" class="card">
            divCardMinHeapAttributes: {

                tag: "div",

                defaultAttributes: {

                    "id": "idCardMinHeap",
                    "class": "card",
                },

                urlToOpen: "../MinHeap/Template",
            },


            // <div id="idCardMaxHeap" class="card">
            divCardMaxHeapAttributes: {

                tag: "div",

                defaultAttributes: {

                    "id": "idCardMaxHeap",
                    "class": "card",
                },

                urlToOpen: "../MaxHeap/Template",
            },


            // <div id="idCardRedBlackTree" class="card">
            divCardRedBlackTreeAttributes: {

                tag: "div",

                defaultAttributes: {

                    "id": "idCardRedBlackTree",
                    "class": "card",
                },

                urlToOpen: "../RedBlackTree/Template",
            },


            // <div id="idCardHistory" class="card">
            divCardHistoryAttributes: {

                tag: "div",

                defaultAttributes: {

                    "id": "idCardHistory",
                    "class": "card",
                },

                urlToOpen: "../History/SavedDataStructures",
            },

        };

        return allAttributes;
    }


    // Login, SignUp form fields
    getAuthenticationFormsDatastructuresConfigurations()
    {
        // TO DO: Move configuration object to the server
        const allAttributes = {

            // <div id="idAuthorizationSuperContainer" class="authorizationSuperContainer"></div>
            // DO NOT DELETE: This tag and its style should be inserted on the page that should be extended with Authentication
            divAuthorizationSuperContainerAttributes: {

                tag: "div",

                defaultAttributes: {

                    "id": "idAuthorizationSuperContainer",
                    "class": "authorizationSuperContainer",
                },
            },


            // <div id="idWrapper" class="wrapper">
            divWrapperFormsAttributes: {

                tag: "div",

                defaultAttributes: {

                    "id": "idWrapper",
                    "class": "wrapper",
                },
            },

            // <div id="idCloseFormButton" class="closeFormButton">
            divCloseFormButtonAttributes: {

                tag: "div",

                defaultAttributes: {

                    "id": "idCloseFormButton",
                    "class": "closeFormButton",
                },
            },

            // <p id="idSignCloseForm" class="signCloseForm">X</p>
            pSignCloseFormAttributes: {

                tag: "p",

                defaultAttributes: {

                    "id": "idSignCloseForm",
                    "class": "signCloseForm",
                },
            },


            // <div id="idProgressBarContainer" class="formProgressBarContainer">
            divProgressBarContainerAttributes: {

                tag: "div",

                defaultAttributes: {

                    "id": "idProgressBarContainer",
                    "class": "formProgressBarContainer",
                },
            },


            // <div id="idProgressBar" class=""></div>
            divProgressBarAttributes: {

                tag: "div",

                defaultAttributes: {

                    "id": "idProgressBar",
                    "class": "",
                },

                additionalStyleToShowProgressBar: {

                    "class": "formProgressBar", // for root div inside td, that belongs to odd row. Used as additional style to toggle color of cell when hover column header
                }

            },


            // Login Form


            // <div id="idDivFormWrapperLogin" class="form-wrapper sign-in">
            divFormWrapperLoginAttributes: {

                tag: "div",

                defaultAttributes: {

                    "id": "idDivFormWrapperLogin",
                    "class": "form-wrapper sign-in",
                },
            },


            // <div id="idLoginScrollingFormContainer" class="scrollingFormContainer">
            divLoginScrollingFormContainerAttributes: {

                tag: "div",

                defaultAttributes: {

                    "id": "idLoginScrollingFormContainer",
                    "class": "scrollingFormContainer",
                },
            },


            // <form id="idLoginForm">
            formLoginAttributes: {

                tag: "form",

                defaultAttributes: {

                    "id": "idLoginForm",
                },
            },


            // <h2>Login</h2>
            h2LoginAttributes: {

                tag: "h2",

                defaultAttributes: {},

                textInsideH: "Login",
            },


            // Email Login

            // <div id="idInputGroupEmailLoginForm" class="input-group">
            divInputGroupEmailLoginFormAttributes: {

                tag: "div",

                defaultAttributes: {

                    "id": "idInputGroupEmailLoginForm",
                    "class": "input-group",
                },
            },


            // <input id="idInputEmailLoginForm" type="email" required />
            inputEmailLoginFormAttributes: {

                tag: "input",

                defaultAttributes: {

                    "id": "idInputEmailLoginForm",
                    "type": "email",
                    "required": "required",
                },
            },


            // <label id="idLabelEmailLoginForm" for="idInputEmailLoginForm">Email</label>
            labelEmailLoginFormAttributes: {

                tag: "label",

                defaultAttributes: {

                    "id": "idLabelEmailLoginForm",
                    "for": "idInputEmailLoginForm",
                },

                textInsideLabel: "Email",
            },

            // <span id="idSpanErrorEmailLoginForm" class="error-message-span"></span>
            spanErrorEmailLoginFormAttributes: {

                tag: "span",

                defaultAttributes: {

                    "id": "idSpanErrorEmailLoginForm",
                    "class": "error-message-span",
                },
            },


            // Password Login

            // <div id="idInputGroupPasswordLoginForm" class="input-group">
            divInputGroupPasswordLoginFormAttributes: {

                tag: "div",

                defaultAttributes: {

                    "id": "idInputGroupPasswordLoginForm",
                    "class": "input-group",
                },
            },

            // <input id="idInputPasswordLoginForm" type="password" required />
            inputPasswordLoginFormAttributes: {

                tag: "input",

                defaultAttributes: {

                    "id": "idInputPasswordLoginForm",
                    "type": "password",
                    "required": "required",
                },
            },


            // <label id="idlabelPasswordLoginForm" for="idInputPasswordLoginForm">Password</label>
            labelPasswordLoginFormAttributes: {

                tag: "label",

                defaultAttributes: {

                    "id": "idlabelPasswordLoginForm",
                    "for": "idInputPasswordLoginForm",
                },

                textInsideLabel: "Password",
            },


            // <span id="idSpanPasswordLoginFormError" class="error-message-span"></span>
            spanErrorPasswordLoginFormAttributes: {

                tag: "span",

                defaultAttributes: {

                    "id": "idSpanPasswordLoginFormError",
                    "class": "error-message-span",
                },

            },


            // dynamically nested inside span
            // <ul class="ulErrorList"></ul>
            ulErrorListSpanFormAttributes: {

                tag: "ul",

                defaultAttributes: {

                    "class": "ulErrorList",
                },

                // it hides ul gradually
                additionalStyleError: {

                    "class": "ulErrorHide", // for root div inside td, that belongs to even row. Used as additional style to toggle color of cell when hover column header
                },

            },



            // Remember Checkbox

            // <div id="idRememberLoginForm" class="remember">
            divRememberLoginFormAttributes: {

                tag: "div",

                defaultAttributes: {

                    "id": "idRememberLoginForm",
                    "class": "remember",
                },
            },


            // <label id="idRememberLabelLoginForm">
            labelRememberLabelLoginFormAttributes: {

                tag: "label",

                defaultAttributes: {

                    "id": "idRememberLabelLoginForm",
                },
            },


            // <input id="idRememberCheckboxLoginForm" type="checkbox">Remember me
            inputRememberCheckboxLoginFormAttributes: {

                tag: "input",

                defaultAttributes: {

                    "id": "idRememberCheckboxLoginForm",
                    "type": "checkbox",
                },

                textInsideInput: "Remember me",
            },

            
            // <div id="idButtonLogInContainer" class="logInButtonContainer">
            divSubmitLogInContainerAttributes: {

                tag: "div",

                defaultAttributes: {

                    "id": "idButtonLogInContainer",
                    "class": "logInButtonContainer",
                },
            },

            // +++
            // <button id="idButtonSubmitLogInForm" class="neonButtonLogIn" type="button">Log In</button>
            buttonSubmitLogInFormAttributes: {

                tag: "button",

                defaultAttributes: {

                    "id": "idButtonSubmitLogInForm",
                    "class": "neonButtonLogIn",
                    "type": "button", // not "submit"!!!!
                },

                onMouseDownAttributes: {

                    "class": "neonButtonLogInOnMouseDown", // DO NOT DELETE: style is applied to input container not for button
                },

                textInsideButton: "Log In",
            },


            // <div id="idSignUpLink" class="signUp-link">
            divSignUpLinkAttributes: {

                tag: "div",

                defaultAttributes: {

                    "id": "idSignUpLink",
                    "class": "signUp-link",
                },
            },

            // <p id="idTextDoNotHaveAnAccount">
            pTextDoNotHaveAnAccountAttributes: {

                tag: "p",

                defaultAttributes: {

                    "id": "idTextDoNotHaveAnAccount",
                },
                textInsidePTag: "Do not have an account? "
            },

            // <a id="idRegisterLink" class="signUpBtn-link">Register</a>
            aLinkRegisterAttributes: {

                tag: "a",

                defaultAttributes: {

                    "id": "idRegisterLink",
                    "class": "signUpBtn-link",
                },

                textLink: "Register",
            },



            // SignUp Form


            // <div id="idDivFormWrapperSignUp" class="form-wrapper sign-up">
            divFormWrapperSignUpAttributes: {

                tag: "div",

                defaultAttributes: {

                    "id": "idDivFormWrapperSignUp",
                    "class": "form-wrapper sign-up",
                },
            },


            // <div id="idSignUpScrollingFormContainer" class="scrollingFormContainer">
            divSignUpScrollingFormContainerAttributes: {

                tag: "div",

                defaultAttributes: {

                    "id": "idSignUpScrollingFormContainer",
                    "class": "scrollingFormContainer",
                },
            },


            // <form id="idSignUpForm">
            formSignUpAttributes: {

                tag: "form",

                defaultAttributes: {

                    "id": "idSignUpForm",
                },
            },

                       
            // <h2>Sign Up</h2>
            h2SignUpAttributes: {

                tag: "h2",

                defaultAttributes: {},

                textInsideH: "Sign Up",
            },


            // UserName SignUp

            // <div id="idInputGroupUserNameSignUpForm" class="input-group">
            divInputGroupUserNameSignUpFormAttributes: {

                tag: "div",

                defaultAttributes: {

                    "id": "idInputGroupUserNameSignUpForm",
                    "class": "input-group",
                },
            },

            // <input id="idInputUserNameSignUpForm" type="text" required />
            inputUserNameSignUpFormAttributes: {

                tag: "input",

                defaultAttributes: {

                    "id": "idInputUserNameSignUpForm",
                    "type": "text",
                    "required": "required",
                },
            },

            // <label id="idLabelUserNameSignUpForm" for="idInputUserNameSignUpForm">Username (optional)</label>
            labelUserNameSignUpFormAttributes: {

                tag: "label",

                defaultAttributes: {

                    "id": "idLabelUserNameSignUpForm",
                    "for": "idInputUserNameSignUpForm",
                },

                textInsideLabel: "Username (optional)",
            },

            // <span id="idSpanErrorUserNameSignUpForm" class="error-message-span" style="color: red; display: none;"></span>
            spanErrorUserNameSignUpFormAttributes: {

                tag: "span",

                defaultAttributes: {

                    "id": "idSpanErrorUserNameSignUpForm",
                    "class": "error-message-span",
                    "style": "color: red; display: none;"
                },
            },


            // Email SignUp

            // <div id="idInputGroupEmailSignUpForm" class="input-group">
            divInputGroupEmailSignUpFormAttributes: {

                tag: "div",

                defaultAttributes: {

                    "id": "idInputGroupEmailSignUpForm",
                    "class": "input-group",
                },
            },

            // <input id="idInputEmailSignUpForm" type="email" required />
            inputEmailSignUpFormAttributes: {

                tag: "input",

                defaultAttributes: {

                    "id": "idInputEmailSignUpForm",
                    "type": "text",
                    "required": "required",
                },
            },

            // <label id="idLabelEmailSignUpForm" for="idInputEmailSignUpForm">Email</label>
            labelEmailSignUpFormAttributes: {

                tag: "label",

                defaultAttributes: {

                    "id": "idLabelEmailSignUpForm",
                    "for": "idInputEmailSignUpForm",
                },

                textInsideLabel: "Email",
            },

            // <span id="idSpanErrorEmailSignUpForm" class="error-message-span" style="color: red; display: none;"></span>
            spanErrorEmailSignUpFormAttributes: {

                tag: "span",

                defaultAttributes: {

                    "id": "idSpanErrorEmailSignUpForm",
                    "class": "error-message-span",
                    "style": "color: red; display: none;"
                },
            },


            // Password SignUp

            // <div id="idInputGroupPasswordSignUpForm" class="input-group">
            divInputGroupPasswordSignUpFormAttributes: {

                tag: "div",

                defaultAttributes: {

                    "id": "idInputGroupPasswordSignUpForm",
                    "class": "input-group",
                },
            },

            // <input id="idInputPasswordSignUpForm" type="password" required />
            inputPasswordSignUpFormAttributes: {

                tag: "input",

                defaultAttributes: {

                    "id": "idInputPasswordSignUpForm",
                    "type": "password",
                    "required": "required",
                },
            },

            // <label id="idLabelPasswordSignUpForm" for="idInputPasswordSignUpForm">Password</label>
            labelPasswordSignUpFormAttributes: {

                tag: "label",

                defaultAttributes: {

                    "id": "idLabelPasswordSignUpForm",
                    "for": "idInputPasswordSignUpForm",
                },

                textInsideLabel: "Password",
            },

            // <span id="idSpanErrorPasswordSignUpForm" class="error-message-span" style="color: red; display: none;"></span>
            spanErrorPasswordSignUpFormAttributes: {

                tag: "span",

                defaultAttributes: {

                    "id": "idSpanErrorPasswordSignUpForm",
                    "class": "error-message-span",
                    "style": "color: red; display: none;"
                },

            },


            // Confirm Password SignUp

            // <div id="idInputGroupConfirmPasswordSignUpForm" class="input-group">
            divInputGroupConfirmPasswordSignUpFormAttributes: {

                tag: "div",

                defaultAttributes: {

                    "id": "idInputGroupConfirmPasswordSignUpForm",
                    "class": "input-group",
                },
            },

            // <input id="idInputConfirmPasswordSignUpForm" type="password" required />
            inputConfirmPasswordSignUpFormAttributes: {

                tag: "input",

                defaultAttributes: {

                    "id": "idInputConfirmPasswordSignUpForm",
                    "type": "password",
                    "required": "required",
                },
            },

            // <label id="idLabelConfirmPasswordSignUpForm" for="idInputConfirmPasswordSignUpForm">Confirm Password</label>
            labelConfirmPasswordSignUpFormAttributes: {

                tag: "label",

                defaultAttributes: {

                    "id": "idLabelConfirmPasswordSignUpForm",
                    "for": "idInputConfirmPasswordSignUpForm",
                },

                textInsideLabel: "Confirm Password",
            },

            // <span id="idSpanErrorConfirmPasswordSignUpForm" class="error-message-span" style="color: red; display: none;"></span>
            spanErrorConfirmPasswordSignUpFormAttributes: {

                tag: "span",

                defaultAttributes: {

                    "id": "idSpanErrorConfirmPasswordSignUpForm",
                    "class": "error-message-span",
                    "style": "color: red; display: none;"
                },

            },


            // Remember Checkbox

            // <div id="idRememberSignUpForm" class="remember">
            divRememberSignUpFormAttributes: {

                tag: "div",

                defaultAttributes: {

                    "id": "idRememberSignUpForm",
                    "class": "remember",
                },
            },


            // <label id="idAgreeLabelSignUpForm">
            labelRememberLabelSignUpFormAttributes: {

                tag: "label",

                defaultAttributes: {

                    "id": "idAgreeLabelSignUpForm",
                },
            },


            // <input id="idAgreeCheckbox" type="checkbox">I agree to the terms & conditions
            inputRememberCheckboxSignUpFormAttributes: {

                tag: "input",

                defaultAttributes: {

                    "id": "idAgreeCheckbox",
                    "type": "checkbox",
                },

                textInsideInput: "I agree to the terms & conditions",
            },

            
            // <div id="idButtonSignUpContainer" class="signUpButtonContainer">
            divSubmitSignUpContainerAttributes: {

                tag: "div",

                defaultAttributes: {

                    "id": "idButtonSignUpContainer",
                    "class": "signUpButtonContainer",
                },
            },


            // <button id="idButtonSubmitSignUpForm" class="neonButtonSignUp" type="button">Sign Up</button>
            buttonSubmitSignUpFormAttributes: {

                tag: "button",

                defaultAttributes: {

                    "id": "idButtonSubmitSignUpForm",
                    "class": "neonButtonSignUp",
                    "type": "button", // not "submit"!!!!
                },

                onMouseDownAttributes: {

                    "class": "neonButtonSignUpOnMouseDown", // DO NOT DELETE: style is applied to input container not for button
                },

                textInsideButton: "Sign Up",
            },





            // <div id="idLoginLinkFromSignUpForm" class="signUp-link">
            divLoginLinkFromSignUpFormAttributes: {

                tag: "div",

                defaultAttributes: {

                    "id": "idLoginLinkFromSignUpForm",
                    "class": "signUp-link",
                },
            },

            // <p id="idTextAlreadyHaveAnAccount">
            pTextDoNotHaveAnAccountAttributes: {

                tag: "p",

                defaultAttributes: {

                    "id": "idTextAlreadyHaveAnAccount",
                },

                textInsidePTag: "Already have an account? "
            },

            // <a id="idLoginLinkFromSignUpForm" class="signUpBtn-link">Login</a>
            aLoginLinkFromSignUpFormAttributes: {

                tag: "a",

                defaultAttributes: {

                    "id": "idLoginLinkFromSignUpForm",
                    "class": "signUpBtn-link",
                },

                textLink: "Login",
            },


        };

        return allAttributes;
    }



    // Reading

    getClassFromAttributesWithDot(htmlElementConfigurationObject)
    {
        let styleName = htmlElementConfigurationObject["class"];

        let styleNameWithDot = `.${styleName}`;

        return styleNameWithDot;
    }


    getClassFromAttributes(htmlElementConfigurationObject)
    {
        let styleName = htmlElementConfigurationObject["class"];

        return styleName;
    }


    // get value by key from htmlElementConfigurationObject
    getValueFromAttributes(htmlElementConfigurationObject)
    {
        return htmlElementConfigurationObject;
    }


    getCssVariablesFromAttributes(htmlElementConfigurationObject)
    {
        let cssVariables = htmlElementConfigurationObject.cssVariables;

        return cssVariables;
    }
}