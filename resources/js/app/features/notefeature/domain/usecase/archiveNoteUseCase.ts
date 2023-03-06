import {UseCase} from "./../../../../core/domain/usecase";

import {UseCaseCommand} from "../../../../core/domain/usecase";

import NotePort from "../ports/notePort";
import TYPES from "../noteTypes";
import {Either, Right} from "purify-ts/Either";
import failure from "../../../../core/domain/failure";
import {inject, injectable} from "inversify";

export default interface ArchiveNoteUseCase
    extends UseCase<void, ArchiveNoteUseCaseCommand> {
}

@injectable()
export class ArchiveNoteUseCaseImpl implements ArchiveNoteUseCase {
    private _notePort: NotePort;

    public constructor(@inject(TYPES.NotePort) _notePort: NotePort) {
        this._notePort = _notePort;
    }

    async execute(
        command: ArchiveNoteUseCaseCommand
    ): Promise<Either<failure, void>> {
        await this._notePort.archiveNote(command.id);
        return Right(undefined);
    }
}

export class ArchiveNoteUseCaseCommand implements UseCaseCommand {
    public constructor(private readonly _id: number) {
    }

    public get id(): number {
        return this._id;
    }
}
