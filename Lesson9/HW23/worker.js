import { parentPort, workerData } from "worker_threads";

function factorial(num) {
  if (num === 0 || num === 1) {
    return 1;
  }
  return num * factorial(num - 1);
}

const result = factorial(workerData.number);
parentPort.postMessage(result);
