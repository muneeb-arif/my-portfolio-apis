import { NextRequest, NextResponse } from 'next/server';
import { getOpenApiDocument } from '@/lib/openapi';
import { isValidSwaggerDocsCookie, SWAGGER_DOCS_COOKIE } from '@/lib/swagger-docs-auth';

function inferBaseUrl(request: NextRequest): string {
  const host = request.headers.get('x-forwarded-host') ?? request.headers.get('host') ?? 'localhost:5001';
  const proto = request.headers.get('x-forwarded-proto') ?? (host.startsWith('localhost') ? 'http' : 'https');
  return `${proto}://${host}`;
}

export async function GET(request: NextRequest) {
  if (!isValidSwaggerDocsCookie(request.cookies.get(SWAGGER_DOCS_COOKIE)?.value)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const doc = getOpenApiDocument(inferBaseUrl(request));
  return NextResponse.json(doc, {
    headers: {
      'Cache-Control': 'no-store',
    },
  });
}
