<template>
    <q-card class="" style="width: 238px; max-height: 427px">
        <q-card-section v-if="props.noteData.title"
                        style="cursor: pointer"
                        @click="dialog=true">
            <p class="text-weight-bold text-no-wrap" style="text-overflow: ellipsis; overflow: hidden;">
                {{ props.noteData.title }}
            </p>
        </q-card-section>
        <q-card-section style="max-height: 200px; cursor: pointer" class="scroll" @click="dialog=true">
            <span v-html="props.noteData.body" style="white-space: pre-line">
            </span>
        </q-card-section>
        <q-card-actions class="justify-between">
            <q-btn round flat @click="pinNote"
                   :color=" props.noteData.is_pinned ? 'primary' : '' "
                   size="sm"
                   icon="push_pin">
            </q-btn>
            <q-btn round flat
                   size="sm"
                   icon="more_vert">
                <q-menu auto-close>
                    <q-list>
                        <q-item clickable dense @click="pinNote">
                            <q-item-section>Fijar</q-item-section>
                        </q-item>
                        <q-item clickable dense @click="archiveNote">
                            <q-item-section class="text-primary">{{
                                    props.noteData.is_archived ? 'Desarchivar' : 'Archivar'
                                }}
                            </q-item-section>
                        </q-item>
                        <q-item clickable dense @click="deleteNote">
                            <q-item-section class="text-red">Eliminar</q-item-section>
                        </q-item>
                        <q-item clickable dense @click="dialog=true">
                            <q-item-section>Editar</q-item-section>
                        </q-item>
                    </q-list>
                </q-menu>
            </q-btn>
        </q-card-actions>
        <ModifyDialog v-model="dialog" :note-data="noteData"/>
    </q-card>
</template>

<script setup lang="ts">

import Note from "../../../domain/entities/note";
import {NoteStore} from "../../store/noteModule";
import {useModule} from "../../../../../core/app/store";
import {ref} from "vue";
import ModifyDialog from "./modify/ModifyDialog.vue";

interface Props {
    noteData: Note
}

const props = defineProps<Props>();

const dialog = ref<boolean>(false);

const noteStore: NoteStore = useModule(NoteStore);

const deleteNote = async () => {

    const result = await noteStore.deleteNote(props.noteData.id!);
    console.log(result)
}

const archiveNote = async () => {

    const result = await noteStore.archiveNote(props.noteData.id!);
    console.log(result)
}

const pinNote = async () => {

    const result = await noteStore.pinNote(props.noteData.id!);
    console.log(result)
}

</script>

<style scoped>

</style>
