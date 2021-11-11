# slice-library-essential-slices

A nicely made Slice Library for [Next.js][nextjs].

- ⬛ Built with [Theme UI][theme-ui]
- ⚛️ Configurable with [`@prismicio/react`][prismic-react]

[![Try on Slice Showcase](https://angeloashmore-slicemachine-intro.cdn.prismic.io/angeloashmore-slicemachine-intro/49ca4bde-b36a-42f4-a072-60d2e5202f85_try-button.svg)](#)

## Quick Start

Start a new [Slice Machine][slicemachine] project with this Slice Library with the following command:

```bash
npx @slicemachine/init@latest --lib prismicio-community/slice-library-essential-slices
```

The same command can be used to add the Slice Library to an existing Slice Machine project.

## Post-Install Setup

1. Install [Theme UI][theme-ui].

   ```bash
   npm i theme-ui
   ```

2. Add `<ThemeProvider>` and `<PrismicProvider>` to `_app.js`.

   ```jsx
   // _app.js

   import { ThemeProvider } from "theme-ui";
   import { PrismicProvider } from "@prismicio/react";
   import { PrismicNextLink } from "@prismicio/next";

   import theme from "../slices/slice-library-essential-slices/theme";

   function App({ Component, pageProps }) {
     return (
       <ThemeProvider theme={theme}>
         <PrismicProvider internalLinkComponent={PrismicNextLink}>
           <Component {...pageProps} />
         </PrismicProvider>
       </ThemeProvider>
     );
   }

   export default App;
   ```

3. If your app uses a [Link Resolver][link-resolver], add it to `<PrismicProvider>` in `_app.js`.

   ```jsx
   // _app.js

   import { linkResolver } from "../linkResolver";

   <PrismicProvider linkResolver={linkResolver}>
     {/* ...children... */}
   </PrismicProvider>;
   ```

[nextjs]: https://nextjs.org/
[theme-ui]: https://theme-ui.com/
[prismic-react]: https://github.com/prismicio/prismic-react/tree/v2
[slicemachine]: https://slicemachine.dev/
[link-resolver]: https://prismic.io/docs/core-concepts/link-resolver-route-resolver
