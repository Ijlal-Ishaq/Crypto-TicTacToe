import { FC, Key, useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import { socketUrl } from "../../../../utils/urls";
import { io } from "socket.io-client";
import { useWeb3React } from "@web3-react/core";

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

const SearchPlayer = styled("input")(({ theme }) => ({
  width: "100%",
  height: "50px",
  padding: "7px 15px",
  border: "none",
  background: "rgba(255, 255, 255, 0.03)",
  boxShadow: "0 0 1rem 0 rgba(0, 0, 0, .2)",
  backdropFilter: "blur(4px)",
  borderRadius: "5px",
  outline: "none",
  fontSize: "15px",
  color: "#fff",
  marginBottom: "9px",
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

const PlayRequest = styled("div")(({ theme }) => ({
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
  const { account } = useWeb3React();
  const [players, setPlayers] = useState<string[] | []>([]);

  useEffect(() => {
    const socket = io(socketUrl);
    if (socket && account) {
      socket.on("connect", function () {
        socket.emit("join", account);
        socket.on("getOnlineUsers", (users) => {
          Object.keys(users).map(function (key, index) {
            //@ts-ignore
            if (!players?.includes(users[key])) {
              //@ts-ignore
              players?.push(users[key]);
            }
            return null;
          });
          console.log(players);
          setPlayers([...players]);
        });
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <MainDiv>
      <Heading>Search</Heading>
      <SearchPlayer placeholder="Enter address..." />
      <Heading>Online Players</Heading>
      {players.length === 0 ? (
        <div style={{ margin: "30px 10px", opacity: "0.3" }}>
          No online players, invite your friends.
        </div>
      ) : null}
      {players?.map((player: any, i: Key | null | undefined) => {
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
            <PlayRequest>Request</PlayRequest>
          </PlayerDiv>
        );
      })}
    </MainDiv>
  );
};

export default Index;
