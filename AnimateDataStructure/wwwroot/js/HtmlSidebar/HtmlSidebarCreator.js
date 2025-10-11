import { HtmlAbstractDomElementPart } from '../HtmlDomElementHandler/HtmlAbstractDomElementPart.js';
import { HtmlConfigurationAttributesReader } from '../HtmlConfigurationAttributes/HtmlConfigurationAttributesReader.js';


// -------------------------------------------- Begin Build html-sidebar via pattern Builder  --------------------------------------------

// Contains methods that nesting html-elements with children (except text content)
export class HtmlSidebarCreator // Foreman
{
    constructor(htmlSidebarBuilder)
    {
        this.htmlSidebarBuilder = htmlSidebarBuilder;
        this.htmlAbstractDomElementPart = new HtmlAbstractDomElementPart();
        this.htmlConfigurationAttributesReader = new HtmlConfigurationAttributesReader();
        this.attributesForSidebar = this.htmlConfigurationAttributesReader.getHtmlSidebarConfigurations();
        this.attributesForButtonMenu = this.htmlConfigurationAttributesReader.getHtmlSidebarButtonMenuConfigurations();
        this.attributesForButtonSecond = this.htmlConfigurationAttributesReader.getHtmlSidebarButtonSecondConfigurations();
        this.attributesForButtonThird = this.htmlConfigurationAttributesReader.getHtmlSidebarButtonThirdConfigurations();
        this.attributesForButtonFourth = this.htmlConfigurationAttributesReader.getHtmlSidebarButtonFourthConfigurations();
        this.attributesForButtonFifth = this.htmlConfigurationAttributesReader.getHtmlSidebarButtonFifthConfigurations();
    }


    constructSidebar()
    {
        let divSidebarContainer = this.htmlAbstractDomElementPart.createHtmlTag(this.attributesForSidebar.divSidebarContainerAttributes);

        let divSidebar = this.htmlAbstractDomElementPart.createHtmlTag(this.attributesForSidebar.divSidebarAttributes);

        // buttons
        let divSidebarButtonMenu = this.constructButtonMenu();
        let divSidebarButtonSecond = this.constructButtonSecond();
        let divSidebarButtonThird = this.constructButtonThird();
        let divSidebarButtonFourth = this.constructButtonFourth();
        let divSidebarButtonFifth = this.constructButtonFifth();


        // Inserting
        divSidebarContainer.addChildDomElement(divSidebar);
        divSidebar.addChildDomElement(divSidebarButtonMenu);
        divSidebar.addChildDomElement(divSidebarButtonSecond);
        divSidebar.addChildDomElement(divSidebarButtonThird);
        divSidebar.addChildDomElement(divSidebarButtonFourth);
        divSidebar.addChildDomElement(divSidebarButtonFifth);


        let bodyDomElement = document.getElementById("idBody");
        bodyDomElement.insertAdjacentElement("afterbegin", divSidebarContainer.getCreatedDomElement());
    }


    // Sidebar buttons

    constructButtonMenu()
    {
        let arrayOfPathAttributes = [this.attributesForButtonMenu.pathSvgButtonIconFirstAttributes];

        let divSidebarButtonMenu = this.htmlSidebarBuilder.buildSidebarButton(this.attributesForButtonMenu, arrayOfPathAttributes);

        return divSidebarButtonMenu;
    }


    constructButtonSecond()
    {
        let arrayOfPathAttributes = [this.attributesForButtonSecond.pathSvgButtonIconFirstAttributes,
        this.attributesForButtonSecond.pathSvgButtonIconSecondAttributes];

        let divSidebarButtonMenu = this.htmlSidebarBuilder.buildSidebarButton(this.attributesForButtonSecond, arrayOfPathAttributes);

        return divSidebarButtonMenu;
    }


    constructButtonThird()
    {
        let arrayOfPathAttributes = [this.attributesForButtonThird.pathSvgButtonIconFirstAttributes];

        let divSidebarButtonMenu = this.htmlSidebarBuilder.buildSidebarButton(this.attributesForButtonThird, arrayOfPathAttributes);

        return divSidebarButtonMenu;
    }


    constructButtonFourth()
    {
        let arrayOfPathAttributes = [
            this.attributesForButtonFourth.pathSvgButtonIconFirstAttributes,
            this.attributesForButtonFourth.pathSvgButtonIconSecondAttributes,
            this.attributesForButtonFourth.pathSvgButtonIconThirdAttributes,
            this.attributesForButtonFourth.pathSvgButtonIconFourthAttributes,
            this.attributesForButtonFourth.pathSvgButtonIconFifthAttributes,
            this.attributesForButtonFourth.pathSvgButtonIconSixthAttributes
        ];

        let divSidebarButtonMenu = this.htmlSidebarBuilder.buildSidebarButton(this.attributesForButtonFourth, arrayOfPathAttributes);

        return divSidebarButtonMenu;
    }


    constructButtonFifth()
    {
        let arrayOfPathAttributes = [this.attributesForButtonFifth.pathSvgButtonIconFirstAttributes];

        let divSidebarButtonMenu = this.htmlSidebarBuilder.buildSidebarButton(this.attributesForButtonFifth, arrayOfPathAttributes);

        return divSidebarButtonMenu;
    }
}