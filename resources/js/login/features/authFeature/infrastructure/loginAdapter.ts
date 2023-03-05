import {inject, injectable} from "inversify";
import LoginPort from "../domain/port/loginPort";
import TYPES from "../domain/loginTypes";
import {LoginDatasource} from "./datasource/LoginDatasource";
import LoginData from "../domain/entities/loginData";
import {axiosInstance} from "../../../core/infrastructure/provider";
import {AxiosResponse} from "axios";
import {ApiResponse} from "../domain/entities/apiResponse";

@injectable()
export default class LoginAdapter implements LoginPort {
    public loginDataSource!: LoginDatasource;

    public constructor(
        @inject(TYPES.LoginDataSource) loginDatasource: LoginDatasource
    ) {
        this.loginDataSource = loginDatasource;
        console.log("adapter")
    }

    async requestLogin(loginData: LoginData): Promise<ApiResponse> {
        return await this.loginDataSource.requestLogin(loginData);
    }
}
