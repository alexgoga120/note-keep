import Note from "../entities/note";
import {UseCase, UseCaseCommand} from "../../../../core/domain/usecase";
import {Either, Left, Right} from "purify-ts/Either";
import failure from "../../../../core/domain/failure";
import NotePort from "../ports/notePort";
import {inject, injectable} from "inversify";
import TYPES from "../noteTypes";
import NoteFailure from "../noteFailure";
import {ApiResponse} from "../entities/apiResponse";

export default interface CreateNoteUseCase
    extends UseCase<ApiResponse, CreateNoteUseCaseCommand> {
}

@injectable()
export class CreateNoteUseCaseImpl implements CreateNoteUseCase {
    private _notePort: NotePort;

    public constructor(@inject(TYPES.NotePort) _notePort: NotePort) {
        this._notePort = _notePort;
    }

    async execute(
        command: CreateNoteUseCaseCommand
    ): Promise<Either<failure, ApiResponse>> {
        const result = await this._notePort.createNote(command.noteData);

        return Right(result);
    }
}

export class CreateNoteUseCaseCommand implements UseCaseCommand {
    public constructor(private readonly _noteData: Note) {
    }

    public get noteData(): Note {
        return this._noteData;
    }
}
