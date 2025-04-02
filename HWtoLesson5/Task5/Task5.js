import { createHash } from "crypto";

const savedHash =
  "5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8";

function verifyPassword(inputPassword) {
  const hash = createHash("sha256").update(inputPassword).digest("hex");
console.log(hash);

  if (hash === savedHash) {
    console.log("Пароль правильний!");
  } else {
    console.log("Пароль неправильний!");
  }
}

const userInput = "password";

verifyPassword(userInput);
