import { AbstractControlButtonEffects } from './AbstractControlButtonEffects.js';

export class InputNodeEffects extends AbstractControlButtonEffects
{
	constructor()
	{
		super();
		this.inputForNodeContainerConfigurations = this.htmlConfigurationAttributesReader.getHtmlInputNodeConfigurations();
		this.idInputEffectSubContainer = this.inputForNodeContainerConfigurations.divInputEffectSubContainerAttributes.defaultAttributes.id;
	}


	onMouseClick()
	{
		this.onAbstractClick(this.idInputEffectSubContainer, this, null);
	}
}