import { Resource } from "sst";
import { PrivateKey } from "o1js";

Buffer.from(Resource.RootKey.value, "base58");

const pk = PrivateKey.fromBase58(Resource.RootKey.value);

export default function Root() {
  return (
    <main>
      {/* <h1>Private Key</h1>
      <div>{pk.toBase58()}</div> */}
      <h1>Public Key</h1>
      <div>{pk.toPublicKey().toBase58()}</div>
    </main>
  );
}
