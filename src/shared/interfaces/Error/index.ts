import { ErrorId } from "../../enums";

interface Error {
  message: string;
  code: number;
  id: ErrorId;
}

export default Error;
