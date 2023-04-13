# 🎉 Reveal.js Confetti 🎉

This is a [RevealJS](https://revealjs.com/) plugin that allows you to fire confetti cannons on your slides based on a data attribute.

## Usage

Clone the repo:

```sh
git clone https://github.com/philnash/reveal-confetti.git
cd reveal-confetti
```

Install the dependencies

```sh
npm install
```

Build the code:

```sh
npm run build
```

In your RevealJS slides, create a directory called `./plugin/confetti`. Copy the file `dist/confetti.js` from this project into the `./plugin/confetti` directory.

In your RevealJS slides HTML, add this script to the page with the other plugins:

```html
<script src="plugin/confetti/confetti.js"></script>
```

Add `RevealConfetti` to the Reveal plugins array:

```js
Reveal.initialize({
  plugins: [RevealConfetti],
});
```

Now, to add confetti to a page you can add `data-confetti` to the slide's `<section>` element.

```html
<section data-confetti>
  <h1>My slide title</h1>
</section>
```

You can also made a smaller confetti burst with:

```html
<section data-confetti data-confetti-small>
  <h1>My slide title</h1>
</section>
```

Or a long burst of confetti cannons from both sides of the page by adding `data-confetti-large` and a duration in seconds with `data-confetti-duration`:

```html
<section data-confetti data-confetti-large data-confetti-duration="15">
  <h1>My slide title</h1>
</section>
```

### Advanced

You can change the colours of the confetti by adding the data attribute `data-confetti-colors` with a space delimited list of hex colours:

```html
<section data-confetti data-confetti-colors="#f00 #0f0 #00f">
  <h1>My slide title</h1>
</section>
```

You can also change the number of particles fired with the data attribute `data-confetti-particle-count`.

```html
<section data-confetti data-confetti-particle-count="400">
  <h1>My slide title</h1>
</section>
```

Note: this does not work with the `data-confetti-large`.

## Thanks

This plugin uses [Canvas Confetti](https://github.com/catdad/canvas-confetti) under the hood and implements [some of the examples that you can see here](https://www.kirilv.com/canvas-confetti/).

## License

MIT License Copyright (c) 2023 Phil Nash
