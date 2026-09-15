import 'server-only';

const DEFAULT_PATH = 'data/portfolio.json';

function config() {
  return {
    token: process.env.GITHUB_CONTENT_TOKEN,
    owner: process.env.GITHUB_OWNER,
    repo: process.env.GITHUB_REPO,
    branch: process.env.GITHUB_BRANCH || 'main',
    path: process.env.GITHUB_CONTENT_PATH || DEFAULT_PATH,
  };
}

export function isGitHubContentConfigured() {
  const { token, owner, repo } = config();
  return Boolean(token && owner && repo);
}

function endpoint(path, cfg) {
  return `https://api.github.com/repos/${encodeURIComponent(cfg.owner)}/${encodeURIComponent(cfg.repo)}/contents/${path.split('/').map(encodeURIComponent).join('/')}?ref=${encodeURIComponent(cfg.branch)}`;
}

async function githubRequest(url, options = {}) {
  const response = await fetch(url, {
    ...options,
    headers: {
      Accept: 'application/vnd.github+json',
      Authorization: `Bearer ${config().token}`,
      'X-GitHub-Api-Version': '2022-11-28',
      ...options.headers,
    },
    cache: 'no-store',
  });
  const body = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(body.message || `GitHub API error ${response.status}`);
  }
  return body;
}

export async function readGitHubContent() {
  const cfg = config();
  const body = await githubRequest(endpoint(cfg.path, cfg));
  if (!body.content || body.encoding !== 'base64') throw new Error('GitHub content format is invalid');
  const json = Buffer.from(body.content.replace(/\n/g, ''), 'base64').toString('utf8');
  return { data: JSON.parse(json), sha: body.sha };
}

export async function writeGitHubContent(data, message = 'Update portfolio content') {
  const cfg = config();
  const current = await readGitHubContent();
  const content = Buffer.from(`${JSON.stringify(data, null, 2)}\n`, 'utf8').toString('base64');
  const body = await githubRequest(endpoint(cfg.path, cfg).split('?')[0], {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      message,
      content,
      sha: current.sha,
      branch: cfg.branch,
    }),
  });
  return { data, sha: body.content?.sha || current.sha };
}
