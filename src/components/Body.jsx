import React, { useState } from "react";
import Card from "./Card";
import Metamask from "./Metamask";

export default function Body(props) {
  const addToken = () => {
    const tokenAddress = props.token.address;
    const tokenSymbol = "PBV";
    const tokenDecimals = 0.1;
    const tokenImage =
      "https://media-exp1.licdn.com/dms/image/C4D0BAQFjoODjueVD0w/company-logo_200_200/0/1624891542171?e=2159024400&v=beta&t=Q33QHHiWXZAc6UX4XF_kUJE20MhgM-yyc6FOGzLGVgU";

    try {
      // wasAdded is a boolean. Like any RPC method, an error may be thrown.
      const wasAdded = window.ethereum.request({
        method: "wallet_watchAsset",
        params: {
          type: "ERC20", // Initially only supports ERC20, but eventually more!
          options: {
            address: tokenAddress, // The address that the token is at.
            symbol: tokenSymbol, // A ticker symbol or shorthand, up to 5 chars.
            decimals: tokenDecimals, // The number of decimals in the token
            image: tokenImage, // A string url of the token logo
          },
        },
      });

      if (wasAdded) {
        console.log("Thanks for your interest!");
      } else {
        console.log("Your loss!");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <section id="over" className="about">
        <div className="supportbar">
          <div className="supportbar__container">
            <span className="supportbar__text">
              Invierte en las futuras promesas
            </span>
          </div>
        </div>
        <div className="feature">
          <div className="feature__text--left-bottom">
            {props.metamask ? (
              <div className="feature__text-content">
                <h2 className="feature__text-title">
                  ¡Presentamos a Pablo Valencia Token (PBV) el token es
                  equivalente a {props.tokenPrice} Ether
                </h2>
                {props.tokenBalance > 0 ? (
                  <button
                    onClick={() => addToken()}
                    type="button"
                    className="nav-list-item-btn btn--open"
                  >
                    Agregar Token a mi Metamask
                  </button>
                ) : ( 
					<a href="https://faucet.rinkeby.io/" target="_blank">
                  <button
                    type="button"
                    className="nav-list-item-btn btn--open"
                  >
                    Obtener ETH en Rinkeby Gratis
                  </button>
				  </a>
                )}

                <p>Actualmentes posees {props.tokenBalance} PBV</p>
                <Card
                  buyTokens={props.buyTokens}
                  tokensSold={props.tokensSold}
                  tokenPrice={props.tokenPrice}
                  tokenSale={props.tokenSale}
                />
                <p className="mt-3">
                  Tu Wallet:{" "}
                  <span className="font-weight-bold">{props.account}</span>
                </p>
                <span className="feature__icon--apple">Voor iOS</span>
                <span className="feature__icon--android">Voor Android</span>
              </div>
            ) : (
              <Metamask />
            )}
          </div>
          <div className="feature__img--right">
            <div className="feature__img-wrapper">
              <img
                width="1115"
                height="659"
                src="https://teampulse.nl/storage/temp/public/ee9/d93/cbf/ipad_met_pen__1115.png"
                alt="Teamanalyse app"
                className="feature__image"
                sizes="(max-width: 1115px) 100vw, 1115px"
              />
            </div>
          </div>
        </div>
      </section>
      <section id="features" className="features">
        <div className="feature">
          <div className="feature__img--left">
            <div className="feature__img-wrapper">
              <img
                alt="Pablo Sandoval"
                style={{ transform: "none" }}
                src="https://www.fivb.org/Vis2009/Images/GetImage.asmx?Type=Press&No=84028&width=300&height=450&stretch=uniformtofill"
              />
            </div>
          </div>
          <div className="feature__text--right">
            <div className="feature__text-content">
              <h2 className="feature__text-title">Pablo Sandoval (PBV)</h2>
              <p>
                es un jugador de voleibol holandés , miembro de la selección
                nacional masculina de voleibol de los Países Bajos . Participó
                en el Campeonato de Europa de 2017 . A nivel de clubes, juega en
                el equipo turco Ziraat Bankası Ankara . [1]
              </p>
            </div>
          </div>
        </div>
        <div className="feature">
          <div className="feature__text--left">
            <div className="feature__text-content">
              <h2 className="feature__text-title">Estadisticas</h2>
              <ul>
                <li>🏆 Copa de Holanda 2014/2015 , con VC Zwolle</li>
                <li>🥇Campeonato de Holanda 2014/2015 , con VC Zwolle</li>
                <li>
                  🏅Campeonato de Alemania 2016/2017 , con voleas de reciclaje
                  de Berlín
                </li>
                <li>🏆Copa de Turquía 2018/2019 , con Fenerbahçe İstanbul</li>
                <li>🥇 Turquía 2018/2019 , con Fenerbahçe İstanbul</li>
                <li>
                  🥉Campeonato de Turquía 2020/2021 , con Ziraat Bankası Ankara
                </li>
              </ul>
            </div>
          </div>
          <div className="feature__img--right-small">
            <div className="feature__img-wrapper">
              <img
                width="1801"
                height="1813"
                src="https://teampulse.nl/themes/teampulse/dist/img/design/acties.png"
                alt="Teampulse acties invoeren"
                className="feature__image"
              />
            </div>
          </div>
        </div>
        <div className="feature">
          <div className="feature__text--centered">
            <div className="feature__text-content">
              <h2 className="feature__text-title">WhitePaper PBV Token</h2>
              <strong>PBV token utilities</strong>
              <div className="md-6">
                <p>- Token a la venta: 750.000 </p>
                <p>- Liquidez: 700.000</p>
                <p>- Bloqueo: 50.000 (93,33% del total)</p>
                <p>
                  - 5% de adquisición de derechos cada mes después del
                  lanzamiento del deportista.
                </p>
              </div>
              <div className="md-6">
                {props.token && (
                  <p>
                    - Token Contrato de tiempo bloqueado:
                    {props.token.address}
                  </p>
                )}
                <p>Uso de fondos:</p>
                <p>- 50% de gastos de desarrollo</p>
                <p>- 50% de liquidez para canje</p>
              </div>
            </div>
          </div>
          <div className="feature__img--centered">
            <div className="feature__img-wrapper">
              <img
                width="1340"
                height="763"
                src="https://teampulse.nl/themes/teampulse/dist/img/design/dashboard2.png"
                alt="Teampulse dashboard"
                className="feature__image"
              />
            </div>
          </div>
        </div>
        <div className="feature container text-center "></div>
      </section>
    </>
  );
}
