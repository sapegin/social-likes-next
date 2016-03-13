import test from 'ava';
import Button from '../src/button';

/* eslint-disable max-len */

export function createWidget(attrs = {}, service = 'facebook') {
	let widget = document.createElement('div');
	widget.className = widget.innerHTML = service;
	for (let name in attrs) {
		widget.setAttribute(name, attrs[name]);
	}
	return widget;
}

test('Button constructor should initialize a button object', t => {
	let widget = createWidget();
	let button = new Button(widget, {});

	t.is(button.service, 'facebook');
});

test('Button constructor should accept service name as a data-attribute', t => {
	let widget = createWidget({
		'data-service': 'facebook',
	});
	widget.className = '';
	let button = new Button(widget, {});

	t.is(button.service, 'facebook');
});

test('Button should merge user buttons with default buttons', t => {
	let widget = createWidget({}, 'pony');
	let button = new Button(widget, {});

	t.is(button.service, 'pony');
});

test('User should be able to overwrite base buttons options', t => {
	let widget = createWidget({}, 'twitter');
	let button = new Button(widget, {});

	t.is(button.service, 'twitter');
	t.is(button.options.popupUrl, 'http://facebook.com/');
});

test('Button constructor should read widget’s data-attributes', t => {
	let widget = createWidget({
		'data-url': 'http://example.com',
	});
	let button = new Button(widget, {});

	t.same(button.data, {
		url: 'http://example.com',
	});
});

test('Button constructor should merge widget’s data-attributes, options passed to constructor and service options', t => {
	let widget = createWidget({
		'data-title': 'Foo',
	});
	let button = new Button(widget, {
		url: 'http://example.com',
		title: 'Bar',
	});

	t.same(button.options, {
		url: 'http://example.com',
		title: 'Foo',
		icon: 'M13 0H3C1 0 0 1 0 3v10c0 2 1 3 3 3h5V9H6V7h2V5c0-2 2-2 2-2h3v2h-3v2h3l-.5 2H10v7h3c2 0 3-1 3-3V3c0-2-1-3-3-3z',
		popupUrl: 'https://www.facebook.com/sharer/sharer.php?u={url}',
		popupWidth: 600,
		popupHeight: 500,
	});
});

test('Button constructor should create a button markup', t => {
	let widget = createWidget();
	let button = new Button(widget, {});

	let w = button.widget;
	t.is(w.className, 'social-likes__widget social-likes__widget_facebook');

	let svg = w.querySelector('svg');
	t.ok(svg);
	t.is(svg.className, 'social-likes__icon social-likes__icon_facebook');

	let btn = w.querySelector('div');
	t.ok(btn);
	t.is(btn.className, 'social-likes__button social-likes__button_facebook');
	t.is(btn.innerHTML.trim(), 'facebook');
});

test('Button should preserve HTML in a widget', t => {
	const html = '<b>facebook</b>';
	let widget = createWidget();
	widget.innerHTML = html;
	let button = new Button(widget, {});

	let btn = button.widget.querySelector('div');
	t.is(btn.innerHTML.trim(), html);
});

test('Button should make an <a> tag if a service has a clickUrl option', t => {
	let widget = createWidget({}, 'clickable');
	let button = new Button(widget, {});

	let btn = button.widget.querySelector('a');
	t.ok(btn);
	t.is(btn.href, 'http://example.com/');
});

test('Button should add __invisible-button class if a service has a clickUrl option but a widget has no text', t => {
	let widget = createWidget({}, 'clickable');
	widget.innerHTML = '';
	let button = new Button(widget, {});

	let btn = button.widget.querySelector('a');
	t.ok(btn);
	t.is(btn.className, 'social-likes__invisible-button social-likes__invisible-button_clickable');
});

test('Button should not create a button element if a widget has no text', t => {
	let widget = createWidget({});
	widget.innerHTML = '';
	let button = new Button(widget, {});

	t.true(button.widget.classList.contains('social-likes__widget_notext'));
	t.notOk(button.widget.querySelector('div'));
	t.notOk(button.widget.querySelector('a'));
});

test('Button.makeUrl should return a URL with URL and title of the current button', t => {
	let widget = createWidget({});
	let button = new Button(widget, {
		url: 'http://foo.com/',
		title: 'Pony',
	});

	let r = button.makeUrl('http://bar.com/?url={url}&title={title}');

	t.is(r, 'http://bar.com/?url=http%3A%2F%2Ffoo.com%2F&title=Pony');
});

test('Button.makeUrlWithParams should return a URL with appended data-attributes, should ignore service, url, etc.', t => {
	let widget = createWidget({
		'data-service': 'facebook',
		'data-media': 'http://foo.com/pony.jpg',
		'data-url': 'http://bar.com/',
		'data-title': 'Pony',
	});
	let button = new Button(widget);

	let r = button.makeUrlWithParams('http://baz.com/?url={url}&title={title}');

	t.is(r, 'http://baz.com/?url=http%3A%2F%2Fbar.com%2F&title=Pony&media=http%3A%2F%2Ffoo.com%2Fpony.jpg');
});

test('Button.update should update options', t => {
	let widget = createWidget();
	let button = new Button(widget, {
		title: 'Bar',
	});

	button.update({
		title: 'Foo',
	});

	t.is(button.options.title, 'Foo');
});
