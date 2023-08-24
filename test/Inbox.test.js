const assert = require("assert");
const ganache = require("ganache");
const { beforeEach } = require("mocha");
const { Web3 } = require("web3");
const web3 = new Web3(ganache.provider());
const { abi, evm } = require('../compile');

let acounts;
let inbox;
const INITIAL_MESSAGE = "Hi there!";

beforeEach(async () => {
  accounts = await web3.eth.getAccounts();
  inbox = await new web3.eth.Contract(abi)
    .deploy({
      data: evm.bytecode.object,
      arguments: [INITIAL_MESSAGE],
    })
    .send({ from: accounts[0], gas: "1000000" });
});

describe("Inbox Smart Contract", () => {
  it("deployment is ok", () => {
    assert.ok(inbox.options.address);
  });

  it("has a default message", async () => {
    const message = await inbox.methods.message().call();

    assert.equal(message, INITIAL_MESSAGE);
  });

  it("can change message", async () => {
    await inbox.methods
      .setMessage("Second message")
      .send({ from: accounts[0] });
    const message = await inbox.methods.message().call();

    assert.equal(message, "Second message");
  });
});
