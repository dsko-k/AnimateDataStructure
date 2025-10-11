import { SidebarButtonSecond } from './SidebarButtonSecond.js';
import { SidebarButtonThird } from './SidebarButtonThird.js';
import { SidebarButtonFourth } from './SidebarButtonFourth.js';
import { SidebarButtonFifth } from './SidebarButtonFifth.js';
import { HtmlConfigurationAttributesReader } from '../HtmlConfigurationAttributes/HtmlConfigurationAttributesReader.js';

// ---------- Begin pattern Strategy SidebarButton instead SidebarButtonsToHtmlTableConfigurations ----------

export class ContextSidebarButtons
{
    constructor(idSidebarButtonOrderNumber, dataStructure)
    {
        this.dataStructure = dataStructure;
        this.idSidebarButtonOrderNumber = idSidebarButtonOrderNumber;

        this.htmlConfigurationAttributesReader = new HtmlConfigurationAttributesReader();

        this.sidebarMenuButton = this.htmlConfigurationAttributesReader.getHtmlSidebarButtonMenuConfigurations();
        this.sidebarButtonSecond = this.htmlConfigurationAttributesReader.getHtmlSidebarButtonSecondConfigurations();
        this.sidebarButtonThird = this.htmlConfigurationAttributesReader.getHtmlSidebarButtonThirdConfigurations();
        this.sidebarButtonFourth = this.htmlConfigurationAttributesReader.getHtmlSidebarButtonFourthConfigurations();
        this.sidebarButtonFifth = this.htmlConfigurationAttributesReader.getHtmlSidebarButtonFifthConfigurations();

        this.sidebarMenuButtonId = this.sidebarMenuButton.divButtonWithGlowingRadialBorderAttributes.defaultAttributes.id;
        this.sidebarButtonSecondId = this.sidebarButtonSecond.divButtonWithGlowingRadialBorderAttributes.defaultAttributes.id;
        this.sidebarButtonThirdId = this.sidebarButtonThird.divButtonWithGlowingRadialBorderAttributes.defaultAttributes.id;
        this.sidebarButtonFourthId = this.sidebarButtonFourth.divButtonWithGlowingRadialBorderAttributes.defaultAttributes.id;
        this.sidebarButtonFifthId = this.sidebarButtonFifth.divButtonWithGlowingRadialBorderAttributes.defaultAttributes.id;

        this.idSidebarButtonToInstanceSidebarButtonOrderNumber =
        {
            [this.sidebarButtonSecondId]: new SidebarButtonSecond(idSidebarButtonOrderNumber, this.dataStructure),
            [this.sidebarButtonThirdId]: new SidebarButtonThird(idSidebarButtonOrderNumber, this.dataStructure),
            [this.sidebarButtonFourthId]: new SidebarButtonFourth(idSidebarButtonOrderNumber, this.dataStructure),
            [this.sidebarButtonFifthId]: new SidebarButtonFifth(idSidebarButtonOrderNumber, this.dataStructure),
        };
    }


    retrieveDataTableToHtmlTableConfigurations()
    {
        if (!this.idSidebarButtonToInstanceSidebarButtonOrderNumber.hasOwnProperty(this.idSidebarButtonOrderNumber))
        {
            throw new Error(`Sidebar button with id = ${this.idSidebarButtonOrderNumber} was not found`);
        }

        let sidebarButtonOrderNumber = this.idSidebarButtonToInstanceSidebarButtonOrderNumber[this.idSidebarButtonOrderNumber];

        return sidebarButtonOrderNumber.getDataTableToHtmlTableConfigurations();
    }

}