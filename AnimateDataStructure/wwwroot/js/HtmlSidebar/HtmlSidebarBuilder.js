import { HtmlAbstractDomElementPart } from '../HtmlDomElementHandler/HtmlAbstractDomElementPart.js';
import { HtmlConfigurationAttributesReader } from '../HtmlConfigurationAttributes/HtmlConfigurationAttributesReader.js';

// Contains methods that create html-elements with attributes, but without any nesting children (except text content)
export class HtmlSidebarBuilder // abstract Builder
{
    constructor()
    {
        this.htmlAbstractDomElementPart = new HtmlAbstractDomElementPart();
        this.htmlConfigurationAttributesReader = new HtmlConfigurationAttributesReader();
    }

    // ------------- Nesting button parts -----------
    buildSidebarButton(attributesForElements, arrayOfPathAttributes)
    {
        // <div id="idButtonSidebarMenu" class="buttonWithGlowingRadialBorder menuButtonWithGlowingRadialBorder"> or        
        // <div id="idButtonSidebarMenu" class="buttonWithGlowingRadialBorder"> </div>
        let divButtonWithGlowingRadialBorder = this.htmlAbstractDomElementPart.createHtmlTag(attributesForElements.divButtonWithGlowingRadialBorderAttributes);
        // <div class="borderOfButtonWithGlowingRadialBorder"></div>
        let divBorderOfButtonWithGlowingRadialBorder = this.htmlAbstractDomElementPart.createHtmlTag(attributesForElements.divBorderOfButtonWithGlowingRadialBorderAttributes);
        // <div class="contentOfButtonWithGlowingRadialBorder"> </div>
        let divContentOfButtonWithGlowingRadialBorder = this.htmlAbstractDomElementPart.createHtmlTag(attributesForElements.divContentOfButtonWithGlowingRadialBorderAttributes);
        // <div class="glowingRadialGradientInsideButtonContent"></div>
        let divGlowingRadialGradientInsideButtonContent = this.htmlAbstractDomElementPart.createHtmlTag(attributesForElements.divGlowingRadialGradientInsideButtonContentAttributes);
        // <div class="sidebarIconContainer">
        let divSidebarIconContainer = this.buildSidebarIconContainer(attributesForElements.divSidebarIconContainerAttributes, attributesForElements.svgButtonMenuIconAttributes, arrayOfPathAttributes);
        // <div id="idMenuSidebarSvgTextForButtonContainer" class="sidebarSvgTextForButtonContainer">
        let divSidebarSvgTextForButtonContainer = this.buildSidebarSvgTextForButtonContainer(attributesForElements.divSidebarSvgTextForButtonContainerAttributes, attributesForElements.svgContainerSvgTextInsideButtonContentAttributes, attributesForElements.textOfButtonInsideSidebarAttributes);
        divButtonWithGlowingRadialBorder.addChildDomElement(divBorderOfButtonWithGlowingRadialBorder);
        divButtonWithGlowingRadialBorder.addChildDomElement(divContentOfButtonWithGlowingRadialBorder);
        divContentOfButtonWithGlowingRadialBorder.addChildDomElement(divGlowingRadialGradientInsideButtonContent);
        divContentOfButtonWithGlowingRadialBorder.addChildDomElement(divSidebarIconContainer);
        divContentOfButtonWithGlowingRadialBorder.addChildDomElement(divSidebarSvgTextForButtonContainer);

        return divButtonWithGlowingRadialBorder;
    }


    // <div class="sidebarIconContainer">
    buildSidebarIconContainer(sidebarIconContainerConfigurationObject, svgContainerSvgTextConfigurationObject, arrayOfPathAttributes)
    {
        // <div class="sidebarIconContainer">
        let divSidebarIconContainer = this.htmlAbstractDomElementPart.createHtmlTag(sidebarIconContainerConfigurationObject);
        // <svg class="svgButtonIcon" xmlns="http://www.w3.org/2000/svg" viewBox=".....">
        let svgButtonIcon = this.htmlAbstractDomElementPart.createHtmlTag(svgContainerSvgTextConfigurationObject);
        let paths = this.buildPaths(arrayOfPathAttributes);
        svgButtonIcon.addChildren(paths);
        divSidebarIconContainer.addChildDomElement(svgButtonIcon);

        return divSidebarIconContainer;
    }


    // <path d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3m5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3m5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3" />
    // ...
    // <path fill-rule="evenodd" d="M6 3.5A1.5 1.5 0 0 1 7.5 2h1A1.5 1.5 0 0 1 10 3.5v1A1.5 1.5 0 0 1 8.5 6v1H14a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-1 0V8h-5v.5a.5.5 0 0 1-1 0V8h-5v.5a.5.5 0 0 1-1 0v-1A.5.5 0 0 1 2 7h5.5V6A1.5 1.5 0 0 1 6 4.5zM8.5 5a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5zM0 11.5A1.5 1.5 0 0 1 1.5 10h1A1.5 1.5 0 0 1 4 11.5v1A1.5 1.5 0 0 1 2.5 14h-1A1.5 1.5 0 0 1 0 12.5zm1.5-.5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5zm4.5.5A1.5 1.5 0 0 1 7.5 10h1a1.5 1.5 0 0 1 1.5 1.5v1A1.5 1.5 0 0 1 8.5 14h-1A1.5 1.5 0 0 1 6 12.5zm1.5-.5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5zm4.5.5a1.5 1.5 0 0 1 1.5-1.5h1a1.5 1.5 0 0 1 1.5 1.5v1a1.5 1.5 0 0 1-1.5 1.5h-1a1.5 1.5 0 0 1-1.5-1.5zm1.5-.5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5z" />
    // <path fill="none" d="M17.222,5.041l-4.443-4.414c-0.152-0.151-0.356-0.235-0.571-0.235h-8.86c-0.444,0-0.807,0.361-0.807,0.808v17.602c0,0.448,0.363,0.808,0.807,0.808h13.303c0.448,0,0.808-0.36,0.808-0.808V5.615C17.459,5.399,17.373,5.192,17.222,5.041zM15.843,17.993H4.157V2.007h7.72l3.966,3.942V17.993z"></path>
    buildPaths(arrayOfPathAttributes)
    {
        let paths = arrayOfPathAttributes.map(pathAttributes =>
        {
            return this.htmlAbstractDomElementPart.createHtmlTag(pathAttributes);
        });

        return paths;
    }


    buildSidebarSvgTextForButtonContainer(sidebarSvgTextForButtonContainerConfigurationObject, svgContainerSvgTextConfigurationObject, textOfButtonConfigurationObject)
    {
        // <div id="idMenuSidebarSvgTextForButtonContainer" class="sidebarSvgTextForButtonContainer">
        let divSidebarSvgTextForButtonContainer = this.htmlAbstractDomElementPart.createHtmlTag(sidebarSvgTextForButtonContainerConfigurationObject);
        // <svg class="containerSvgTextInsideButtonContent" viewBox="140 -17 1 25" xmlns="http://www.w3.org/2000/svg">
        let svgContainerSvgTextInsideButtonContent = this.htmlAbstractDomElementPart.createHtmlTag(svgContainerSvgTextConfigurationObject);
        // <text class="textOfButtonInsideSidebar">MENU</text>
        let text = this.htmlAbstractDomElementPart.createHtmlTag(textOfButtonConfigurationObject);
        this.htmlAbstractDomElementPart.createHtmlTagWithText(text, textOfButtonConfigurationObject.defaultTextInsideButton);
        divSidebarSvgTextForButtonContainer.addChildDomElement(svgContainerSvgTextInsideButtonContent);
        svgContainerSvgTextInsideButtonContent.addChildDomElement(text);

        return divSidebarSvgTextForButtonContainer;
    }
}