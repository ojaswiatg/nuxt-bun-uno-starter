// @ts-check

import url from "node:url";
import antfu from "@antfu/eslint-config";
import { FlatCompat } from "@eslint/eslintrc";
import pluginESx from "eslint-plugin-es-x";
import pluginPromise from "eslint-plugin-promise";
import pluginSecurity from "eslint-plugin-security";

const __dirname = url.fileURLToPath(new URL(".", import.meta.url));
const compat = new FlatCompat({ baseDirectory: __dirname });

// baseConfig: https://github.com/antfu/eslint-config
// Node Config: https://github.com/eslint-community/eslint-plugin-n
// JSON Config: https://github.com/ota-meshi/eslint-plugin-jsonc
export default antfu(
    {
    // https://eslint-plugin-perfectionist.azat.io/
        lessOpinionated: false,

        formatters: {
            /**
             * Format CSS, LESS, SCSS files, also the `<style>` blocks in Vue
             * By default uses Prettier
             */
            css: true,
            /**
             * Format HTML files
             * By default uses Prettier
             */
            html: true,
            /**
             * Format Markdown files
             * Supports Prettier and dprint
             * By default uses Prettier
             */
            markdown: "prettier",
        },

        // https://eslint.org/
        javascript: {
            overrides: {
                "prefer-const": [
                    "warn",
                    {
                        destructuring: "all",
                    },
                ],
            },
        },

        // https://typescript-eslint.io/
        typescript: {
            overrides: {
                "ts/consistent-type-definitions": ["error", "type"],
                "no-undef": "off",
            },
        },

        vue: {
            overrides: {
                "vue/block-order": [
                    "error",
                    {
                        order: [["script", "template"], "style"],
                    },
                ],

                "vue/html-closing-bracket-newline": [
                    "error",
                    {
                        singleline: "never",
                        multiline: "never",
                        selfClosingTag: {
                            singleline: "never",
                            multiline: "always",
                        },
                    },
                ],

                "vue/html-self-closing": [
                    "error",
                    {
                        html: {
                            void: "never",
                            normal: "never",
                            component: "always",
                        },
                    },
                ],

                "vue/max-attributes-per-line": [
                    "error",
                    {
                        singleline: {
                            max: 1,
                        },
                        multiline: {
                            max: 1,
                        },
                    },
                ],
            },
        },

        stylistic: {
            indent: 4,
            quotes: "double",
            semi: true,
            overrides: {
                "style/arrow-parens": ["error", "always"],
                "style/brace-style": ["error", "1tbs"],
            },
        },

        yaml: {
            overrides: {
                "yml/indent": [
                    "error",
                    4,
                    {
                        indentBlockSequences: true,
                        indicatorValueIndent: 2,
                    },
                ],
            },
        },

        // https://unocss.dev/integrations/eslint
        unocss: false,
    },

    // https://eslint-community.github.io/eslint-plugin-es-x/
    pluginESx.configs["flat/restrict-to-es2023"],

    // https://github.com/eslint-community/eslint-plugin-promise
    pluginPromise.configs["flat/recommended"],

    // Node security related rules

    // https://github.com/eslint-community/eslint-plugin-security
    pluginSecurity.configs.recommended,

    // https://github.com/gkouziik/eslint-plugin-security-node
    ...compat.config({
        plugins: ["security-node"],
        extends: ["plugin:security-node/recommended"],
    }),

    // Custom overrides
    {
        rules: {
            "curly": ["error", "all"],
            "no-console": ["error", { allow: ["warn", "error", "info"] }],
        },
    },

    // config with just ignores is the replacement for `.eslintignore`.
    // antfu config Reads from ".gitignore".
    // Add only those things here that are not in .gitignore
    // {
    //     ignores: [
    //         "**/node_modules/**",
    //         "**/dist/**",
    //         "**/certs/**",
    //     ],
    // },
);
