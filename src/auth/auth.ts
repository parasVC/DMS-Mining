import { NextAuthConfig } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { fetchData } from "@/lib/request/fetch-data";


export const options: NextAuthConfig = {
    session: {
        strategy: 'jwt',
    },
    providers: [
        CredentialsProvider({
            credentials: {
                email: {},
                password: {},
            },
            async authorize({ payload, request }: any) {
                const response = await fetchData({
                    url: request,
                    method: "POST",
                    body: JSON.parse(payload),
                });              
                if (response?.data) return response.data;
                return null;

            },
        }),
    ],
    callbacks: {
        async signIn() {
            return true;
        },
        jwt: async (params) => {
            const { token, user, trigger }: any = params;
            if (trigger === "update" && params.session) {
                return { ...token, ...params.session };
            }
            
            if (user) {
                token.id = user.id
                token.role_id = user.role_id;
                token.session_id = user?.session_id;
                token.client_id = user?.client_id
                token.email = user?.email as string;
                token.name = user?.name
                token.user_type = user?.user_type;
                token.contact = user?.contact;

            }

            return token;
        },

        async session({ session, token }: any) {
            session.user.id = token?.id;
            session.role_id = token.role_id;
            session.client_id = token.client_id;
            session.session_id = token.session_id;
            session.user.email = token.email;
            session.user.name = token.name;
            session.user_type = token.user_type;
            session.contact = token.contact
            return session;
        },
    },
    pages: {
        signIn: "/auth/signin",
    },
};


// Optional: You can define UserType if you haven't already, as follows:
export interface UserType {
    id: string;
    email: string;
    password: string; // Adjust the types as necessary
}
