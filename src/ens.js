const ethers = require("ethers");
const { getReabableEtherNumber } = require("./helpers/getReadableEtherNumber");

const provider = new ethers.providers.getDefaultProvider();

const ETH_NAME = "lucaford.eth";

const resolveEns = async () => {
  console.log("Resolving address...");
  var address = await provider.resolveName(ETH_NAME);
  console.log("Getting balance...");
  var balance = await provider.getBalance(ETH_NAME);
  const formattedBalance = getReabableEtherNumber(balance);
  console.log("ADDRESS: ", address);
  console.log("BALANCE: ", formattedBalance);
};

resolveEns();
