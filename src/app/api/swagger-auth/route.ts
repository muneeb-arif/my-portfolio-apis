import { NextRequest, NextResponse } from 'next/server';
import {
  SWAGGER_DOCS_COOKIE,
  isValidSwaggerDocsCookie,
  swaggerDocsCookieValue,
  verifySwaggerUiCredentials,
} from '@/lib/swagger-docs-auth';

export async function POST(request: NextRequest) {
  let body: { username?: string; password?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ success: false, error: 'Invalid JSON' }, { status: 400 });
  }

  const username = typeof body.username === 'string' ? body.username : '';
  const password = typeof body.password === 'string' ? body.password : '';

  if (!verifySwaggerUiCredentials(username, password)) {
    return NextResponse.json({ success: false, error: 'Invalid credentials' }, { status: 401 });
  }

  const res = NextResponse.json({ success: true });
  const secure = process.env.NODE_ENV === 'production';
  res.cookies.set(SWAGGER_DOCS_COOKIE, swaggerDocsCookieValue(), {
    httpOnly: true,
    secure,
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24 * 7,
  });
  return res;
}

export async function DELETE() {
  const res = NextResponse.json({ success: true });
  res.cookies.set(SWAGGER_DOCS_COOKIE, '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 0,
  });
  return res;
}

export async function GET(request: NextRequest) {
  const ok = isValidSwaggerDocsCookie(request.cookies.get(SWAGGER_DOCS_COOKIE)?.value);
  return NextResponse.json({ authenticated: ok });
}
