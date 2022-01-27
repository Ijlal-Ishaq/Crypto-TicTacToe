import { FC } from "react";
import { styled } from "@mui/material/styles";

const MainDiv = styled("div")(({ theme }) => ({
  marginLeft: "auto",
  marginRight: "auto",
}));

const Index: FC = () => {
  return <MainDiv>Lobby</MainDiv>;
};

export default Index;
