const HDWalletProvider = require("@truffle/hdwallet-provider");
const { Web3 } = require("web3");
const { abi, evm } = require("./compile");

const provider = new HDWalletProvider(
  "setup useful visa certain blur noodle horse balance common trust have book",
  "https://sepolia.infura.io/v3/925ada8f6ecd492cb2756f195ec1d67a"
);
const web3 = new Web3(provider);

const deploy = async () => {
  const accounts = await web3.eth.getAccounts();
  console.log("Attempting to deploy from account", accounts[0]);

  const contract = await new web3.eth.Contract(abi)
    .deploy({
      data: evm.bytecode.object,
      arguments: ["Hi there"],
    })
    .send({ from: accounts[0], gas: "1000000" });
  console.log("Contract deployed to", contract.options.address);
};

deploy()
  .then(() => console.log("success"))
  .catch((error) => console.error(error));
