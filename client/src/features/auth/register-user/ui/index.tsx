import React from "react";
import { useForm } from "react-hook-form";

import { yupResolver } from "@hookform/resolvers/yup";

import { CreateUserDto } from "@shared/api";
import { Button, Group, Input, Typography } from "@shared/components";

import { registerUserDefaultValues, registerUserSchema } from "../lib";
import { events, selectors } from "../model";
import styles from "./index.module.scss";

export const Form = () => {
    const {
        handleSubmit,
        register,
        formState: { errors },
    } = useForm<CreateUserDto>({
        defaultValues: registerUserDefaultValues,
        resolver: yupResolver(registerUserSchema),
    });

    const isLoading = selectors.useRegisterUserLoading();
    const error = selectors.useRegisterUserError();

    const onSubmit = (data: CreateUserDto) => {
        events.registerUser(data);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
            <Group direction="column" gap={30} width="100%">
                <Group direction="column" gap={12} width="100%">
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
                <Group
                    direction="column"
                    alignItems="center"
                    gap={20}
                    width="100%"
                >
                    <Group direction="column" gap={15} width="100%">
                        <Input
                            width="wide"
                            label="Email"
                            placeholder="Введите ваш email"
                            {...register("email")}
                            error={errors.email?.message}
                            errorType="static"
                        />
                        <Input
                            width="wide"
                            label="Имя"
                            placeholder="Введите ваше имя"
                            {...register("name")}
                            error={errors.name?.message}
                            errorType="static"
                        />
                        <Input
                            width="wide"
                            type="password"
                            label="Пароль"
                            placeholder="Придумайте пароль"
                            {...register("password")}
                            error={errors.password?.message}
                            errorType="static"
                        />
                    </Group>
                    <Button type="submit" disabled={isLoading} wide>
                        Зарегистрироваться
                    </Button>
                </Group>
            </Group>
        </form>
    );
};
