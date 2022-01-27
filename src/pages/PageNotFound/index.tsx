import { FC } from "react";
import { styled } from "@mui/material/styles";

const MainDiv = styled("div")(({ theme }) => ({
  marginLeft: "auto",
  marginRight: "auto",
  color: "#fff",
  marginTop: "50px",
  fontSize: "30px",
}));

const Index: FC = () => {
  return (
    <MainDiv>
      404 <br /> Page not found!
    </MainDiv>
  );
};

export default Index;
