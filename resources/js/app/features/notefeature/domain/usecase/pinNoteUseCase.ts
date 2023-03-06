import {UseCase} from "./../../../../core/domain/usecase";

import {UseCaseCommand} from "../../../../core/domain/usecase";

import NotePort from "../ports/notePort";
import TYPES from "../noteTypes";
import {Either, Right} from "purify-ts/Either";
import failure from "../../../../core/domain/failure";
import {inject, injectable} from "inversify";

export default interface PinNoteUseCase
    extends UseCase<void, PinNoteUseCaseCommand> {
}

@injectable()
export class PinNoteUseCaseImpl implements PinNoteUseCase {
    private _notePort: NotePort;

    public constructor(@inject(TYPES.NotePort) _notePort: NotePort) {
        this._notePort = _notePort;
    }

    async execute(
        command: PinNoteUseCaseCommand
    ): Promise<Either<failure, void>> {
        await this._notePort.pinNote(command.id);
        return Right(undefined);
    }
}

export class PinNoteUseCaseCommand implements UseCaseCommand {
    public constructor(private readonly _id: number) {
    }

    public get id(): number {
        return this._id;
    }
}
