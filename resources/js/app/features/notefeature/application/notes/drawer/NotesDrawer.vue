<template>
    <q-drawer
        show-if-above

        :mini="miniState"
        @mouseover="miniState = false"
        @mouseout="miniState = true"
        mini-to-overlay
        :breakpoint="500"
        bordered
        class=""
    >
        <q-scroll-area class="fit" :horizontal-thumb-style="{ opacity: 0 }">
            <q-list padding>
                <q-item clickable v-ripple
                        :active="currentOpt === item.name"
                        @click="emit('update:currentOpt', item.name)"
                        v-for="(item, index) in drawerOpts"
                        :key="index"
                        class="q-ma-sm"
                        :active-class="miniState ? 'active-item-mini': 'active-item'">
                    <q-item-section avatar>
                        <q-icon :name="item.icon"/>
                    </q-item-section>
                    <q-item-section>
                        {{ item.name }}
                    </q-item-section>
                </q-item>
            </q-list>
        </q-scroll-area>
    </q-drawer>
</template>

<script setup lang="ts">

import {computed, ref} from "vue";

interface Props {
    modelValue: boolean;
    currentOpt: string;
    drawerOpts: [];
}

const props = defineProps<Props>()
const emit = defineEmits(['update:modelValue', 'update:currentOpt'])

const miniState = computed({
    get: () => props.modelValue,
    set: (value) => emit('update:modelValue', value)
})


</script>

<style scoped>
.active-item {
    background-color: #feefc3;
    border: 1px solid transparent;
    border-radius: 0 25px 25px 0;
}

.active-item-mini {
    background-color: #feefc3;
    border: 1px solid transparent;
    border-radius: 25px;
}
</style>
