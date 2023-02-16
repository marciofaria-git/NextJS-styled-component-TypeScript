import styled from "styled-components";
import * as S from "@/styles/Home.styles";

const MyTitleStyled = styled.h1`
  color: blue;
  font-size: 3.2rem;
`;

export default function Home() {
  return (
    <>
      <MyTitleStyled>Hello</MyTitleStyled>
      <S.MyFirstComponentTitle>Hello</S.MyFirstComponentTitle>
    </>
  );
}
