import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';  // Import Provider from react-redux
import { store, persistor } from './store/store';  // Import the Redux store and persistor
import { PersistGate } from 'redux-persist/integration/react'; // Import PersistGate
import App from './App';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* Wrap the app with Provider for Redux */}
    <Provider store={store}>
      {/* PersistGate delays rendering of your app until persisted state is restored */}
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
