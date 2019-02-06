import React from 'react';
import { render } from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import reducer from './reducers';
import App from './components/app';
import config from '@bradenhc/client-config';

config.files(['/assets/config/default.json', '/assets/config/local.json']);

const loggerMiddleware = createLogger();

// Create our redux store
const store = createStore(reducer, applyMiddleware(thunk, loggerMiddleware));

const rootEl = document.getElementById('app');

render(
    <Provider store={store}>
        <App />
    </Provider>,
    rootEl
);

if (module.hot) {
    module.hot.accept();
}
