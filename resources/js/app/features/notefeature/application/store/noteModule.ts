import {Action, Module, Mutation, VuexModule} from "vuex-module-decorators";
import {lazyInject} from "../../infrastructure/inversify.config";

import Note from "../../domain/entities/note";

import {Either, Left, Right} from "purify-ts/Either";
import Failure from "../../../../core/domain/failure";
import ListNoteUseCase from "../../domain/usecase/listNoteUseCase";
import CreateNoteUseCase, {
    CreateNoteUseCaseCommand,
} from "../../domain/usecase/createNoteUseCase";
import DeleteNoteUseCase, {
    DeleteNoteUseCaseCommand,
} from "../../domain/usecase/deleteNoteUseCase";
import TYPES from "../../domain/noteTypes";
import {EmptyUseCaseCommand} from "../../../../core/domain/usecase";
import {ApiResponse} from "../../domain/entities/apiResponse";
import LoginFailure from "../../../../../login/features/authFeature/domain/loginFailure";
import ArchiveNoteUseCase, {ArchiveNoteUseCaseCommand} from "../../domain/usecase/archiveNoteUseCase";
import ListArchivedNoteUseCase from "../../domain/usecase/listArchivedNoteUseCase";
import ModifyNoteUseCase, {ModifyNoteUseCaseCommand} from "../../domain/usecase/modifyNoteUseCase";
import PinNoteUseCase, {PinNoteUseCaseCommand} from "../../domain/usecase/pinNoteUseCase";

export interface NoteState {
    notes: Note[];
}

@Module({
    name: "noteModule",
    namespaced: true,
})
export class NoteStore extends VuexModule implements NoteState {
    @lazyInject(TYPES.ListNoteUseCase)
    public listUsecase!: ListNoteUseCase;
    @lazyInject(TYPES.ListArchivedNoteUseCase)
    public listArchiveUsecase!: ListArchivedNoteUseCase;
    @lazyInject(TYPES.CreateNoteUseCase)
    public createUsecase!: CreateNoteUseCase;
    @lazyInject(TYPES.ModifyNoteUseCase)
    public modifyUsecase!: ModifyNoteUseCase;
    @lazyInject(TYPES.DeleteNoteUseCase)
    public deleteUsecase!: DeleteNoteUseCase;
    @lazyInject(TYPES.ArchiveNoteUseCase)
    public archiveUsecase!: ArchiveNoteUseCase;
    @lazyInject(TYPES.PinNoteUseCase)
    public pinUsecase!: PinNoteUseCase;

    public notes: Note[] = [];
    public archivedNotes: Note[] = [];

    @Mutation
    setNotes(items: Note[]) {
        this.notes = items;
    }

    @Mutation
    setArchivedNotes(items: Note[]) {
        this.archivedNotes = items;
    }

    @Action({rawError: true})
    async fetchNotes(): Promise<Either<Failure, void>> {
        const list = await this.listUsecase.execute(new EmptyUseCaseCommand());
        return list.chain((r) => {
            this.setNotes(r);
            return Right(undefined);
        });
    }

    @Action({rawError: true})
    async fetchArchiveNotes(): Promise<Either<Failure, void>> {
        const list = await this.listArchiveUsecase.execute(new EmptyUseCaseCommand());
        return list.chain((r) => {
            this.setArchivedNotes(r);
            return Right(undefined);
        });
    }

    @Action({rawError: true})
    async addNote(noteData: Note): Promise<Either<Failure, ApiResponse>> {
        const addNote = await this.createUsecase.execute(
            new CreateNoteUseCaseCommand(noteData)
        );
        return addNote.chain((r) => {
            if (r.code != 200) {
                return Left(LoginFailure.apiError(r.code.toString(), r.error || ''));
            }
            this.fetchNotes();
            this.fetchArchiveNotes();
            return Right(r);
        });
    }

    @Action({rawError: true})
    async modifyNote(noteData: Note): Promise<Either<Failure, ApiResponse>> {
        const modifyNote = await this.modifyUsecase.execute(
            new ModifyNoteUseCaseCommand(noteData)
        );
        return modifyNote.chain((r) => {
            if (r.code != 200) {
                return Left(LoginFailure.apiError(r.code.toString(), r.error || ''));
            }
            this.fetchNotes();
            this.fetchArchiveNotes();
            return Right(r);
        });
    }

    @Action({rawError: true})
    async deleteNote(id: number) {
        await this.deleteUsecase.execute(new DeleteNoteUseCaseCommand(id));
        await this.fetchNotes();
        await this.fetchArchiveNotes();
    }

    @Action({rawError: true})
    async archiveNote(id: number) {
        await this.archiveUsecase.execute(new ArchiveNoteUseCaseCommand(id));
        await this.fetchNotes();
        await this.fetchArchiveNotes();
    }

    @Action({rawError: true})
    async pinNote(id: number) {
        await this.pinUsecase.execute(new PinNoteUseCaseCommand(id));
        await this.fetchNotes();
        await this.fetchArchiveNotes();
    }
}
