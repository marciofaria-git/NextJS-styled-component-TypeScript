# How to use styled-components in NextJS with TypeScript

This is a step-by-step guide to using style components with TypeScript and SSR

## Getting Started

First, create a project Next JS with TypeScript

```
yarn create next-app --typescript
```

More about how to do this, go to the documentation of Next.js

[DOCS-NextJS](https://nextjs.org/docs)

## How To Step By Step

### 1° Install the styled-components

```
yarn add styled-components
```

And the types of styled-components for TypeScript Projects

```
yarn add -D @types/styled-components
```

### 2° Install the Babel Plugin and configure it

```
yarn add -D babel-plugin-styled-components
```

and the babel present for TypeScript

```
yarn add -D @babel/preset-typescript
```

and the babel core

```
yarn add @babel/core

```

create a file inside the root directory with the name <strong>.babelrc</strong>

Paste the code belown

```

{
"plugins": [
[
"babel-plugin-styled-components",

        {
          "ssr": true,
          "transpileTemplateLiterals":true,
          "minify":true,
          "pure":true

        }

      ]
    ],
    "presets": [
      "next/babel",
      "@babel/preset-typescript"

    ]

}

```

#### The plugins config of babel-plugin-styled-components

```

    "plugins": [
      [
        "babel-plugin-styled-components",

        {
          "ssr": true,
          "transpileTemplateLiterals":true,
          "minify":true,
          "pure":true

        }

      ]
    ],

```

These configs are basically for don't get warning during rehydration and optimize your styles.
You can learn more about in the documentation of styled components <br/>
[DOCS-Styled-Components](https://styled-components.com/docs/tooling)

#### The presets of babel

```

"presets": [
"next/babel",
"@babel/preset-typescript"

    ]

```

<strong>"next/babel"</strong>: Includes everything needed to compile React applications and server-side code

</br>

### Configuring our \_document.tsx

Paste the code below

```

import Document, {
Head,
DocumentContext,
DocumentInitialProps,
Html,
Main,
NextScript,
} from "next/document";
import React from "react";
import { ServerStyleSheet } from "styled-components";

// This entire file has the styled-component works whel with SSR and stylesheet rehydration

export default class MyDocument extends Document {
static async getInitialProps(
ctx: DocumentContext
): Promise<DocumentInitialProps> {
const sheet = new ServerStyleSheet();
const originalRenderPage = ctx.renderPage;

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: (App) => (props) =>
            sheet.collectStyles(<App {...props} />),
        });

      const initialProps = await Document.getInitialProps(ctx);
      return {
        ...initialProps,
        styles: [
          <React.Fragment key={initialProps.html}>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </React.Fragment>,
        ],
      };
    } finally {
      sheet.seal();
    }

}
render() {
return (
<Html>
<Head>
<link rel="shortcut icon" href="/Favicon.svg" />
</Head>
<body>
<Main />
<NextScript />
</body>
</Html>
);
}
}

```

This custom Document can update the <html> and <body> tags used to render a Page. This code allow us to use styled-compoent on rendered the server, you can see more in the documentation..<br/>
[DOCS-Custom Document](https://nextjs.org/docs/advanced-features/custom-document)

### Let made some cool stuffs in your projects

Go to your folder <strong>styles</strong> and create a file with the name <strong>global.styles.ts<strong> don't worry about the name, is just a way to leave your styles easier to see

Paste the code below

```

import { createGlobalStyle, css } from "styled-components";

export default createGlobalStyle(
//This line create a GlobalStyle for the project
() => css` \* {
margin: 0;
padding: 0;
box-sizing: border-box;
outline: 0;
}

    //The style below lets the fonts more responsive

    html {
      font-size: 62.5%;
    }
    body {
      font-size: 1.6rem;
      font-family: "Roboto", sans-serif;
    }
    h1 {
      font-size: 2.25rem;
    }
    h2 {
      font-size: 2rem;
    }
    h3 {
      font-size: 1.75rem;
    }
    h4 {
      font-size: 1.5rem;
    }
    h5 {
      font-size: 1.5rem;
    }
    p {
      font-size: 1.5rem;
    }
    a {
      text-decoration: none;
    }

    ul {
      list-style: none;
    }

`
);

```

Our use the createGlobalStyle to create our global styles for the entire project, this is very usefully for themes or layouts

Now go to the <strong>\_app.tsx</strong> inside the folder <strong>pages</strong> and let's import our global styles

Delete the importation of the css styles

```

import '@/styles/globals.css'

```

And then import the new global style from the styled-components

```

import globalStyles from "@/styles/global.styles";

```

Open a fragment into our return them put the importation of GlobalStyles above the `<Component {...pageProps} />`

Like this

```

import GlobalStyles from "@/styles/global.styles";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
return (
<>
<GlobalStyles />
<Component {...pageProps} />;
</>
);
}

```

#### Attention Babel in NextJS 13.1.6

If you are using the latest version of NextJS, some features had some problems with babel, because now NextJs are using the SWC compiler, so if you are using some features like the `@next/font` for optimizer your fonts, you get some problems with them, so, let's remove this for now.

go to the <strong>index.tsx</strong> and remove them and the styles of this page too.

```

export default function Home() {
return (
<>
<h1>Hello</h1>
</>
);
}

```

This is our home page, now let's put some styles with the styled-components

You can create styles with different ways, so I will show you two of them

###### The first

You can create the styles in the same file or component like this

import the styled-component in your file

```

import styled from "styled-components";

```

and create your styles

```

const MyTitleStyled = styled.h1`  color: blue;
  font-size: 3.2rem;`;

```

And call this in your TSX return.

Your file should look like this

```

import styled from "styled-components";

const MyTitleStyled = styled.h1`  color: blue;
  font-size: 3.2rem;`;

export default function Home() {
return (
<>
<MyTitleStyled>Hello</MyTitleStyled>
</>
);
}

```

And if you go in your page, you can see the Title with styles

<h1 align="center">
    <img alt="1" src="https://i.ibb.co/6BK3JCb/1.png" />
</h1>

The second way is the way I use the most, because it is more clean and the styles don't stay in the same place with the component

In our styles folder, create a file with the name <strong>Home.styles.ts</strong>

inside the file import the styled-component

```

import styled from "styled-components";

```

and create your styles

```

export const MyFirstComponentTitle = styled.h1`  color: yellow;
  font-size: 3.2rem;`;

```

your file should look like this

```

import styled from "styled-components";

export const MyFirstComponentTitle = styled.h1`  color: yellow;
  font-size: 3.2rem;`;

```

got to the index.tsx and import our styles

```

import * as S from "@/styles/Home.styles";

```

And use the style in your project, using this type of importation you can access all your styles from the file you just create

```

<S.MyFirstComponentTitle>Hello</S.MyFirstComponentTitle>

```

your index.tsx should look like this

```

import * as S from "@/styles/Home.styles";

export default function Home() {
return (
<>
<S.MyFirstComponentTitle>Hello</S.MyFirstComponentTitle>
</>
);
}

```

And go to the page, and you can see the styles in our title

<h1 align="center">
    <img alt="2" src="https://i.ibb.co/g3wCkH7/2.png" />
</h1>

Now you can delete the other files .css inside the project and start to use styled-components

And this is your Next.js with styled-components using TypeScript
if you want to know more about the styles-components go to the docs
[DOCS-styled-component]()

This config work in older version of the NextJS with TypeScript or JavaScript

```

```
