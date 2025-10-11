import { DataStructurePageConfigurations } from '../HtmlConfigurationAttributes/DataStructurePageConfigurations.js';


export class CssFileReaderWriter
{
	constructor()
	{
		this.pageConfigurations = this.getPageConfigurations();
	}

	async readFileWithStyles(pathsToCssFile)
	{
		let concatenatedCssContent = '';

		try
		{
			for (let path of pathsToCssFile)
			{
				let response = await fetch(path);

				if (!response.ok)
				{
					throw new Error(`Status: ${response.status}`);
				}

				concatenatedCssContent += await response.text();

				concatenatedCssContent = this.normalizeText(concatenatedCssContent);

				concatenatedCssContent += '\n';
			}

			return concatenatedCssContent;
		}
		catch (error)
		{
			new Error(`Unable to load all css-files`);
		}
	}


	async writeCssIntoStyleTag(idStyleTag, pathsToCssFile)
	{
		let styleTag = document.getElementById(idStyleTag);

		if (!styleTag)
		{
			styleTag = this.createStyleTag(idStyleTag);
		}

		let concatenatedCssContent = await this.readFileWithStyles(pathsToCssFile);
		styleTag.textContent = concatenatedCssContent;
	}


	createStyleTag(idStyleTag)
	{
		let tagName = this.pageConfigurations.styleTagAttributes.tag;
		let styleDomElement = document.createElement(tagName);
		styleDomElement.id = idStyleTag;
		document.head.appendChild(styleDomElement);

		return styleDomElement;
	}


	getIdStyleTag()
	{
		return this.pageConfigurations.styleTagAttributes.defaultAttributes.id;
	}


	normalizeText(cssContentToNormalize)
	{
		return cssContentToNormalize.replace(/\r\n/g, '\n');
	}


	getPathsToCssFiles()
	{
		let pathsToCssFile = [this.pageConfigurations.linkDataStructurePageStylesAttributes.defaultAttributes.href,
			this.pageConfigurations.linkButtonsInputStylesAttributes.defaultAttributes.href,
			this.pageConfigurations.linkNodeDataStructureStylesAttributes.defaultAttributes.href,
			this.pageConfigurations.linkSidebarDataStructureStylesAttributes.defaultAttributes.href,
			this.pageConfigurations.linkTableStylesAttributes.defaultAttributes.href];

		return pathsToCssFile;
	}


	getPageConfigurations()
	{
		let dataStructurePageConfigurations = new DataStructurePageConfigurations();

		return dataStructurePageConfigurations.getDataStructurePageConfigurations();
	}

}