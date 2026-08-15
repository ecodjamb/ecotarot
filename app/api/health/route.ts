import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export function GET() {
  return NextResponse.json({
    ok: true,
    app: 'EcoTarot',
    version: '1.0.0',
    timestamp: new Date().toISOString(),
  });
}
