import {defineConfig} from 'vite';
import laravel from 'laravel-vite-plugin';
import vue from '@vitejs/plugin-vue'

export default defineConfig({
    plugins: [
        vue(),
        laravel(['resources/js/app/app-main.ts','resources/js/login/login-main.ts']),
    ],
});
