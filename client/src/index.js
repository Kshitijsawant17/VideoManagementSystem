import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from "react-redux";
import App from './App';
import store from './redux/store';
import { ThemeProvider } from './context/ThemeContext';

const root = ReactDOM.createRoot(document.getElementById('root'));

// Render the App component wrapped with ThemeProvider
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </Provider>
  </React.StrictMode>
);
