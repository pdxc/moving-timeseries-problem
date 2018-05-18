export const defaultState = {
  line1: [],
  line2: [],
  line3: [],
  nextPoints: [1,2,3],
};

export const rootReducer = (state=defaultState, action) => {
  switch (action.type) {
    case 'SEND_NEXT_POINTS': {
	  let { line1, line2, line3 } = state;
	  line1 = line1.concat([action.nextPoints[0]]);
	  line2 = line2.concat([action.nextPoints[1]]);
	  line3 = line3.concat([action.nextPoints[2]]);
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

