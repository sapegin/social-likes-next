# How to contribute

I love pull requests. And following this simple guidelines will make your pull request easier to merge.


## Submitting pull requests

1. Create a new branch, don’t work in master directly.
2. Add failing tests for the change you want to make. Run tests (see below) to see the tests fail.
3. Hack on.
4. Run tests to see if the tests pass. Repeat steps 2–4 until done.
5. Update the documentation to reflect your changes.
6. Push to your fork and submit a pull request.


## JavaScript code style

See [ESLint config](https://github.com/tamiadev/eslint-config-tamia) for more details.

- Tab indentation.
- Single-quotes.
- Semicolons.
- No trailing whitespace.
- Variables where needed.
- Multiple variable statements.
- Space after keywords and between arguments and operators.
- Use === and !== over == and !=.
- Return early.
- Limit line lengths to 120 chars.
- Prefer readability over religion.
- Use ES6.

Example:

```js
function foo(bar, fum) {
    if (!bar) {
    	return;
    }

    let hello = 'Hello';
    let ret = 0;
    bar.forEach(item => {
        if (item === hello) {
            ret += fum(bar[barIdx]);
        }
    });

    return ret;
}
```


## Other notes

- If you have commit access to repo and want to make big change or not sure about something, make a new branch and open pull request.
- Don’t commit generated files: compiled from Stylus CSS, transpiled or minified JavaScript, etc.
- Don’t change version number and changelog.
- Install [EditorConfig](http://editorconfig.org/) plugin for your code editor.
- Feel free to [ask me](http://sapegin.me/contacts) anything you need.


## Building and running tests

Install dependencies:

```bash
npm install
```

Hack on:

```bash
npm start
npm skins:watch
```

Run tests:

```bash
npm test
```
