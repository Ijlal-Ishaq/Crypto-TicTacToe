import { FC } from "react";
import { styled } from "@mui/material/styles";

const MainDiv = styled("div")(({ theme }) => ({
  marginLeft: "auto",
  marginRight: "auto",
  width: "100%",
}));

const Heading = styled("div")(({ theme }) => ({
  color: "#fff",
  fontSize: "17px",
  textAlign: "left",
  padding: "7px",
  opacity: "0.3",
}));

const PlayerDiv = styled("div")(({ theme }) => ({
  width: "100%",
  height: "50px",
  padding: "7px 15px",
  border: "none",
  background: "rgba(255, 255, 255, 0.03)",
  boxShadow: "0 0 1rem 0 rgba(0, 0, 0, .2)",
  backdropFilter: "blur(4px)",
  borderRadius: "5px",
  marginBottom: "9px",
  display: "flex",
  fontSize: "15px",
  alignItems: "center",
}));

const Play = styled("div")(({ theme }) => ({
  padding: "7px 10px",
  border: "none",
  background: "rgba(255, 255, 255, 0.03)",
  boxShadow: "0 0 1rem 0 rgba(0, 0, 0, .2)",
  backdropFilter: "blur(4px)",
  borderRadius: "5px",
  fontSize: "15px",
  fontWeight: "300",
  marginLeft: "auto",
  cursor: "pointer",
  userSelect: "none",
  opacity: "0.7",

  "&:hover": {
    // width: "100%",
    // height: "55px",
    background: "rgba(255, 255, 255, 0.1)",
  },
}));
const Index: FC = () => {
  const players = [
    "0x23e05938b4619035870836D22C4Ef9988623c384",
    "0x23e05938b4619035870836D22C4Ef9988623c384",
    "0x23e05938b4619035870836D22C4Ef9988623c384",
    "0x23e05938b4619035870836D22C4Ef9988623c384",
    "0x23e05938b4619035870836D22C4Ef9988623c384",
  ];
  return (
    <MainDiv>
      <Heading>Requests</Heading>
      {players.map((player, i) => {
        return (
          <PlayerDiv key={i}>
            <div
              style={{
                flex: 1,
                overflow: "hidden",
                textAlign: "left",
                opacity: "0.7",
              }}
            >
              {player}
            </div>
            <Play>Play</Play>
          </PlayerDiv>
        );
      })}
    </MainDiv>
  );
};

export default Index;
