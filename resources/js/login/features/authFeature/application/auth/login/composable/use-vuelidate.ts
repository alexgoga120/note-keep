import useVuelidate from '@vuelidate/core';
import {required, email, maxLength} from '@vuelidate/validators'
import LoginData from "../../../../domain/entities/loginData";

export default function useValidator(entity: LoginData) {
    const DEFAULT_CONFIGURATION = {$autoDirty: true, $lazy: true, $dirty: true};

    const rules = {
        email: {required, email},
        password: {required, maxLength: maxLength(15)}
    };

    const v$ = useVuelidate<LoginData>(rules, entity, DEFAULT_CONFIGURATION);

    return {
        v$
    };
}
