import * as yup from "yup";

import { LoginUserDto } from "@shared/api";
import {
    INVALID_EMAIL,
    REQUIRED,
    TOO_LONG_PASSWORD,
    TOO_SHORT_PASSWORD,
} from "@shared/lib/constants";

export const loginUserDefaultValues: LoginUserDto = {
    email: "",
    password: "",
};

export const loginUserSchema = yup.object().shape({
    email: yup.string().email(INVALID_EMAIL).required(REQUIRED),
    password: yup
        .string()
        .min(4, TOO_SHORT_PASSWORD)
        .max(20, TOO_LONG_PASSWORD)
        .required(REQUIRED),
});
