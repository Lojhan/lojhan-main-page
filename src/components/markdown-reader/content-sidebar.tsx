import { FileTree } from "./file-tree";
import { getContentStructure } from "@/lib/filesystem";

export default async function ContentSidebar({
  language,
}: {
  language: string;
}) {
  const structure = await getContentStructure("", language);

  return (
    <div className="p-6 border-r bg-background h-[calc(100vh-4rem-1px)] overflow-y-scroll overflow-x-clip custom-scrollbar">
      <FileTree nodes={structure} />
    </div>
  );
}
