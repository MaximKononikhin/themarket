import styled from "styled-components";
import Link from "next/link";

import LogoIcon from "resources/logo.svg?sprite";
import LoopIcon from "resources/loop.svg?sprite";
import {css} from "styled-components";

export const Logo = styled(LogoIcon)`
    width: 80px;
    height: 12px;
`;

export const Header = styled.header`
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1;
    width: 100%;
    height: 70px;
    display: flex;
    align-items: center;
    border-bottom: 1px solid #d6e6e4;
`;

export const Container = styled.div`
  width: 1160px;
  margin: 0 auto;
  display: flex;
  align-items: center;
`;

export const InputWrapper = styled.div`
  margin-left: 20px;
  height: 40px;
  position: relative;
  border: 1px solid #979797;
  border-radius: 2px;
  margin-right: 10px;
  width: 350px;
`;

export const Input = styled.input`
  width: 100%;
  height: 100%;
  font-size: 15px;
  padding-left: 35px;
  padding-right: 10px;
  border: none;
  outline: none;
  font-size: 15px;
`;

export const Loop = styled(LoopIcon)`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  left: 10px;
`;

export const StyledLink = styled.a`
  font-size: 16px;
  color: #000;
  text-decoration: none;
  padding: 27px 10px;
  position: relative;
  text-align: center;
  
  :before {
    content: "";
    height: 2px;
    width: 100%;
    position: absolute;
    bottom: -1px;
  }
  
  :hover {
    :before {
      background: #000;
    }
  }
`;

export const LinksContainer = styled.div`
  margin-left: auto;
  display: flex;
  align-items: center;
`;

export const LoginButton = styled.button`
  font-size: 15px;
  color: #000;
  padding: 0;
  background: none;
  border: none;
  cursor: pointer;
`;

export const SellButton = styled(LoginButton)`
  width: 80px;
  line-height: 40px;
  margin-left: 10px;
  margin-right: 40px;
  background-color: #fff;
  border: 1px solid #000;
  font-size: 14px;
  border-radius: 2px;
  color: #000;
  cursor: pointer;
  transition: all .2s ease;
  
  :hover {
    background-color: #000;
    color: #fff;
  }
`