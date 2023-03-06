import {injectable} from "inversify";
import {LoginModel} from "../model/loginModel";
import {LoginDatasource} from "./LoginDatasource";
import {ApiResponse} from "../../domain/entities/apiResponse";
import {axiosInstance} from "../../../../core/infrastructure/provider";
import {AxiosResponse} from "axios";
// ListModel und DetailModel einbauen
// dataSource (inMemoryAdapter?) checken
@injectable()
export class LoginInMemoryDataSource implements LoginDatasource {
    async requestLogin(loginData: LoginModel): Promise<ApiResponse> {
        let loginResponse: ApiResponse = await axiosInstance.request({
            url: '/login',
            method: "POST",
            data: loginData
        }).then((response: AxiosResponse) => {
            localStorage.setItem("auth-token", response.data.data.token);
            return {
                code: response.status,
                data: response.data
            }
        }).catch(reason => {
            const code = reason.response.status;
            const errors = reason.response.data.errors;
            let error: string = Object.keys(errors).reduce((previousValue, field) => {
                if (previousValue == '') {
                    return errors[field].join(", ")
                }
                return previousValue + ', ' + errors[field].join(", ")
            }, '');


            return {
                code,
                error
            }
        })
        return Promise.resolve(loginResponse);
    }
}
