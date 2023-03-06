<template>

    <q-form ref="createForm" class="row justify-center">
        <q-card class="q-pa-sm" style="width: 600px">
            <div class="row q-px-sm">

                <div class="col-12">
                    <q-input dense borderless
                             placeholder="Título"
                             :rules="[ val => val.length <= 30 || 'Máximo 30 caracteres' ]"
                             v-model="noteTitle"/>
                </div>
            </div>
            <div class="row q-px-sm">

                <div class="col-12">
                    <q-input dense autogrow borderless
                             placeholder="Crear una nota..."
                             :rules="[ val => val.length <= 255 || 'Máximo 255 caracteres' ]"
                             class="scroll-textarea"
                             :input-style="{maxHeight:'400px', height:'17px'}"
                             v-model="noteBody">
                    </q-input>
                </div>
            </div>
            <q-card-actions v-if="textAvalible" align="right" class="q-py-none">
                <q-btn size="md" flat @click="addNote">Guardar</q-btn>
            </q-card-actions>
        </q-card>
    </q-form>

</template>

<script setup lang="ts">

import {computed, ref} from "vue";
import {NoteStore} from "../../../store/noteModule";
import {useModule} from "../../../../../../core/app/store";
import Note from "../../../../domain/entities/note";
import {QForm} from "quasar";

const noteStore: NoteStore = useModule(NoteStore);

const createForm = ref<QForm>()

const noteTitle = ref<string>()
const noteBody = ref<string>()

const textAvalible = computed<boolean>(() => {
    const bodyLength = noteBody.value?.length;
    return !!bodyLength && (bodyLength > 0)
})

async function addNote() {
    if (!!noteBody.value) {
        const noteData: Note = {
            body: noteBody.value,
            title: noteTitle.value
        }
        const result = await noteStore.addNote(noteData);
        result.either(
            (l) => {
                l.getMessage();
            },
            (_) => {
                noteTitle.value = undefined;
                noteBody.value = undefined;
            }
        );
    }
}

</script>

<style scoped>

</style>
