import { AbstractFailure } from "../../../core/domain/failure";

export default class NoteFailure extends AbstractFailure {
  public static readonly nameTooLong = new NoteFailure(
    "1",
    "Name should not exceed 15 characters." // per localization one should use the key here
  );

  public static readonly emptyName = new NoteFailure(
    "2",
    "Name cannot be empty."
  );
}
