import { pathsToModuleNameMapper } from "ts-jest";

import { compilerOptions } from "./tsconfig.json";

const config = {
    testEnvironment: "jsdom",
    setupFilesAfterEnv: ["<rootDir>/jest-setup.ts"],
    moduleNameMapper: {
        "\\.(css|scss)$": "identity-obj-proxy",
        "effector-react": "effector-react/scope",
        "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$":
            "<rootDir>/__mocks__/fileMock.js",

        ".+\\.svg?.+$": "<rootDir>/__mocks__/svg.js",
        ...pathsToModuleNameMapper(compilerOptions.paths, {
            prefix: "<rootDir>",
        }),
    },
};

export default config;
