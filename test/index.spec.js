import test from 'ava';
import init, { autoInit } from '../src/index';
import { createButtons } from './social-likes.spec';

/* eslint-disable max-len */

test('init should initialize SocialLikes', t => {
	let container = createButtons();
	let likes = init(container);

	t.ok(likes);
	t.ok(container.socialLikes);
});

test('init should pass options to SocialLikes', t => {
	let container = createButtons();
	init(container, {
		url: 'http://example.com',
	});

	t.is(container.socialLikes.buttons[0].options.url, 'http://example.com');
});

test('init should update options if instance already exists on this element', t => {
	let container = createButtons();

	init(container);
	t.is(container.socialLikes.buttons[0].options.url, 'about:blank');

	init(container, {
		url: 'http://example.com',
	});
	t.is(container.socialLikes.buttons[0].options.url, 'http://example.com');
});

test('autoInit should initialize SocialLikes on all elements with .social-likes class', t => {
	let container1 = createButtons();
	container1.className = 'social-likes';
	container1.setAttribute('data-url', 'http://foo.com');
	document.body.appendChild(container1);
	let container2 = createButtons();
	container2.setAttribute('data-url', 'http://bar.com');
	container2.className = 'social-likes';
	document.body.appendChild(container2);

	autoInit();

	t.ok(container1.socialLikes);
	t.ok(container2.socialLikes);
});
