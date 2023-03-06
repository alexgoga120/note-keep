<template>
    <div class="q-pa-md">
        <q-layout view="hHh lpR fFf">

            <notes-header @toggleDrawer="toggleMiniDrawer"/>
            <NotesDrawer v-model="miniState" v-model:current-opt="currentItem" :drawer-opts="drawerOpts"/>
            <q-page-container>
                <q-page padding>
                    <create-note/>
                    <div class="q-pa-md row items-start q-gutter-xl">
                        <NoteKeep :note-data="note"
                                  v-for="note in (currentItem ===drawerOpts[0].name ? noteStore.notes : noteStore.archivedNotes)"
                                  :key="note.id"/>
                    </div>
                </q-page>
            </q-page-container>

        </q-layout>
    </div>
</template>

<script setup lang="ts">
import {ref} from "vue";

const miniState = ref<boolean>(true)
import NotesHeader from "./header/NotesHeader.vue";
import NotesDrawer from "./drawer/NotesDrawer.vue";
import NoteKeep from "./note/NoteKeep.vue";
import CreateNote from "./note/create/CreateNote.vue";
import {NoteStore} from "../store/noteModule";
import {useModule} from "../../../../core/app/store";

const toggleMiniDrawer = () => {
    miniState.value = !miniState.value
}


const noteStore: NoteStore = useModule(NoteStore);

noteStore.fetchNotes();
noteStore.fetchArchiveNotes();

const drawerOpts = [
    {
        name: 'Notas',
        icon: 'lightbulb_outline'
    },
    {
        name: 'Archivo',
        icon: 'archive'
    },
];

const currentItem = ref<string>(drawerOpts[0].name);

</script>

<style>
/* width */
textarea::-webkit-scrollbar {
    width: 8px;
}

/* Track */
textarea::-webkit-scrollbar-track {
    box-shadow: inset 0 0 5px grey;
    border-radius: 10px;
}

/* Handle */
textarea::-webkit-scrollbar-thumb {
    background: #403F45;
    border-radius: 10px;
}
</style>
