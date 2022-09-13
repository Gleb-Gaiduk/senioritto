import { ValueObject } from '../../../../libs/building-blocks/domain/value-objects/value-object.base';
import * as jose from 'jose';
import { ArgumentInvalidException } from '../../../../libs/exceptions/generic/argument-invalid.exception';
import { ArgumentNotProvidedException } from '../../../../libs/exceptions/generic/argument-not-provided.exception';

export interface IJWTClaims extends jose.JWTPayload {
  roles?: string[];
}

export class AccessJWT extends ValueObject<string> {
  private constructor(token: string) {
    super({ value: token });
  }

  static async generate(
    sub: string,
    roles?: IJWTClaims['roles']
  ): Promise<AccessJWT> {
    const importedPrivateKey = await jose.importPKCS8(
      process.env.ACCESS_TOKEN_PRIVATE!,
      'EdDSA'
    );

    const claims: IJWTClaims = {
      sub,
      aud: 'http://localhost:8000',
      exp: 300000, // 5min
      iat: new Date().getTime(),
      iss: 'http://localhost:8000'
    };

    if (Array.isArray(roles) && roles.length > 0) {
      claims.roles = roles;
    }

    const jwt = await new jose.EncryptJWT(claims).encrypt(importedPrivateKey);
    return new AccessJWT(jwt);
  }

  static async decrypt(token: string): Promise<jose.JWTPayload | never> {
    if (!token)
      throw new ArgumentNotProvidedException('Token was not provided');

    const importedPublicKey = await jose.importSPKI(
      process.env.ACCESS_TOKEN_PUBLIC!,
      'EdDSA'
    );

    const { payload, protectedHeader } = await jose.jwtDecrypt(
      token,
      importedPublicKey,
      {
        issuer: 'http://localhost:8000'
        // audience: 'urn:example:audience',
      }
    );

    if (!payload || !protectedHeader) {
      throw new ArgumentInvalidException('Invalid access token');
    }

    return payload;
  }

  protected validate(props: unknown): void {}
}
