import {
    EmptyUseCaseCommand,
    UseCase,
    UseCaseCommand,
} from "../../../../core/domain/usecase";

import {inject, injectable} from "inversify";
import {Either, Right} from "purify-ts/Either";
import Failure from "../../../../core/domain/failure";
import Note from "../entities/note";
import NotePort from "../ports/notePort";
import TYPES from "../noteTypes";

export default interface ListNoteUseCase
    extends UseCase<Note[], EmptyUseCaseCommand> {
}

@injectable()
export class ListNoteUseCaseImpl implements ListNoteUseCase {
    private _notePort: NotePort;

    public constructor(@inject(TYPES.NotePort) _notePort: NotePort) {
        this._notePort = _notePort;
    }

    async execute(
        command: EmptyUseCaseCommand
    ): Promise<Either<Failure, Note[]>> {
        const notes = await this._notePort.listNote();
        return Right(notes);
    }
}
