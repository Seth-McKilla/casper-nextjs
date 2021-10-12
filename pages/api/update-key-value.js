import path from "path";
import _ from "lodash";
import {
  RuntimeArgs,
  CLValueBuilder,
  DeployUtil,
  CasperClient,
  CasperServiceByJsonRPC,
  Keys,
} from "casper-js-sdk";
import {
  RPC_API,
  STATUS_API,
  NATIVE_TRANSFER_PAYMENT_AMOUNT,
} from "../../constants";

export default async function handler(req, res) {
  const update = req.body;
  const updateType = Object.keys(update)[0];

  const getStatus = async () => {
    try {
      const response = await fetch(STATUS_API);
      const status = response.json();
      return status;
    } catch (err) {
      console.log(err);
      return null;
    }
  };

  const updateKeyValues = async (update) => {
    const casperClient = new CasperClient(RPC_API);
    const casperService = new CasperServiceByJsonRPC(RPC_API);

    const publicKey = path.join("./", "casper_keys", "public_key.pem");
    const privateKey = path.join("./", "casper_keys", "secret_key.pem");

    const keyPairOfContract = Keys.Ed25519.parseKeyFiles(publicKey, privateKey);

    const accountHash = Buffer.from(keyPairOfContract.accountHash()).toString(
      "hex"
    );

    const stateRootHash = await casperService.getStateRootHash();

    const accountInfo = await casperService.getBlockState(
      stateRootHash,
      `account-hash-${accountHash}`,
      []
    );

    const { key } = _.find(accountInfo.Account.namedKeys, (i) => {
      return i.name === "kvstorage_contract";
    });

    const contractHashAsByteArray = [...Buffer.from(key.slice(5), "hex")];

    // @ Deploy params;
    const { chainspec_name: networkName } = await getStatus();
    const gasPrice = 1; // Native transfer
    const ttl = 1800000;

    const deployParams = new DeployUtil.DeployParams(
      keyPairOfContract.publicKey,
      networkName,
      gasPrice,
      ttl
    );

    const payment = DeployUtil.standardPayment(NATIVE_TRANSFER_PAYMENT_AMOUNT);

    let session;

    // @ Boolean type
    if (updateType === "boolean") {
      session = DeployUtil.ExecutableDeployItem.newStoredContractByHash(
        contractHashAsByteArray,
        "store-bool",
        RuntimeArgs.fromMap({
          name: CLValueBuilder.bool(update.boolean),
        })
      );
    }
    // @ Number type
    if (updateType === "number") {
      session = DeployUtil.ExecutableDeployItem.newStoredContractByHash(
        contractHashAsByteArray,
        "store-i64",
        RuntimeArgs.fromMap({
          name: CLValueBuilder.i64(update.number),
        })
      );
    }
    // @ String type
    if (updateType === "string")
      session = DeployUtil.ExecutableDeployItem.newStoredContractByHash(
        contractHashAsByteArray,
        "store-string",
        RuntimeArgs.fromMap({
          name: CLValueBuilder.string(update.string),
        })
      );

    // @ Setup deploy
    let deploy = DeployUtil.makeDeploy(deployParams, session, payment);
    // @ Sign deploy
    deploy = casperClient.signDeploy(deploy, keyPairOfContract);

    return DeployUtil.deployToJson(deploy);
  };

  const deploy = await updateKeyValues(update);

  res.status(201).json({ deploy });
}
