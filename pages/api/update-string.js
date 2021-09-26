export default async function handler(req, res) {
  const { fromAddrHex, string } = req.body;

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

  const updateString = async () => {
    // @ Deploy params
    const fromPublicKey = CLPublicKey.fromHex(fromAddrHex);
    const { chainspec_name: networkName } = await getStatus();
    const gasPrice = 1; // Native transfer
    const ttl = 1800000;

    // @ Session params
    const paymentAmount = 100000000000;
    const id = 123456;

    const deployParams = new DeployUtil.DeployParams(
      fromPublicKey,
      networkName,
      gasPrice,
      ttl
    );

    const session = DeployUtil.ExecutableDeployItem.newTransfer(
      paymentAmount,
      toPublicKey, // <-- Is this where session entry point and args are put???
      null, // optional: sourcePurse
      id
    );

    const payment = DeployUtil.standardPayment(NATIVE_TRANSFER_PAYMENT_AMOUNT);

    const deploy = DeployUtil.makeDeploy(deployParams, session, payment);

    return DeployUtil.deployToJson(deploy);
  };

  const deploy = await updateString();

  res.status(201).json({ deploy });
}
