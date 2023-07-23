import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
export const authOptions = {
	// Configure one or more authentication providers
	providers: [
		GoogleProvider({
			clientId: process.env.GOOGLE_CLIENT_ID,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET,
		}),
		// ...add more providers here
		CredentialsProvider({
			// The name to display on the sign in form (e.g. "Sign in with...")
			id: "Credentials",
			name: "Credentials",
			// `credentials` is used to generate a form on the sign in page.
			// You can specify which fields should be submitted, by adding keys to the `credentials` object.
			// e.g. domain, username, password, 2FA token, etc.
			// You can pass any HTML attribute to the <input> tag through the object.
			// credentials: {
			// 	username: { label: "Username", type: "text", placeholder: "jsmith" },
			// 	password: { label: "Password", type: "password" },
			// },
			async authorize(credentials, req) {
				// ..destructuring
				// const { user, pass } = credentials;
				// make post request to the server to check valid credentials
				// eg . const res = await fetch('https://...')
				// Then if (res.statusCode === 200) {
				//  return res
				// }else return null

				// const user = { username: "123", password: "123" };
				const user = {
					id: "1",
					name: "J th",
					email: "jsmith@example.com",
					address: "krwererlwejrlw",
				};
				// const user = await fetch(
				// 	"https://jsonplaceholder.typicode.com/todos/1"
				// ).then((response) => response.json());
				// .then((json) => console.log(json));
				// const user = { id: "1", firstLetter: "J Smith", seconCar: "jsmith@example.com" };
				// console.log(user, "user");
				if (user) {
					// Any object returned will be saved in `user` property of the JWT
					return user;
				} else {
					// If you return null then an error will be displayed advising the user to check their details.
					return null;

					// You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
				}
			},
		}),
	],
	session: {
		strategy: "jwt",
	},
	callbacks: {
		async jwt({ token, user, account }) {
			// Persist the OAuth access_token and or the user id to the token right after signin
			// if (account) {
			// 	token.accessToken = account.access_token;
			// 	token.id = profile.id;
			// }
			// return token;
			if (user) {
				console.log(user, "user");
				console.log(account, "account");
				token.user = user;
				// token.user2 = user;
			}
			return token;
		},
		async session({ session, token, user }) {
			if (token) {
				session.user = token.user;
				// session.user2 = token.user2;
				// session.user = "asas";
			}
			return session;
		},
	},

	pages: {
		signIn: "/login",
	},
	secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
