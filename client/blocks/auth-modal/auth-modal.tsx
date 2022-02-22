import React, { useRef } from "react";

import LoginForm from "blocks/login-form";
import RegistrationForm from "blocks/registration-form";
import useOnClickOutside from "lib/hooks/use-click-outside";
import ModalService from "lib/modal-service";

import { Container, CrossIcon, Header, Heading, Wrapper } from "./styles";

const AuthModal = () => {
  const ref = useRef<HTMLDivElement>(null);
  useOnClickOutside(ref, ModalService.modalDone);

  return (
    <Container ref={ref}>
      <Header>
        <Heading>Авторизация</Heading>
        <CrossIcon onClick={ModalService.modalDone} />
      </Header>
      <Wrapper>
        <LoginForm />
        <RegistrationForm />
      </Wrapper>
    </Container>
  );
};

export default AuthModal;
