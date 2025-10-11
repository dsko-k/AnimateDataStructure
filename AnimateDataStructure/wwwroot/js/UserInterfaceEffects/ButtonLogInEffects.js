import { AbstractControlButtonEffects } from './AbstractControlButtonEffects.js';

// IS NEEDED????
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
		//let additionalClassOnMouseDown = this.getAdditionalClassOnMouseDown(this.buttonLogInConfigurations.buttonLogInAttributes);
		//this.onAbstractMouseDown(this.idButton, additionalClassOnMouseDown, this);

		let inputContainerDomElement = this.getInputContainerDomElement(); // DO NOT DELETE: from Base class

		let additionalClassOnMouseDown = this.getAdditionalClassOnMouseDown(this.buttonLogInConfigurations.buttonLogInAttributes);
		this.onAbstractMouseDown(this.idButton, inputContainerDomElement, additionalClassOnMouseDown, this);
	}


	onMouseUp()
	{
		//this.onAbstractMouseUp(this.idButton, this);

		let inputContainerDomElement = this.getInputContainerDomElement(); // DO NOT DELETE: from Base class
		this.onAbstractMouseUp(this.idButton, inputContainerDomElement, this);
	}


	onMouseClick()
	{
		this.onAbstractClick(this.idButton, this, null); // method onAfterRippleEffectEnded should be implemented here instead null
	}
}