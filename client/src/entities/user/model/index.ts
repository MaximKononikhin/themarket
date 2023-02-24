import { useSelector } from "react-redux";

import {
    AnyAction,
    createAsyncThunk,
    createSlice,
    PayloadAction,
} from "@reduxjs/toolkit";

import {
    AuthService,
    CreateUserDto,
    LoginUserDto,
    UserEntity,
} from "@shared/api";
import { REJECTED_POSTFIX } from "@shared/lib";
import { IError, Maybe } from "@shared/types";

import {
    GET_USER,
    LOGIN_USER,
    LOGOUT_USER,
    REGISTER_USER,
    USER_PREFIX,
} from "./actions";

type UserState = {
    profile: Maybe<UserEntity>;
    isLoading: boolean;
    error: Maybe<IError, undefined>;
};

const initialState: UserState = {
    profile: null,
    isLoading: true,
    error: undefined,
};

export const getUser = createAsyncThunk<
    UserEntity,
    void,
    { rejectValue: IError }
>(GET_USER, async (_, { rejectWithValue }) => {
    try {
        return await AuthService.authControllerAuthenticate();
    } catch (err: any) {
        return rejectWithValue({
            message: err.body.message,
            statusCode: err.body.statusCode,
        });
    }
});

export const loginUser = createAsyncThunk(
    LOGIN_USER,
    async (data: LoginUserDto, { dispatch, rejectWithValue }) => {
        try {
            await AuthService.authControllerSignIn(data);
            dispatch(getUser());
        } catch (err: any) {
            return rejectWithValue({
                message: err.body.message,
                statusCode: err.body.statusCode,
            });
        }
    }
);

export const registerUser = createAsyncThunk(
    REGISTER_USER,
    async (data: CreateUserDto, { dispatch, rejectWithValue }) => {
        try {
            await AuthService.authControllerSignUp(data);
            await AuthService.authControllerSignIn(data);
            dispatch(getUser());
        } catch (err: any) {
            return rejectWithValue({
                message: err.body.message,
                statusCode: err.body.statusCode,
            });
        }
    }
);

export const logoutUser = createAsyncThunk(
    LOGOUT_USER,
    async () => await AuthService.authControllerLogOut()
);

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getUser.fulfilled, (state, { payload }) => {
                state.profile = payload;
                state.isLoading = false;
                state.error = undefined;
            })
            .addCase(logoutUser.fulfilled, (state) => {
                state.profile = null;
            })
            .addMatcher(
                (action: AnyAction) =>
                    action.type.startsWith(USER_PREFIX) &&
                    action.type.endsWith(REJECTED_POSTFIX),
                (state, { payload }: PayloadAction<IError>) => {
                    state.error = payload;
                    state.isLoading = false;
                }
            );
    },
});

export const { reducer } = userSlice;

export const useUser = () =>
    useSelector<RootState, Maybe<UserEntity>>((state) => state.user.profile);

export const useError = () =>
    useSelector<RootState, Maybe<IError, undefined>>(
        (state) => state.user.error
    );

export const useLoading = () =>
    useSelector<RootState, boolean>((state) => state.user.isLoading);
