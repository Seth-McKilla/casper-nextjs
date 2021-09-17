import fs from "fs";
import path from "path";
const { Keys } = require("casper-js-sdk");

export default function handler(req, res) {
  const createAccountKeys = () => {
    const edKeyPair = Keys.Ed25519.new();
    const { publicKey, privateKey } = edKeyPair;
    const accountAddress = publicKey.toHex();
    const accountHash = publicKey.toAccountHash();

    const publicKeyInPem = edKeyPair.exportPublicKeyInPem();
    const privateKeyInPem = edKeyPair.exportPrivateKeyInPem();

    const folder = path.join("./", "casper_keys");

    if (!fs.existsSync(folder)) {
      const tempDir = fs.mkdirSync(folder);
    }

    fs.writeFileSync(`${folder}/${accountAddress}_public.pem`, publicKeyInPem);
    fs.writeFileSync(
      `${folder}/${accountAddress}_private.pem`,
      privateKeyInPem
    );

    return accountAddress;
  };

  const newAccountAddress = createAccountKeys();

  res.status(200).json({ newAccountAddress });
}
