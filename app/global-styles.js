import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  html,
  body {
    height: 100%;
    width: 100%;
    line-height: 1.5;
  }

  body {
    font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
    background:#056262;
  }

  body.fontLoaded {
    font-family: 'Open Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif;
  }

  #app {
    background-color: #056262;
    min-height: 100%;
    min-width: 100%;
  }

  p,
  label {
    font-family: Georgia, Times, 'Times New Roman', serif;
    line-height: 1.5em;
  }

  .header{
    text-align: center;
    padding: 10px 0px;
  }
  .footer{
    text-align: right;
    padding: 5px;
    color: #fff;
  }
  .container{
    width: 100%;
    background: #fff;
    min-height: 400px;
    border-radius: 5px;
    padding: 15px 25px 5px 25px;
  }
  .button-controls button {
        margin: 0 8px 0 0;
  }
  .button-controls button .anticon {
    vertical-align: 0.125em;
  }
`;

export default GlobalStyle;
