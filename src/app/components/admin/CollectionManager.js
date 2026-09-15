'use client';

import { useState } from 'react';
import { CollectionTable } from '@/app/components/admin/CollectionTable';
import { ItemForm } from '@/app/components/admin/ItemForm';

export function CollectionManager({ collection, items, columns, searchKeys, header, hint, newLabel, blank }) {
  const [editing, setEditing] = useState(null);
  const [creating, setCreating] = useState(false);
  const [version, setVersion] = useState(0);

  const refresh = () => {
    setEditing(null);
    setCreating(false);
    setVersion((v) => v + 1);
    window.location.reload();
  };

  if (editing || creating) {
    return (
      <ItemForm
        collection={collection}
        initial={editing || blank}
        onClose={() => { setEditing(null); setCreating(false); }}
        onSaved={refresh}
      />
    );
  }

  return (
    <div key={version}>
      <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">CMS / {collection}</p>
          <h1 className="mt-2 text-2xl font-extrabold tracking-tight">{header}</h1>
          {hint && <p className="mt-1 text-sm text-muted-foreground">{hint}</p>}
        </div>
        <button type="button" onClick={() => setCreating(true)} className="btn-primary !px-4 !py-2 text-sm">{newLabel || '+ New'}</button>
      </div>
      <CollectionTable
        collection={collection}
        items={items}
        columns={columns}
        searchKeys={searchKeys}
        onEdit={setEditing}
        onChanged={refresh}
      />
    </div>
  );
}
