import { HttpStatusCode } from "axios";
import { ErrorId } from "../../enums";

interface Error {
  message: string;
  code: HttpStatusCode;
  id: ErrorId;
}

export default Error;
