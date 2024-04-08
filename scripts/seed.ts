import fs from "node:fs/promises";
import path from "node:path";
import { exec as execCb } from "node:child_process";
import { promisify } from "node:util";

import { PrivateKey } from "o1js";

const exec = promisify(execCb);
const snarkDir = ".snark";
const privateKeyPath = path.join(snarkDir, "private_key");

if (!(await exists(snarkDir))) {
  console.log(".snark directory does not exist, creating...");
  await fs.mkdir(snarkDir);
  console.log(".snark directory created.");
}

const privateKey = await initKey();

await setSecret(privateKey);

async function initKey() {
  let privateKey: PrivateKey;
  if (!(await exists(privateKeyPath))) {
    privateKey = PrivateKey.random();
    await fs.writeFile(privateKeyPath, privateKey.toBase58());
  } else {
    const privateKeyData = await fs.readFile(privateKeyPath, {
      encoding: "utf8",
    });
    privateKey = PrivateKey.fromBase58(privateKeyData);
  }
  return privateKey;
}

async function setSecret(privateKey: PrivateKey) {
  try {
    const { stdout, stderr } = await exec(
      `sst secret set RootKey ${privateKey.toBase58()}`,
    );
    console.log(stdout);
    if (stderr) console.error(stderr);
  } catch (error) {
    console.error(`exec error: ${error}`);
  }
}

async function exists(dir: string) {
  try {
    await fs.access(dir);
    return true;
  } catch {
    return false;
  }
}
