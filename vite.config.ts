import {defineConfig} from 'vite';
import laravel from 'laravel-vite-plugin';
import vue from '@vitejs/plugin-vue'
import {quasar, transformAssetUrls} from "@quasar/vite-plugin";

export default defineConfig({
    plugins: [
        vue({
        template: { transformAssetUrls }
    }),

        quasar({
            sassVariables: 'resources/css/quasar-variables.sass'
        }),
        laravel(['resources/js/app/app-main.ts','resources/js/auth/auth-main.ts']),
    ],
});
