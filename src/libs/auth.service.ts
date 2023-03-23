import jwt, { SignOptions } from 'jsonwebtoken';

import { TUserLogin } from '../../types/state';
import { ServerResponseError } from './error.service';
import { OmitedSafeUser } from '../../types/db';
import { TDb } from './db/provider';

export type TSignWithPW = {
  token: string;
  user: OmitedSafeUser;
};

export class AuthService {
  private readonly db: TDb;
  /*
  signIn(email: string, password: string): Promise<User | null>;
  signOut(): Promise<boolean>;
  signUp(user: User): Promise<User | null>;
  getUser(): Promise<User | null>;
  */
  constructor(dbProvider: TDb) {
    this.db = dbProvider;
  }

  private createToken(
    data: string | object,
    options: SignOptions = {},
  ): string {
    return jwt.sign(data, process.env['JWT_SEC']!, {
      expiresIn: process.env['JWT_OPT_EXPIRE'],
      ...options,
    });
  }

  validateToken(token: string): Promise<string> {
    return new Promise((resolve, reject) => {
      if (!token) {
        return reject('There is no token');
      }

      jwt.verify(token, process.env['JWT_SEC']!, (err, decoded) => {
        if (err) {
          reject('Token is expired');
        }

        resolve('Verifyed');
      });
    });
  }

  async signInWithPassword(userData: TUserLogin): Promise<TSignWithPW> {
    try {
      const unsafeUser = await this.db.getUserByUserName(userData.username);

      if (!unsafeUser) {
        throw new ServerResponseError({
          message: 'Error: Wrong username or password',
          code: 401,
        });
      }

      const isValidPW = await this.db.encrypter.compare(
        userData.password,
        unsafeUser.password,
      );

      if (!isValidPW) {
        throw new ServerResponseError({
          message: 'Wrong password',
          code: 401,
        });
      }

      const user = await this.db.getSafeUser(unsafeUser, true);

      const token = this.createToken({
        username: user.username,
        email: user.email,
        fullName: user.displayName,
      });

      return { token, user };
    } catch (e) {
      if (e instanceof ServerResponseError) {
        throw e;
      }

      throw new Error('Error: Authenticate with password');
    }
  }
}
