import { CustomError } from "./custom.error";

export class ValidationError extends CustomError {
  constructor(message: string) {
    super(message, "VALIDATION_ERROR");

    Object.defineProperty(this, "name", { value: "MyError" });
  }
}
