const sharp = require("sharp");
const fs = require("fs-extra");
const path = require("path");
const chokidar = require("chokidar");

// Paths
const uploadsFolder = path.join(process.cwd(), "public/images/uploads");

// Watcher to monitor new files in the uploads folder
chokidar.watch(uploadsFolder, { ignoreInitial: true }).on("add", async (filePath) => {
  try {
    console.log(`New file detected: ${filePath}`);

    // Get file details
    const ext = path.extname(filePath);
    const fileName = path.basename(filePath, ext);

    // Skip if it's already optimized
    if ([".webp", ".avif"].includes(ext)) {
      console.log("File is already optimized. Skipping...");
      return;
    }

    // Check file size
    const stats = await fs.stat(filePath);
    if (stats.size < 100 * 1024) { // 100 KB in bytes
      console.log("File size is smaller than 100 KB. Skipping optimization...");
      return;
    }

    // Create paths for optimized images
    const compressedPath = path.join(uploadsFolder, `${fileName}${ext}`); // Overwrite original
    const webpPath = path.join(uploadsFolder, `${fileName}.webp`);
    const avifPath = path.join(uploadsFolder, `${fileName}.avif`);

    // Compress original image
    await sharp(filePath)
      .resize({ width: 1200 }) // Resize to a maximum width of 1200px
      .jpeg({ quality: 80 }) // Adjust quality (80 is a good balance)
      .toFile(compressedPath);

    // Create WebP version
    await sharp(filePath)
      .resize({ width: 1200 }) // Same resizing
      .webp({ quality: 80 }) // WebP settings
      .toFile(webpPath);

    // Create AVIF version
    await sharp(filePath)
      .resize({ width: 1200 })
      .avif({ quality: 80 })
      .toFile(avifPath);

    // Overwrite original file
    await fs.copyFile(compressedPath, filePath);

    console.log(`Optimized and created: ${compressedPath}, ${webpPath}, ${avifPath}`);
  } catch (error) {
    console.error(`Error processing ${filePath}:`, error);
  }
});
