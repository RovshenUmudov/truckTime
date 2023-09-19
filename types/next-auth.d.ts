import { Session } from 'next-auth';
import { IErrorResponse, ITokens, IUserMe } from '@/types/index';

declare module 'next-auth' {
  interface Session {
    tokens: ITokens | null;
    user: IUserMe | null;
    expires: string;
    error: IErrorResponse | null;
    outdatedCache?: boolean; /** Used to tell auth session that it should not use cache, and get new response */
  }

  interface User extends Omit<Session, 'expires'> {
    id?: string;
  }
}

declare module 'next-auth/jwt' {
  type JWT = Omit<Session, 'expires'>
}
