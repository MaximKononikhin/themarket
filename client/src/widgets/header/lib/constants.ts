import { ROUTES_MAP, UserTabs } from "@shared/lib";

export const USER_MENU_LINKS = [
    {
        title: "Мои объяления",
        link: {
            route: ROUTES_MAP.profile,
            query: { tab: UserTabs.adds },
        },
    },
    {
        title: "Избранное",
        link: {
            route: ROUTES_MAP.profile,
            query: { tab: UserTabs.favorite },
        },
    },
    {
        title: "Мои покупки",
        link: {
            route: ROUTES_MAP.profile,
            query: { tab: UserTabs.purchases },
        },
    },
    {
        title: "Мои продажи",
        link: {
            route: ROUTES_MAP.profile,
            query: { tab: UserTabs.sales },
        },
    },
    {
        title: "Настройки",
        link: {
            route: ROUTES_MAP.profile,
            query: { tab: UserTabs.sales },
        },
    },
];
