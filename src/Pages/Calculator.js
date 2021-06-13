import { useState, useContext, useEffect } from "react/cjs/react.development"
import { ethers } from "ethers"
import { Web3Context } from "web3-hooks";
import { IcoContext } from "../App"
import "./calculator.css"

const Calculator = () => {
  const [ico, calculator, sarahro] = useContext(IcoContext)
  const [web3State] = useContext(Web3Context)
  const [approved, setApproved] = useState(false)

  const [calcul, setCalcul] = useState({nb1: 0, operation: ""})
  const [display, setDisplay] = useState("")
  const [result, setResult] = useState(0)

  const [balance, setBalance] = useState(0)
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)


  // console.log(calcul)
  // console.log(display)
   console.log(web3State)

  const handleCalculButton = (e) => {
    if(['+','-','*','/','%'].includes(e.target.value)) {
      setCalcul({...calcul, nb1: display, operation: e.target.value})
      setDisplay("")
    } else if (Number(e.target.value) > -1 && Number(e.target.value) < 10) {
      setDisplay(display + e.target.value)
    } 
  }

  const handleResultButton = async () => {
    let result;
    try {
      switch(calcul.operation) {
        case '+':
          result = await calculator.add(calcul.nb1, display);
          await result.wait()
          break
        case '-':
          result = await calculator.sub(calcul.nb1, display);
          await result.wait()
          break
        case '*':
          result = await calculator.mul(calcul.nb1, display);
          await result.wait()
          break
        case '/':
          result = await calculator.div(calcul.nb1, display);
          await result.wait()
          break
        case '%':
          result = await calculator.mod(calcul.nb1, display);
          await result.wait()
          break
        default :
          console.log("fail")
      }
    } catch (e) {
      setError(e.error.message)
    }
    console.log(result)
    handleCancelButton()
    handleBalanceButton()
    setResult(ethers.utils.formatEther(result.value))
  }

  const handleCancelButton = () => {
    setDisplay("")
    setCalcul({nb1: 0, operation: ""})
  }

  const handleBalanceButton = async () => {
    try {
      const balance = await ico.balanceOf(web3State.account) 
      const SROAmount = ethers.utils.formatEther(balance)
      setBalance(SROAmount)
    } catch (e) {
      setError(e.message)
    }
  }

  const handleApproveButton = async () => {
    if (!(await sarahro.allowance(web3State.account, "0x18Da78627DBA05E217CF9B9d9dc5A0250E294825")) > 0){
        try {
        setLoading(true)
        const tx = await sarahro.approve("0x18Da78627DBA05E217CF9B9d9dc5A0250E294825", ico.balanceOf(web3State.account))
        await tx.wait()
        setLoading(false)
        setApproved(true)
      } catch (e) {
        setLoading(false)
        setError(e.message)
      }
    } else {
      setApproved(true)
    }
  }


  useEffect(async () => {  
      console.log(web3State.isLogged)

    if (web3State.isLogged) {
      try {
        let allowance = await sarahro.allowance(web3State.account, "0x18Da78627DBA05E217CF9B9d9dc5A0250E294825")
        allowance = Math.floor(ethers.utils.formatEther(allowance))
        if (allowance > 0 ) {
        setApproved(true)
        setError("")
        } else {
          setApproved(false)
        }
        const balance = await ico.balanceOf(web3State.account) 
        const SROAmount =  Math.floor(ethers.utils.formatEther(balance))
        setBalance(SROAmount)

      } catch (e) {
        console.error(e.message)
      }
    }
  },[web3State])

  return (<>
    <h1>SRO Calculator ultra</h1>
    <div class="container">
      <div className="row">

        <div className="calculate col-6">
              <h1 type="text" class="result mb-5 ms-2 pt-5 bg-dark text-white">{display}</h1>
              <div class="first-row col-12">
                <button onClick={handleCancelButton} type="button" name="" value="c" class="global">c</button>
                <button type="button" name="" value="(" class="global">(</button>
                <button type="button" name="" value=")" class="global">)</button>
                <button onClick={handleCalculButton} type="button" name="" value="%" class="global">%</button>
              </div>
              <div class="second-row col-12">
                <button onClick={handleCalculButton} type="button" name="" value="7" class="global">7</button>
                <button onClick={handleCalculButton} type="button" name="" value="8" class="global">8</button>
                <button onClick={handleCalculButton} type="button" name="" value="9" class="global">9</button>
                <button onClick={handleCalculButton} type="button" name="" value="/" class="global">/</button>
              </div>
              <div class="third-row col-12">
                <button onClick={handleCalculButton} type="button" name="" value="4" class="global">4</button>
                <button onClick={handleCalculButton} type="button" name="" value="5" class="global">5</button>
                <button onClick={handleCalculButton} type="button" name="" value="6" class="global">6</button>
                <button onClick={handleCalculButton} type="button" name="" value="*" class="global">X</button>
              </div>
              <div class="fourth-row col-12">
                <button onClick={handleCalculButton} type="button" name="" value="1" class="global">1</button>
                <button onClick={handleCalculButton} type="button" name="" value="2" class="global">2</button>
                <button onClick={handleCalculButton} type="button" name="" value="3" class="global">3</button>
                <button onClick={handleCalculButton} type="button" name="" value="-" class="global">-</button>
              </div>
              <div class="conflict col-9">
                <div class="left">
                  <button onClick={handleCalculButton} type="button" name="" value="0" class="big">0</button>
                  <button onClick={() => setDisplay(display.split("").splice(0, (display.length - 1)).join(''))} type="button" name="" value="Del" class=" red small white-text top-margin">DEL</button>

                  <button onClick={handleResultButton} type="button" name="" value="=" class="green white-text big2 top-margin" disabled={!approved}>{approved ? "" : <button onClick={handleApproveButton} id="approve" className="btn btn-light" disabled={loading}>{loading ?
                          <p><span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>Processing...</p> : "Approve"}</button>}
                    =
                  </button>

                </div>
                <div class="right col-3">
                  <button onClick={handleCalculButton} type="button" name="" value="+" class="global grey plus">+</button>
                </div>
              </div>
              <li class="d-flex align-items-start">
                  <p>balance SRO : {balance} SRO</p>
              </li>
              { error && <div class="alert alert-danger" role="alert">{error}</div>}
        </div>

        <div className="info col-6">
          <h1>info</h1>
        </div>
      </div>

    </div>
    { result && <div class="alert alert-success" role="alert">RESULT : {result}</div>}
    </>
  )
}

export default Calculator