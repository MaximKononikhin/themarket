import styled, { keyframes } from "styled-components";

import Cross from "resources/icons/cross.svg?sprite";

const fade = keyframes`
  from {
    transform: translateX(100%);
  } 
  to {
    transform: translateX(50%);
  }
`;

export const Container = styled.div`
  width: 50%;
  height: 100%;
  background: #ffffff;
  animation: ${fade} 0.2s ease;
  transform: translateX(50%);
`;

export const Header = styled.header`
  width: 100%;
  height: 70px;
  margin: 0 0 30px;
  border-bottom: 1px solid #d6e6e4;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 50px;
`;

export const Heading = styled.h3`
  font-size: 30px;
  line-height: 113%;
  font-weight: normal;
  color: #000000;
`;

export const CrossIcon = styled(Cross)`
  width: 13px;
  height: 13px;
  cursor: pointer;
`;

export const Wrapper = styled.div`
  padding: 0 50px;
  display: flex;
  flex-direction: column;
`;
