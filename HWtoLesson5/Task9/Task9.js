import { createReadStream } from "fs";

const stream = createReadStream("log.txt", {
  encoding: "utf-8",
  highWaterMark: 256,
});

stream.on("data", (chunk) => {
  console.log("Новий chunk:");
  console.log(chunk);
});

stream.on("end", () => {
  console.log("Читання файлу завершено.");
});

stream.on("error", (err) => {
  console.error("Сталася помилка під час читання файлу:", err);
});
