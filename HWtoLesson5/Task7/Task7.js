import { createHash } from "crypto";

function generateHash(inputPassword) {
  try {
    const hash = createHash("sha256").update(inputPassword).digest("hex");
    console.log("Згенерований хеш:", hash);
  } catch (error) {
    console.error("Сталася помилка під час генерації хешу:", error);
  }
}

generateHash('123')