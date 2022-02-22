import React from "react";
import { useForm } from "react-hook-form";

import { Container, Heading } from "blocks/login-form/styles";
import { Field } from "components/field";
import Form from "components/form";
import SubmitButton from "components/submit-button";
import { EMAIL_VALIDATOR, PASSWORD_VALIDATOR } from "lib/input-validators";

import authService from "../../services/auth";

const defaultValues = {
  email: "",
  password: "",
};

type FormType = typeof defaultValues;

const LoginForm = () => {
  const formContext = useForm({ defaultValues });
  const { register } = formContext;

  const onSubmit = async (values: FormType) => {
    await authService.login(values.email, values.password);
  };

  return (
    <Container>
      <Form
        context={formContext}
        fields={["password", "email"]}
        onSubmit={onSubmit}
      >
        <Heading>Вход</Heading>
        <Field label="E-mail">
          <input {...register("email", EMAIL_VALIDATOR)} />
        </Field>
        <Field label="Пароль">
          <input {...register("password", PASSWORD_VALIDATOR)} />
        </Field>
        <SubmitButton>Войти</SubmitButton>
      </Form>
    </Container>
  );
};

export default LoginForm;
