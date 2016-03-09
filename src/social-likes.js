import Button from './button';
import { assign, toArray } from './util';
import { prefix } from './config';

// Default options
const defaults = {
	url: window.location.href.replace(window.location.hash, ''),
	title: document.title
};

/**
 * Social Likes.
 *
 * @param {HTMLElement} container HTML container element.
 * @param {Object} [options] Options.
 */
export default class SocialLikes {
	constructor(container, options = {}) {
		this.container = container;
		this.options = assign({}, defaults, options);

		let buttons = this.container.children;

		this.buttons = toArray(buttons).map((elem) => {
			return new Button(elem, this.options);
		});

		this.container.classList.add(prefix);
		this.container.classList.add(`${prefix}_visible`);
	}

	update(options) {
		if (options.url === this.options.url) {
			return;
		}

		// Update options
		assign(this.options, options);

		// Update each button
		this.buttons.forEach((button) => {
			button.update(options);
		});
	}
}
