import { useState, useContext, useEffect } from "react/cjs/react.development"
import { ethers } from "ethers"
import { Web3Context } from "web3-hooks";
import { IcoContext } from "../App"
import "./calculator.css"

const Calculator = () => {
  const [ico, calculator, sarahro] = useContext(IcoContext)
  const [web3State] = useContext(Web3Context)
  const [approved, setApproved] = useState(false)
  const [balance, setBalance] = useState(0)

  const [calcul, setCalcul] = useState({nb1: "", operation: ""})
  const [display, setDisplay] = useState("")
  const [result, setResult] = useState([0, false])

  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const spinner = <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
  const isOperatorDisabled = calcul.operation !== "" || calcul.nb1 === ""
  const isResultDisabled = !approved || (calcul.nb1 === "" || calcul.operation === "" || display === "")

  //console.log(calcul)
  // console.log(display)
  //console.log(web3State)

  const handleCalculButton = (e) => {
    if(['+','-','*','/','%'].includes(e.target.value)) {
      setCalcul({...calcul, nb1: display, operation: e.target.value})
      setDisplay("")
    } else if (Number(e.target.value) > -1 && Number(e.target.value) < 10 && calcul.operation === "") {
      setDisplay(display + e.target.value)
      setCalcul({nb1: display + e.target.value, operation: ""})
    } else {
      setDisplay(display + e.target.value)
    }
    setResult([0, false])
  }

  const handleResultButton = async () => {
    let result;
    setLoading(true)
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
      setLoading(false)
    }
    
  }

  const handleCancelButton = () => {
    setDisplay("")
    setCalcul({nb1: "", operation: ""})
    setResult([0, false])
  }

  const handleApproveButton = async () => {
        try {
        setLoading(true)
        const tx = await sarahro.approve(calculator.address, ethers.utils.parseEther('10000000'))
        await tx.wait()
        setLoading(false)
        setApproved(true)
      } catch (e) {
        setLoading(false)
        setError(e.message)
      }
  }


  useEffect(() => { 
    async function fetchData() {
      if (web3State.isLogged) {
        try {
          let allowance = await sarahro.allowance(web3State.account, calculator.address)
         
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
    }
    fetchData()
    
  },[web3State, ico, sarahro, calculator])

  useEffect(() => {
  // si myContract est pas null alors
  if (calculator) {
    const cb = (account,res) => {
      // call back qui sera executée lorsque l'event sera émit 
      // faire quelque chose avec param1 param2 ou param3
      handleCancelButton()
      setResult([res.toString(), true])
      setLoading(false)
    }
    // ecouter sur l'event myEvent
    calculator.on('Operation', cb)
    return () => {
      // arreter d'ecouter lorsque le component sera unmount
      calculator.off('Operation', cb)
    }
  }
}, [calculator])

  return (<>
    <h1>SRO Calculator ultra</h1>
    <div class="container">
      <div className="row">

        <div className="calculate col-6">
              <h1 type="text" class="result  ms-2 pt-4 bg-dark text-white">{result[1] ? result[0] : display}</h1>
              <div class="first-row col-12">
                <button onClick={handleCancelButton} type="button" name="" value="c" class="global">c</button>
                <button type="button" name="" value="(" class="global">SRO</button>
                <button type="button" name="" value=")" class="global">🌖</button>
                <button onClick={handleCalculButton} type="button" name="" value="%" class="global" disabled={isOperatorDisabled}>%</button>
              </div>
              <div class="second-row col-12">
                <button onClick={handleCalculButton} type="button" name="" value="7" class="global">7</button>
                <button onClick={handleCalculButton} type="button" name="" value="8" class="global">8</button>
                <button onClick={handleCalculButton} type="button" name="" value="9" class="global">9</button>
                <button onClick={handleCalculButton} type="button" name="" value="/" class="global" disabled={isOperatorDisabled}>/</button>
              </div>
              <div class="third-row col-12">
                <button onClick={handleCalculButton} type="button" name="" value="4" class="global">4</button>
                <button onClick={handleCalculButton} type="button" name="" value="5" class="global">5</button>
                <button onClick={handleCalculButton} type="button" name="" value="6" class="global">6</button>
                <button onClick={handleCalculButton} type="button" name="" value="*" class="global" disabled={isOperatorDisabled}>X</button>
              </div>
              <div class="fourth-row col-12">
                <button onClick={handleCalculButton} type="button" name="" value="1" class="global">1</button>
                <button onClick={handleCalculButton} type="button" name="" value="2" class="global">2</button>
                <button onClick={handleCalculButton} type="button" name="" value="3" class="global">3</button>
                <button onClick={handleCalculButton} type="button" name="" value="-" class="global" disabled={isOperatorDisabled}>-</button>
              </div>
              <div class="conflict col-9">
                <div class="left">
                  <button onClick={handleCalculButton} type="button" name="" value="0" class="big">0</button>
                  <button onClick={() => setDisplay(display.split("").splice(0, (display.length - 1)).join(''))} type="button" name="" value="Del" class=" red small white-text top-margin">DEL</button>

                  <button onClick={handleResultButton} type="button" name="" value="=" className={isResultDisabled ? "dark-grey white-text big2 top-margin" : "green white-text big2 top-margin"} disabled={isResultDisabled}>{approved ? "" : <button onClick={handleApproveButton} id="approve" className="btn btn-light" disabled={loading}>{loading ?
                          <p>{spinner}Processing...</p> : "Approve"}</button>}
                    {loading ? spinner : "="}
                  </button>

                </div>
                <div class="right col-3">
                  <button onClick={handleCalculButton} type="button" name="" value="+" class="global grey plus" disabled={isOperatorDisabled}>+</button>
                </div>
              </div>
              <li class="d-flex align-items-start">
                  <p>balance : {balance} SRO</p>
              </li>
              { error && <div class="alert alert-danger" role="alert">{error}</div>}
        </div>

        <div className="info col-6">
          <h1>info</h1>
        </div>
      </div>

    </div>
    </>
  )
}

export default Calculator