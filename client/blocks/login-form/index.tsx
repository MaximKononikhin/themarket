import React from "react";
import { useForm } from "react-hook-form";

import { Container, Heading } from "blocks/login-form/styles";
import { Field } from "components/field";
import Form from "components/form";
import SubmitButton from "components/submit-button";
import { useAuth } from "lib/auth/auth-context";
import { EMAIL_VALIDATOR, PASSWORD_VALIDATOR } from "lib/input-validators";

const defaultValues = {
  email: "",
  password: "",
};

type FormType = typeof defaultValues;

const LoginForm = () => {
  const formContext = useForm({ defaultValues });
  const { register } = formContext;
  const { login } = useAuth();

  const onSubmit = async (values: FormType) => {
    const { email, password } = values;
    await login({ email, password });
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
