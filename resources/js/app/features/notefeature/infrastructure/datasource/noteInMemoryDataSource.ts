import {injectable} from "inversify";
import {NoteModel} from "../model/noteModel";
import {NoteDatasource} from "./noteDatasource";
import {ApiResponse} from "../../domain/entities/apiResponse";
import {AxiosResponse} from "axios";
import {axiosInstance} from "../../../../core/infrastructure/provider";
import Note from "../../domain/entities/note";
import {NoteStore} from "../../application/store/noteModule";
import {useModule} from "../../../../core/app/store";
// ListModel und DetailModel einbauen
// dataSource (inMemoryAdapter?) checken
@injectable()
export class NoteInMemoryDataSource implements NoteDatasource {
    async createNote(noteData: Note): Promise<ApiResponse> {

        let createdNote: ApiResponse = await axiosInstance.request({
            url: '/notes',
            method: "POST",
            data: noteData
        }).then((response: AxiosResponse) => {
            return {
                code: response.status,
                data: response.data
            }
        }).catch(reason => {
            const code = reason.response.status;
            const error = 'error';
            // const errors = reason.response.data.errors;

            return {
                code,
                error
            }
        })

        return Promise.resolve(createdNote);
    }

    async modifyNote(noteData: Note): Promise<ApiResponse> {
        let createdNote: ApiResponse = await axiosInstance.request({
            url: `/notes/${noteData.id}`,
            method: "PUT",
            data: noteData
        }).then((response: AxiosResponse) => {
            return {
                code: response.status,
                data: response.data
            }
        }).catch(reason => {
            const code = reason.response.status;
            const error = 'error';
            // const errors = reason.response.data.errors;

            return {
                code,
                error
            }
        })

        return Promise.resolve(createdNote);
    }

    async listNote(): Promise<Note[]> {
        let notes: Note[] = await axiosInstance.request({
            url: '/notes',
            method: "GET"
        }).then((response: AxiosResponse) => {
            return response.data.data
        }).catch(reason => {
            const code = reason.response.status;
            const error = 'error';
            return {
                code,
                error
            }
        })
        return Promise.resolve(notes);
    }

    async listArchive(): Promise<Note[]> {
        let notesArchved: Note[] = await axiosInstance.request({
            url: '/notes/archived',
            method: "GET"
        }).then((response: AxiosResponse) => {
            return response.data.data
        }).catch(reason => {
            const code = reason.response.status;
            const error = 'error';
            return {
                code,
                error
            }
        })

        return Promise.resolve(notesArchved);
    }

    async deleteNote(id: number): Promise<ApiResponse> {
        let notesArchived: ApiResponse = await axiosInstance.request({
            url: `/notes/${id}`,
            method: "DELETE"
        }).then((response: AxiosResponse) => {
            return {
                code: response.status,
                data: response.data
            }
        }).catch(reason => {
            const code = reason.response.status;
            const error = 'error';
            return {
                code,
                error
            }
        })

        return Promise.resolve(notesArchived);
    }

    async archiveNote(id: number): Promise<ApiResponse> {
        let notesArchived: ApiResponse = await axiosInstance.request({
            url: `/notes/${id}/archived`,
            method: "POST"
        }).then((response: AxiosResponse) => {
            return {
                code: response.status,
                data: response.data
            }
        }).catch(reason => {
            const code = reason.response.status;
            const error = 'error';
            return {
                code,
                error
            }
        })

        return Promise.resolve(notesArchived);
    }

    async pinNote(id: number): Promise<ApiResponse> {
        let notesArchived: ApiResponse = await axiosInstance.request({
            url: `/notes/${id}/pin`,
            method: "POST"
        }).then((response: AxiosResponse) => {
            return {
                code: response.status,
                data: response.data
            }
        }).catch(reason => {
            const code = reason.response.status;
            const error = 'error';
            return {
                code,
                error
            }
        })

        return Promise.resolve(notesArchived);
    }
}
