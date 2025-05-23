/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import type React from "react";

import { Fragment, type PropsWithChildren, useEffect, useState } from "react";
import ReactMarkdown, { type Components } from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { materialDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import remarkGfm from "remark-gfm";
import { Copy, Check } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "../ui/breadcrumb";
import { humanizeDirentName } from "@/lib/humanize";
import Link from "next/link";
import { useIsMobile } from "../ui/use-mobile";
import { cn } from "@/lib/utils";
import type { LangMap } from "@/i18n/lang-map";

interface MarkdownRendererProps {
  dictionary: LangMap["/content"];
  content: string;
  path: string[];
}

export default function MarkdownRenderer({
  dictionary,
  content,
  path,
  children,
}: PropsWithChildren<MarkdownRendererProps>) {
  const [showText, setShowText] = useState(false);
  const isMobile = useIsMobile();
  useEffect(() => {
    if (!isMobile) return;
    // Show text after approximately 2 seconds
    const showTextTimer = setTimeout(() => {
      setShowText(true);
    }, 2000);

    // Show breadcrumb again after another 2 seconds
    const showBreadcrumbTimer = setTimeout(() => {
      setShowText(false);
    }, 4000);

    // Cleanup timers on unmount
    return () => {
      clearTimeout(showTextTimer);
      clearTimeout(showBreadcrumbTimer);
    };
  }, [isMobile]);

  // after some scroll, hide the header
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(
    typeof window === "undefined" ? 0 : window?.scrollY,
  );

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const isScrollingDown = currentScrollY > lastScrollY;
      setIsVisible(!isScrollingDown);
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY]);

  return (
    <>
      <Sheet>
        <SheetTitle className="hidden">file tree</SheetTitle>
        <SheetDescription className="hidden">file tree</SheetDescription>
        <SheetTrigger className="hover:bg-muted/50" asChild>
          <Breadcrumb
            className={cn(
              "max-sm:sticky relative max-sm:top-16 z-40 py-2 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60",
              isVisible
                ? "translate-y-0"
                : "-translate-y-16 -webkit-transform:-translate-y-16",
              "transition-all duration-100 ease-in-out",
            )}
          >
            <BreadcrumbList className="px-4 rounded cursor-pointer">
              {(showText ? [dictionary.showDrawer] : path).map(
                (item, index) => {
                  if (index === path.length - 1 || showText) {
                    return (
                      <BreadcrumbItem
                        key={item}
                        className="transition-colors duration-500 ease-in-out"
                      >
                        {humanizeDirentName(item)}
                      </BreadcrumbItem>
                    );
                  }

                  return (
                    <Fragment key={item}>
                      <BreadcrumbItem className="transition-colors duration-500 ease-in-out">
                        {humanizeDirentName(item)}
                      </BreadcrumbItem>
                      <BreadcrumbSeparator />
                    </Fragment>
                  );
                },
              )}
            </BreadcrumbList>
          </Breadcrumb>
        </SheetTrigger>
        <SheetContent side="left" className="pt-10 w-[clamp(300px,80vw,400px)]">
          {children}
        </SheetContent>
      </Sheet>

      <div className="sm:px-6 container mx-auto max-sm:max-w-[90vw] mb-24">
        <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
          {content}
        </ReactMarkdown>
      </div>
    </>
  );
}

function CodeBlock({
  language,
  value,
  children,
}: React.PropsWithChildren<{ language: string; value: string }>) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative my-4 overflow-hidden rounded-lg border ">
      <div className="flex items-center justify-between bg-muted px-4 py-2">
        <span className="text-xs font-medium">{language || "code"}</span>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8"
          onClick={handleCopy}
        >
          {copied ? (
            <Check className="h-4 w-4" />
          ) : (
            <Copy className="h-4 w-4" />
          )}
          <span className="sr-only">Copy code</span>
        </Button>
      </div>
      <SyntaxHighlighter
        language={language}
        style={materialDark}
        customStyle={{
          margin: 0,
          borderRadius: 0,
          padding: "1rem",
          fontSize: "0.9rem",
        }}
      >
        {value}
      </SyntaxHighlighter>
    </div>
  );
}

const components: Components = {
  h1: ({ node, ...props }) => (
    <h1 className="mb-4 mt-6 text-3xl font-bold" {...props} />
  ),
  h2: ({ node, ...props }) => (
    <h2 className="mb-3 mt-5 text-2xl font-bold" {...props} />
  ),
  h3: ({ node, ...props }) => (
    <h3 className="mb-3 mt-4 text-xl font-bold" {...props} />
  ),
  h4: ({ node, ...props }) => (
    <h4 className="mb-2 mt-4 text-lg font-bold" {...props} />
  ),
  p: ({ node, ...props }) => <p className="mb-4 leading-7" {...props} />,

  a: ({ node, ...props }) => (
    <Link
      href={props.href || ""}
      className="font-medium text-primary underline underline-offset-4"
      rel="noopener noreferrer"
      {...props}
    />
  ),

  ul: ({ node, ...props }) => <ul className="mb-4 ml-6 list-disc" {...props} />,

  ol: ({ node, ...props }) => (
    <ol className="mb-4 ml-6 list-decimal" {...props} />
  ),

  li: ({ node, ...props }) => <li className="mb-1" {...props} />,

  blockquote: ({ node, ...props }) => (
    <blockquote className="mt-6 border-l-2 pl-6 italic" {...props} />
  ),

  code({ node, className, children, ...props }) {
    if (!className) {
      return (
        <code
          className="rounded bg-muted px-1 py-0.5 font-mono text-sm"
          {...props}
        >
          {children}
        </code>
      );
    }

    const match = /language-(\w+)/.exec(className);
    const language = match ? match[1] : "";

    return (
      <CodeBlock
        language={language}
        value={String(children).replace(/\n$/, "")}
      >
        {String(children).replace(/\n$/, "")}
      </CodeBlock>
    );
  },

  table: ({ node, ...props }) => (
    <div className="my-6 w-full overflow-y-auto">
      <table className="w-full" {...props} />
    </div>
  ),

  th: ({ node, ...props }) => (
    <th
      className="border px-4 py-2 text-left font-bold [&[align=center]]:text-center [&[align=right]]:text-right"
      {...props}
    />
  ),

  td: ({ node, ...props }) => (
    <td
      className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right"
      {...props}
    />
  ),
};
