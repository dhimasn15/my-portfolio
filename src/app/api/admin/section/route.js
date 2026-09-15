import { NextResponse } from 'next/server';
import { getAdminSession } from '@/app/lib/admin-guard';
import { updateSection } from '@/app/lib/store';
import { sectionSchemas } from '@/app/lib/validation';

export async function PUT(request) {
  const session = getAdminSession();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  try {
    const body = await request.json();
    const schema = sectionSchemas[body.section];
    if (!schema) return NextResponse.json({ error: 'Section tidak dikenal' }, { status: 400 });
    const parsed = schema.partial().safeParse(body.data);
    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Validasi gagal', issues: parsed.error.flatten().fieldErrors },
        { status: 400 }
      );
    }
    const updated = await updateSection(body.section, parsed.data);
    return NextResponse.json(updated);
  } catch (error) {
    console.error('admin section error:', error);
    return NextResponse.json({ error: error.message || 'Update gagal' }, { status: 400 });
  }
}
