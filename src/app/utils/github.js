import axios from 'axios';
import 'server-only';

const GITHUB_USERNAME = process.env.GITHUB_USERNAME;
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;

const githubApi = axios.create({
  baseURL: 'https://api.github.com',
  headers: GITHUB_TOKEN
    ? { Authorization: `Bearer ${GITHUB_TOKEN}` }
    : {},
});

export const getGitHubContributions = async () => {
  try {
    if (!GITHUB_USERNAME) {
      console.error('GITHUB_USERNAME is undefined');
      return null; 
    }

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

    return {
      user,
      stats: {
        totalRepos: user.public_repos,
        followers: user.followers,
        following: user.following,
      },
      contributions: events,
      recentActivity: events.slice(0, 10),
      pinnedRepos: repos.slice(0, 6),
    };
  } catch (error) {
    console.error('Error fetching GitHub data:', error);
    return null;
  }
};
