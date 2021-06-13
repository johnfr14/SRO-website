import { useContext } from "react";

import { Web3Context } from "web3-hooks";
import SRO from '../img/50pxSardineRO.png';

const Nav = () => {
  const [web3State, login] = useContext(Web3Context)
  return (
<nav class="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
  <div class="container-fluid">
    <div class="pos-f-t">
      <img class="ms-2 me-2" src={SRO} alt="SRO-logo"/>
      <a class="navbar-brand" href="/">SarahRo</a>
    </div>

    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>

    <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
      <div class="navbar-nav">
        <a class="nav-link active" aria-current="page" href="/">Home</a>
        <a class="nav-link" href="/buyToken">BuyToken</a>
        <a class="nav-link" href="/calculator">Calculator</a>
      </div>
    </div>

    <p className="text-white">your balance: {web3State.balance} ETHER </p>

    {!web3State.isLogged ? (
      <>
        <button className="btn btn-secondary mx-4" onClick={login}>Login</button>
      </>
        ) : (
      <>
        <button className="btn btn-success mx-4">{web3State.account.split("").splice(0,6).join("") + "..." + web3State.account.split("").splice(-4).join("")}</button>
      </>
    )}
  </div>
</nav>
  )
}

export default Nav