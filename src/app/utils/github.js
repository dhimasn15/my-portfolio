import axios from 'axios';

const GITHUB_USERNAME = process.env.GITHUB_USERNAME;
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;

if (!GITHUB_USERNAME) {
  throw new Error('GITHUB_USERNAME is undefined');
}

const githubApi = axios.create({
  baseURL: 'https://api.github.com',
  headers: GITHUB_TOKEN
    ? { Authorization: `Bearer ${GITHUB_TOKEN}` }
    : {},
});

export const getGitHubContributions = async () => {
  try {
    const userResponse = await githubApi.get(`/users/${GITHUB_USERNAME}`);
    const user = userResponse.data;

    const reposResponse = await githubApi.get(
      `/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=100`
    );
    const repos = reposResponse.data;

    const eventsResponse = await githubApi.get(
      `/users/${GITHUB_USERNAME}/events/public?per_page=100`
    );
    const events = eventsResponse.data;

    const contributions = parseEventsToContributions(events);

    const stats = {
      totalRepos: user.public_repos,
      followers: user.followers,
      following: user.following,
      totalStars: repos.reduce((s, r) => s + r.stargazers_count, 0),
      totalForks: repos.reduce((s, r) => s + r.forks_count, 0),
    };

    const pinnedRepos = repos
      .filter(repo => !repo.fork)
      .sort((a, b) => b.stargazers_count - a.stargazers_count)
      .slice(0, 6);

    return {
      user,
      stats,
      pinnedRepos,
      contributions,
      recentActivity: events.slice(0, 10),
    };
  } catch (error) {
    console.error('Error fetching GitHub data:', error);
    return null;
  }
};
