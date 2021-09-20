import React, { useEffect, useState } from "react";
import "./App.css";
import Web3 from "web3";
import Token from "../abis/GargToken";
import TokenSale from "../abis/GargTokenSale";
import Body from "./Body";

export default function App() {
  let content;
  const [account, setAccount] = useState("");
  const [tokenPrice, setTokenPrice] = useState("");
  const [tokensSold, setTokenSold] = useState("");
  const [tokenData, setTokenData] = useState();
  const [tokenSale, setTokenSale] = useState({});
  const [tokenBalance, setTokenBalance] = useState("0");
  const [loading, setLoading] = useState(true);
  const [reload, setReload] = useState(false);
  const [metamask, setMetamask] = useState(false);
  useEffect(() => {
    loadWeb3();
    if (window.web3) loadBlockchainData();
  }, [reload]);

  const loadBlockchainData = async () => {
    /** Se carga WEB3  */
    const web3 = window.web3;
    /** Se identifica que network se encuentra */
    const networkId = await web3.eth.net.getId();
	const connect = window.ethereum.isConnected()
    console.log(networkId);
    console.log(connect);
	if (window.ethereum && networkId === 4) {
		await window.ethereum.send('eth_requestAccounts');
		const tokenData = Token.networks[networkId];
		setTokenData(tokenData);
		console.log(tokenData.address);
  
		const accounts = await web3.eth.getAccounts();
		setAccount(accounts[0]);
  
		if (tokenData) {
		  const tokenContract = await new web3.eth.Contract(
			Token.abi,
			tokenData.address
		  );
		  console.log(accounts[0]);
		  const tokenBalance = await tokenContract.methods
			.balanceOf(accounts[0])
			.call();
		  console.log(tokenBalance);
		  setTokenBalance(tokenBalance.toString());
		} else {
		  window.alert("Conexión a metamask no detectada");
		}
  
		// Load Wallet
		const tokenSaleData = TokenSale.networks[networkId];
		if (tokenSaleData) {
		  const tokenSaleContract = new web3.eth.Contract(
			TokenSale.abi,
			tokenSaleData.address
		  );
		  setTokenSale(tokenSaleContract);
		  let tokenPrice = await tokenSaleContract.methods.tokenPrice().call();
		  tokenPrice = await web3.utils.fromWei(tokenPrice.toString(), "ether");
		  setTokenPrice(tokenPrice.toString());
		  const _tokensSold = await tokenSaleContract.methods.tokensSold().call();
		  setTokenSold(_tokensSold.toString());
		} else {
		  window.alert("Conexión a metamask no detectada");
		}
		setMetamask(true);
    }else{
		setMetamask(false);
	}

    setLoading(false);
  };

  async function loadWeb3() {
    // Modern dapp browsers...
    if (window.ethereum) {
      console.log(1);
      window.web3 = new Web3(window.ethereum);
      try {
        await window.ethereum.enable();
      } catch (error) {
        console.log("Error:", error);
      }
    }
    // Legacy dapp browsers...
    else if (window.web3) {
      console.log(2);
      window.web3 = new Web3(window.web3.currentProvider);
    }
    // Non-dapp browsers...
    else {
      console.log(3);
      /* window.alert(
				"¡ATENCIÓN! La aplicación no se cargará. Se detectó un navegador que no es Ethereum. ¡Debería considerar probar MetaMask!"
			);*/
      setLoading(false);
    }
  }

  const buyTokens = async (tokens) => {
    setLoading(true);
    await tokenSale.methods
      .buyTokens(tokens)
      .send({
        value: window.web3.utils.toWei(String(tokens * tokenPrice), "ether"),
        from: account,
      })
      .on("transactionHash", (hash) => {
        setReload(!reload);
        setLoading(false);
      });
  };

  if (loading === true) {
    content = <p className="text-center">Cargando...</p>;
  } else {
    content = (
      <Body
        account={account}
        buyTokens={buyTokens}
        tokenBalance={tokenBalance}
        tokenPrice={tokenPrice}
        tokensSold={tokensSold}
        metamask={metamask}
        token={tokenData}
      />
    );
  }
  return (
    <div>
      {/* <Navbar account={account} /> */}

      {content}
    </div>
  );
}
