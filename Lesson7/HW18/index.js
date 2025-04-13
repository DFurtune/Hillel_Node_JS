const originalText = "The quick brown fox jumps over the lazy dog";

function processTextToBinary(text) {
  try {
    const buffer = Buffer.from(text, "utf-8");
    console.log("Оригінальний текст:", text);
    console.log("Buffer (бінарні дані):", buffer);
    console.log("Байти у HEX:", buffer.toString("hex"));
    console.log("Байти як масив:", Array.from(buffer));

    const manipulatedBuffer = Buffer.from(buffer.reverse());
    console.log("\nПісля інверсії байтів:");
    console.log("Маніпульований Buffer:", manipulatedBuffer);
    console.log("Байти у HEX:", manipulatedBuffer.toString("hex"));
    console.log("Байти як масив:", Array.from(manipulatedBuffer));

    const reversedText = manipulatedBuffer.toString("utf-8");
    console.log("\nРеверсований текст:", reversedText);

    const restoredBuffer = Buffer.from(manipulatedBuffer.reverse());
    const restoredText = restoredBuffer.toString("utf-8");
    console.log("\nВідновлений текст:", restoredText);
  } catch (error) {
    console.error("Error processing text to binary:", error);
  }
}

processTextToBinary(originalText);
