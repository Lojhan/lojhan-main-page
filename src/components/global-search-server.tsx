"use server";

import { getAllCommands } from "@/lib/global-search";
import { GlobalSearch } from "./global-search";

export async function GlobalSearchServer() {
  const commands = await getAllCommands("");
  return <GlobalSearch commands={commands} />;
}
