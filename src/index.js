import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { resetServerContext } from 'react-beautiful-dnd';

import './index.css';
import UploadProvider from 'contexts/UploadContext';
import ExperienceProvider from 'contexts/ExperienceContext';
import KakaoMapProvider from 'contexts/KakaoMapContext';
import App from './App';

ReactDOM.render(
  <React.StrictMode>
    <KakaoMapProvider>
      <ExperienceProvider>
        <UploadProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </UploadProvider>
      </ExperienceProvider>
    </KakaoMapProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);

resetServerContext();
