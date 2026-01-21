import { NextResponse } from 'next/server';
import { getGitHubContributions } from '@/app/utils/github';

export async function GET() {
  try {
    const data = await getGitHubContributions();

    if (!data) {
      return NextResponse.json(
        { error: 'Failed to fetch GitHub data' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      user: data.user,
      stats: data.stats,
      pinnedRepos: data.pinnedRepos,
      contributions: data.contributions,
      recentActivity: data.recentActivity,
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
