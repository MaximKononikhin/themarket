import { createGlobalStyle, css } from "styled-components";

const normalize = css`
    html,
    body,
    #root,
    .app {
        position: relative;
        height: 100%;
    }

    html {
        scroll-behavior: smooth;
    }

    body {
        margin: 0;
        font-style: normal;
        font-weight: normal;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;

        * {
            box-sizing: border-box;
            font-family: "Source Sans Pro", sans-serif;
        }
    }
`;

export const NormalizeStyles = createGlobalStyle`${normalize}`;
