import { FC, useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import OnlinePlayers from "./components/OnlinePlayers";
import GameRequests from "./components/GameRequests";
import { socketUrl } from "../../utils/urls";
import { io } from "socket.io-client";
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
  opacity: "0.3",

  [theme.breakpoints.down("smd")]: {
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

  [theme.breakpoints.down("smd")]: {
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

  [theme.breakpoints.down("smd")]: {
    width: "570px",
    marginLeft: "auto",
    marginRight: "auto",
    marginBottom: "20px",
  },

  [theme.breakpoints.down("sm")]: {
    width: "100%",
    marginBottom: "20px",
  },
}));

const Index: FC = () => {
  const { account } = useWeb3React();

  let [onlinePlayers, setOnlinePlayers] = useState<string[] | [] | any>([]);
  let [requestPlayers, setRequestPlayers] = useState<string[] | [] | any>([]);

  const socket = io(socketUrl);

  useEffect(() => {
    if (socket && account) {
      socket.on("connect", function () {
        socket.emit("join", account);

        socket.on("getOnlineUsers", (users: { [key: string]: string }) => {
          // eslint-disable-next-line react-hooks/exhaustive-deps
          onlinePlayers = [];
          Object.keys(users).map(function (key, index) {
            //@ts-ignore
            if (
              !onlinePlayers?.includes(users[key]) &&
              users[key] !== account
            ) {
              //@ts-ignore
              onlinePlayers?.push(users[key]);
            }
            return null;
          });
          setOnlinePlayers([...onlinePlayers]);
        });

        socket.on("playRequests", (user) => {
          console.log("AAA", user);
          // eslint-disable-next-line react-hooks/exhaustive-deps
          requestPlayers = [];
          //@ts-ignore
          if (!requestPlayers?.includes(user)) {
            //@ts-ignore
            console.log("AAA", user);

            requestPlayers?.push(user);
            setRequestPlayers([...requestPlayers]);
          }
        });
      });
    }
    return;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [account]);

  const requestPlay = (player: string) => {
    if (socket && player !== "") {
      socket.emit("requestPlay", player);
    }
  };

  const play = (player: string) => {
    if (socket && player !== "") {
      console.log(player);
      socket.emit("requestPlay", player);
    }
  };

  return (
    <MainDiv>
      <Heading>GAME LOBBY</Heading>
      <SubLayout>
        <SubDiv>
          <OnlinePlayers players={onlinePlayers} requestPlay={requestPlay} />
        </SubDiv>
        <SubDiv>
          <GameRequests players={requestPlayers} play={play} />
        </SubDiv>
      </SubLayout>
    </MainDiv>
  );
};

export default Index;
