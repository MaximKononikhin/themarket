import React from "react";

import { render } from "@testing-library/react";

import { Group } from "../index";
import { GroupProps } from "../types";

const GROUP_PROPS: GroupProps = {
    gap: 10,
    direction: "column",
    alignItems: "center",
    width: "100px",
    margin: "0px",
};

const TEST_ID = "component";

describe("Group component", () => {
    it("should render component and has proper styles", () => {
        const { getByTestId } = render(
            <Group {...GROUP_PROPS} testId={TEST_ID}>
                <div />
            </Group>
        );

        const element = getByTestId(TEST_ID);

        expect(element).toBeInTheDocument();

        Object.entries(GROUP_PROPS).forEach(([key, value]) => {
            if (key === "alignItems") {
                expect(element).toHaveStyle({ "align-items": value });
                return;
            }
            if (key === "gap") {
                expect(element).toHaveStyle({ [key]: `${value}px` });
                return;
            }
            if (key === "direction") {
                expect(element).toHaveStyle({ "flex-direction": value });
                return;
            }

            expect(element).toHaveStyle({ [key]: value });
        });

        expect(element).toMatchSnapshot();
    });
});
