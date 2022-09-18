const { ethers } = require("ethers");
const { readAddressBalance } = require("./readAddressBalance");

const provider = new ethers.providers.getDefaultProvider();

const makeTransaction = async () => {
  const myTestAccount = "0x6507aBE280bc5D00f3eB7195738b0aD74497d16a";
  const privateKey = "";

  const balanceBeforeTx = readAddressBalance(myTestAccount);

  console.log("Balance before transaction: ", balanceBeforeTx);

  const wallet = await new ethers.Wallet(privateKey, provider);

  const tx = await wallet.sendTransaction({
    to: "",
    value: ethers.utils.parseEther("0.025"),
  });

  await tx.wait();

  console.log("TX: ", tx);

  const balanceAfterTx = readAddressBalance(myTestAccount);
  console.log("Balance before transaction: ", balanceAfterTx);
};

makeTransaction();
