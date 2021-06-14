// Import Hardhat Runtime Enviroment 
const hre = require('hardhat')
const fsPromises = require('fs/promises')

const JSON_ARTIFACTS = 'deployment-info.json'

const addDeployementInfo = async (contractName, networkName, address) => {
    try {
      const stat = await fsPromises.stat(JSON_ARTIFACTS) // STEP 1 get Stats object
      if (stat.isFile()) {
        let jsonString = await fsPromises.readFile(JSON_ARTIFACTS, 'utf-8') // STEP 2 read file
        const artifact = JSON.parse(jsonString)
        artifact[networkName] = {address: address}
      
        
        jsonString = JSON.stringify(artifact)
        await fsPromises.writeFile(JSON_ARTIFACTS, jsonString) // STEP 3 write file
      }
    } catch (e) {
      // if USERS_FILE does not exist create it
      // and call again the function addUser
      if (e.code === 'ENOENT') {
        const emptyJsonString = '{}'
        await fsPromises.writeFile(JSON_ARTIFACTS, emptyJsonString)
        await addDeployementInfo(contractName, networkName, address)
      } else {
        // else just re throw error to caller
        throw e
      }
    }
  }


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
  const Aeternam = await hre.ethers.getContractFactory('Aeternam')
  const aeternam = await Aeternam.deploy(deployer.address, ethers.utils.parseEther('1000000000'))

  // Attendre que le contrat soit réellement déployé, cad que la transaction de déploiement
  // soit incluse dans un bloc
  await aeternam.deployed()
  
  

  const contractName = 'Aeternam'

  const networkName = hre.network.name

  const contractAddress = aeternam.address
  
  await addDeployementInfo(contractName, networkName, contractAddress)

  // Afficher l'adresse de déploiement
  console.log('Aeternam deployed to:', aeternam.address)
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
