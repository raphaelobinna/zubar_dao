import {HardhatRuntimeEnvironment} from 'hardhat/types';
import {DeployFunction} from 'hardhat-deploy/types';
import { MINT_DELAY, QUOROM_PERCENAGE, VOTING_DELAY, VOTING_PERIOD } from '../helper-hardhat-config';

const deployGovernorContract: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
    // code here
    //console.log('helloo')
    const { getNamedAccounts, deployments, network } = hre
    const { deploy, log, get } = deployments
    const { deployer } = await getNamedAccounts()
    log('deploying governor contract ....')

    const governanceToken = await get('GovernanceToken');
    const timelock = await get('Timelock')

    const governorContract = await deploy('GovernorContract', {
        from: deployer,
        args:[
            governanceToken.address,
            timelock.address,
            VOTING_DELAY,
            VOTING_PERIOD,
            QUOROM_PERCENAGE
        ],
        log:true
    })

}

export default deployGovernorContract