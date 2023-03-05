import {LoginModel} from "../model/loginModel";
import {ApiResponse} from "../../domain/entities/apiResponse";

export interface LoginDatasource {
    requestLogin(loginData: LoginModel): Promise<Awaited<ApiResponse>>;
}
