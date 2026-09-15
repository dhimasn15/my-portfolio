import { NextResponse } from 'next/server';
import { getAdminSession } from '@/app/lib/admin-guard';
import { adminConfigWarning } from '@/app/lib/auth';

export async function GET() {
  const session = getAdminSession();
  if (!session) {
    return NextResponse.json({ authenticated: false }, { status: 401 });
  }
  return NextResponse.json({ authenticated: true, email: session.email, warning: adminConfigWarning() });
}
