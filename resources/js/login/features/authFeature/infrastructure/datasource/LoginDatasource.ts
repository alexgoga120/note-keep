import { LoginModel } from "../model/loginModel";
export interface LoginDatasource {
  createTodo(todoName: string): Promise<LoginModel>;

  listTodo(): Promise<LoginModel[]>;

  deleteTodo(id: number): Promise<void>;
}
