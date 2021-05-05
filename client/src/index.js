import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {createMuiTheme,CssBaseline} from '@material-ui/core'

import { ThemeProvider } from "@material-ui/styles"

const theme = createMuiTheme({
  palette: {
    type: "dark",
    primary:{
      main: "#90caf9",
    }
    
  },
  
});
ReactDOM.render(
  <ThemeProvider theme={theme}>
    <CssBaseline />
  <React.StrictMode>
    <App />
  </React.StrictMode>
  </ThemeProvider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
