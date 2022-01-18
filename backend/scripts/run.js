const main = async () => {
    const gameContractFactory = await hre.ethers.getContractFactory('MyEpicGame');
    const gameContract = await gameContractFactory.deploy(
        ["Chico", "Bonzo", "Dzimir"],       // Names
        ["QmVRVKUVSQUUeEPtrzipFLWxq77Druo596SgcEzNTPHTzP", // Images
            "QmaU9PCUfxE4NKegZsYpc1wjf6wJU2uiS8pzPigdGdWB1X",
            "QmRxQnzj4Zv4kBtmdDQZcvKXthx4c9JBy1QmDve7HbGSkV"],
        [151, 251, 351],                    // HP values
        [50, 100, 150],                     // Attack damage values
        "Leviathan Inzeal", // Boss name
        "QmNitSyP98bNSSUBWnGPUKWm9vUMabKFXDpFrVjVeBQRHz", // Boss image
        15000, // Boss hp
        50 // Boss attack damage

    );
    await gameContract.deployed();
    console.log("Contract deployed to:", gameContract.address);

    let txn;
    txn = await gameContract.mintCharacterNFT(2);
    await txn.wait();

    txn = await gameContract.attackBoss();
    await txn.wait();

    txn = await gameContract.attackBoss();
    await txn.wait();

};

const runMain = async () => {
    try {
        await main();
        process.exit(0);
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
};

runMain();