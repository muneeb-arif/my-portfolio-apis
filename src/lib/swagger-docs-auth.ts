import { createHmac, timingSafeEqual } from 'crypto';

export const SWAGGER_DOCS_COOKIE = 'swagger_docs';

const SWAGGER_USER = 'swagger';
const SWAGGER_PASSWORD = 'swagger!!';

function signingSecret(): string {
  return process.env.SWAGGER_DOCS_SECRET || process.env.JWT_SECRET || 'swagger-docs-dev-secret';
}

/** Opaque cookie value derived from server secret (not the UI password). */
export function swaggerDocsCookieValue(): string {
  return createHmac('sha256', signingSecret()).update('swagger-docs-grant').digest('hex');
}

export function isValidSwaggerDocsCookie(value: string | undefined): boolean {
  if (!value) return false;
  const expected = swaggerDocsCookieValue();
  try {
    const a = Buffer.from(value, 'utf8');
    const b = Buffer.from(expected, 'utf8');
    if (a.length !== b.length) return false;
    return timingSafeEqual(a, b);
  } catch {
    return false;
  }
}

export function verifySwaggerUiCredentials(username: string, password: string): boolean {
  if (username !== SWAGGER_USER) return false;
  const ex = Buffer.from(SWAGGER_PASSWORD, 'utf8');
  const got = Buffer.from(password, 'utf8');
  if (ex.length !== got.length) return false;
  return timingSafeEqual(ex, got);
}
