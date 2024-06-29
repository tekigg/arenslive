import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { streamerIds } = await request.json();

    if (!Array.isArray(streamerIds)) {
      return NextResponse.json(
        { error: "Invalid input: streamerIds must be an array" },
        { status: 400 }
      );
    }

    // Fetch the Twitch homepage to get the clientId
    const homeResponse = await fetch("https://www.twitch.tv/", {
      headers: {
        "user-agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.110 Safari/537.36",
      },
    });
    const homeData = await homeResponse.text();

    const start = 'clientId="';
    const end = '",commonOptions=';
    const clientId = homeData
      .substring(
        homeData.indexOf(start) + start.length,
        homeData.lastIndexOf(end)
      )
      .trim();

    const url = "https://gql.twitch.tv/gql";

    const results = await Promise.all(
      streamerIds.map(async (streamerId: string) => {
        const payload = [
          {
            operationName: "ChannelRoot_AboutPanel",
            variables: {
              channelLogin: streamerId,
              skipSchedule: true,
            },
            extensions: {
              persistedQuery: {
                version: 1,
                sha256Hash:
                  "6089531acef6c09ece01b440c41978f4c8dc60cb4fa0124c9a9d3f896709b6c6",
              },
            },
          },
        ];

        const response = await fetch(url, {
          method: "POST",
          headers: {
            "user-agent":
              "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.110 Safari/537.36",
            "Client-Id": clientId,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        });

        const data = await response.json();

        // Add null checks and provide default values
        const socials =
          data[0]?.data?.user?.channel?.socialMedias?.map(
            (x: { url: string; name: string }) => ({
              url: x.url,
              name: x.name,
            })
          ) || [];
        console.log(results, data, response, homeData, clientId, url, payload);

        return { streamerId, socials };
      })
    );
    return NextResponse.json(results);
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { error: "An error occurred while fetching streamer information" },
      { status: 500 }
    );
  }
}
