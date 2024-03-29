import type { Meta, StoryObj } from "@storybook/react";

import { Button } from "./";

const meta = {
    title: "Example/Button",
    component: Button,
    parameters: {
        layout: "centered",
    },
    tags: ["autodocs"],
    argTypes: {},
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Example: Story = {
    args: {
        children: "Button",
    },
};
