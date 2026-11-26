import { mkdirSync, renameSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const entryText =
  "My agent writes one sentence, then files a transcript, a wallet signature and two subagent reports to prove it meant it.";

function assertValidEntry(text) {
  const characterCount = [...text].length;
  const hasLineBreak = /[\r\n]/.test(text);
  const isBlank = text.trim() === "";

  if (characterCount < 1 || characterCount > 200 || hasLineBreak || isBlank) {
    throw new Error(`entry fails the gate: ${characterCount} chars`);
  }
}

function writeEntryAtomically(text) {
  const outputDir = process.env.MAKEFUN_OUTPUT_DIR || "/output";
  mkdirSync(outputDir, { recursive: true });

  const temporaryPath = join(outputDir, ".entry.txt.tmp");
  const entryPath = join(outputDir, "entry.txt");

  writeFileSync(temporaryPath, text, "utf8");
  renameSync(temporaryPath, entryPath);
}

assertValidEntry(entryText);
writeEntryAtomically(entryText);
