const ethers = require("ethers");
const { getReabableEtherNumber } = require("./helpers/getReadableEtherNumber");

const ERC20_ABI = require("./abi/erc20");
const provider = new ethers.providers.getDefaultProvider();

const readContract = async () => {
  const daiAddress = "0x6B175474E89094C44Da98b954EedeAC495271d0F";

  const contract = new ethers.Contract(daiAddress, ERC20_ABI, provider);

  console.log("Reading information from ", daiAddress);

  const name = await contract.name();
  const symbol = await contract.symbol();
  const totalSupply = await contract.totalSupply();
  const readableTotalSupply = getReabableEtherNumber(totalSupply);

  console.log("contract name: ", name);
  console.log("symbol: ", symbol);
  console.log("total supply: ", readableTotalSupply);
};

readContract();
