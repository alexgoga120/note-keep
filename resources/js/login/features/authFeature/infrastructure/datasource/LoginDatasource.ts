import {LoginModel} from "../model/loginModel";
import {ApiResponse} from "../../domain/entities/apiResponse";
import SigninData from "../../domain/entities/signinData";

export interface LoginDatasource {
    requestLogin(loginData: LoginModel): Promise<Awaited<ApiResponse>>;

    requestSignin(loginData: SigninData): Promise<Awaited<ApiResponse>>;
}
