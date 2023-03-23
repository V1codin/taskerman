import bcrypt from 'bcrypt';

import { EncrypOptions } from '../../types/services';

export class EncryptService {
  private config: EncrypOptions;
  private salt: string;

  constructor(options: EncrypOptions) {
    this.setConfig = options;
    this.init();
  }

  set setSalt(newSalt: string) {
    this.salt = newSalt;
  }

  get getSalt() {
    return this.salt;
  }

  set setConfig(newConfig: any) {
    this.config = newConfig;
  }
  get getConfig() {
    return this.config;
  }

  init() {
    this.setSalt = bcrypt.genSaltSync(this.getConfig.saltRounds);
  }

  hash(str: string) {
    return new Promise((resolve, reject) => {
      bcrypt.hash(str, this.getSalt, function (err, hash) {
        if (err) {
          reject('Hash error');
        }

        resolve(hash);
      });
    });
  }

  compare(password: string, toCompare: string): Promise<boolean> {
    return bcrypt.compare(password, toCompare);
  }
}
