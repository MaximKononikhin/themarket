import React, { useEffect } from "react";

import "./styles/index.scss";

import { userModel } from "@entities/user";

const App = () => {
    const user = userModel.selectors.useUser();

    useEffect(() => {
        userModel.events.getUser();
    }, []);

    return <div>{user?.name ?? "null"}</div>;
};

export default App;
