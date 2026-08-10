"use client";

import type { ComponentProps } from "react";

export function Badge({
  className,
  children,
  ...props
}: ComponentProps<"span">) {
  return (
    <span
      className={`glass border border-muted inline-flex items-center gap-1.5 rounded-full px-3 py-1${
        className ? ` ${className}` : ""
      }`}
      {...props}
    >
      {children}
    </span>
  );
}
