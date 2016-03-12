/**
 * Prints a path of an SVG <path> tag.
 *
 * Usage:
 *
 *   svgpath facebook -> M13 0H3C1 0 0 1 0 3v10c0...
 */

var fs = require('fs');
var path = require('path');

function getAllMatches(string, regexp) {
	var match;
	var matches = [];
	do {
		match = regexp.exec(string);
		if (match) {
			matches.push(match[1]);
		}
	} while (match);
	return matches;
}

var filepath = path.resolve(__dirname, '../skins/icons/' + process.argv[2] + '.svg');
var svg = fs.readFileSync(filepath, {encoding: 'utf8'});
var paths = getAllMatches(svg, /<path d="([^"]+)"/g);
if (paths.length) {
	console.log(JSON.stringify(paths));
}
else {
	throw new Error('Cannot find SVG path in ' + filepath);
}
