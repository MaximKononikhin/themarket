import React, { useEffect } from "react";

import "./styles/index.scss";

import { Pages } from "@pages";
import { Header } from "@widgets/header";
import { AuthModal } from "@features/auth-modal";
import { userModel } from "@entities/user";

import { withProviders } from "./providers";

const App = () => {
    useEffect(() => {
        userModel.events.getUser();
    }, []);

    return (
        <>
            <Header />
            <Pages />
            <AuthModal />
        </>
    );
};

export default withProviders(App);
