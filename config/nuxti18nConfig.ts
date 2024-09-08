import type { NuxtConfig } from "nuxt/schema";

export const i18n: NuxtConfig["i18n"] = {
    locales: [
        {
            code: "en",
            iso: "en-US",
            name: "English",
            files: ["en-US_global.yml"],
        },
    // {
    //     code: "fr",
    //     iso: "fr-FR",
    //     name: "Français",
    //     files: ["fr-FR_global.yml"],
    // },
    ],
    defaultLocale: "en",
    lazy: false,
    langDir: "../locales",
    strategy: "no_prefix",
    detectBrowserLanguage: {
        useCookie: true,
        cookieKey: "i18n",
        redirectOn: "root", // recommended
    },
    vueI18n: "./config/i18nConfig.ts",
};
