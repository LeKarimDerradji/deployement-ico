// Import Hardhat Runtime Enviroment 
const hre = require('hardhat')

const JSON_ARTIFACTS = 'deployment-info.json'


async function main() {
  // Hardhat always runs the compile task when running scripts with its command
  // line interface.
  //
  // If this script is run directly using `node` you may want to call compile
  // manually to make sure everything is compiled
  // await hre.run('compile');

  // We retrive all the signers bellow
  // Optionnel car l'account deployer est utilisé par défaut
  const [deployer] = await ethers.getSigners()
  console.log('Deploying contracts with the account:', deployer.address)

  // We get the contract to deploy
  const Ico = await hre.ethers.getContractFactory('Ico')
  const ico = await Ico.deploy(deployer.address, '0x0df4873Db65F14e9C9A8888f4489d8903C228849')

  // Attendre que le contrat soit réellement déployé, cad que la transaction de déploiement
  // soit incluse dans un bloc
  await ico.deployed()
  
  

  const contractName = 'Ico'

  const networkName = hre.network.name

  const contractAddress = ico.address

  // Afficher l'adresse de déploiement
  console.log('Ico deployed to:', ico.address)
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
