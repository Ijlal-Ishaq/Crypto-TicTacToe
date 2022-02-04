import { FC } from "react";
import { useRoutes, Navigate, useNavigate } from "react-router-dom";
import ConnectWallet from "../pages/ConnectWallet";
import Home from "../pages/Home";
import Lobby from "../pages/Lobby";
import Collection from "../pages/Collection";
import Info from "../pages/Info";
import Game from "../pages/Game";
import PageNotFound from "../pages/PageNotFound";
import { useWeb3React } from "@web3-react/core";

const Index: FC = () => {
  const {account} = useWeb3React();
  const navigate = useNavigate();
  console.log(account,"account");
  return useRoutes([
    {
      path: "/",
      children: (account)?[
        {
          path: "home",
          element: <Home />,
        },
        {
          path: "connectWallet",
          element: account?<Navigate to={"/home"} />:<ConnectWallet />,
        },
        {
          path: "lobby",
          element: <Lobby />,
        },
        {
          path: "collection",
          element: <Collection />,
        },
        {
          path: "info",
          element: <Info />,
        },
        {
          path: "game",
          element: <Game />,
        },
        {
          path: "*",
          element: (account)?<PageNotFound />:<ConnectWallet />,
        },
      ]:[
        {
          path: "connectWallet",
          element: account?<Home />:<ConnectWallet />,
        },
        {
          path: "*",
          element: (account)?<PageNotFound />:<ConnectWallet />,
        },
      ],
    },
  ]);
};

export default Index;
