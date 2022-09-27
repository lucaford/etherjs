const ethers = require("ethers");

const ERC_721_ABI = require("./abi/erc721");
const { generateSalt } = require("./helpers/generateSalt");

const provider = new ethers.providers.getDefaultProvider("goerli");
const ETH_REGISTRAR_CONTROLLER = "0x283Af0B28c62C092C9727F1Ee09c02CA627EB7F5";
const ETH_NAME = "";
const privateKey = "";
const MY_ADDRESS = "";
const wallet = new ethers.Wallet(privateKey, provider);

const registerEns = async () => {
  const contract = new ethers.Contract(
    ETH_REGISTRAR_CONTROLLER,
    ERC_721_ABI,
    provider
  );
  const contractWithWallet = await contract.connect(wallet);

  const salt = generateSalt();

  console.log("Getting commitment...");

  const commitment = await contractWithWallet.makeCommitmentWithConfig(
    ETH_NAME,
    MY_ADDRESS,
    salt,
    "0x4B1488B7a6B320d2D721406204aBc3eeAa9AD329",
    MY_ADDRESS
  );

  console.log("Making commit...");

  const tx = await contractWithWallet.commit(commitment);

  let hasRegistrationInitiated = false;
  console.log("Listening to block events");
  provider.on("block", async (b) => {
    let receipt = await provider.getTransactionReceipt(tx.hash);
    if (
      receipt !== null &&
      hasRegistrationInitiated === false &&
      receipt.confirmations >= 1
    ) {
      hasRegistrationInitiated = true;
      console.log("Waiting 60 sec...");
      setTimeout(async () => {
        const tx2 = await contractWithWallet.registerWithConfig(
          ETH_NAME,
          MY_ADDRESS,
          31556952,
          salt,
          "0x4B1488B7a6B320d2D721406204aBc3eeAa9AD329",
          MY_ADDRESS,
          {
            gasLimit: 300000,
            value: ethers.BigNumber.from("100000000000000000").toHexString(),
          }
        );
        await tx2.wait();
        console.log("Register transaction: ", tx2);
      }, 65000);
    }
  });
};

registerEns();
