import assert from 'assert';
import { useRouter } from 'next/router';
import React, {ReactNode, useEffect, useState } from 'react';

import ModalService from 'lib/modal-service';
import styled, { css } from 'styled-components';

const ModalContainer = styled.div`
  display: none;
`

const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0,0,0,.4);
  width: 100%;
  height: 100%;
  z-index: 10;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: auto;
`

const ModalProvider = () => {
    const [currentModal, setCurrentModal] = useState<ReactNode>(null);
    const router = useRouter();

    const handleOpenModal = () => {
        const modal = document.getElementById("modal");
        const content = document.getElementById("content");
        assert(modal);
        assert(content);
        const top = window.scrollY;
        const left = window.scrollX;
        modal.style.display = "block";
        modal.scrollTo(0, 1);
        content.style.position = "fixed";
        content.style.top = "0";
        content.style.left = "0";
        content.style.bottom = "0";
        content.style.right = "0";
        content.style.zIndex = "-1";
        content.style.overflow = "auto";
        content.scrollTo(left, top);
        setCurrentModal(ModalService.getModal());
    };

    const handleCloseModal = () => {
        const modal = document.getElementById("modal");
        const content = document.getElementById("content");
        assert(modal);
        assert(content);
        const top = content.scrollTop;
        const left = content.scrollLeft;

        modal.style.display = "none";
        content.style.removeProperty("position");
        content.style.removeProperty("top");
        content.style.removeProperty("left");
        content.style.removeProperty("z-index");
        content.style.removeProperty("overflow");
        window.scrollTo(left, top);
        setCurrentModal(null);
    };

    useEffect(() => {
        window.addEventListener("openmodal", handleOpenModal);
        window.addEventListener("closemodal", handleCloseModal);

        return () => {
            window.removeEventListener("openmodal", handleOpenModal);
            window.removeEventListener("closemodal", handleCloseModal);
        };
    }, []);

    useEffect(() => {
        if (ModalService.getModal()) {
            const content = document.getElementById("content");
            assert(content);
            content.scrollTo(0, 0);
            ModalService.modalDone();
        }
    }, [router.asPath]);

    return (
        <ModalContainer id="modal">
            <Container id="modal_content">{currentModal}</Container>
        </ModalContainer>
    );

};

export default ModalProvider;