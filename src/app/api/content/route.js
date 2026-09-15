import { NextResponse } from 'next/server';
import { getDB, publicPortfolio } from '@/app/lib/store';

export async function GET() {
  try {
    const db = await getDB();
    return NextResponse.json(publicPortfolio(db));
  } catch (error) {
    console.error('content API error:', error);
    return NextResponse.json({ error: 'Failed to load content' }, { status: 500 });
  }
}
