import {
    validate,
    IsString,
    IsDefined
} from "class-validator";

export class PostValidator {

  @IsDefined({ message: "$property is required in the request" })
    @IsString({ message: "$property should be a string" })
    author!: string;

  @IsDefined({ message: "$property is required in the request" })
    @IsString({ message: "$property should be a string" })
    content!: string;

  @IsDefined({ message: "$property is required in the request" })
    @IsString({ message: "$property should be a string" })
    title!: string;

}

const humanize = (message: string) => {
  const newMessage = message.replace(/_/g, " ");
  return newMessage.charAt(0).toUpperCase() + newMessage.slice(1);
};

const formatError = (error: any) => {
  const { property, constraints } = error;
  const messages: string[] = Object.values(constraints);

  return {
    [property]: messages.map(message => humanize(message)),
  };
};
const message =
  "Your request is not properly formed. Please correct and try again";
/**
 * Validates a request using a validator class defined with decorators
 * @param {class} Validator the validator to use
 * @param {object} payload The request payload to be validated
 * @returns {object|boolean} the validation errors or false if none.
 */
export const validateRequest = async (
  validator: any,
  payload: any,
): Promise<boolean | any> => {
  const resource = new validator();
  let validationErrors = {};

  Object.entries(payload).forEach(([key, value]) => {
    resource[key] = value;
  });
  const errors = await validate(resource, {
    validationError: { target: true },
    forbidUnknownValues: true
  });
  if (errors.length === 0) {
    return false;
  }

  /**
   * The errors object contains too many properties that are required
   * We are only interested in the field and the error messages
   */
  for (const error of errors) {
    validationErrors = {
      ...validationErrors,
      ...formatError(error),
    };
  }

  return {
    message,
    errors: validationErrors,
  };
};
