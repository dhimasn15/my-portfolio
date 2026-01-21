import { NextResponse } from 'next/server';
import { getGitHubContributions, getGitHubContributionCalendar } from '@/app/utils/github';

export async function GET() {
  try {
    const [contributionsData, contributionCalendar] = await Promise.all([
      getGitHubContributions(),
      getGitHubContributionCalendar(),
    ]);

    if (!contributionsData) {
      return NextResponse.json(
        { error: 'Gagal to fetch GitHub data' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      user: contributionsData.user,
      stats: contributionsData.stats,
      pinnedRepos: contributionsData.pinnedRepos,
      contributions: contributionsData.contributions,
      recentActivity: contributionsData.recentActivity,
      contributionCalendar,
      lastUpdated: new Date().toISOString(),
    });
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}