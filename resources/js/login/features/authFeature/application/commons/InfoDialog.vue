<template>
    <q-dialog v-model="dialog" transition-show="rotate">
        <q-card style="width: 350px">
            <q-card-section>
                <div class="flex justify-center">
                    <span class="text-h4">{{ isError ? '¡Error!' : '¡Éxito!' }}</span>
                </div>
            </q-card-section>
            <q-separator/>
            <q-card-section class="text-center">
                <span>
                    {{ props.msg }}
                </span>
            </q-card-section>
        </q-card>
    </q-dialog>
</template>

<script setup lang="ts">

import {computed} from "vue";

interface Props {
    modelValue: boolean;
    msg: string;
    isError: boolean;
}

const props = defineProps<Props>()
const emit = defineEmits(['update:modelValue'])

const dialog = computed({
    get: () => props.modelValue,
    set: (value) => emit('update:modelValue', value)
})

</script>

<style scoped>

</style>
