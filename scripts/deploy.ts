import hre  from "hardhat";

const main = async () => {
  const [deployer] = await hre.ethers.getSigners();

  console.log("Deploying contracts with account: ", deployer.address);

  const MyNFTContractFactory = await hre.ethers.getContractFactory("MyNFT");
  const MyNFTContract = await MyNFTContractFactory.deploy();

  await MyNFTContract.deployed();

  console.log("MyNFT Contract Address: ", MyNFTContract.address);
};

const runMain = async () => {
  try {
    await main();
    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

runMain();