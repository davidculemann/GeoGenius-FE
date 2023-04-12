import axios from "axios";
import {
	User,
	signInWithEmailAndPassword,
	sendPasswordResetEmail,
} from "firebase/auth";
import { auth } from "../firebase";

const FIREBASE_URL =
	"https://us-central1-higher-lower-befaa.cloudfunctions.net/api";
const API_URL = import.meta.env.PROD ? FIREBASE_URL : "http://localhost:4000";

interface AuthProps {
	email: string;
	password: string;
	username?: string;
}

interface ErrorProps {
	code: string;
	message: string;
}

type FirebaseResponse = {
	code: string;
	message: string;
};

//============ USER AUTH ============//
export async function firebaseSignup({
	email,
	password,
	username,
}: AuthProps): Promise<User | FirebaseResponse> {
	try {
		await axios.post(`${API_URL}/register`, {
			email,
			password,
			username,
		});
		const login = await firebaseLogin({ email, password });
		return login;
	} catch (error: any) {
		console.log(error);
		const errorCode = error?.response?.data?.error?.code || "unknown";
		const errorMessage = error.message;
		const errorObject: ErrorProps = {
			code: errorCode,
			message: errorMessage,
		};
		return errorObject;
	}
}

export async function firebaseLogin({ email, password }: AuthProps) {
	try {
		const userCredential = await signInWithEmailAndPassword(
			auth,
			email,
			password
		);
		const user = userCredential.user;
		return user;
	} catch (error: any) {
		console.log(error);
		const errorCode = error?.response?.data?.error?.code || "unknown";
		const errorMessage = error.message;
		const errorObject: ErrorProps = {
			code: errorCode,
			message: errorMessage,
		};
		return errorObject;
	}
}

export async function getCountryData(mode: string) {
	const response = await axios.get(`${API_URL}/statistics/${mode}`);
	return response.data;
}

export async function postScore({
	mode,
	score,
	uid,
}: {
	mode: string;
	score: number;
	uid: string;
}) {
	const response = await axios.post(
		`${API_URL}/score`,
		{
			score,
			mode,
			uid,
		},
		{
			headers: {
				authorization:
					"Bearer " + (await auth.currentUser?.getIdToken()),
			},
		}
	);
	return response.data;
}

export async function getLeaderboard({ mode }: { mode: string }) {
	const response = await axios.get(`${API_URL}/leaderboard/${mode}`, {
		headers: {
			authorization: "Bearer " + (await auth.currentUser?.getIdToken()),
		},
	});
	return response.data;
}

export async function getUserScores(uid: string) {
	const response = await axios.get(`${API_URL}/users/${uid}`, {
		headers: {
			authorization: "Bearer " + (await auth.currentUser?.getIdToken()),
		},
	});
	return response.data;
}

export async function passwordResetEmail(email: string) {
	const response = sendPasswordResetEmail(auth, email);
	return response;
}
