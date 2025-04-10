import { writable } from "svelte/store";

export const paletteBaseColor = writable<string | undefined>("#f2f2f2");
export const paletteSelectedColor = writable<string | undefined>("");
