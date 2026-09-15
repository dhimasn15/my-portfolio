'use client';

export default function AdminOverview({ db, session }) {
  const counts = {
    Projects: (db.projects || []).length,
    Published: (db.projects || []).filter((p) => p.status === 'published').length,
    Experience: (db.experience || []).length,
    Skills: (db.skills || []).length,
    Messages: (db.messages || []).length,
    Unread: (db.messages || []).filter((m) => !m.read).length,
  };
  const recentProjects = [...(db.projects || [])].sort((a, b) => String(b.updatedAt).localeCompare(String(a.updatedAt))).slice(0, 5);
  const recentMessages = [...(db.messages || [])].reverse().slice(0, 5);

  return (
    <div>
      <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">Overview</p>
      <h1 className="mt-2 text-2xl font-extrabold tracking-tight md:text-3xl">Portfolio overview</h1>
      <p className="mt-1 text-sm text-muted-foreground">Signed in as {session.email}. Data tersimpan di <code className="font-mono">data/portfolio.json</code>.</p>

      <div className="mt-6 grid gap-px border border-border bg-border sm:grid-cols-3 lg:grid-cols-6">
        {Object.entries(counts).map(([k, v]) => (
          <div key={k} className="bg-card p-4">
            <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-muted-foreground">{k}</p>
            <p className="mt-1.5 text-2xl font-extrabold">{v}</p>
          </div>
        ))}
      </div>

      <div className="mt-6 flex flex-wrap gap-2">
        <a href="/admin/projects" className="btn-primary !px-4 !py-2 text-sm">+ New project</a>
        <a href="/" target="_blank" rel="noreferrer" className="btn-secondary !px-4 !py-2 text-sm">Preview website ↗</a>
        <a href="/admin/messages" className="btn-secondary !px-4 !py-2 text-sm">Inbox ({counts.Unread} unread)</a>
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <section className="panel">
          <div className="flex items-center justify-between border-b border-border px-5 py-3">
            <h2 className="font-semibold">Recent projects</h2>
            <a href="/admin/projects" className="text-sm underline underline-offset-4 hover:text-accent">Manage →</a>
          </div>
          <ul className="divide-y divide-border">
            {recentProjects.map((p) => (
              <li key={p.id} className="flex items-center justify-between gap-3 px-5 py-3 text-sm">
                <span className="truncate font-medium">{p.title}</span>
                <span className="shrink-0 font-mono text-[11px] uppercase text-muted-foreground">{p.status} · {p.updatedAt}</span>
              </li>
            ))}
            {recentProjects.length === 0 && <li className="px-5 py-6 text-sm text-muted-foreground">No projects yet.</li>}
          </ul>
        </section>
        <section className="panel">
          <div className="flex items-center justify-between border-b border-border px-5 py-3">
            <h2 className="font-semibold">Recent messages</h2>
            <a href="/admin/messages" className="text-sm underline underline-offset-4 hover:text-accent">Inbox →</a>
          </div>
          <ul className="divide-y divide-border">
            {recentMessages.map((m) => (
              <li key={m.id} className="px-5 py-3 text-sm">
                <p className="font-medium">{m.subject} {!m.read && <span className="ml-1 font-mono text-[10px] uppercase text-accent">● new</span>}</p>
                <p className="text-muted-foreground">{m.name} - {m.email}</p>
              </li>
            ))}
            {recentMessages.length === 0 && <li className="px-5 py-6 text-sm text-muted-foreground">No messages yet.</li>}
          </ul>
        </section>
      </div>
    </div>
  );
}
