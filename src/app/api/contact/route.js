import { NextResponse } from 'next/server';
import { createItem } from '@/app/lib/store';
import { messageSchema } from '@/app/lib/validation';

const WINDOW_MS = 60 * 1000;
const MAX_REQ = 5;
const hits = new Map();

function rateLimited(ip) {
  const now = Date.now();
  const arr = (hits.get(ip) || []).filter((t) => now - t < WINDOW_MS);
  arr.push(now);
  hits.set(ip, arr);
  return arr.length > MAX_REQ;
}

export async function POST(request) {
  try {
    const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'local';
    if (rateLimited(ip)) {
      return NextResponse.json({ error: 'Terlalu banyak percobaan. Coba lagi sebentar.' }, { status: 429 });
    }
    const body = await request.json();
    const parsed = messageSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Validasi gagal', issues: parsed.error.flatten().fieldErrors },
        { status: 400 }
      );
    }
    const saved = await createItem('messages', { ...parsed.data, read: false });
    return NextResponse.json({ ok: true, id: saved.id });
  } catch (error) {
    console.error('contact API error:', error);
    return NextResponse.json({ error: 'Gagal mengirim pesan' }, { status: 500 });
  }
}
