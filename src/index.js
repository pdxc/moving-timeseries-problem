import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

const defaultState = {
  line1: [],
  line2: [],
  line3: [],
  nextPoints: [1,2,3],
};

const sendNextPoints = (nextPoints, maxArrayLength) => ({
  type: 'SEND_NEXT_POINTS',
  nextPoints,
  maxArrayLength,
});

const setNextPoint = (id, value) => ({
  type: 'SET_NEXT_POINT',
  id,
  value,
});

const runPeriodicGeneration = (interval) => {
	// const maxArrLength = Math.floor((300*1000) / interval);
	const maxArrLength = 2;
	console.log('maxArrLength', maxArrLength);

	return (dispatch, getState) => {
		const currState = store.getState();
		const { nextPoints } = currState;
		dispatch(sendNextPoints(nextPoints, maxArrLength));
		dispatch(setNextPoint(0, defaultState.nextPoints[0]));
		dispatch(setNextPoint(1, defaultState.nextPoints[1]));
		dispatch(setNextPoint(2, defaultState.nextPoints[2]));

		setTimeout(() => {
			store.dispatch(runPeriodicGeneration(interval));
		}, interval);
	};
};

const rootReducer = (state=defaultState, action) => {
  console.log('state', state);
  switch (action.type) {
    case 'SEND_NEXT_POINTS': {
	  console.log('SEND_NEXT_POINTS', action);
	  let { line1, line2, line3 } = state;
	  line1 = line1.concat([action.nextPoints[0]]);
	  line2 = line2.concat([action.nextPoints[0]]);
	  line3 = line3.concat([action.nextPoints[0]]);
	  if (line1.length > action.maxArrayLength) {
	  	line1.splice(0, line1.length - action.maxArrayLength);
	  }
	  if (line2.length > action.maxArrayLength) {
	  	line2.splice(0, line2.length - action.maxArrayLength);
	  }
	  if (line3.length > action.maxArrayLength) {
	  	line3.splice(0, line3.length - action.maxArrayLength);
	  }
	  
	  return {
	    ...state,
		line1,
		line2,
		line3,
	  };
    }
    case 'SET_NEXT_POINT': {
	  console.log('SET_NEXT_POINT', action);
	  const { id, value } = action;
	  const newNextPoints = [...state.nextPoints];
	  newNextPoints[id] = value;
	  return {
	    ...state,
		nextPoints: newNextPoints,
	  };
    }
    default: {
      return state;
    }
  }
};

const store = createStore(rootReducer, applyMiddleware(thunk));

store.dispatch(runPeriodicGeneration(10000));

ReactDOM.render((
	<Provider store={store}>
		<App />
	</Provider>
), document.getElementById('root'));
registerServiceWorker();
