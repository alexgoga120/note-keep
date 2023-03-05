<template>
    <q-layout view="lHh Lpr fff">
        <q-page-container>
            <q-page
                class="window-height window-width row justify-center items-center gradient-login"
            >
                <div v-if="isLogin" class="column q-pa-lg">
                    <LoginForm/>
                </div>
                <div v-else class="column q-pa-lg">
                    <SigninForm/>
                </div>
            </q-page>
        </q-page-container>
    </q-layout>
</template>

<script setup lang="ts">
import {ref} from "vue";
import LoginForm from "./login/LoginForm.vue";
import SigninForm from "./signin/SigninForm.vue";

const isLogin = ref<boolean>(true);
</script>

<style scoped>
.gradient-login {
    background: rgb(255, 255, 255);
    background: linear-gradient(180deg, rgba(255, 255, 255, 1) 0%, rgba(254, 239, 195, 1) 100%);
}
</style>
