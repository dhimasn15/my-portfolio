import { NextResponse } from 'next/server';
import { getAdminSession } from '@/app/lib/admin-guard';
import { getDB } from '@/app/lib/store';

export async function GET() {
  const session = getAdminSession();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  try {
    const db = await getDB();
    return NextResponse.json(db);
  } catch (error) {
    console.error('admin content error:', error);
    return NextResponse.json({ error: 'Failed to load' }, { status: 500 });
  }
}
