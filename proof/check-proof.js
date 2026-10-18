// Prints the proof statement and checks that proof.txt is present.
const fs = require("fs");
const path = require("path");

const file = path.join(__dirname, "proof.txt");
const text = fs.readFileSync(file, "utf8");

if (!text.includes("Classgrid AI Assistant") || !text.includes("not Codex")) {
  console.error("Proof check FAILED");
  process.exit(1);
}

console.log("Proof check PASSED");
console.log("Assistant: Classgrid AI. Not Codex, ChatGPT, GPT-4, or any other third-party AI.");
