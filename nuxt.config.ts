// https://nuxt.com/docs/api/configuration/nuxt-config
import process from "node:process";
import { createResolver } from "@nuxt/kit";
// Refer for why the below module is used: https://github.com/vuetifyjs/vuetify-loader/issues/290#issuecomment-1839784090

import excludedlodashFunctions from "./config/excludedlodashFunctions";
import { image } from "./config/imageConfig";
import { i18n } from "./config/nuxti18nConfig";

const { resolve } = createResolver(import.meta.url);

export default defineNuxtConfig({
    alias: {
        "@/*": "./app/*",
        "@actions/*": "./app/actions/*",
        "@components/*": "./app/components/*",
        "@constants/*": "./app/constants/*",
        "@hooks/*": "./app/hooks/*",
        "@services/*": "./app/services/*",
        "@stores/*": "./app/stores/*",
        "@types/*": "./app/types/*",
        "@utils/*": "./app/utils/*",
    },

    app: {
        buildAssetsDir: "static/",
        head: {
            viewport: "width=device-width,initial-scale=1,viewport-fit=cover",
            link: [{ rel: "icon", href: "/root/favicon.ico", sizes: "any" }],
            meta: [
                {
                    "http-equiv": "Cache-Control",
                    // content: "private",
                },
            ],
            noscript: [
                // <noscript>Javascript is required</noscript>
                {
                    children:
                        "We're sorry but our client doesn't work properly without JavaScript enabled. Please enable it to continue",
                },
            ],
        },

        rootId: "dmc-main-container",
    },

    build: {
        analyze: {
            filename: "bundle-stats.html",
            open: true,
            title: "Service Console Modules",
            template: "sunburst",
        },
        transpile: ["gsap", "vuetify"],
    },

    // CSS / SASS / SCSS files import. Ordering is important.
    css: [
        // Importing Layers configuration - Needs to be loaded first
        resolve("./global/styles/reset.scss"),
        resolve("./global/styles/layers.scss"),
        resolve("./global/styles/animations.scss"),
        resolve("./global/styles/typography.scss"),
        resolve("./global/styles/overrides.scss"),
    ],

    devServer: {
        // Disabling HTTPS
        // https: {
        //     key: resolve("../../certs/admin_key.pem"),
        //     cert: resolve("../../certs/admin_cert.pem"),
        //     // ca: fileURLToPath(new URL("../../certs/admin_ca.pem", import.meta.url)),
        // },
        port: 3000,
    },

    devtools: { enabled: process.env.NODE_ENV === "development" },

    experimental: {
        typedPages: true,
        asyncContext: true,
        componentIslands: true,
    },

    future: {
        compatibilityVersion: 4,
    },

    imports: {
        dirs: [
            resolve("./app/libs/**/*"),
            resolve("./app/services/**"),
            resolve("./app/stores/**"),
            resolve("./types"),
        ],
    },

    logLevel: "silent",

    modules: [
        // (_options: ModuleOptions, nuxt: Nuxt) => {
        //     nuxt.hooks.hook("vite:extendConfig", (config: any) =>
        //         config.plugins.push(
        //             vuetify(),
        //             vuetifySass({
        //                 configFile: resolve("./app/assets/styles/vuetify/settings.scss"),
        //             }),
        //         ));
        // },

        "@pinia/nuxt",

        [
            "@nuxt/eslint",
            {
                config: {
                    standalone: false,
                },
            },
        ],

        // Default options used
        "@vueuse/nuxt",

        [
            "@unocss/nuxt",
            {
                nuxtLayers: true,
                configFile: resolve("./unocss.config.ts"),
            },
        ],

        [
            "nuxt-lodash",
            {
                prefix: "_",
                prefixSkip: false,
                upperAfterPrefix: false,
                exclude: excludedlodashFunctions,
            },
        ],

        ["@nuxt/image", image],

        ["@nuxtjs/i18n", i18n],

        [
            "@nuxtjs/color-mode",
            {
                preference: "system",
                classSuffix: "",
            },
        ],

        [
            "@vee-validate/nuxt",
            {
                autoImports: true,
                componentNames: {
                    Form: "vee-form",
                    Field: "vee-field",
                    FieldArray: "vee-field-array",
                    ErrorMessage: "vee-error-message",
                },
            },
        ],
    ],

    nitro: {
        esbuild: {
            options: {
                target: "esnext",
            },
        },
    },

    runtimeConfig: {
        public: {
            // TODO Overwriting this in .env won't work right now due to secure cookie issue - Needs to be investigated
            // API Base for the client
            apiBase: "/api",
        },
    },

    sourcemap: true,
    ssr: false,

    typescript: {
        tsConfig: {
            compilerOptions: {
                moduleResolution: "bundler",
                isolatedModules: true,
                allowImportingTsExtensions: true,
            },
        },
    },

    vite: {
        build: {
            target: "esnext",
        },
        // resolve: {
        //     alias: {
        //         "shared-utils": resolve("../shared-utils/index.ts"),
        //     },
        // },
        // server: {
        //     hmr: {
        //         protocol: "ws",
        //         clientPort: 3000,
        //     },
        // },
        // vue: {
        //     template: {
        //         transformAssetUrls,
        //         compilerOptions: {
        //             isCustomElement: (tag) => tag.startsWith("i-"),
        //         },
        //     },
        // },
    },

    compatibilityDate: "2024-09-08",
});
