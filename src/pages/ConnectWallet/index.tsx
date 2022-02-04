import { FC, useCallback, useState } from "react";
import { styled } from "@mui/material/styles";
import { NavigateFunction, NavigateOptions, useNavigate } from "react-router-dom";
import AppLogo from "../../assets/images/Logo.png";
import { UnsupportedChainIdError, useWeb3React } from "@web3-react/core";

import {
  InjectedConnector,
  NoEthereumProviderError,
  UserRejectedRequestError as UserRejectedRequestErrorInjected,
} from "@web3-react/injected-connector";
import { UserRejectedRequestError as UserRejectedRequestErrorWalletConnect, WalletConnectConnector } from "@web3-react/walletconnect-connector";
import { UserRejectedRequestError as UserRejectedRequestErrorFrame } from "@web3-react/frame-connector";
import { supportedChains } from "../../contract/constant";


const MainDiv = styled("div")(({ theme }) => ({
  marginTop: "100px",
  marginLeft: "auto",
  marginRight: "auto",
  padding: "50px 30px",
  paddingTop: "20px",
  background: "rgba(255, 255, 255, 0.03)",
  boxShadow: "0 0 1rem 0 rgba(0, 0, 0, .2)",
  backdropFilter: "blur(4px)",
  borderRadius: "5px",
  width: "350px",
  height: "fit-content",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",

  [theme.breakpoints.down("sm")]: {
    width: "300px",
  },
}));

const Logo = styled("img")(({ theme }) => ({
  margin: "10px auto",
  height: "175px",
  width: "250px",
}));

const CustomButtons = styled("div")(({ theme }) => ({
  background: "rgba(255, 255, 255, 0.03)",
  boxShadow: "0 0 1rem 0 rgba(0, 0, 0, .2)",
  backdropFilter: "blur(4px)",
  borderRadius: "5px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  cursor: "pointer",
  width: "95%",
  height: "50px",
  color: "rgba(255,255,255,0.7)",
  fontSize: "15px",
  marginTop: "20px",
  marginLeft: "auto",
  marginRight: "auto",
  userSelect: "none",

  "&:hover": {
    // width: "100%",
    // height: "55px",
    background: "rgba(255, 255, 255, 0.1)",
  },
}));

const Index: FC= () => {
  const {
    connector,
    library,
    chainId,
    account,
    activate,
    deactivate,
    active,
    error,
  } = useWeb3React();
  const web3context = useWeb3React();
  const navigate = useNavigate();

  const injected = new InjectedConnector({
    // supportedChainIds: [1, 4],
    supportedChainIds: supportedChains,
  });
  const getErrorMessage = (error:any) => {
    if (error instanceof NoEthereumProviderError) {
      return "No Ethereum browser extension detected, install MetaMask on desktop or visit from a dApp browser on mobile.";
    } else if (error instanceof UnsupportedChainIdError) {
      return "You're connected to an unsupported network.";
    } else if (
      error instanceof UserRejectedRequestErrorInjected ||
      error instanceof UserRejectedRequestErrorWalletConnect ||
      error instanceof UserRejectedRequestErrorFrame
    ) {
      return "Please authorize this website to access your Ethereum account.";
    } else {
      console.error(error);
      return "An unknown error occurred. Check the console for more details.";
    }
  };
  const reActivateWallet = useCallback(
    async (connector, onClose = () => {}) => {
      if (
        connector &&
        connector instanceof WalletConnectConnector 
        // connector.walletConnectProvider?.wc?.uri
        ) {
          connector.walletConnectProvider = undefined
        }
        try {
        let result = await web3context.activate(
          connector
            ? connector
            : new InjectedConnector({
                // supportedChainIds: [1, 4],
                supportedChainIds: supportedChains,
              }),
          undefined,
          true
        ).then(result=>{
          if(connector instanceof WalletConnectConnector){
            window.localStorage.setItem("previousWallet", "walletConnect");
          }
          else{
            window.localStorage.setItem("previousWallet", "metaMask");
          }
        })

        // handleClose();

      } catch (e) {
        // window.localStorage.setItem("previousWallet", "");
    }
    },
    [web3context]
  );
    const activateWallet = useCallback(
    async (connector, onClose = () => {}) => {
      if (
        connector &&
        connector instanceof WalletConnectConnector 
        // connector.walletConnectProvider?.wc?.uri
        ) {
          connector.walletConnectProvider = undefined
        }
        try {
        let result = await activate(
          connector
            ? connector
            : new InjectedConnector({
                // supportedChainIds: [1, 4],
                supportedChainIds: supportedChains,
              }),
          undefined,
          true
        ).then(result=>{
          if(connector instanceof WalletConnectConnector){
            window.localStorage.setItem("previousWallet", "walletConnect");
          }
          else{
            window.localStorage.setItem("previousWallet", "metaMask");
          }
        })

        // handleClose();
        // if(localStorage.getItem("previousWallet")){
        //   toast(<Notify text={"Wallet Connected Successfully"} severity="success" />, {
        //     position: "bottom-right",
        //     toastId:"connectSuccessfull"
        //   });
        // }
        // window.localStorage.setItem("previousWallet", "metaMask");
      } catch (e:any) {
        // window.localStorage.setItem("previousWallet", ""); 
        window.localStorage.removeItem("previousWallet");
        // await connector.close();
        console.log("hello error: ", e.message)
        
        if(e.message != "The user rejected the request."){
        const err = getErrorMessage(e);
        if (e.code == 4001) {
          window.localStorage.removeItem(
            "-walletlink:https://www.walletlink.org:version"
          );
          window.localStorage.removeItem(
            "-walletlink:https://www.walletlink.org:session:id"
          );
          window.localStorage.removeItem(
            "-walletlink:https://www.walletlink.org:session:secret"
          );
          window.localStorage.removeItem(
            "-walletlink:https://www.walletlink.org:session:linked"
          );
          window.localStorage.removeItem(
            "-walletlink:https://www.walletlink.org:walletUsername"
          );
          window.localStorage.removeItem(
            "-walletlink:https://www.walletlink.org:DefaultChainId"
          );
          window.localStorage.removeItem(
            "-walletlink:https://www.walletlink.org:Addresses"
          );

          window.localStorage.removeItem(
            "-walletlink:https://www.walletlink.org:IsStandaloneSigning"
          );
        }

        // if ( !(e instanceof UnsupportedChainIdError)) {  
        // if(!toast.isActive(toastId.current)) {
          // toast.update(toastId, {
          //   autoClose: 5000
          // });
          // toastId.current = toast(<Notify text={err} severity="error" />, {
          //   position: "bottom-right",
          //   autoClose:5000
          // });
          // toast(
          //   <Notify text={err} severity="error" />
          //   ,
          //   {
          //     position: "bottom-right",
          //     toastId:"connectSuccessfull"
          //   }
          // );
        // }   
      // }
    }
    }
    },
    [web3context]
  );
  return (
    <MainDiv>
    <Logo src={AppLogo} />
    <CustomButtons onClick={async ()=>{
      if (!(connector instanceof InjectedConnector)) {
                      await activateWallet(injected);
                    // }
                  } 
                }
              }>CONNECT</CustomButtons>
  </MainDiv>
);
};

export default Index;
