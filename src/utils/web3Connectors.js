export const walletconnect = new WalletConnectConnector({
    supportedChainIds:supportedChains,
    rpc: {
      4: URL_INFURA_RINKEBY,
      97: URL_INFURA_BSCTESTNET,
      1:URL_INFURA_MAINNET,
      56:URL_INFURA_BSCMAINNET
    },
    qrcode: true,
  });
  
  
  export const injected = new InjectedConnector({
    // supportedChainIds: [1, 4],
    supportedChainIds: supportedChains,
  });