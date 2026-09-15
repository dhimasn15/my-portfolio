import { NextResponse } from 'next/server';
import { z } from 'zod';
import { checkCredentials, createSession, sessionCookie } from '@/app/lib/auth';

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1).max(200),
});

export async function POST(request) {
  try {
    const body = await request.json();
    const parsed = loginSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: 'Email dan password wajib diisi' }, { status: 400 });
    }
    if (!checkCredentials(parsed.data.email, parsed.data.password)) {
      return NextResponse.json({ error: 'Kredensial salah' }, { status: 401 });
    }
    const { token } = createSession(parsed.data.email);
    const res = NextResponse.json({ ok: true });
    res.headers.set('Set-Cookie', sessionCookie(token));
    return res;
  } catch (error) {
    console.error('admin login error:', error);
    return NextResponse.json({ error: 'Login gagal' }, { status: 500 });
  }
}
