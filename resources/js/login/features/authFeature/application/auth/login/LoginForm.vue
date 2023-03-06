<template>

    <div class="row">
        <q-card square class="shadow-24 card-size">
            <q-card-section class="bg-yellow-14">
                <span class="text-h5 text-white q-my-md text-weight-bold inset">Note keep - Login</span>
            </q-card-section>
            <q-card-section>
                <q-form ref="formLogin" class="q-px-sm q-pt-xl " :autofocus="true" @submit.stop="loginSubmit">
                    <q-input square clearable
                             v-model="loginData.email"
                             bottom-slots
                             type="email" label="Email"
                             lazy-rules
                             hint="Correo electronico"
                             :error-message="errorMessage(v$.email.$path)"
                             :error="v$.email.$invalid"
                    >
                        <template v-slot:prepend>
                            <q-icon name="email"/>
                        </template>
                    </q-input>
                    <q-input square clearable
                             v-model="loginData.password"
                             bottom-slots
                             type="password" label="Contraseña"
                             hint="Contraseña"
                             :error-message="errorMessage(v$.password.$path)"
                             :error="v$.password.$invalid"
                    >
                        <template v-slot:prepend>
                            <q-icon name="lock"/>
                        </template>
                    </q-input>
                    <q-btn unelevated type="submit"
                           size="lg" color="dark"
                           class="full-width text-white q-mt-lg"
                           label="Inicio de Sesión"/>
                </q-form>
            </q-card-section>
            <q-card-actions align="center">
                <q-btn @click="toggleLogin = false"
                       color="warning"
                >
                    Crear Cuenta
                </q-btn>
            </q-card-actions>
        </q-card>

        <InfoDialog v-model="show" :msg="msg" :is-error="isError"/>
    </div>

</template>

<script setup lang="ts">

import {computed, reactive, ref} from "vue";

import useValidator from './composable/use-vuelidate';
import {LoginStore} from "../../store/loginModule";
import {useModule} from "../../../../../core/app/store";
import {QForm} from "quasar";
import InfoDialog from "../../commons/InfoDialog.vue";
import {string} from "purify-ts";

const loginStore: LoginStore = useModule(LoginStore);

const loginData = reactive({
    email: '',
    password: ''
})

const {v$} = useValidator(loginData);

const formLogin = ref<QForm | null>(null);

const show = ref<boolean>(false);
const isError = ref<boolean>(false);
const msg = ref<string>('');

interface Props {
    modelValue: boolean;
}

const props = defineProps<Props>()
const emit = defineEmits(['update:modelValue'])

const toggleLogin = computed({
    get: () => props.modelValue,
    set: (value) => emit('update:modelValue', value)
})


const loginSubmit = async (formData: FormDataEvent) => {
    if (!v$.value.$error) {
        const result = await loginStore.submitLogin(loginData);
        result.either(
            (l) => {
                show.value = true;
                msg.value = l.getMessage();
                isError.value = true;
            },
            (_) => {
                v$.value.$reset()
                window.location.href = "/note-keep"
            }
        );
    }
}

const errorMessage = (field: string) => {
    const fieldCheck = v$.value[field];
    if (field === 'email') {
        if (fieldCheck.email.$invalid) return 'Debe ser un email'
        if (fieldCheck.required.$invalid) return 'Campo requerido'
    }
    if (field === 'password') {
        if (fieldCheck.maxLength.$invalid) return 'Tamaño máximo de 15'
        if (fieldCheck.required.$invalid) return 'Campo requerido'
    }
    return ''
}

</script>

<style scoped>
</style>
