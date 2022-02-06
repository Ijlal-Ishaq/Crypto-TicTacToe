import Web3 from "web3";

export const conciseAddress = (address: string) => {
  if (Web3.utils.isAddress(address)) {
    return `${address.slice(0, 7)}.....${address.slice(
      address.length - 5,
      address.length
    )}`;
  }
  return "-";
};
