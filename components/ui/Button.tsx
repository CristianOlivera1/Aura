"use client";

import type { ComponentProps, ReactNode } from "react";
import { Icon } from "@iconify/react";

type Variant = "primary" | "glass";
type Size = "sm" | "md" | "lg" | "icon" | "icon-sm";

const variantClasses: Record<Variant, string> = {
  primary:
    "bg-accent text-accent-fg font-medium hover:opacity-90 transition-opacity squircle-element",
  glass: "glass border border-muted font-medium inline-flex items-center justify-center gap-2 hover:border-accent hover:text-accent transition-colors squircle-element",
};

const sizeClasses: Record<Size, string> = {
  sm: "h-9 px-3 text-xl",
  md: "px-4 h-10 text-xl",
  lg: "px-6 py-2.5 text-xl",
  icon: "w-9 h-9",
  "icon-sm": "w-7 h-7",
};

type ButtonBaseProps = {
  variant?: Variant;
  size?: Size;
  icon?: string;
  iconSize?: number;
  className?: string;
  children?: ReactNode;
};

type ButtonAsLink = ButtonBaseProps &
  { href: string } &
  Omit<ComponentProps<"a">, keyof ButtonBaseProps | "href">;

type ButtonAsButton = ButtonBaseProps &
  { href?: undefined } &
  Omit<ComponentProps<"button">, keyof ButtonBaseProps>;

export type ButtonProps = ButtonAsLink | ButtonAsButton;

export function Button(props: ButtonProps) {
  const {
    variant = "glass",
    size = "md",
    icon,
    iconSize = 15,
    className,
    children,
    ...rest
  } = props;

  const classes = `${variantClasses[variant]} ${sizeClasses[size]}${
    className ? ` ${className}` : ""
  }`;
  const iconEl = icon ? (
    <Icon icon={icon} width={iconSize} height={iconSize} />
  ) : null;

  if ("href" in rest && typeof rest.href === "string") {
    const { href, ...anchorProps } = rest;
    return (
      <a className={classes} href={href} {...anchorProps}>
        {iconEl}
        {children}
      </a>
    );
  }

  return (
    <button type="button" className={classes} {...rest}>
      {iconEl}
      {children}
    </button>
  );
}
