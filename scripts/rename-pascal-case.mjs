import fs from 'fs';
import path from 'path';

const ROOT_DIR = path.resolve(process.argv[2] || process.cwd());
const SKIP_FILES = new Set(['index.js', 'index.ts', 'index.tsx', 'index.jsx']);

function toPascalCase(str) {
  return str
    .split(/[-_.\s]+/)
    .filter(Boolean)
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join('');
}

function walkAndRename(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      // recurse into subfolder
      walkAndRename(fullPath);
      continue;
    }

    if (!entry.isFile()) continue;
    if (SKIP_FILES.has(entry.name)) continue;

    const ext = path.extname(entry.name);
    const baseName = path.basename(entry.name, ext);
    const pascalName = toPascalCase(baseName) + ext;

    if (entry.name === pascalName) continue;

    const newPath = path.join(dir, pascalName);

    fs.renameSync(fullPath, newPath);
    console.log(`✔ ${fullPath} → ${newPath}`);
  }
}

walkAndRename(ROOT_DIR);
