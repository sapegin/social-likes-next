import test from 'ava';
import {
	objectToQueryString,
	addParamsToUrl,
	template,
	makeUrl,
	className,
	svg,
} from '../src/util';

test('objectToQueryString should convert an object to a query string', t => {
	let r = objectToQueryString({ a: 'foo', b: 42 });
	t.is(r, 'a=foo&b=42');
});

test('objectToQueryString should skip nulls and empty strings', t => {
	let r = objectToQueryString({ a: 'foo', b: null, c: '' });
	t.is(r, 'a=foo');
});

test('addParamsToUrl should append params to an URL', t => {
	let r = addParamsToUrl('/foo/bar', { a: 'foo', b: 42 });
	t.is(r, '/foo/bar?a=foo&b=42');
});

test('addParamsToUrl should append params to an URL with existing params', t => {
	let r = addParamsToUrl('/foo/bar?baz=bar', { a: 'foo', b: 42 });
	t.is(r, '/foo/bar?baz=bar&a=foo&b=42');
});

test('template should render a template', t => {
	let r = template('Foo {bar} baz {boo}.', { bar: 'foo', boo: 42 });
	t.is(r, 'Foo foo baz 42.');
});

test('template should accept a converted function', t => {
	let r = template('Foo {bar} baz {boo}.', { bar: 'foo', boo: 'baa' }, s => s.toUpperCase());
	t.is(r, 'Foo FOO baz BAA.');
});

test('makeUrl should make an URL from a template', t => {
	let r = makeUrl('/foo?bar={bar}', { bar: 'foo<baz&boo' });
	t.is(r, '/foo?bar=foo%3Cbaz%26boo');
});

test('className should return a class name', t => {
	let r = className('button');
	t.is(r, 'social-likes__button');
});

test('className should return a class name with a modifier', t => {
	let r = className('button', 'big');
	t.is(r, 'social-likes__button social-likes__button_big');
});

test('svg should return an SVG with given path and class name', t => {
	let r = svg('foo', 'facebook');
	t.is(r,
		'\n\t\t<svg class="facebook" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16">\n' +
		'\t\t\t<path d="foo"/>\n' +
		'\t\t</svg>\n\t'
	);
});

test('svg should accept paths as an array', t => {
	let r = svg(['foo', 'bar'], 'facebook');
	t.is(r,
		'\n\t\t<svg class="facebook" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16">\n' +
		'\t\t\t<path d="foo"/>\n<path d="bar"/>\n' +
		'\t\t</svg>\n\t'
	);
});
