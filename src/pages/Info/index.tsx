import { FC } from "react";
import { styled } from "@mui/material/styles";

const MainDiv = styled("div")(({ theme }) => ({
  marginTop: "100px",
  marginBottom: "100px",
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

  [theme.breakpoints.down("sm")]: {
    width: "300px",
  },
}));

const Logo = styled("div")(({ theme }) => ({
  margin: "10px auto",
  fontSize: "50px",
}));

const Index: FC = () => {
  return (
    <MainDiv>
      <Logo>LOGO</Logo>
      <div style={{ fontSize: "13px" }}>
        Lorem Ipsum is simply dummy text of the printing and typesetting
        industry. Lorem Ipsum has been the industry's standard dummy text ever
        since the 1500s, when an unknown printer took a galley of type and
        scrambled it to make a type specimen book. It has survived not only five
        centuries, but also the leap into electronic typesetting, remaining
        essentially unchanged. It was popularised in the 1960s with the release
        of Letraset sheets containing Lorem Ipsum passages, and more recently
        with desktop publishing software like Aldus PageMaker including
        versions.
      </div>
    </MainDiv>
  );
};

export default Index;
