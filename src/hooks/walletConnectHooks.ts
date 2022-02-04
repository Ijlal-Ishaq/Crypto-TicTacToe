import { useState, useEffect } from "react";
import { useWeb3React } from "@web3-react/core";

import { injected, walletconnect } from "../utils/web3Connectors";

import { WalletConnectConnector } from "@web3-react/walletconnect-connector";
import { FortmaticConnector } from "@web3-react/fortmatic-connector";

export function useEagerConnect() {
  const { activate, active } = useWeb3React();

  const [tried, setTried] = useState(false);

  useEffect(() => {
    injected.isAuthorized().then((isAuthorized:any) => {
      if (isAuthorized) {
        if(localStorage.getItem("previousWallet") == "metaMask"){
          activate(injected, undefined, true).catch(() => {
            setTried(true);
          });
        }
        else if(localStorage.getItem("previousWallet") == "walletConnect"){
          activate(walletconnect, undefined, true).catch(() => {
            setTried(true);
          });
        }
      } else {
        setTried(true);
      }
    });
  }, []); // intentionally only running on mount (make sure it's only mounted once :))

  // if the connection worked, wait until we get confirmation of that to flip the flag
  useEffect(() => {
    if (!tried && active) {
      setTried(true);
    }
  }, [tried, active]);

  return tried;
}

export function useInactiveListener(suppress = false) {
  const { active, error, activate } = useWeb3React();

  useEffect(() => {
    const { ethereum } = window as any;
    let wallet = window.localStorage.getItem("previousWallet");
    if (ethereum && ethereum.on && !active && !error && !suppress) {
      const handleConnect = () => {
        if(wallet !=null){
          activate(injected, null as any, true);
        }
        // activate(injected, null, true);
      };
      const handleChainChanged = (chainId: number) => {
        if(wallet !=null){
          activate(injected, null as any, true);
        }
      };
      const handleAccountsChanged = (accounts:string) => {
        if(wallet !=null){
          if (accounts.length > 0) {
            activate(injected, null as any, true);
          }
        }
      };
      const handleNetworkChanged = (networkId: number) => {
        if(wallet !=null){
          activate(injected, null as any, true);
        }
      };

      ethereum.on("connect", handleConnect);
      ethereum.on("chainChanged", handleChainChanged);
      ethereum.on("accountsChanged", handleAccountsChanged);
      ethereum.on("networkChanged", handleNetworkChanged);

      return () => {
        if (ethereum.removeListener) {
          ethereum.removeListener("connect", handleConnect);
          ethereum.removeListener("chainChanged", handleChainChanged);
          ethereum.removeListener("accountsChanged", handleAccountsChanged);
          ethereum.removeListener("networkChanged", handleNetworkChanged);
        }
      };
    }
  }, [active, error, suppress, activate]);
}

export const useActivateWallet = () => {
  const { activate } = useWeb3React();
  return async (connector: any, onClose = () => {}) => {
    try {
      if (
        connector instanceof WalletConnectConnector &&
        connector.walletConnectProvider?.wc?.uri
      ) {
        connector.walletConnectProvider = undefined;
      } else if (connector instanceof FortmaticConnector) {
        onClose();
      }
      try {
        await activate(connector ? connector : injected, undefined, true);
      } catch (e) {
        await activate(connector ? connector : injected, undefined, true);
      }
    } catch (e) {
    }
  };
};
