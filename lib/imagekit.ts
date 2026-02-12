import ImageKit from "@imagekit/nodejs";

const privateKey = process.env.IMAGEKIT_PRIVATE_KEY ?? "";

/**
 * ImageKit client for server-side use (auth params for client uploads, server uploads, URL generation).
 * For client-side uploads, call GET /api/imagekit-auth to get token, signature, expire.
 */
export const imagekit = privateKey ? new ImageKit({ privateKey }) : null;

export const IMAGEKIT_URL_ENDPOINT =
  process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT ?? "";
export const IMAGEKIT_PUBLIC_KEY =
  process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY ?? "";
