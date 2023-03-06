import {inject, injectable} from "inversify";
import Note from "../domain/entities/note";
import NotePort from "../domain/ports/notePort";
import TYPES from "../domain/noteTypes";
import {NoteDatasource} from "./datasource/noteDatasource";
import {ApiResponse} from "../domain/entities/apiResponse";

@injectable()
export default class NoteAdapter implements NotePort {
    public noteDataSource!: NoteDatasource;

    public constructor(
        @inject(TYPES.NoteDataSource) noteDatasource: NoteDatasource
    ) {
        this.noteDataSource = noteDatasource;
    }

    async createNote(noteData: Note): Promise<ApiResponse> {
        return this.noteDataSource.createNote(noteData);
    }

    async modifyNote(noteData: Note): Promise<ApiResponse> {
        return this.noteDataSource.modifyNote(noteData);
    }

    listNote(): Promise<Note[]> {
        return this.noteDataSource.listNote();
    }

    listArchivedNote(): Promise<Note[]> {
        return this.noteDataSource.listArchive();
    }

    async deleteNote(id: number): Promise<ApiResponse> {
        return this.noteDataSource.deleteNote(id);
    }

    async archiveNote(id: number): Promise<ApiResponse> {
        return this.noteDataSource.archiveNote(id);
    }

    async pinNote(id: number): Promise<ApiResponse> {
        return this.noteDataSource.pinNote(id);
    }
}
