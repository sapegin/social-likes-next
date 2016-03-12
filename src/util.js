import { prefix } from './config';

/**
 * Object deep merge.
 * https://github.com/KyleAMathews/deepmerge
 *
 * @param {Object} target
 * @param {Object} src
 */
export function deepmerge(target, src) {
	let array = Array.isArray(src);
	let dst = array ? [] : {};

	if (array) {
		target = target || [];
		dst = dst.concat(target);
		src.forEach((e, i) => {
			if (typeof dst[i] === 'undefined') {
				dst[i] = e;
			}
			else if (typeof e === 'object') {
				dst[i] = deepmerge(target[i], e);
			}
			else if (target.indexOf(e) === -1) {
				dst.push(e);
			}
		});
	}
	else {
		if (target && typeof target === 'object') {
			Object.keys(target).forEach(key => {
				dst[key] = target[key];
			});
		}
		Object.keys(src).forEach(key => {
			if (typeof src[key] !== 'object' || !src[key]) {
				dst[key] = src[key];
			}
			else if (!target[key]) {
				dst[key] = src[key];
			}
			else {
				dst[key] = deepmerge(target[key], src[key]);
			}
		});
	}

	return dst;
}

/**
 * Return node.dataset as an object
 *
 * @param {Node} node DOM node.
 * @return {Object}
 */
export function dataset(node) {
	let data = {};
	for (let key in node.dataset) {
		data[key] = node.dataset[key];
	}
	return data;
}

/**
 * Append params to the URL.
 *
 * @param {String} url Base URL.
 * @param {Object} params Params to append.
 * @return {String}
 */
export function addParamsToUrl(url, params) {
	params = objectToQueryString(params);
	if (!params) {
		return url;
	}

	let glue = url.indexOf('?') === -1 ? '?' : '&';
	return url + glue + params;
}

/**
 * Convert object to a query string: a=1&b=2.
 *
 * @param {Object} params Parameters.
 * @return {String}
 */
export function objectToQueryString(params) {
	return Object.keys(params).reduce((pairs, key) => {
		let value = params[key];
		if (value !== null && value !== '') {
			pairs.push(key + '=' + encodeURIComponent(value));
		}
		return pairs;
	}, []).join('&');
}

/**
 * Open popup window.
 *
 * @param {String} url URL.
 * @param {Number} options.width Width.
 * @param {Number} options.height Height.
 * @param {String} options.name Window name.
 * @return {Object}
 */
export function openPopup(url, { width, height, name }) {
	let left = Math.round(screen.width / 2 - width / 2);
	let top = 0;
	if (screen.height > height) {
		top = Math.round(screen.height / 3 - height / 2);
	}

	let win = window.open(url, name, `
		left=${left},
		top=${top},
		width=${width},
		height=${height},
		personalbar=0,
		toolbar=0,
		scrollbars=1,
		resizable=1
	`);
	if (win) {
		win.focus();
		return win;
	}
	else {
		location.href = url;
		return null;
	}
}

/**
 * Template with encodeURIComponent for URLs.
 *
 * @param {String} url URL template.
 * @param {Object} context Replacements object.
 * @return {String}
 */
export function makeUrl(url, context) {
	return template(url, context, encodeURIComponent);
}

/**
 * Simple template.
 *
 * @param {String} tmpl Template.
 * @param {Object} context Replacements object.
 * @param {Function} [filter] Value filter function.
 * @return {String}
 */
export function template(tmpl, context, filter) {
	return tmpl.replace(/\{([^}]+)}/g, function(m, key) {
		let value = filter ? filter(context[key]) : context[key];
		// If key doesn't exists in the context we should keep template tag as is
		return key in context ? value : m;
	});
}

/**
 * Generates BEM class names for a block or element.
 * Block name is fixed to the ${prefix} value.
 *
 * @param {String} [elem] Element name.
 * @param {String} [mod] Modifier.
 * @return {String}
 */
export function className(elem, mod) {
	let base = prefix + (elem ? `__${elem}` : '');
	return base +
		(mod ? ` ${base}_${mod}` : '')
	;
}

/**
 * Convert array like object to array.
 *
 * @param {object} list Array like object.
 * @returns {Array}
 */
export function toArray(list) {
	return Array.prototype.slice.call(list);
}

/**
 * Returns SVG code of an icon.
 *
 * @param {String} pathData SVG path of an icon.
 * @param {String} cls CSS class name.
 * @return {String}
 */
export function svg(pathData, cls) {
	let paths = pathData.split(';').map(p => `<path d="${p}"/>`);
	return `
		<svg class="${cls}" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16">
			${paths.join('\n')}
		</svg>
	`;
}
