import test from 'ava';
import SocialLikes from '../src/social-likes';
import { createWidget } from './button.spec';

/* eslint-disable max-len */

export function createButtons() {
	let container = document.createElement('div');
	container.appendChild(createWidget({}, 'facebook'));
	container.appendChild(createWidget({}, 'twitter'));
	return container;
}

test('SocialLikes constructor should initialize container', t => {
	let container = createButtons();
	let likes = new SocialLikes(container);

	t.ok(likes);
	t.is(container.className, 'social-likes social-likes_visible');
});

test('SocialLikes constructor should initialize buttons', t => {
	let likes = new SocialLikes(createButtons());

	t.is(likes.buttons.length, 2);
});

test('SocialLikes constructor should pass options to each button', t => {
	let likes = new SocialLikes(createButtons(), {});

	t.is(likes.buttons[0].options.title, 'My Little Pony');
	t.is(likes.buttons[1].options.title, 'My Little Pony');
});

test('SocialLikes constructor should set default URL and title', t => {
	let likes = new SocialLikes(createButtons());

	t.is(likes.buttons[0].options.url, 'about:blank');
	t.is(likes.buttons[0].options.title, 'My Little Pony');
});

test('SocialLikes constructor should merge options with default options', t => {
	let likes = new SocialLikes(createButtons(), {
		url: 'http://example.com',
	});

	t.is(likes.buttons[0].options.url, 'http://example.com');
	t.is(likes.buttons[0].options.title, 'My Little Pony');
});

test('SocialLikes constructor should merge options with data-attributes', t => {
	let container = createButtons();
	container.setAttribute('data-title', 'Foo');
	let likes = new SocialLikes(container);

	t.is(likes.buttons[0].options.url, 'about:blank');
	t.is(likes.buttons[0].options.title, 'Foo');
});

test('SocialLikes.update should not update options when URL is the same', t => {
	let likes = new SocialLikes(createButtons(), {});

	likes.update({
		url: 'about:blank',
		title: 'Foo',
	});

	t.is(likes.buttons[0].options.title, 'My Little Pony');
});

test('SocialLikes.update should update options for every button when URL is different', t => {
	let likes = new SocialLikes(createButtons(), {});

	likes.update({
		url: 'http://example.com',
		title: 'Foo',
	});

	t.is(likes.buttons[0].options.title, 'Foo');
});
