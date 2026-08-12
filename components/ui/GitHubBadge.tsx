"use client";

import { useEffect, useState } from "react";

type GitHubBadgeProps = {
  className?: string;
  fallback?: string;
};

/* Module-level cache: Header/Hero (and any future instance) share a single
   /api/github fetch instead of each hitting the API on mount. Later mounts
   resolve instantly from `cachedStars` or from the in-flight promise. */
let cachedStars: number | null | undefined;
let inFlight: Promise<number | null> | null = null;

function fetchStars(): Promise<number | null> {
  if (cachedStars !== undefined) return Promise.resolve(cachedStars);
  
  if (!inFlight) {
    inFlight = fetch("/api/github")
      .then((res) => {
        if (!res.ok) throw new Error("Internal API Error");
        return res.json();
      })
      .then((data) => {
        // Fallback to null if data.stars is undefined, satisfying the Promise<number | null> return type
        cachedStars = data.stars ?? null; 
        return cachedStars as number | null; 
      })
      .catch((err) => {
        console.warn("[GitHubBadge] Failed to fetch stars:", err);
        cachedStars = null;
        return null;
      })
      .finally(() => {
        inFlight = null;
      });
  }
  return inFlight;
}

export function GitHubBadge({ className, fallback = "—" }: GitHubBadgeProps) {
  const [stars, setStars] = useState<number | null>(cachedStars ?? null);

  useEffect(() => {
    let active = true;
    fetchStars().then((n) => {
      if (active) setStars(n);
    });
    return () => {
      active = false;
    };
  }, []);

  const formatStars = (count: number | null): string => {
    if (count === null) return fallback;
    if (count >= 1000) {
      return `${(count / 1000).toFixed(1)}K`;
    }
    return count.toString();
  };

  return <span className={className}>{formatStars(stars)}</span>;
}