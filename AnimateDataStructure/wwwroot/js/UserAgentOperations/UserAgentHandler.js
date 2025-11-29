import { HtmlConfigurationAttributesReader } from '../HtmlConfigurationAttributes/HtmlConfigurationAttributesReader.js';
import { ConverterConfigirationsToDomElement } from '../HtmlDomElementHandler/ConverterConfigirationsToDomElement.js';

export class UserAgentHandler
{
    constructor()
    {
        this.htmlConfigurationAttributesReader = new HtmlConfigurationAttributesReader();
        this.userAgentNotificationConfigs = this.htmlConfigurationAttributesReader.getUserAgentNotificationConfigurations();
        this.converterConfigirationsToDomElement = new ConverterConfigirationsToDomElement();
    }


    isSupportedBrowserType()
    {
        const userAgent = navigator.userAgent;
        let supportedBrowsers = this.getSupportedBrowsers();
        return userAgent.includes(supportedBrowsers.chrome);
    }


    getSupportedBrowsers()
    {
        return this.userAgentNotificationConfigs.divUserAgentNotificationContainerAttributes.supportedBrowsers;
    }


    showUserAgentNotification()
    {
        if (this.isSupportedBrowserType())
        {
            return;
        }
        let userAgentNotificationContainer = this.converterConfigirationsToDomElement.getDomElementFromConfigurations(this.userAgentNotificationConfigs.divUserAgentNotificationContainerAttributes);
        let styleNameToShowUserAgentNotification = this.getStyleNameToShowUserAgentNotification();
        userAgentNotificationContainer.classList.toggle(styleNameToShowUserAgentNotification);
    }


    getStyleNameToShowUserAgentNotification()
    {
        return this.userAgentNotificationConfigs.divUserAgentNotificationContainerAttributes.additionalStyleToShowUserAgentNotificationMessage.class;
    }


    onClickButtonCloseUserAgentNotification()
    {
        let closeButtonUserAgentNotification = this.converterConfigirationsToDomElement.getDomElementFromConfigurations(this.userAgentNotificationConfigs.divCloseButtonUserAgentNotificationAttributes);
        let userAgentNotificationContainer = this.converterConfigirationsToDomElement.getDomElementFromConfigurations(this.userAgentNotificationConfigs.divUserAgentNotificationContainerAttributes);
        closeButtonUserAgentNotification.addEventListener("click", function (evn)
        {
            evn.stopPropagation();
            userAgentNotificationContainer.remove();
        }.bind(this));
    }
}