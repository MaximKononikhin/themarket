import { configureStore } from "@reduxjs/toolkit";

import { userModel } from "@entities/user";

export const store = configureStore({
    reducer: {
        user: userModel.reducer,
    },
});
