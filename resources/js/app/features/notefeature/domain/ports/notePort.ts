import Note from "../entities/note";
import {ApiResponse} from "../entities/apiResponse";

export default interface NotePort {
    createNote(noteData: Note): Promise<ApiResponse>;

    modifyNote(noteData: Note): Promise<ApiResponse>;

    listNote(): Promise<Note[]>;

    listArchivedNote(): Promise<Note[]>;

    deleteNote(id: number): Promise<ApiResponse>;

    archiveNote(id: number): Promise<ApiResponse>;
}
