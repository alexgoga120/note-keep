import {
  EmptyUseCaseCommand,
  UseCase,
  UseCaseCommand,
} from "../../../../core/domain/usecase";

import { inject, injectable } from "inversify";
import { Either, Right } from "purify-ts/Either";
import Failure from "../../../../core/domain/failure";
import Login from "../entities/login";
import LoginPort from "../port/loginPort";
import TYPES from "../loginTypes";

export default interface ListLoginUseCase
  extends UseCase<Login[], EmptyUseCaseCommand> {}
@injectable()
export class ListLoginUseCaseImpl implements ListLoginUseCase {
  private _loginPort: LoginPort;

  public constructor(@inject(TYPES.LoginPort) _loginPort: LoginPort) {
    this._loginPort = _loginPort;
  }
  async execute(
    command: EmptyUseCaseCommand
  ): Promise<Either<Failure, Login[]>> {
    const logins = await this._loginPort.listLogin();
    return Right(logins);
  }
}
