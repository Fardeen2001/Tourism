import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { sql } from '@vercel/postgres';
import bcrypt from 'bcryptjs';

export const {
  handlers: { GET, POST },
  auth,
} = NextAuth({
  providers: [
    CredentialsProvider({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        const user = await sql`
          SELECT * FROM users 
          WHERE email = ${credentials.email}
        `;

        if (!user.rows[0]) {
          return null;
        }

        const isValid = await bcrypt.compare(
          credentials.password,
          user.rows[0].encrypted_password
        );

        if (!isValid) {
          return null;
        }

        return {
          id: user.rows[0].id,
          email: user.rows[0].email,
          name: user.rows[0].email.split('@')[0],
        };
      },
    }),
  ],
  pages: {
    signIn: '/auth/signin',
  },
  callbacks: {
    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.sub;
      }
      return session;
    },
  },
});