import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { VitePluginFonts } from "vite-plugin-fonts";

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		react(),
		VitePluginFonts({
			google: {
				families: [
					{
						/**
						 * Family name (required)
						 */
						name: "IBM Plex Mono",

						/**
						 * Family styles
						 */
						styles: "wght@400",

						/**
						 * enable non-blocking renderer
						 *   <link rel="preload" href="xxx" as="style" onload="this.rel='stylesheet'">
						 * default: true
						 */
						defer: true,
					},
				],
			},
		}),
	],
});
