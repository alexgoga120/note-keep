import {UseCase} from "./../../../../core/domain/usecase";

import {UseCaseCommand} from "../../../../core/domain/usecase";

import NotePort from "../ports/notePort";
import TYPES from "../noteTypes";
import {Either, Right} from "purify-ts/Either";
import failure from "../../../../core/domain/failure";
import {inject, injectable} from "inversify";

export default interface DeleteNoteUseCase
    extends UseCase<void, DeleteNoteUseCaseCommand> {
}

@injectable()
export class DeleteNoteUseCaseImpl implements DeleteNoteUseCase {
    private _notePort: NotePort;

    public constructor(@inject(TYPES.NotePort) _notePort: NotePort) {
        this._notePort = _notePort;
    }

    async execute(
        command: DeleteNoteUseCaseCommand
    ): Promise<Either<failure, void>> {
        await this._notePort.deleteNote(command.id);
        return Right(undefined);
    }
}

export class DeleteNoteUseCaseCommand implements UseCaseCommand {
    public constructor(private readonly _id: number) {
    }

    public get id(): number {
        return this._id;
    }
}
