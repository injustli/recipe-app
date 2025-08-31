import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.module.css';
import App from './App';
import '@mantine/core/styles.css';
import '@mantine/dates/styles.css';
import { MantineProvider } from '@mantine/core';
import { GoogleOAuthProvider } from '@react-oauth/google';

const root = ReactDOM.createRoot(document.getElementById('root')!);
root.render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
      <MantineProvider>
        <App />
      </MantineProvider>
    </GoogleOAuthProvider>
  </React.StrictMode>
);
