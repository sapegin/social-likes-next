import { prefix } from './config';
import { toArray } from './util';
import SocialLikes from './social-likes';

// Symbol to store an instance reference in a DOM node
const symbol = 'socialLikes';

/**
 * Initialize or update Social Likes on a DOM element.
 *
 * @param {HTMLElement} elem DOM element.
 * @param {Object} [options] Options.
 * @return {SocialLikes}
 */
export default function init(elem, options = {}) {
	let instance = elem[symbol];
	if (instance) {
		instance.update(options);
	}
	else {
		instance = elem[symbol] = new SocialLikes(elem, options);
	}
	return instance;
}

/**
 * Init Social Likes on all elements with class .social-likes.
 *
 * @param {boolean} wait Wait for DOM ready if no elements found.
 */
export function autoInit(wait = false) {
	let elements = document.querySelectorAll(`.${prefix}`);
	if (elements) {
		toArray(elements).forEach(elem => init(elem));
	}
	else if (wait) {
		// No elements found. Wait for DOM content loaded to try again in case the script was included in the <head>
		document.addEventListener('DOMContentLoaded', autoInit);
	}
}

// Auto initialization
autoInit(true);
