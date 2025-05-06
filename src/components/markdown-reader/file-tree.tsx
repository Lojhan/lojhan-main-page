import { cn } from "@/lib/utils";
import { FileTreeNode } from "./file-tree-node";
import type { FileNode } from "@/lib/filesystem";

export function FileTree({
  nodes,
  level = 0,
}: {
  nodes: FileNode[];
  level?: number;
}) {
  return (
    <ul className={cn(level > 0 && "ml-4", "relative")}>
      {nodes
        .sort((a, b) => {
          if (a.type === "dir" && b.type === "file") return -1;
          if (a.type === "file" && b.type === "dir") return 1;
          return a.name.localeCompare(b.name);
        })
        .map((node) => (
          <FileTreeNode key={node.path} node={node} level={level} />
        ))}
    </ul>
  );
}
