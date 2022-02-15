import React, { useRef } from 'react';

import { Container } from "./styles";
import useOnClickOutside from 'lib/hooks/use-click-outside';
import ModalService from 'lib/modal-service';

const AuthModal = () => {
    const ref = useRef<HTMLDivElement>(null);
    useOnClickOutside(ref, ModalService.modalDone);

    return (
        <Container ref={ref}>
            ku
        </Container>
    );
};

export default AuthModal;