import { NextResponse } from "next/server";
import { GITHUB_REPO } from "@/lib/constants";

export async function GET() {
  try {
    const headers: Record<string, string> = {
      "Accept": "application/vnd.github+json",
    };
    if (process.env.GITHUB_TOKEN) {
      headers["Authorization"] = `Bearer ${process.env.GITHUB_TOKEN}`;
    }

    const res = await fetch(`https://api.github.com/repos/${GITHUB_REPO}`, {
      headers,
      next: { revalidate: 900 },
    });

    if (!res.ok) {
      throw new Error("Error fetching GitHub API");
    }

    const data = await res.json();
    return NextResponse.json({ stars: data.stargazers_count });
  } catch (error) {
    console.error("[GitHub API Route] Error:", error);
    return NextResponse.json({ stars: null }, { status: 500 });
  }
}
