const postcss = require('postcss');

// .skin_birman .social-likes__widget:active .skin_birman .social-likes__icon →
// .skin_birman .social-likes__widget:active .social-likes__icon,
module.exports = postcss.plugin('postcss-fixnesting', () => {
	return css => {
		css.walkRules(rule => {
			if (rule.selector.startsWith('.skin_')) {
				rule.selector = rule.selector.split(',').map(
					part => part.replace(/ \.skin_\w+/g, '')
				).join(',');
			}
		});
	};
});
