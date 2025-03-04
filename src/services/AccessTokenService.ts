import express from 'express';
import { IncomingHttpHeaders } from 'http';
import jwt, { JwtPayload, VerifyErrors } from 'jsonwebtoken';
import _ from 'lodash';
import config from '@/config.js';
import { UnauthorizedException } from '@/http/nodegen/errors/index.js';
import NodegenRequest from '@/http/interfaces/NodegenRequest.js';
import { JwtAccess } from '@/http/nodegen/interfaces/index.js';

interface JwtDetails {
  maxAge: number;
  sessionData: unknown;
}

export interface ValidateRequestOptions {
  passThruWithoutJWT: boolean;
}

class AccessTokenService {
  /**
   * Used by the validateRequest method
   * @param res
   * @param e
   * @param msg
   * @param headersProvidedString
   */
  private denyRequest (
    res: express.Response,
    e = 'AccessTokenService did not match the given keys or tokens',
    msg = 'Invalid auth token provided',
    headersProvidedString = ''
  ): void {
    console.error(e);
    res.status(401).json({
      message: msg,
      token: headersProvidedString,
    });
  }

  /**
   * Simple function that assumes a prefix or bearer is a jwt else it is a simple api key
   * @param headers
   * @param headerNames
   */
  public extractAuthHeader (
    headers: IncomingHttpHeaders,
    headerNames: string[]
  ): {
    jwtToken: string | undefined;
    apiKey: string | undefined;
  } {
    let jwtToken: string | undefined;
    let apiKey: string | undefined;
    for (let i = 0; i < headerNames.length; ++i) {
      const tokenRaw = String(headers[headerNames[i].toLowerCase()] || headers[headerNames[i]] || '');
      if (tokenRaw.length > 0) {
        const tokenParts = tokenRaw.split('Bearer ');
        if (tokenRaw.substring(0, 7) === 'Bearer ') {
          jwtToken = tokenParts[1];
          break;
        } else {
          // This is a token but not JWT thus API key
          apiKey = tokenRaw;
        }
      }
    }
    return {
      jwtToken,
      apiKey,
    };
  }

  /**
   * Checks a JWT or API key differentiating between the two with the existence or not of Bearer.
   * !! Extend this method as required.
   * !! Note the src/http/nodegen/security/definitions.ts.njk contains all security definitions
   * @param req
   * @param res
   * @param next
   * @param headerNames
   * @param options
   */
  public validateRequest (
    req: NodegenRequest,
    res: express.Response,
    next: express.NextFunction,
    headerNames: string[],
    options?: ValidateRequestOptions
  ): void {
    const { jwtToken, apiKey } = this.extractAuthHeader(req.headers, headerNames);
    if (!jwtToken && !apiKey) {
      if (options && options.passThruWithoutJWT) {
        return next();
      }
      return this.denyRequest(res, 'No token to parse', 'No auth token provided.', JSON.stringify(req.headers));
    }
    if (jwtToken) {
      // verify the JWT token
      this.verifyJWT(jwtToken)
        .then((decodedToken: JwtAccess) => {
          req.jwtData = decodedToken;
          req.originalToken = jwtToken;
          next();
        })
        .catch(() => {
          this.denyRequest(res);
        });
    } else if (config.apiKey === apiKey) {
      // verify the access token
      next();
    } else {
      this.denyRequest(res);
    }
  }

  /**
   * Generates a JTW token
   * @param details
   */
  public generateJWToken (details: JwtDetails) {
    details.maxAge = details.maxAge || 3600;

    details.sessionData = _.reduce(
      details.sessionData || {},
      (memo: unknown, val: unknown, key: string) => {
        if (typeof val !== 'function' && key !== 'password') {
          /* eslint-disable @typescript-eslint/ban-ts-comment */
          // @ts-ignore
          memo[key] = val;
          /* eslint-enable @typescript-eslint/ban-ts-comment */
        }
        return memo;
      },
      {}
    );
    return jwt.sign(
      {
        data: details.sessionData,
      },
      config.jwtAccessSecret,
      {
        algorithm: 'HS256',
        expiresIn: details.maxAge,
      }
    );
  }

  /**
   * Verify a JWT and return its payload
   * @param token
   */
  public verifyJWT (token: string): Promise<JwtAccess> {
    return new Promise((resolve, reject) => {
      jwt.verify(
        token,
        config.jwtAccessSecret,
        /* eslint-disable @typescript-eslint/ban-ts-comment */
        // @ts-ignore
        (err: VerifyErrors | null, decoded?: JwtPayload | undefined) => {
          if (err || !decoded?.data) {
            return reject(new UnauthorizedException());
          }
          resolve(decoded.data);
        }
        /* eslint-enable @typescript-eslint/ban-ts-comment */
      );
    });
  }
}

export default new AccessTokenService();
