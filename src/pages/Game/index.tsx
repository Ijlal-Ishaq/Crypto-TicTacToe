/* eslint-disable eqeqeq */
import { FC, useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import { ref, onValue } from "firebase/database";
import { database } from "../../utils/firebase";
import { concisePlayerAddress } from "../../utils/formattingFunctions";
import axios from "axios";
import { baseUrl } from "../../utils/urls";
import { useWeb3React } from "@web3-react/core";

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
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  cursor: "pointer",
}));

const VerticalDivider = styled("div")(({ theme }) => ({
  height: "70px",
  width: "7px",
  backgroundColor: "rgba(255,255,255,0.3)",
}));

const getHeader = (turn: string, players: any) => {
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
            opacity: turn === players["player1"] ? 0.5 : 0.1,
          }}
        >
          <div style={{ textAlign: "right" }}>Player 1</div>
          <div>{concisePlayerAddress(players["player1"], 7)}</div>
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
            opacity: turn === players["player2"] ? 0.5 : 0.1,
          }}
        >
          <div style={{ textAlign: "left" }}>Player 2</div>
          <div>{concisePlayerAddress(players["player2"], 7)}</div>
        </Heading>
      </div>
    </>
  );
};

const Index: FC = () => {
  const [gameId, setGameId] = useState("");
  const [connectionKey, setConnectionKey] = useState("");
  const [turn, setTurn] = useState("");
  const { account } = useWeb3React();
  const [players, setPlayers] = useState({
    player1: ".....",
    player2: ".....",
  });
  const [gameBoard, setGameBoard] = useState({
    "1": "-",
    "2": "-",
    "3": "-",
    "4": "-",
    "5": "-",
    "6": "-",
    "7": "-",
    "8": "-",
    "9": "-",
  });

  const makeAMove = async (position: string) => {
    if (
      gameId !== "" &&
      connectionKey !== "" &&
      position !== "" &&
      turn == account
    ) {
      //@ts-ignore
      setGameBoard((board) => ({
        ...board,
        [position]: players.player1 == account ? "0" : "1",
      }));
      await axios.get(
        baseUrl +
          "/nfttt/" +
          "makeAMove/" +
          gameId +
          "/" +
          connectionKey +
          "/" +
          position
      );
    }
  };

  useEffect(() => {
    onValue(ref(database, "/gamesRoom/" + gameId), (data) => {
      if (data.val()["player1"]) {
        setPlayers({
          player1: data.val()["player1"],
          player2: data.val()["player2"],
        });
        setTurn(data.val()["turn"]);
        setGameBoard({
          "1": data.val()["board"]["1"],
          "2": data.val()["board"]["2"],
          "3": data.val()["board"]["3"],
          "4": data.val()["board"]["4"],
          "5": data.val()["board"]["5"],
          "6": data.val()["board"]["6"],
          "7": data.val()["board"]["7"],
          "8": data.val()["board"]["8"],
          "9": data.val()["board"]["9"],
        });
      }
    });
  }, [gameId]);

  useEffect(() => {
    setGameId(window.location.href.split("/")[4]);
    setConnectionKey(window.location.href.split("/")[5]);
  }, []);

  return (
    <MainDiv>
      {getHeader(turn, players)}
      <GameBoard>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            borderBottom: "solid 2px rgba(255,255,255,0.3)",
          }}
        >
          <GameBlock
            onClick={() => {
              makeAMove("1");
            }}
          >
            {gameBoard[1] == "0" ? "O" : gameBoard[1] == "1" ? "X" : null}
          </GameBlock>
          <VerticalDivider />
          <GameBlock
            onClick={() => {
              makeAMove("2");
            }}
          >
            {gameBoard[2] == "0" ? "O" : gameBoard[2] == "1" ? "X" : null}
          </GameBlock>
          <VerticalDivider />
          <GameBlock
            onClick={() => {
              makeAMove("3");
            }}
          >
            {gameBoard[3] == "0" ? "O" : gameBoard[3] == "1" ? "X" : null}
          </GameBlock>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            borderBottom: "solid 3px rgba(255,255,255,0.3)",
          }}
        >
          <GameBlock
            onClick={() => {
              makeAMove("4");
            }}
          >
            {gameBoard[4] == "0" ? "O" : gameBoard[4] == "1" ? "X" : null}
          </GameBlock>
          <VerticalDivider />
          <GameBlock
            onClick={() => {
              makeAMove("5");
            }}
          >
            {gameBoard[5] == "0" ? "O" : gameBoard[5] == "1" ? "X" : null}
          </GameBlock>
          <VerticalDivider />
          <GameBlock
            onClick={() => {
              makeAMove("6");
            }}
          >
            {gameBoard[6] == "0" ? "O" : gameBoard[6] == "1" ? "X" : null}
          </GameBlock>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <GameBlock
            onClick={() => {
              makeAMove("7");
            }}
          >
            {gameBoard[7] == "0" ? "O" : gameBoard[7] == "1" ? "X" : null}
          </GameBlock>
          <VerticalDivider />
          <GameBlock
            onClick={() => {
              makeAMove("8");
            }}
          >
            {gameBoard[8] == "0" ? "O" : gameBoard[8] == "1" ? "X" : null}
          </GameBlock>
          <VerticalDivider />
          <GameBlock
            onClick={() => {
              makeAMove("9");
            }}
          >
            {gameBoard[9] == "0" ? "O" : gameBoard[9] == "1" ? "X" : null}
          </GameBlock>
        </div>
      </GameBoard>
    </MainDiv>
  );
};

export default Index;
