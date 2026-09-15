export function SectionHead({ index, title, hint, action }) {
  return (
    <div className="section-head">
      <div>
        <p className="section-index">{index}</p>
        <h2 className="mt-2 text-2xl font-extrabold tracking-tight md:text-3xl">{title}</h2>
        {hint && <p className="mt-2 max-w-xl text-sm text-muted-foreground">{hint}</p>}
      </div>
      {action}
    </div>
  );
}

export function Meta({ children }) {
  return (
    <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-muted-foreground">{children}</p>
  );
}

export function StatusPill({ status }) {
  const map = {
    published: 'border-green-700 text-green-700 dark:text-green-400',
    draft: 'border-border text-muted-foreground',
    archived: 'border-border text-muted-foreground',
  };
  return (
    <span className={`inline-flex items-center border px-2 py-0.5 font-mono text-[11px] uppercase tracking-[0.14em] ${map[status] || map.draft}`}>
      {status}
    </span>
  );
}
