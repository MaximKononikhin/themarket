import styled from "styled-components";

export const Button = styled.button`
  min-width: 80px;
  line-height: 40px;
  background-color: #fff;
  border: 1px solid #000;
  font-size: 14px;
  border-radius: 2px;
  color: #000;
  cursor: pointer;
  transition: all 0.2s ease;

  :hover {
    background-color: #000;
    color: #fff;
  }
`;
