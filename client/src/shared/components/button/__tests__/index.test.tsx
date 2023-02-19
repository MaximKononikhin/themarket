import React from "react";

import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import Button from "@shared/components/button";

const TEST_CONTENT = "test";

describe("Button component", () => {
    it("should render component", () => {
        const { getByText } = render(<Button>{TEST_CONTENT}</Button>);

        const container = getByText(TEST_CONTENT);

        expect(container).toBeInTheDocument();
        expect(container).toMatchSnapshot();
    });

    it("should call handleClick", async () => {
        const handleClick = jest.fn();

        const { getByText } = render(
            <Button onClick={handleClick}>{TEST_CONTENT}</Button>
        );

        const container = getByText(TEST_CONTENT);

        await userEvent.click(container);

        expect(handleClick).toHaveBeenCalledTimes(1);
    });
});
