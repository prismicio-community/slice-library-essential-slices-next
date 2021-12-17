# slice-library-essential-slices-next

A nicely made Slice Library for [Next.js][nextjs].

## Demo

<a href="#"><img src="https://angeloashmore-slicemachine-intro.cdn.prismic.io/angeloashmore-slicemachine-intro/49ca4bde-b36a-42f4-a072-60d2e5202f85_try-button.svg" alt="Try on Slice Showcase" width="200" /></a>

## Quick Start

Start a new [Slice Machine][slicemachine] project with this Slice Library with the following command:

```bash
npx @slicemachine/init@latest --lib prismicio-community/slice-library-essential-slices-next
```

The same command can be used to add the Slice Library to an existing Slice Machine project.

## Post-Install Setup

Import `reset.css` and `styles.css` in `pages/_app.js`:

```js
import "../essential-slices/reset.css";
import "../essential-slices/styles.css";
```

If you don't have a `pages/_app.js` file, you can create a new file with these contents:

```js
import "../essential-slices/reset.css";
import "../essential-slices/styles.css";

export default function App({ Component, pageProps }) {
	return <Component {...pageProps} />;
}
```

[nextjs]: https://nextjs.org/
[prismic-react]: https://github.com/prismicio/prismic-react/tree/v2
[slicemachine]: https://slicemachine.dev/
[link-resolver]: https://prismic.io/docs/core-concepts/link-resolver-route-resolver
