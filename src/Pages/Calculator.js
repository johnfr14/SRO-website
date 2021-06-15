import { useState, useContext, useEffect } from "react/cjs/react.development"
import { ethers } from "ethers"
import { Web3Context } from "web3-hooks";
import { IcoContext } from "../App"
import "./css/calculator.css"
import { Flex, Heading, Input, Button, HStack, useColorMode, useColorModeValue, Spacer, Grid, Stack, GridItem, Text, Box } from "@chakra-ui/react";

const Calculator = () => {
  const { toggleColorMode } = useColorMode()
  const calculateBackground = useColorModeValue("gray.100", "gray.700")

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
  const isResultDisabled = !approved || (calcul.nb1 === "" || calcul.operation === "" || display === "") || loading

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

  return (
  <Flex height="90vh" alignItems="center" justifyContent="center">
    <Flex  direction="column" width="35%" background="" rounded={6}>

    <Flex justifyContent="center" background="blue.100" mb={5} rounded={6}>
      <Heading>SRO Calculator ultra</Heading>
    </Flex>
        <Flex direction="column" >
                <Text color="white" bg="blackAlpha.800" fontSize="5xl" textAlign="right" height="80px">{result[1] ? result[0] : display}</Text>
                <Stack direction="row" spacing={4} align="center">
                  <Button onClick={handleCancelButton} mb={2} mt={2} width="100%" colorScheme="orange" variant="solid">c</Button>
                  <Button mb={2} width="100%" colorScheme="teal" variant="solid">SRO</Button>
                  <Button mb={2} width="100%" colorScheme="teal" variant="solid">🌖</Button>
                  <Button onClick={handleCalculButton} value="%"  mb={2} width="100%" colorScheme="gray" variant="solid" disabled={isOperatorDisabled}>%</Button>
                </Stack>
                <Stack direction="row" spacing={4} align="center">
                  <Button onClick={handleCalculButton} value="7" mb={2} width="100%" colorScheme="blackAlpha" variant="solid">7</Button>
                  <Button onClick={handleCalculButton} value="8" mb={2} width="100%" colorScheme="blackAlpha" variant="solid">8</Button>
                  <Button onClick={handleCalculButton} value="9" mb={2} width="100%" colorScheme="blackAlpha" variant="solid">9</Button>
                  <Button onClick={handleCalculButton} value="/" mb={2} width="100%" colorScheme="gray" variant="solid" disabled={isOperatorDisabled}>/</Button>
                </Stack>
                <Stack direction="row" spacing={4} align="center">
                  <Button onClick={handleCalculButton} value="4" mb={2} width="100%" colorScheme="blackAlpha" variant="solid">4</Button>
                  <Button onClick={handleCalculButton} value="5" mb={2} width="100%" colorScheme="blackAlpha" variant="solid">5</Button>
                  <Button onClick={handleCalculButton}value="6" mb={2} width="100%" colorScheme="blackAlpha" variant="solid">6</Button>
                  <Button onClick={handleCalculButton}value="*" mb={2} width="100%" colorScheme="gray" variant="solid" disabled={isOperatorDisabled}>X</Button>
                </Stack>
                <Stack direction="row" spacing={4} align="center">
                  <Button onClick={handleCalculButton} value="1" width="100%" colorScheme="blackAlpha" variant="solid">1</Button>
                  <Button onClick={handleCalculButton} value="2"  width="100%" colorScheme="blackAlpha" variant="solid">2</Button>
                  <Button onClick={handleCalculButton} value="3"  width="100%" colorScheme="blackAlpha" variant="solid">3</Button>
                  <Button onClick={handleCalculButton} value="-"  width="100%" colorScheme="gray" variant="solid" disabled={isOperatorDisabled}>-</Button>
                </Stack>

                <Grid mt={2} templateColumns="repeat(4, 1fr)" gap={3} >
                    <GridItem colSpan="3" rowSpan="1">
                      <Grid templateColumns="repeat(4, 1fr)" gap={1}>
                        <GridItem colSpan="4" rowSpan="0.5">
                          <Button onClick={handleCalculButton} width="100%" colorScheme="blackAlpha" variant="solid" value="0">0</Button>
                        </GridItem>
                        <GridItem colSpan="1" rowSpan="1">
                          <Button onClick={() => setDisplay(display.split("").splice(0, (display.length - 1)).join(''))} width="100%" height="75%" m={1} colorScheme="blackAlpha" variant="solid" value="Del">DEL</Button>
                        </GridItem>
                        <GridItem colSpan="3" rowSpan="1">
                          <Button onClick={handleResultButton} width="100%" height="75%" colorScheme="green" value="=" className={isResultDisabled ? "dark-grey white-text big2 top-margin" : "green white-text big2 top-margin"} disabled={isResultDisabled}>{approved ? "" : <Button onClick={handleApproveButton} disabled={loading}>{loading ?
                                  <p>{spinner}Processing...</p> : "Approve"}</Button>}
                            {loading ? spinner : "="}
                          </Button>
                        </GridItem>
                      </Grid>
                    </GridItem>
                    <GridItem colSpan="1" rowSpan="1">
                      <Button onClick={handleCalculButton} width="100%" height="90%" colorScheme="gray" variant="solid" value="+" disabled={isOperatorDisabled}>+</Button>
                    </GridItem>
                </Grid>
                <li class="d-flex align-items-start">
                    <p>balance : {balance} SRO</p>
                </li>
                <Button onClick={toggleColorMode}>dark mode</Button>
                { error && <div class="alert alert-danger" role="alert">{error}</div>}
        </Flex>
      
    </Flex>
  </Flex>
  )
}

export default Calculator