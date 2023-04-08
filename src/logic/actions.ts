import axios from "axios";
import { User, signInWithEmailAndPassword } from "firebase/auth";
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
		const errorCode = error.response?.data?.code || "unknown";
		const errorMessage =
			error.response?.data?.message || "An unknown error occurred.";
		const errorProps: ErrorProps = {
			code: errorCode,
			message: errorMessage,
		};
		return errorProps;
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
		const errorCode = error.code || "unknown";
		const errorMessage = error.message || "An unknown error occurred.";
		const errorProps: ErrorProps = {
			code: errorCode,
			message: errorMessage,
		};
		return errorProps;
	}
}

interface CountryData {
	country: string;
}

export async function getCountryData({ mode }: { mode: string }) {
	const response = await axios.get(`${API_URL}/statistics/${mode}`);
	return response.data;
}
