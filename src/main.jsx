import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import ReactDom from 'react-dom';
import React from 'react';
import App from './App.jsx';
import './index.css';


ReactDom.createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
);

// createRoot(document.getElementById('root')).render(
//   <StrictMode>
//     <App />
//   </StrictMode>
// );