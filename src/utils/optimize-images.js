import sharp from "sharp";
import fs from "fs-extra";
import path from "path";

const uploadsFolder = path.join(process.cwd(), "public/images/uploads");
const MAX_FILE_SIZE = 200 * 1024;
const QUALITY_STEP = 10;
const MIN_QUALITY = 10;

async function processFiles() {
  try {
    console.log("Starting image optimization...");

    if (!fs.existsSync(uploadsFolder)) {
      console.error(`Folder does not exist: ${uploadsFolder}`);
      return;
    }

    const files = await fs.readdir(uploadsFolder);

    await Promise.all(
      files.map(async (file) => {
        const filePath = path.join(uploadsFolder, file);
        const ext = path.extname(filePath).toLowerCase();
        const fileName = path.basename(filePath, ext);
        const jpgPath = path.join(uploadsFolder, `${fileName}.jpg`);
        const webpPath = path.join(uploadsFolder, `${fileName}.webp`);
        const avifPath = path.join(uploadsFolder, `${fileName}.avif`);

        if ([".webp", ".avif"].includes(ext)) {
          console.log(`File ${filePath} is already optimized. Skipping...`);
          return;
        }

        try {
          if (ext === ".png") {
            await convertPngToJpg(filePath, jpgPath);
            await fs.remove(filePath);
            console.log(`Converted PNG to JPG and deleted original: ${filePath}`);
          }

          const compress = ext === ".jpg" || (ext === ".png" && (await fs.pathExists(jpgPath)));
          if (compress) {
            const isBelowMaxSize = await isFileBelowSize(jpgPath, MAX_FILE_SIZE);
            if (!isBelowMaxSize) {
              await compressAndOverwrite(jpgPath);
            } else {
              console.log(`File ${jpgPath} is already below 200 KB. Skipping compression.`);
            }
          }

          if (!(await fs.pathExists(webpPath) || await isFileBelowSize(webpPath, MAX_FILE_SIZE))) await createWebP(jpgPath, webpPath);
          if (!(await fs.pathExists(avifPath) || await isFileBelowSize(webpPath, MAX_FILE_SIZE))) await createAVIF(jpgPath, avifPath);
        } catch (error) {
          console.error(`Error processing ${filePath}:`, error);
        }
      })
    );

    console.log("Image optimization completed!");
  } catch (error) {
    console.error("Error during processing:", error);
  }
}

async function convertPngToJpg(inputPath, outputPath, quality = 80) {
  await sharp(inputPath)
    .jpeg({ quality })
    .toFile(outputPath);
  console.log(`Converted ${inputPath} to ${outputPath}`);
}

async function compressAndOverwrite(filePath, quality = 80) {
  const tempCompressedPath = `${filePath}-temp`;

  await sharp(filePath)
    .resize({ width: 1000, height: 1000, fit: "inside" })
    .jpeg({ quality })
    .toFile(tempCompressedPath);

  const fileSize = (await fs.stat(tempCompressedPath)).size;

  if (fileSize > MAX_FILE_SIZE && quality > MIN_QUALITY) {
    console.log(`${tempCompressedPath} file size is ${fileSize} bytes, re-compressing...`);
    return await compressAndOverwrite(filePath, quality - QUALITY_STEP);
  }

  await fs.move(tempCompressedPath, filePath, { overwrite: true });
  console.log(`File compressed to: ${filePath} (${fileSize} bytes).`);
}

async function createWebP(filePath, webpPath, quality = 80) {
  await sharp(filePath)
    .resize({ width: 1000, height: 1000, fit: "inside" })
    .webp({ quality })
    .toFile(webpPath);
  console.log(`WebP created: ${webpPath}`);
}

async function createAVIF(filePath, avifPath, quality = 80) {
  await sharp(filePath)
    .resize({ width: 1000, height: 1000, fit: "inside" })
    .avif({ quality })
    .toFile(avifPath);
  console.log(`AVIF created: ${avifPath}`);
}

async function isFileBelowSize(filePath, maxSize) {
  try {
    const stats = await fs.stat(filePath);
    return stats.size < maxSize;
  } catch (error) {
    console.error(`Error checking file size for ${filePath}:`, error);
    return false;
  }
}

processFiles();
