const { ethers } = require("ethers");

const provider = new ethers.providers.getDefaultProvider();
const address = "0x0394451c1238CEC1E825229E692AA9E428C107D8";

const getReabableEtherNumber = (balance) => {
  return ethers.utils.formatEther(balance);
};

const readContract = async () => {
  const daiAddress = "0x6B175474E89094C44Da98b954EedeAC495271d0F";
  const ERC20_ABI = [
    "function name() view returns (string)",
    "function symbol() view returns (string)",
    "function totalSupply() view returns (uint256)",
    "function balanceOf(address) view returns (uint)",
  ];

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

const makeTransaction = async () => {
  const myTestAccount = "0x6507aBE280bc5D00f3eB7195738b0aD74497d16a";
  const privateKey = "";

  const balanceBeforeTx = getBalance(myTestAccount);

  console.log("Balance before transaction: ", balanceBeforeTx);

  const wallet = await new ethers.Wallet(privateKey, provider);

  const tx = await wallet.sendTransaction({
    to: "",
    value: ethers.utils.parseEther("0.025"),
  });

  await tx.wait();

  console.log("TX: ", tx);

  const balanceAfterTx = getBalance(myTestAccount);
  console.log("Balance before transaction: ", balanceAfterTx);
};

readContract();
// readAddressBalance();
// makeTransaction();
