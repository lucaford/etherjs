const ethers = require("ethers");

const ERC20_ABI = require("./abi/erc20");
const provider = new ethers.providers.getDefaultProvider();

const contractAddress = "";
const contract = new ethers.Contract(contractAddress, ERC20_ABI, provider);
const wallet = new ethers.Wallet(privateKey1, provider);

const writeContract = async () => {
  const contractWithWallet = contract.connect(wallet);
  const tx = await contractWithWallet.transfer(account2, balance);

  await tx.wait();

  console.log("TX: ", tx);
};

writeContract();
