import crypto from "crypto";

const { publicKey, privateKey } = crypto.generateKeyPairSync("rsa", {
  modulusLength: 2048,
  publicKeyEncoding: { type: "spki", format: "pem" },
  privateKeyEncoding: { type: "pkcs8", format: "pem" },
});

if (publicKey && privateKey) {
  console.log("Публічний ключ:\n", publicKey);
  console.log("Приватний ключ:\n", privateKey);
} else {
  console.error("Не вдалося згенерувати ключі.");
}