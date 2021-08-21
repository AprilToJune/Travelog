import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import './index.css';
import UploadProvider from 'contexts/UploadContext';
import App from './App';

ReactDOM.render(
  <React.StrictMode>
    <UploadProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </UploadProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);
