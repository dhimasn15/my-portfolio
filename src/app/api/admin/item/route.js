import { NextResponse } from 'next/server';
import { getAdminSession } from '@/app/lib/admin-guard';
import { createItem, updateItem, deleteItem, assertCollection } from '@/app/lib/store';
import { schemas } from '@/app/lib/validation';

export async function POST(request) {
  const session = getAdminSession();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  try {
    const body = await request.json();
    assertCollection(body.collection);
    const schema = schemas[body.collection];
    const parsed = body.collection === 'messages'
      ? { success: true, data: body.data }
      : schema.safeParse(body.data);
    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Validasi gagal', issues: parsed.error.flatten().fieldErrors },
        { status: 400 }
      );
    }
    const item = await createItem(body.collection, parsed.data);
    return NextResponse.json(item, { status: 201 });
  } catch (error) {
    console.error('admin create error:', error);
    return NextResponse.json({ error: error.message || 'Create gagal' }, { status: 400 });
  }
}

export async function PUT(request) {
  const session = getAdminSession();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  try {
    const body = await request.json();
    assertCollection(body.collection);
    if (!body.id) return NextResponse.json({ error: 'id wajib' }, { status: 400 });
    const schema = schemas[body.collection];
    const partial = schema.partial();
    const parsed = body.collection === 'messages'
      ? { success: true, data: body.data }
      : partial.safeParse(body.data);
    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Validasi gagal', issues: parsed.error.flatten().fieldErrors },
        { status: 400 }
      );
    }
    const updated = await updateItem(body.collection, body.id, parsed.data);
    if (!updated) return NextResponse.json({ error: 'Tidak ditemukan' }, { status: 404 });
    return NextResponse.json(updated);
  } catch (error) {
    console.error('admin update error:', error);
    return NextResponse.json({ error: error.message || 'Update gagal' }, { status: 400 });
  }
}

export async function DELETE(request) {
  const session = getAdminSession();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  try {
    const { searchParams } = new URL(request.url);
    const collection = searchParams.get('collection');
    const id = searchParams.get('id');
    assertCollection(collection);
    if (!id) return NextResponse.json({ error: 'id wajib' }, { status: 400 });
    const ok = await deleteItem(collection, id);
    if (!ok) return NextResponse.json({ error: 'Tidak ditemukan' }, { status: 404 });
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error('admin delete error:', error);
    return NextResponse.json({ error: error.message || 'Delete gagal' }, { status: 400 });
  }
}
