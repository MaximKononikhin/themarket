import React from "react";
import { useForm } from "react-hook-form";

import { yupResolver } from "@hookform/resolvers/yup";

import { LoginUserDto } from "@shared/api";
import { Button, Group, Input, Typography } from "@shared/components";

import { loginUserDefaultValues, loginUserSchema } from "../lib";
import { events, selectors } from "../model";

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
        <form onSubmit={handleSubmit(onSubmit)}>
            <Group direction="column" gap={30}>
                <Group direction="column" gap={12}>
                    <Typography type="header-1">
                        Регистрация на маркетплейсе
                    </Typography>
                    <Typography type="text-2">
                        Зарегистрируйтесь, чтобы размещать свои объявления и
                        покупать товары.
                    </Typography>
                    {error && (
                        <Typography type="error">
                            {error.body.message}
                        </Typography>
                    )}
                </Group>
                <Group direction="column" alignItems="center" gap={20}>
                    <Group direction="column" gap={15}>
                        <Input
                            label="Email"
                            placeholder="Введите ваш email"
                            {...register("email")}
                            error={errors.email?.message}
                        />
                        <Input
                            type="password"
                            label="Пароль"
                            placeholder="Придумайте пароль"
                            {...register("password")}
                            error={errors.password?.message}
                        />
                    </Group>
                    <Button type="submit" disabled={isLoading}>
                        Войти
                    </Button>
                </Group>
            </Group>
        </form>
    );
};
