
# Social Likes Next

Beautiful share buttons for popular social networks: Facebook, Twitter, Google+, Pinterest, Vkontakte and Odnoklassniki.

![](http://wow.sapegin.me/101O2X050C32/social-likes-next.png)

## Features

- Easy to install.
- Beautiful and all in one style (with three different skins).
- Won’t explode your page’s layout.

This is a modern version of the [Social Likes for jQuery](https://github.com/sapegin/social-likes). Main distinctions:

- No dependencies.
- No counters.
- No single button mode.
- SVG icons.
- Supports IE11+.

## Installation and configuration

```bash
npm install --save social-likes-next
```

Add to your HTML:

```html
<link rel="stylesheet" href="node_modules/social-likes-next/dist/social-likes_flat.css">
...
<script src="node_modules/social-likes-next/dist/social-likes.min.js"></script>
...
<div class="social-likes">
	<div data-service="facebook" title="Share link on Facebook">Facebook</div>
	<div data-service="twitter" title="Share link on Twitter">Twitter</div>
	<div data-service="plusone" title="Share link on Google+">Google+</div>
</div>
```

## Advanced configuration

### Layout

#### Default

All buttons in a row.

```html
<div class="social-likes">
	<div class="facebook" title="Share link on Facebook">Facebook</div>
	...
</div>
```

#### Vertical

All buttons in a column.

```html
<div class="social-likes social-likes_vertical">
	<div class="facebook" title="Share link on Facebook">Facebook</div>
	...
</div>
```

### Options

Options define via HTML data attributes or JavaScript parameters object.

`url`

URL of shareable page. Current page by default.

`title`

Title for Twitter, Vkontakte and LiveJournal. Current page’s title by default.

Examples:

```html
<div class="social-likes" data-url="http://landscapists.info/" data-title="Landscapists of Russia">
	…
</div>
```

```js
$('.social-likes').socialLikes({
	url: 'https://github.com/sapegin/social-likes/',
	title: 'Beautiful “like” buttons with counters for popular social networks'
});
```


### Services specific options

#### Twitter

You can specify `via` (site’s or your own Twitter) and `related` (any other Twitter you want to advertise) values for `<div class="twitter">`:

```html
<div class="twitter" data-via="sapegin" data-related="Landscapists">Twitter</div>
```

#### Pinterest

You should specify an image URL via data-media attribute on `<div class="pinterest">`:

```html
<div class="pinterest" data-media="http://example.com/image/url.jpg">Pinterest</div>
```

### Manual initialization

Could be useful on dynamic (AJAX) websites.

```html
<div id="share">
	<div class="facebook">Facebook</div>
	...
</div>
```

```javascript
$('#share').socialLikes();
```


### Dynamic URL changing

You can dynamically replace URL, title and Pinterest image without reinitialization.

```html
<div id="share2" class="social-likes" data-url="http://example.com/" data-title="My example">
	<div class="facebook">Facebook</div>
	...
</div>
```

```javascript
$('#share2').socialLikes({
	url: 'http://github.com/',
	title: 'GitHub',
	data: {
		media: 'http://birdwatcher.ru/i/userpic.jpg'  // Image for Pinterest button
	}
});
```


### Events

#### `popup_opened.social-likes`

Triggers after popup window opened.

```javascript
$('.social-likes').on('popup_opened.social-likes', function(event, service, win) {
	// win is popup window handler (window.open())
});
```

#### `popup_closed.social-likes`

Triggers after popup window closed.

```javascript
$('.social-likes').on('popup_closed.social-likes', function(event, service) {
	// Request new counters
	$(event.currentTarget).socialLikes({forceUpdate: true});

	// Or just increase the number
	var counter = $(event.currentTarget).find('.social-likes__counter_' + service);
	counter.text(+(counter.text()||0)+1).removeClass('social-likes__counter_empty');
});
```


### Adding your own button

You can find some custom buttons in `contrib` folder.

Define `socialLikesButtons` object:

```javascript
var socialLikesButtons = {
	surfingbird: {
		popupUrl: 'http://surfingbird.ru/share?url={url}',
		popupWidth: 650,
		popupHeight: 500
	}
};
```

Or with a custom click handler:

```javascript
var socialLikesButtons = {
	livejournal: {
		click: function(e) {
			// this.widget.data('something')
		}
	}
};
```

Add some CSS:

```css
.social-likes__button_surfingbird {
	background: #f2f3f5;
	color: #596e7e;
	border-color: #ced5e2;
	}
.social-likes__icon_surfingbird {
	background: url(http://surfingbird.ru/img/share-icon.png) no-repeat 2px 3px;
	}
```

And use it like any other button:

```html
<div class="surfingbird">Surf</div>
```

See sources (`src` folder) for available options and class names and `contrib` folder for custom buttons examples.


## FAQ

### Likes or shares?

This plugin allows your users to “share” the content of your website. (Un)fortunately¹ real “likes” are possible only when you use original Facebook, Google+, etc. buttons.

¹ I believe that “shares” are much better and valuable than “likes” because they’re more visible in feed and users could add they’re own comments to links they share. “Like” costs nothing.

### How to change title, description and image

You can use [Open Graph](http://ogp.me/). It works for [Facebook](http://davidwalsh.name/facebook-meta-tags), Twitter, [Google+](https://developers.google.com/+/web/snippet/), [Pinterest](http://developers.pinterest.com/rich_pins/) and [Vkontakte](http://vk.com/dev/widget_like)). 

You can add additional Twitter data using [Twitter Card](https://dev.twitter.com/docs/cards). You have to [approve](https://dev.twitter.com/docs/cards/validation/validator) every type of Twitter Card.

```html
<meta property="og:type" content="article">
<meta property="og:url" content="{page_url}">
<meta property="og:title" content="{title}">
<meta property="og:description" content="{description}">
<meta property="og:image" content="{image_url}">
<meta name="twitter:card" content="summary">
<meta name="twitter:site" content="@SiteTwitter">
<meta name="twitter:creator" content="@sapegin">
```

If you’re experiencing any problems with meta data try [Open Graph Debugger](https://developers.facebook.com/tools/debug/) and [Twitter Card Validator](https://dev.twitter.com/docs/cards/validation/validator).


### How to use Social Likes with Wordpress, etc.

See [wiki](https://github.com/sapegin/social-likes/wiki/How-to-use-Social-Likes-with-Wordpress,-etc.).

### How to track activity with Google Analytics

You can track how many people click on each social button on your site with Google Analytics (or other analytics service). Note that you can track clicks only, not real shares.

```javascript
$(document).on('popup_opened.social-likes', function(event, service) {
    ga('send', 'social', service, 'share', location.href);
});
```

## Troubleshooting

### The buttons don’t work, displayed without design or don’t displayed at all

First look at your [browser’s console](http://wickedlysmart.com/hfjsconsole/).

If you don’t see any errors check the following:

1. `social-likes.js` is included and the path is correct.

2. `social-likes_flat.css` or `social-likes_light.css` or `social-likes_birman.css` is included in the <head> of your page and the path is correct.

So you need your page to look like this:

```html
<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<title>Welcome to my site!</title>
	<link href="social-likes_birman.css" rel="stylesheet">
	<script src="social-likes.js"></script>
	...
```

## Release History

The changelog can be found in the [Changelog.md](Changelog.md) file.

## Contributing

Everyone is welcome to contribute. Please take a moment to review the [contributing guidelines](Contributing.md).

## Author

* [Artem Sapegin](http://sapegin.me/)


---

## License

The MIT License, see the included [license.md](license.md) file.
