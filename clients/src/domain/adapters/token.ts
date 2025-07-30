export interface TokenPayload {
  id: string;
  resetPassword?: boolean;
}

export abstract class TokenAdapter {
  abstract getPayloadFromToken(token: string): Promise<TokenPayload | null>;
  abstract generateToken(
    payload: TokenPayload,
    expiresIn?: Date,
  ): Promise<string>;
}
