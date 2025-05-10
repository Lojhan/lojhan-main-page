import ContentSidebar from "@/components/markdown-reader/content-sidebar";
import MarkdownRenderer from "@/components/markdown-reader/markdown-renderer";
import { getDictionary } from "@/i18n";
import { readFile } from "node:fs/promises";
import path from "node:path";

type Props = {
  params: Promise<{
    language: string;
    path: string[];
  }>;
};

export default async function Content({ params }: Props) {
  const { path: filePath = ["README.md"], language } = await params;
  const dictionary = await getDictionary(language, "/content");
  const content = await readFile(
    path.join(process.cwd(), "public", "content", language, ...filePath),
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
