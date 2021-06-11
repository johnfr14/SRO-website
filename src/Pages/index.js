import {Flex, Heading, Input, Button, useColorMode, useColorModeValue, chakra} from "@chakra-ui/react"

const IndexPage = () => {
  const { toggleColorMode } = useColorMode()
  const formBackground = useColorModeValue("gray.100", "gray.700")
  return (
    <Flex height="100vh" alignItems="center" justifyContent="center">
    <button className="btn btn-success">coucou</button>
      <chakra.h1 fontSize="lg"> Heading </chakra.h1>
      <Flex direction="column" background={formBackground} p={12} rounded={6}>
        <Heading mb={6}>Log in</Heading>
        <Input placeholder="********" variant="filled" mb={6} type="password" />
        <Button mb={6} colorScheme="teal">Log in</Button>
        <Button onClick={toggleColorMode}>Toggle color</Button>
      </Flex>
    </Flex>
    
)}

export default IndexPage