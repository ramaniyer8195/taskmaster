import { USER_ERRORS } from "../constants/errors";
import { ControllerErrors } from "../interfaces/controllers";
import { ValidationErrors } from "../interfaces/schema";

const handleValidationErrors = (
  model: string,
  err: ValidationErrors,
  errors: ControllerErrors
): ControllerErrors => {
  if (err.message.includes(`${model} validation failed`)) {
    Object.values(err.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message;
    });
  }

  return errors;
};

// User Error Handlers
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

  errors = handleValidationErrors("User", err, errors);
  return errors;
};

export const handleSigninErrors = (err: ValidationErrors): ControllerErrors => {
  let errors: { [key: string]: string } = {
    email: "",
    password: "",
  };

  errors = handleValidationErrors("User", err, errors);
  return errors;
};

export const handleGetUserErrors = (
  err: ValidationErrors
): ControllerErrors => {
  let errors: { [key: string]: string } = {
    user: "",
  };

  errors = handleValidationErrors("User", err, errors);
  return errors;
};

export const handleVerifyOtpErrors = (
  err: ValidationErrors
): ControllerErrors => {
  let errors: { [key: string]: string } = {
    otp: "",
  };

  errors = handleValidationErrors("User", err, errors);
  return errors;
};

export const handleChangeDetailsErrors = (
  err: ValidationErrors
): ControllerErrors => {
  let errors: { [key: string]: string } = {
    update: "",
  };

  errors = handleValidationErrors("User", err, errors);
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

  errors = handleValidationErrors("User", err, errors);
  return errors;
};

// Topic Error Handlers
export const handleGetTopicErrors = (
  err: ValidationErrors
): ControllerErrors => {
  let errors: { [key: string]: string } = {
    topic: "",
  };

  errors = handleValidationErrors("Topic", err, errors);
  return errors;
};

export const handleModifyTopicErrors = (
  err: ValidationErrors
): ControllerErrors => {
  let errors: { [key: string]: string } = {
    topic: "",
    update: "",
  };

  errors = handleValidationErrors("Topic", err, errors);
  return errors;
};

export const handleDeleteTopicErrors = (
  err: ValidationErrors
): ControllerErrors => {
  let errors: { [key: string]: string } = {
    topic: "",
  };

  errors = handleValidationErrors("Topic", err, errors);
  return errors;
};

export const handleAddTopicErrors = (
  err: ValidationErrors
): ControllerErrors => {
  let errors: { [key: string]: string } = {
    title: "",
    color: "",
  };

  errors = handleValidationErrors("Topic", err, errors);
  return errors;
};
