import Link from "next/link";
import React from "react";

import AuthModal from "blocks/auth-modal/auth-modal";
import { useAuth } from "lib/auth/auth-context";
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
  MessageLink,
  NoAvatarIcon,
  SellLink,
  StyledLink,
  UserContainer,
} from "./styles";

const PageTemplate: React.FC = ({ children }) => {
  const { user } = useAuth();

  const handleClick = () => ModalService.pushModal(<AuthModal />);

  const userContent = (
    <UserContainer>
      <MessageLink href="/">Сообщения</MessageLink>
      <NoAvatarIcon />
    </UserContainer>
  );

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
            <Link href="/add-item">
              <SellLink>Продать</SellLink>
            </Link>
            {user ? (
              userContent
            ) : (
              <LoginButton onClick={handleClick}>Войти</LoginButton>
            )}
          </LinksContainer>
        </Container>
      </Header>
      {children}
    </>
  );
};

export default PageTemplate;
