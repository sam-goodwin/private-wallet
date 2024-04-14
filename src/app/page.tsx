// import { Resource } from "sst";
import { PrivateKey } from "o1js";

export default async function Root() {
  const isLive = !!process.env.SST_LIVE;

  // const privateKey = PrivateKey.fromBase58(Resource.RootKey.value);
  const privateKey = PrivateKey.random();
  return (
    <main>
      <p>{isLive ? "Live" : "Not Live"}</p>
      <h1>Public Key</h1>
      <span>{privateKey.toPublicKey().toBase58()}</span>
    </main>
  );
}
