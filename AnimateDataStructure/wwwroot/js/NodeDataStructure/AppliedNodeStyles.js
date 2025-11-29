
export class AppliedNodeStyles
{
	constructor()
	{
		this.appliedNodeStyles = [];
	}


	getAllDomNodes(node)
	{
		if (!node)
		{
			throw new Error(`Node is ${node}`);
		}
		let foundDomElements = Array.from(document.querySelectorAll(`[id*=${node.nodeId}]`));
		return !foundDomElements ? foundDomElements : foundDomElements.map(domElement =>
		{
			return {
				id: domElement.id,
				elementName: domElement.dataset.elementName,
				class: domElement.getAttribute("class"),
			}
		});
	}


	addAppliedNodeStyles(node, nodeState)
	{
		let allDomNodes = this.getAllDomNodes(node);
		this.appliedNodeStyles.push({
			allDomNodes: allDomNodes,
			nodeState: nodeState,
		});
	}
}