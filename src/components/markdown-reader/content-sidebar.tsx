import { ScrollArea } from "@/components/ui/scroll-area";
import { FileTree } from "./file-tree";
import { getContentStructure } from "@/lib/filesystem";

export default async function ContentSidebar({ language }: { language: string }) {
  const structure = await getContentStructure("", language);

  return (
    <ScrollArea className="p-6 border-r bg-background h-[calc(100vh-4rem-1px)]">
      <FileTree nodes={structure} />
    </ScrollArea>
  );
}
