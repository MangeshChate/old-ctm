import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Atm from '../components/Atm';
import { ethers } from 'ethers';
import ABI from '../utils/ABI.json';
import Footer from '../components/Footer';

function MainPage() {
  const [account, setAccount] = useState('');
  const [contract, setContract] = useState(null);
  const [provider, setProvider] = useState(null);

  useEffect(() => {
    const initializeWeb3 = async () => {
      try {
        if (window.ethereum) {
          const web3Provider = new ethers.providers.Web3Provider(window.ethereum);
          await window.ethereum.send('eth_requestAccounts', []);
          window.ethereum.on('chainChanged', () => window.location.reload());
          window.ethereum.on('accountschanged', () => window.location.reload());

          const signer = web3Provider.getSigner();
          const address = await signer.getAddress();

          console.log(address);
          setAccount(address);

          const contractAddress = '0x4801C01AB41b7Ec0C437b8B95d133Ab82BA1d0d0';
          const abi = ABI;

          const contractInstance = new ethers.Contract(contractAddress, abi, signer);

          console.log(contractInstance);

          setContract(contractInstance);
          setProvider(signer);
        } else {
          alert('Metamask is not installed');
        }
      } catch (error) {
        console.error('Error initializing Web3 provider:', error);
        // Handle the error accordingly
      }
    };

    initializeWeb3();
  }, []);

  return (
    <div className='bg-hero-grad text-light '>
      <Navbar account={account} />
      <Atm account={account} contract={contract} provider={provider} />
      <Footer />
    </div>
  );
}

export default MainPage;
