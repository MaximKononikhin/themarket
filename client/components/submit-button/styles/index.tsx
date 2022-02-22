import styled, { keyframes } from "styled-components";

import { Button as BaseButton } from "components/button";

const skbouncedelay = keyframes`
  0%,
  80%,
  100% {
    -webkit-transform: scale(0);
    transform: scale(0);
  }
  40% {
    -webkit-transform: scale(1);
    transform: scale(1);
  }
`;

export const Button = styled(BaseButton)`
  width: 362px;
  height: 56px;
  margin-top: 50px;
  font-weight: 700;
`;

export const Spinner = styled.div`
  margin: 0 auto;
  width: 70px;
  text-align: center;

  div {
    width: 15px;
    height: 15px;
    background-color: #000;

    border-radius: 100%;
    display: inline-block;
    animation: ${skbouncedelay} 1.4s infinite ease-in-out both;
  }
`;

export const Bounce1 = styled.div`
  animation-delay: -0.32s !important;
`;

export const Bounce2 = styled.div`
  animation-delay: -0.16s !important;
`;
