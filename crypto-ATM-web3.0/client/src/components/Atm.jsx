import { AtmOutlined, Cancel } from '@mui/icons-material'
import React, { useEffect, useState } from 'react'
import { ethers } from 'ethers'
function Atm({  contract ,account}) {

    const [modal1, setModal1] = useState(false);
    const [modal2, setmodal2] = useState(false);
    const [modal3, setmodal3] = useState(false);
    const [modal4, setmodal4] = useState(false);
    const [balance, setBalance] = useState(ethers.BigNumber.from(0));
    const [depositAmount, setDepositAmount] = useState('0');
    const [withdrawAmount, setWithdrawAmount] = useState('0');
    const [transferAmount, setTransferAmount] = useState('0');
    const [recipientAddress, setRecipientAddress] = useState('');



    const handleDeposit = async () => {
        if (!depositAmount || depositAmount <= 0) {
            alert('Please enter a valid deposit amount');
            return;
        }

        try {


            // Call the deposit function on the contract
            const transaction = await contract.deposit({ value: ethers.utils.parseEther(depositAmount) });

            // Wait for the transaction to be mined
            await transaction.wait();


            alert('Deposit successful!');
            setDepositAmount('0');
            setBalance((prevBalance) => (parseFloat(prevBalance) + parseFloat(depositAmount)).toString());



        } catch (error) {
            console.error('Error transferring funds:', error.message);

            if (error.message.includes('Deposit amount must be greater than 0')) {
                alert('Deposit amount must be greater than 0');
            }
             else {
                alert('Error transferring funds. Please check the console for more details.');
            }
        }
    }

    const handleWithdraw = async () => {
        const parsedWithdrawAmount = parseFloat(withdrawAmount);

        if (isNaN(parsedWithdrawAmount) || parsedWithdrawAmount <= 0) {
            alert('Please enter a valid withdrawal amount');
            return;
        }

        try {


            // Call the deposit function on the contract
            const transaction = await contract.withdraw(ethers.utils.parseEther(parsedWithdrawAmount.toString()));

            // Wait for the transaction to be mined
            await transaction.wait();


            alert('withdraw amount successful!');
            setWithdrawAmount('0')
            setBalance((prevBalance) => (parseFloat(prevBalance) - parsedWithdrawAmount).toString());



        } catch (error) {
            console.error('Error transferring funds:', error.message);

            if (error.message.includes('Invalid withdrawal amount')) {
                alert('Invalid withdrawal amount');
            }
             else {
                alert('Error transferring funds. Please check the console for more details.');
            }
        }
    }

    const handleTransfer = async () => {
        const parsedTransferAmount = parseFloat(transferAmount);

        if (isNaN(parsedTransferAmount) || parsedTransferAmount <= 0 || !recipientAddress) {
            alert('Please enter valid transfer details');
            return;
        }

        try {

            const transaction = await contract.transfer(recipientAddress, ethers.utils.parseEther(parsedTransferAmount.toString()));
            await transaction.wait();
            setBalance((prevBalance) => (parseFloat(prevBalance) - parsedTransferAmount).toString());

            alert('Transfer successful!');
            setRecipientAddress('')
            setTransferAmount('0')
        } catch (error) {
            console.error('Error transferring funds:', error.message);

            if (error.message.includes('Invalid transfer amount')) {
                alert('Insufficient balance to transfer');
            }
            else if (error.message.includes('Invalid recipient address')) {
                alert("Invalid recipient address");
            }
             else {
                alert('Error transferring funds. Please check the console for more details.');
            }
        }
    };

    useEffect(() => {
        const fetchBalance = async () => {
            try {
                if (contract) {
                    const rawBalance = await contract.checkBalance();
                    // Convert raw balance (Wei) to Ether
                    const balanceInEther = ethers.utils.formatEther(rawBalance);
                    setBalance(balanceInEther);
                }
            } catch (error) {
                console.error('Error fetching balance:', error.message);
            }
        };

        fetchBalance();
    }, [contract]);


    return (
        <div className='container h-[100vh]  flex justify-center align-center mt-10'>

            {account ? (
                
            <div className='container bg-random-grad  bg-opacity-50 h-[75%] rounded-lg '>
                <div className="container p-3">
                    <div className='container-fluid flex justify-center lg:justify-between lg:items-center mt-5 lg:p-0 '>
                        <span className='hidden lg:block'>
                            <img src="https://cdn-icons-png.flaticon.com/512/7513/7513034.png" className='w-[90px] ' alt="" />
                        </span>
                        <span className='text-sm lg:text-3xl font-mono overflow-hidden overflow-ellipsis max-w-full'>
                            {account}
                        </span>
                    </div>


                    <div className="container-fluid mt-[50px] lg:mt-[100px] h-[300px] flex  flex-col align-center justify-center">
                        <div className="grid grid-cols-1 lg:grid-cols-2  gap-[30px] lg:gap-[50px] font-bold font-mono">
                            <button className='text-lg lg:text-3xl i-glow blue-blur-glass text-white p-3 lg:p-10 rounded-full' onClick={() => setModal1(true)}>Check Balance</button>

                            <button className='text-lg lg:text-3xl i-glow blue-blur-glass text-white p-3 lg:p-10 rounded-full' onClick={() => setmodal2(true)}>Deposit</button>

                            <button className='text-lg lg:text-3xl i-glow blue-blur-glass text-white p-3 lg:p-10 rounded-full' onClick={() => setmodal3(true)}>Withdraw</button>

                            <button className='text-lg lg:text-3xl i-glow blue-blur-glass text-white p-3 lg:p-10 rounded-full' onClick={() => setmodal4(true)}>Transfer</button>

                        </div>
                    </div>

                </div>
            </div>
            ):(
                

                <div className='p-10 white-blur-glass h-[500px] lg:h-[500px] w-[300px] lg:w-full rounded-xl flex flex-col justify-center items-center'>
                    <img src="https://digtoc.com/images/sign_up/common/MetaMask_symbol.png" alt="" className='w-[100px] lg:w-[300px]'/>
                    <h4 className='text-xl lg:text-5xl mt-5 font-bold'>Connect Metamask</h4>
                 <span className='text-sm lg:text-lg mt-1 lg:mt-5'>
                    To Interact With blockchain
                 </span>
                 
                </div>
              
            )}

            {/* models1  */}
            {modal1 && (

                <div className='blue-blur-glass w-[300px] lg:w-[500px] h-[300px] lg:h-[400px] top-1/2 left-1/2 absolute transform translate-x-[-50%] translate-y-[-50%] rounded-2xl '>
                    <span className='flex justify-end p-5 text-light text-2xl'>
                        <Cancel onClick={() => setModal1(false)} />
                    </span>
                    <div className='container '>
                        <h1 className='text-3xl m-3 font-bold text-light font-mono text-center'>Your Balance</h1>
                        <hr />
                        <div className='text-3xl m-3 font-bold text-light font-mono text-center   first-letter mt-[50px] lg:mt-[100px] flex items-center justify-center gap-3 '>
                            <span className='overflow-hidden overflow-ellipsis max-w-full'>
                                {balance}

                            </span>
                            <span>

                                ETH
                            </span>
                        </div>
                    </div>

                </div>
            )}




            {/* modal2  */}
            {modal2 && (

                <div className='blue-blur-glass w-[300px] lg:w-[500px] h-[300px] lg:h-[400px] top-1/2 left-1/2 absolute transform translate-x-[-50%] translate-y-[-50%] rounded-2xl'>
                    <span className='flex justify-end p-5 text-light text-2xl'>
                        <Cancel onClick={() => setmodal2(false)} />
                    </span>
                    <div className='container '>
                        <h1 className='text-2xl lg:text-3xl m-3 font-bold text-light font-mono text-center'>Deposit ETH</h1>
                        <hr />
                        <div className=' flex items-center justify-center mt-8'>
                            <input type="text" placeholder='Enter Amount for Deposit' className="form-control  text-mono white-blur-glass border-0 p--2 lg:p-5" style={{ color: "white" }} value={depositAmount}
                                onChange={(e) => setDepositAmount(e.target.value)} />

                        </div>
                        <button className="text-light mt-[20px] lg:mt-[50px] bg-blue-700 btn-lg font-bold i-glow w-full" onClick={handleDeposit} >Deposit</button>
                    </div>

                </div>
            )}


            {/* modal3  */}
            {modal3 && (

                <div className='blue-blur-glass w-[300px] lg:w-[500px] h-[300px] lg:h-[400px] top-1/2 left-1/2 absolute transform translate-x-[-50%] translate-y-[-50%] rounded-2xl'>
                    <span className='flex justify-end p-5 text-light text-2xl'>
                        <Cancel onClick={() => setmodal3(false)} />
                    </span>
                    <div className='container '>
                        <h1 className='text-2xl lg:text-3xl m-3 font-bold text-light font-mono text-center'>Withdraw ETH</h1>
                        <hr />
                        <div className=' flex items-center justify-center mt-8'>
                            <input type="text" placeholder='Enter Amount for Withdraw' className="form-control  text-mono white-blur-glass border-0 p--2 lg:p-5" style={{ color: "white" }} value={withdrawAmount}
                                onChange={(e) => setWithdrawAmount(e.target.value)} />

                        </div>
                        <button className="text-light mt-[20px] lg:mt-[50px] bg-blue-700 btn-lg font-bold i-glow w-full" onClick={handleWithdraw} >withdraw</button>
                    </div>


                </div>
            )}

            {/* modal4  */}
            {modal4 && (

                <div className='blue-blur-glass w-[300px] lg:w-[500px] h-[300px] lg:h-[400px] top-1/2 left-1/2 absolute transform translate-x-[-50%] translate-y-[-50%] rounded-2xl'>
                    <span className='flex justify-end p-5 text-light text-2xl'>
                        <Cancel onClick={() => setmodal4(false)} />
                    </span>
                    <div className='container '>
                        <h1 className='text-2xl lg:text-3xl m-3 font-bold text-light font-mono text-center'>Transfer ETH</h1>
                        <hr />
                        <div className=' flex items-center justify-center mt-8'>
                            <div className='flex flex-col gap-3 w-full'>

                                <input type="text" placeholder='Enter Account Address' className="form-control  text-mono white-blur-glass border-0 p--2 lg:p-5" style={{ color: "white" }} value={recipientAddress}
                                    onChange={(e) => setRecipientAddress(e.target.value)} />

                                <input type="text" placeholder='Enter Amount to transfer' className="form-control  text-mono white-blur-glass border-0 p--2 lg:p-5" style={{ color: "white" }} value={transferAmount}
                                    onChange={(e) => setTransferAmount(e.target.value)} />
                            </div>

                        </div>
                        <button className="text-light mt-[20px] lg:mt-[50px] bg-blue-700 btn-lg font-bold i-glow w-full" onClick={handleTransfer}>Transfer</button>
                    </div>

                </div>
            )}



        </div>
    )
}

export default Atm
