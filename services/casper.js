import { CasperClient, CLPublicKey, DeployUtil, Signer } from "casper-js-sdk";

import { NATIVE_TRANSFER_PAYMENT_AMOUNT, RPC_API } from "../constants";

export const buildTransferDeploy = ({
  networkName,
  fromAddrHex,
  toAddrHex,
  amount,
  id,
  ttl = 1800000,
}) => {
  const fromPublicKey = CLPublicKey.fromHex(fromAddrHex);
  const toPublicKey = CLPublicKey.fromHex(toAddrHex);

  const deployParams = new DeployUtil.DeployParams(
    fromPublicKey,
    networkName,
    ttl
  );

  const session = DeployUtil.ExecutableDeployItem.newTransfer(
    amount,
    toPublicKey,
    null, // optional: sourcePurse
    id
  );

  const payment = DeployUtil.standardPayment(NATIVE_TRANSFER_PAYMENT_AMOUNT);

  const deploy = DeployUtil.makeDeploy(deployParams, session, payment);

  return DeployUtil.deployToJson(deploy);
};

export const getActivePublicKey = async () => await Signer.getActivePublicKey();

export const sendTransferDeploy = (deployJson) => {
  const deploy = DeployUtil.deployFromJson(deployJson);
  const client = new CasperClient(RPC_API);
  return client.putDeploy(deploy);
};
