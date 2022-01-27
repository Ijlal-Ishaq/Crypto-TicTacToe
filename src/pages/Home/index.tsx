import { FC } from "react";
import { styled } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";

const MainDiv = styled("div")(({ theme }) => ({
  marginTop: "100px",
  marginLeft: "auto",
  marginRight: "auto",
  padding: "50px 30px",
  background: "rgba(255, 255, 255, 0.03)",
  boxShadow: "0 0 1rem 0 rgba(0, 0, 0, .2)",
  backdropFilter: "blur(4px)",
  borderRadius: "5px",
  width: "350px",
  height: "fit-content",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
}));

const Logo = styled("div")(({ theme }) => ({
  margin: "10px auto",
  fontSize: "50px",
}));

const CustomButtons = styled("div")(({ theme }) => ({
  background: "rgba(255, 255, 255, 0.03)",
  boxShadow: "0 0 1rem 0 rgba(0, 0, 0, .2)",
  backdropFilter: "blur(4px)",
  borderRadius: "5px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  cursor: "pointer",
  width: "95%",
  height: "50px",
  color: "rgba(255,255,255,0.8)",
  fontSize: "15px",
  marginTop: "20px",
  marginLeft: "auto",
  marginRight: "auto",
  userSelect: "none",

  "&:hover": {
    width: "100%",
    height: "55px",
  },
}));

const Index: FC = () => {
  const navigate = useNavigate();
  return (
    <MainDiv>
      <Logo>LOGO</Logo>
      <CustomButtons onClick={() => navigate("/lobby")}>
        GAME LOBBY
      </CustomButtons>
      <CustomButtons onClick={() => navigate("/collection")}>
        COLLECTION
      </CustomButtons>
      <CustomButtons onClick={() => navigate("/info")}>
        HOW IT WORKS?
      </CustomButtons>
    </MainDiv>
  );
};

export default Index;