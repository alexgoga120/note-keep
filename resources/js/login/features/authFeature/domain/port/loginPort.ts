import LoginData from "../entities/loginData";
import {ApiResponse} from "../entities/apiResponse";

export default interface LoginPort {
    requestLogin(loginData: LoginData): Promise<Awaited<ApiResponse>>;

}
