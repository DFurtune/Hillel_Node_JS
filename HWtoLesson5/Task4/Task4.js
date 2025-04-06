import { readdir, stat } from "fs/promises";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

async function findLargestFile() {
  try {
    const files = await readdir(__dirname);

    let largestFile = null;
    let largestSize = 0;

    for (const file of files) {
      const filePath = join(__dirname, file);
      const fileStats = await stat(filePath);
      if (fileStats.isFile() && fileStats.size > largestSize) {
        largestFile = file;
        largestSize = fileStats.size;
      }
    }

    if (largestFile) {
      console.log(`Найбільший файл: ${largestFile}`);
      console.log(`Розмір: ${largestSize} байт`);
    } else {
      console.log("У директорії немає файлів.");
    }
  } catch (error) {
    console.error("Сталася помилка:", error);
  }
}

findLargestFile();
