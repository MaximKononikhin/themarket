import styled, { keyframes } from "styled-components";

const fade = keyframes`
  from {
    transform: translateX(100%);
  } 
  to {
    transform: translateX(50%);
  }
`

export const Container = styled.div`
  width: 50%;
  height: 100%;
  background: #FFFFFF;
  animation: ${fade} .2s ease;
  transform: translateX(50%);
`;