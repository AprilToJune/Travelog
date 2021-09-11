import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { resetServerContext } from 'react-beautiful-dnd';

import './index.css';
import UploadProvider from 'contexts/UploadContext';
import ExperienceProvider from 'contexts/ExperienceContext';
import App from './App';

ReactDOM.render(
  <React.StrictMode>
    <ExperienceProvider>
      <UploadProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </UploadProvider>
    </ExperienceProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);

resetServerContext();
