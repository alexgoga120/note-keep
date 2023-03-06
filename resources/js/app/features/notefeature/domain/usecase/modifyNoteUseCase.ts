import Note from "../entities/note";
import {UseCase, UseCaseCommand} from "../../../../core/domain/usecase";
import {Either, Left, Right} from "purify-ts/Either";
import failure from "../../../../core/domain/failure";
import NotePort from "../ports/notePort";
import {inject, injectable} from "inversify";
import TYPES from "../noteTypes";
import NoteFailure from "../noteFailure";
import {ApiResponse} from "../entities/apiResponse";

export default interface ModifyNoteUseCase
    extends UseCase<ApiResponse, ModifyNoteUseCaseCommand> {
}

@injectable()
export class ModifyNoteUseCaseImpl implements ModifyNoteUseCase {
    private _notePort: NotePort;

    public constructor(@inject(TYPES.NotePort) _notePort: NotePort) {
        this._notePort = _notePort;
    }

    async execute(
        command: ModifyNoteUseCaseCommand
    ): Promise<Either<failure, ApiResponse>> {
        const result = await this._notePort.modifyNote(command.noteData);
        return Right(result);
    }
}

export class ModifyNoteUseCaseCommand implements UseCaseCommand {
    public constructor(private readonly _noteData: Note) {
    }

    public get noteData(): Note {
        return this._noteData;
    }
}
