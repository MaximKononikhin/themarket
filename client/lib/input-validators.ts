import {
    MIN_LOGIN_PASSWORD_LENGTH,
    MIN_NAME_LENGTH,
    MIN_PASSWORD_LENGTH,
    TOO_SHORT_NAME,
    VALIDATE_EMAIL_REGEX,
} from "./constants";
import {
    INVALID_EMAIL_FORMAT,
    PASSWORD_NOT_EQUAL,
    REQUIRED,
    TOO_SHORT_LOGIN_PASSWORD,
    TOO_SHORT_PASSWORD,
} from "./messages";

export const EMAIL_VALIDATOR = {
    required: {
        value: true,
        message: REQUIRED,
    },
    validate: (value?: string) => {
        if (value == null) {
            return REQUIRED;
        }
        if (!VALIDATE_EMAIL_REGEX.test(value.trim())) {
            return INVALID_EMAIL_FORMAT;
        }
        return true;
    },
};

export const NAME_VALIDATOR = {
    required: {
        value: true,
        message: REQUIRED,
    },
    validate: (name?: string) => {
        if (name == null) {
            return REQUIRED;
        }
        if (name.split(" ").join("").length < MIN_NAME_LENGTH) {
            return TOO_SHORT_NAME;
        }
        return true;
    },
};


export const LOGIN_PASSWORD_VALIDATOR = {
    required: {
        value: true,
        message: REQUIRED,
    },
    minLength: {
        value: MIN_LOGIN_PASSWORD_LENGTH,
        message: TOO_SHORT_LOGIN_PASSWORD,
    },
};

export const PASSWORD_VALIDATOR = {
    required: {
        value: true,
        message: REQUIRED,
    },
    minLength: {
        value: MIN_PASSWORD_LENGTH,
        message: TOO_SHORT_PASSWORD,
    },
};

export const PASSWORD_COPY_VALIDATOR = (password: string) => ({
    validate: (passwordCopy?: string) => {
        if (passwordCopy == null) {
            return REQUIRED;
        }
        if (passwordCopy.length === 0) {
            return REQUIRED;
        }
        if (passwordCopy.length < MIN_PASSWORD_LENGTH) {
            return TOO_SHORT_PASSWORD;
        }
        if (passwordCopy !== password) {
            return PASSWORD_NOT_EQUAL;
        }
        return true;
    },
});


