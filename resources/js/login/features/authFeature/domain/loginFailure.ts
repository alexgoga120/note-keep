import { AbstractFailure } from "../../../core/domain/failure";

export default class LoginFailure extends AbstractFailure {

  public static apiError = (code:string, message:string) => {
      return new LoginFailure(code,
          message // per localization one should use the key here
      )
  }
}
