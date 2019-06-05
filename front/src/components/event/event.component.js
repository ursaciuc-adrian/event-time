(function() {
	const currentDocument = document.currentScript.ownerDocument;

	class AppEvent extends BaseComponent {
		constructor() {
			super();
		}
		
		connectedCallback() {
			this.createShadowRoot();
			this.renderData();
		}
	
		createShadowRoot() {
			const shadowRoot = this.attachShadow({ mode: "open" });
			const template = currentDocument.querySelector(
				"#app-event-template"
			);
			const instance = template.content.cloneNode(true);
			shadowRoot.appendChild(instance);
		}
	
		renderData() {
			var attributes = [].filter.call(this.attributes, function(at) {
				return /^data-/.test(at.name);
			});
	
			attributes.forEach(attribute => {
				const name = attribute.name.substr(5);
				const value = attribute.value;
	
				this.shadowRoot.innerHTML = this.shadowRoot.innerHTML.replace(
					"{{ " + name + " }}",
					value
				);
			});
		}
	}

	customElements.define("app-event", AppEvent);
})();
