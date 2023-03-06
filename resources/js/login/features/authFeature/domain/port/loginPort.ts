import LoginData from "../entities/loginData";
import {ApiResponse} from "../entities/apiResponse";
import SigninData from "../entities/signinData";

export default interface LoginPort {
    requestLogin(loginData: LoginData): Promise<Awaited<ApiResponse>>;

    requestSignin(signinData: SigninData): Promise<Awaited<ApiResponse>>;

}
