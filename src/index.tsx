import React from 'react';
import ReactDOM from 'react-dom';

import App from './components/App/App';
import {  BrowserRouter } from 'react-router-dom';
import { ConfigureContext } from './context/Context';
import { store } from './store/store'
import { Provider } from 'react-redux'
import '../src/stylesheets/index.scss';
import '@elastic/eui/dist/eui_theme_light.css';


ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <ConfigureContext>
          <App/>
        </ConfigureContext>
      </BrowserRouter>
    </Provider>
  
  </React.StrictMode>,
  document.getElementById('root')
);