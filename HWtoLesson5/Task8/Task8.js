import { EventEmitter } from "events";

class Chat extends EventEmitter {
  send(message) {
    this.emit("message", message);
  }
}

const chat = new Chat();

chat.on("message", (message) => {
  console.log(`Нове повідомлення: ${message}`);
});

chat.send("Привіт, як справи?");
chat.send("Це друге повідомлення.");
