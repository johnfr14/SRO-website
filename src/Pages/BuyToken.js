import { useContext, useState } from "react";
import { ethers } from "ethers"
import { Web3Context } from "web3-hooks";
import { IcoContext } from "../App"

import crypto from '../img/crypto-rain.jpg';

const BuyToken = () => {
  const [ico] = useContext(IcoContext)

  const [web3State] = useContext(Web3Context)
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState("")
  const [balance, setBalance] = useState(0)
  const [owner, setOwner] = useState(0)
  const [timer, setTimer] = useState({})
  const [supply, setSupply] = useState(0)
  const [supplySold, setSupplySold] = useState(0)

  const [eth2Send, setEth2Send] = useState(0)

  const handleBalanceButton = async () => {
    try {
      const balance = await ico.balanceOf(web3State.account) 
      const SROAmount = ethers.utils.formatEther(balance)
      setBalance(SROAmount)
    } catch (e) {
      setError(e.message)
    }
  }

  const handleOwnerButton = async () => {
    try {
      const owner = await ico.owner() 
      setOwner(owner)
    } catch (e) {
      setError(e.message)
    }
  }

  const handleTimeButton = async () => {
    try {
      const secondeRemaining = await ico.secondeRemaining()
      const day = Math.floor(secondeRemaining % 1209601 / 86400)
      const hour = Math.floor(secondeRemaining % 86400 / 3600)
      const minute = Math.floor(secondeRemaining % 3600 / 60)
      const seconde = Math.floor(secondeRemaining % 60)
      const timer = [day, hour, minute, seconde]
      setTimer(timer)
    } catch (e) {
      setError(e.message)
    }
  }

  const handleSupplyRemainingButton = async () => {
    try {
      const totalSupply = await ico.totalSupply()
      const supply = await ico.supplyICORemaining()

      const supplySRO = ethers.utils.formatEther(supply)
      const totalSRO = ethers.utils.formatEther(totalSupply)

      setSupply({supply: supplySRO, percent: Math.floor((100 * supplySRO) / totalSRO)})
    } catch (e) {
      setError(e.message)
    }
  }

  const handleSoldButton = async () => {
    try {
      const totalSold = ethers.utils.formatEther(await ico.totalTokenSold())
      setSupplySold(totalSold)
    } catch (e) {
      setError(e.message)
    }
  }

  const handleClickBuy = async (e) => {
    const weiAmount = ethers.utils.parseEther(eth2Send)
    try {
      const tx = await ico.buyTokens({value: weiAmount})
      setLoading(true)
      await tx.wait()
      setLoading(false)
      const currsupply = await ico.supplyICORemaining()
      setSupply(ethers.utils.formatEther(currsupply))
      setSuccess(true)

      const currSRO = await ico.balanceOf(web3State.account)
      setBalance(ethers.utils.formatEther(currSRO))
    } catch (e) {
      web3State.chainId === 4 ? setError(e.message.split('}').splice(0,1).join("")) : setError("please connect your MetaMask to the Rinkeby testNet")
    }
  }

  return (
    <div className="row">
      <h1 className="text-center m-2">Mega SRO ICO 🔥</h1>

      <div className="card p-0 col-5 align-items-center text-center shadow m-4 bg-body rounded">
        <img src={crypto} class="card-img-top" alt="crypto-rain"  />
        <div className="card-body">
          <h5 className="card-title">🔥 Buy SRO 🔥</h5>
          <p className="card-text">1 SRO = 0.000000001 ETH</p>
          <div  class="input-group mb-3 col-7">
            {loading ?  <button class="btn btn-primary" type="button" disabled>
                          <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                            Processing...
                        </button> 
                      : <button onClick={handleClickBuy}  className="btn btn-outline-primary " type="button" id="button-addon1">Buy SRO</button>
            }
            <input onChange={(e) => setEth2Send(e.target.value)} type="text" class="form-control" placeholder="your amount" aria-label="Example text with button addon" aria-describedby="button-addon1" />
          </div>
          {error && <p className="alert alert-danger mt-2">{error}</p>}
          {success && <p className="alert alert-success mt-2">Succes ! your transaction has been sent.</p>}
        </div>
      </div>

      <ul class="list-group my-4 col-6">
        <li class="d-flex align-items-start">
            <p><button onClick={handleBalanceButton} class="btn btn-primary">balance SRO</button> : {balance} SRO</p>
        </li>
        <li class="d-flex align-items-start">
            <p><button onClick={handleOwnerButton} class="btn btn-primary">Owner of SRO</button> : {owner}</p>
        </li>
        <li class="d-flex align-items-start">
            <p><button onClick={handleTimeButton} class="btn btn-primary">time remaining</button> : {`${timer[0]} jours, ${timer[1]} heures, ${timer[2]} minutes, ${timer[3]} secondes`}</p>
        </li>
        <li class="d-flex align-items-start">
            <p><button onClick={handleSupplyRemainingButton} class="btn btn-primary">Supply remaining</button> : {supply.supply} ({supply.percent}%)</p>
        </li>
        <li class="d-flex align-items-start">
            <p><button onClick={handleSoldButton} class="btn btn-primary">Supply Sold</button> : {supplySold} SRO already sold</p>
        </li>
      </ul>
    </div>
  )
}

export default BuyToken