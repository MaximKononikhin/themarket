import React from "react";

import "./styles/index.scss";

import { AuthModal, headerModel } from "@widgets/header";
import { userModel } from "@entities/user";
import { Button } from "@shared/components";

const App = () => {
    const user = userModel.selectors.useUser();
    
    return (
        <>
            {user ? (
                user.name
            ) : (
                <Button
                    onClick={() => {
                        headerModel.events.openAuthModal();
                    }}
                >
                    da
                </Button>
            )}
            <AuthModal />
        </>
    );
};

export default App;
