import { AbstractControlButtonEffects } from './AbstractControlButtonEffects.js';

export class ButtonTraverseMenuEffects extends AbstractControlButtonEffects
{
	constructor()
	{
		super();
		this.buttonTraverseMenuConfigurations = this.htmlConfigurationAttributesReader.getHtmlControlButtonTraverseMenuConfigurations();
		this.listOfTraverseMenuConfigurations = this.htmlConfigurationAttributesReader.getHtmlControlListOfTraverseMenuConfigurations();
		this.idButton = this.buttonTraverseMenuConfigurations.buttonTraverseMenuAttributes.defaultAttributes.id;
		this.idlistOfTraverseMenu = this.listOfTraverseMenuConfigurations.listOfTraverseMenuAttributes.defaultAttributes.id;
	}


	onMouseDown()
	{
		let inputContainerDomElement = this.getInputContainerDomElement();
		let additionalClassOnMouseDown = this.getAdditionalClassOnMouseDown(this.buttonTraverseMenuConfigurations.buttonTraverseMenuAttributes);
		this.onAbstractMouseDown(this.idButton, inputContainerDomElement, additionalClassOnMouseDown, this);
	}


	onMouseUp()
	{
		let inputContainerDomElement = this.getInputContainerDomElement();
		this.onAbstractMouseUp(this.idButton, inputContainerDomElement, this);
	}


	onAbstractMouseDown(idButton, buttonContainerDomElement, additionalClassOnMouseDown, context)
	{
		if (!buttonContainerDomElement)
		{
			throw new Error("Container for buttons is not specified");
		}
		let buttonNodeDomElement = context.getDomElement(idButton);

		buttonNodeDomElement.addEventListener("mousedown", function (evn)
		{
			buttonContainerDomElement.classList.toggle(additionalClassOnMouseDown);
			this.showHideTraverseMenuList(this.idlistOfTraverseMenu, this.listOfTraverseMenuConfigurations.listOfTraverseMenuAttributes)
		}.bind(context));
	}


	onMouseClick()
	{
		this.onAbstractClick(this.idButton, this, null);
	}


	showHideTraverseMenuList(idlistOfTraverseMenu, listOfTraverseMenuAttributes)
	{
		let listOfTraverseMenuDomElement = this.getDomElement(idlistOfTraverseMenu);
		let additionalClassForListOfTraverseMenu = this.getAdditionalClassOnMouseDown(listOfTraverseMenuAttributes);
		listOfTraverseMenuDomElement.classList.toggle(additionalClassForListOfTraverseMenu);
	}
}