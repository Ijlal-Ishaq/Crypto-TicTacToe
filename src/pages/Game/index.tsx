import { FC } from "react";
import { styled } from "@mui/material/styles";

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
  opacity: "0.5",

  [theme.breakpoints.down("smd")]: {
    marginTop: "75px",
  },
}));

const GameBoard = styled("div")(({ theme }) => ({
  marginTop: "10px",
  marginBottom: "100px",
  marginLeft: "auto",
  marginRight: "auto",
  padding: "20px 30px",
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

const GameBlock = styled("div")(({ theme }) => ({
  height: "70px",
  width: "100%",
}));

const VerticalDivider = styled("div")(({ theme }) => ({
  height: "70px",
  width: "7px",
  backgroundColor: "rgba(255,255,255,0.3)",
}));

const getHeader = (turn: Number) => {
  return (
    <>
      <Heading>
        Non Fungible <br />
        TicTacToe
      </Heading>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          margin: "20px",
        }}
      >
        <Heading
          style={{
            display: "flex",
            flexDirection: "column",
            fontSize: "18px",
            margin: "0px",
            opacity: turn === 1 ? 0.5 : 0.1,
          }}
        >
          <div style={{ textAlign: "right" }}>Player 1</div>
          <div> 0x23e05...384</div>
        </Heading>

        <div
          style={{
            width: "2px",
            height: "100%",
            backgroundColor: "rgba(255,255,255,0.3)",
            margin: "0px 20px",
          }}
        ></div>

        <Heading
          style={{
            display: "flex",
            flexDirection: "column",
            fontSize: "18px",
            margin: "0px",
            opacity: turn === 2 ? 0.5 : 0.1,
          }}
        >
          <div style={{ textAlign: "left" }}>Player 2</div>
          <div> 0x23e05...384</div>
        </Heading>
      </div>
    </>
  );
};

const Index: FC = () => {
  return (
    <MainDiv>
      {getHeader(1)}
      <GameBoard>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            borderBottom: "solid 2px rgba(255,255,255,0.3)",
          }}
        >
          <GameBlock />
          <VerticalDivider />
          <GameBlock />
          <VerticalDivider />
          <GameBlock />
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            borderBottom: "solid 3px rgba(255,255,255,0.3)",
          }}
        >
          <GameBlock />
          <VerticalDivider />
          <GameBlock />
          <VerticalDivider />
          <GameBlock />
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <GameBlock />
          <VerticalDivider />
          <GameBlock />
          <VerticalDivider />
          <GameBlock />
        </div>
      </GameBoard>
    </MainDiv>
  );
};

export default Index;
