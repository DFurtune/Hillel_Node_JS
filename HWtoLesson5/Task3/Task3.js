import { readFile, writeFile } from "fs/promises";

async function replaceText() {
  try {
    const data = await readFile("source.txt", "utf-8");
    console.log("Вміст файлу source.txt:", data);

    const update = data.replace(/Node/g, "NODE.JS");

    await writeFile("update.txt", update);
    console.log("Файл успішно оновлено і збережено в updated.txt");

    await readFile("source.txt", "utf-8");
    console.log("Вміст оновленого файлу source.txt:", update);
  } catch (error) {
    console.error("Сталася помилка:", error);
  }
}

replaceText()
