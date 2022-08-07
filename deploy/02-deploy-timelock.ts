import {HardhatRuntimeEnvironment} from 'hardhat/types';
import {DeployFunction} from 'hardhat-deploy/types';
import { MINT_DELAY } from '../helper-hardhat-config';

const deployTimeLock: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
    // code here
    //console.log('helloo')
    const { getNamedAccounts, deployments, network } = hre
    const { deploy, log } = deployments
    const { deployer } = await getNamedAccounts()
    log('deploying timelock ....')

    const timelock = await deploy("Timelock", {
        from: deployer, 
        args: [MINT_DELAY, [], []],
        log:true
    })

}

export default deployTimeLock