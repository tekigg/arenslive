import { NextResponse } from 'next/server';

const TWITCH_CLIENT_ID = process.env.TWITCH_CLIENT_ID;
const TWITCH_CLIENT_SECRET = process.env.TWITCH_CLIENT_SECRET;

function getBaseUrl() {
  if (typeof window !== "undefined") return window.location.origin;
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
  return `http://localhost:${process.env.PORT ?? 3000}`;
}

export async function GET() {
  try {
    // Fetch streamers list from the JSON file
    const streamersResponse = await fetch(`${getBaseUrl()}/assets/data/streamers.json` , { next: { revalidate: 10 }, headers: {Accept: 'application/json'} });
    const streamers = await streamersResponse.json();

    // Get OAuth token
    const tokenResponse = await fetch(`https://id.twitch.tv/oauth2/token?client_id=${TWITCH_CLIENT_ID}&client_secret=${TWITCH_CLIENT_SECRET}&grant_type=client_credentials`, {
      method: 'POST',
      headers: {Accept: 'application/json'}
    });
    const tokenData = await tokenResponse.json();
    const accessToken = tokenData.access_token;

    // Get user information
    const userResponse = await fetch(`https://api.twitch.tv/helix/users?login=${streamers.join('&login=')}`, {
      headers: {
        Accept: 'application/json',
        'Client-ID': TWITCH_CLIENT_ID!,
        'Authorization': `Bearer ${accessToken}`
      }
    });
    const userData = await userResponse.json();

    // Get live streams
    const streamResponse = await fetch(`https://api.twitch.tv/helix/streams?user_login=${streamers.join('&user_login=') }`, {
      headers: {
        Accept: 'application/json',
        'Client-ID': TWITCH_CLIENT_ID!,
        'Authorization': `Bearer ${accessToken}`
      }
    });
    const streamData = await streamResponse.json();

    // Combine user and stream data
    const streamerInfo = userData.data.map((user: any) => {
      const stream = streamData.data.find((s: any) => s.user_login === user.login);
      return {
        profilePictureUrl: user.profile_image_url,
        isLive: !!stream,
        description: user.description,
        displayName: user.display_name
      };
    });

    return NextResponse.json(streamerInfo);
  } catch (error) {
    console.error('Error:', error, "debug info:", { TWITCH_CLIENT_ID, TWITCH_CLIENT_SECRET }, getBaseUrl());
    return NextResponse.json({ error: 'An error occurred while fetching streamer information' }, { status: 500 });
  }
}
