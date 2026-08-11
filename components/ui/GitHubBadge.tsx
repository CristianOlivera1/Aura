"use client";

import { useEffect, useState } from "react";

type GitHubBadgeProps = {
  className?: string;
  fallback?: string;
};

export function GitHubBadge({ className, fallback = "—" }: GitHubBadgeProps) {
  const [stars, setStars] = useState<number | null>(null);

  useEffect(() => {
    fetch("/api/github")
      .then((res) => {
        if (!res.ok) throw new Error("Internal API Error");
        return res.json();
      })
      .then((data) => setStars(data.stars))
      .catch((err) => {
        console.warn("[GitHubBadge] Failed to fetch stars:", err);
        setStars(null);
      });
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
