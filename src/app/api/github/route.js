import { NextResponse } from 'next/server';
import { getGitHubContributions } from '@/app/utils/github';

export async function GET() {
  try {
    const contributionsData = await getGitHubContributions();

    if (!contributionsData) {
      return NextResponse.json(
        { error: 'Gagal fetch GitHub data' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      user: contributionsData.user,
      stats: contributionsData.stats,
      pinnedRepos: contributionsData.pinnedRepos,
      contributions: contributionsData.contributions,
      recentActivity: contributionsData.recentActivity,
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
