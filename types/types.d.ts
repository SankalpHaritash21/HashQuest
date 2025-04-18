export type HashAlgorithm =
  | "SHA256"
  | "MD5"
  | "SHA1"
  | "SHA512"
  | "SHA3"
  | "HMAC-SHA256"
  | "HMAC-SHA512";

export interface HashResult {
  input: string;
  hash: string;
  attempts: number;
  timeElapsed: number;
  hashRate: number;
}
