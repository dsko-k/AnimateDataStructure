import { AbstractSidebarButton } from './AbstractSidebarButton.js';
import { ContextDataToHtmlTableConfigurationAttributesReader } from '../HtmlConfigurationAttributes/ContextDataToHtmlTableConfigurationAttributesReader.js';



export class SidebarButtonThird extends AbstractSidebarButton
{
    constructor(idSidebarButton, dataStructure)
    {
        super(idSidebarButton, dataStructure);
        this.dataStructure = dataStructure;
        this.contextDataToHtmlTableConfigurationAttributesReader = new ContextDataToHtmlTableConfigurationAttributesReader(this.dataStructure);
    }


    getDataTableToHtmlTableConfigurations()
    {
        return this.contextDataToHtmlTableConfigurationAttributesReader.createDataTableToHtmlTableConfigurationsForTreeOperations(this.dataStructure);
    }
}