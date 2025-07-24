// vite.config.js
import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vueDevTools from "vite-plugin-vue-devtools";

export default defineConfig({
    define: {
        "import.meta.env.VITE_API_BASE_URL": JSON.stringify(
            "http://localhost:3000/api/destinations"
        ),
    },
    plugins: [vue(), vueDevTools()],
    server: {
        proxy: {
            "/api": {
                target: "http://localhost:8080",
                changeOrigin: true,
                rewrite: (path) => path.replace(/^\/api/, ""),
            },
        },
    },
    resolve: {
        alias: {
            "@": fileURLToPath(new URL("./src", import.meta.url)),
        },
    },
    test: {
        environment: "jsdom",
        setupFiles: ["./tests/setup.js"],
        globals: true,
        environmentOptions: {
            jsdom: {
                url: "http://localhost:3000",
            },
        },
    },
});
