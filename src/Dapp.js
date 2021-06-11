import { useContext, useState } from "react";
import { ethers } from "ethers"
import { Web3Context, useContract, useContext } from "web3-hooks";
import Nav from "./components/Nav"
import Header from "./components/Header"
import Owner from "./components/Owner"

const 


function Dapp() {
  const [web3State, login] = useContext(Web3Context)
  const [ethBalance, setEthBalance] = useState(0)
  const [address, setAddress] = useState() 
  const [eth2Send, setEth2Send] = useState(0)

  const handleClickGetBalance = async () => {
  try {
    const balance = await web3State.provider.getBalance(address)
    setEthBalance(ethers.utils.formatEther(balance))
    } catch (e) {
      console.error(`${e.value} is a wrong address`)
    }
  }

  const handleClickSend = async () => {
    const weiAmount = ethers.utils.parseEther(eth2Send)
    try {
      const tx = await web3State.signer.sendTransaction({to: address, value: weiAmount})
      await tx.wait()
      console.log('TX MINED')
    } catch (e) {
      console.error(e.message)
    }
  }

  return (<>
    <Nav />
    <Header />
    {web3State.account === "0x9ad250c29f8cb07dc28e6f6eef02543cc08433db" ? <Owner /> : ""}
    <h1 className="btn btn-dark m-4 ">Hello hardfork</h1>
    <p>MetaMask installed: {web3State.isMetaMask ? "yes" : "no"}</p>
    <p>Web3: {web3State.isWeb3 ? "injected" : "no-injecetd"}</p>
    {!web3State.isLogged ? (
      <>
        <button className="btn btn-success" onClick={login}>Login</button>
      </>
        ) : (
      <>
        <button className="btn btn-success">{web3State.account.split("").splice(0,6).join("") + "..." + web3State.account.split("").splice(-4).join("")}</button>
      </>
    )}
    <p>Network id: {web3State.chainId}</p>
    <p>Network name: {web3State.networkName}</p>
    <p>acccount: {web3State.account}</p>
    <p>balance acccount: {web3State.balance}</p>

    <label htmlFor="balanceOf">la balance:</label>
    <input id="balanceOf" type="text" placeholder="ethereum address" className="mx-2" value={address} onChange={(e) => setAddress(e.target.value)}></input>
    <button onClick={handleClickGetBalance} className="btn btn-warning">get balance</button>

    <p>balance de {address}: {ethBalance} ETHER </p>

    <input className="mx-2" id="eth2send" type="text" placeholder="amount to send" onChange={(e) => setEth2Send(e.target.value)} />
    <button className="btn btn-danger" onClick={handleClickSend}>Send moula</button>
   </>
  );
}

export default Dapp;
