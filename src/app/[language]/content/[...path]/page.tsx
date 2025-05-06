import MarkdownRenderer from "@/components/markdown-reader/markdown-renderer";
import { readFile } from "node:fs/promises";
import path from "node:path";
type Props = {
  params: Promise<{
    language: string;
    path: string[];
  }>;
};

export default async function Content({ params }: Props) {
  const { path: filePath, language } = await params;

  filePath[filePath.length - 1] = filePath[filePath.length - 1].replace(
    ".md",
    `.${language}.md`
  );

  const content = await readFile(
    path.join(process.cwd(), "public", "content", ...filePath)
  ).catch(() => "no content");

  return <MarkdownRenderer content={content.toString()} path={filePath} />;
}
