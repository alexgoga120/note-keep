import {InjectionKey} from "vue";
import Vuex from "vuex";
import {
    LoginState,
    LoginStore,
} from "../../../features/authFeature/application/store/loginModule";
import {createStore, useStore as baseUseStore, Store} from "vuex";
import {VuexModule, getModule} from "vuex-module-decorators";

export interface RootState {
    todoModule: LoginState;
}

// define injection key
export const key: InjectionKey<Store<RootState>> = Symbol();

export const store = new Vuex.Store<RootState>({
    modules: {
        todoModule: LoginStore,
    },
});

function useStore() {
    return baseUseStore(key);
}

declare type ConstructorOf<C> = {
    new(...args: any[]): C;
};

export function useModule<M extends VuexModule>(
    moduleClass: ConstructorOf<M>
): M {
    const store = useStore();
    const moduleStore: M = getModule(moduleClass, store);
    return moduleStore;
}
