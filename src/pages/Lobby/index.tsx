import { FC } from "react";
import { styled } from "@mui/material/styles";
import OnlinePlayers from "./components/OnlinePlayers";
import GameRequests from "./components/GameRequests";

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
  justifyContent: "space-around",
  padding: "30px",
  paddingTop: "40px",

  [theme.breakpoints.down("sm")]: {
    padding: "19px",
    flexDirection: "column-reverse",
  },
}));

const SubDiv = styled("div")(({ theme }) => ({
  width: "45%",
  height: "fit-content",
  background: "rgba(255, 255, 255, 0.03)",
  boxShadow: "0 0 1rem 0 rgba(0, 0, 0, .2)",
  backdropFilter: "blur(4px)",
  borderRadius: "5px",
  display: "flex",
  flexDirection: "column",
  padding: "10px 20px",

  [theme.breakpoints.down("sm")]: {
    width: "100%",
    marginBottom: "20px",
  },
}));

const Index: FC = () => {
  return (
    <MainDiv>
      <Heading>GAME LOBBY</Heading>
      <SubLayout>
        <SubDiv>
          <OnlinePlayers />
        </SubDiv>
        <SubDiv>
          <GameRequests />
        </SubDiv>
      </SubLayout>
    </MainDiv>
  );
};

export default Index;
