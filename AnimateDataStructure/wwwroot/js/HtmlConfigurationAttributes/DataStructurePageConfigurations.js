export class DataStructurePageConfigurations
{
    getDataStructurePageConfigurations()
    {
        const allAttributes = {
            // <link rel="stylesheet" href="/css/dataStructurePageStyles.css" asp-append-version="true" />
            linkDataStructurePageStylesAttributes: {

                tag: "link",
                defaultAttributes: {
                    "rel": "stylesheet",
                    "href": "/css/dataStructurePageStyles.css",
                    "asp-append-version": "true",
                },
                
            },

            // <link rel="stylesheet" href="/css/buttonsInputStyles.css" asp-append-version="true" />
            linkButtonsInputStylesAttributes: {

                tag: "link",
                defaultAttributes: {
                    "rel": "stylesheet",
                    "href": "/css/buttonsInputStyles.css",
                    "asp-append-version": "true",
                },
            },

            // <link rel="stylesheet" href="/css/nodeDataStructureStyles.css" asp-append-version="true" />
            linkNodeDataStructureStylesAttributes: {

                tag: "link",
                defaultAttributes: {
                    "rel": "stylesheet",
                    "href": "/css/nodeDataStructureStyles.css",
                    "asp-append-version": "true",
                },
            },

            // <link rel="stylesheet" href="/css/sidebarDataStructureStyles.css" asp-append-version="true" />
            linkSidebarDataStructureStylesAttributes: {

                tag: "link",
                defaultAttributes: {
                    "rel": "stylesheet",
                    "href": "/css/sidebarDataStructureStyles.css",
                    "asp-append-version": "true",
                },
            },

            // <link rel="stylesheet" href="/css/tableStyles.css" asp-append-version="true" />
            linkTableStylesAttributes: {

                tag: "link",
                defaultAttributes: {
                    "rel": "stylesheet",
                    "href": "/css/tableStyles.css",
                    "asp-append-version": "true",
                },
            },

            // tag style creates dynamically, it is not created explicitly on html-page 
            // <style id = "idDataStructurePageStyles" >...</style>
            styleTagAttributes: {

                tag: "style",
                defaultAttributes: {
                    "id": "idDataStructurePageStyles",
                },

                configureAttributes(idValue)
                {
                    return {
                        "id": idValue,
                    };
                },
            },

        };

        return allAttributes;
    }
}
