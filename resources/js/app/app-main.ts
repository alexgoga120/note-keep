import {createApp} from 'vue'
import {Quasar} from "quasar";
import quasarLang from 'quasar/lang/es'
import quasarIconSet from 'quasar/icon-set/svg-material-icons'
import '@quasar/extras/material-icons/material-icons.css'
import 'quasar/src/css/index.sass'
import MainApp from "./core/app/MainApp.vue";
import {store, key} from "./core/app/store";

const myMainApp = createApp(MainApp);

myMainApp.use(Quasar, {
    plugins: {}, // import Quasar plugins and add here
    lang: quasarLang,
    iconSet: quasarIconSet,
})

myMainApp.use(store, key);

myMainApp.mount("#main_app")
