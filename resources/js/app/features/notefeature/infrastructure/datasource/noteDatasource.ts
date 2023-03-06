import {NoteModel} from "./../model/noteModel";
import {ApiResponse} from "../../domain/entities/apiResponse";
import Note from "../../domain/entities/note";

export interface NoteDatasource {
    createNote(noteData: NoteModel): Promise<ApiResponse>;

    modifyNote(noteData: NoteModel): Promise<ApiResponse>;

    listNote(): Promise<Note[]>;

    listArchive(): Promise<Note[]>;

    deleteNote(id: number): Promise<ApiResponse>;

    archiveNote(id: number): Promise<ApiResponse>;

    pinNote(id: number): Promise<ApiResponse>;
}
