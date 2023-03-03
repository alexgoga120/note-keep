import { injectable } from "inversify";
import { LoginModel } from "../model/loginModel";
import { LoginDatasource } from "./LoginDatasource";
// ListModel und DetailModel einbauen
// dataSource (inMemoryAdapter?) checken
@injectable()
export class LoginInMemoryDataSource implements LoginDatasource {
  async createTodo(todoName: string): Promise<LoginModel> {
    const todos: LoginModel[] = await this.listTodo();
    const createdTodo: LoginModel = {
      name: todoName,
      id: todos.length + 1,
    };
    todos.push(createdTodo);
    localStorage.setItem("todos", JSON.stringify(todos));
    return Promise.resolve(createdTodo);
  }
  listTodo(): Promise<LoginModel[]> {
    return Promise.resolve(JSON.parse(localStorage.getItem("todos") || "[]"));
  }
  async deleteTodo(id: number): Promise<void> {
    const todos: LoginModel[] = await this.listTodo();
    const newTodos = todos.filter((todo) => todo.id !== id);
    localStorage.setItem("todos", JSON.stringify(newTodos));
    return Promise.resolve();
  }
}
