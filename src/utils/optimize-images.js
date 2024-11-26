import sharp from "sharp";
import fs from "fs-extra";
import path from "path";

const uploadsFolder = path.join(process.cwd(), "public/images/uploads");

async function processFiles() {
  try {
    console.log("Starting image optimization...");

    if (!fs.existsSync(uploadsFolder)) {
      console.error(`Folder does not exist: ${uploadsFolder}`);
      return;
    }

    const files = await fs.readdir(uploadsFolder);

    for (const file of files) {
      const filePath = path.join(uploadsFolder, file);
      const ext = path.extname(filePath).toLowerCase();
      const fileName = path.basename(filePath, ext);
      const webpPath = path.join(uploadsFolder, `${fileName}.webp`);
      const avifPath = path.join(uploadsFolder, `${fileName}.avif`);

      let compress = true;
      let webp = true;
      let avif = true;

      console.log(`Processing file: ${filePath}`);

      if ([".webp", ".avif"].includes(ext)) {
        console.log(`File ${filePath} is already optimized. Skipping...`);
        continue;
      }

      const stats = await fs.stat(filePath);
      if (stats.size < 200 * 1024) {
        compress = false;
        console.log(`File ${filePath} is smaller than 200 KB. Skipping compression.`);
      }

      const webpExists = await fs.pathExists(webpPath);
      if (webpExists) {
        webp = false;
        console.log(`File ${filePath} already has WebP version. Skipping WebP compression.`);
      }

      const avifExists = await fs.pathExists(avifPath);
      if (avifExists) {
        avif = false;
        console.log(`File ${filePath} already has AVIF version. Skipping AVIF compression.`);
      }

      try {
        if (compress) {
          await compressAndOverwrite(filePath, ext);
        }
        if (webp) {
          await createWebP(filePath, webpPath);
        }
        if (avif) {
          await createAVIF(filePath, avifPath);
        }
      } catch (error) {
        console.error(`Error processing ${filePath}:`, error);
      }
    }
    console.log("Image optimization completed!");
  } catch (error) {
    console.error("Error during processing:", error);
  }
}

async function compressAndOverwrite(filePath, ext) {
  const tempCompressedPath = `${filePath}-temp${ext}`;
  console.log(`Compressing and overwriting: ${filePath}`);

  await sharp(filePath)
    .resize({ height: 1000 })
    .toFormat(ext === ".png" ? "png" : "jpeg", { quality: 80, compressionLevel: 8 })
    .toFile(tempCompressedPath);

  await fs.move(tempCompressedPath, filePath, { overwrite: true });
  console.log(`Original file ${filePath} replaced with compressed version.`);
}

async function createWebP(filePath, webpPath) {
  console.log(`Creating WebP version: ${webpPath}`);
  await sharp(filePath)
    .resize({ height: 1000 })
    .webp({ quality: 80 })
    .toFile(webpPath);
  console.log(`WebP created: ${webpPath}`);
}

async function createAVIF(filePath, avifPath) {
  console.log(`Creating AVIF version: ${avifPath}`);
  await sharp(filePath)
    .resize({ height: 1000 })
    .avif({ quality: 80 })
    .toFile(avifPath);
  console.log(`AVIF created: ${avifPath}`);
}

processFiles();
