import { FC } from "react";
import { useRoutes, Navigate } from "react-router-dom";
import ConnectWallet from "../pages/ConnectWallet";
import Home from "../pages/Home";
import Lobby from "../pages/Lobby";
import Collection from "../pages/Collection";
import Info from "../pages/Info";
import Game from "../pages/Game";
import PageNotFound from "../pages/PageNotFound";

const Index: FC = () => {
  return useRoutes([
    {
      path: "/",
      children: [
        {
          path: "",
          element: <Navigate to={"/connectWallet"} />,
        },
        {
          path: "connectWallet",
          element: <ConnectWallet />,
        },
        {
          path: "home",
          element: <Home />,
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
          element: <PageNotFound />,
        },
      ],
    },
  ]);
};

export default Index;
