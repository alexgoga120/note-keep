import {AbstractFailure} from "../../../core/domain/failure";

export default class NoteFailure extends AbstractFailure {
    public static apiError = (code: string, message: string) => {
        return new NoteFailure(code,
            message // per localization one should use the key here
        )
    }
}
