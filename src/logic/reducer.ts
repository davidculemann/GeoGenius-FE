import { UserInfo } from "./types";

export const CURRENT_USER = "SET_CURRENT_USER";
export const SET_GAME_DATA = "SET_GAME_DATA";
export const SET_USER_SCORES = "SET_USER_SCORES";
export const SET_IS_TOUCH_DEVICE = "SET_IS_TOUCH_DEVICE";

export type ActionTypes =
	| { type: "SET_CURRENT_USER"; payload: UserInfo | null }
	| { type: "SET_GAME_DATA"; payload: any }
	| { type: "SET_USER_SCORES"; payload: any }
	| { type: "SET_IS_TOUCH_DEVICE"; payload: boolean };

export const setCurrentUser = (user: UserInfo | null): ActionTypes => ({
	type: CURRENT_USER,
	payload: user,
});

export const setGameData = (data: any): ActionTypes => ({
	type: SET_GAME_DATA,
	payload: data,
});

export const setUserScores = (data: any): ActionTypes => ({
	type: SET_USER_SCORES,
	payload: data,
});

export const setIsTouchDevice = (isTouchDevice: boolean): ActionTypes => ({
	type: SET_IS_TOUCH_DEVICE,
	payload: isTouchDevice,
});

const initialState = {
	currentUser: null,
	gameData: null,
	userScores: null,
	isTouchDevice: false,
};

interface InitialState {
	currentUser: UserInfo | null;
	gameData: any;
	userScores: any;
	isTouchDevice: boolean;
}

export default function reducer(
	state: InitialState = initialState,
	action: ActionTypes
) {
	switch (action.type) {
		case CURRENT_USER:
			return {
				...state,
				currentUser: action.payload,
			};
		case SET_GAME_DATA:
			return {
				...state,
				gameData: action.payload,
			};
		case SET_USER_SCORES:
			return {
				...state,
				userScores: action.payload,
			};
		case SET_IS_TOUCH_DEVICE:
			return {
				...state,
				isTouchDevice: action.payload,
			};
		default:
			return state;
	}
}
