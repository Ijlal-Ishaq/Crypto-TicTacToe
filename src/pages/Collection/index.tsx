import { FC, useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import Web3 from "web3";
import { ABI } from "../../utils/contractABI";
import { useWeb3React } from "@web3-react/core";
import axios from "axios";

const MainDiv = styled("div")(({ theme }) => ({
  marginLeft: "auto",
  marginRight: "auto",
  display: "flex",
  flexDirection: "column",
  height: "100vh",
  overflowY: "scroll",
}));

const Heading = styled("div")(({ theme }) => ({
  marginLeft: "auto",
  marginRight: "auto",
  marginTop: "50px",
  fontSize: "30px",
  userSelect: "none",
  opacity: "0.3",

  [theme.breakpoints.down("sm")]: {
    marginTop: "75px",
  },
}));

const SubLayout = styled("div")(({ theme }) => ({
  width: "100%",
  display: "flex",
  flexDirection: "row",
  justifyContent: "center",
  padding: "30px",
  paddingTop: "20px",
  flexWrap: "wrap",
}));

const TokenCard = styled("div")(({ theme }) => ({
  width: "230px",
  height: "230px",
  background: "rgba(255, 255, 255, 0.03)",
  boxShadow: "0 0 1rem 0 rgba(0, 0, 0, .2)",
  backdropFilter: "blur(4px)",
  borderRadius: "5px",
  display: "flex",
  flexDirection: "column",
  padding: "15px",
  margin: "10px 15px",

  [theme.breakpoints.down("sm")]: {
    width: "95%",
    height: "fit-content",
  },
}));

const Index: FC = () => {
  const web3context = useWeb3React();
  const web3 = new Web3(web3context?.library?.currentProvider);
  const account = web3context.account;
  let [tickets, setTickets] = useState<any>([]);
  const [totalTickets, setTotalTickets] = useState(-1);

  useEffect(() => {
    getTokens();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [web3context]);

  const getTokens = async () => {
    setTickets([]);
    setTotalTickets(-1);
    if (account && web3) {
      const contract = new web3.eth.Contract(
        JSON.parse(ABI),
        "0x1B6FC2A8535bFf5f8425806FB9A884a881237faF"
      );
      const tokenCount = await contract.methods.balanceOf(account).call();
      setTotalTickets(parseInt(tokenCount));
      let token, URI, metadata;
      if (tokenCount) {
        for (let i = 0; i < parseInt(tokenCount); i++) {
          token = await contract.methods.tokenOfOwnerByIndex(account, i).call();
          URI = await contract.methods.tokenURI(parseInt(token)).call();
          metadata = await axios.get(URI);
          tickets = [...tickets, metadata.data.image];
        }
        setTickets(tickets);
      }
    }
  };

  return (
    <MainDiv>
      <Heading>YOUR COLLECTION</Heading>
      <SubLayout>
        {totalTickets === -1 ? (
          <Heading style={{ fontSize: "20px" }}>Loading...</Heading>
        ) : null}
        {totalTickets === 0 ? (
          <Heading style={{ fontSize: "20px" }}>
            You don't have any tokens.
          </Heading>
        ) : null}
        {tickets.map((e: any, i: any) => {
          return (
            <TokenCard key={i}>
              <img src={e} alt="" />
            </TokenCard>
          );
        })}
      </SubLayout>
    </MainDiv>
  );
};

export default Index;
