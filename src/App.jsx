import React, { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import { CONTRACT_ADDRESS, transformCharacterData } from './constants';
import LoadingIndicator from './Components/LoadingIndicator';

import './App.css';

import myEpicGame from './utils/MyEpicGame.json';
import Arena from './Components/Arena';
import SelectCharacter from './Components/SelectCharacter';

// Constants
const HANDLE = 'YoisSilver';
const GITHUB_LINK = `https://github.com/${HANDLE}/Metabattle`;

const App = () => {
// State
const [currentAccount, setCurrentAccount] = useState(null);

/*
 * Right under current account, setup this new state property
 */
const [characterNFT, setCharacterNFT] = useState(null);

const [isLoading, setIsLoading] = useState(false);


  // Actions
 const checkIfWalletIsConnected = async () => {
    try {
      const { ethereum } = window;

      if (!ethereum) {
        console.log('Make sure you have MetaMask!');
        /*
         * We set isLoading here because we use return in the next line
         */
        setIsLoading(false);
        return;
      } else {
        console.log('We have the ethereum object', ethereum);

        const accounts = await ethereum.request({ method: 'eth_accounts' });

        if (accounts.length !== 0) {
          const account = accounts[0];
          console.log('Found an authorized account:', account);
          setCurrentAccount(account);
        } else {
          console.log('No authorized account found');
        }
      }
    } catch (error) {
      console.log(error);
    }
    /*
     * We release the state property after all the function logic
     */
    setIsLoading(false);
};

// Render Methods
const renderContent = () => {
  /*
   * If the app is currently loading, just render out LoadingIndicator
   */
  if (isLoading) {
    return <LoadingIndicator />;
  }

  if (!currentAccount) {
    return (
      <div className="connect-wallet-container">
        <img
          src="https://64.media.tumblr.com/0081bf3157bf9c8aa95ddcb5776a502e/00c1becf95f879ce-6f/s640x960/ff38244fdb88ac7e7f4311b587c2350cce87f652.gifv"
          alt="Intro Screen"
        />
        <button
          className="cta-button connect-wallet-button"
          onClick={connectWalletAction}
        >
          Connect Wallet To Get Started
        </button>
      </div>
    );
  } else if (currentAccount && !characterNFT) {
    return <SelectCharacter setCharacterNFT={setCharacterNFT} />;
  } else if (currentAccount && characterNFT) {
    return (
      <Arena characterNFT={characterNFT} setCharacterNFT={setCharacterNFT} />
    );
  }
};


  /*
   * Implement your connectWallet method here
   */
  const connectWalletAction = async () => {
    try {
      const { ethereum } = window;

      if (!ethereum) {
        alert('Get MetaMask!');
        return;
      }

      /*
       * Fancy method to request access to account.
       */
      const accounts = await ethereum.request({
        method: 'eth_requestAccounts',
      });

      /*
       * Boom! This should print out public address once we authorize Metamask.
       */
      console.log('Connected', accounts[0]);
      setCurrentAccount(accounts[0]);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    checkIfWalletIsConnected();
    const checkNetwork = async () => {
  try { 
    if (window.ethereum.networkVersion !== '4') {
      alert("Please connect to Rinkeby!")
    }
  } catch(error) {
    console.log(error)
  }
}
  }, []);



useEffect(() => {
  /*
   * Anytime our component mounts, make sure to immiediately set our loading state
   */
  setIsLoading(true);
  checkIfWalletIsConnected();
}, []);


useEffect(() => {
  const fetchNFTMetadata = async () => {
    console.log('Checking for Character NFT on address:', currentAccount);

    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const gameContract = new ethers.Contract(
      CONTRACT_ADDRESS,
      myEpicGame.abi,
      signer
    );

    const characterNFT = await gameContract.checkIfUserHasNFT();
    if (characterNFT.name) {
      console.log('User has character NFT');
      setCharacterNFT(transformCharacterData(characterNFT));
    }

    /*
     * Once we are done with all the fetching, set loading state to false
     */
    setIsLoading(false);
  };

  if (currentAccount) {
    console.log('CurrentAccount:', currentAccount);
    fetchNFTMetadata();
  }
}, [currentAccount]);





  return (
    <div className="App">
      <div className="container">
        <div className="header-container">
          <p className="header gradient-text"> 🏳 🗡 Metabattle 🗡⚔</p>
          <p className="sub-text">Enter the final battle.</p>
                  {/* This is where our button and image code used to be!
         *	Remember we moved it into the render method.
         */}
        {renderContent()}
        </div>
        <div className="footer-container">
          <img alt="Github logo" className="logo" src="https://img.icons8.com/color/48/000000/heart-pokemon.png" />
          <a
            className="footer-text"
            href={GITHUB_LINK}
            target="_blank"
            rel="noreferrer"
          >{`built by @${HANDLE}`}</a>
        </div>
      </div>
    </div>
  );
};

export default App;