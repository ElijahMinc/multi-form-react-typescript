import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App/App';
import {  BrowserRouter } from 'react-router-dom';
import { ConfigureContext } from './context/Context';
import '../src/stylesheets/index.css';
import '@elastic/eui/dist/eui_theme_light.css';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <ConfigureContext>
          <App/>
      </ConfigureContext>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);