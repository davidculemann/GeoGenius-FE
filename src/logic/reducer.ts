import { UserInfo } from "./types";

export const CURRENT_USER = "SET_CURRENT_USER";
export const SET_GAME_DATA = "SET_GAME_DATA";

export type ActionTypes =
	| { type: "SET_CURRENT_USER"; payload: UserInfo | null }
	| { type: "SET_GAME_DATA"; payload: any };

export const setCurrentUser = (user: UserInfo | null): ActionTypes => ({
	type: CURRENT_USER,
	payload: user,
});

export const setGameData = (data: any): ActionTypes => ({
	type: SET_GAME_DATA,
	payload: data,
});

const initialState = {
	currentUser: null,
	gameData: null,
};

interface InitialState {
	currentUser: UserInfo | null;
	gameData: any;
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
		default:
			return state;
	}
}
