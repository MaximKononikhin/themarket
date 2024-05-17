import { createGlobalStyle } from "styled-components";

import {
    SourceSansProBlack,
    SourceSansProBlackItalic,
    SourceSansProBold,
    SourceSansProBoldItalic,
    SourceSansProExtraLight,
    SourceSansProExtraLightItalic,
    SourceSansProLight,
    SourceSansProLightItalic,
    SourceSansProRegular,
    SourceSansProSemiBold,
    SourceSansProSemiBoldItalic,
} from "@shared/assets/fonts";

export const FontStyles = createGlobalStyle`
    @font-face {
        font-family: "Source Sans Pro";
        src: local("Source Sans Pro"),
        url(${SourceSansProExtraLight})
        format("ttf");
        font-style: normal;
        font-weight: 200;
    }

    @font-face {
        font-family: "Source Sans Pro";
        src: local("Source Sans Pro"),
        url(${SourceSansProExtraLightItalic})
        format("ttf");
        font-style: italic;
        font-weight: 200;
    }

    @font-face {
        font-family: "Source Sans Pro";
        src: local("Source Sans Pro"),
        url(${SourceSansProLight})
        format("truetype");
        font-style: normal;
        font-weight: 300;
    }

    @font-face {
        font-family: "Source Sans Pro";
        src: local("Source Sans Pro"),
        url(${SourceSansProLightItalic})
        format("truetype");
        font-style: italic;
        font-weight: 300;
    }

    @font-face {
        font-family: "Source Sans Pro";
        src: local("Source Sans Pro"),
        url(${SourceSansProRegular})
        format("truetype");
        font-style: normal;
        font-weight: 400;
    }

    @font-face {
        font-family: "Source Sans Pro";
        src: local("Source Sans Pro"),
        url(${SourceSansProSemiBold})
        format("truetype");
        font-style: normal;
        font-weight: 600;
    }

    @font-face {
        font-family: "Source Sans Pro";
        src: local("Source Sans Pro"),
        url(${SourceSansProSemiBoldItalic})
        format("truetype");
        font-style: italic;
        font-weight: 600;
    }

    @font-face {
        font-family: "Source Sans Pro";
        src: local("Source Sans Pro"),
        url(${SourceSansProBold})
        format("truetype");
        font-style: normal;
        font-weight: 700;
    }

    @font-face {
        font-family: "Source Sans Pro";
        src: local("Source Sans Pro"),
        url(${SourceSansProBoldItalic})
        format("truetype");
        font-style: italic;
        font-weight: 700;
    }

    @font-face {
        font-family: "Source Sans Pro";
        src: local("Source Sans Pro"),
        url(${SourceSansProBlack})
        format("truetype");
        font-style: normal;
        font-weight: 900;
    }

    @font-face {
        font-family: "Source Sans Pro";
        src: local("Source Sans Pro"),
        url(${SourceSansProBlackItalic})
        format("truetype");
        font-style: italic;
        font-weight: 900;
    }
`;
