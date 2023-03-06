import {InjectionKey} from "vue";
import Vuex from "vuex";
import {createStore, useStore as baseUseStore, Store} from "vuex";
import {VuexModule, getModule} from "vuex-module-decorators";
import {NoteState, NoteStore} from "../../../features/notefeature/application/store/noteModule";

export interface RootState {
    noteModule: NoteState;
}

// define injection key
export const key: InjectionKey<Store<RootState>> = Symbol();

export const store = new Vuex.Store<RootState>({
    modules: {
        noteModule: NoteStore,
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
