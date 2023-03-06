<template>

    <q-header bordered class="bg-primary text-white">
        <q-toolbar>
            <q-btn dense flat round icon="menu" @click="toggleDrawer"/>

            <q-toolbar-title class="text-weight-bold">
                <q-avatar>
                    <img src="https://cdn.quasar.dev/logo-v2/svg/logo-mono-white.svg" alt="klklk">
                </q-avatar>
                Note Keep
            </q-toolbar-title>
            <q-btn round flat @click="logout"
                   size="lg"
                   color="red"
                   icon="logout">
            </q-btn>
        </q-toolbar>
    </q-header>

</template>

<script setup lang="ts">

const emit = defineEmits(['toggleDrawer']);

const toggleDrawer = () => emit('toggleDrawer')

const logout = () => {
    localStorage.removeItem('auth-token')
    window.location.href = "/login"
}

</script>

<style scoped>

</style>
