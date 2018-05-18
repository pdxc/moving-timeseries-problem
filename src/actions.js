import { defaultState } from './reducer'

export const sendNextPoints = (nextPoints, maxArrayLength) => ({
	type: 'SEND_NEXT_POINTS',
	nextPoints,
	maxArrayLength,
})

export const setNextPoint = (id, value) => ({
	type: 'SET_NEXT_POINT',
	id,
	value,
})

export const runPeriodicGeneration = (interval, cutOff) => {
	const maxArrLength = Math.floor(cutOff / interval)

	return (dispatch, getState) => {
		const currState = getState()
		const { nextPoints } = currState
		dispatch(sendNextPoints(nextPoints, maxArrLength))
		dispatch(setNextPoint(0, defaultState.nextPoints[0]))
		dispatch(setNextPoint(1, defaultState.nextPoints[1]))
		dispatch(setNextPoint(2, defaultState.nextPoints[2]))

		setTimeout(() => {
			dispatch(runPeriodicGeneration(interval, cutOff))
		}, interval)
	}
}
