import { CasperServiceByJsonRPC } from "casper-js-sdk";
import { RPC_API, KEY } from "../../constants";

export default async function handler(req, res) {
  const casperService = new CasperServiceByJsonRPC(RPC_API);

  const getBlockState = async () => {
    try {
      const stateRootHash = await casperService.getStateRootHash();
      const blockState = await casperService.getBlockState(stateRootHash, KEY);
      return blockState;
    } catch (err) {
      console.log(err);
    }
  };

  const blockState = await getBlockState();

  res.status(200).json({ blockState });
}
