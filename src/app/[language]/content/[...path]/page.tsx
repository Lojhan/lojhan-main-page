import ContentSidebar from "@/components/markdown-reader/content-sidebar";
import MarkdownRenderer from "@/components/markdown-reader/markdown-renderer";
import { getDictionary } from "@/i18n";
import { humanizeDirentName } from "@/lib/humanize";
import type { Metadata } from "next";
import { readFile } from "node:fs/promises";
import path from "node:path";

type Props = {
  params: Promise<{
    language: string;
    path: string[];
  }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { path: filePath = ["README.md"], language } = await params;

  const content = await readFile(
    path.join(process.cwd(), "public", "content", language, ...filePath)
  ).catch(() => "no content");

  return {
    title: humanizeDirentName(filePath[filePath.length - 1]),
    description: content.slice(0, 100) + "...",
    category: "technology",
    keywords: [...filePath.map((file) => humanizeDirentName(file))],
  };
}

export default async function Content({ params }: Props) {
  const { path: filePath = ["README.md"], language } = await params;
  const dictionary = await getDictionary(language, "/content");
  const content = await readFile(
    path.join(process.cwd(), "public", "content", language, ...filePath)
  ).catch(() => "no content");

  return (
    <MarkdownRenderer
      content={content.toString()}
      path={filePath}
      dictionary={dictionary}
    >
      <ContentSidebar language={language} />
    </MarkdownRenderer>
  );
}
