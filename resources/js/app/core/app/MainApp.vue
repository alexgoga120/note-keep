<template>
    <NotesBuilder v-if="loading"/>
</template>

<script setup lang="ts">

import NotesBuilder from "../../features/notefeature/application/notes/NotesBuilder.vue";
import {onBeforeMount, ref} from "vue";

const loading = ref<boolean>(false);

onBeforeMount(async () => {
    if (!localStorage.getItem('auth-token')) {
        window.close();
        window.location.href = "/login"
        return;
    }
    return loading.value = true
})

</script>

<style scoped>

</style>
