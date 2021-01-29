import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, compose } from 'redux';
import { Provider } from 'react-redux';

import './index.css';
import 'react-bulma-components/dist/react-bulma-components.min.css';
import App from './containers/App';

import reducer from './store/reducers';
import middleware from './store/middleware';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(reducer, composeEnhancers(middleware));

window.store = store;
ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'),
);
