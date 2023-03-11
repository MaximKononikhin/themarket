import React from "react";

import "./styles/index.scss";

import { Header } from "@widgets/header";
import { AuthModal } from "@features/auth-modal";

const App = () => {
    return (
        <>
            <Header />
            <AuthModal />
        </>
    );
};

export default App;
