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
  paths.forEach((path) => {
    // Split the path into segments
    const parts = path.split("/");

    // Reconstruct the path piece by piece
    let currentPath = "";
    parts.forEach((part, index) => {
      // Update current path
      currentPath = index === 0 ? part : `${currentPath}/${part}`;

      // Check if node exists
      if (!nodeMap.has(currentPath)) {
        // Determine if it's a file or directory
        const isFile = index === parts.length - 1 && part.includes(".");

        // Create new node
        nodeMap.set(currentPath, {
          path: currentPath,
          type: isFile ? "file" : "dir",
          name: part,
          children: [],
        });
      }
    });
  });

  // Link parent-child relationships
  nodeMap.forEach((node) => {
    if (node.type === "dir") {
      // Only include direct children (one level down)
      node.children = Array.from(nodeMap.values()).filter((child) => {
        const childParts = child.path.split("/");
        const nodeParts = node.path.split("/");
        return (
          childParts.length === nodeParts.length + 1 &&
          child.path.startsWith(node.path + "/")
        );
      });
    }
  });

  // Find and return root nodes
  return Array.from(nodeMap.values()).filter(
    (node) =>
      !Array.from(nodeMap.values()).some(
        (other) =>
          other.type === "dir" && node.path.startsWith(other.path + "/")
      )
  );
}

export async function getContentRaw(filter: string = ""): Promise<string[]> {
  const { readdir } = await import("node:fs/promises");
  const basePath = process.cwd();
  const contentPath = `${basePath}/public/content`;
  const files = await readdir(contentPath, {
    recursive: true,
  });

  return files.filter((file) => {
    const filePath = `${contentPath}/${file}`;
    return filePath.includes(filter);
  });
}

export async function getContentStructure(
  filter: string = ""
): Promise<FileNode[]> {
  const files = await getContentRaw(filter);
  return buildFileTree(files);
}
