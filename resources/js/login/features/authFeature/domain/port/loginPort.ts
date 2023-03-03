import Login from "../entities/login";

export default interface LoginPort {
  createLogin(todoName: string): Promise<Login>;

  listLogin(): Promise<Login[]>;

  deleteLogin(id: number): Promise<void>;
}
