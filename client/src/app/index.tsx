import React, { useEffect } from "react";

import "./styles/index.scss";

import { Header } from "@widgets/header";
import { AuthModal } from "@features/auth-modal";
import { userModel } from "@entities/user";

const App = () => {
    useEffect(() => {
        userModel.events.getUser();
    }, []);

    return (
        <>
            <Header />
            <AuthModal />
        </>
    );
};

export default App;
