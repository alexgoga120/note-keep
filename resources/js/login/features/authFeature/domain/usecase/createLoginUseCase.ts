import Login from "../entities/login";
import { UseCase, UseCaseCommand } from "../../../../core/domain/usecase";
import { Either, Left, Right } from "purify-ts/Either";
import failure from "../../../../core/domain/failure";
import LoginPort from "../port/loginPort";
import { inject, injectable } from "inversify";
import TYPES from "../loginTypes";
import LoginFailure from "../loginFailure";
export default interface CreateLoginUseCase
  extends UseCase<Login, CreateLoginUseCaseCommand> {}
@injectable()
export class CreateLoginUseCaseImpl implements CreateLoginUseCase {
  private _loginPort: LoginPort;

  public constructor(@inject(TYPES.LoginPort) _loginPort: LoginPort) {
    this._loginPort = _loginPort;
  }

  async execute(
    command: CreateLoginUseCaseCommand
  ): Promise<Either<failure, Login>> {
    if (!command.loginName) {
      return Left(LoginFailure.emptyName);
    }
    if (command.loginName.length > 15) {
      return Left(LoginFailure.nameTooLong);
    }
    const result = await this._loginPort.createLogin(command.loginName);
    return Right(result);
  }
}
export class CreateLoginUseCaseCommand implements UseCaseCommand {
  public constructor(private readonly _loginName: string) {}

  public get loginName(): string {
    return this._loginName;
  }
}
