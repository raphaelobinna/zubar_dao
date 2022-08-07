import { ethers, network } from "hardhat";
import { developmentChains, FUNC, MINT_DELAY, NEW_STORE_VALUE, PROPOSAL_DESCRIPTION, VOTING_PERIOD } from "../helper-hardhat-config";
import { moveBlocks } from "../utils/move-blocks";
import { moveTime } from "../utils/move-time";

export async function queueAndExecute() {
    const args = [NEW_STORE_VALUE]
    const box = await ethers.getContract("Box")
    const encodedFunction = box.interface.encodeFunctionData(FUNC, args)
    const descriptionHash = ethers.utils.keccak256(ethers.utils.toUtf8Bytes(PROPOSAL_DESCRIPTION))

    const governor = await ethers.getContract("GovernorContract");
    console.log('Queueing....')
    const queueTx = governor.queue([box.address], [0], [encodedFunction], descriptionHash)

    await queueTx.wait(1)

    if (developmentChains.includes(network.name)) {
        await moveTime(MINT_DELAY + 1)
        await moveBlocks(VOTING_PERIOD + 1)
    }

    console.log('Executing....')
    const executeTx = await governor.execute(
        [box.address],
        [0],
        [encodedFunction],
        descriptionHash
    )

    await executeTx.wait(1)

    const boxNewValue = await box.retrieve();
    console.log(`New Box Value: ${boxNewValue.toString()}`)
}

queueAndExecute().then(() => process.exit(0)).catch(error => {console.log(error); process.exit(1) })