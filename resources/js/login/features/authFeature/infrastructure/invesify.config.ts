import "reflect-metadata";
import {Container} from "inversify";

import getDecorators from "inversify-inject-decorators";
import LoginAdapter from "./loginAdapter";
import TYPES from "../domain/loginTypes";
import LoginPort from "../domain/port/loginPort";
import LoginUseCase, {LoginUseCaseImpl} from "../domain/usecase/loginUseCase";
import {LoginDatasource} from "./datasource/LoginDatasource";
import {LoginInMemoryDataSource} from "./datasource/LoginInMemoryDataSource";

const container = new Container();
container.bind<LoginPort>(TYPES.LoginPort).to(LoginAdapter);
// container.bind<LoginDatasource>(TYPES.LoginDataSource);
container.bind<LoginDatasource>(TYPES.LoginDataSource).to(LoginInMemoryDataSource);
container
    .bind<LoginUseCase>(TYPES.LoginUseCase)
    .to(LoginUseCaseImpl);
const {lazyInject} = getDecorators(container);
export {lazyInject, container};
