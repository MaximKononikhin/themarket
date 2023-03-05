import React from "react";

import { render } from "@testing-library/react";

import { Typography } from "../index";
import { TYPOGRAPHY } from "../type";

describe("Typography component", () => {
    TYPOGRAPHY.map((type) => {
        it(`should render component with type ${type}`, () => {
            const testId = `test_${type}`;
            const { getByTestId, container } = render(
                <Typography testId={testId} type={type}>
                    {type}
                </Typography>
            );
            expect(getByTestId(testId)).toBeInTheDocument();
            expect(container).toMatchSnapshot();
        });
    });
});
