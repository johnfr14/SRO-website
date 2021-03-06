import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom"
import React from 'react'
import { useContract } from 'web3-hooks'
import { counterAddress, counterAbi } from './contracts/Counter'
import { icoAddress, icoAbi } from './contracts/Ico'
import { calculatorAddress, calculatorAbi } from './contracts/Calculator'
import { sarahroAddress, sarahroAbi } from './contracts/SarahRo'
import Nav from "./components/Nav"
import Home from './Pages/Home'
import BuyToken from './Pages/BuyToken'
import Calculator from './Pages/Calculator'

export const CounterContext = React.createContext(null)
export const IcoContext = React.createContext(null)


function App() {
  const counter = useContract(counterAddress, counterAbi)
  const ico = useContract(icoAddress, icoAbi )
  const calculator = useContract(calculatorAddress, calculatorAbi)
  const sarahro = useContract(sarahroAddress, sarahroAbi)

  return (
      <Router>
        <Nav />
        <div className="mt-5 pt-3">
          <Switch>
            <Route exact path="/">
              <CounterContext.Provider value={counter}>
                <Home />
              </CounterContext.Provider>
            </Route>
            <IcoContext.Provider value={[ico, calculator, sarahro]}>
              <Route exact path="/buyToken">
                  <BuyToken />
              </Route>
              <Route exact path="/calculator">
                  <Calculator />
              </Route>
            </IcoContext.Provider>
            <Route path="*" />
            <Redirect to="/404" />

          </Switch>
          </div>
    </Router>  
    
  )
}

export default App