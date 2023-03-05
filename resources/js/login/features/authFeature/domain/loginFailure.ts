import { AbstractFailure } from "../../../core/domain/failure";

export default class LoginFailure extends AbstractFailure {
  public static readonly nameTooLong = new LoginFailure(
    "1",
    "Name should not exceed 15 characters." // per localization one should use the key here
  );

  public static apiError = (code:string, message:string) => {
      return new LoginFailure(code,
          message // per localization one should use the key here
      )
  }
}
