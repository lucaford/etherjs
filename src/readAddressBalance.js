const ethers = require("ethers");
const { getReabableEtherNumber } = require("./helpers/getReadableEtherNumber");

const provider = new ethers.providers.getDefaultProvider();
const address = "0x0394451c1238CEC1E825229E692AA9E428C107D8";

const readAddressBalance = async () => {
  const balance = await provider.getBalance(address);
  const readableBalance = getReabableEtherNumber(balance);
  console.log("balance: ", readableBalance);
};

readAddressBalance();

module.exports = {
  readAddressBalance,
};
