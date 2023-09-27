import { NextAuthOptions, User } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';
import dayjs from 'dayjs';
import { ICredentials, IErrorResponse, ITokens } from '@/types';
import { fetchAPI } from '@/utils/fetch';
import { refreshAccessToken } from '@/utils/auth/refreshToken';
import { userMe } from '@/utils/auth/userMe';

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    maxAge: 720 * 3600,
    strategy: 'jwt',
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
    }),
    CredentialsProvider({
      name: 'Credentials',
      type: 'credentials',
      credentials: {
        email: {},
        password: {},
        tokens: {},
      },
      async authorize(credentials?: Record<'email' | 'password' | 'tokens', string>): Promise<User> {
        const tokens = JSON.parse(credentials?.tokens || '{}') as ITokens;

        if (tokens?.access) {
          const userMeResponse = await userMe(tokens?.access);

          return {
            user: userMeResponse,
            tokens,
            error: null,
          };
        }

        const res = await fetchAPI<ITokens, undefined, ICredentials, IErrorResponse>(
          'auth/login/email',
          undefined,
          {
            method: 'POST',
            body: {
              email: credentials?.email || '',
              password: credentials?.password || '',
            },
          },
        );

        if (res.error) {
          throw res.error;
        }

        const userMeResponse = await userMe(res.data?.access);

        return {
          user: userMeResponse,
          tokens: res.data,
          error: null,
        };
      },
    }),
  ],
  pages: {
    signIn: '/login',
  },
  callbacks: {
    async signIn({ account, user }) {
      if (account?.provider === 'google') {
        const res = await fetchAPI<ITokens, undefined, { token: string; }>(
          'auth/login/google',
          undefined,
          {
            method: 'POST',
            body: {
              token: account.id_token || '',
            },
          },
        );

        if (res.error) {
          // eslint-disable-next-line no-param-reassign
          user.error = res.error;
        }

        // eslint-disable-next-line no-param-reassign
        user.user = await userMe(res.data?.access);
        // eslint-disable-next-line no-param-reassign
        user.tokens = res.data;
      }

      return true;
    },
    async jwt({ token, user, trigger, session }) {
      if (user && trigger === 'signIn') {
        return user;
      }

      if (trigger === 'update' && session) {
        return { ...token, ...session };
      }

      if (token?.tokens && dayjs().isAfter(dayjs(token.tokens?.access.expiresIn).utcOffset())) {
        return refreshAccessToken(token);
      }

      return token;
    },
    async session({ session, token }) {
      const newSession = { ...session };

      if (token) {
        const user = await userMe(token.tokens?.access, undefined, { revalidate: token?.outdatedCache ? 0 : 900 });

        newSession.tokens = token.tokens;
        newSession.expires = token.tokens?.access.expiresIn || '';
        newSession.user = user;
        newSession.error = token.error;
        newSession.outdatedCache = false;
      }

      return newSession;
    },
  },
  debug: process.env.NODE_ENV !== 'production',
};
