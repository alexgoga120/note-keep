import {Action, Module, Mutation, VuexModule} from "vuex-module-decorators";
import {lazyInject} from "../../infrastructure/invesify.config";

import LoginData from "../../domain/entities/loginData";

import {Either, Right, Left} from "purify-ts/Either";
import Failure from "../../../../core/domain/failure";
import LoginUseCase, {
    LoginUseCaseCommand,
} from "../../domain/usecase/loginUseCase";
import TYPES from "../../domain/loginTypes";
import {ApiResponse} from "../../domain/entities/apiResponse";
import LoginFailure from "../../domain/loginFailure";

export interface LoginState {

}

@Module({
    name: "loginModule",
    namespaced: true,
})
export class LoginStore extends VuexModule implements LoginState {
    @lazyInject(TYPES.LoginUseCase)
    public loginUseCase!: LoginUseCase;

    @Action({rawError: true})
    async submitLogin(loginData: LoginData): Promise<Either<Failure, ApiResponse>> {
        console.log(loginData)
        const createdLogin = await this.loginUseCase.execute(
            new LoginUseCaseCommand(loginData)
        );
        return createdLogin.chain((r) => {
            if (r.code != 200) {
                return Left(LoginFailure.apiError(r.code.toString(), r.error || ''));
            }
            return Right(r);
        });
    }
}
