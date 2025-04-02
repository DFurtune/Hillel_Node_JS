import { Transform } from "stream";
import { createReadStream, createWriteStream } from "fs";

class ReplacePasswordTransform extends Transform {
  constructor() {
    super();
  }
  _transform(chunk, encoding, callback) {
    const transformedChunk = chunk.toString().replace(/password/g, "********");

    this.push(transformedChunk);

    callback();
  }
}

const replacePasswordStream = new ReplacePasswordTransform();

const inputStream = createReadStream("log.txt", { encoding: "utf-8" });

const outputStream = createWriteStream("output.txt");

inputStream.pipe(replacePasswordStream).pipe(outputStream);

outputStream.on("finish", () => {
  console.log("Трансформація завершена. Дані записані в output.txt");
});
