import { Worker } from "worker_threads";

function calculateFactorialWorker(params) {
  return new Promise((resolve, reject) => {
    const worker = new Worker("./worker.js", { workerData: params });
    worker.on("message", resolve);
    worker.on("error", reject);
    worker.on("exit", (code) => {
      if (code !== 0) {
        reject(new Error(`Worker stopped with exit code ${code}`));
      }
    });
  });
}

async function main() {
  const number = [10, 20, 30, 40];
  const promises = number.map((num) =>
    calculateFactorialWorker({ number: num })
  );
  try {
    const result = await Promise.all(promises);
    console.log(`Factorial of ${number} is ${result}`);
  } catch (error) {
    console.error("Error:", error);
  }
}

main();
