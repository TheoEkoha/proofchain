async function main() {
    const [deployer] = await ethers.getSigners();
    console.log("Deploying contracts with the account:", deployer.address);
  
    const SoulboundToken = await ethers.getContractFactory("SoulboundToken");
    const token = await SoulboundToken.deploy("SoulboundToken", "SBT");
    console.log("SoulboundToken deployed to:", token.address);
  }
  
  main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });