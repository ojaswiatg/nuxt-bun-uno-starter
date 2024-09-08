import type { NuxtConfig } from "nuxt/schema";

export const image: NuxtConfig["image"] = {
    presets: {
        avatar: {
            modifiers: {
                format: "jpg",
                width: 50,
                height: 50,
            },
        },
    },
};
