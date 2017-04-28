import { injectGlobal } from 'styled-components';

/* eslint no-unused-expressions: 0 */
injectGlobal`
  html,
  body {
    height: 100%;
    width: 100%;
    background-color: #1E2B32;
    color: #fff;
  }

  body {
    font-family: 'Roboto', 'Helvetica Neue', Helvetica, Arial, sans-serif;
    font-weight: 300;
  }

  #app {
    min-height: 100%;
    min-width: 100%;
  }

  a {
    color: inherit;
    text-decoration: none;
  }
`;
