import {
	start,
	loadSourceFiles,
	generatePages,
	savePages,
	createTemplateRenderer,
	helpers,
} from 'fledermaus';

start('Building the page...');

process.chdir(__dirname);

let renderTemplate = createTemplateRenderer({ root: '.' });

let documents = loadSourceFiles('.', ['md']);

let pages = generatePages(documents, { assetsFolder: '../docs' }, helpers, { ect: renderTemplate });

savePages(pages, '../docs');
