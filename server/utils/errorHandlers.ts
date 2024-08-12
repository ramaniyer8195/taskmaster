import { USER_ERRORS } from "../constants/errors";
import { ControllerErrors } from "../interfaces/controllers";
import { ValidationErrors } from "../interfaces/schema";

// User Error Handlers
const handleValidationErrors = (
  err: ValidationErrors,
  errors: ControllerErrors
): ControllerErrors => {
  if (err.message.includes("User validation failed")) {
    Object.values(err.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message;
    });
  }

  return errors;
};

export const handleSignupErrors = (err: ValidationErrors): ControllerErrors => {
  let errors: { [key: string]: string } = {
    name: "",
    email: "",
    password: "",
    loginMethod: "",
  };

  // Duplicate Email Error
  if (err.code === 11000) {
    errors.email = USER_ERRORS.ALREADY_EXISTS;
    return errors;
  }

  errors = handleValidationErrors(err, errors);
  return errors;
};

export const handleSigninErrors = (err: ValidationErrors): ControllerErrors => {
  let errors: { [key: string]: string } = {
    email: "",
    password: "",
  };

  errors = handleValidationErrors(err, errors);
  return errors;
};

export const handleGetUserErrors = (
  err: ValidationErrors
): ControllerErrors => {
  let errors: { [key: string]: string } = {
    user: "",
  };

  errors = handleValidationErrors(err, errors);
  return errors;
};

export const handleVerifyOtpErrors = (
  err: ValidationErrors
): ControllerErrors => {
  let errors: { [key: string]: string } = {
    otp: "",
  };

  errors = handleValidationErrors(err, errors);
  return errors;
};

export const handleChangeDetailsErrors = (
  err: ValidationErrors
): ControllerErrors => {
  let errors: { [key: string]: string } = {
    update: "",
  };

  errors = handleValidationErrors(err, errors);
  return errors;
};

export const handleChangePasswordErrors = (
  err: ValidationErrors
): ControllerErrors => {
  let errors: { [key: string]: string } = {
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  };

  errors = handleValidationErrors(err, errors);
  return errors;
};
