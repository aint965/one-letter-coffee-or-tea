// One Letter: Coffee or Tea
// Entry: "A" — coffee.
//
// The program writes exactly one byte, the letter "A", to /output/entry.txt
// and nothing else: no word, no explanation, no punctuation, no newline.
// It is fully deterministic: same input, same output, every run.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";

const OUTPUT_PATH = "/output/entry.txt";

// "A" for coffee. See README.md for the reasoning behind the choice.
const LETTER = "A";

// Encode first and refuse to proceed unless it is exactly one byte: the
// gate requires UTF-8 text of exactly 1 character, so a longer or
// multi-byte letter must fail loudly here instead of writing a bad file.
const LETTER_BYTES = Buffer.from(LETTER, "utf8");
if (LETTER_BYTES.length !== 1) {
  throw new Error(`expected a one-byte letter, got ${LETTER_BYTES.length} bytes`);
}

// Create the output directory if it is missing. Never delete it.
mkdirSync(dirname(OUTPUT_PATH), { recursive: true });

// Write exactly one byte: the single ASCII letter "A" (0x41), no newline.
writeFileSync(OUTPUT_PATH, LETTER_BYTES);

// Self-check: read the file back and confirm it holds exactly that byte.
const written = readFileSync(OUTPUT_PATH);
if (!written.equals(LETTER_BYTES)) {
  throw new Error("verification failed: /output/entry.txt is not exactly one byte 'A'");
}
