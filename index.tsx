import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

// ✅ Parche: convierte #/ruta a /ruta
if (window.location.hash && window.location.hash.startsWith('#/')) {
  const newPath = window.location.hash.slice(1);
  window.history.replaceState(null, '', newPath);
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
