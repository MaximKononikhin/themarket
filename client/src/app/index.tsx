import React from "react";

import styled from "styled-components";

import { GlobalStyles } from "./styles";

const Title = styled.h1`
    font-size: 1.5em;
    text-align: center;
    color: #bf4f74;
    margin: 0;
`;

const App = () => {
    return (
        <>
            <GlobalStyles />
            <Title>q</Title>
        </>
    );
};

export default App;
