import Link from "next/link";
import React from "react";

import AuthModal from "blocks/auth-modal/auth-modal";
import ModalService from "lib/modal-service";

import {
  Container,
  Header,
  Input,
  InputWrapper,
  LinksContainer,
  LoginButton,
  Logo,
  Loop,
  SellButton,
  StyledLink,
} from "./styles";

const PageTemplate: React.FC = ({ children }) => {
  const handleClick = () => ModalService.pushModal(<AuthModal />);
  return (
    <>
      <Header>
        <Container>
          <Link href="/">
            <a>
              <Logo />
            </a>
          </Link>
          <InputWrapper>
            <Loop />
            <Input placeholder="Поиск" />
          </InputWrapper>
          <StyledLink href="/">Мужское</StyledLink>
          <StyledLink href="/">Женское</StyledLink>
          <LinksContainer>
            <SellButton>Продать</SellButton>
            <LoginButton onClick={handleClick}>Войти</LoginButton>
          </LinksContainer>
        </Container>
      </Header>
      {children}
    </>
  );
};

export default PageTemplate;
