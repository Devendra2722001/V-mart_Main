import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/font-awesome/css/font-awesome.min.css';
import {BrowserRouter} from 'react-router-dom';
import {Provider} from 'react-redux';
import store from './redux/store';
import WebFont from "webfontloader";
WebFont.load({google: {families: ["Roboto:300,400,500"]}});

ReactDOM.render(
  <BrowserRouter>
    <Provider store={store}>

      < App/>

    </Provider>
  </BrowserRouter>,
  document.getElementById('root')
);

reportWebVitals();
