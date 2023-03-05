import {UseCase, UseCaseCommand} from "../../../../core/domain/usecase";
import {Either, Left, Right} from "purify-ts/Either";
import LoginPort from "../port/loginPort";
import {inject, injectable} from "inversify";
import TYPES from "../loginTypes";
import LoginData from "../entities/loginData";
import Failure from "../../../../core/domain/failure";
import {ApiResponse} from "../entities/apiResponse";

export default interface LoginUseCase
    extends UseCase<ApiResponse, LoginUseCaseCommand> {
}

@injectable()
export class LoginUseCaseImpl implements LoginUseCase {
    private _loginPort: LoginPort;

    public constructor(@inject(TYPES.LoginPort) _loginPort: LoginPort) {
        this._loginPort = _loginPort;
    }

    async execute(
        command: LoginUseCaseCommand
    ): Promise<Either<Failure, ApiResponse>> {
        const result = await this._loginPort.requestLogin(command.loginData);
        console.log(result, "Login use case")
        return Right(result);
    }
}

export class LoginUseCaseCommand implements UseCaseCommand {
    public constructor(private readonly _loginData: LoginData) {
    }

    public get loginData(): LoginData {
        return this._loginData;
    }
}
