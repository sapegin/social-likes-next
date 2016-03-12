global.window = require('domino').createWindow();
global.document = window.document;

/* eslint-disable no-invalid-this */

// Fixtures
document.title = 'My Little Pony';
global.window.socialLikesButtons = {
	pony: {
		popupUrl: 'http://example.com/',
		icon: '',
	},
	twitter: {
		popupUrl: 'http://facebook.com/',
	},
	clickable: {
		clickUrl: 'http://example.com/',
		icon: '',
	},
};

// dataset polyfill
// Based on https://gist.github.com/brettz9/4093766
let propDescriptor = {
	enumerable: true,
	get() {
		let toUpperCase = function(n0) {
			return n0.charAt(1).toUpperCase();
		};
		let getter = function() {
			return this;
		};
		let setter = function(attrName, value) {
			return (typeof value !== 'undefined')
				? this.setAttribute(attrName, value)
				: this.removeAttribute(attrName)
				;
		};
		// Simulate DOMStringMap w/accessor support
		let HTML5DOMStringMap = {};
		for (let attrName in this.attributes) {
			let attribute = this.attributes[attrName];
			if ((/^data-\w[\w\-]*$/).test(attrName)) {
				let attrVal = attribute.value;
				// Change to CamelCase
				let propName = attrName.substr(5).replace(/-./g, toUpperCase);
				Object.defineProperty(HTML5DOMStringMap, propName, {
					enumerable: true,
					get: getter.bind(attrVal || ''),
					set: setter.bind(this, attrName),
				});
			}
		}
		return HTML5DOMStringMap;
	},
};
Object.defineProperty(window.Element.prototype, 'dataset', propDescriptor);
