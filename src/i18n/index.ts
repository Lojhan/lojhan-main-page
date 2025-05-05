import "server-only";
import type { LangMap } from "./lang-map";

export async function getDictionary<tkey extends keyof LangMap>(
  locale: string,
  path: tkey
) {
  return import(`./${locale}.json`).then(
    (module) => module.default[path] as LangMap[tkey]
  );
}
