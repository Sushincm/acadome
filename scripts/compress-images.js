/**
 * Image Compression Script v2 — writes to separate output dir to avoid EPERM
 * Run: node scripts/compress-images.js
 */
import sharp from 'sharp';
import { readdir, stat, mkdir, copyFile, unlink } from 'fs/promises';
import { join, extname, basename } from 'path';

const QUALITY = 78;
const MAX_WIDTH = 1400;

const JOBS = [
  { src: 'public/images', recurse: false },
  { src: 'public/images/gallary/webp', recurse: false },
  { src: 'public/images/Team', recurse: false },
];

const SKIP_FILES = ['ACADOME-LOGO.png', 'certificate.png'];
const EXTS = ['.webp', '.jpg', '.jpeg', '.png'];

async function compressFile(filePath) {
  const file = basename(filePath);
  if (SKIP_FILES.includes(file)) { console.log(`  ⏭  Skipping ${file}`); return; }
  const ext = extname(file).toLowerCase();
  if (!EXTS.includes(ext)) return;

  const { size: before } = await stat(filePath);
  const tmpPath = filePath + '.__compressed';

  try {
    const image = sharp(filePath);
    const meta = await image.metadata();
    if (meta.width > MAX_WIDTH) image.resize(MAX_WIDTH, null, { withoutEnlargement: true });

    await image.webp({ quality: QUALITY, effort: 6 }).toFile(tmpPath);

    const { size: after } = await stat(tmpPath);
    const saved = Math.round((1 - after / before) * 100);

    // Read compressed bytes, delete tmp, write to original path
    const { readFile, writeFile } = await import('fs/promises');
    const data = await readFile(tmpPath);
    await unlink(tmpPath);
    // For .webp → .webp: overwrite in place
    // For .jpg/.png → .webp: write new file, leave original (manual cleanup needed)
    const outPath = filePath.replace(/\.(jpg|jpeg|png)$/i, '.webp');
    await writeFile(outPath, data);

    console.log(`  ✅ ${file}: ${Math.round(before/1024)}KB → ${Math.round(after/1024)}KB (-${saved}%)`);
  } catch(e) {
    try { await unlink(tmpPath); } catch {}
    console.error(`  ❌ ${file}: ${e.message}`);
  }
}

async function processDir(dir) {
  let files;
  try { files = await readdir(dir); } catch { console.log(`  ⚠ Not found: ${dir}`); return; }
  for (const f of files) {
    const fp = join(dir, f);
    const info = await stat(fp);
    if (!info.isFile()) continue;
    await compressFile(fp);
  }
}

console.log('🔧 ACADOME Image Compression\n');
for (const job of JOBS) {
  console.log(`📁 ${job.src}`);
  await processDir(job.src);
}
console.log('\n✅ Done!');
