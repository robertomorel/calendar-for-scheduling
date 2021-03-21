import { createGlobalStyle } from 'styled-components'

export default createGlobalStyle`
  :root {
    --main-color: #1a8fff;
    --text-color: #777;
    --text-color-light: #ccc;
    --border-color: #eee;
    --bg-color: #f9f9f9;
    --neutral-color: #fff;
    --bg-color-grey: #ddd
  }

  * {
    margin: 0;
    padding: 0;
    outline: 0;
    box-sizing: border-box;
  }

  body {
    -webkit-font-smoothing: antialiased;
    font-weight: 300;
    line-height: 1.5;
    color: var(--text-color);
    background: var(--bg-color);
    position: relative;
  }

  body, input, button {
    font-family: 'Roboto Slab', serif, 'Open Sans', 'Helvetica Neue';
    font-size: 1em;
  }

  h1, h2, h3, h4, h5, strong {
    font-weight: 500;
  }

  button {
    cursor: pointer;
  }
`
