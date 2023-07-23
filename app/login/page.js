"use client";
import { useSession, signIn, signOut } from "next-auth/react";
const Login = () => {
	const submitHandler = async () => {
		const result = await signIn("Credentials", {
			username: "paing",
			password: "password",
			redirect: true,
			callbackUrl: "/",
		});
	};
	return (
		<div>
			Login
			<div onClick={submitHandler}>Login</div>
		</div>
	);
};

export default Login;
