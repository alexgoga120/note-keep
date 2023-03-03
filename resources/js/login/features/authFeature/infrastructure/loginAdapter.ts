import { inject, injectable } from "inversify";
import Login from "../domain/entities/login";
import LoginPort from "../domain/port/loginPort";
import TYPES from "../domain/loginTypes";
import { LoginDatasource } from "./datasource/LoginDatasource";

@injectable()
export default class LoginAdapter implements LoginPort {
  public todoDataSource!: LoginDatasource;

  public constructor(
    @inject(TYPES.LoginDataSource) todoDatasource: LoginDatasource
  ) {
    this.todoDataSource = todoDatasource;
  }

  async createTodo(todoName: string): Promise<Login> {
    return this.todoDataSource.createTodo(todoName);
  }

  listTodo(): Promise<Login[]> {
    return this.todoDataSource.listTodo();
  }

  async deleteTodo(id: number): Promise<void> {
    return this.todoDataSource.deleteTodo(id);
  }
}
