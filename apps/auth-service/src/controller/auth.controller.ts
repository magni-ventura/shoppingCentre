//import { NotFoundError } from './../../../../packages/error-handler/src/index';
import { Request, Response, NextFunction } from "express";
import { ValidationRegistrationData } from "../utilities/auth.helper";
import prisma from "../../../../packages/libs/prisma";
import { ValidationError } from "../../../../packages/error-handler/src";
import { checkOtpRestrictions, trackOtpRequests, sendOtp } from "src/utilities/auth.helper"; // adjust path

// REGISTER A NEW USER
export const userRegistration = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // Validate request body
    ValidationRegistrationData(req.body, "user");

    const { name, email } = req.body;

    // Check if user already exists
    const existingUser = await prisma.users.findUnique({
      where: { email },
    });

    if (existingUser) {
      return next(new ValidationError("User already exists with this email"));
    }

    // OTP-related checks
    await checkOtpRestrictions(email);
    await trackOtpRequests(email);
    await sendOtp(email, name, "user-activation-mail");

    res.status(200).json({
      message: "OTP sent successfully. Please verify your account.",
    });
  } catch (error) {
    return next(error);
  }
};
