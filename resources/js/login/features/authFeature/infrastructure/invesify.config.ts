import "reflect-metadata";
import { LoginInMemoryDataSource } from "./datasource/LoginInMemoryDataSource";
import { LoginDatasource } from "./datasource/LoginDatasource";
import { ListLoginUseCaseImpl } from "./../domain/usecase/listLoginUseCase";
import { DeleteLoginUseCaseImpl } from "./../domain/usecase/deleteLoginUseCase";
import { CreateLoginUseCaseImpl } from "./../domain/usecase/createLoginUseCase";
import { Container } from "inversify";

import getDecorators from "inversify-inject-decorators";
import LoginAdapter from "./loginAdapter";
import TYPES from "../domain/loginTypes";
import DeleteLoginUseCase from "../domain/usecases/deleteLoginUseCase";
import ListLoginUseCase from "../domain/usecases/listLoginUseCase";
import CreateLoginUseCase from "../domain/usecases/createLoginUseCase";
import LoginPort from "../domain/ports/todoPort";

const container = new Container();
container.bind<LoginPort>(TYPES.LoginPort).to(LoginAdapter);
container.bind<LoginDatasource>(TYPES.LoginDataSource).to(LoginInMemoryDataSource);
// .toConstructor<LoginInMemoryDataSource>(LoginInMemoryDataSource);
container
  .bind<CreateLoginUseCase>(TYPES.CreateLoginUseCase)
  .to(CreateLoginUseCaseImpl);
container.bind<ListLoginUseCase>(TYPES.ListLoginUseCase).to(ListLoginUseCaseImpl);
container
  .bind<DeleteLoginUseCase>(TYPES.DeleteLoginUseCase)
  .to(DeleteLoginUseCaseImpl);
const { lazyInject } = getDecorators(container);
export { lazyInject, container };
