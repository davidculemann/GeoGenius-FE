import { UserInfo } from "./types";

export const CURRENT_USER = "SET_CURRENT_USER";
export const SET_GAME_DATA = "SET_GAME_DATA";
export const SET_USER_SCORES = "SET_USER_SCORES";

export type ActionTypes =
	| { type: "SET_CURRENT_USER"; payload: UserInfo | null }
	| { type: "SET_GAME_DATA"; payload: any }
	| { type: "SET_USER_SCORES"; payload: any };

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

const initialState = {
	currentUser: null,
	gameData: null,
	userScores: null,
};

interface InitialState {
	currentUser: UserInfo | null;
	gameData: any;
	userScores: any;
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
		default:
			return state;
	}
}
