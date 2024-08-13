import { RequestHandler } from "express";
import bcrypt from "bcrypt";
import jwt, { JwtPayload } from "jsonwebtoken";
import {
  handleChangeDetailsErrors,
  handleChangePasswordErrors,
  handleGetUserErrors,
  handleSigninErrors,
  handleSignupErrors,
  handleVerifyOtpErrors,
} from "../utils/errorHandlers";
import { generateOneTimePassword } from "../utils/utils";
import {
  changePasswordReq,
  changePasswordRes,
  GetUserRes,
  SigninReq,
  SigninRes,
  SignupReq,
  SignupRes,
  updateDetailsReq,
  updateDetailsRes,
  VerifyOtpReq,
  VerifyOtpRes,
} from "../interfaces/controllers";
import User from "../models/User";
import { USER_ERRORS } from "../constants/errors";
import { ValidationErrors } from "../interfaces/schema";
import { createJwt } from "../utils/utils";
import { COOKIE_MAX_AGE } from "../constants/constants";

export const getUser: RequestHandler<{}, GetUserRes> = async (req, res) => {
  const token = req.cookies.jwt;

  const decodedToken = jwt.decode(token, { complete: true });
  const _id = (decodedToken?.payload as JwtPayload)?.id;

  try {
    const user = await User.findOne({ _id });

    if (!user) {
      throw {
        message: "User validation failed",
        errors: {
          user: {
            properties: {
              message: USER_ERRORS.DOESNT_EXIST,
              path: "user",
            },
          },
        },
      } as ValidationErrors;
    }

    res.status(200).json({ data: user, error: {} });
  } catch (err) {
    const errors = handleGetUserErrors(err as ValidationErrors);
    res.status(400).json({ data: null, error: errors });
  }
};

export const signup: RequestHandler<{}, SignupRes, SignupReq> = async (
  req,
  res
) => {
  const { name, email, password, confirmPassword, loginMethod } = req.body;

  try {
    if (password !== confirmPassword) {
      throw {
        message: "User validation failed",
        errors: {
          confirmPassword: {
            properties: {
              message: USER_ERRORS.PASSWORDS_DONT_MATCH,
              path: "password",
            },
          },
        },
      } as ValidationErrors;
    }

    const newUser = await User.create({ name, email, password, loginMethod });
    const token = createJwt(newUser._id);

    res.cookie("jwt", token, { httpOnly: true, maxAge: COOKIE_MAX_AGE });
    res.status(201).json({ data: newUser._id, error: {} });
  } catch (err) {
    const errors = handleSignupErrors(err as ValidationErrors);
    res.status(400).json({ data: null, error: errors });
  }
};

export const signin: RequestHandler<{}, SigninRes, SigninReq> = async (
  req,
  res
) => {
  const { email, password } = req.body;

  try {
    if (email === "" || password === "") {
      throw {
        message: "User validation failed",
        errors: {
          ...(email === ""
            ? {
                email: {
                  properties: {
                    message: USER_ERRORS.NO_EMAIL,
                    path: "email",
                  },
                },
              }
            : {}),
          ...(password === ""
            ? {
                password: {
                  properties: {
                    message: USER_ERRORS.NO_PASSWORD,
                    path: "password",
                  },
                },
              }
            : {}),
        },
      };
    }

    const user = await User.findOne({ email });

    if (!user) {
      throw {
        message: "User validation failed",
        errors: {
          email: {
            properties: {
              message: USER_ERRORS.DOESNT_EXIST,
              path: "email",
            },
          },
        },
      } as ValidationErrors;
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw {
        message: "User validation failed",
        errors: {
          password: {
            properties: {
              message: USER_ERRORS.INCORRECT_PASSWORD,
              path: "password",
            },
          },
        },
      } as ValidationErrors;
    }

    const token = createJwt(user._id);

    res.cookie("jwt", token, { httpOnly: true, maxAge: COOKIE_MAX_AGE });
    res.status(201).json({ data: user._id, error: {} });
  } catch (err) {
    const errors = handleSigninErrors(err as ValidationErrors);
    res.status(400).json({ data: null, error: errors });
  }
};

export const signout: RequestHandler = (req, res) => {
  res.cookie("jwt", "", { maxAge: 1 });
  res.status(200).json({ message: "User signed out", error: {} });
};

export const generateOtp: RequestHandler = async (req, res) => {
  const token = req.cookies.jwt;

  const decodedToken = jwt.decode(token, { complete: true });
  const _id = (decodedToken?.payload as JwtPayload)?.id;

  const otp = generateOneTimePassword();

  try {
    await User.updateOne({ _id }, { $set: { otp } });

    res.status(200).json({ message: "OTP sent", error: {} });
  } catch (err) {
    res.status(400).json({ data: null, error: err });
  }
};

export const verifyOtp: RequestHandler<{}, VerifyOtpRes, VerifyOtpReq> = async (
  req,
  res
) => {
  const { otp } = req.body;
  const token = req.cookies.jwt;

  const decodedToken = jwt.decode(token, { complete: true });
  const _id = (decodedToken?.payload as JwtPayload)?.id;

  try {
    const user = await User.findOne({ _id });

    if (user?.otp !== otp) {
      throw {
        message: "User validation failed",
        errors: {
          otp: {
            properties: {
              message: USER_ERRORS.OTP_DOESNT_MATCH,
              path: "otp",
            },
          },
        },
      } as ValidationErrors;
    }

    await User.updateOne({ _id }, { $set: { otp: null, isVerified: true } });

    res.status(200).json({ message: "OTP verified successfully", error: {} });
  } catch (err) {
    const errors = handleVerifyOtpErrors(err as ValidationErrors);
    res.status(400).json({ message: "", error: errors });
  }
};

export const changeDetails: RequestHandler<
  {},
  updateDetailsRes,
  updateDetailsReq
> = async (req, res) => {
  const { name, avatar } = req.body;
  const token = req.cookies.jwt;

  const decodedToken = jwt.decode(token, { complete: true });
  const _id = (decodedToken?.payload as JwtPayload)?.id;

  try {
    const user = await User.findOne({ _id });

    if (!name && !avatar) {
      throw {
        message: "User validation failed",
        errors: {
          update: {
            properties: {
              message: USER_ERRORS.NOTHING_TO_UPDATE,
              path: "update",
            },
          },
        },
      } as ValidationErrors;
    }

    await User.updateOne(
      { _id },
      {
        $set: {
          ...(name ? { name } : {}),
          ...(avatar ? { avatar } : {}),
        },
      }
    );

    res.status(200).json({ message: "Updated successfully", error: {} });
  } catch (err) {
    const errors = handleChangeDetailsErrors(err as ValidationErrors);
    res.status(400).json({ message: "", error: errors });
  }
};

export const changePassword: RequestHandler<
  {},
  changePasswordRes,
  changePasswordReq
> = async (req, res) => {
  const { oldPassword, newPassword, confirmPassword } = req.body;
  const token = req.cookies.jwt;

  const decodedToken = jwt.decode(token, { complete: true });
  const _id = (decodedToken?.payload as JwtPayload)?.id;

  try {
    if (oldPassword === "" || newPassword === "" || confirmPassword === "") {
      throw {
        message: "User validation failed",
        errors: {
          ...(oldPassword === ""
            ? {
                oldPassword: {
                  properties: {
                    message: USER_ERRORS.NO_PASSWORD,
                    path: "oldPassword",
                  },
                },
              }
            : {}),
          ...(newPassword === ""
            ? {
                newPassword: {
                  properties: {
                    message: USER_ERRORS.NO_PASSWORD,
                    path: "newPassword",
                  },
                },
              }
            : {}),
          ...(confirmPassword === ""
            ? {
                confirmPassword: {
                  properties: {
                    message: USER_ERRORS.NO_PASSWORD,
                    path: "confirmPassword",
                  },
                },
              }
            : {}),
        },
      };
    }

    const user = await User.findOne({ _id });

    if (!user) {
      throw {
        message: "User validation failed",
        errors: {
          email: {
            properties: {
              message: USER_ERRORS.DOESNT_EXIST,
              path: "email",
            },
          },
        },
      } as ValidationErrors;
    }

    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) {
      throw {
        message: "User validation failed",
        errors: {
          oldPassword: {
            properties: {
              message: USER_ERRORS.INCORRECT_PASSWORD,
              path: "oldPassword",
            },
          },
        },
      } as ValidationErrors;
    }

    if (newPassword === oldPassword) {
      throw {
        message: "User validation failed",
        errors: {
          newPassword: {
            properties: {
              message: USER_ERRORS.OLD_NEW_SAME,
              path: "newPassword",
            },
          },
        },
      } as ValidationErrors;
    }

    if (newPassword !== confirmPassword) {
      throw {
        message: "User validation failed",
        errors: {
          confirmPassword: {
            properties: {
              message: USER_ERRORS.PASSWORDS_DONT_MATCH,
              path: "confirmPassword",
            },
          },
        },
      } as ValidationErrors;
    }

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    await User.updateOne({ _id }, { $set: { password: hashedPassword } });

    res
      .status(201)
      .json({ message: "Password changed successfully", error: {} });
  } catch (err) {
    const errors = handleChangePasswordErrors(err as ValidationErrors);
    res.status(400).json({ message: "", error: errors });
  }
};
