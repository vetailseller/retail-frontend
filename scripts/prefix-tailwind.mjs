import fs from "fs";
import path from "path";

const PREFIX = "rt-";

// Detect className="...", class='...', tw`...`
const CLASS_REGEX = /(?:class(Name)?=|tw`)(["'`])([^"'`]+)\2/g;

// Detect clsx(...) or cn(...)
const FUNC_REGEX = /(clsx|cn)\(([\s\S]*?)\)/g;

// Detect quoted strings inside clsx/cn
const STRING_IN_JSX = /(["'`])([^"'`]+)\1/g;

// Detect utilities including negative and arbitrary values
const UTIL_REGEX = /(^|\s)(-?)([a-zA-Z0-9]+(?:-[a-zA-Z0-9]+)*)(\[[^\]]+\])?/g;

const TARGET_DIRS = ["pages", "components"];
const EXT = [".jsx", ".tsx"];

// Add prefix to a single utility
function prefixUtil(neg, util, arbitrary) {
  if (util.startsWith(PREFIX)) return `${neg}${util}${arbitrary || ""}`;
  return `${neg}${PREFIX}${util}${arbitrary || ""}`;
}

// Add prefix to variant utilities (hover:bg, md:flex, dark:text)
function prefixVariants(text) {
  return text.replace(
    /([a-zA-Z0-9-]+\[[^\]]+\]|[a-zA-Z0-9-]+):(-?)([a-zA-Z0-9-]+(?:\[[^\]]+\])?)/g,
    (m, variant, neg, util) => {
      if (util.startsWith(PREFIX)) return m;

      return `${variant}:${neg}${PREFIX}${util}`;
    },
  );
}

// Process a block of Tailwind classes: "flex bg-red-500 -mt-4 md:flex"
function processClassBlock(content) {
  let updated = content.replace(
    UTIL_REGEX,
    (full, space, neg, util, arbitrary) =>
      space + prefixUtil(neg, util, arbitrary),
  );

  return prefixVariants(updated);
}

// Main rewriting function
function processFile(filePath) {
  let code = fs.readFileSync(filePath, "utf8");

  // className="..."
  code = code.replace(CLASS_REGEX, (match, isName, quote, classes) => {
    let updated = processClassBlock(classes);
    return match.replace(classes, updated);
  });

  // clsx("...") or cn("...")
  code = code.replace(FUNC_REGEX, (match, funcName, inside) => {
    let replaced = inside.replace(STRING_IN_JSX, (m, q, str) => {
      const updated = processClassBlock(str);
      return `${q}${updated}${q}`;
    });

    return `${funcName}(${replaced})`;
  });

  fs.writeFileSync(filePath, code, "utf8");
}

// Walk project directories
function walk(dir) {
  if (!fs.existsSync(dir)) return;

  for (const item of fs.readdirSync(dir)) {
    const full = path.join(dir, item);
    const stat = fs.statSync(full);

    if (stat.isDirectory()) walk(full);
    else if (EXT.some((e) => full.endsWith(e))) {
      console.log("Prefixing:", full);
      processFile(full);
    }
  }
}

console.log(
  "🚀 Prefixing Tailwind classes in className, clsx(), cn(), tw`...`",
);
TARGET_DIRS.forEach(walk);
console.log("✨ Complete! All classes prefixed with lc-");
