import type { Plugin } from "vite";
import fg from "fast-glob";
import { dirname } from "path";
import MagicString from "magic-string";
interface GlobOptions {}
const importGLobRegx = /\bimport\.meta\.globNext\((.*)\)/g;
export default function (options: GlobOptions = {}): Plugin {
  return {
    name: "vite-plugin-glob",
    async transform(code, id) {
      const matchs = [...code.matchAll(importGLobRegx)];
      if (!matchs) return;
      const s = new MagicString(code);
      for (const match of matchs) {
        const glob = match[1].slice(1, -1);
        const files = await fg(glob, { dot: true, cwd: dirname(id) });

        const start = match.index!;
        const end = match[0].length + start;
        const replaement = `{${files
          .map((i) => `'${i}': () => import('${i}')`)
          .join(",")}}`;
        // code = code.slice(0, start) + replaement + code.slice(end);
        s.overwrite(start, end, replaement);
      }

      // return {
      //   code: s.toString(),
      //   map: s.generateMap(),
      // };
      return { code: s.toString() };
    },
  };
}
