export function humanizeDirentName(name: string): string {
    return (
      name
        .replace(/_/g, " ")
        .replace(/-/g, " ")
        // remove the file extension
        .replace(/\.[^/.]+$/, "")
        .replace(/\.[^/.]+$/, "")
        // uppercase the first letter of the first word
        .replace(/^\w/, (c) => c.toUpperCase())
    );
  }
  