import path from "node:path";

export type FileNode = {
  path: string;
  type: "file" | "dir";
  name: string;
  children?: FileNode[];
};

function buildFileTree(paths: string[]): FileNode[] {
  // Create a map to store our nodes for quick lookup
  const nodeMap = new Map<string, FileNode>();

  // Process each path
  for (const path of paths) {
    // Split the path into segments
    const parts = path.split("/");

    // Reconstruct the path piece by piece
    let currentPath = "";
    parts.forEach((part, index) => {
      // Update current path
      currentPath = index === 0 ? part : `${currentPath}/${part}`;

      // Check if node exists
      if (!nodeMap.has(currentPath)) {
        const isFile = index === parts.length - 1 && /\.(md|txt)$/.test(part);

        // Create new node
        nodeMap.set(currentPath, {
          path: currentPath,
          type: isFile ? "file" : "dir",
          name: part,
          children: [],
        });
      }
    });
  }

  // Link parent-child relationships
  for (const [, node] of nodeMap) {
    if (node.type === "dir") {
      // Only include direct children (one level down)
      node.children = Array.from(nodeMap.values()).filter((child) => {
        const childParts = child.path.split("/");
        const nodeParts = node.path.split("/");
        return (
          childParts.length === nodeParts.length + 1 &&
          child.path.startsWith(`${node.path}/`)
        );
      });
    }
  }

  // Find and return root nodes
  return Array.from(nodeMap.values()).filter(
    (node) =>
      !Array.from(nodeMap.values()).some(
        (other) =>
          other.type === "dir" && node.path.startsWith(`${other.path}/`),
      ),
  );
}

export async function getContentRaw(
  filter: string,
  language: string,
): Promise<string[]> {
  const { readdir } = await import("node:fs/promises");

  const contentPath = path.join(process.cwd(), "public", "content", language);

  const files = await readdir(contentPath, {
    recursive: true,
  });

  return files.filter((file) => {
    const filePath = `${contentPath}/${file}`;
    return filePath.includes(filter);
  });
}

export async function getContentStructure(
  filter: string,
  language: string,
): Promise<FileNode[]> {
  const files = await getContentRaw(filter, language);

  return buildFileTree(files);
}
