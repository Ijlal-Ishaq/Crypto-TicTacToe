import { FC } from "react";
import { styled } from "@mui/material/styles";
import NFTLogo from "../../assets/images/NFTlogo.png";

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
  paddingTop: "40px",
  flexWrap: "wrap",
}));

const TokenCard = styled("div")(({ theme }) => ({
  width: "250px",
  height: "250px",
  background: "rgba(255, 255, 255, 0.03)",
  boxShadow: "0 0 1rem 0 rgba(0, 0, 0, .2)",
  backdropFilter: "blur(4px)",
  borderRadius: "5px",
  display: "flex",
  flexDirection: "column",
  padding: "15px",
  margin: "10px 15px",
}));

const Index: FC = () => {
  return (
    <MainDiv>
      <Heading>YOUR COLLECTION</Heading>
      <SubLayout>
        <TokenCard>
          <img src={NFTLogo} alt="" />
        </TokenCard>
        <TokenCard>
          <img src={NFTLogo} alt="" />
        </TokenCard>
        <TokenCard>
          <img src={NFTLogo} alt="" />
        </TokenCard>
        <TokenCard>
          <img src={NFTLogo} alt="" />
        </TokenCard>
        <TokenCard>
          <img src={NFTLogo} alt="" />
        </TokenCard>
        <TokenCard>
          <img src={NFTLogo} alt="" />
        </TokenCard>
        <TokenCard>
          <img src={NFTLogo} alt="" />
        </TokenCard>
      </SubLayout>
    </MainDiv>
  );
};

export default Index;
