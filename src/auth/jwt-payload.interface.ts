export interface JwtPayload {
  email: string;
  /**
   * Sub references the user's id
   */
  sub: string;
}
