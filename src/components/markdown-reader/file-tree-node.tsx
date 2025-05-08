"use client";

import { cn } from "@/lib/utils";
import { ChevronDown, ChevronRight, Folder, File } from "lucide-react";
import Link from "next/link";
import { FileTree } from "./file-tree";
import { useState } from "react";
import { FileNode } from "@/lib/filesystem";
import { humanizeDirentName } from "@/lib/humanize";
import { usePathname } from "next/navigation";

export function FileTreeNode({
  node,
  level,
  parent,
}: {
  parent?: FileNode;
  node: FileNode;
  level: number;
}) {
  const path = usePathname()
    .split("/")
    .filter((item) => item !== "")
    .slice(2);

  const [expanded, setExpanded] = useState(
    path[level] === node.name || node.path === "/"
  );

  const isMarkdown = node.name.endsWith(".md");

  const shouldHighlight =
    isMarkdown && path[level] === node.name && path[level - 1] === parent?.name;
  return (
    <li className="relative">
      <Link
        key={node.path}
        onClick={(e) => {
          if (node.type === "dir") {
            e.preventDefault();
            setExpanded((prev) => !prev);
          }
        }}
        href={`/content/${node.path}`}
        className={cn(
          "flex items-center rounded-md p-1 text-left text-sm hover:bg-accent",
          isMarkdown && "font-medium text-primary",
          shouldHighlight && "bg-accent"
        )}
      >
        {node.type === "dir" ? (
          <>
            {expanded ? (
              <ChevronDown className="mr-1 h-4 w-4 shrink-0 text-muted-foreground" />
            ) : (
              <ChevronRight className="mr-1 h-4 w-4 shrink-0 text-muted-foreground" />
            )}
            <Folder className="mr-2 h-4 w-4 shrink-0 text-blue-500" />
          </>
        ) : (
          <File
            className={cn(
              "mr-2 h-4 w-4 shrink-0",
              isMarkdown ? "text-green-500" : "text-gray-500"
            )}
          />
        )}
        <span className="truncate">{humanizeDirentName(node.name)}</span>
      </Link>

      {node.type === "dir" && expanded && node.children && (
        <FileTree nodes={node.children} level={level + 1} parent={node} />
      )}
    </li>
  );
}
