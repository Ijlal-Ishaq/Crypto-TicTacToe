import { FC } from "react";
import "./App.css";
import { BrowserRouter } from "react-router-dom";
import Router from "./router/index";
import MuiTheme from "./theme";
import { useWeb3React, Web3ReactProvider } from "@web3-react/core";
import { ethers } from "ethers";
import { getLibrary } from "./contract/getLibrary";
import { styled } from "@mui/material/styles";
import { InjectedConnector } from "@web3-react/injected-connector";
import { conciseAddress } from "./utils/formattingFunctions";

const CustomDisconnectButtons = styled('div')(({theme})=>({
background: "rgba(255, 255, 255, 0.03)",
boxShadow: "0 0 1rem 0 rgba(0, 0, 0, .2)",
backdropFilter: "blur(4px)",
borderRadius: "5px",
display: "flex",
justifyContent: "center",
alignItems: "center",
cursor: "pointer",
// width: "95%",
paddingInline:"10px",
height: "50px",
color: "rgba(255,255,255,0.7)",
fontSize: "15px",
marginTop: "20px",
marginLeft: "auto",
marginRight: "auto",
position:"fixed",
right:"15px",
"&:hover": {
// width: "100%",
// height: "55px",
background: "rgba(255, 255, 255, 0.1)",
},
}))
const App: FC = () => {
  const {account, deactivate , connector} = useWeb3React();
  const deactivateMetamaskWallet = async () => {
    window.localStorage.removeItem("previousWallet");
    await deactivate();
    if(connector instanceof InjectedConnector){
      await connector.deactivate();
    }

    setTimeout(() => {
    // return true
    return true
      // dispatch({ type: LOCAL_TYPES.DISCONNECT_USER });
    }, 1000);
   
  };

  return (
    // <Web3ReactProvider getLibrary={getLibrary}>
    <div className="App background">
      <MuiTheme>
      {(account)&&<CustomDisconnectButtons>
        {conciseAddress(account)}
      </CustomDisconnectButtons>}
      <div>
        {/* <div className="background" /> */}
        <BrowserRouter>
          <Router />
        </BrowserRouter>
      </div>
      </MuiTheme>
    </div>
    // </Web3ReactProvider>
  );
};

export default App;
