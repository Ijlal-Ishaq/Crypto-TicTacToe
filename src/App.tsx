import { FC, useState } from "react";
import "./App.css";
import { BrowserRouter } from "react-router-dom";
import Router from "./router/index";
import MuiTheme from "./theme";
import { useWeb3React } from "@web3-react/core";
import { styled } from "@mui/material/styles";
import { conciseAddress } from "./utils/formattingFunctions";

const WalletAddressButton = styled("div")(({ theme }) => ({
  background: "rgba(255, 255, 255, 0.03)",
  boxShadow: "0 0 1rem 0 rgba(0, 0, 0, .2)",
  backdropFilter: "blur(4px)",
  borderRadius: "5px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  cursor: "pointer",
  padding: "10px 20px",
  color: "rgba(255,255,255,0.7)",
  fontSize: "15px",
  marginTop: "20px",
  marginLeft: "auto",
  marginRight: "auto",
  position: "fixed",
  right: "15px",
  width: "170px",
  zIndex: "100",
  "&:hover": {
    background: "rgba(255, 255, 255, 0.1)",
  },
}));

const DisconnectWalletButton = styled("div")(({ theme }) => ({
  background: "rgba(255, 255, 255, 0.1)",
  boxShadow: "0 0 1rem 0 rgba(0, 0, 0, .2)",
  backdropFilter: "blur(4px)",
  borderRadius: "5px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  cursor: "pointer",
  padding: "10px 20px",
  color: "rgba(255,255,255,0.7)",
  fontSize: "15px",
  marginTop: "20px",
  marginLeft: "auto",
  marginRight: "auto",
  position: "fixed",
  right: "15px",
  top: "50px",
  width: "170px",
  zIndex: "100",
  "&:hover": {
    background: "rgba(255, 255, 255, 0.3)",
  },
}));

const App: FC = () => {
  const { account } = useWeb3React();
  const { deactivate } = useWeb3React();

  const [showDisconnectButton, setShowDisconnectButton] =
    useState<boolean>(false);

  const disconnectWallet = async () => {
    setShowDisconnectButton(false);
    localStorage.removeItem("preConnected");
    deactivate();
  };

  return (
    <div className="App background">
      <MuiTheme>
        {account && (
          <>
            <WalletAddressButton
              onClick={() => {
                setShowDisconnectButton(!showDisconnectButton);
              }}
            >
              {conciseAddress(account)}
            </WalletAddressButton>
            {showDisconnectButton ? (
              <DisconnectWalletButton
                onClick={() => {
                  disconnectWallet();
                }}
              >
                Disconnect
              </DisconnectWalletButton>
            ) : null}
          </>
        )}
        <div>
          <BrowserRouter>
            <Router />
          </BrowserRouter>
        </div>
      </MuiTheme>
    </div>
  );
};

export default App;
