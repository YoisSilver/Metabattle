const main = async () => {
    const gameContractFactory = await hre.ethers.getContractFactory('MyEpicGame');

    const gameContract = await gameContractFactory.deploy(
        ["Chico", "Bonzo", "Dzimir"],       // Names
        ["https://firebasestorage.googleapis.com/v0/b/nft-game-dbc7b.appspot.com/o/11.jpg?alt=media&token=c1e1c473-def4-4f6c-aaf4-9240549f1cbe", // Images
            "https://firebasestorage.googleapis.com/v0/b/nft-game-dbc7b.appspot.com/o/2.jpg?alt=media&token=5416d9ce-741c-4acc-a045-beaf29fcdb1d",
            "https://firebasestorage.googleapis.com/v0/b/nft-game-dbc7b.appspot.com/o/3.jpg?alt=media&token=55d5120a-48ca-42d5-b625-de9e3e474b83"],
        [151, 251, 351],                    // HP values
        [50, 100, 150],                     // Attack damage values
        "Leviathan Inzeal", // Boss name
        "https://firebasestorage.googleapis.com/v0/b/nft-game-dbc7b.appspot.com/o/5.jfif?alt=media&token=1c66f475-7019-4833-b31b-aadfcbc8d3bb", // Boss image
        15000, // Boss hp
        50 // Boss attack damage

    );

    await gameContract.deployed();
    console.log("Contract deployed to:", gameContract.address);

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