import {HardhatRuntimeEnvironment} from 'hardhat/types';
import {DeployFunction} from 'hardhat-deploy/types';
import { ethers } from 'hardhat';
import { ADDRESS_ZERO } from '../helper-hardhat-config';

const deployBox: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  // code here
  //console.log('helloo')
  const { getNamedAccounts, deployments, network } = hre
  const { deploy, log } = deployments
  const { deployer } = await getNamedAccounts();

  log('deploying box')

  const box = await deploy('Box', {
    from: deployer,
    args:[],
    log:true
  })

  const timelock = await ethers.getContract("Timelock")
  const boxContract = await ethers.getContractAt("Box", box.address)

  const transferOwnerTx = await boxContract.transferOwnership(timelock.address)

  await transferOwnerTx.wait(1);

  log("You Done It!!")

}

export default deployBox