import React, { useState } from "react";

import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { InputProps } from "@shared/components/input/types";

import { Input } from "../.";

interface DemoProps extends Omit<InputProps, "value" | "placeholder"> {
    placeholder?: string;
}

const PLACEHOLDER_TEXT = "Test";
const ERROR = "error";
const VALUE = "test text";
const LABEL = "test label";
const LABEL_TEST_ID = "label";

const Demo: React.FC<DemoProps> = (props) => {
    const [value, setValue] = useState("");

    const handleChange = (
        evt: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setValue(evt.target.value);
        if (props.onChange) {
            props.onChange(evt);
        }
    };

    const placeholder = props.placeholder
        ? props.placeholder
        : PLACEHOLDER_TEXT;

    return (
        <Input
            {...props}
            value={value}
            onChange={handleChange}
            placeholder={placeholder}
        />
    );
};

describe("Input component", () => {
    it("should render input", () => {
        const handeChange = jest.fn();

        const { getByPlaceholderText, container } = render(
            <Demo onChange={handeChange} />
        );

        expect(getByPlaceholderText(PLACEHOLDER_TEXT)).toBeInTheDocument();
        expect(container).toMatchSnapshot();
    });

    it("should has proper value and called handler", async () => {
        const handeChange = jest.fn();

        const { getByPlaceholderText, container } = render(
            <Demo onChange={handeChange} />
        );

        await userEvent.type(getByPlaceholderText(PLACEHOLDER_TEXT), VALUE);

        expect(getByPlaceholderText(PLACEHOLDER_TEXT)).toHaveValue(VALUE);
        expect(handeChange).toHaveBeenCalled();
        expect(container).toMatchSnapshot();
    });

    it("should has text label", () => {
        const handeChange = jest.fn();

        const { getByText, container } = render(
            <Demo onChange={handeChange} label={LABEL} />
        );

        expect(getByText(LABEL)).toBeInTheDocument();
        expect(container).toMatchSnapshot();
    });

    it("should render element label", () => {
        const handeChange = jest.fn();

        const labelElement = <span data-testid={LABEL_TEST_ID}>label</span>;

        const { getByTestId, container } = render(
            <Demo onChange={handeChange} label={labelElement} />
        );

        expect(container).toMatchSnapshot();
        expect(getByTestId(LABEL_TEST_ID)).toBeInTheDocument();
    });

    it("should contains wide styles", () => {
        const handeChange = jest.fn();

        const { getByPlaceholderText, container } = render(
            <Demo onChange={handeChange} width="wide" />
        );

        expect(getByPlaceholderText(PLACEHOLDER_TEXT)).toHaveClass(
            "input__common_wide"
        );
        expect(container).toMatchSnapshot();
    });

    it("should render textarea", () => {
        const handeChange = jest.fn();

        const { getByPlaceholderText, container } = render(
            <Demo onChange={handeChange} design="textarea" />
        );

        expect(getByPlaceholderText(PLACEHOLDER_TEXT)).toBeInTheDocument();
        expect(container).toMatchSnapshot();
    });

    it("should render error and have proper styles", () => {
        const handeChange = jest.fn();

        const { getByText, container } = render(
            <Demo
                onChange={handeChange}
                design="textarea"
                error={ERROR}
                errorType="static"
            />
        );

        expect(getByText(ERROR)).toBeInTheDocument();
        expect(getByText(ERROR)).toHaveClass("error__static");
        expect(container).toMatchSnapshot();
    });
});
