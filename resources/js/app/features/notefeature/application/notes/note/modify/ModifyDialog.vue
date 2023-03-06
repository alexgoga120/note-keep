<template>
    <q-dialog v-model="dialog" persistent>
        <q-card>
            <q-form ref="modifyForm" class="row justify-center">
                <q-card class="q-pa-sm" style="width: 600px">
                    <div class="row q-px-sm">

                        <div class="col-12">
                            <q-input dense borderless
                                     placeholder="Título"
                                     hint="Título"
                                     :rules="[ val => val.length <= 30 || 'Máximo 30 caracteres' ]"
                                     v-model="noteTitle"/>
                        </div>
                    </div>
                    <div class="row q-px-sm">

                        <div class="col-12">
                            <q-input dense autogrow borderless
                                     placeholder="Crear una nota..."
                                     hint="Crear una nota..."
                                     class="scroll-textarea"
                                     :input-style="{maxHeight:'400px', height:'17px'}"
                                     :rules="[ val => val.length <= 255 || 'Máximo 255 caracteres' ]"
                                     v-model="noteBody">
                            </q-input>
                        </div>
                    </div>
                    <q-card-actions align="right" class="q-py-none">
                        <q-btn size="md" flat @click="addNote">Guardar</q-btn>
                        <q-btn size="md" color="red" flat @click="closeDialog">Cancelar</q-btn>
                    </q-card-actions>
                </q-card>
            </q-form>
        </q-card>
    </q-dialog>
</template>

<script setup lang="ts">

import {computed, ref} from "vue";
import Note from "../../../../domain/entities/note";
import {NoteStore} from "../../../store/noteModule";
import {useModule} from "../../../../../../core/app/store";
import {QForm} from "quasar";

interface Props {
    modelValue: boolean;
    noteData: Note;
}

const props = defineProps<Props>()
const emit = defineEmits(['update:modelValue', 'update:currentOpt'])

const dialog = computed({
    get: () => props.modelValue,
    set: (value) => emit('update:modelValue', value)
})

const modifyForm = ref<QForm>();


const noteTitle = ref<string | undefined>(props.noteData.title)
const noteBody = ref<string | undefined>(props.noteData.body)

const closeDialog = () => {
    noteTitle.value = props.noteData.title;
    noteBody.value = props.noteData.body;
    dialog.value = false;
}

const noteStore: NoteStore = useModule(NoteStore);

async function addNote() {
    if (!!noteBody.value && await modifyForm.value?.validate()) {
        const noteData: Note = {
            id: props.noteData.id,
            body: noteBody.value,
            title: noteTitle.value
        }
        const result = await noteStore.modifyNote(noteData);
        result.either(
            (l) => {
                l.getMessage();
            },
            (_) => {
                modifyForm.value?.reset();
                dialog.value = false;
            }
        );
    }
}

</script>

<style scoped>

</style>
