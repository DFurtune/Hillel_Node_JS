import fs from "fs";

const data = Buffer.from("[0x48, 0x65, 0x6C, 0x6C, 0x6F, 0x00, 0xFF]");

fs.writeFileSync("test.bin", data);

function readBinaryFile(filePath) {
  try {
    const buffer = fs.readFileSync(filePath);

    console.log("Буфер:", buffer);
    console.log("Байти (HEX):", buffer.toString("hex"));
    console.log("Байти (масив):", Array.from(buffer));
    console.log("Як ASCII (якщо можливо):", buffer.toString("ascii"));
  } catch (error) {
    console.error("Error reading file:", error);
  }
}

readBinaryFile("test.bin");
