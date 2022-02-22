import React from "react";
import { useForm } from "react-hook-form";

import { Container, Heading } from "blocks/login-form/styles";
import { Field } from "components/field";
import Form from "components/form";
import SubmitButton from "components/submit-button";
import {
  EMAIL_VALIDATOR,
  NAME_VALIDATOR,
  PASSWORD_VALIDATOR,
} from "lib/input-validators";

const defaultValues = {
  email: "",
  password: "",
  name: "",
};

type FormType = typeof defaultValues;

const RegistrationForm = () => {
  const formContext = useForm({ defaultValues });
  const { register } = formContext;

  const onSubmit = (values: FormType) => console.log(values);

  return (
    <Container>
      <Form
        context={formContext}
        fields={["password", "email", "password"]}
        onSubmit={onSubmit}
      >
        <Heading>Регистрация</Heading>
        <Field label="Ваше имя">
          <input {...register("name", NAME_VALIDATOR)} />
        </Field>
        <Field label="E-mail">
          <input {...register("email", EMAIL_VALIDATOR)} />
        </Field>
        <Field label="Пароль">
          <input {...register("password", PASSWORD_VALIDATOR)} />
        </Field>
        <SubmitButton>Зарегистрироваться</SubmitButton>
      </Form>
    </Container>
  );
};

export default RegistrationForm;
