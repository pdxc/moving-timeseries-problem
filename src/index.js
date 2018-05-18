import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import './index.css';

import { rootReducer } from './reducer.js';
import { runPeriodicGeneration } from './actions.js';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

const store = createStore(rootReducer, applyMiddleware(thunk));

// currently set to a 10s interval and a 300s cutoff
store.dispatch(runPeriodicGeneration(10000, 300*1000));

ReactDOM.render((
	<Provider store={store}>
		<App />
	</Provider>
), document.getElementById('root'));
registerServiceWorker();
