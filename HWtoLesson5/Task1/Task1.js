import { readFile, writeFile } from "fs/promises";

async function copyFile() {
  try {
    const data = await readFile("source.txt", "utf-8");
    console.log("Вміст файлу source.txt", data);

    await writeFile("copy.txt", data);
    console.log("Файл успішно скопійовано в copy.txt");
  } catch (error) {
    console.error("Сталася помилка:", error);
  }
}

copyFile()