import { PrivateKey } from "o1js";

export default async function Root() {
  const privateKey = PrivateKey.random();

  return (
    <main>
      <h1>Public Key</h1>
      <span>{privateKey?.toPublicKey().toBase58()}</span>
    </main>
  );
}
