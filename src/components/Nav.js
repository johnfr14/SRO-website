import { useContext } from "react";
import { Web3Context } from "web3-hooks";
import SRO from '../img/50pxSardineRO.png';

const Nav = () => {
  const [web3State, login] = useContext(Web3Context)
  return (
  <nav class="navbar navbar-dark bg-dark fixed-top">
    
    <div class="pos-f-t">
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarToggleExternalContent" aria-controls="navbarToggleExternalContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <img class="ms-4 me-2" src={SRO} alt="SRO-logo"/>
        <a class="navbar-brand" href="/">SarahRo</a>
    </div>

     {!web3State.isLogged ? (
      <>
        <button className="btn btn-secondary mx-4" onClick={login}>Login</button>
      </>
        ) : (
      <>
        <button className="btn btn-success mx-4">{web3State.account.split("").splice(0,6).join("") + "..." + web3State.account.split("").splice(-4).join("")}</button>
      </>
    )}
    
  </nav>
  )
}

export default Nav