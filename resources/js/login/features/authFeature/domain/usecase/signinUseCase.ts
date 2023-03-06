import {UseCase, UseCaseCommand} from "../../../../core/domain/usecase";
import {Either, Left, Right} from "purify-ts/Either";
import LoginPort from "../port/loginPort";
import {inject, injectable} from "inversify";
import TYPES from "../loginTypes";
import Failure from "../../../../core/domain/failure";
import {ApiResponse} from "../entities/apiResponse";
import SigninData from "../entities/signinData";

export default interface SigninUseCase
    extends UseCase<ApiResponse, SigninUseCaseCommand> {
}

@injectable()
export class SigninUseCaseImpl implements SigninUseCase {
    private _loginPort: LoginPort;

    public constructor(@inject(TYPES.LoginPort) _loginPort: LoginPort) {
        this._loginPort = _loginPort;
    }

    async execute(
        command: SigninUseCaseCommand
    ): Promise<Either<Failure, ApiResponse>> {
        const result = await this._loginPort.requestSignin(command.loginData);
        console.log(result, "Signin use case")
        return Right(result);
    }
}

export class SigninUseCaseCommand implements UseCaseCommand {
    public constructor(private readonly _loginData: SigninData) {
    }

    public get loginData(): SigninData {
        return this._loginData;
    }
}
