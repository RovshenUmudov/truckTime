import { JWT } from 'next-auth/jwt';
import { signOut } from 'next-auth/react';
import { fetchAPI } from '@/utils/fetch';
import { ITokens } from '@/types';

export const refreshAccessToken = async (token: JWT): Promise<JWT> => {
  const res = await fetchAPI<ITokens>(
    'auth/refresh-token',
    undefined,
    {
      method: 'POST',
      accessToken: token.tokens?.refresh.token,
      cache: 'no-cache',
    },
  );

  if (res.data?.access && res.data.refresh) {
    return {
      ...token,
      tokens: {
        access: res.data?.access,
        refresh: res.data?.refresh,
      },
    };
  }

  await signOut({ redirect: true, callbackUrl: '/' });

  return {
    ...token,
    user: null,
    tokens: null,
  };
};
