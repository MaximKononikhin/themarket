import Link from 'next/link';
import React from 'react';

import {
    Container,
    Header as LogoHeader,
    Logo
} from "../page-template/styles";

const Header = () => {
    return (
        <LogoHeader>
            <Container>
                <Link href="/">
                    <a>
                        <Logo />
                    </a>
                </Link>
            </Container>
        </LogoHeader>
    );
};

export default Header;