"use client";

import { type Key } from "react";
import { Highlight, themes } from "prism-react-renderer";

interface Props {
  code: string;
  language: "css" | "html" | "tsx" | "javascript";
}

/**
 * Syntax-highlighted code block using prism-react-renderer.
 * Uses the vsDark theme for a premium dark code editor look.
 */
export function CodeBlock({ code, language }: Props) {
  return (
    <Highlight theme={themes.vsDark} code={code.trim()} language={language}>
      {({ style, tokens, getLineProps, getTokenProps }) => (
        <pre
          className="text-[10px] leading-relaxed p-3 overflow-auto flex-1 min-h-0 font-mono squircle-element custom-scrollbar"
          style={{ ...style, background: "transparent", margin: 0 }}
        >
          {tokens.map((line, i) => {
            const { key: lineKey, ...lineProps } = getLineProps({ line, key: i });
            return (
              <div key={(lineKey ?? i) as Key} {...lineProps}>
                <span className="inline-block w-6 text-right mr-3 text-white/20 select-none text-[9px]">
                  {i + 1}
                </span>
                {line.map((token, j) => {
                  const { key: tokenKey, ...tokenProps } = getTokenProps({ token, key: j });
                  return <span key={(tokenKey ?? j) as Key} {...tokenProps} />;
                })}
              </div>
            );
          })}
        </pre>
      )}
    </Highlight>
  );
}
