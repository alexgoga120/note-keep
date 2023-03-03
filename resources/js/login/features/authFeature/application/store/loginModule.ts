import {Action, Module, Mutation, VuexModule} from "vuex-module-decorators";
import {lazyInject} from "../../infrastructure/invesify.config";

import Login from "../../domain/entities/login";

import {Either, Right} from "purify-ts/Either";
import Failure from "../../../../core/domain/failure";
import ListLoginUseCase from "../../domain/usecase/listLoginUseCase";
import CreateLoginUseCase, {
    CreateLoginUseCaseCommand,
} from "../../domain/usecase/createLoginUseCase";
import DeleteLoginUseCase, {
    DeleteLoginUseCaseCommand,
} from "../../domain/usecase/deleteLoginUseCase";
import TYPES from "../../domain/loginTypes";
import {EmptyUseCaseCommand} from "../../../../core/domain/usecase";

export interface LoginState {
    logins: Login[];
}

@Module({
    name: "loginModule",
    namespaced: true,
})
export class LoginStore extends VuexModule implements LoginState {
    @lazyInject(TYPES.ListLoginUseCase)
    public listUsecase!: ListLoginUseCase;
    @lazyInject(TYPES.CreateLoginUseCase)
    public createUsecase!: CreateLoginUseCase;
    @lazyInject(TYPES.DeleteLoginUseCase)
    public deleteUsecase!: DeleteLoginUseCase;

    public logins: Login[] = [];

    @Mutation
    setLogins(items: Login[]) {
        this.logins = items;
    }

    @Action({rawError: true})
    async fetchLogins(): Promise<Either<Failure, void>> {
        const list = await this.listUsecase.execute(new EmptyUseCaseCommand());
        return list.chain((r) => {
            this.setLogins(r);
            return Right(undefined);
        });
    }

    @Action({rawError: true})
    async addLogin(loginName: string): Promise<Either<Failure, Login>> {
        const createdLogin = await this.createUsecase.execute(
            new CreateLoginUseCaseCommand(loginName)
        );

        return createdLogin.chain((r) => {
            this.logins.push(r);
            return Right(r);
        });
    }

    @Action({rawError: true})
    async deleteLogin(id: number) {
        await this.deleteUsecase.execute(new DeleteLoginUseCaseCommand(id));
        await this.fetchLogins();
    }
}
