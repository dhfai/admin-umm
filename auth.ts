import { PrismaAdapter } from "@auth/prisma-adapter"
import NextAuth from "next-auth"
import { prisma } from "@/lib/prisma"
import Credentials from "next-auth/providers/credentials"
import { SignInSchema } from "./lib/zod"
import { compareSync } from "bcrypt-ts"

export const { handlers, signIn, signOut, auth } = NextAuth({
    adapter: PrismaAdapter(prisma),
    session: {
        strategy: "jwt",
    },
    pages: {
        signIn: "/login",
    },
    providers: [
        Credentials({
            credentials: {
                email: {},
                password: {},
            },
            authorize: async (credentials) => {
                const validatedFields = SignInSchema.safeParse(credentials);

                if(!validatedFields.success) {
                    return null;
                }

                const { email, password } = validatedFields.data;

                const user = await prisma.user.findUnique({
                    where: {
                        email
                    }
                });

                if(!user || !user.password) {
                    throw new Error("Email atau password salah");
                }

                const passwordMatch = await compareSync(password, user.password);

                if (!passwordMatch) return null;

                return user
            }
        })
    ],

    callbacks: {
        authorized({ auth, request: {nextUrl}}) {
            const isLoggedIn = !!auth?.user;
            const protectedRoutes = ["/dashboard"];

            if (!isLoggedIn && protectedRoutes.includes(nextUrl.pathname)) {
                return Response.redirect(new URL("/login", nextUrl));
            }


            if (isLoggedIn && nextUrl.pathname.startsWith("/login")) {
                return Response.redirect(new URL("/dashboard", nextUrl));
            }

            return true;
        },
        jwt({ token, user }) {
            if (user) {
                token.role = user.role;
            }

            return token;
        },
        session({session, token}) {
            session.user.id = token.sub;
            session.user.role = token.role;
            return session;
        }
    }
})
