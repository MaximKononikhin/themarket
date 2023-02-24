import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

import "./styles/index.scss";

import { userModel } from "@entities/user";

import { withProviders } from "./providers";

const App = () => {
    const dispatch = useDispatch<AppDispatch>();

    const user = userModel.useUser();

    useEffect(() => {
        dispatch(userModel.getUser());
    }, [dispatch]);

    const handleCLick = () => {
        !user
            ? dispatch(
                userModel.loginUser({
                    email: "warelstupid@gmail.com",
                    password: "max200997",
                })
            )
            : dispatch(userModel.logoutUser());
    };

    return <div onClick={handleCLick}>{user?.name ?? "null"}</div>;
};

export default withProviders(<App />);
