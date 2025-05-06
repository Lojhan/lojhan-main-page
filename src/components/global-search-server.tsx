"use server";

import { getAllCommands } from "@/lib/global-search";
import { GlobalSearch } from "./global-search";

export async function GlobalSearchServer({ language }: { language: string }) {
  const commands = await getAllCommands("", language);
  return <GlobalSearch commands={commands} />;
}
