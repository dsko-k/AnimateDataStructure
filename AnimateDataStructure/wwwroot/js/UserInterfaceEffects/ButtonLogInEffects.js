import { AbstractControlButtonEffects } from './AbstractControlButtonEffects.js';

// IS NEEDED?
export class ButtonLogInEffects extends AbstractControlButtonEffects
{
	constructor()
	{
		super();
		this.buttonLogInConfigurations = this.htmlConfigurationAttributesReader.getHtmlControlButtonLogInConfigurations();
		this.idButton = this.buttonLogInConfigurations.buttonLogInAttributes.defaultAttributes.id;
	}


	onMouseDown()
	{
		let inputContainerDomElement = this.getInputContainerDomElement(); // from Base class
		let additionalClassOnMouseDown = this.getAdditionalClassOnMouseDown(this.buttonLogInConfigurations.buttonLogInAttributes);
		this.onAbstractMouseDown(this.idButton, inputContainerDomElement, additionalClassOnMouseDown, this);
	}


	onMouseUp()
	{
		let inputContainerDomElement = this.getInputContainerDomElement();
		this.onAbstractMouseUp(this.idButton, inputContainerDomElement, this);
	}


	onMouseClick()
	{
		this.onAbstractClick(this.idButton, this, null);
	}
}