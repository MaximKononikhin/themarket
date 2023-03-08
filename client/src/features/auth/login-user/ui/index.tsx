import React from "react";
import { useForm } from "react-hook-form";

import { yupResolver } from "@hookform/resolvers/yup";

import { LoginUserDto } from "@shared/api";
import { Button, Group, Input, Typography } from "@shared/components";

import { loginUserDefaultValues, loginUserSchema } from "../lib";
import { events, selectors } from "../model";
import styles from "./index.module.scss";

export const Form = () => {
    const {
        handleSubmit,
        register,
        formState: { errors },
    } = useForm<LoginUserDto>({
        defaultValues: loginUserDefaultValues,
        resolver: yupResolver(loginUserSchema),
    });

    const isLoading = selectors.useLoginUserLoading();
    const error = selectors.useLoginUserError();

    const onSubmit = (data: LoginUserDto) => {
        events.loginUser(data);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
            <Group direction="column" gap={20} width="100%">
                <Group direction="column" gap={12} width="100%">
                    <Typography type="header-1">Вход на маркетплейс</Typography>
                    {error && (
                        <Typography type="error">
                            {error.body.message}
                        </Typography>
                    )}
                </Group>
                <Group
                    direction="column"
                    alignItems="center"
                    gap={20}
                    width="100%"
                >
                    <Group direction="column" gap={15} width="100%">
                        <Input
                            label="Email"
                            width="wide"
                            placeholder="Введите ваш email"
                            {...register("email")}
                            error={errors.email?.message}
                            errorType="static"
                        />
                        <Input
                            type="password"
                            width="wide"
                            label="Пароль"
                            placeholder="Введите пароль"
                            {...register("password")}
                            error={errors.password?.message}
                            errorType="static"
                        />
                    </Group>
                    <Button type="submit" disabled={isLoading} wide>
                        Войти
                    </Button>
                </Group>
            </Group>
        </form>
    );
};
