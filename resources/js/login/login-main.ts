import {createApp} from 'vue'
import LoginApp from "./core/app/LoginApp.vue";
import {Quasar} from "quasar";
import quasarLang from 'quasar/lang/es'
import quasarIconSet from 'quasar/icon-set/svg-material-icons'

import '@quasar/extras/material-icons/material-icons.css'
import 'quasar/src/css/index.sass'


import { store, key } from "./core/app/store";

const myLoginApp = createApp(LoginApp);

myLoginApp.use(Quasar, {
    plugins: {}, // import Quasar plugins and add here
    lang: quasarLang,
    iconSet: quasarIconSet
})

myLoginApp.use(store, key);

myLoginApp.mount("#login_app")
