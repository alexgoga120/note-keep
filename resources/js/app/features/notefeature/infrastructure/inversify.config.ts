import "reflect-metadata";
import {NoteInMemoryDataSource} from "./datasource/noteInMemoryDataSource";
import {NoteDatasource} from "./datasource/noteDatasource";
import {ListNoteUseCaseImpl} from "../domain/usecase/listNoteUseCase";
import {DeleteNoteUseCaseImpl} from "../domain/usecase/deleteNoteUseCase";
import {CreateNoteUseCaseImpl} from "../domain/usecase/createNoteUseCase";
import {Container} from "inversify";

import getDecorators from "inversify-inject-decorators";
import NoteAdapter from "./noteAdapter";
import TYPES from "../domain/noteTypes";
import DeleteNoteUseCase from "../domain/usecase/deleteNoteUseCase";
import ListNoteUseCase from "../domain/usecase/listNoteUseCase";
import CreateNoteUseCase from "../domain/usecase/createNoteUseCase";
import NotePort from "../domain/ports/notePort";
import ArchiveNoteUseCase, {ArchiveNoteUseCaseImpl} from "../domain/usecase/archiveNoteUseCase";
import ListArchivedNoteUseCase, {ListArchivedNoteUseCaseImpl} from "../domain/usecase/listArchivedNoteUseCase";
import ModifyNoteUseCase, {ModifyNoteUseCaseImpl} from "../domain/usecase/modifyNoteUseCase";

const container = new Container();
container.bind<NotePort>(TYPES.NotePort).to(NoteAdapter);
container.bind<NoteDatasource>(TYPES.NoteDataSource).to(NoteInMemoryDataSource);
// .toConstructor<NoteInMemoryDataSource>(NoteInMemoryDataSource);
container
    .bind<CreateNoteUseCase>(TYPES.CreateNoteUseCase)
    .to(CreateNoteUseCaseImpl);
container
    .bind<ModifyNoteUseCase>(TYPES.ModifyNoteUseCase)
    .to(ModifyNoteUseCaseImpl);
container.bind<ListNoteUseCase>(TYPES.ListNoteUseCase).to(ListNoteUseCaseImpl);
container.bind<ListArchivedNoteUseCase>(TYPES.ListArchivedNoteUseCase).to(ListArchivedNoteUseCaseImpl);
container
    .bind<DeleteNoteUseCase>(TYPES.DeleteNoteUseCase)
    .to(DeleteNoteUseCaseImpl);
container
    .bind<ArchiveNoteUseCase>(TYPES.ArchiveNoteUseCase)
    .to(ArchiveNoteUseCaseImpl);
const {lazyInject} = getDecorators(container);
export {lazyInject, container};
