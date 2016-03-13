import deepmerge from 'deepmerge';
import Button from './button';
import { dataset, toArray } from './util';
import { prefix } from './config';

// Default options
const defaults = {
	url: window.location.href.replace(window.location.hash, ''),
	title: document.title,
};

/**
 * Social Likes.
 *
 * @param {HTMLElement} container HTML container element.
 * @param {Object} [options] Options.
 */
export default class SocialLikes {
	constructor(container, options = {}) {
		container.classList.add(prefix);

		// Options: default < constructor < container data-attributes
		options = deepmerge(deepmerge(defaults, options), dataset(container));
		this.url = options.url;

		this.buttons = toArray(container.children).map(elem => {
			return new Button(elem, options);
		});

		container.classList.add(`${prefix}_visible`);
	}

	update(options) {
		if (options.url === this.url) {
			return;
		}

		// Update each button
		this.buttons.forEach(button => button.update(options));
	}
}
