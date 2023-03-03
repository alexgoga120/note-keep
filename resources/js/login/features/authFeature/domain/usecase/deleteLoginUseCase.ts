import { UseCase } from "../../../../core/domain/usecase";

import { UseCaseCommand } from "../../../../core/domain/usecase";

import LoginPort from "../port/loginPort";
import TYPES from "../loginTypes";
import { Either, Right } from "purify-ts/Either";
import failure from "../../../../core/domain/failure";
import { inject, injectable } from "inversify";
export default interface DeleteLoginUseCase
  extends UseCase<void, DeleteLoginUseCaseCommand> {}
@injectable()
export class DeleteLoginUseCaseImpl implements DeleteLoginUseCase {
  private _loginPort: LoginPort;

  public constructor(@inject(TYPES.LoginPort) _loginPort: LoginPort) {
    this._loginPort = _loginPort;
  }

  async execute(
    command: DeleteLoginUseCaseCommand
  ): Promise<Either<failure, void>> {
    await this._loginPort.deleteLogin(command.id);
    return Right(undefined);
  }
}
export class DeleteLoginUseCaseCommand implements UseCaseCommand {
  public constructor(private readonly _id: number) {}

  public get id(): number {
    return this._id;
  }
}
