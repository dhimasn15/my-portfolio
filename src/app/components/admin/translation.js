const FIELDS = {
  projects: ['title', 'shortDescription', 'description', 'role', 'problem', 'solution', 'features'],
  experience: ['title', 'company', 'type', 'description', 'responsibilities'],
  education: ['degree', 'field', 'description'],
  skills: ['description'],
  profile: ['headline', 'bio', 'longBio', 'location', 'availabilityNote'],
  settings: ['siteTitle', 'siteDescription'],
};

function hasValue(value) {
  return Array.isArray(value) ? value.length > 0 : String(value || '').trim().length > 0;
}

export function getTranslationStatus(item, collection, locale) {
  const fields = FIELDS[collection] || [];
  const suffix = locale === 'en' ? '_en' : '';
  const complete = fields.filter((field) => hasValue(item?.[`${field}${suffix}`])).length;
  return { complete, total: fields.length, isComplete: complete === fields.length };
}

export function translationLabel(item, collection, locale) {
  const status = getTranslationStatus(item, collection, locale);
  return `${status.complete}/${status.total}`;
}

export function TranslationStatus({ item, collection, compact = false }) {
  const id = getTranslationStatus(item, collection, 'id');
  const en = getTranslationStatus(item, collection, 'en');

  return (
    <div className="flex flex-wrap gap-1.5 font-mono text-[10px] uppercase tracking-[0.12em]">
      {[
        ['ID', id],
        ['EN', en],
      ].map(([label, status]) => (
        <span
          key={label}
          title={`${label}: ${status.complete} dari ${status.total} field terisi`}
          className={`border px-1.5 py-1 ${status.isComplete ? 'border-emerald-600/40 text-emerald-700 dark:text-emerald-400' : 'border-amber-600/40 text-amber-700 dark:text-amber-400'}`}
        >
          {label} {translationLabel(item, collection, label === 'EN' ? 'en' : 'id')}{!compact && (status.isComplete ? ' OK' : ' !')}
        </span>
      ))}
    </div>
  );
}
