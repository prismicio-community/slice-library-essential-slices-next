# slice-library-essential-slices

Nicely made Slice Library for Next.js.

- ⬛ Built with [Theme UI][theme-ui]
- ⚛️ Configurable with [`@prismicio/react`][prismic-react]

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

   import theme from "../slices/slice-library-essential-slices/theme";

   function App({ Component, pageProps }) {
     return (
       <ThemeProvider theme={theme}>
         <PrismicProvider>
           <Component {...pageProps} />
         </PrismicProvider>
       </ThemeProvider>
     );
   }

   export default App;
   ```

3. If needed, configure `<PrismicProvider>` with your app's [Link Resolver][link-resolver] and custom Link component.

   ```jsx
   // _app.js

   import { linkResolver } from "../linkResolver";
   import { Link } from "../components/Link";

   <PrismicProvider linkResolver={linkResolver} internalLinkComponent={Link}>
     {/* ...children... */}
   </PrismicProvider>;
   ```

[theme-ui]: https://theme-ui.com/
[prismic-react]: https://github.com/prismicio/prismic-react/tree/v2
[slicemachine]: https://slicemachine.dev/
[link-resolver]: https://prismic.io/docs/core-concepts/link-resolver-route-resolver
