import { importDirectory, parseColors, runSVGO } from "@iconify/tools";

import { compareColors, stringToColor } from "@iconify/utils/lib/colors";
import { mergeConfigs } from "@unocss/core";

import { presetIcons, presetUno, transformerDirectives } from "unocss";
import config from "./.nuxt/uno.config.mjs";

export default mergeConfigs([
    config,
    {
        outputToCssLayers: {
            cssLayerName: (layer) => {
                return `unocss.${layer}`;
            },
        },
        presets: [
            presetIcons({
                prefix: "i:",
                scale: 1.2,
                warn: true,
                collections: {
                    // Loading icon set
                    custom: async () => {
                        // Load SVG images as Icons
                        const iconSet = await importDirectory("./assets/icons", {
                            prefix: "svg",
                        });

                        // Clean up each icon
                        iconSet.forEach(async (name) => {
                            try {
                                const svg = iconSet.toSVG(name)!;

                                // Change color to `currentColor`
                                const blackColor = stringToColor("black")!;

                                parseColors(svg, {
                                    defaultColor: "currentColor",
                                    callback: (attr, colorStr, color) => {
                                        // console.log("Color:", colorStr, color);
                                        // Change black to 'currentColor'
                                        if (color && compareColors(color, blackColor)) {
                                            return "currentColor";
                                        }

                                        switch (color?.type) {
                                            case "none":
                                            case "current":
                                                return color;
                                        }

                                        throw new Error(
                                            `Unexpected color "${colorStr}" in attribute ${attr}`,
                                        );
                                    },
                                });

                                // Optimise
                                runSVGO(svg);

                                // Update icon in icon set
                                iconSet.fromSVG(name, svg);
                            } catch (err) {
                                console.error(err);
                                // Invalid icon
                                // console.error(`Error parsing ${name}:`, err);
                                iconSet.remove(name);
                            }
                        });

                        // Export as Iconify JSON
                        return iconSet.export();
                    },
                    // carbon: () =>
                    //     import("@iconify-json/carbon/icons.json").then((i) => i.default),
                    // fluent: () =>
                    //     import("@iconify-json/fluent/icons.json").then((i) => i.default),
                    // ic: () =>
                    //     import("@iconify-json/ic/icons.json").then((i) => i.default),
                    // mdi: () =>
                    //     import("@iconify-json/mdi/icons.json").then((i) => i.default),
                },
            }),
            presetUno(),
        ],
        shortcuts: [
            {
                "uno-icon": "text-2xl mr-2",
                "flex-center": "items-center justify-center",
                "flex-v-center": "items-center",
                "flex-h-center": "justify-center",
                "align-center": "items-center",
                "main-title-container": "py-2 flex flex-wrap items-center gap-4",
                "main-title": "font-bold flex items-center",
                "main-content": "flex-auto pa-4",
            },
        ],
        theme: {
            breakpoints: {
                "xs": "640px",
                "sm": "768px",
                "md": "1024px",
                "lg": "1280px",
                "xl": "1536px",
                "2xl": "1920px",
            },
        },
        transformers: [transformerDirectives()],
    },
]);
