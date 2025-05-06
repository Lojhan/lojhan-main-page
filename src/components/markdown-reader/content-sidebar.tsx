import { ScrollArea } from "@/components/ui/scroll-area";
import { FileTree } from "./file-tree";
import { getContentStructure } from "@/lib/filesystem";

type ContentSidebarProps = {
  params: Promise<{ path: string[] }>;
};

export default async function ContentSidebar({ params }: ContentSidebarProps) {
  const structure = await getContentStructure();
  const { path } = await params;

  return (
    <ScrollArea className="p-6 border-r bg-background h-[calc(100vh-4rem-1px)]">
      <FileTree nodes={structure} path={path} />
    </ScrollArea>
  );
}
