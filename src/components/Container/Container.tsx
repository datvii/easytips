import React from "react";
import { Container } from '../styled-compopents';

interface IProps {
  children: React.ReactNode;
}

const MainContainer = ({
    children,
}: IProps) => {
  return <Container className="container">{ children }</Container>;
};

export default MainContainer;